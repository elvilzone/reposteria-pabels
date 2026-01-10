import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutTeaserSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800" // Male Chef / Baker
                                alt="Don Pabel - Fundador"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                <p className="font-serif text-2xl font-bold">Don Pabel</p>
                                <p className="text-sm text-[#FFD700]">Fundador & Maestro Repostero</p>
                            </div>
                        </div>
                        {/* Decorative background visual */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-[#FFD700] rounded-2xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#FFD700] font-bold tracking-wider uppercase text-sm mb-2 block">Nuestra Historia</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#5D4037] mb-6 leading-tight">
                            El legado del Abuelo Pabel
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Todo comenzó con la pasión de nuestro abuelo Pabel, fundador de <strong className="text-[#5D4037]">Pabel&apos;s Patisserie</strong>. Su visión era simple pero poderosa: crear postres que no solo endulzaran el paladar, sino que unieran a las familias.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Hoy, mantenemos vivo su legado horneando con la misma filosofía: ingredientes frescos, recetas tradicionales y un amor incondicional por la repostería artesanal que se siente en cada bocado.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-[#FFD700]" />
                                <span className="text-[#5D4037] font-medium">100% Artesanal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-[#FFD700]" />
                                <span className="text-[#5D4037] font-medium">Sin Conservantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-[#FFD700]" />
                                <span className="text-[#5D4037] font-medium">Diseños Únicos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-[#FFD700]" />
                                <span className="text-[#5D4037] font-medium">Sabor Inigualable</span>
                            </div>
                        </div>

                        <Link href="/nosotros" className="inline-block text-[#5D4037] font-bold border-b-2 border-[#FFD700] hover:text-[#FFD700] transition-colors pb-1">
                            Conoce más sobre nosotros
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
