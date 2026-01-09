'use client';

import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FestiveCollection() {
    const { products, settings } = useProducts();
    const { addToCart } = useCart();

    const festiveProducts = products.filter(p => p.isFestive);

    const SECTION_TITLE = settings?.festiveTitle || "Colección Festiva";
    const SECTION_SUBTITLE = settings?.festiveSubtitle || "Sabores de Temporada";

    return (
        <section className="py-24 bg-[#F9F5F0]">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-24">
                    <span className="text-[#D48995] text-xl font-bold uppercase tracking-[0.3em] mb-4 block">{SECTION_SUBTITLE}</span>
                    <h2 className="font-script text-5xl md:text-8xl text-[#4A4A4A]">{SECTION_TITLE}</h2>
                </div>

                {/* Festive Products Lists */}
                {festiveProducts.length > 0 ? (
                    <div className="space-y-32">
                        {festiveProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group"
                            >
                                {/* Image Side */}
                                <div className={`relative h-[500px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Content Side */}
                                <div className={`text-left ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <h3 className="text-5xl md:text-7xl font-script text-[#D48995] mb-6 drop-shadow-sm leading-tight">
                                        {product.name}
                                    </h3>

                                    <div className="h-1 w-24 bg-mauve mb-8 rounded-full"></div>

                                    <p className="text-charcoal/60 text-lg leading-relaxed mb-8 max-w-md">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center gap-6 mb-10">
                                        <span className="text-4xl font-bold text-mauve font-mono">
                                            ${product.price}
                                        </span>
                                        {product.category && (
                                            <span className="bg-white px-4 py-1 rounded-full text-xs uppercase tracking-widest text-charcoal/50 border border-mauve/20">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-mauve text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-charcoal transition-all hover:scale-105 shadow-lg flex items-center gap-3"
                                        >
                                            <ShoppingBag size={18} />
                                            Agregar al Carrito
                                        </button>

                                        <Link href={`/menu?category=${product.category}`}>
                                            <button className="px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm text-charcoal border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all flex items-center gap-2">
                                                Ver Detalles <ArrowRight size={18} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
                        <p className="text-gray-400 italic text-lg">No hay productos festivos activados.</p>
                        <p className="text-sm text-gray-400 mt-2">Actívalos desde el Admin.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
