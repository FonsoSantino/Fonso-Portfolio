"use client"

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { id: 'frutas', name: 'Frutas', icon: '🍎', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400', count: '12+ items' },
    { id: 'verduras', name: 'Verduras', icon: '🥦', image: 'https://bolcereales.com.ar/wp-content/uploads/2020/08/verduras1.jpg', count: '15+ items' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤', image: 'https://th.bing.com/th/id/R.8b9a8a48302d1c716ef900b7934f5d64?rik=Lx4bBz1cQ9oBXw&pid=ImgRaw&r=0', count: '20+ items' },
    { id: 'organicos', name: 'Orgánicos', icon: '🌿', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400', count: '10+ items' },
    { id: 'snacks', name: 'Snacks', icon: '🍿', image: 'https://thefoodtech.com/wp-content/uploads/2022/01/snacks-saludables-consumidores-1.jpg', count: '25+ items' },
];

export default function CategorySection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Categorías</span>
                        <h2 className="text-4xl font-extrabold text-slate-800">Explora por Sección</h2>
                    </div>
                    <p className="text-slate-400 font-semibold max-w-sm">
                        Encuentra lo que necesitas rápidamente navegando por nuestras secciones seleccionadas.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                <div className="absolute bottom-6 left-6 flex flex-col gap-1 z-10">
                                    <span className="text-2xl mb-1">{cat.icon}</span>
                                    <h3 className="text-white font-extrabold text-xl">{cat.name}</h3>
                                    <span className="text-emerald-100/80 text-xs font-bold uppercase tracking-wider">{cat.count}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
