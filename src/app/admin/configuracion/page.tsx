'use client';

import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Save, Layout } from 'lucide-react';

export default function ConfigPage() {
    const { settings, updateSettings } = useProducts();
    const [formData, setFormData] = useState({
        festiveTitle: '',
        festiveSubtitle: '',
        boxPrices: { small: 0, medium: 0, large: 0 }
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#5D4037] p-3 rounded-xl text-white">
                    <Layout size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Configuración de Portada</h1>
                    <p className="text-gray-500">Personaliza los títulos y secciones de la página de inicio</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="border-b border-gray-100 pb-6 mb-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Sección Festiva</h2>
                        <p className="text-sm text-gray-500 mb-6">Cambia el título de la colección principal (ej. "Especial Navidad", "Día de la Madre").</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
                                <input
                                    type="text"
                                    value={formData.festiveTitle}
                                    onChange={e => setFormData({ ...formData, festiveTitle: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none"
                                    placeholder="Ej: Colección Festiva"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                                <input
                                    type="text"
                                    value={formData.festiveSubtitle}
                                    onChange={e => setFormData({ ...formData, festiveSubtitle: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none"
                                    placeholder="Ej: Sabores de Temporada"
                                />
                            </div>
                        </div>

                        <div className="border-b border-gray-100 pb-6 mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Precios de Packs de Regalo</h2>
                            <p className="text-sm text-gray-500 mb-6">Define los precios base para el armador de cajas.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Caja Pequeña (4)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={formData.boxPrices?.small || 0}
                                            onChange={e => setFormData({ ...formData, boxPrices: { ...formData.boxPrices, small: Number(e.target.value) } })}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Caja Mediana (6)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={formData.boxPrices?.medium || 0}
                                            onChange={e => setFormData({ ...formData, boxPrices: { ...formData.boxPrices, medium: Number(e.target.value) } })}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Caja Grande (12)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={formData.boxPrices?.large || 0}
                                            onChange={e => setFormData({ ...formData, boxPrices: { ...formData.boxPrices, large: Number(e.target.value) } })}
                                            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        {saved && (
                            <span className="text-green-600 text-sm font-medium animate-fade-in flex items-center gap-2">
                                ¡Guardado correctamente!
                            </span>
                        )}
                        <button
                            type="submit"
                            className="bg-[#5D4037] text-[#FFD700] px-6 py-2 rounded-lg font-bold hover:bg-[#4E342E] transition-colors flex items-center gap-2"
                        >
                            <Save size={20} />
                            Guardar Cambios
                        </button>
                    </div>

                </form>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-blue-800 font-bold mb-2">¿Cómo funciona?</h3>
                <p className="text-blue-600 text-sm">
                    Estos textos se actualizarán inmediatamente en la página principal para todos tus visitantes.
                    Úsalo para adaptar tu tienda a cada festividad del año sin necesitar ayuda técnica.
                </p>
            </div>
        </div>
    );
}
