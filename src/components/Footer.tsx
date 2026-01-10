'use client';

import { Instagram, Facebook, Mail, MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-cream pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h2 className="font-script text-4xl mb-4 text-white">Pabel&apos;s</h2>
                        <p className="text-cream/60 text-sm leading-relaxed">
                            Dulzura artesanal desde 2010. Creamos momentos especiales con cada bocado.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-bold text-mauve uppercase tracking-wider text-sm mb-4">Explorar</h3>
                        <ul className="space-y-2 text-cream/70">
                            <li><Link href="/menu" className="hover:text-mauve transition-colors">Menú</Link></li>
                            <li><Link href="/packs-de-regalo" className="hover:text-mauve transition-colors">Packs de Regalo</Link></li>
                            <li><Link href="/servicios/tortas-personalizadas" className="hover:text-mauve transition-colors">Tortas Personalizadas</Link></li>
                            <li><Link href="/nosotros" className="hover:text-mauve transition-colors">Nuestra Historia</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="font-bold text-mauve uppercase tracking-wider text-sm mb-4">Ayuda</h3>
                        <ul className="space-y-2 text-cream/70">
                            <li><Link href="/faq" className="hover:text-mauve transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="/envios" className="hover:text-mauve transition-colors">Envíos y Entregas</Link></li>
                            <li><Link href="/contact" className="hover:text-mauve transition-colors">Contacto</Link></li>
                            <li><Link href="/privacidad" className="hover:text-mauve transition-colors">Política de Privacidad</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-mauve uppercase tracking-wider text-sm mb-4">Encuéntranos</h3>
                        <ul className="space-y-3 text-cream/70 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 text-mauve shrink-0" />
                                <span>{SITE_CONFIG.address.street}<br />{SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-mauve shrink-0" />
                                <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-mauve">{SITE_CONFIG.phone}</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock size={16} className="text-mauve shrink-0" />
                                <span>{SITE_CONFIG.hours.weekdays}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-mauve shrink-0" />
                                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-mauve">{SITE_CONFIG.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-cream/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        {/* Social */}
                        <div className="flex gap-3">
                            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-mauve hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-mauve hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                        </div>

                        {/* Copyright */}
                        <p className="text-xs text-cream/40 text-center">
                            © {new Date().getFullYear()} Pabel&apos;s Patisserie. Todos los derechos reservados. Hecho con ♥ en Bolivia.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
