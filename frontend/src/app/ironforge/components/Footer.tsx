"use client"

import React from 'react';
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white/40 pt-32 pb-16 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32 relative z-10">
                    {/* Brand */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-2">
                            <span className="font-if-header text-4xl italic tracking-tighter">
                                IRON<span className="text-rose-600">FORGE</span>
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest leading-loose">
                            No forjamos solo cuerpos. Forjamos el carácter de los campeones. Únete a la élite.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all skew-x-[-12deg]">
                                    <Icon size={18} className="skew-x-[12deg]" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-xs uppercase font-black tracking-[0.4em] text-white">Navegación</h4>
                        <ul className="flex flex-col gap-4 text-[10px] uppercase font-bold tracking-widest">
                            <li><a href="#" className="hover:text-rose-600">Programas</a></li>
                            <li><a href="#" className="hover:text-rose-600">Membresías</a></li>
                            <li><a href="#" className="hover:text-rose-600">Horarios</a></li>
                            <li><a href="#" className="hover:text-rose-600">Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-xs uppercase font-black tracking-[0.4em] text-white">Contacto</h4>
                        <ul className="flex flex-col gap-4 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                            <li className="flex items-start gap-3"><MapPin size={14} className="text-rose-600" /> Av. del Hierro 1234, CABA</li>
                            <li className="flex items-center gap-3"><Phone size={14} className="text-rose-600" /> +54 9 11 0000-0000</li>
                            <li className="flex items-center gap-3"><Mail size={14} className="text-rose-600" /> info@ironforge.fit</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-xs uppercase font-black tracking-[0.4em] text-white">Boletín</h4>
                        <p className="text-[10px] leading-relaxed tracking-widest font-bold uppercase">Suscríbete para recibir consejos de entrenamiento y ofertas exclusivas.</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="bg-white/5 border border-white/10 px-4 py-3 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-rose-600 w-full"
                            />
                            <button className="bg-rose-600 text-white px-6 py-3 font-bold uppercase tracking-widest italic hover:bg-rose-700 transition-colors">
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase font-bold tracking-[0.4em] text-white/10">
                    <p>© 2026 IRONFORGE FITNESS GROUP. DESINGED FOR PERFORMANCE.</p>
                    <div className="flex gap-12 italic">
                        <a href="#" className="hover:text-rose-600">Terms of Service</a>
                        <a href="#" className="hover:text-rose-600">Privacy Policy</a>
                    </div>
                </div>
            </div>

            {/* Huge background text */}
            <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/4 hidden lg:block opacity-[0.02]">
                <span className="text-[20rem] font-if-header italic tracking-tighter if-outline-text">IRONFORGE</span>
            </div>
        </footer>
    );
}
