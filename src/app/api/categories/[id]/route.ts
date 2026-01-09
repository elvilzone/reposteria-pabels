
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const slug = params.id;

        // Don't allow deleting hardcoded categories if we wanted protection, 
        // but for now let's just delete by slug.

        // Use transaction to delete products first, then category
        await prisma.$transaction([
            prisma.product.deleteMany({
                where: { category: { slug } }
            }),
            prisma.category.delete({
                where: { slug },
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
    }
}
