
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Duración de la sesión: 4 horas
const SESSION_DURATION = 4 * 60 * 60 * 1000;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Usar variable de entorno de servidor (NO NEXT_PUBLIC)
        // Esto asegura que la contraseña nunca se exponga al cliente
        const serverPassword = process.env.ADMIN_PASSWORD || 'pabels2024!';

        if (password === serverPassword) {
            // Generar token
            const token = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
            const expiresAt = Date.now() + SESSION_DURATION;

            // Crear respuesta
            const response = NextResponse.json({ success: true, expiresAt });

            // Establecer cookie segura HTTP-Only
            // Esto previene que JavaScript del cliente acceda al token (protección XSS)
            cookies().set('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: SESSION_DURATION / 1000,
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Contraseña incorrecta' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Error inteno del servidor' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    // Logout: Limpiar cookie
    cookies().delete('admin_token');
    return NextResponse.json({ success: true });
}
