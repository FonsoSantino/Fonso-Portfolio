"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetail({ product, onClose }: { product: any | null, onClose: () => void }) {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="fixed top-8 right-8 z-[160] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all hover:rotate-90 duration-500"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <div className="container mx-auto max-w-7xl h-full flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    {/* Image Section */}
                    <div className="flex-1 w-full h-full relative overflow-hidden group">
                        <motion.img 
                            layoutId={`img-${product.id}`}
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain md:object-cover opacity-80"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="flex-1 flex flex-col items-start gap-12 max-w-xl"
                    >
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.5em] text-gold/60">{product.category}</span>
                            <h2 className="font-lx-serif text-5xl md:text-7xl font-light text-white uppercase tracking-widest leading-none">
                                {product.name}
                            </h2>
                            <p className="text-white/40 font-light text-base md:text-lg leading-loose tracking-[0.1em]">
                                {product.description}
                            </p>
                        </div>

                        {/* Details Table */}
                        <div className="w-full grid grid-cols-2 gap-y-8 border-y border-white/5 py-12">
                            {Object.entries(product.details).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20">{key}</span>
                                    <span className="text-sm font-medium text-white/80 tracking-widest">{value as string}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between w-full mt-4">
                            <span className="font-lx-serif text-4xl text-white tracking-widest">
                                ${product.price.toLocaleString()}
                            </span>
                            
                            <button 
                                onClick={() => {
                                    addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image,
                                        storeId: 'luxora'
                                    });
                                    onClose();
                                }}
                                className="group relative py-5 px-12 text-[10px] uppercase font-bold tracking-[0.5em] text-black bg-gold hover:bg-white transition-colors duration-500 overflow-hidden shadow-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <span>Add to Cart</span>
                                    <ShoppingBag size={14} />
                                </div>
                            </button>
                        </div>

                        <button 
                            onClick={onClose}
                            className="mt-8 flex items-center gap-4 text-[9px] uppercase font-bold tracking-[0.5em] text-white/20 hover:text-white/60 transition-colors"
                        >
                            <ArrowRight size={12} className="rotate-180" />
                            <span>Continue Exploring</span>
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
