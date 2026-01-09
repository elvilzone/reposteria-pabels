'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Trash2, Download, Users, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Subscriber {
    id: number;
    email: string;
    subscribedAt: string;
}

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
}

export default function ComunicacionesPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<'subscribers' | 'messages'>('subscribers');

    useEffect(() => {
        // Load from localStorage
        const storedSubscribers = JSON.parse(localStorage.getItem('pabels_newsletter') || '[]');
        const storedMessages = JSON.parse(localStorage.getItem('pabels_messages') || '[]');

        setSubscribers(storedSubscribers);
        setMessages(storedMessages);
    }, []);

    const deleteSubscriber = (id: number) => {
        const updated = subscribers.filter(s => s.id !== id);
        setSubscribers(updated);
        localStorage.setItem('pabels_newsletter', JSON.stringify(updated));
    };

    const deleteMessage = (id: number) => {
        const updated = messages.filter(m => m.id !== id);
        setMessages(updated);
        localStorage.setItem('pabels_messages', JSON.stringify(updated));
    };

    const exportSubscribers = () => {
        const csv = 'Email,Fecha de Suscripción\n' +
            subscribers.map(s => `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `suscriptores_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('es-BO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/admin" className="text-mauve hover:text-charcoal text-sm font-bold flex items-center gap-1 mb-2">
                        <ArrowLeft size={16} /> Volver al Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Comunicaciones</h1>
                    <p className="text-gray-500 text-sm">Gestiona suscriptores y mensajes de contacto</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-mauve/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-mauve/10 rounded-xl flex items-center justify-center">
                            <Users className="text-mauve" size={24} />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-charcoal">{subscribers.length}</p>
                            <p className="text-sm text-charcoal/50">Suscriptores</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-mauve/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <MessageSquare className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-charcoal">{messages.length}</p>
                            <p className="text-sm text-charcoal/50">Mensajes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-mauve/10 overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('subscribers')}
                        className={`flex-1 py-4 px-6 font-bold text-sm transition-colors ${activeTab === 'subscribers'
                                ? 'bg-mauve/5 text-mauve border-b-2 border-mauve'
                                : 'text-charcoal/50 hover:bg-gray-50'
                            }`}
                    >
                        <Mail size={16} className="inline-block mr-2" />
                        Suscriptores ({subscribers.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`flex-1 py-4 px-6 font-bold text-sm transition-colors ${activeTab === 'messages'
                                ? 'bg-mauve/5 text-mauve border-b-2 border-mauve'
                                : 'text-charcoal/50 hover:bg-gray-50'
                            }`}
                    >
                        <MessageSquare size={16} className="inline-block mr-2" />
                        Mensajes ({messages.length})
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'subscribers' ? (
                        <>
                            {/* Export Button */}
                            {subscribers.length > 0 && (
                                <div className="mb-4 flex justify-end">
                                    <button
                                        onClick={exportSubscribers}
                                        className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-mauve transition-colors"
                                    >
                                        <Download size={16} />
                                        Exportar CSV
                                    </button>
                                </div>
                            )}

                            {subscribers.length === 0 ? (
                                <div className="text-center py-12 text-charcoal/40">
                                    <Mail size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">No hay suscriptores aún</p>
                                    <p className="text-sm">Cuando alguien se suscriba al newsletter, aparecerá aquí.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {subscribers.map((sub) => (
                                        <motion.div
                                            key={sub.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-mauve/5 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-mauve/10 rounded-full flex items-center justify-center text-mauve font-bold text-sm">
                                                    {sub.email.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-charcoal">{sub.email}</p>
                                                    <p className="text-xs text-charcoal/50 flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {formatDate(sub.subscribedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteSubscriber(sub.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {messages.length === 0 ? (
                                <div className="text-center py-12 text-charcoal/40">
                                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="font-bold">No hay mensajes</p>
                                    <p className="text-sm">Los mensajes del formulario de contacto aparecerán aquí.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-4 bg-gray-50 rounded-xl"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-bold text-charcoal">{msg.name}</p>
                                                    <p className="text-sm text-mauve">{msg.email}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-charcoal/50">{formatDate(msg.date)}</span>
                                                    <button
                                                        onClick={() => deleteMessage(msg.id)}
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-charcoal/70 text-sm bg-white p-3 rounded-lg">
                                                {msg.message}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
