'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

/**
 * Hero component for the landing section of the menu.
 * Uses framer-motion for entrance and scroll-linked parallax animations.
 */
export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax background image: moves slower than scroll
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Content animation: fades and scales down slightly as you scroll past
    const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scaleContent = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[2.5rem] mb-12 group h-[350px] md:h-[450px]"
        >
            {/* Background Image Container */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0 h-[120%] -top-[10%]"
            >
                <Image
                    src="/assets/hero_bg.png"
                    alt="Restaurant Interior"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                {/* Transparent Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px]" />
            </motion.div>

            <motion.div
                style={{ opacity: opacityContent, scale: scaleContent, y: yContent }}
                className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto space-y-6"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tight"
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
            </motion.div>
        </div>
    );
}
