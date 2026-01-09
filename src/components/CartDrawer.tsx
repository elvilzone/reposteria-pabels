'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ShoppingCart, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total } = useCart();

    const generateWhatsAppOrder = () => {
        let message = "*🎂 ¡Hola! Quiero realizar el siguiente pedido:*\n\n";
        cart.forEach(item => {
            message += `▪ ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n*💰 TOTAL A PAGAR: $${total.toFixed(2)}*`;
        message += "\n\nQuedo atento a la confirmación y método de pago.";

        const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setIsCartOpen(false);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-cream shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 bg-charcoal text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={24} className="text-mauve" />
                                <h2 className="font-script text-2xl">Tu Pedido</h2>
                            </div>
                            <button onClick={() => setIsCartOpen(false)} className="hover:text-mauve transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-charcoal/40 space-y-4">
                                    <ShoppingBag size={64} opacity={0.2} />
                                    <p className="font-script text-2xl">Tu carrito está vacío</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-mauve font-bold text-sm uppercase tracking-widest hover:underline mt-4"
                                    >
                                        Ir al menú
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-mauve/10 flex gap-4"
                                    >
                                        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-charcoal text-sm leading-tight mb-1">{item.name}</h4>
                                            <div className="text-mauve text-sm font-bold mb-3">${item.price.toFixed(2)}</div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 bg-mauve/10 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:text-mauve transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold w-5 text-center text-charcoal">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:text-mauve transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-charcoal/30 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white border-t border-mauve/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-charcoal/50 text-sm uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-bold text-mauve">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={generateWhatsAppOrder}
                                    className="w-full bg-green-500 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95 transform duration-100"
                                >
                                    <MessageCircle size={20} />
                                    Enviar por WhatsApp
                                </button>
                                <p className="text-center text-xs text-charcoal/40 mt-3">
                                    Serás redirigido a WhatsApp para confirmar tu pedido.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
