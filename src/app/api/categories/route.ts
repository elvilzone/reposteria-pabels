
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        // Map to frontend structure (slug as id)
        const mappedCategories = categories.map(c => ({
            id: c.slug,
            name: c.name
        }));
        return NextResponse.json(mappedCategories);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        const slug = name.toLowerCase().replace(/\s+/g, '_'); // Generate slug from name

        const category = await prisma.category.create({
            data: {
                name,
                slug
            }
        });

        return NextResponse.json({ id: category.slug, name: category.name });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}
