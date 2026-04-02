"use client"

import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                                <Leaf size={24} fill="currentColor" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight leading-none text-white">
                                FRESH<span className="text-emerald-500">MARKET</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 font-medium">
                            Llevamos lo mejor del campo a tu mesa. Productos 100% orgánicos, frescos y seleccionados con amor para tu familia.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-sm">Empresa</h4>
                        <ul className="flex flex-col gap-3 font-semibold text-sm">
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Nuestros Productores</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Sustentabilidad</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Trabaja con Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-sm">Soporte</h4>
                        <ul className="flex flex-col gap-3 font-semibold text-sm">
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Centro de Ayuda</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Envíos y Entregas</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Devoluciones</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-sm">Contacto</h4>
                        <ul className="flex flex-col gap-4 font-semibold text-sm">
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-emerald-500" />
                                <span>Av. Libertador 1234, CABA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-emerald-500" />
                                <span>+54 11 4444-5555</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-emerald-500" />
                                <span>hola@freshmarket.com.ar</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <p>© 2026 FreshMarket. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
