'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WeddingShowcase() {
    const images = [
        { src: "/wedding-setup-wings.jpg", className: "col-span-2 row-span-2 h-[500px]" },
        { src: "/wedding-setup-red-pyramid.jpg", className: "col-span-1 row-span-1 h-[240px]" },
        { src: "/wedding-cake-detail.jpg", className: "col-span-1 row-span-1 h-[240px]" },
        { src: "/wedding-setup-pink.jpg", className: "col-span-1 row-span-1 h-[240px]" },
        { src: "/wedding-setup-columns.jpg", className: "col-span-1 row-span-1 h-[240px]" },
    ];

    return (
        <section className="py-24 bg-white mt-20 rounded-t-[3rem] shadow-inner relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#D48995] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Colección Nupcial</span>
                    <h2 className="font-script text-5xl md:text-6xl text-charcoal mb-6">Bodas de Ensueño</h2>
                    <p className="text-charcoal/60 max-w-2xl mx-auto">
                        Creamos la pieza central perfecta para tu día especial. Desde montajes monumentales hasta detalles delicados, tu boda merece el toque Pabel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-2xl overflow-hidden group shadow-lg ${img.className}`}
                        >
                            <Image
                                src={img.src}
                                alt="Wedding Cake Setup"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="https://wa.me/59175725643?text=Hola,%20quisiera%20cotizar%20una%20torta%20de%20matrimonio" target="_blank" rel="noopener noreferrer" className="inline-block bg-charcoal text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D48995] transition-colors shadow-lg">
                        Cotizar mi Boda
                    </a>
                </div>
            </div>
        </section>
    );
}
