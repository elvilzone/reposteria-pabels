
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        });

        // Transform data to match frontend expectations if necessary
        // Currently frontend expects category as ID string, but here it's an object or relation
        // We need to map it to ensure compatibility or update frontend types.
        // The seed data mapped slug as ID.

        const formattedProducts = products.map(p => ({
            ...p,
            category: p.category.slug, // Frontend expects 'tortas', 'donas', etc.
            ingredients: JSON.parse(p.ingredients) // Parse JSON string back to array
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
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

        // Find category ID by slug
        const category = await prisma.category.findUnique({
            where: { slug: categorySlug }
        });

        if (!category) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                image,
                description,
                ingredients: JSON.stringify(ingredients), // Store array as JSON string
                isFestive: isFestive || false,
                isPackable: isPackable || false,
                isBestseller: body.isBestseller || false,
                categoryId: category.id
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}
