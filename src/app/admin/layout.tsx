'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Package,
    LogOut,
    ChefHat,
    Menu,
    X,
    Tags,
    Settings,
    Mail
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router, isLoginPage]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) return null;

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Productos', href: '/admin/productos', icon: Package },
        { name: 'Categorías', href: '/admin/categorias', icon: Tags },
        { name: 'Comunicaciones', href: '/admin/comunicaciones', icon: Mail },
        { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-charcoal text-cream transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-6 flex items-center gap-3 border-b border-mauve/20">
                    <div className="bg-mauve p-2 rounded-full text-white">
                        <ChefHat size={24} />
                    </div>
                    <span className="font-script text-2xl text-white">Admin Panel</span>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-mauve text-white font-bold'
                                    : 'hover:bg-white/10 text-cream/80'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-mauve/20">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 md:hidden flex items-center justify-between sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-charcoal">
                        <Menu size={24} />
                    </button>
                    <span className="font-script text-xl text-charcoal">Pabel's Admin</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
