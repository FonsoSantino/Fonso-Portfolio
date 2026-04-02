'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-[#FFDE00]"></div>
            <span className="text-[#FFDE00] font-bold tracking-[0.2em] text-sm md:text-base uppercase">Líderes en Tecnología Forestal</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
          >
            SOLUCIONES <br />
            <span className="text-[#367C2B]">FORESTALES</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-medium"
          >
            Maquinaria de precisión, repuestos originales y servicio técnico especializado para potenciar la industria forestal.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#367C2B] text-white font-bold text-lg hover:bg-[#2d6624] transition-all flex items-center justify-center gap-2 group"
            >
              VER PRODUCTOS
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center"
            >
              SOLICITAR PRESUPUESTO
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats overlay for desktop */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
        className="hidden lg:grid grid-cols-3 absolute bottom-0 right-0 w-1/2 bg-[#367C2B]/90 backdrop-blur-sm p-8 border-t border-l border-white/20"
      >
        <div className="px-4 border-r border-white/20">
          <span className="block text-3xl font-black text-white">25+</span>
          <span className="text-xs font-bold text-[#FFDE00] tracking-widest uppercase">Años de Trayectoria</span>
        </div>
        <div className="px-4 border-r border-white/20">
          <span className="block text-3xl font-black text-white">500+</span>
          <span className="text-xs font-bold text-[#FFDE00] tracking-widest uppercase">Máquinas Vendidas</span>
        </div>
        <div className="px-4">
          <span className="block text-3xl font-black text-white">24/7</span>
          <span className="text-xs font-bold text-[#FFDE00] tracking-widest uppercase">Servicio Técnico</span>
        </div>
      </motion.div>
    </section>
  );
}
