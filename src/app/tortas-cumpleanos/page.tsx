'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Star, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function BirthdayCakesLanding() {
    const whatsappMessage = encodeURIComponent(
        `Hola 👋\nVengo desde su página web y quiero información sobre:\n\n👉 Torta de cumpleaños\n🎂 Temática:\n📅 Fecha del evento:\n👥 Número de invitados:`
    );

    const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    const galleryImages = [
        '/masha-bear-cake.jpg',
        '/royal-prince-cake.jpg',
        '/lol-surprise-cake.jpg',
        '/bautizo-setup.jpg',
        '/baby-shower-bear.jpg',
        '/bday-minnie-pink.jpg'
    ];

    const testimonials = [
        {
            name: "Carla M.",
            text: "La torta de Minnie para mi hija fue un sueño. No solo hermosa, sino deliciosa.",
            rating: 5,
            event: "Cumpleaños infantil"
        },
        {
            name: "Patricia G.",
            text: "Hicieron exactamente el diseño de LOL que mi hija quería. ¡Gracias!",
            rating: 5,
            event: "Cumpleaños infantil"
        },
        {
            name: "Roberto S.",
            text: "La torta de Baby Shower quedó preciosa en la mesa. Muy recomendados.",
            rating: 5,
            event: "Baby Shower"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            {/* Minimal Header */}
            <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="font-script text-3xl text-charcoal">Repostería Pabel</Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#20BA5A] transition-colors"
                    >
                        <MessageCircle size={18} />
                        <span className="hidden sm:inline">Cotizar ahora</span>
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="font-script text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
                            🎂 Tortas de Cumpleaños<br />Personalizadas
                        </h1>
                        <p className="text-xl md:text-2xl text-charcoal/70 mb-4 font-light">
                            Temáticas infantiles • Baby Shower • Diseños exclusivos
                        </p>
                        <p className="text-sm text-charcoal/60 mb-8 max-w-2xl mx-auto">
                            Hacemos realidad la torta de sus sueños. Personajes favoritos, colores vibrantes y el sabor casero que nos caracteriza.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Cotizar mi torta por WhatsApp
                        </a>
                    </motion.div>

                    {/* Hero Image */}
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                        >
                            <Image
                                src="/minnie-mouse-setup-hd.jpg"
                                alt="Mesa de torta Minnie Mouse HD"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 1: Themed Cakes (LOL Surprise style) */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-script text-4xl md:text-5xl text-charcoal mb-6">
                                Tortas Temáticas
                            </h2>
                            <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                                Sorprende a tus hijos con tortas de sus personajes favoritos. Imprimimos su imaginación en diseños llenos de color y detalle.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    'Impresiones comestibles de alta calidad',
                                    'Decoración en crema y fondant',
                                    'Personajes de moda (LOL, Frozen, Disney)',
                                    'Sabores que encantan a los niños'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="text-[#D48995] shrink-0 mt-1" size={20} />
                                        <span className="text-charcoal">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-[#D48995] transition-colors"
                            >
                                <MessageCircle size={20} />
                                📲 Cotizar temática
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                        >
                            <Image
                                src="/lol-surprise-cake.jpg"
                                alt="Torta temática LOL Surprise"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Baby Shower (Bear style) */}
            <section className="py-16 px-4 bg-gradient-to-b from-white to-[#F9F5F0]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl order-2 md:order-1 group cursor-pointer"
                        >
                            <Image
                                src="/baby-shower-bear.jpg"
                                alt="Torta de Baby Shower"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <h2 className="font-script text-4xl md:text-5xl text-charcoal mb-6">
                                Baby Shower & Primeros Años
                            </h2>
                            <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                                Celebra la llegada del nuevo integrante o su primer añito con diseños tiernos y elegantes.
                            </p>
                            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                                <p className="text-sm font-bold text-charcoal/60 mb-3 uppercase tracking-wider">Estilos disponibles</p>
                                <p className="text-charcoal text-lg">
                                    Ositos • Coronas Reales • Nubes y Estrellas • Colores Pastel
                                </p>
                            </div>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#D48995] text-white px-8 py-3 rounded-full font-bold hover:bg-charcoal transition-colors"
                            >
                                <MessageCircle size={20} />
                                📲 Ver ideas por WhatsApp
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-12">
                        Nuestros diseños recientes
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
                            >
                                <Image
                                    src={img}
                                    alt={`Torta de cumpleaños ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-center text-charcoal/60 mb-12">
                        Momentos dulces que quedan en el recuerdo.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gradient-to-b from-white to-[#F9F5F0] p-6 rounded-2xl shadow-lg"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="gold" className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-charcoal/80 italic mb-4">&quot;{testimonial.text}&quot;</p>
                                <p className="font-bold text-charcoal">{testimonial.name}</p>
                                <p className="text-xs text-charcoal/50">{testimonial.event}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Urgency Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-[#D48995] to-[#b56d79] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-script text-4xl md:text-5xl mb-4">
                            ⚠️ Agenda tu fecha con tiempo
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Para decoraciones personalizadas recomendamos reservar con anticipación.<br />
                            Asegura tu torta temática hoy mismo.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-[#D48995] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Reservar por WhatsApp
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-charcoal text-cream py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="font-script text-3xl mb-4">Repostería Pabel</h3>
                    <p className="text-cream/80 mb-2">Tortas infantiles y temáticas</p>
                    <p className="text-cream/60 text-sm mb-4">
                        📍 Potosí, Bolivia
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BA5A] transition-colors"
                    >
                        <MessageCircle size={20} />
                        📲 Atención directa por WhatsApp
                    </a>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-pulse"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle size={32} />
            </a>
        </div>
    );
}
