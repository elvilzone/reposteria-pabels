import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                chocolate: "#5D4037",
                gold: "#FFD700",
                "pastel-pink": "#FFB6C1",
                beige: "#F5F5DC",
                // Pastel Palette
                "soft-pink": "#FFD1DC",
                "mauve": "#D48995",
                "cream": "#FDFBF7",
                "charcoal": "#4A4A4A",
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
                script: ['var(--font-dancing)', 'cursive'],
            },
        },
    },
    plugins: [],
};
export default config;
