"use client"

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { LuxoraCheckout } from './components/LuxoraCheckout';
import { motion, AnimatePresence } from 'framer-motion';

export default function LuxoraPage() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    return (
        <main className="luxora-app overflow-x-hidden selection:bg-gold selection:text-black">
            <Header onOpenCart={() => setIsCartOpen(true)} />
            
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <Hero />
                    <Collections />
                    <div id="products">
                        <ProductGrid onSelectProduct={(p) => setSelectedProduct(p)} />
                    </div>
                    
                    {/* Brand Experience Section */}
                    <section id="heritage" className="py-48 bg-black relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="container mx-auto px-6 md:px-12 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center gap-12"
                            >
                                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold/60">Craftsmanship</span>
                                <h2 className="font-lx-serif text-5xl md:text-8xl font-light text-white uppercase tracking-widest leading-tight">
                                    The Art of <br /> Excellence
                                </h2>
                                <p className="text-white/40 font-light text-base md:text-lg max-w-2xl mx-auto leading-loose tracking-[0.1em]">
                                    Each piece in our collection is a masterpiece of design, meticulously crafted by master artisans who have dedicated their lives to the pursuit of perfection.
                                </p>
                                <button 
                                    onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="mt-12 group flex items-center gap-6 text-[10px] uppercase font-bold tracking-[0.4em] text-white"
                                >
                                    <span>Discover Heritage</span>
                                    <div className="w-12 h-px bg-gold/40 group-hover:w-20 transition-all duration-700" />
                                </button>
                            </motion.div>
                        </div>
                    </section>

                    <Footer />
                </motion.div>
            </AnimatePresence>

            <ProductDetail 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />

            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />

            <LuxoraCheckout 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                storeId="luxora"
            />
        </main>
    );
}
