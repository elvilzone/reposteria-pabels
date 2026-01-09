'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { ArrowLeft, MessageCircle, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/config';

export default function ProductPage() {
    const { id } = useParams();
    const { products } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && products.length > 0) {
            const found = products.find((p) => p.id === Number(id));
            setProduct(found || null);
            setLoading(false);
        }
    }, [id, products]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-24 px-4 text-center">
                <h2 className="text-2xl font-bold text-[#5D4037] mb-4">Producto no encontrado</h2>
                <Link href="/catalogo" className="text-[#FFD700] hover:underline">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    const whatsappMessage = encodeURIComponent(
        `Hola Repostería Pabel's, estoy interesado en el producto: ${product.name}`
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link
                href="/catalogo"
                className="inline-flex items-center text-gray-600 hover:text-[#5D4037] mb-8 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" />
                Volver al catálogo
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-[#FFD700]/10">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <span className="text-[#FFD700] font-bold uppercase tracking-wider text-sm">
                            {product.category}
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#5D4037] mt-2 mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-bold text-[#5D4037]/80">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <div className="prose prose-lg text-gray-600">
                        <p>{product.description}</p>
                    </div>

                    <div>
                        <h3 className="font-serif text-xl font-bold text-[#5D4037] mb-4">Ingredientes Principales</h3>
                        <ul className="grid grid-cols-2 gap-3">
                            {product.ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                    <Check size={16} className="text-[#FFD700] mr-2" />
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <a
                            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <MessageCircle className="mr-2" />
                            Cotizar por WhatsApp
                        </a>
                        <p className="mt-4 text-sm text-gray-500 text-center md:text-left">
                            * Los pedidos personalizados requieren 48 horas de anticipación.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
