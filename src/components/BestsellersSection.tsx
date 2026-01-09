'use client';

import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BestsellersSection() {
    const { products } = useProducts();
    const { addToCart } = useCart();

    // Logic: Filter by isBestseller flag from Admin
    let bestsellers = products.filter(p => p.isBestseller);

    // Fallback if none are marked (e.g. initial state)
    if (bestsellers.length === 0) {
        bestsellers = products.slice(0, 3);
    }



    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12"
                >
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <span className="text-[#D48995] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Favoritos</span>
                        <h2 className="font-script text-5xl text-[#4A4A4A]">Nuestros Más Vendidos</h2>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {bestsellers.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link href={`/menu?category=${product.category}`}>
                                <div className="relative h-[400px] mb-6 overflow-hidden rounded-[2rem]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                                    {/* Quick Add Button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                        className="absolute bottom-6 right-6 bg-white text-charcoal w-12 h-12 rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-mauve hover:text-white shadow-lg z-10"
                                        title="Agregar al carrito"
                                    >
                                        <ShoppingBag size={20} />
                                    </button>
                                </div>
                            </Link>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={`${i < Math.floor(product.rating) ? "fill-mauve text-mauve" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <h3 className="font-bold text-xl text-charcoal mb-2">{product.name}</h3>
                                <p className="text-[#D48995] font-bold font-mono">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
