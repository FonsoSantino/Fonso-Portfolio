'use client';

import React from 'react';
import { Settings, Wrench, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'MANTENIMIENTO PREVENTIVO',
    description: 'Planes de mantenimiento programado para maximizar la vida útil de sus equipos y evitar paradas innecesarias.',
    icon: Settings,
    color: '#367C2B',
  },
  {
    title: 'REPARACIÓN ESPECIALIZADA',
    description: 'Técnicos certificados por John Deere y Stihl para reparaciones complejas con repuestos 100% originales.',
    icon: Wrench,
    color: '#367C2B',
  },
  {
    title: 'ASESORAMIENTO TÉCNICO',
    description: 'Expertos forestales que le ayudarán a seleccionar la maquinaria ideal según su terreno y objetivos de producción.',
    icon: ShieldCheck,
    color: '#367C2B',
  },
  {
    title: 'SOPORTE 24/7 EN CAMPO',
    description: 'Unidades móviles equipadas para asistirle directamente en el lugar de trabajo, sin importar la dificultad del terreno.',
    icon: HeadphonesIcon,
    color: '#367C2B',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-1 bg-[#FFDE00]"></div>
            <span className="text-gray-900 font-bold uppercase tracking-widest text-sm">NIVEL PROFESIONAL</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">MÁS QUE EQUIPOS, <br /> <span className="text-[#367C2B]">SOLUCIONES INTEGRALES</span></h2>
          <p className="text-lg text-gray-600 font-medium">Respaldamos su inversión con un ecosistema de servicios diseñados para que su producción nunca se detenga.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 border-2 border-gray-100 hover:border-[#367C2B] group transition-all duration-300 bg-white"
            >
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-[#367C2B] transition-colors">
                <service.icon size={32} className="text-[#367C2B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{service.description}</p>
              
              <div 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 flex items-center gap-2 text-[#367C2B] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 cursor-pointer"
              >
                <span className="text-xs font-bold tracking-widest uppercase">MÁS INFORMACIÓN</span>
                <span className="text-xl">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
