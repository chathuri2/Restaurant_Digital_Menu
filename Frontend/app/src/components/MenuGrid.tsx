'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import MenuItemCard from './MenuItemCard';
import ItemDetailModal from './ItemDetailModal';
import { MenuItem } from '@/types';
import { Loader2, SearchX } from 'lucide-react';
import { useEffect, useState } from 'react';






import { motion, AnimatePresence } from 'framer-motion';


export default function MenuGrid() {
    const searchParams = useSearchParams();

    const params = {
        q: searchParams.get('q') || undefined,
        category: searchParams.get('category') || undefined,
    };

    const { data: items, error, isLoading } = useSWR(
        ['/menuItems', params],
        ([url, p]) => api.getMenuItems(p),
        {
            keepPreviousData: true,
            revalidateOnFocus: false,
        }
    );

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    if (isLoading && !items) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 min-h-[400px]">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[380px] md:h-[420px] bg-gray-100 dark:bg-slate-800/50 rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
            >
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 text-red-500">
                    <SearchX className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">We couldn't load the menu right now. Please check your connection and try again.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    Retry Loading
                </button>
            </motion.div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
            >
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-600">
                    <SearchX className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filters.</p>
            </motion.div>
        );
    }

    return (
        <div className="relative min-h-[600px]">
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 pb-32"
            >
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                        >
                            <MenuItemCard
                                item={item}
                                onItemClick={setSelectedItem}
                                priority={index < 4}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <ItemDetailModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    );
}
