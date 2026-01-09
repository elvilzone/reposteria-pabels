'use client';

import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { Product } from '@/lib/products';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
    onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => onClick && onClick(product)}
        >
            <div className="relative h-64 overflow-hidden bg-gray-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="p-6 text-center">
                <h3 className="font-script text-3xl text-charcoal mb-2">{product.name}</h3>
                <p className="text-xs text-mauve font-bold uppercase tracking-widest mb-3">{product.category}</p>

                <div className="w-8 h-0.5 bg-gray-200 mx-auto mb-4"></div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 font-light">{product.description}</p>

                <div className="flex justify-center items-center gap-4">
                    <span className="text-lg font-bold text-charcoal">${product.price.toFixed(2)}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="bg-mauve text-white p-2 rounded-full hover:bg-charcoal transition-colors shadow-md"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
