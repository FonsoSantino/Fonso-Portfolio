"use client"

import React from 'react';
import { motion } from 'framer-motion';

const collections = [
    { 
        id: 'watches', 
        name: 'Watches', 
        tagline: 'Precision Engineered',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop'
    },
    { 
        id: 'jewelry', 
        name: 'Jewelry', 
        tagline: 'Radiant Brilliance',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    },
    { 
        id: 'accessories', 
        name: 'Accessories', 
        tagline: 'Crafted Excellence',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    }
];

export default function Collections() {
    return (
        <section className="py-32 bg-black overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col gap-4 mb-20 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold/60">Selected Categories</span>
                    <h2 className="font-lx-serif text-5xl md:text-7xl font-light text-white">Curated Collections</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((col, i) => (
                        <motion.div 
                            key={col.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="group relative cursor-pointer aspect-[3/4] overflow-hidden"
                        >
                            <img 
                                src={col.image} 
                                alt={col.name} 
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-1000" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold/80 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                    {col.tagline}
                                </span>
                                <h3 className="font-lx-serif text-3xl md:text-4xl font-light text-white uppercase tracking-[0.2em]">
                                    {col.name}
                                </h3>
                                <div className="mt-6 w-12 h-px bg-gold/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
