'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Star, Cake, Heart, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function BirthdayCakesLanding() {
    const whatsappMessage = encodeURIComponent(
        `Hola 👋\nVengo desde su página web y quiero información sobre:\n\n👉 Torta de cumpleaños\n🎂 Tipo: Infantil / Adulto\n📅 Fecha del cumpleaños:\n👥 Número de invitados:\n🎨 Temática deseada:`
    );

    const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    const cakeCategories = [
        {
            title: 'Cumpleaños Infantiles',
            description: 'Tortas temáticas llenas de color y diversión para los más pequeños',
            image: '/bday-minnie-pink.jpg',
            themes: ['Princesas', 'Superhéroes', 'Personajes animados', 'Unicornios', 'Dinosaurios', 'Frozen']
        },
        {
            title: 'Cumpleaños Adultos',
            description: 'Diseños elegantes y sofisticados para celebraciones especiales',
            image: '/bday-elegant.jpg',
            themes: ['Elegantes', 'Minimalistas', 'Temáticas personalizadas', 'Corporativos', 'Números dorados', 'Flores naturales']
        }
    ];

    const features = [
        { icon: Cake, title: 'Diseños Personalizados', desc: 'Adaptamos cada torta a tu temática' },
        { icon: Heart, title: 'Sabores Variados', desc: 'Desde clásicos hasta especiales' },
        { icon: Sparkles, title: 'Decoración Premium', desc: 'Detalles que marcan la diferencia' }
    ];

    const testimonials = [
        {
            name: "Patricia G.",
            text: "La torta de Frozen para mi hija fue exactamente lo que pedí. Los niños quedaron encantados.",
            rating: 5,
            event: "Cumpleaños infantil"
        },
        {
            name: "Miguel A.",
            text: "Torta elegante para mis 40 años. Presentación impecable y sabor delicioso.",
            rating: 5,
            event: "Cumpleaños adulto"
        },
        {
            name: "Carla M.",
            text: "Pedí una torta de superhéroes y superó mis expectativas. Mi hijo no paraba de sonreír.",
            rating: 5,
            event: "Cumpleaños infantil"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            {/* Minimal Header */}
            <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="font-script text-3xl text-charcoal">Pabels Patisserie</Link>
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
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-script text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
                            🎂 Tortas de Cumpleaños<br />en Potosí
                        </h1>
                        <p className="text-xl md:text-2xl text-charcoal/70 mb-4 font-light">
                            Infantiles • Adultos • Temáticas personalizadas
                        </p>
                        <p className="text-sm text-charcoal/60 mb-8 max-w-2xl mx-auto">
                            Hacemos realidad la torta de tus sueños. Desde personajes animados hasta diseños elegantes y minimalistas.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Cotizar mi torta ahora
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                    >
                        <Image
                            src="/bday-hero.jpg"
                            alt="Tortas de cumpleaños"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            priority
                        />
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-16">
                        Encuentra tu torta perfecta
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {cakeCategories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="bg-gradient-to-b from-white to-[#F9F5F0] rounded-3xl overflow-hidden shadow-xl"
                            >
                                <div className="relative h-80 group cursor-pointer overflow-hidden">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="font-script text-4xl text-charcoal mb-4">{category.title}</h3>
                                    <p className="text-charcoal/70 mb-6">{category.description}</p>
                                    <div className="mb-6">
                                        <p className="text-sm font-bold text-charcoal/60 mb-3 uppercase tracking-wider">Temáticas populares</p>
                                        <div className="flex flex-wrap gap-2">
                                            {category.themes.map((theme, i) => (
                                                <span key={i} className="bg-[#D48995]/10 text-charcoal px-3 py-1 rounded-full text-sm">
                                                    {theme}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full font-bold hover:bg-[#D48995] transition-colors"
                                    >
                                        <MessageCircle size={18} />
                                        Cotizar esta categoría
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-12">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="bg-[#D48995]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="text-[#D48995]" size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-charcoal mb-2">{feature.title}</h3>
                                <p className="text-charcoal/60">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-center text-charcoal/60 mb-12">
                        Cada cumpleaños es especial. Estas son algunas de las experiencias de nuestros clientes.
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

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-[#D48995] to-[#b56d79] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-script text-4xl md:text-5xl mb-4">
                            ¡Haz tu cumpleaños inolvidable!
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Cotiza tu torta personalizada ahora.<br />
                            Reserva con anticipación para asegurar tu fecha.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-[#D48995] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Cotizar mi torta ahora
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-charcoal text-cream py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="font-script text-3xl mb-4">Repostería Pabel</h3>
                    <p className="text-cream/80 mb-2">Tortas de cumpleaños personalizadas</p>
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
