'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { useCategories } from '@/context/CategoryContext';
import { Product } from '@/lib/products';
import { ArrowLeft, Save, Check } from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
    initialData?: Product;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const { addProduct, updateProduct } = useProducts();
    const { categories } = useCategories();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        ingredients: '',
        rating: '5',
        isFestive: false,
        isPackable: false,
        isBestseller: false
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                price: initialData.price.toString(),
                category: initialData.category,
                image: initialData.image,
                ingredients: initialData.ingredients.join(', '),
                rating: initialData.rating.toString(),
                isFestive: initialData.isFestive || false,
                isPackable: initialData.isPackable || false,
                isBestseller: initialData.isBestseller || false
            });
            setImagePreview(initialData.image);
        } else if (categories.length > 0 && !formData.category) {
            // Set default category to the first available one (excluding 'all' if possible)
            const defaultCategory = categories.find(c => c.id !== 'all') || categories[0];
            if (defaultCategory) {
                setFormData(prev => ({ ...prev, category: defaultCategory.id }));
            }
        }
    }, [initialData, categories]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido');
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('La imagen es demasiado grande. Máximo 2MB');
                return;
            }

            setImageFile(file);

            // Convert to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setFormData({ ...formData, image: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image,
            ingredients: formData.ingredients.split(',').map(i => i.trim()),
            rating: parseFloat(formData.rating),
            isFestive: formData.isFestive,
            isPackable: formData.isPackable,
            isBestseller: formData.isBestseller
        };

        if (isEditing && initialData) {
            updateProduct({ ...productData, id: initialData.id });
        } else {
            addProduct(productData);
        }

        router.push('/admin/productos');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/productos"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                    </h1>
                </div>
                <button
                    type="submit"
                    className="bg-[#5D4037] text-[#FFD700] px-6 py-2 rounded-lg font-bold hover:bg-[#4E342E] transition-colors flex items-center gap-2"
                >
                    <Save size={20} />
                    Guardar
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none bg-white"
                        >
                            {categories.filter(c => c.id !== 'all').map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-4 pt-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${formData.isFestive ? 'bg-mauve border-mauve' : 'border-gray-300 group-hover:border-mauve'}`}>
                                {formData.isFestive && <Check size={16} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.isFestive}
                                onChange={e => setFormData({ ...formData, isFestive: e.target.checked })}
                            />
                            <div>
                                <span className="font-medium text-gray-700">Mostrar en Colección Festiva</span>
                                <p className="text-xs text-gray-500">Destacar en la portada</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${formData.isPackable ? 'bg-mauve border-mauve' : 'border-gray-300 group-hover:border-mauve'}`}>
                                {formData.isPackable && <Check size={16} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.isPackable}
                                onChange={e => setFormData({ ...formData, isPackable: e.target.checked })}
                            />
                            <div>
                                <span className="font-medium text-gray-700">Disponible para Packs</span>
                                <p className="text-xs text-gray-500">Aparecer en el armador de cajas</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${formData.isBestseller ? 'bg-orange-500 border-orange-500' : 'border-gray-300 group-hover:border-orange-500'}`}>
                                {formData.isBestseller && <Check size={16} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.isBestseller}
                                onChange={e => setFormData({ ...formData, isBestseller: e.target.checked })}
                            />
                            <div>
                                <span className="font-medium text-gray-700">Destacar como Más Vendido</span>
                                <p className="text-xs text-gray-500">Aparecerá en la sección &quot;Favoritos&quot;</p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={formData.rating}
                            onChange={e => setFormData({ ...formData, rating: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>

                    {/* File Upload */}
                    <div className="mb-3">
                        <label className="block w-full cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#FFD700] transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <div className="text-gray-600">
                                    <span className="text-[#5D4037] font-semibold">Haz clic para subir</span> o arrastra una imagen aquí
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (máx. 2MB)</p>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* URL Input (Optional) */}
                    <div className="mb-3">
                        <label className="block text-xs text-gray-500 mb-1">O ingresa una URL de imagen:</label>
                        <input
                            type="url"
                            value={formData.image.startsWith('data:') ? '' : formData.image}
                            onChange={e => {
                                setFormData({ ...formData, image: e.target.value });
                                setImagePreview(e.target.value);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                            <div className="relative h-48 w-full md:w-64 rounded-lg overflow-hidden border-2 border-gray-200">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {formData.category === 'packs' ? 'Contenido del Pack' : 'Ingredientes'}
                        <span className="text-gray-400 font-normal"> (separados por coma)</span>
                    </label>
                    <input
                        type="text"
                        value={formData.ingredients}
                        onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                        placeholder={formData.category === 'packs' ? "Ej: 1x Torta, 6x Cupcakes..." : "Harina, Huevos, Leche..."}
                    />
                    {formData.category === 'packs' && (
                        <p className="text-xs text-gray-500 mt-1">Estos elementos se mostrarán como la lista de contenido del pack.</p>
                    )}
                </div>
            </div>

            {/* Floating Save Button */}
            <button
                type="submit"
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 z-50 flex items-center justify-center"
                title="Guardar Producto"
            >
                <Save size={24} />
            </button>
        </form>
    );
}
