'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl font-bold text-[#5D4037] mb-4">Contáctanos</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Visítanos en nuestra tienda principal o haz tu pedido online.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-[#F5F5DC] rounded-3xl overflow-hidden shadow-xl">
                    {/* MAPA GOOGLE EMBED */}
                    <div className="h-[400px] md:h-auto bg-gray-200 w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.263884876275!2d-68.13110262423164!3d-16.502016340274195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20732339d227%3A0x62804f32c0282928!2sPlaza%20Murillo!5e0!3m2!1ses!2sbo!4v1714521400000!5m2!1ses!2sbo"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '300px' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación Pabel's"
                        ></iframe>
                    </div>

                    <div className="bg-[#5D4037] text-[#F5F5DC] p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="font-serif text-2xl font-bold text-[#FFD700] mb-8">Información</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <MapPin className="text-[#FFD700] flex-shrink-0" />
                                    <span>Av. Principal 123, Plaza Central<br />Ciudad Gastronómica</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="text-[#FFD700] flex-shrink-0" />
                                    <span>+591 123 456 78</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="text-[#FFD700] flex-shrink-0" />
                                    <span>pedidos@pabels.com</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-serif text-xl font-bold text-[#FFD700] mb-4">Envíanos un mensaje rápido</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Tu Nombre" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]" />
                                <input type="email" placeholder="Tu Correo" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700]" />
                                <button className="w-full bg-[#FFD700] text-[#5D4037] font-bold py-2 rounded hover:bg-white transition-colors">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
