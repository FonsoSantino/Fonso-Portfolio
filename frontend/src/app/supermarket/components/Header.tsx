"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    onOpenCart: () => void;
    searchTerm: string;
    onSearchChange: (val: string) => void;
}

export default function Header({ onOpenCart, searchTerm, onSearchChange }: HeaderProps) {
    const { getCartCount } = useCart();
    const totalItems = getCartCount('supermarket');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        if (id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
        }`}>
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer shrink-0" onClick={() => scrollTo('top')}>
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Leaf size={24} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-xl tracking-tight leading-none text-emerald-600">
                            FRESH<span className="text-slate-800">MARKET</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                            Organic &amp; Local
                        </span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
                    <button onClick={() => scrollTo('top')} className="hover:text-emerald-500 transition-colors">Inicio</button>
                    <button onClick={() => scrollTo('catalog')} className="hover:text-emerald-500 transition-colors">Productos</button>
                    <button onClick={() => scrollTo('offers')} className="hover:text-emerald-500 transition-colors">Ofertas</button>
                    <button onClick={() => scrollTo('contact')} className="hover:text-emerald-500 transition-colors">Contacto</button>
                </nav>

                {/* Search + Actions */}
                <div className="flex items-center gap-3">
                    {/* Inline search */}
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 200, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    placeholder="Buscar productos..."
                                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 outline-none font-semibold text-slate-700 text-sm"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => { setShowSearch(v => !v); if (showSearch) onSearchChange(''); }}
                        className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-all"
                        aria-label="Buscar"
                    >
                        {showSearch ? <X size={20} /> : <Search size={20} />}
                    </button>
                    
                    <button 
                        onClick={onOpenCart}
                        className="relative p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all flex items-center gap-2 group"
                    >
                        <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="hidden sm:inline font-bold text-sm">Mi Carrito</span>
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2.5 rounded-full hover:bg-slate-100 text-slate-600"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        {/* Mobile search */}
                        <div className="container mx-auto px-4 pt-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    placeholder="Buscar productos..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 outline-none font-semibold text-slate-700 text-sm"
                                />
                            </div>
                        </div>
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-2 font-bold text-slate-600">
                            <button onClick={() => scrollTo('top')} className="p-3 hover:bg-slate-50 rounded-lg text-left">Inicio</button>
                            <button onClick={() => scrollTo('catalog')} className="p-3 hover:bg-slate-50 rounded-lg text-left">Productos</button>
                            <button onClick={() => scrollTo('offers')} className="p-3 hover:bg-slate-50 rounded-lg text-left">Ofertas</button>
                            <button onClick={() => scrollTo('contact')} className="p-3 hover:bg-slate-50 rounded-lg text-left">Contacto</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
