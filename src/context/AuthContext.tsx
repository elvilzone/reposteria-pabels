'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
    sessionExpiresAt: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session duration: 4 hours in milliseconds
const SESSION_DURATION = 4 * 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Al cargar, verificamos si hay flags de sesión en localStorage
        // NOTA: La seguridad real está en la cookie httpOnly que el navegador
        // enviará automáticamente con cada request a la API.
        // localStorage se usa solo para control de UI.
        const expiresAt = localStorage.getItem('admin_session_expires');

        if (expiresAt) {
            const expirationTime = parseInt(expiresAt, 10);

            // Check if session is still valid locally
            if (Date.now() < expirationTime) {
                setIsAuthenticated(true);
                setSessionExpiresAt(expirationTime);
            } else {
                logout();
            }
        }
    }, []);

    // Auto-logout when session expires
    useEffect(() => {
        if (sessionExpiresAt) {
            const timeUntilExpiry = sessionExpiresAt - Date.now();

            if (timeUntilExpiry > 0) {
                const timer = setTimeout(() => {
                    logout();
                    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                }, timeUntilExpiry);

                return () => clearTimeout(timer);
            }
        }
    }, [sessionExpiresAt]);

    const login = async (password: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                const data = await res.json();

                // Guardar expiración en localStorage solo para UI
                localStorage.setItem('admin_session_expires', data.expiresAt.toString());

                setIsAuthenticated(true);
                setSessionExpiresAt(data.expiresAt);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/login', { method: 'DELETE' });
        } catch (e) {
            console.error("Error calling logout api", e);
        }

        localStorage.removeItem('admin_session_expires');
        setIsAuthenticated(false);
        setSessionExpiresAt(null);
        router.push('/admin/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, sessionExpiresAt }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
