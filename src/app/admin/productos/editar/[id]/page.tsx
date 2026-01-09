'use client';

import ProductForm from '@/components/admin/ProductForm';
import { useProducts } from '@/context/ProductContext';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
    const { id } = useParams();
    const { products } = useProducts();

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return <div>Cargando...</div>;
    }

    return <ProductForm initialData={product} isEditing />;
}
