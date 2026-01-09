'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Gift, ShoppingBag, Plus, X, Sparkles, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { useCategories } from '@/context/CategoryContext';

const BOX_IMAGES = {
    small: 'https://images.unsplash.com/photo-1549488352-259a9e334a1c?auto=format&fit=crop&q=80&w=300',
    medium: 'https://images.unsplash.com/photo-1602351447937-745cb72061d5?auto=format&fit=crop&q=80&w=300',
    large: 'https://images.unsplash.com/photo-1595666750059-d8312e75e966?auto=format&fit=crop&q=80&w=300'
};

export default function GiftPacksPage() {
    const { addToCart } = useCart();
    const { products, settings } = useProducts();
    const { categories } = useCategories();

    // --- Dynamic Configuration ---
    const boxSizes = useMemo(() => [
        { size: 4, name: 'Caja Pequeña', price: settings?.boxPrices?.small || 15, image: BOX_IMAGES.small },
        { size: 6, name: 'Caja Mediana', price: settings?.boxPrices?.medium || 22, image: BOX_IMAGES.medium },
        { size: 12, name: 'Caja Grande', price: settings?.boxPrices?.large || 40, image: BOX_IMAGES.large }
    ], [settings]);

    const treatOptions = useMemo(() => {
        return products.filter(p => p.isPackable).map(p => ({
            id: String(p.id),
            name: p.name,
            category: categories.find(c => c.id === p.category)?.name || p.category,
            rawCategory: p.category,
            image: p.image
        }));
    }, [products, categories]);

    const [activeTab, setActiveTab] = useState<'builder' | 'premade'>('builder');

    // Builder State
    const [selectedBox, setSelectedBox] = useState(boxSizes[1]); // Default medium
    const [boxContent, setBoxContent] = useState<typeof treatOptions>([]);

    // Update selected box if settings change
    useMemo(() => {
        const updated = boxSizes.find(b => b.size === selectedBox.size);
        if (updated) setSelectedBox(updated);
    }, [boxSizes]);

    const [activeTreatCategory, setActiveTreatCategory] = useState('Todos');

    // Memoized Filters
    const giftPacks = useMemo(() => products.filter(p => p.category === 'packs'), [products]);

    const treatCategories = useMemo(() => ['Todos', ...Array.from(new Set(treatOptions.map(t => t.category)))], [treatOptions]);

    const filteredTreats = useMemo(() =>
        activeTreatCategory === 'Todos' ? treatOptions : treatOptions.filter(t => t.category === activeTreatCategory),
        [activeTreatCategory, treatOptions]);

    // Handlers
    const addToBox = (treat: typeof treatOptions[0]) => {
        if (boxContent.length < selectedBox.size) {
            setBoxContent([...boxContent, treat]);
        }
    };

    const removeFromBox = (indexToRemove: number) => {
        setBoxContent(boxContent.filter((_, index) => index !== indexToRemove));
    };

    const handleAddBoxToCart = () => {
        const customProduct = {
            id: Date.now(),
            name: `${selectedBox.name} Personalizada`,
            price: selectedBox.price,
            category: 'packs',
            image: selectedBox.image,
            description: `Caja personalizada con: ${boxContent.map(i => i.name).join(', ')}`,
            ingredients: boxContent.map(i => i.name),
            rating: 5,
            isFestive: false
        };
        addToCart(customProduct);
        setBoxContent([]);
        alert('¡Caja añadida al carrito!');
    };

    const isBoxFull = boxContent.length === selectedBox.size;

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12">

            {/* Header & Nav */}
            <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-col items-center">
                <Link href="/" className="self-start inline-flex items-center text-charcoal/60 hover:text-mauve transition-colors mb-4">
                    <ArrowLeft size={20} className="mr-2" /> Volver al Inicio
                </Link>

                <h1 className="font-script text-6xl md:text-7xl text-charcoal mb-4">Packs de Regalo</h1>
                <p className="text-charcoal/60 max-w-xl text-center mb-8">
                    Crea recuerdos inolvidables con nuestros surtidos especiales.
                    Elige entre nuestros favoritos o diseña tu propia experiencia.
                </p>

                {/* Tabs */}
                <div className="bg-white p-1 rounded-full shadow-sm border border-mauve/20 inline-flex mb-12">
                    <button
                        onClick={() => setActiveTab('builder')}
                        className={`px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'builder' ? 'bg-mauve text-white shadow-md' : 'text-charcoal/60 hover:bg-mauve/10'}`}
                    >
                        Armar mi Caja
                    </button>
                    <button
                        onClick={() => setActiveTab('premade')}
                        className={`px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'premade' ? 'bg-mauve text-white shadow-md' : 'text-charcoal/60 hover:bg-mauve/10'}`}
                    >
                        Packs Listos
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'builder' ? (
                    <motion.div
                        key="builder"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-7xl mx-auto px-4"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">

                            {/* Left Col: Configuration & Treats */}
                            <div className="lg:col-span-7 space-y-12">

                                {/* Step 1: Choose Size */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="bg-mauve text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                                        <h3 className="text-2xl font-bold text-charcoal">Elige el tamaño</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {boxSizes.map(box => (
                                            <button
                                                key={box.size}
                                                onClick={() => { setSelectedBox(box); setBoxContent([]); }}
                                                className={`relative rounded-3xl p-6 border-2 transition-all text-left group overflow-hidden
                                                    ${selectedBox.size === box.size
                                                        ? 'border-mauve bg-mauve/5 ring-1 ring-mauve'
                                                        : 'border-gray-100 bg-white hover:border-mauve/30'}`}
                                            >
                                                <div className="relative z-10">
                                                    <span className="text-4xl font-black text-mauve/20 absolute -top-2 -right-2">{box.size}</span>
                                                    <div className="font-bold text-charcoal mb-1">{box.name}</div>
                                                    <div className="text-mauve font-mono font-bold">${box.price}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2: Choose Treats */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <span className="bg-mauve text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                                            <h3 className="text-2xl font-bold text-charcoal">Rellena tu caja</h3>
                                        </div>
                                        <div className="text-sm font-bold text-mauve animate-pulse">
                                            {boxContent.length} / {selectedBox.size} espacios
                                        </div>
                                    </div>

                                    {/* Category Filter */}
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                        {treatCategories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveTreatCategory(cat)}
                                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors
                                                    ${activeTreatCategory === cat ? 'bg-charcoal text-white' : 'bg-white text-charcoal/60 hover:bg-gray-100'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Treats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {filteredTreats.length > 0 ? filteredTreats.map(treat => (
                                            <button
                                                key={treat.id}
                                                onClick={() => addToBox(treat)}
                                                disabled={isBoxFull}
                                                className="group relative bg-white rounded-3xl p-3 border border-gray-100 hover:border-mauve/30 hover:shadow-lg transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <div className="relative aspect-square mb-3 rounded-2xl overflow-hidden bg-gray-50">
                                                    <Image src={treat.image} alt={treat.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                    <div className="absolute inset-0 bg-mauve/0 group-hover:bg-mauve/10 transition-colors flex items-center justify-center">
                                                        <Plus className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all drop-shadow-md" size={32} />
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-charcoal text-sm truncate">{treat.name}</h4>
                                                <p className="text-xs text-mauve">{treat.category}</p>
                                            </button>
                                        )) : (
                                            <div className="col-span-3 text-center py-8 text-gray-400 text-sm">
                                                No hay productos disponibles para rellenar en esta categoría.
                                                <br />
                                                <span className="text-xs font-bold text-mauve">Tip: Ve al Admin y marca 'Disponible para Packs' en tus productos.</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Visual Builder & Summary (Sticky) */}
                            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                                <div className="bg-white rounded-[2.5rem] shadow-xl border border-mauve/20 p-8 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mauve/20 via-mauve to-mauve/20"></div>

                                    <h3 className="font-script text-4xl text-center mb-8 text-charcoal">Tu Caja Dulce</h3>

                                    {/* Visual Slots */}
                                    <div className="grid grid-cols-2 gap-4 mb-8 bg-[#F9F5F0] p-6 rounded-3xl inner-shadow">
                                        {Array.from({ length: selectedBox.size }).map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square rounded-full border-2 border-dashed border-mauve/30 bg-white flex items-center justify-center relative group"
                                            >
                                                {boxContent[idx] ? (
                                                    <motion.div
                                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                        className="w-full h-full relative p-2 cursor-pointer"
                                                        onClick={() => removeFromBox(idx)}
                                                    >
                                                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-sm">
                                                            <Image src={boxContent[idx].image} alt="treat" fill className="object-cover" />
                                                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                                                                <X className="text-white opacity-0 hover:opacity-100" size={24} />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <span className="text-mauve/20 font-bold text-2xl">{idx + 1}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end mb-6 border-t border-dashed border-gray-200 pt-6">
                                        <div>
                                            <p className="text-charcoal/60 text-sm mb-1 uppercase tracking-widest font-bold">Total</p>
                                            <p className="text-4xl font-bold text-mauve">${selectedBox.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-charcoal/40 mb-1">{selectedBox.name} (x{selectedBox.size})</p>
                                            <p className="text-xs text-green-500 font-bold flex items-center justify-end gap-1">
                                                <Check size={12} /> Envío Disponible
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddBoxToCart}
                                        disabled={!isBoxFull}
                                        className="w-full py-4 rounded-full font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all
                                            disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
                                            enabled:bg-charcoal enabled:text-white enabled:hover:bg-mauve enabled:animate-pulse-subtle"
                                    >
                                        {isBoxFull ? (
                                            <> <ShoppingBag size={20} /> Agregar al Carrito </>
                                        ) : (
                                            <> Faltan {selectedBox.size - boxContent.length} productos </>
                                        )}
                                    </button>

                                    {!isBoxFull && (
                                        <div className="text-center mt-4 text-xs text-charcoal/40 animate-pulse">
                                            ¡Completa la caja para continuar!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="premade"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-7xl mx-auto px-4"
                    >
                        {/* PREMADE PACKS LIST - Using existing logic */}
                        {giftPacks.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-10">
                                {giftPacks.map((pack) => (
                                    <div
                                        key={pack.id}
                                        className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-mauve/10 flex flex-col group"
                                    >
                                        {/* ... Card Content (Simplified copy of previous implementation) ... */}
                                        <div className="relative h-72">
                                            <Image src={pack.image} alt={pack.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-charcoal font-bold shadow-sm">
                                                ${pack.price.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="font-script text-3xl text-charcoal mb-4">{pack.name}</h3>
                                            <p className="text-charcoal/60 text-sm mb-6 flex-1">{pack.description}</p>
                                            <button
                                                onClick={() => addToCart(pack)}
                                                className="w-full bg-mauve text-white py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag size={18} />
                                                Lo Quiero
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 text-charcoal/40 bg-mauve/5 rounded-3xl max-w-4xl mx-auto">
                                <Gift size={48} className="mx-auto mb-4 opacity-50" />
                                <h3 className="text-2xl font-script mb-2">Aún no hay packs listos</h3>
                                <p className="text-sm">¡Pero puedes armar tu propia caja en la otra pestaña!</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
