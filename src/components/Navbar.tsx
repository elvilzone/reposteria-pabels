'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { cart, setIsCartOpen } = useCart();

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Menú', href: '/menu' },
        { name: 'Packs', href: '/packs-de-regalo' },
        { name: 'Contacto', href: '/contact' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-[#EAD8D8] text-charcoal shadow-sm border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">

                    {/* Elements Left (Mobile Menu Button) */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-mauve hover:text-charcoal focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Left Links (Desktop) */}
                    <div className="hidden md:flex items-center space-x-10 w-1/3 justify-start pl-8">
                        <Link href="/" className="font-script text-3xl font-bold text-charcoal hover:text-mauve transition-colors">Inicio</Link>
                        <Link href="/menu" className="font-script text-3xl font-bold text-charcoal hover:text-mauve transition-colors">Menú</Link>
                        <Link href="/packs-de-regalo" className="font-script text-3xl font-bold text-charcoal hover:text-mauve transition-colors">Packs</Link>
                    </div>

                    {/* Center Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center w-1/3">
                        <Link href="/" className="flex flex-col items-center group">
                            <h1 className="font-script text-5xl font-bold text-charcoal tracking-wide group-hover:scale-105 transition-transform">Pabels Patisserie</h1>
                            <div className="w-2 h-2 bg-mauve rounded-full mt-1"></div>
                        </Link>
                    </div>

                    {/* Right Links & Cart (Desktop) */}
                    <div className="hidden md:flex items-center space-x-8 w-1/3 justify-end pr-8">
                        <div className="flex items-center space-x-6 mr-6 border-r border-gray-300 pr-6">
                            <Link href="/contact" className="font-script text-3xl font-bold text-charcoal hover:text-mauve transition-colors">Contacto</Link>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-charcoal hover:text-mauve transition-colors"
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-mauve text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Cart Button */}
                    <div className="md:hidden flex">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-charcoal hover:text-mauve transition-colors"
                        >
                            <ShoppingBag size={24} />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-mauve text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#4E342E] overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium
                    ${isActive(link.href) ? 'text-[#FFD700] bg-black/20' : 'text-[#F5F5DC] hover:text-[#FFB6C1]'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
