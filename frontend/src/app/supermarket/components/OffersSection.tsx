"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Zap, Truck, Gift } from 'lucide-react';

const OFFER_ITEMS = [
    {
        icon: Tag,
        label: '30% OFF',
        title: 'Frutas de Temporada',
        description: 'Manzanas, peras y duraznos frescos con descuento especial esta semana.',
        color: 'from-orange-50 to-orange-100',
        accent: 'text-orange-500',
        badge: 'bg-orange-500',
    },
    {
        icon: Zap,
        label: 'COMBO',
        title: 'Pack Saludable',
        description: 'Verduras orgánicas + 1 litro de jugo natural. Precio especial combo.',
        color: 'from-emerald-50 to-emerald-100',
        accent: 'text-emerald-600',
        badge: 'bg-emerald-500',
    },
    {
        icon: Truck,
        label: 'GRATIS',
        title: 'Envío en Pedidos +$50',
        description: 'Hasta el domingo inclusive. Delivery rápido sin costo para tu hogar.',
        color: 'from-blue-50 to-blue-100',
        accent: 'text-blue-600',
        badge: 'bg-blue-500',
    },
    {
        icon: Gift,
        label: '2×1',
        title: 'Snacks Orgánicos',
        description: 'Lleva dos productos de nuestra línea snacks y pagá solo uno.',
        color: 'from-purple-50 to-purple-100',
        accent: 'text-purple-600',
        badge: 'bg-purple-500',
    },
];

export default function OffersSection() {
    return (
        <section id="offers" className="py-20 bg-white relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center gap-3 mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest border border-orange-200">
                        <Tag size={14} />
                        Ofertas Especiales
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                        No te pierdas estas <span className="text-emerald-600 italic">ofertas</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-lg">
                        Descuentos exclusivos en productos seleccionados. Por tiempo limitado.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OFFER_ITEMS.map((offer, i) => {
                        const Icon = offer.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className={`group relative bg-gradient-to-br ${offer.color} rounded-[2rem] p-7 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-white cursor-pointer`}
                            >
                                {/* Badge */}
                                <span className={`absolute top-5 right-5 ${offer.badge} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md`}>
                                    {offer.label}
                                </span>

                                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${offer.accent}`}>
                                    <Icon size={24} />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-extrabold text-slate-800 text-lg leading-tight uppercase tracking-tight">{offer.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{offer.description}</p>
                                </div>

                                <button
                                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`mt-auto text-xs font-black uppercase tracking-widest ${offer.accent} hover:underline flex items-center gap-1 group-hover:gap-2 transition-all`}
                                >
                                    Ver productos →
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
