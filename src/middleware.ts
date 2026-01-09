
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Proteger rutas de admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Excluir login page de la protección para evitar bucle infinito
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const adminToken = request.cookies.get('admin_token');

        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
