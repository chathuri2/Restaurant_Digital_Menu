'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Hero component for the landing section of the menu.
 * Uses framer-motion for entrance animations.
 */
export default function Hero() {
    return (
        <div className="relative overflow-hidden rounded-[2.5rem] mb-12 group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero_bg.png"
                    alt="Restaurant Interior"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                {/* Transparent Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 py-16 md:py-28 px-6 text-center max-w-3xl mx-auto space-y-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-white tracking-tight"
                >
                    Our <span className="text-primary">Menu</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-100/90 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto"
                >
                    Discover our culinary creations. From fresh appetizers to delightful desserts, crafted with passion for your enjoyment.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="h-1.5 w-24 bg-primary rounded-full" />
                </motion.div>
            </div>
        </div>
    );
}
