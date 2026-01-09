'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Clock, Award, Users, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    const values = [
        { icon: Heart, title: "Pasión", desc: "Cada producto es elaborado con amor y dedicación total. No es solo un postre, es una experiencia." },
        { icon: Star, title: "Calidad", desc: "Ingredientes premium importados, sin conservantes artificiales. Solo lo mejor para tu paladar." },
        { icon: Clock, title: "Frescura", desc: "Horneamos todos los días desde las 4:00 AM. Cada pieza es fresca del día." }
    ];

    const stats = [
        { number: "15+", label: "Años de experiencia" },
        { number: "50K+", label: "Clientes felices" },
        { number: "200+", label: "Recetas únicas" },
        { number: "100%", label: "Ingredientes naturales" }
    ];

    return (
        <div className="min-h-screen pt-28 pb-12 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-4">Nuestra Historia</span>
                        <h1 className="font-script text-5xl md:text-6xl text-charcoal mb-6">
                            Dulzura que nace del corazón
                        </h1>
                        <div className="w-20 h-1 bg-mauve mb-8 rounded-full"></div>
                        <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                            Pabel's nació hace 15 años en la pequeña cocina de nuestro abuelo Don Pabel. Lo que comenzó como un pasatiempo de domingo, horneando postres para los vecinos, se transformó en una pasión por crear momentos de felicidad a través del sabor.
                        </p>
                        <p className="text-lg text-charcoal/70 leading-relaxed">
                            Hoy, mantenemos intactas esas recetas secretas, utilizando técnicas modernas pero respetando el tiempo que requiere cada masa para ser perfecta. Porque aquí, la prisa no existe.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative h-[450px]"
                    >
                        <div className="absolute -inset-4 border-2 border-mauve/30 rounded-[2rem] transform rotate-3"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800"
                            alt="Cocina de repostería"
                            fill
                            className="rounded-[2rem] shadow-xl relative z-10 object-cover"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-mauve text-white p-6 rounded-2xl shadow-lg z-20">
                            <Award size={32} className="mb-2" />
                            <p className="font-bold text-sm">Mejor Repostería</p>
                            <p className="text-xs text-white/70">Potosí 2023</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-charcoal py-16 mb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p className="font-script text-5xl text-mauve mb-2">{stat.number}</p>
                                <p className="text-cream/60 text-sm uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="max-w-6xl mx-auto px-4 mb-20">
                <div className="text-center mb-12">
                    <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-4">Lo que nos define</span>
                    <h2 className="font-script text-5xl text-charcoal">Nuestros Valores</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow text-center group"
                        >
                            <div className="bg-mauve/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-mauve group-hover:text-white transition-colors text-mauve">
                                <item.icon size={36} />
                            </div>
                            <h3 className="font-script text-3xl text-charcoal mb-3">{item.title}</h3>
                            <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
