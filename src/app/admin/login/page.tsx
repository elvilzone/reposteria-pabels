'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ChefHat, Lock, AlertTriangle } from 'lucide-react';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState<number | null>(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const { login } = useAuth();
    const router = useRouter();

    // Load lockout state from localStorage
    useEffect(() => {
        const storedAttempts = localStorage.getItem('login_attempts');
        const storedLockout = localStorage.getItem('login_lockout');

        if (storedAttempts) {
            setAttempts(parseInt(storedAttempts, 10));
        }

        if (storedLockout) {
            const lockoutTime = parseInt(storedLockout, 10);
            if (Date.now() < lockoutTime) {
                setLockedUntil(lockoutTime);
            } else {
                // Lockout expired, clear it
                localStorage.removeItem('login_attempts');
                localStorage.removeItem('login_lockout');
            }
        }
    }, []);

    // Countdown timer for lockout
    useEffect(() => {
        if (lockedUntil) {
            const interval = setInterval(() => {
                const remaining = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
                setRemainingTime(remaining);

                if (remaining === 0) {
                    setLockedUntil(null);
                    setAttempts(0);
                    localStorage.removeItem('login_attempts');
                    localStorage.removeItem('login_lockout');
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [lockedUntil]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if locked out
        if (lockedUntil && Date.now() < lockedUntil) {
            setError(`Demasiados intentos. Espera ${formatTime(remainingTime)} para volver a intentar.`);
            return;
        }

        setIsLoading(true);
        setError('');

        const success = await login(password);

        if (success) {
            // Success - clear attempts
            localStorage.removeItem('login_attempts');
            localStorage.removeItem('login_lockout');
            router.push('/admin');
        } else {
            // Failed attempt
            setIsLoading(false);
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem('login_attempts', newAttempts.toString());

            if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
                const lockoutTime = Date.now() + LOCKOUT_DURATION;
                setLockedUntil(lockoutTime);
                localStorage.setItem('login_lockout', lockoutTime.toString());
                setError(`Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.`);
            } else {
                setError(`Contraseña incorrecta. Intentos restantes: ${MAX_LOGIN_ATTEMPTS - newAttempts}`);
            }
        }
    };

    const isLocked = lockedUntil && Date.now() < lockedUntil;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8] px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-mauve/10">
                <div className="text-center mb-8">
                    <div className="bg-charcoal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-mauve">
                        <ChefHat size={32} />
                    </div>
                    <h1 className="font-script text-3xl text-charcoal">Panel de Administración</h1>
                    <p className="text-charcoal/50 mt-2 text-sm">Ingresa tu contraseña para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={!!isLocked}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-mauve/20 focus:border-mauve focus:ring-2 focus:ring-mauve/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-3 top-3.5 text-mauve/40" size={18} />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    {isLocked && (
                        <div className="text-center">
                            <div className="text-3xl font-mono font-bold text-charcoal mb-2">
                                {formatTime(remainingTime)}
                            </div>
                            <p className="text-xs text-charcoal/50">Tiempo restante de bloqueo</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!!isLocked}
                        className="w-full bg-charcoal text-white font-bold py-3 rounded-xl hover:bg-mauve transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLocked ? 'Bloqueado' : isLoading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="text-center text-xs text-charcoal/30 mt-6">
                    Panel protegido • Sesión expira en 4 horas
                </p>
            </div>
        </div>
    );
}
