'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '@/lib/products';

interface StoreSettings {
    festiveTitle: string;
    festiveSubtitle: string;
    boxPrices: {
        small: number;
        medium: number;
        large: number;
    };
}

interface ProductContextType {
    products: Product[];
    settings: StoreSettings;
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: number) => void;
    updateSettings: (settings: StoreSettings) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const DEFAULT_SETTINGS: StoreSettings = {
    festiveTitle: "Colección Festiva",
    festiveSubtitle: "Sabores de Temporada",
    boxPrices: {
        small: 15,
        medium: 22,
        large: 40
    }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                // Si la DB devuelve objeto vacío (primera vez), usar default
                if (data && Object.keys(data).length > 0) {
                    setSettings(data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings: StoreSettings) => {
        setSettings(newSettings); // Optimistic update
        try {
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings),
            });
        } catch (error) {
            console.error("Error saving settings:", error);
            // Revert changes if needed (optionally fetch again)
        }
    };

    const addProduct = async (productData: Omit<Product, 'id'>) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (res.ok) {
                await fetchProducts(); // Recargar lista
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const res = await fetch(`/api/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (res.ok) {
                await fetchProducts();
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, settings, addProduct, updateProduct, deleteProduct, updateSettings }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
