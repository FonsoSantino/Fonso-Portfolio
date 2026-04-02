"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Programs() {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/ironforge/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-32 bg-black relative" id="programas">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                    <div className="flex flex-col gap-4">
                        <span className="text-rose-600 font-bold uppercase tracking-[0.4em] text-xs">Programas de élite</span>
                        <h2 className="font-if-header text-5xl md:text-8xl italic leading-none tracking-tighter">
                            DOMINA TU <br />
                            <span className="text-white/20 italic if-outline-text hover:text-white transition-colors duration-500">POTENCIAL</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-white/40 text-sm font-medium leading-loose tracking-widest">
                        Nuestros programas están diseñados por expertos en rendimiento para llevarte más allá de lo que creías posible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-sm" />
                        ))
                    ) : (
                        classes.map((cls, i) => (
                            <motion.div 
                                key={cls.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                            >
                                <img 
                                    src={cls.image} 
                                    alt={cls.name} 
                                    className="w-full h-full object-cover if-img-zoom opacity-60 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-if-header text-3xl italic tracking-tight">{cls.name}</h3>
                                        <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                        {cls.description}
                                    </p>
                                    <div className="w-full h-1 bg-white/10 mt-2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-rose-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
