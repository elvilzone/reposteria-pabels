'use client';

import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { AnimatePresence, motion } from 'framer-motion';

export default function CakesPage() {
    const { products } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Filter mainly for 'tortas' or similar broad category, or just show all for now if unsure of ID
    // Assuming 'tortas' is the ID based on previous context
    const cakeProducts = products.filter(p => p.category === 'tortas' || p.category === 'personalizados' || p.name.toLowerCase().includes('cake'));

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                    <span className="text-mauve font-bold tracking-widest uppercase text-xs block mb-2">Colección Exclusiva</span>
                    <h2 className="font-script text-7xl text-charcoal inline-block relative z-10">Tortas Exquisitas</h2>
                    {/* Decorative element behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-soft-pink/20 blur-3xl rounded-full z-0"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cakeProducts.length > 0 ? (
                        cakeProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={setSelectedProduct}
                            />
                        ))
                    ) : (
                        // Fallback if no specific cakes found, show all or message
                        <div className="col-span-3 text-center py-20">
                            <p className="text-charcoal/50 mb-4">Mostrando todos los dulces...</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {products.slice(0, 6).map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={setSelectedProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

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
