'use client';

import { useState } from 'react';
import { useCategories } from '@/context/CategoryContext';
import { Plus, Trash2, Tag } from 'lucide-react';

export default function CategoriesPage() {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            addCategory(newCategoryName.trim());
            setNewCategoryName('');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Gestión de Categorías</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Lista de Categorías */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Tag size={20} className="text-[#5D4037]" />
                        Categorías Existentes
                    </h2>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                            >
                                <span className="font-medium text-gray-700">{category.name}</span>
                                {category.id !== 'all' && (
                                    <button
                                        onClick={() => {
                                            if (confirm(`¿Eliminar categoría "${category.name}"?`)) {
                                                deleteCategory(category.id);
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formulario Nueva Categoría */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Nueva Categoría</h2>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Categoría</label>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Ej. Matrimonios"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!newCategoryName.trim()}
                            className="w-full bg-[#5D4037] text-[#FFD700] font-bold py-2 rounded-lg hover:bg-[#4E342E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Agregar Categoría
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
