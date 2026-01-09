'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sofia Martinez",
        role: "Boda",
        text: "La torta más exquisita que hemos probado. No solo era hermosamente impresionante, sino que los sabores estaban perfectamente equilibrados.",
        rating: 5
    },
    {
        name: "Carlos Ruiz",
        role: "Cliente Frecuente",
        text: "Vengo aquí cada fin de semana por sus macarons. La textura es exactamente lo que encontrarías en París. Verdaderamente excepcional.",
        rating: 5
    },
    {
        name: "Elena G.",
        role: "Cumpleaños",
        text: "Nuestro pedido personalizado fue manejado con mucho cuidado. El equipo hizo más de lo esperado para combinar perfectamente con nuestra temática.",
        rating: 5
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#EAD8D8] via-[#F9F5F0] to-[#EAD8D8] relative overflow-hidden">


            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#D48995] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Testimonios</span>
                    <h2 className="font-script text-5xl md:text-6xl text-[#4A4A4A] mb-8">Palabras Dulces</h2>
                    <div className="w-24 h-px bg-[#4A4A4A]/10 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="text-center px-4"
                        >
                            <div className="flex justify-center gap-1 mb-6 text-mauve">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <p className="font-serif text-lg text-[#4A4A4A]/80 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                            <div>
                                <h4 className="font-bold text-[#4A4A4A] uppercase text-sm tracking-wide">{testimonial.name}</h4>
                                <span className="text-xs text-[#D48995] font-medium">{testimonial.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
