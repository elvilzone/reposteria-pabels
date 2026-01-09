'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, MessageCircle, Ruler, Slice } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/lib/products';

import { SITE_CONFIG } from '@/lib/config';

const CAKE_SIZES = [
    { id: 'mini', label: 'Mini', portions: '4-6 porciones', price: 'desde $25', icon: '🧁' },
    { id: 'small', label: 'Pequeña', portions: '10-15 porciones', price: 'desde $45', icon: '🎂' },
    { id: 'medium', label: 'Mediana', portions: '20-25 porciones', price: 'desde $70', icon: '🍰' },
    { id: 'large', label: 'Grande', portions: '50+ porciones', price: 'desde $120', icon: '🏰' },
];

const DEFAULT_FLAVORS = [
    { id: 'vainilla', name: 'Vainilla Clásica', description: 'Con relleno de manjar o mermelada' },
    { id: 'chocolate', name: 'Chocolate Supremo', description: 'Bizcocho húmedo de cacao' },
    { id: 'redvelvet', name: 'Red Velvet', description: 'Con frosting de queso crema' },
];

export default function CustomCakesPage() {
    const { products } = useProducts();
    const [step, setStep] = useState(1);

    // Fetch dynamic flavors from Admin. If none, use defaults.
    const flavors = useMemo(() => {
        const dynamicFlavors = products.filter(p => p.category === 'sabores');
        return dynamicFlavors.length > 0 ? dynamicFlavors : DEFAULT_FLAVORS;
    }, [products]);

    const [selection, setSelection] = useState({
        size: '',
        flavor: '',
        theme: '',
        date: ''
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const generateWhatsAppLink = () => {
        // Find selected flavor object safely
        const selectedFlavorObj = flavors.find((f: any) => f.id.toString() === selection.flavor);

        const text = `¡Hola! Me gustaría cotizar una torta personalizada:%0A%0A` +
            `📏 *Tamaño:* ${CAKE_SIZES.find(s => s.id === selection.size)?.label || selection.size}%0A` +
            `🍰 *Sabor:* ${selectedFlavorObj ? selectedFlavorObj.name : selection.flavor}%0A` +
            `🎨 *Temática:* ${selection.theme}%0A` +
            `📅 *Fecha:* ${selection.date}%0A%0A` +
            `¿Tienen disponibilidad?`;

        return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12">

            {/* Nav Back */}
            <div className="max-w-7xl mx-auto px-4 mb-4">
                <Link href="/" className="inline-flex items-center text-charcoal/60 hover:text-mauve transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Volver al Inicio
                </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-mauve font-bold tracking-[0.2em] uppercase text-xs block mb-3">Diseña tu sueño</span>
                <h1 className="font-script text-6xl text-charcoal">Cotizador de Tortas</h1>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-mauve -z-10 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-mauve text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {s}
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col justify-between relative overflow-hidden">

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-3xl font-script text-charcoal mb-2">Elige el Tamaño</h2>
                                <p className="text-gray-500 mb-8">¿Para cuántas personas es el evento?</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CAKE_SIZES.map((size) => (
                                        <button
                                            key={size.id}
                                            onClick={() => setSelection({ ...selection, size: size.id })}
                                            className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-105 flex items-center gap-4
                                                ${selection.size === size.id ? 'border-mauve bg-mauve/5 ring-2 ring-mauve/20' : 'border-gray-100 hover:border-mauve/50'}
                                            `}
                                        >
                                            <span className="text-4xl">{size.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-charcoal">{size.label}</h3>
                                                <p className="text-sm text-gray-500">{size.portions}</p>
                                                <span className="text-xs font-bold text-mauve uppercase tracking-wider">{size.price}</span>
                                            </div>
                                            {selection.size === size.id && <Check className="ml-auto text-mauve" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-3xl font-script text-charcoal mb-2">Elige el Sabor</h2>
                                <p className="text-gray-500 mb-8">La base de tu celebración</p>

                                <div className="space-y-3">
                                    {flavors.map((flavor: any) => (
                                        <button
                                            key={flavor.id}
                                            onClick={() => setSelection({ ...selection, flavor: flavor.id.toString() })}
                                            className={`w-full p-4 rounded-xl border text-left transition-colors flex items-center justify-between
                                                ${selection.flavor === flavor.id.toString() ? 'border-mauve bg-mauve/5' : 'border-gray-100 hover:bg-gray-50'}
                                            `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full ${selection.flavor === flavor.id.toString() ? 'bg-mauve' : 'bg-gray-300'}`}></div>
                                                <div>
                                                    <span className="font-bold text-charcoal block">{flavor.name}</span>
                                                    <span className="text-xs text-gray-500">{flavor.description}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}

                                    <p className="text-xs text-center text-gray-400 mt-4 italic">
                                        * ¿Deseas más sabores? Comunícate a nuestro WhatsApp.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-3xl font-script text-charcoal mb-2">Detalles Finales</h2>
                                <p className="text-gray-500 mb-8">Cuéntanos sobre el diseño y la fecha</p>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">Fecha del Evento</label>
                                        <input
                                            type="date"
                                            value={selection.date}
                                            onChange={(e) => setSelection({ ...selection, date: e.target.value })}
                                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-mauve focus:ring-1 focus:ring-mauve"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-charcoal mb-2">Idea o Temática</label>
                                        <textarea
                                            placeholder="Ej: Cumpleaños de dinosaurios, tonos pasteles, elegante con detalles dorados..."
                                            rows={4}
                                            value={selection.theme}
                                            onChange={(e) => setSelection({ ...selection, theme: e.target.value })}
                                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-mauve focus:ring-1 focus:ring-mauve text-sm"
                                        ></textarea>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <button onClick={handleBack} className="text-gray-500 hover:text-charcoal font-bold text-sm">
                                Atrás
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (step === 1 && !selection.size) ||
                                    (step === 2 && !selection.flavor)
                                }
                                className="bg-charcoal text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Siguiente <ChevronRight size={16} />
                            </button>
                        ) : (
                            <a
                                href={generateWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-[#25D366] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:brightness-110 transition-colors flex items-center gap-2 shadow-lg shadow-green-200
                                    ${(!selection.date || !selection.theme) ? 'opacity-50 pointer-events-none' : ''}
                                `}
                            >
                                <MessageCircle size={18} />
                                Cotizar por WhatsApp
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
