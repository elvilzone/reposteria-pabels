
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();

        // Convertir array [{key: 'a', value: '1'}] a objeto {a: '1'}
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        // Estructura esperada por el frontend
        const formattedSettings = {
            festiveTitle: settingsMap['festiveTitle'] || "Colección Festiva",
            festiveSubtitle: settingsMap['festiveSubtitle'] || "Sabores de Temporada",
            boxPrices: {
                small: parseInt(settingsMap['boxPrice_small'] || '15'),
                medium: parseInt(settingsMap['boxPrice_medium'] || '22'),
                large: parseInt(settingsMap['boxPrice_large'] || '40')
            }
        };

        return NextResponse.json(formattedSettings);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Aplanar objeto para guardar
        const settingsToSave = [
            { key: 'festiveTitle', value: body.festiveTitle },
            { key: 'festiveSubtitle', value: body.festiveSubtitle },
            { key: 'boxPrice_small', value: body.boxPrices.small.toString() },
            { key: 'boxPrice_medium', value: body.boxPrices.medium.toString() },
            { key: 'boxPrice_large', value: body.boxPrices.large.toString() },
        ];

        // Transacción para guardar todo
        await prisma.$transaction(
            settingsToSave.map(setting =>
                prisma.setting.upsert({
                    where: { key: setting.key },
                    update: { value: setting.value },
                    create: { key: setting.key, value: setting.value }
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error saving settings' }, { status: 500 });
    }
}
