"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard } from 'lucide-react';
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
    const storeItems = cartItems.filter(item => item.storeId === 'supermarket');
    const totalItems = getCartCount('supermarket');
    const totalPrice = getCartTotal('supermarket');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Tu Carrito</h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{totalItems} articulos seleccionados</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {storeItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">El carrito está vacío</p>
                                    <button 
                                        onClick={onClose}
                                        className="text-emerald-600 font-black uppercase text-xs tracking-[0.2em] border-b-2 border-emerald-600/20 hover:border-emerald-600 transition-all pb-1"
                                    >
                                        Seguir comprando
                                    </button>
                                </div>
                            ) : (
                                storeItems.map((item) => (
                                    <motion.div 
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-extrabold text-slate-800 text-sm uppercase leading-tight line-clamp-1">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-1 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-white rounded-lg p-1 px-2 border border-slate-200">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-emerald-600"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-black text-emerald-600 text-xs w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-emerald-600"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-black text-slate-800 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Summary */}
                        {storeItems.length > 0 && (
                            <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_25px_-15px_rgba(0,0,0,0.1)]">
                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                                        <span>Envío</span>
                                        <span className="text-emerald-600">Gratis</span>
                                    </div>
                                    <div className="h-px bg-slate-50 my-1" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-black text-slate-800 uppercase tracking-tight">Total</span>
                                        <span className="text-2xl font-black text-emerald-600">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={onCheckout}
                                    className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-extrabold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                                >
                                    Finalizar Compra
                                    <CreditCard size={20} />
                                </button>
                                
                                <p className="text-center mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                                    Pagos seguros con tarjetas y transferencia
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
