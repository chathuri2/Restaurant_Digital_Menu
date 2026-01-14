'use client';

import { Category } from "@/types";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
    categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentCategory = searchParams.get('category');

    const handleCategoryClick = (categoryId: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId) {
            params.set('category', categoryId);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="py-4 md:py-6 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-2 md:gap-4 min-w-max px-4">
                <button
                    onClick={() => handleCategoryClick(null)}
                    className={cn(
                        "relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-sm whitespace-nowrap overflow-hidden group",
                        !currentCategory
                            ? "text-white"
                            : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-slate-700 hover:border-primary/50"
                    )}
                >
                    {!currentCategory && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-primary shadow-lg shadow-primary/30"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">🍽️</span>
                    <span className="relative z-10 text-shadow-sm">View All</span>
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={cn(
                            "relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-sm whitespace-nowrap overflow-hidden group",
                            currentCategory === category.id
                                ? "text-white"
                                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-slate-700 hover:border-primary/50 text-shadow-none"
                        )}
                    >
                        {currentCategory === category.id && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-primary shadow-lg shadow-primary/30"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 text-lg">{category.icon}</span>
                        <span className="relative z-10">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
