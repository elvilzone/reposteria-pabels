'use client';

import { cn } from "@/lib/utils";

interface FilterBarProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelectCategory }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
                onClick={() => onSelectCategory("Todos")}
                className={cn(
                    "px-6 py-2 rounded-full font-medium transition-all duration-300 border",
                    activeCategory === "Todos"
                        ? "bg-chocolate text-white border-chocolate shadow-md transform scale-105"
                        : "bg-white text-chocolate border-chocolate/20 hover:border-chocolate hover:bg-beige"
                )}
            >
                Todos
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={cn(
                        "px-6 py-2 rounded-full font-medium transition-all duration-300 border",
                        activeCategory === category
                            ? "bg-chocolate text-white border-chocolate shadow-md transform scale-105"
                            : "bg-white text-chocolate border-chocolate/20 hover:border-chocolate hover:bg-beige"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
