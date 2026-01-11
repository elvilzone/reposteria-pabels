'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Star, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function SpecialCakesLanding() {
    const whatsappMessage = encodeURIComponent(
        `Hola 👋\nVengo desde su página web y quiero información sobre:\n\n👉 Torta especial\n🎂 Sabor deseado:\n📅 Fecha de entrega:\n👥 Número de porciones:`
    );

    const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    const cakeTypes = [
        {
            name: 'Tres Leches',
            description: 'Bizcocho esponjoso bañado en tres tipos de leche. Suave, húmedo y delicioso.',
            image: '/tres-leches.jpg',
            features: ['Receta tradicional', 'Extra húmeda', 'Toppings personalizados']
        },
        {
            name: 'Red Velvet',
            description: 'Terciopelo rojo con frosting de queso crema. Elegante y sofisticada.',
            image: '/red-velvet.jpg',
            features: ['Color vibrante', 'Frosting cremoso', 'Sabor único']
        },
        {
            name: 'Torta Matilda',
            description: 'Chocolate intenso con ganache. Para los verdaderos amantes del chocolate.',
            image: '/chocolate-cake.jpg',
            features: ['Chocolate premium', 'Ganache artesanal', 'Intensidad perfecta']
        },
        {
            name: 'Chocolate Clásico',
            description: 'Bizcocho de chocolate con relleno de manjar o crema. Un clásico irresistible.',
            image: '/chocolate-classic.jpg',
            features: ['Receta casera', 'Rellenos variados', 'Decoración elegante']
        }
    ];

    const testimonials = [
        {
            name: "Laura M.",
            text: "La tres leches estaba perfecta. Justo el punto de dulce que buscaba.",
            rating: 5
        },
        {
            name: "Carlos R.",
            text: "La Red Velvet superó mis expectativas. Presentación impecable.",
            rating: 5
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
                        <span className="hidden sm:inline">Pedir ahora</span>
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
                            🍰 Tortas Especiales<br />Sabores Premium
                        </h1>
                        <p className="text-xl md:text-2xl text-charcoal/70 mb-4 font-light">
                            Tres Leches • Red Velvet • Matilda • Chocolate Clásico
                        </p>
                        <p className="text-sm text-charcoal/60 mb-8 max-w-2xl mx-auto">
                            Elaboradas con ingredientes de calidad y recetas perfeccionadas. Ideales para celebraciones especiales o simplemente darte un gusto.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Pedir mi torta por WhatsApp
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Cake Types Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {cakeTypes.map((cake, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                            >
                                <div className="relative h-64 group cursor-pointer overflow-hidden">
                                    <Image
                                        src={cake.image}
                                        alt={cake.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="font-script text-4xl text-charcoal mb-3">{cake.name}</h3>
                                    <p className="text-charcoal/70 mb-6">{cake.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {cake.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-charcoal/80">
                                                <Check size={16} className="text-[#D48995]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#D48995] transition-colors"
                                    >
                                        <MessageCircle size={18} />
                                        Pedir esta torta
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-script text-4xl md:text-5xl text-charcoal mb-12">
                        ¿Por qué nuestras tortas especiales?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Ingredientes Premium', desc: 'Solo usamos los mejores ingredientes importados y locales' },
                            { title: 'Recetas Perfeccionadas', desc: 'Años de experiencia en cada preparación' },
                            { title: 'Frescura Garantizada', desc: 'Horneamos el mismo día de entrega' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6"
                            >
                                <h3 className="font-bold text-xl text-charcoal mb-3">{item.title}</h3>
                                <p className="text-charcoal/60 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-script text-4xl md:text-5xl text-center text-charcoal mb-12">
                        Lo que dicen nuestros clientes
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="gold" className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-charcoal/80 italic mb-4">&quot;{testimonial.text}&quot;</p>
                                <p className="font-bold text-charcoal">{testimonial.name}</p>
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
                            ¿Listo para probar?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Haz tu pedido ahora y disfruta de nuestras tortas especiales.<br />
                            Entrega en Potosí.
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-[#D48995] px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <MessageCircle size={24} />
                            📲 Hacer mi pedido
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-charcoal text-cream py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="font-script text-3xl mb-4">Repostería Pabel</h3>
                    <p className="text-cream/80 mb-2">Tortas especiales artesanales</p>
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
