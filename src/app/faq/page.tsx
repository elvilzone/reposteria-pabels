'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Truck, Clock, CreditCard, Gift, Phone } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

const faqs = [
    {
        icon: Truck,
        question: "¿Hacen envíos a domicilio?",
        answer: "¡Sí! Realizamos envíos a toda la ciudad de Cochabamba. El costo varía según la zona (desde Bs. 15). Para pedidos mayores a Bs. 150, el envío es gratis dentro del 2do anillo."
    },
    {
        icon: Clock,
        question: "¿Con cuánta anticipación debo hacer mi pedido?",
        answer: "Para productos del menú regular, puedes pedir con 24 horas de anticipación. Para tortas personalizadas o pedidos grandes (más de 20 unidades), te recomendamos 48-72 horas de anticipación."
    },
    {
        icon: CreditCard,
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos efectivo, transferencia bancaria (BCP, Banco Unión), QR Simple y tarjetas de crédito/débito. Para pedidos por WhatsApp, el pago se realiza al momento de la entrega o por transferencia anticipada."
    },
    {
        icon: Gift,
        question: "¿Puedo personalizar una torta o pack de regalo?",
        answer: "¡Por supuesto! Usa nuestro diseñador de tortas online o contáctanos por WhatsApp para pedidos especiales. Podemos agregar nombres, logos, colores específicos y más."
    },
    {
        icon: HelpCircle,
        question: "¿Los productos contienen alérgenos?",
        answer: "La mayoría de nuestros productos contienen gluten, huevo y lácteos. Ofrecemos opciones veganas y sin gluten bajo pedido especial. Por favor, infórmanos de cualquier alergia al momento de ordenar."
    },
    {
        icon: Phone,
        question: "¿Cómo puedo hacer un pedido?",
        answer: `Puedes ordenar directamente desde nuestra web (agregando productos al carrito), por WhatsApp al ${SITE_CONFIG.phone}, o visitando nuestra tienda física en ${SITE_CONFIG.address.street}.`
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            <div className="max-w-3xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-4">Ayuda</span>
                    <h1 className="font-script text-6xl text-charcoal mb-4">Preguntas Frecuentes</h1>
                    <p className="text-charcoal/60 max-w-lg mx-auto">
                        Aquí encontrarás respuestas a las dudas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-mauve/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-mauve/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-mauve text-white' : 'bg-mauve/10 text-mauve'}`}>
                                        <faq.icon size={20} />
                                    </div>
                                    <span className="font-bold text-charcoal">{faq.question}</span>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`text-mauve transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-5"
                                >
                                    <div className="pl-14 text-charcoal/70 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center bg-charcoal rounded-3xl p-8"
                >
                    <h3 className="font-script text-3xl text-white mb-2">¿Aún tienes dudas?</h3>
                    <p className="text-cream/60 text-sm mb-6">Estamos aquí para ayudarte en lo que necesites.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="bg-mauve text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-charcoal transition-colors">
                            Contáctanos
                        </Link>
                        <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-green-600 transition-colors">
                            WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
