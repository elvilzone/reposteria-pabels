'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            return;
        }

        setStatus('loading');

        // Store subscriber locally
        const subscribers = JSON.parse(localStorage.getItem('pabels_newsletter') || '[]');

        // Check if already subscribed
        if (subscribers.some((sub: any) => sub.email === email)) {
            setStatus('success');
            return;
        }

        subscribers.push({
            email,
            subscribedAt: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('pabels_newsletter', JSON.stringify(subscribers));

        // Simulate API delay
        setTimeout(() => {
            setStatus('success');
            setEmail('');

            // Reset after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 800);
    };

    return (
        <section className="py-12 px-4 bg-[#F2E8E4]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-mauve shadow-sm">
                        <Mail size={20} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-charcoal uppercase tracking-widest text-sm">Boletín</h3>
                        <p className="text-xs text-charcoal/60">Suscríbete para noticias dulces</p>
                    </div>
                </div>

                {status === 'success' ? (
                    <div className="flex-1 max-w-md w-full flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-full px-6 py-3">
                        <CheckCircle size={20} />
                        <span className="font-bold text-sm">¡Gracias por suscribirte!</span>
                    </div>
                ) : (
                    <form className="flex-1 max-w-md w-full flex gap-2" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                            className="flex-1 bg-white border-none rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-mauve disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-mauve text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-charcoal transition-colors disabled:opacity-50"
                        >
                            {status === 'loading' ? '...' : 'Suscribirse'}
                        </button>
                    </form>
                )}

                <div className="flex gap-4">
                    <a
                        href={SITE_CONFIG.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-mauve/20 flex items-center justify-center text-mauve hover:bg-mauve hover:text-white transition-colors cursor-pointer text-xs font-bold"
                    >
                        IG
                    </a>
                    <a
                        href={SITE_CONFIG.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-mauve/20 flex items-center justify-center text-mauve hover:bg-mauve hover:text-white transition-colors cursor-pointer text-xs font-bold"
                    >
                        FB
                    </a>
                </div>
            </div>
        </section>
    );
}
