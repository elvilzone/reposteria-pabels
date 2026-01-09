'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Option 1: Send via WhatsApp (simple, no backend needed)
        const whatsappMessage = `*📩 Nuevo mensaje desde la web*\n\n` +
            `*Nombre:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Mensaje:* ${formData.message}`;

        // Store locally for admin reference
        const messages = JSON.parse(localStorage.getItem('pabels_messages') || '[]');
        messages.push({
            ...formData,
            date: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('pabels_messages', JSON.stringify(messages));

        // Simulate sending delay
        setTimeout(() => {
            setStatus('success');

            // Open WhatsApp with the message
            window.open(
                `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
                '_blank'
            );

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setStatus('idle');
            }, 3000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-4">Hablemos</span>
                    <h1 className="font-script text-6xl md:text-7xl text-charcoal mb-4">Contáctanos</h1>
                    <p className="text-charcoal/60 max-w-lg mx-auto">
                        ¿Tienes una pregunta, un pedido especial o simplemente quieres saludar? Estamos aquí para ti.
                    </p>
                </motion.div>

                {/* Split Card Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[550px]"
                >

                    {/* Left Side: Image + Info */}
                    <div className="w-full md:w-1/2 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800"
                            alt="Nuestra Tienda"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent"></div>

                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="font-script text-3xl mb-6">Encuéntranos</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-mauve mt-0.5 shrink-0" size={18} />
                                    <div>
                                        <p className="font-bold">{SITE_CONFIG.address.street}</p>
                                        <p className="text-white/70">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="text-mauve shrink-0" size={18} />
                                    <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-mauve transition-colors">
                                        {SITE_CONFIG.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="text-mauve shrink-0" size={18} />
                                    <p>{SITE_CONFIG.hours.weekdays}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="text-mauve shrink-0" size={18} />
                                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-mauve transition-colors">
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 bg-cream flex flex-col justify-center">
                        <h3 className="font-script text-4xl text-charcoal mb-2">Envíanos un mensaje</h3>
                        <p className="text-charcoal/50 text-sm mb-8">Te responderemos lo antes posible.</p>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                                <h4 className="font-bold text-charcoal text-xl mb-2">¡Mensaje enviado!</h4>
                                <p className="text-charcoal/60 text-sm">
                                    Serás redirigido a WhatsApp para confirmar tu mensaje.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/70 uppercase tracking-wider mb-2">
                                        Tu Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ej: María García"
                                        className="w-full bg-white border border-mauve/20 rounded-xl px-4 py-3 placeholder-charcoal/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-mauve/50 transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/70 uppercase tracking-wider mb-2">
                                        Correo Electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full bg-white border border-mauve/20 rounded-xl px-4 py-3 placeholder-charcoal/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-mauve/50 transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/70 uppercase tracking-wider mb-2">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-white border border-mauve/20 rounded-xl px-4 py-3 placeholder-charcoal/30 text-charcoal focus:outline-none focus:ring-2 focus:ring-mauve/50 transition-all text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-mauve text-white font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-charcoal transition-colors shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <MessageCircle size={16} />
                                            Enviar por WhatsApp
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-charcoal/40 text-center">
                                    Al enviar, serás redirigido a WhatsApp para confirmar tu mensaje.
                                </p>
                            </form>
                        )}

                        {/* Social */}
                        <div className="mt-8 pt-6 border-t border-mauve/10 text-center">
                            <p className="text-xs text-charcoal/50 mb-3">O síguenos en redes sociales</p>
                            <div className="flex justify-center gap-3">
                                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-mauve/10 flex items-center justify-center text-mauve hover:bg-mauve hover:text-white transition-colors">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
