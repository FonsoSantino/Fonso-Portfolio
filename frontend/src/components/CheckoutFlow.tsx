'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, User, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';

interface CheckoutFlowProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    accentColor?: string;
    onSuccess?: () => void;
}

export const CheckoutFlow = ({ isOpen, onClose, storeId, accentColor = '#3b82f6', onSuccess }: CheckoutFlowProps) => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });
    const [isProcessing, setIsProcessing] = useState(false);

    const storeItems = cartItems.filter(item => item.storeId === storeId);
    const total = getCartTotal(storeId);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setStep(4);
        clearCart();
        if (onSuccess) onSuccess();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-bottom border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
                            {step === 1 && <ShoppingBag className="w-5 h-5 text-white/60" />}
                            {step === 2 && <User className="w-5 h-5 text-white/60" />}
                            {step === 3 && <CreditCard className="w-5 h-5 text-white/60" />}
                            {step === 4 && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-tight">
                                {step === 1 && 'Review Cart'}
                                {step === 2 && 'Customer Information'}
                                {step === 3 && 'Payment Method'}
                                {step === 4 && 'Order Confirmed'}
                            </h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Step {step} of 4</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-6 h-6 text-white/40" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {storeItems.length === 0 ? (
                                    <div className="text-center py-20">
                                        <ShoppingBag className="w-16 h-16 text-white/5 mx-auto mb-4" />
                                        <p className="text-white/40 italic">Your cart is empty</p>
                                    </div>
                                ) : (
                                    storeItems.map(item => (
                                        <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                            <div className="flex-grow">
                                                <h3 className="text-white font-bold">{item.name}</h3>
                                                <p className="text-white/40 text-sm">${item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10"
                                                >-</button>
                                                <span className="text-white w-4 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10"
                                                >+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-white/20 hover:text-red-500">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Shipping Address</label>
                                        <textarea 
                                            value={formData.address}
                                            onChange={e => setFormData({...formData, address: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 h-24"
                                            placeholder="123 Street Name, City"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-3xl border border-white/10 mb-8">
                                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <CreditCard size={18} /> Credit Card Information
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="bg-white/5 h-12 rounded-xl border border-white/10 flex items-center px-4 text-white/30 italic text-sm">
                                            Card number: **** **** **** ****
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 h-12 rounded-xl border border-white/10 flex items-center px-4 text-white/30 italic text-sm">MM/YY</div>
                                            <div className="bg-white/5 h-12 rounded-xl border border-white/10 flex items-center px-4 text-white/30 italic text-sm">CVC</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-center text-white/20">This is a payment simulation. No real money will be charged.</p>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Success!</h3>
                                <p className="text-white/40 mb-8">Thank you for your purchase. Your order has been placed.</p>
                                <button 
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all"
                                >
                                    Done
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer buttons */}
                {step < 4 && (
                    <div className="p-8 border-t border-white/5 bg-black/20 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white/60 font-medium">Total Amount</span>
                            <span className="text-2xl font-bold text-white">${total.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-4">
                            {step > 1 && (
                                <button 
                                    onClick={handleBack}
                                    className="flex-1 h-14 rounded-2xl border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <ArrowLeft size={18} /> Back
                                </button>
                            )}
                            <button 
                                disabled={storeItems.length === 0 || isProcessing}
                                onClick={step === 3 ? handleSubmit : handleNext}
                                style={{ backgroundColor: accentColor }}
                                className="flex-[2] h-14 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {step === 3 ? 'Complete Order' : 'Continue'} 
                                        {step < 3 && <ArrowRight size={18} />}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
