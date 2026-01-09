'use client';

import { useProducts } from '@/context/ProductContext';
import { Package, DollarSign, Star, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { products } = useProducts();

    const stats = [
        {
            title: 'Total Productos',
            value: products.length,
            icon: Package,
            color: 'bg-blue-500',
        },
        {
            title: 'Valor del Inventario',
            value: `$${products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            title: 'Categorías',
            value: new Set(products.map(p => p.category)).size,
            icon: TrendingUp,
            color: 'bg-purple-500',
        },
        {
            title: 'Promedio Rating',
            value: (products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1),
            icon: Star,
            color: 'bg-yellow-500',
        },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <Link
                    href="/admin/productos/nuevo"
                    className="bg-mauve text-white px-4 py-2 rounded-lg font-bold hover:bg-charcoal transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Crear Nuevo Producto
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Productos Recientes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-3 text-gray-500 font-medium text-sm">Nombre</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Categoría</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Precio</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.slice(0, 5).map((product) => (
                                <tr key={product.id}>
                                    <td className="py-3 text-gray-800">{product.name}</td>
                                    <td className="py-3">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="py-3 text-gray-800 font-medium">${product.price.toFixed(2)}</td>
                                    <td className="py-3 flex items-center text-yellow-500">
                                        <Star size={14} fill="currentColor" className="mr-1" />
                                        {product.rating}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Floating Action Button for Mobile/Easy Access */}
            <Link
                href="/admin/productos/nuevo"
                className="fixed bottom-6 right-6 bg-mauve text-white p-4 rounded-full shadow-lg hover:bg-charcoal transition-all hover:scale-110 z-50 flex items-center justify-center"
                title="Crear Nuevo Producto"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
}
