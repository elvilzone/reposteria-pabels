'use client';

import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Hero from '@/components/Hero';
import NewsletterSection from '@/components/NewsletterSection';
import SignatureCollection from '@/components/SignatureCollection';
import TestimonialsSection from '@/components/TestimonialsSection';
import InstagramSection from '@/components/InstagramSection';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import BestsellersSection from "@/components/BestsellersSection";
import FestiveCollection from "@/components/FestiveCollection";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
    const { products } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const featuredProducts = products.slice(0, 3);

    return (
        <main className="min-h-screen bg-[#FDFBF7]">
            <ScrollToTop />
            <Hero />

            <BestsellersSection />

            <SignatureCollection />

            <FestiveCollection />

            <TestimonialsSection />

            <InstagramSection />

            <NewsletterSection />

            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
