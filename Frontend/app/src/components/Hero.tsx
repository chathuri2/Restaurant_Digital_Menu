'use client';

import { motion } from 'framer-motion';

/**
 * Hero component for the landing section of the menu.
 * Uses framer-motion for entrance animations.
 */
export default function Hero() {
    return (
        <div className="py-12 md:py-20 text-center max-w-3xl mx-auto space-y-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight"
            >
                Our <span className="text-primary">Menu</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed"
            >
                Discover our culinary creations. From fresh appetizers to delightful desserts, crafted with passion for your enjoyment.
            </motion.p>
        </div>
    );
}
