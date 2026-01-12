'use client';

import { MenuItem } from "@/types";
import { X, Flame } from 'lucide-react';
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ItemDetailModalProps {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
}

type SpiceLevel = 0 | 1 | 2 | 3;
type Size = 'regular' | 'large';

interface Extra {
    id: string;
    name: string;
    price: number;
}

const AVAILABLE_EXTRAS: Extra[] = [
    { id: 'parmesan', name: 'Extra Parmesan', price: 2.00 },
    { id: 'avocado', name: 'Avocado', price: 3.00 },
    { id: 'croutons', name: 'Extra Croutons', price: 1.00 },
];

export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
    const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(0);
    const [size, setSize] = useState<Size>('regular');
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

    // Reset state when item changes
    useEffect(() => {
        if (item) {
            setSpiceLevel(item.spicyLevel as SpiceLevel);
            setSize('regular');
            setSelectedExtras([]);
        }
    }, [item]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!item || !isOpen) return null;

    const toggleExtra = (extraId: string) => {
        setSelectedExtras(prev =>
            prev.includes(extraId)
                ? prev.filter(id => id !== extraId)
                : [...prev, extraId]
        );
    };

    const calculateTotal = () => {
        let total = item.price;
        if (size === 'large') total += 3.00;
        selectedExtras.forEach(extraId => {
            const extra = AVAILABLE_EXTRAS.find(e => e.id === extraId);
            if (extra) total += extra.price;
        });
        return total.toFixed(2);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-400 border border-white/20 dark:border-slate-800">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-full transition-all shadow-xl active:scale-95 border border-gray-100 dark:border-slate-700"
                    aria-label="Close"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Side - Image with Dynamic Background */}
                    <div className="relative flex items-center justify-center p-8 md:p-12 bg-gray-50 dark:bg-slate-800/30 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 dark:from-primary/5" />
                        <div className="relative w-full aspect-square max-w-sm">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]"
                            />
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 border-8 border-white dark:border-slate-800"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="flex flex-col p-8 md:p-12 max-h-[90vh] overflow-y-auto no-scrollbar">
                        <div className="space-y-8">
                            {/* Title & Badge */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">{item.name}</h2>
                                    <div className="flex gap-2">
                                        {item.dietary.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-4xl font-black text-primary">${item.price.toFixed(2)}</p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-medium">
                                {item.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Spice Level */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-primary" />
                                        Spice Level
                                    </h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { level: 0, label: 'Low' },
                                            { level: 1, label: 'Med' },
                                            { level: 2, label: 'Hot' },
                                        ].map(({ level, label }) => (
                                            <button
                                                key={level}
                                                onClick={() => setSpiceLevel(level as SpiceLevel)}
                                                className={cn(
                                                    "py-2 rounded-xl border-2 transition-all font-bold text-xs",
                                                    spiceLevel === level
                                                        ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30"
                                                        : "bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-red-200 dark:hover:border-red-900/50"
                                                )}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Portion Size</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { value: 'regular', label: 'Regular' },
                                            { value: 'large', label: 'Large' },
                                        ].map(({ value, label }) => (
                                            <button
                                                key={value}
                                                onClick={() => setSize(value as Size)}
                                                className={cn(
                                                    "py-2 rounded-xl border-2 transition-all font-bold text-xs",
                                                    size === value
                                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                                        : "bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-primary/20 dark:hover:border-primary/20"
                                                )}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Extras */}
                            <div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Add Extras</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {AVAILABLE_EXTRAS.map((extra) => (
                                        <button
                                            key={extra.id}
                                            onClick={() => toggleExtra(extra.id)}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold group",
                                                selectedExtras.includes(extra.id)
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-primary/30"
                                            )}
                                        >
                                            <span>{extra.name}</span>
                                            <span className={cn(
                                                "text-xs",
                                                selectedExtras.includes(extra.id) ? "text-primary" : "text-gray-400 dark:text-gray-500"
                                            )}>+${extra.price.toFixed(1)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="relative w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/30 active:scale-[0.98] text-xl flex items-center justify-center gap-3 group">
                                <span>Add to Order</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                <span>${calculateTotal()}</span>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 rounded-b-2xl group-active:h-0 transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
