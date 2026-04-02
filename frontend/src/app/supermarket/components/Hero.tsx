"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden pt-16">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-32 -z-10" />
            <div className="absolute top-40 right-40 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
            
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col gap-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 text-emerald-600 font-bold text-sm w-fit border border-emerald-200"
                        >
                            <Star size={16} fill="currentColor" />
                            <span>100% Orgánico & Local</span>
                        </motion.div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
                            Tu Supermercado <br />
                            <span className="text-emerald-600 italic">Más Fresco</span> <br />
                            Cerca de Ti
                        </h1>
                        
                        <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
                            Disfruta de la mejor selección de productos frescos, orgánicos y de calidad premium, entregados en la puerta de tu casa en menos de 1 hora.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 hover:-translate-y-1"
                        >
                            Explorar catálogo
                            <ArrowRight size={20} />
                        </button>
                        <button 
                            onClick={() => {
                                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                                // We will need to trigger the filter in ProductCatalog
                            }}
                            className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold border-2 border-slate-100 hover:border-emerald-200 transition-all"
                        >
                            Ver ofertas
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-slate-800">500k+</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Clientes</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-slate-800">100%</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Natural</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-slate-800">24h</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Soporte</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-slate-800">1h</span>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Delivery</span>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Image Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100 aspect-square md:aspect-[4/5]">
                        <img 
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" 
                            alt="Fresh organic food" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                            <Truck size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">Entrega rápida</p>
                            <p className="text-xs text-slate-400">Gratis en pedidos +$50</p>
                        </div>
                    </div>

                    <div className="absolute top-10 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">Calidad Controlada</p>
                            <p className="text-xs text-slate-400">Seleccionado para ti</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
