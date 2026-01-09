import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { CategoryProvider } from "@/context/CategoryContext";
import DataInitializer from "@/components/DataInitializer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });

export const metadata: Metadata = {
    title: {
        default: "Pabel's Patisserie | Repostería Artesanal en Cochabamba",
        template: "%s | Pabel's Patisserie"
    },
    description: "Repostería artesanal premium en Cochabamba. Tortas personalizadas, donas gourmet, macarons franceses y packs de regalo. Endulzamos tus momentos especiales desde 2010.",
    keywords: ["repostería", "tortas personalizadas", "cochabamba", "postres artesanales", "donas", "macarons", "packs de regalo", "pastelería premium"],
    authors: [{ name: "Pabel's Patisserie" }],
    creator: "Pabel's Patisserie",
    openGraph: {
        type: "website",
        locale: "es_BO",
        url: "https://pabels.com",
        siteName: "Pabel's Patisserie",
        title: "Pabel's Patisserie | Dulzura Artesanal",
        description: "Repostería artesanal premium en Cochabamba. Tortas, donas, macarons y más.",
        images: [
            {
                url: "https://images.unsplash.com/photo-1578985545062-69928b1b9587?auto=format&fit=crop&q=80&w=1200",
                width: 1200,
                height: 630,
                alt: "Pabel's Patisserie - Tortas y Postres Artesanales"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Pabel's Patisserie | Dulzura Artesanal",
        description: "Repostería artesanal premium en Cochabamba",
    },
    robots: {
        index: true,
        follow: true
    },
    themeColor: "#D48995"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} font-sans bg-[#F9F5F0] text-[#4A4A4A]`}>
                <div className="bg-noise"></div>
                <AuthProvider>
                    <CategoryProvider>
                        <ProductProvider>
                            <CartProvider>
                                <DataInitializer />
                                <Navbar />
                                <CartDrawer />
                                <main className="min-h-screen">
                                    {children}
                                </main>
                                <Footer />
                            </CartProvider>
                        </ProductProvider>
                    </CategoryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
