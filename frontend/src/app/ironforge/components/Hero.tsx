"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Flame, Activity } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden bg-black">
            {/* Background Image with intensity overlay */}
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
                    alt="IronForge Intensity" 
                    className="w-full h-full object-cover opacity-60 grayscale-[0.5] contrast-[1.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col gap-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-[0.3em] text-xs"
                        >
                            <Flame size={16} fill="currentColor" />
                            <span>La forja de campeones</span>
                        </motion.div>
                        
                        <h1 className="font-if-header text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] italic tracking-tighter">
                            TRAIN <br />
                            <span className="text-white">BEYOND</span> <br />
                            <span className="text-rose-600">LIMITS</span>
                        </h1>
                        
                        <p className="max-w-md text-white/60 text-lg font-medium leading-relaxed tracking-wide mt-4">
                            No es solo un gimnasio. Es un campo de batalla donde forjamos el cuerpo y la mente que siempre soñaste. 
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button 
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-5 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-[0.2em] italic skew-x-[-12deg] transition-all hover:scale-105 shadow-2xl shadow-rose-600/20 group"
                        >
                            <span className="flex items-center gap-3 skew-x-[12deg]">
                                Empezar ahora
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        <button 
                            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-5 border-2 border-white/20 hover:border-white text-white font-black uppercase tracking-[0.2em] italic skew-x-[-12deg] transition-all group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center gap-3 skew-x-[12deg]">
                                Ver Clases
                                <Play size={18} fill="currentColor" />
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10 mt-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-if-header text-3xl italic">5000+</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Miembros</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-if-header text-3xl italic text-rose-600">50+</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Expertos</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-if-header text-3xl italic">120+</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Máquinas</span>
                        </div>
                    </div>
                </motion.div>

                {/* Aesthetic Floating Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="hidden lg:flex justify-end perspective-1000"
                >
                    <div className="relative p-1 bg-gradient-to-br from-rose-600 to-transparent skew-x-[-5deg] rotate-3 hover:rotate-0 transition-all duration-700">
                        <div className="bg-black/80 backdrop-blur-xl p-8 flex flex-col gap-6 w-[320px]">
                            <div className="flex items-center justify-between">
                                <Activity className="text-rose-600" size={32} />
                                <span className="bg-rose-600/10 text-rose-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Live Performance</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Ritmo Cardíaco</span>
                                <span className="text-4xl font-if-header italic">175 BPM</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Calorías Quemadas</span>
                                <span className="text-4xl font-if-header italic text-rose-600">842 KCAL</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-rose-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    transition={{ duration: 2, delay: 1 }}
                                />
                            </div>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest text-center mt-2">
                                Máximo rendimiento alcanzado
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Side Text decoration */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 -rotate-90 hidden xl:block">
                <span className="if-outline-text text-[15rem] font-if-header opacity-5 tracking-tighter italic">
                    FORGE YOUR DESTINY
                </span>
            </div>
        </section>
    );
}
