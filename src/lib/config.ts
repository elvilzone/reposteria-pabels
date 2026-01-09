// Configuración centralizada del sitio
// Este archivo contiene constantes que se usan en toda la aplicación

export const SITE_CONFIG = {
    // Información del negocio
    businessName: "Repostería Don Pabel",
    phone: "+591 75725643",
    whatsappNumber: "59175725643", // Sin + ni espacios para enlaces wa.me
    email: "reposteriadonpabel@gmail.com",

    // Dirección
    address: {
        street: "Calle Chayanta esq. 1ro de Abril (Frente al semáforo)",
        city: "Potosí",
        country: "Bolivia"
    },

    // Horarios
    hours: {
        weekdays: "Lunes a Domingo: 10:30 - 21:00",
        saturday: "Lunes a Domingo: 10:30 - 21:00", // Asumo mismo horario si no se especificó diferente
        sunday: "10:30 - 21:00"
    },

    // Redes sociales
    social: {
        instagram: "https://www.instagram.com/pabelspattesiere/",
        instagramHandle: "@pabelspattesiere",
        facebook: "https://www.facebook.com/ReposteriaDonPabel",
        whatsapp: "https://wa.me/59175725643"
    },

    // Configuración de envíos
    shipping: {
        freeShippingMinimum: 150, // Bs.
        zones: [
            { name: "Casco Viejo (Centro)", price: 10 },
            { name: "Zona Alta / San Cristóbal", price: 15 },
            { name: "Zona Baja / Ciudad Satélite", price: 15 },
            { name: "Cantumarca / Zonas Alejadas", price: 25 }
        ]
    }
} as const;

// Función helper para generar enlaces de WhatsApp
export function getWhatsAppLink(message: string): string {
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
