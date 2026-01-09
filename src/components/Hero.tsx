'use client';

import { ChefHat, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8] flex items-center justify-center pt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}
                    className="text-center md:text-left z-10"
                >
                    <div className="relative inline-block">
                        <h1 className="font-script text-5xl md:text-9xl text-charcoal mb-4 leading-none">
                            ¡Deleite en <br /> cada bocado!
                        </h1>
                        <span className="absolute -top-6 -right-12 text-4xl text-mauve">♥</span>
                        <span className="absolute bottom-4 -left-8 text-2xl text-mauve/50">✦</span>
                    </div>

                    <p className="text-charcoal/60 mb-8 font-sans tracking-widest text-xs uppercase max-w-md md:ml-2 mt-4">
                        Calidad Premium • Recién Horneado • Hecho con Amor
                    </p>

                    <Link href="/menu">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#D48995] text-white px-12 py-4 rounded-full font-bold text-sm tracking-widest shadow-xl hover:bg-[#b56d79] transition-all uppercase"
                        >
                            Ordenar Ahora
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Hero Image Composition */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[500px] w-full"
                >
                    {/* Main Cake Stand */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <img
                            src="/hero-cake.jpg"
                            alt="Pastel de Chocolate Don Pabel"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
