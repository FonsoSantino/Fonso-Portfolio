"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer({ 
    isOpen, 
    onClose, 
    onCheckout 
}: { 
    isOpen: boolean, 
    onClose: () => void, 
    onCheckout: () => void 
}) {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    
    // Filter items for this store
    const storeItems = cartItems.filter(item => item.storeId === 'luxora');
    const totalItems = getCartCount('luxora');
    const totalPrice = getCartTotal('luxora');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
                    />

                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] z-[210] flex flex-col border-l border-white/5"
                    >
                        {/* Header */}
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-lx-serif text-3xl font-light text-white tracking-[0.2em] uppercase">Your Selection</h2>
                                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold/60">{totalItems} Unique Pieces</span>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 text-white/20 hover:text-white transition-colors"
                            >
                                <X size={20} strokeWidth={1} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col gap-12">
                            {storeItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                                    <ShoppingBag size={40} strokeWidth={0.5} className="text-white/10" />
                                    <p className="text-white/20 font-light text-sm tracking-widest uppercase">The collection is empty</p>
                                    <button 
                                        onClick={onClose}
                                        className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold hover:text-white transition-colors border-b border-gold/20 pb-2"
                                    >
                                        Begin Selection
                                    </button>
                                </div>
                            ) : (
                                storeItems.map((item) => (
                                    <motion.div 
                                        key={item.id}
                                        layout
                                        className="flex gap-8 group"
                                    >
                                        <div className="w-24 aspect-[3/4] overflow-hidden bg-white/5 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60" />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="font-lx-serif text-xl font-light text-white tracking-widest uppercase leading-none">{item.name}</h3>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 text-white/10 hover:text-gold transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-4 px-2 py-1 border border-white/5 rounded-sm">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/20 hover:text-white"><Minus size={12} /></button>
                                                    <span className="text-[10px] font-bold text-white/60 w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/20 hover:text-white"><Plus size={12} /></button>
                                                </div>
                                                <span className="text-sm font-light text-white/60 tracking-widest">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {storeItems.length > 0 && (
                            <div className="p-10 bg-black/40 backdrop-blur-md border-t border-white/5">
                                <div className="flex flex-col gap-4 mb-10">
                                    <div className="flex justify-between items-center text-[10px] items-center text-white/30 uppercase font-bold tracking-[0.4em]">
                                        <span>Total Investment</span>
                                        <span className="text-xl font-lx-serif text-white tracking-widest">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[8px] text-white/10 uppercase font-bold tracking-[0.3em] text-center">
                                        Private courier shipping included for all orders
                                    </p>
                                </div>

                                <button 
                                    onClick={onCheckout}
                                    className="w-full py-5 text-[10px] uppercase font-bold tracking-[0.4em] bg-white text-black hover:bg-gold transition-colors duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                                >
                                    Checkout Selection
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
