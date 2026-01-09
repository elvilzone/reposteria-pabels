
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_CATEGORIES = [
    { id: 'tortas', name: 'Tortas' },
    { id: 'donas', name: 'Donas' },
    { id: 'galletas', name: 'Galletas' },
    { id: 'postres', name: 'Postres' },
    { id: 'packs', name: 'Packs de Regalo' },
    { id: 'sabores', name: 'Sabores (Cotizador)' },
]

const products = [
    {
        name: "Torta de Chocolate Suprema",
        price: 45.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1b9587?auto=format&fit=crop&q=80&w=800",
        description: "Tres capas de bizcocho de chocolate húmedo, relleno de ganache de chocolate oscuro y cubierto con virutas de chocolate belga.",
        ingredients: ["Harina", "Cacao", "Chocolate Belga", "Huevos", "Mantequilla"],
        rating: 4.9,
        isFestive: true,
        isBestseller: true
    },
    {
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
        name: "Cheesecake de Frutos Rojos",
        price: 35.00,
        category: "postres",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
        description: "Base de galleta crujiente, relleno cremoso de queso y topping de mermelada artesanal de frutos del bosque.",
        ingredients: ["Queso Crema", "Galletas", "Fresas", "Frambuesas", "Arándanos"],
        rating: 4.9,
        isFestive: true,
        isBestseller: true
    },
    {
        name: "Torta Red Velvet",
        price: 42.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800",
        description: "El clásico terciopelo rojo con su característico sabor a cacao suave y frosting de queso crema.",
        ingredients: ["Harina", "Cacao", "Colorante Natural", "Queso Crema", "Vinagre"],
        rating: 4.8,
        isBestseller: true
    },
    {
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
        name: "Tiramisú Clásico",
        price: 28.00,
        category: "postres",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
        description: "Auténtica receta italiana con bizcochos soletilla bañados en café espresso y crema de mascarpone.",
        ingredients: ["Queso Mascarpone", "Café Espresso", "Bizcochos", "Cacao", "Huevos"],
        rating: 4.7
    },
    {
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
        name: "Torta de Zanahoria",
        price: 38.00,
        category: "tortas",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
        description: "Bizcocho especiado con canela y nueces, cubierto con nuestro frosting especial de queso crema.",
        ingredients: ["Zanahoria", "Nueces", "Canela", "Harina", "Queso Crema"],
        rating: 4.7,
        isFestive: true
    }
]

async function main() {
    console.log('Start seeding...')

    // SAFE UPDATE: No data deletion
    // await prisma.product.deleteMany({});

    const INITIAL_CATEGORIES_UPDATED = [
        ...INITIAL_CATEGORIES,
        { id: 'matrimonios', name: 'Matrimonios & Bodas' },
        { id: 'cumpleanos', name: 'Cumpleaños & Infantiles' }
    ];

    // 1. Create Categories
    const categoryMap = new Map();

    for (const cat of INITIAL_CATEGORIES_UPDATED) {
        const category = await prisma.category.upsert({
            where: { slug: cat.id },
            update: {},
            create: {
                name: cat.name,
                slug: cat.id,
                icon: null
            },
        })
        categoryMap.set(cat.id, category.id);
        console.log(`Created category with id: ${category.id}`)
    }

    // Add Wedding Products
    const weddingProducts = [
        {
            name: "Torta Rosas Imperiales",
            price: 850.00,
            category: "matrimonios",
            image: "/wedding-cake-detail.jpg",
            description: "Elegancia pura en esta torta central con acabado satinado, coronada por rosas rojas artesanales de gran realismo y delicados detalles en perlas doradas.",
            ingredients: ["Bizcocho de Vainilla", "Relleno de Frutos Rojos", "Fondant Premium", "Rosas de Azúcar", "Polvo de Oro"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Montaje 'Alas de Amor'",
            price: 2800.00,
            category: "matrimonios",
            image: "/wedding-setup-wings.jpg",
            description: "Un montaje nupcial inolvidable con estructura de alas de neón iluminadas. Incluye torta principal y torres laterales con tortas individuales para 200 personas.",
            ingredients: ["Variedad de Sabores", "Estructura Iluminada", "Merengue Suizo", "Flores Naturales", "Bizcocho de Novia"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Torre 'Espiga de Plata'",
            price: 1900.00,
            category: "matrimonios",
            image: "/wedding-setup-columns.jpg",
            description: "Diseño arquitectónico vertical con columnas de cristal iluminadas y una cascada de tortas decoradas con rosas en tonos rosa pastel y salmón.",
            ingredients: ["Bizcocho de Almendra", "Relleno de Dulce de Leche", "Crema Chantilly", "Cristales de Azúcar", "Flores Frescas"],
            rating: 4.9,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Colección Pirámide Real",
            price: 2200.00,
            category: "matrimonios",
            image: "/wedding-setup-pink.jpg",
            description: "Composición piramidal majestuosa de múltiples tortas individuales, perfectamente coordinadas en blanco y rojo con cintas de seda.",
            ingredients: ["Red Velvet", "Frosting de Queso Crema", "Chocolate Blanco", "Cintas de Seda", "Perlas Comestibles"],
            rating: 4.8,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Banquete Rojo Pasión",
            price: 2400.00,
            category: "matrimonios",
            image: "/wedding-setup-red-pyramid.jpg",
            description: "Impresionante despliegue para bodas grandes. Una sinfonía de tortas en niveles con decoración floral intensa y drapeado de telas.",
            ingredients: ["Chocolate Semiamargo", "Mousse de Fresa", "Ganache", "Flores Rosas Rojas", "Masa Especial"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Trilogía Lirios Naranjas",
            price: 1200.00,
            category: "matrimonios",
            image: "/wedding-orange-lilies.jpg",
            description: "Conjunto vibrante de tres tortas decoradas con lirios naranjas hechos a mano. Ideal para bodas de día o al aire libre, montadas sobre soportes de cristal.",
            ingredients: ["Bizcocho de Naranja", "Relleno de Maracuyá", "Flores de Azúcar", "Cristalería"],
            rating: 4.9,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Romance Pastel Vintage",
            price: 1600.00,
            category: "matrimonios",
            image: "/wedding-pastel-roses.jpg",
            description: "Torta de tres pisos estilo romántico con rosas en tonos pastel, follaje verde suave y detalles de perlas. Una opción clásica y soñadora.",
            ingredients: ["Vainilla Clásica", "Buttercream Suizo", "Rosas Naturales", "Perlas Comestibles"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Cascada Roja Eterna",
            price: 1450.00,
            category: "matrimonios",
            image: "/wedding-red-cascade.jpg",
            description: "Diseño impactante de tres niveles con una cascada diagonal de rosas rojas intensas sobre fondo blanco texturizado.",
            ingredients: ["Red Velvet", "Queso Crema", "Rosas Rojas Frescas", "Cinta de Satín"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Colección Oro Imperial",
            price: 2600.00,
            category: "matrimonios",
            image: "/wedding-gold-setup.jpg",
            description: "Lujo total con este montaje de múltiples tortas sobre bases doradas brillantes. Perfecto para bodas nocturnas y elegantes.",
            ingredients: ["Variedad de Sabores Premium", "Cobertura Satinada", "Bases Doradas", "Rosas Blancas"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        }
    ];

    // Add Birthday Products
    const birthdayProducts = [
        {
            name: "Minnie Mouse Fantasía",
            price: 450.00,
            category: "cumpleanos",
            image: "/bday-minnie-pink.jpg",
            description: "Espectacular torta de tres niveles inspirada en Minnie Mouse, con rosetones en degradé rosa y toppers temáticos personalizados.",
            ingredients: ["Vainilla", "Relleno de Fresa", "Chantilly", "Toppers Premium"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "Corona Real Azul",
            price: 550.00,
            category: "cumpleanos",
            image: "/bday-royal-blue.jpg",
            description: "Majestuosa torta de tres pisos en azul real y blanco, decorada con detalles dorados y una corona topper brillante. Perfecta para un príncipe.",
            ingredients: ["Chocolate", "Ganache", "Crema de Mantequilla", "Detalles Dorados"],
            rating: 5.0,
            isFestive: true,
            isPackable: false
        },
        {
            name: "LOL Surprise Party",
            price: 250.00,
            category: "cumpleanos",
            image: "/bday-lol-surprise.jpg",
            description: "Torta rectangular con impresión comestible de alta calidad de LOL Surprise, enmarcada con rosetones de crema rosa.",
            ingredients: ["Bizcocho Marmoleado", "Papel de Arroz", "Crema Chantilly", "Dulce de Leche"],
            rating: 4.8,
            isFestive: true,
            isPackable: true
        },
        {
            name: "Masha y el Oso Bosque",
            price: 280.00,
            category: "cumpleanos",
            image: "/bday-masha-bear.jpg",
            description: "Escena del bosque comestible con rosetones rosas y efecto de césped, decorada con los personajes favoritos de Masha y el Oso.",
            ingredients: ["Vainilla", "Duraznos al Jugo", "Crema Verde", "Toppers Personajes"],
            rating: 4.9,
            isFestive: true,
            isPackable: true
        },
        {
            name: "Baby Shower Ositos",
            price: 300.00,
            category: "cumpleanos",
            image: "/bday-baby-shower.jpg",
            description: "Tierna torta rectangular cubierta de rosetones turquesa, ideal para Baby Shower o primer añito, con decoración de ositos.",
            ingredients: ["Vainilla", "Manjar Blanco", " crema Turquesa", "Toppers Ositos"],
            rating: 4.9,
            isFestive: true,
            isPackable: true
        },
        // FLAVORS FOR QUOTER (So they are editable in Admin)
        {
            name: "Vainilla Clásica",
            price: 0,
            category: "sabores", // Must match category slug
            image: "/placeholder-flavor.jpg",
            description: "Con relleno de manjar o mermelada",
            ingredients: [],
            rating: 5.0,
            isFestive: false,
            isPackable: false
        },
        {
            name: "Chocolate Supremo",
            price: 0,
            category: "sabores",
            image: "/placeholder-flavor.jpg",
            description: "Bizcocho húmedo de cacao con ganache",
            ingredients: [],
            rating: 5.0,
            isFestive: false,
            isPackable: false
        },
        {
            name: "Red Velvet Premium",
            price: 0,
            category: "sabores",
            image: "/placeholder-flavor.jpg",
            description: "Con frosting de queso crema y migas",
            ingredients: [],
            rating: 5.0,
            isFestive: false,
            isPackable: false
        }
    ];

    const allProducts = [...products, ...weddingProducts, ...birthdayProducts];

    // 2. Create Products
    for (const product of allProducts) {
        const categoryId = categoryMap.get(product.category);
        if (!categoryId) {
            console.warn(`Category ${product.category} not found for product ${product.name}`);
            continue;
        }

        // Check compatibility with existing data
        const existing = await prisma.product.findFirst({
            where: { name: product.name }
        });

        if (existing) {
            // Option 1: Update fields except user-editable ones? No, safest is SKIP.
            // Option 2: Update only if force flag?
            // Let's just SKIP if it exists to preserve user edits.
            console.log(`Skipping existing product (Preserving user edits): ${product.name}`);
            continue;
        }

        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                rating: product.rating,
                isFestive: product.isFestive || false,
                isPackable: product.isPackable || false,
                ingredients: JSON.stringify(product.ingredients),
                categoryId: categoryId,
                isBestseller: (product as any).isBestseller || false
            }
        })
        console.log(`Created product: ${product.name}`)
    }

    // 3. Create Default Settings
    const settings = [
        { key: 'site_name', value: "Pabel's Patisserie" },
        { key: 'contact_phone', value: "59175725643" },
        { key: 'currency', value: "Bs." },
    ]

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
