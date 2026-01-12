'use client';

import { MenuItem } from "@/types";
import { cn } from "@/lib/utils";
import { Flame, Clock, Plus } from 'lucide-react';
import Image from "next/image";

interface MenuItemCardProps {
    item: MenuItem;
    onItemClick?: (item: MenuItem) => void;
    priority?: boolean;
}

/**
 * MenuItemCard displays a single menu item with its image, tags, 
 * price, and interactive elements.
 */
export default function MenuItemCard({ item, onItemClick, priority }: MenuItemCardProps) {
    return (
        <div
            onClick={() => onItemClick?.(item)}
            className="group bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-slate-700/50 flex flex-col h-full cursor-pointer"
        >
            {/* Image Container with Badges */}
            <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-slate-900">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={priority}
                />

                {/* Popular Badge */}
                {item.popular && (
                    <div className="absolute top-4 left-4 bg-secondary text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg text-black z-10 flex items-center gap-1 border border-white/20">
                        <span className="mb-0.5">★</span> POPULAR
                    </div>
                )}

                {/* Dietary Tags */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end z-10">
                    {item.dietary.map(tag => (
                        <span key={tag} className={cn(
                            "text-[9px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-widest backdrop-blur-md border border-white/20 transition-transform group-hover:scale-105",
                            tag === 'vegetarian' ? 'bg-green-500/90 text-white' :
                                tag === 'vegan' ? 'bg-emerald-600/90 text-white' :
                                    tag === 'gluten-free' ? 'bg-orange-500/90 text-white' :
                                        'bg-gray-800/80 text-white'
                        )}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Item Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-extrabold text-xl text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {item.name}
                    </h3>
                    <span className="font-black text-primary text-xl tracking-tight">
                        ${item.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {item.description}
                </p>

                {/* Footer Actions & Meta */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-slate-700/50 mt-auto">
                    <div className="flex items-center gap-4 text-xs font-bold">
                        {item.spicyLevel > 0 && (
                            <div className="flex items-center gap-1.5 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg" title={`Spicy Level: ${item.spicyLevel}`}>
                                <Flame className="h-3.5 w-3.5 fill-red-500" />
                                <span className="text-[10px]">{Array(item.spicyLevel).fill('🌶️').join('')}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{item.preparationTime} min</span>
                        </div>
                    </div>

                    <button
                        className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90"
                        aria-label={`Add ${item.name} to cart`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Plus className="h-5 w-5 stroke-[2.5px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
