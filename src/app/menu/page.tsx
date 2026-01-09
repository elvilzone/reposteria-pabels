'use client';

import { useState, useEffect, Suspense } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCategories } from '@/context/CategoryContext';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import WeddingShowcase from '@/components/WeddingShowcase';

function MenuContent() {
    const { products } = useProducts();
    const { categories } = useCategories();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filter, setFilter] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Update filter if URL changes
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setFilter(cat);
        }
    }, [searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = products.filter(product => {
        // Exclude internal categories from the general menu
        if (product.category === 'sabores' || product.category === 'packs') return false;

        const matchesCategory = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const activeCategoryName = filter === 'all'
        ? 'Nuestro Menú'
        : categories.find(c => c.id === filter)?.name || 'Nuestro Menú';

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8] pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    key={`header-${filter}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h2 className="font-script text-6xl text-charcoal mt-2 mb-4">{activeCategoryName}</h2>
                    <div className="w-16 h-1 bg-mauve/30 mx-auto rounded-full"></div>
                </motion.div>

                {/* Filter & Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 sticky top-24 z-30 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-soft-pink/20"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-8 py-2 rounded-full font-script text-3xl font-bold transition-colors duration-200 pt-3
                        ${filter === 'all'
                                    ? 'bg-[#D48995] text-white'
                                    : 'bg-transparent text-charcoal/80 hover:bg-[#D48995]/20'}`}
                        >
                            Todos
                        </button>
                        {categories
                            .filter(cat => cat.id !== 'all' && cat.id !== 'sabores' && cat.id !== 'packs')
                            .map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id)}
                                    className={`px-8 py-2 rounded-full font-script text-3xl font-bold transition-colors duration-200 pt-3
                            ${filter === cat.id
                                            ? 'bg-[#D48995] text-white'
                                            : 'bg-transparent text-charcoal/80 hover:bg-[#D48995]/20'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="Buscar dulzura..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 rounded-full border border-soft-pink/30 focus:outline-none focus:ring-2 focus:ring-mauve/50 bg-cream text-charcoal placeholder-charcoal/40 text-sm"
                        />
                        <Search className="absolute left-4 top-3 text-mauve/60" size={18} />
                    </div>
                </motion.div>

                {/* Product Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        key={`grid-${filter}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
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
                    <div className="text-center py-20 text-charcoal/50">
                        <p className="font-script text-3xl">No se encontraron dulces...</p>
                        <button onClick={() => { setFilter('all'); setSearchTerm('') }} className="mt-4 text-xs font-bold uppercase tracking-widest text-mauve hover:text-charcoal underline">Ver Todos</button>
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
                <WeddingShowcase />
            </div>
        </div>
    );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7]" />}>
            <MenuContent />
        </Suspense>
    );
}
