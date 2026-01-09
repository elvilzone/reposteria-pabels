'use client';

import { motion } from 'framer-motion';
import { X, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/products';
import Image from 'next/image';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-cream rounded-[2rem] shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
                <div className="md:w-1/2 h-64 md:h-auto relative">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/80 p-2 rounded-full md:hidden text-charcoal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-mauve text-xs font-bold tracking-widest uppercase">{product.category}</span>
                            <h2 className="font-script text-4xl text-charcoal">{product.name}</h2>
                        </div>
                        <button onClick={onClose} className="hidden md:block text-charcoal/50 hover:text-charcoal transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="text-3xl font-bold text-mauve mb-6">${product.price.toFixed(2)}</div>

                    <p className="text-charcoal/70 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mb-8">
                        <h4 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                            <Star size={16} className="text-mauve" /> Ingredientes Principales:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ing, i) => (
                                <span key={i} className="bg-mauve/10 text-charcoal px-3 py-1 rounded-full text-sm">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-mauve/10 flex gap-4">
                        <button
                            onClick={() => {
                                addToCart(product);
                                onClose();
                            }}
                            className="flex-1 bg-mauve text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-charcoal transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            <ShoppingBag size={20} />
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
