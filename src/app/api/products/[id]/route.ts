
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const {
            name,
            price,
            category: categorySlug,
            image,
            description,
            ingredients,
            isFestive,
            isPackable
        } = body;

        console.log('UPDATING PRODUCT:', id);
        console.log('Payload isBestseller:', body.isBestseller);

        // Find category ID by slug if changing
        let categoryId;
        if (categorySlug) {
            const category = await prisma.category.findUnique({
                where: { slug: categorySlug }
            });
            if (category) categoryId = category.id;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                price: parseFloat(price),
                image,
                description,
                ingredients: ingredients ? JSON.stringify(ingredients) : undefined,
                isFestive,
                isPackable,
                isBestseller: body.isBestseller,
                ...(categoryId && { categoryId })
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
