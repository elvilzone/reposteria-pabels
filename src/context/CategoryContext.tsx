'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, INITIAL_CATEGORIES } from '@/lib/products';

interface CategoryContextType {
    categories: Category[];
    addCategory: (name: string) => void;
    deleteCategory: (id: string) => void;
    isLoaded: boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([...INITIAL_CATEGORIES]);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (name: string) => {
        if (!isLoaded) return;

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (res.ok) {
                const newCategory = await res.json();
                setCategories([...categories, newCategory]);
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!isLoaded) return;
        if (id === 'all') return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setCategories(categories.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, isLoaded }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};
