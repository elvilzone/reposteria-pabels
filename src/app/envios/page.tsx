'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, CreditCard, Package, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { SITE_CONFIG } from '@/lib/config';

export default function EnviosPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 px-4 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8]">
            <div className="max-w-4xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-4">Delivery</span>
                    <h1 className="font-script text-6xl text-charcoal mb-4">Envíos y Entregas</h1>
                    <p className="text-charcoal/60 max-w-lg mx-auto">
                        Llevamos la dulzura hasta la puerta de tu casa. Conoce nuestras zonas de cobertura y tiempos de entrega.
                    </p>
                </motion.div>

                {/* Free Shipping Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-mauve text-white rounded-3xl p-6 mb-8 flex items-center justify-center gap-4 text-center"
                >
                    <Truck size={32} />
                    <div>
                        <p className="font-bold text-lg">¡Envío GRATIS en pedidos mayores a Bs. {SITE_CONFIG.shipping.freeShippingMinimum}!</p>
                        <p className="text-white/80 text-sm">Válido en zonas seleccionadas de {SITE_CONFIG.address.city}</p>
                    </div>
                </motion.div>

                {/* Zones Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8"
                >
                    <div className="bg-charcoal text-white p-6">
                        <h2 className="font-script text-3xl flex items-center gap-3">
                            <MapPin size={24} /> Zonas de Cobertura
                        </h2>
                    </div>
                    <div className="divide-y divide-mauve/10">
                        {SITE_CONFIG.shipping.zones.map((zone, index) => (
                            <div key={index} className="flex items-center justify-between p-5 hover:bg-mauve/5 transition-colors">
                                <span className="font-bold text-charcoal">{zone.name}</span>
                                <div className="flex gap-8 text-sm">
                                    <span className="text-mauve font-bold">Bs. {zone.price}</span>
                                    <span className="text-charcoal/50 flex items-center gap-1">
                                        <Clock size={14} /> 30-45 min
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-3 text-mauve mb-4">
                            <Clock size={24} />
                            <h3 className="font-bold text-charcoal text-lg">Horarios de Entrega</h3>
                        </div>
                        <ul className="text-charcoal/70 text-sm space-y-2">
                            <li>• <strong>Lunes a Domingo:</strong> 10:30 AM - 9:00 PM</li>
                            <li>• <strong>Pedidos Especiales:</strong> Agendar con anticipación</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-3 text-mauve mb-4">
                            <Package size={24} />
                            <h3 className="font-bold text-charcoal text-lg">Empaque Seguro</h3>
                        </div>
                        <p className="text-charcoal/70 text-sm">
                            Todos nuestros productos viajan en empaques térmicos y sellados para garantizar que lleguen en perfecto estado. Las tortas incluyen base antideslizante sin costo adicional.
                        </p>
                    </motion.div>
                </div>

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4"
                >
                    <AlertCircle className="text-amber-500 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-amber-800 mb-1">Nota Importante</h4>
                        <p className="text-amber-700 text-sm">
                            Los tiempos de entrega son estimados y pueden variar según el tráfico y condiciones climáticas.
                            Para pedidos urgentes o fechas especiales (Día de la Madre, San Valentín), te recomendamos ordenar con al menos 48 horas de anticipación.
                        </p>
                    </div>
                </motion.div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link href="/menu" className="inline-block bg-charcoal text-white px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-mauve transition-colors">
                        Ver Menú y Ordenar
                    </Link>
                </div>
            </div>
        </div>
    );
}
