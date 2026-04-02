"use client"

import React from 'react';
import { Mail, Instagram, Twitter, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white/40 pt-32 pb-16">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                    {/* Brand */}
                    <div className="flex flex-col gap-10">
                        <span className="font-lx-serif text-4xl tracking-[0.4em] font-light text-white uppercase">
                            LUXORA
                        </span>
                        <p className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] leading-loose max-w-xs">
                            Timeless elegance for the modern connoisseur. Crafted with absolute precision.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20">Services</h4>
                        <ul className="flex flex-col gap-4 text-[10px] uppercase font-bold tracking-[0.3em] transition-colors">
                            <li><a href="#" className="hover:text-gold flex items-center gap-2">Private Viewing <ArrowUpRight size={10} /></a></li>
                            <li><a href="#" className="hover:text-gold flex items-center gap-2">Bespoke Design <ArrowUpRight size={10} /></a></li>
                            <li><a href="#" className="hover:text-gold flex items-center gap-2">Care & Repair <ArrowUpRight size={10} /></a></li>
                            <li><a href="#" className="hover:text-gold flex items-center gap-2">Corporate <ArrowUpRight size={10} /></a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20">Information</h4>
                        <ul className="flex flex-col gap-4 text-[10px] uppercase font-bold tracking-[0.3em]">
                            <li><a href="#" className="hover:text-gold">Our Heritage</a></li>
                            <li><a href="#" className="hover:text-gold">Craftsmanship</a></li>
                            <li><a href="#" className="hover:text-gold">Global Boutiques</a></li>
                            <li><a href="#" className="hover:text-gold">Legal</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-8">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20">Newsletter</h4>
                        <p className="text-[10px] leading-relaxed tracking-[0.2em] font-bold">Subscribe to the Luxora Journal for private events and new releases.</p>
                        <div className="relative w-full">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full bg-transparent border-b border-white/5 py-3 outline-none focus:border-gold transition-colors text-[10px] font-bold uppercase tracking-[0.2em] placeholder:text-white/10"
                            />
                            <button className="absolute right-0 bottom-3 text-white/20 hover:text-gold">
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase font-bold tracking-[0.5em] text-white/10">
                    <p>© 2026 Luxora International Group. All rights reserved.</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-gold flex items-center gap-2">Instagram</a>
                        <a href="#" className="hover:text-gold flex items-center gap-2">LinkedIn</a>
                        <a href="#" className="hover:text-gold flex items-center gap-2">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
