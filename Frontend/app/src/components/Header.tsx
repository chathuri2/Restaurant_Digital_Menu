'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Header component featuring the restaurant logo, search functionality,
 * theme toggle, and shopping cart placeholder.
 * 
 * Supports responsive design:
 * - Mobile: Stacked layout, smaller logo
 * - Tablet/Desktop: Horizontal layout
 */
export default function Header() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    /**
     * Updates the URL search parameters based on the search input.
     * @param term The search query string
     */
    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    /**
     * Simple debounce wrapper to limit the frequency of search updates.
     */
    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const debouncedSearch = debounce(handleSearch, 300);

    return (
        <header className="sticky top-0 z-50 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo & Brand */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            <Image
                                src="/assets/logo_light.png"
                                alt="Delicious Bites Logo"
                                fill
                                sizes="(max-width: 768px) 48px, 64px"
                                className="object-contain logo-light"
                                priority
                            />
                            <Image
                                src="/assets/logo_dark.png"
                                alt="Delicious Bites Logo"
                                fill
                                sizes="(max-width: 768px) 48px, 64px"
                                className="object-contain logo-dark"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-none">Delicious Bites</h1>
                            <span className="text-[10px] md:text-xs text-primary font-bold tracking-widest">RESTAURANT</span>
                        </div>
                    </div>

                </div>

                {/* Search Bar */}
                <div className="relative w-full md:max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        id="search-menu"
                        name="q"
                        placeholder="Search your favourite..."
                        className="block w-full pl-10 pr-10 py-2.5 md:py-3 border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm outline-none text-sm md:text-base"
                        defaultValue={searchParams.get('q')?.toString()}
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
                    {searchParams.get('q') && (
                        <button
                            onClick={() => handleSearch('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-white" />
                        </button>
                    )}
                </div>

                {/* Desktop Actions & Info */}
                <div className="hidden md:flex items-center gap-4">

                    <div className="text-right border-l border-gray-200 dark:border-slate-700 pl-4">
                        <p className="text-[10px] uppercase tracking-tighter text-gray-500 dark:text-gray-400 font-bold">Order Now</p>
                        <p className="font-extrabold text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                    </div>

                    <button className="relative p-3.5 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-primary/10 hover:text-primary transition-all group">
                        <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-primary" />
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-[11px] flex items-center justify-center rounded-full font-bold shadow-lg border-2 border-white dark:border-slate-900">2</span>
                    </button>
                </div>

                {/* Mobile Cart Floating (Optional discovery: maybe keep but let's see) */}
                <div className="md:hidden fixed bottom-6 right-6 z-[60]">
                    <button className="relative p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 active:scale-95 transition-transform">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 h-6 w-6 bg-white text-primary text-[12px] flex items-center justify-center rounded-full font-bold shadow-md">2</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
