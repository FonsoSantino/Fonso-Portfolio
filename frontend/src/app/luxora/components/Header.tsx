"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
    const { getCartCount } = useCart();
    const totalItems = getCartCount('luxora');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-[100] w-full transition-all duration-1000 ${
            isScrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}>
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Minimal Logo */}
                <div className="flex-1 flex justify-start">
                    <button className="p-2 -ml-2 text-white/60 hover:text-white transition-colors">
                        <Menu size={20} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex-none">
                    <span className="font-lx-serif text-3xl md:text-4xl tracking-[0.3em] font-light text-white uppercase pointer-events-none select-none">
                        LUXORA
                    </span>
                </div>

                <div className="flex-1 flex justify-end items-center gap-8">
                    <nav className="hidden lg:flex items-center gap-10 text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">
                        <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors uppercase">Collection</button>
                        <button onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors uppercase">Heritage</button>
                        <button onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-gold transition-colors uppercase">Bespoke</button>
                    </nav>

                    <button 
                        onClick={onOpenCart}
                        className="relative flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                    >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="text-[9px] font-black tracking-widest text-gold"
                                >
                                    ({totalItems})
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </header>
    );
}
