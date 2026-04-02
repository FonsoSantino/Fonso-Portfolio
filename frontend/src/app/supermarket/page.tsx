"use client"

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import OffersSection from './components/OffersSection';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { SupermarketCheckout } from './components/SupermarketCheckout';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupermarketPage() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <main className="supermarket-app overflow-x-hidden">
            <Header
                onOpenCart={() => setIsCartOpen(true)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Hero />
                    <CategorySection />
                    <OffersSection />
                    <ProductCatalog searchTerm={searchTerm} />
                    <Footer />
                </motion.div>
            </AnimatePresence>

            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />

            <SupermarketCheckout 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                storeId="supermarket"
            />
        </main>
    );
}
