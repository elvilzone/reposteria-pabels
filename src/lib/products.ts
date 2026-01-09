export interface Product {
    id: number;
    name: string;
    price: number;
    category: string; // Changed from union type to string to allow dynamic categories
    image: string;
    description: string;
    ingredients: string[];
    rating: number;
    isFestive?: boolean; // New: Showcase Switch
    isPackable?: boolean; // New: Available for Gift Packs
    isBestseller?: boolean; // New: Admin toggle for Bestsellers Section
}

export interface Category {
    id: string;
    name: string;
}

export const INITIAL_CATEGORIES: Category[] = [
    { id: 'tortas', name: 'Tortas' },
    { id: 'donas', name: 'Donas' },
    { id: 'galletas', name: 'Galletas' },
    { id: 'postres', name: 'Postres' },
    { id: 'packs', name: 'Packs de Regalo' },
    { id: 'sabores', name: 'Sabores (Cotizador)' },
];

export const products: Product[] = [
    {
        id: 1,
        name: "Torta de Chocolate Suprema",
        price: 45.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1b9587?auto=format&fit=crop&q=80&w=800",
        description: "Tres capas de bizcocho de chocolate húmedo, relleno de ganache de chocolate oscuro y cubierto con virutas de chocolate belga.",
        ingredients: ["Harina", "Cacao", "Chocolate Belga", "Huevos", "Mantequilla"],
        rating: 4.9,
        isFestive: true
    },
    {
        id: 2,
        name: "Donas Glaseadas Pack x6",
        price: 12.00,
        category: "donas",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
        description: "Nuestras clásicas donas esponjosas con glaseado de vainilla, fresa y chocolate. Perfectas para compartir.",
        ingredients: ["Harina", "Levadura", "Azúcar Glass", "Leche", "Vainilla"],
        rating: 4.7,
        isFestive: true,
        isPackable: true
    },
    {
        id: 3,
        name: "Galletas Choco-Chips",
        price: 8.50,
        category: "galletas",
        image: "https://images.unsplash.com/photo-1499636138143-bd649043ea52?auto=format&fit=crop&q=80&w=800",
        description: "Crujientes por fuera y suaves por dentro, cargadas con trozos generosos de chocolate semiamargo.",
        ingredients: ["Harina", "Azúcar Moreno", "Chips de Chocolate", "Mantequilla", "Vainilla"],
        rating: 4.8,
        isPackable: true
    },
    {
        id: 4,
        name: "Cheesecake de Frutos Rojos",
        price: 35.00,
        category: "postres",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
        description: "Base de galleta crujiente, relleno cremoso de queso y topping de mermelada artesanal de frutos del bosque.",
        ingredients: ["Queso Crema", "Galletas", "Fresas", "Frambuesas", "Arándanos"],
        rating: 4.9,
        isFestive: true
    },
    {
        id: 5,
        name: "Torta Red Velvet",
        price: 42.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800",
        description: "El clásico terciopelo rojo con su característico sabor a cacao suave y frosting de queso crema.",
        ingredients: ["Harina", "Cacao", "Colorante Natural", "Queso Crema", "Vinagre"],
        rating: 4.8
    },
    {
        id: 6,
        name: "Macarons Surtidos x12",
        price: 24.00,
        category: "postres",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
        description: "Delicados merengues de almendra rellenos de ganache de diferentes sabores: pistacho, frambuesa, limón y chocolate.",
        ingredients: ["Harina de Almendra", "Claras de Huevo", "Azúcar Glass", "Ganache"],
        rating: 4.9,
        isPackable: true
    },
    {
        id: 7,
        name: "Tiramisú Clásico",
        price: 28.00,
        category: "postres",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
        description: "Auténtica receta italiana con bizcochos soletilla bañados en café espresso y crema de mascarpone.",
        ingredients: ["Queso Mascarpone", "Café Espresso", "Bizcochos", "Cacao", "Huevos"],
        rating: 4.7
    },
    {
        id: 8,
        name: "Donas Rellenas de Crema",
        price: 14.00,
        category: "donas",
        image: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f5e?auto=format&fit=crop&q=80&w=800",
        description: "Donas espolvoreadas con azúcar y rellenas generosamente de crema pastelera artesanal.",
        ingredients: ["Harina", "Levadura", "Crema Pastelera", "Azúcar", "Leche"],
        rating: 4.6,
        isPackable: true
    },
    {
        id: 9,
        name: "Alfajores de Maicena",
        price: 10.00,
        category: "galletas",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
        description: "Suaves galletas de maicena rellenas de dulce de leche y bordes de coco rallado.",
        ingredients: ["Maicena", "Dulce de Leche", "Coco Rallado", "Mantequilla", "Yemas"],
        rating: 4.8,
        isPackable: true
    },
    {
        id: 10,
        name: "Torta de Zanahoria",
        price: 38.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
        description: "Bizcocho especiado con canela y nueces, cubierto con nuestro frosting especial de queso crema.",
        ingredients: ["Zanahoria", "Nueces", "Canela", "Harina", "Queso Crema"],
        rating: 4.7,
        isFestive: true
    }
];

// Deprecated: Use CategoryContext instead
export const CATEGORIES = INITIAL_CATEGORIES;
