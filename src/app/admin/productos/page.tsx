'use client';

import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductsPage() {
    const { products, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
                <Link
                    href="/admin/productos/nuevo"
                    className="bg-[#5D4037] text-[#FFD700] px-4 py-2 rounded-lg font-bold hover:bg-[#4E342E] transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Crear Nuevo Producto
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-gray-500 font-medium text-sm">Imagen</th>
                                <th className="px-6 py-3 text-gray-500 font-medium text-sm">Nombre</th>
                                <th className="px-6 py-3 text-gray-500 font-medium text-sm">Categoría</th>
                                <th className="px-6 py-3 text-gray-500 font-medium text-sm">Precio</th>
                                <th className="px-6 py-3 text-gray-500 font-medium text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/productos/editar/${product.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('¿Estás seguro de eliminar este producto?')) {
                                                        deleteProduct(product.id);
                                                    }
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Action Button */}
            <Link
                href="/admin/productos/nuevo"
                className="fixed bottom-6 right-6 bg-[#5D4037] text-[#FFD700] p-4 rounded-full shadow-lg hover:bg-[#4E342E] transition-all hover:scale-110 z-50 flex items-center justify-center"
                title="Crear Nuevo Producto"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
}
