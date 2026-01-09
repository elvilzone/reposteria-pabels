'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Trash2, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

const sections = [
    {
        icon: Database,
        title: "Información que Recopilamos",
        content: `Recopilamos información que nos proporcionas directamente cuando:
        
• Realizas un pedido (nombre, teléfono, dirección de entrega)
• Te suscribes a nuestro boletín (correo electrónico)
• Nos contactas a través del formulario web (nombre, email, mensaje)
• Interactúas con nuestras redes sociales

También recopilamos automáticamente información técnica como tu dirección IP y tipo de navegador para mejorar nuestro servicio.`
    },
    {
        icon: Eye,
        title: "Uso de la Información",
        content: `Utilizamos tu información para:

• Procesar y entregar tus pedidos
• Comunicarnos contigo sobre tu pedido
• Enviarte promociones y novedades (solo si te suscribiste)
• Mejorar nuestros productos y servicios
• Responder a tus consultas y solicitudes
• Cumplir con obligaciones legales

Nunca vendemos ni compartimos tu información personal con terceros para fines de marketing.`
    },
    {
        icon: Lock,
        title: "Protección de Datos",
        content: `Implementamos medidas de seguridad para proteger tu información:

• Conexiones cifradas (HTTPS)
• Acceso restringido a datos personales
• Almacenamiento seguro de información

Sin embargo, ningún método de transmisión por Internet es 100% seguro. Hacemos nuestro mejor esfuerzo para proteger tus datos.`
    },
    {
        icon: UserCheck,
        title: "Tus Derechos",
        content: `Tienes derecho a:

• Acceder a tus datos personales
• Rectificar información incorrecta
• Solicitar la eliminación de tus datos
• Oponerte al procesamiento de tus datos
• Cancelar tu suscripción al boletín en cualquier momento

Para ejercer estos derechos, contáctanos por WhatsApp o correo electrónico.`
    },
    {
        icon: Trash2,
        title: "Retención de Datos",
        content: `Conservamos tu información mientras:

• Tengas una cuenta activa con nosotros
• Sea necesario para prestarte servicios
• Lo requiera la ley

Los datos de pedidos se conservan por 5 años para fines contables y legales. Los datos del boletín se eliminan cuando cancelas tu suscripción.`
    },
    {
        icon: Mail,
        title: "Comunicaciones",
        content: `Si te suscribes a nuestro boletín, recibirás:

• Promociones especiales y descuentos
• Nuevos productos y sabores
• Noticias de temporada

Puedes cancelar tu suscripción en cualquier momento haciendo clic en "Cancelar suscripción" en nuestros correos o contactándonos directamente.`
    }
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-16 h-16 bg-mauve/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-mauve" size={32} />
                    </div>
                    <h1 className="font-script text-5xl md:text-6xl text-charcoal mb-4">Política de Privacidad</h1>
                    <p className="text-charcoal/60 max-w-lg mx-auto">
                        En {SITE_CONFIG.businessName}, valoramos y protegemos tu privacidad. Esta política explica cómo manejamos tu información personal.
                    </p>
                    <p className="text-xs text-charcoal/40 mt-4">
                        Última actualización: Enero 2026
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-mauve/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-mauve/10 rounded-xl flex items-center justify-center shrink-0">
                                    <section.icon className="text-mauve" size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-charcoal text-lg mb-3">{section.title}</h2>
                                    <div className="text-charcoal/70 text-sm leading-relaxed whitespace-pre-line">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center bg-charcoal rounded-3xl p-8"
                >
                    <h3 className="font-script text-3xl text-white mb-2">¿Tienes preguntas?</h3>
                    <p className="text-cream/60 text-sm mb-6">
                        Si tienes dudas sobre nuestra política de privacidad o quieres ejercer tus derechos, contáctanos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-mauve text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-charcoal transition-colors"
                        >
                            Contactar
                        </Link>
                        <a
                            href={`mailto:${SITE_CONFIG.email}`}
                            className="bg-white/10 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-charcoal transition-colors"
                        >
                            {SITE_CONFIG.email}
                        </a>
                    </div>
                </motion.div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-mauve hover:text-charcoal text-sm font-bold uppercase tracking-widest transition-colors">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
