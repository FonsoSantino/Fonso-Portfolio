"use client"

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Image with Ken Burns effect */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
                    alt="Luxury Editorial" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.5em] text-gold/80 mb-2">
                        Autumn / Winter 2026
                    </span>
                    
                    <h1 className="font-lx-serif text-6xl md:text-9xl font-light text-white leading-none tracking-tight">
                        Timeless <br /> 
                        <span className="italic pl-12 md:pl-24">Elegance</span>
                    </h1>

                    <p className="mt-8 text-sm md:text-base text-white/40 font-light max-w-lg mx-auto leading-loose tracking-widest">
                        A curated selection of the world's most refined pieces, designed for those who speak the language of absolute luxury.
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-12">
                        <button 
                            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative py-4 px-10 text-[10px] uppercase font-bold tracking-[0.4em] text-white"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-black">Explore Collection</span>
                            <motion.div 
                                className="absolute inset-0 bg-white scale-x-0 origin-left"
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                            <div className="absolute inset-0 border border-white/20" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[8px] uppercase font-bold tracking-[0.4em] text-white/20">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
            </motion.div>
        </section>
    );
}
