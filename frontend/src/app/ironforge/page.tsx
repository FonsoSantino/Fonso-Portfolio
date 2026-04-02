"use client"

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Pricing from './components/Pricing';
import Schedule from './components/Schedule';
import Trainers from './components/Trainers';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function IronForgePage() {
    return (
        <main className="ironforge-app overflow-x-hidden selection:bg-rose-600 selection:text-white">
            <Header />
            
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Hero />
                    
                    {/* Visual Divider / Marquee */}
                    <div className="bg-rose-600 py-6 overflow-hidden flex whitespace-nowrap border-y-4 border-black">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-white font-if-header text-4xl italic tracking-tighter mx-16 uppercase opacity-90">
                                No Pain No Gain • Discipline is King • Forge Your Soul • Iron Heart • Push Further •
                            </span>
                        ))}
                    </div>

                    <Programs />
                    
                    <Pricing />

                    {/* Intense Call to Action */}
                    <section className="py-24 bg-rose-600 relative overflow-hidden group">
                        <div className="container mx-auto px-6 flex flex-col items-center gap-12 relative z-10 text-center">
                            <h3 className="font-if-header text-5xl md:text-8xl italic uppercase text-white tracking-tighter leading-none">
                                ¿LISTO PARA LA <br /> TRANSFORMACIÓN?
                            </h3>
                            <button className="px-16 py-6 bg-black text-white font-black uppercase tracking-[0.3em] italic skew-x-[-12deg] transition-all hover:scale-110 shadow-2xl group-hover:bg-zinc-900 border-2 border-white/10">
                                <span className="block skew-x-[12deg]">Entrena gratis hoy</span>
                            </button>
                        </div>
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                            <span className="text-[30rem] font-if-header italic if-outline-text text-white">FORGE</span>
                        </div>
                    </section>

                    <Schedule />
                    
                    <Trainers />
                    
                    <Footer />
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
