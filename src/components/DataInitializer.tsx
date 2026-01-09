'use client';

import { useEffect } from 'react';
import { useCategories } from '@/context/CategoryContext';
import { useProducts } from '@/context/ProductContext';

export default function DataInitializer() {
    const { addCategory, categories, isLoaded } = useCategories();
    const { addProduct, products } = useProducts();

    useEffect(() => {
        if (!isLoaded) return;

        // Verificar si ya existe la categoría Matrimonios
        const hasMatrimonios = categories.some(c => c.id === 'matrimonios');

        if (!hasMatrimonios) {
            console.log("Inicializando categoría Matrimonios...");
            addCategory('Matrimonios');

            // Añadir producto de ejemplo solo si no existe uno similar
            // Nota: Esto asume que products ya está cargado o se carga rápido. 
            // Idealmente ProductContext también debería tener isLoaded, pero por ahora nos enfocamos en categorías.
            const hasWeddingCake = products.some(p => p.name.includes('Torta de Boda Elegante'));
            if (!hasWeddingCake) {
                console.log("Inicializando producto Torta de Boda...");
                addProduct({
                    name: "Torta de Boda Elegante",
                    description: "Torta de 3 pisos con decoración floral en fondant, bizcocho de vainilla y relleno de frutos rojos.",
                    price: 150.00,
                    category: "matrimonios",
                    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800",
                    ingredients: ["Harina Premium", "Fondant", "Vainilla de Madagascar", "Frutos Rojos"],
                    rating: 5.0
                });
            }
        }
    }, [categories, products, addCategory, addProduct, isLoaded]);

    return null;
}
