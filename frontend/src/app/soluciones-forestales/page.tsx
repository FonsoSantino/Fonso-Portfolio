"use client"

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import Services from './components/Services';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { ForestalCheckout } from './components/ForestalCheckout';
import { QuoteModal } from './components/QuoteModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolucionesForestalesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleOpenQuote = (product: any) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  };

  return (
    <main className="forestal-app overflow-x-hidden selection:bg-[#367C2B] selection:text-white">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <ProductCatalog onOpenQuote={handleOpenQuote} />
          <Services />
          <div id="contact">
            <ContactSection />
          </div>
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

      <ForestalCheckout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        storeId="forestal"
      />

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        product={selectedProduct}
      />
    </main>
  );
}
