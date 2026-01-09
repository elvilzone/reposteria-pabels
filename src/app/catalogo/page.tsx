'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCategories } from '@/context/CategoryContext';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/products';

export default function CatalogPage() {
    const { products } = useProducts();
    const { categories } = useCategories();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga para efecto visual
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto bg-[#FAFAF5]">
            <div className="text-center mb-10">
                <h2 className="font-serif text-4xl font-bold text-[#5D4037] mb-4">Nuestro Menú</h2>
                <div className="w-20 h-1 bg-[#FFD700] mx-auto rounded-full"></div>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 sticky top-20 z-30 bg-[#FAFAF5]/90 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 font-medium
                ${filter === cat.id
                                    ? 'bg-[#5D4037] text-[#FFD700] shadow-md transform scale-105'
                                    : 'bg-white text-[#5D4037] hover:bg-[#FFB6C1]/20 border border-[#5D4037]/10'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Buscar delicia..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-[#5D4037]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 bg-white"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            {/* Visualización de Productos */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={setSelectedProduct}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No encontramos productos con esos criterios. ¡Prueba otra cosa!</p>
                </div>
            )}

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
