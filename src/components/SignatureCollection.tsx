'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const collections = [
    {
        title: "Tortas Personalizadas",
        subtitle: "Diseña tu torta soñada",
        image: "/minnie-dashboard.jpg",
        link: "/servicios/tortas-personalizadas"
    },
    {
        title: "Postres de Autor",
        subtitle: "Pequeños lujos dulces",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop",
        link: "/menu?category=postres"
    },
    {
        title: "Packs de Regalo",
        subtitle: "La felicidad en una caja",
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=1887&auto=format&fit=crop",
        link: "/packs-de-regalo"
    }
];

export default function SignatureCollection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8] text-charcoal">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-6xl mb-2">Especialidades</h2>
                </motion.div>

                <div className="flex items-center justify-between">
                    {/* Fake navigation arrows for aesthetic */}
                    <div className="hidden md:block text-mauve/40 hover:text-mauve cursor-pointer transition-colors"> <ArrowLeft size={32} strokeWidth={1} /> </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-5xl mx-auto px-4"
                    >
                        {collections.map((item, idx) => (
                            <Link href={item.link} key={idx} className="group text-center cursor-pointer">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="relative aspect-square mb-6 overflow-hidden bg-white shadow-sm"
                                >
                                    <div className="w-full h-full relative overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </motion.div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-mauve transition-colors">{item.title}</h3>
                                <p className="font-script text-mauve text-lg">{item.subtitle}</p>
                            </Link>
                        ))}
                    </motion.div>

                    <div className="hidden md:block text-mauve/40 hover:text-mauve cursor-pointer transition-colors"> <ArrowRight size={32} strokeWidth={1} /> </div>
                </div>
            </div>
        </section>
    );
}
