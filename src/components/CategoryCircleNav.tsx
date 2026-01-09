'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
    { name: 'Tortas', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300', href: '/catalogo?cat=tortas' },
    { name: 'Postres', image: 'https://images.unsplash.com/photo-1551024601-56296352f488?auto=format&fit=crop&q=80&w=300', href: '/catalogo?cat=postres' },
    { name: 'Donas', image: 'https://images.unsplash.com/photo-1552010099-5dc758d54343?auto=format&fit=crop&q=80&w=300', href: '/catalogo?cat=donas' },
    { name: 'Galletas', image: 'https://images.unsplash.com/photo-1499636138143-bd649043ea52?auto=format&fit=crop&q=80&w=300', href: '/catalogo?cat=galletas' },
];

export default function CategoryCircleNav() {
    return (
        <section className="py-12 bg-cream">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-center font-serif text-2xl text-burgundy font-bold mb-8 uppercase tracking-widest">Nuestras Delicias</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {categories.map((cat, index) => (
                        <Link href={cat.href} key={index} className="group flex flex-col items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-burgundy/10 group-hover:border-gold transition-colors duration-300 shadow-xl"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <span className="mt-4 font-serif text-lg font-bold text-burgundy group-hover:text-gold transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
