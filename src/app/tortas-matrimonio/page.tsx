'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Check, MessageCircle, Star, Heart, Calendar, Users, Award } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function WeddingCakesLanding() {
    const whatsappMessage = encodeURIComponent(
        `Hola 👋\nVengo desde su página web y quiero información sobre:\n\n👉 Torta de matrimonio\n📅 Fecha del evento: \n👥 Número de invitados: \n🎂 Sabor deseado: `
    );

    const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    const features = [
        { icon: Heart, text: 'Diseños personalizados según tu evento' },
        { icon: Award, text: 'Sabores clásicos y especiales' },
        { icon: Users, text: 'Atención directa y asesoramiento' },
        { icon: Calendar, text: 'Reservas con anticipación' }
    ];

    const testimonials = [
        {
            name: "María & Carlos",
            text: "Nuestra torta fue el centro de atención. Todos preguntaron dónde la conseguimos. ¡Perfecta!",
            rating: 5,
            event: "Boda - Diciembre 2024"
        },
        {
            name: "Ana Laura",
            text: "Superó nuestras expectativas. El sabor y la presentación fueron impecables.",
            rating: 5,
            event: "Boda - Octubre 2024"
        },
        {
            name: "Roberto & Sofía",
            text: "Trabajar con Pabel fue muy fácil. Entendieron exactamente lo que queríamos.",
            rating: 5,
            event: "Boda - Agosto 2024"
        }
    ];

    const pricing = [
        { guests: '50 personas', price: 'Desde Bs. 800', popular: false },
        { guests: '100 personas', price: 'Desde Bs. 1,400', popular: true },
        { guests: '200+ personas', price: 'Cotización personalizada', popular: false }
    ];

    const galleryImages = [
        '/wedding-cake-detail.jpg',
        '/wedding-gold-setup.jpg',
        '/wedding-pastel-roses.jpg',
        '/wedding-red-cascade.jpg',
        '/wedding-setup-columns.jpg',
        '/wedding-setup-pink.jpg'
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
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="font-script text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
                            Tortas de matrimonio<br />personalizadas en Potosí
                        </h1>
                        <p className="text-xl md:text-2xl text-charcoal/70 mb-4 font-light">
                            Diseños elegantes • Sabores premium • Hechas artesanalmente para tu día especial
                        </p>
                        <p className="text-sm text-charcoal/60 mb-8 max-w-2xl mx-auto">
                            Trabajamos con cupos limitados por fecha para garantizar calidad y detalle en cada torta.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            Cotizar por WhatsApp
                        </a>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/wedding-gold-setup.jpg"
                            alt="Torta de matrimonio elegante"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-sm font-bold uppercase tracking-wider mb-2">Más de 50 bodas en 2024</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="gold" className="text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-12">
                        ¿Por qué elegir Repostería Pabel?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                <p className="text-charcoal font-medium">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-12">
                        Nuestros diseños
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
                                    alt={`Torta de matrimonio ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-script text-4xl md:text-5xl text-charcoal mb-4">
                        Precios referenciales
                    </h2>
                    <p className="text-charcoal/60 mb-12">Cotización final según diseño y detalles personalizados</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pricing.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-8 rounded-3xl border-2 ${item.popular
                                        ? 'border-[#D48995] bg-[#D48995]/5 shadow-lg scale-105'
                                        : 'border-gray-200'
                                    }`}
                            >
                                {item.popular && (
                                    <span className="bg-[#D48995] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                                        MÁS POPULAR
                                    </span>
                                )}
                                <p className="text-2xl font-bold text-charcoal mb-2">{item.guests}</p>
                                <p className="text-3xl font-script text-[#D48995] mb-4">{item.price}</p>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-charcoal text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#D48995] transition-colors"
                                >
                                    Consultar
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-center text-charcoal/60 mb-12">
                        Cada torta es parte de un momento especial. La satisfacción de nuestros clientes nos respalda.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
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
                            Cupos limitados por fecha
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Para tortas de matrimonio recomendamos reservar con anticipación.<br />
                            Consulta disponibilidad y asegura tu fecha.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-[#D48995] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            Reservar por WhatsApp
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-charcoal text-cream py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="font-script text-3xl mb-4">Pabels Patisserie</h3>
                    <p className="text-cream/80 mb-2">Tortas de matrimonio y tortas artesanales</p>
                    <p className="text-cream/60 text-sm mb-4">
                        📍 {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BA5A] transition-colors"
                    >
                        <MessageCircle size={20} />
                        Atención directa por WhatsApp
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
