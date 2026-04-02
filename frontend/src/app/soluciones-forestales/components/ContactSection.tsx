'use client';

import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactSection() {
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/soluciones-forestales/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#367C2B] opacity-10 blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-1 bg-[#FFDE00]"></div>
              <span className="text-[#FFDE00] font-bold uppercase tracking-widest text-sm text-yellow-400">CONTACTO DIRECTO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">¿LISTO PARA <br /> <span className="text-[#367C2B]">IMPULSAR SU NEGOCIO?</span></h2>
            <p className="text-lg text-gray-400 mb-12 max-w-md font-medium">Escríbanos hoy mismo para recibir asesoramiento personalizado o solicitar un presupuesto sin compromiso.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#367C2B] transition-colors">
                  <Phone size={24} className="group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#FFDE00] tracking-widest uppercase mb-1">Teléfono Comercial</span>
                  <span className="text-xl font-bold">+54 (341) 456-7890</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#367C2B] transition-colors">
                  <Mail size={24} className="group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#FFDE00] tracking-widest uppercase mb-1">Correo Electrónico</span>
                  <span className="text-xl font-bold">ventas@solucionesforestales.com</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#367C2B] transition-colors">
                  <MapPin size={24} className="group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#FFDE00] tracking-widest uppercase mb-1">Casa Central</span>
                  <span className="text-xl font-bold">Av. Industrial 1234, Rosario, Sta Fe</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">NOMBRE COMPLETO</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 focus:border-[#367C2B] focus:outline-none text-gray-900 font-medium transition-colors"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">CORREO ELECTRÓNICO</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 focus:border-[#367C2B] focus:outline-none text-gray-900 font-medium transition-colors"
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-2">MENSAJE O CONSULTA</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 focus:border-[#367C2B] focus:outline-none text-gray-900 font-medium transition-colors resize-none"
                    placeholder="Cuéntenos sobre sus necesidades..."
                  />
                </div>
                
                <button 
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-[#367C2B] text-white font-bold text-lg hover:bg-[#2d6624] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'sending' ? 'ENVIANDO...' : (
                    <>
                      ENVIAR MENSAJE
                      <Send size={20} />
                    </>
                  )}
                </button>
                
                {status === 'success' && (
                  <div className="p-4 bg-green-50 text-green-700 font-bold text-center border border-green-200">
                    ¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 font-bold text-center border border-red-200">
                    Error al enviar el mensaje. Por favor intente nuevamente.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
