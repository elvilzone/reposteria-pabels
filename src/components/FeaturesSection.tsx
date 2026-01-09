import { motion } from 'framer-motion';
import { Truck, Award, Clock, Heart } from 'lucide-react';

const features = [
    {
        icon: <Award size={32} />,
        title: "Ingredientes Premium",
        description: "Seleccionamos solo lo mejor: chocolates belgas, frutas frescas y harinas orgánicas."
    },
    {
        icon: <Clock size={32} />,
        title: "Horneado Diario",
        description: "Nada se guarda. Todo lo que ves se hornea la misma mañana para garantizar frescura."
    },
    {
        icon: <Truck size={32} />,
        title: "Entrega Segura",
        description: "Empaque especial que mantiene la temperatura y la integridad de tu postre."
    },
    {
        icon: <Heart size={32} />,
        title: "Hecho con Amor",
        description: "Cada pieza es decorada a mano por nuestros expertos pasteleros."
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-[#FAFAF5] transition-colors duration-300 group"
                        >
                            <div className="bg-[#FFF8E1] p-4 rounded-full text-[#5D4037] mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-[#FFD700]/20">
                                {feature.icon}
                            </div>
                            <h3 className="font-serif text-xl font-bold text-[#5D4037] mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
