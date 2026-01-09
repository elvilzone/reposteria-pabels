'use client';

import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

const instagramPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400',
        likes: '324'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=400',
        likes: '186'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400',
        likes: '412'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
        likes: '278'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1b9587?auto=format&fit=crop&q=80&w=400',
        likes: '534'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&q=80&w=400',
        likes: '167'
    },
];

export default function InstagramSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 text-mauve mb-4">
                        <Instagram size={24} />
                        <span className="font-bold text-sm uppercase tracking-widest">{SITE_CONFIG.social.instagramHandle}</span>
                    </div>
                    <h2 className="font-script text-5xl text-charcoal">Síguenos en Instagram</h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={SITE_CONFIG.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square group overflow-hidden"
                        >
                            <Image
                                src={post.image}
                                alt="Instagram post"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-mauve/0 group-hover:bg-mauve/70 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                                    <Instagram size={24} className="mx-auto mb-1" />
                                    <span className="text-sm font-bold">♥ {post.likes}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-8"
                >
                    <a
                        href={SITE_CONFIG.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-mauve hover:text-charcoal font-bold uppercase text-xs tracking-widest transition-colors"
                    >
                        Ver más en Instagram
                        <span className="text-lg">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
