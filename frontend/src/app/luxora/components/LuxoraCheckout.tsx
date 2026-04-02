'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, User, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Trash2, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface LuxoraCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    onSuccess?: () => void;
}

export const LuxoraCheckout = ({ isOpen, onClose, storeId, onSuccess }: LuxoraCheckoutProps) => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        address: '' 
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const storeItems = cartItems.filter(item => item.storeId === storeId);
    const total = getCartTotal(storeId);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        try {
            const response = await fetch('/api/checkout-luxora', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: storeItems,
                    total,
                    customer: formData
                })
            });
            
            if (response.ok) {
                setStep(4);
                clearCart();
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    const premiumTransition = {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={premiumTransition}
                className="bg-zinc-950 w-full max-w-4xl rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Left Side: Progress & Info */}
                <div className="w-full md:w-1/3 bg-zinc-900/50 p-10 border-r border-white/5 flex flex-col justify-between">
                    <div>
                        <div className="mb-12">
                            <h2 className="text-2xl font-light tracking-[0.2em] text-white uppercase italic">Luxora</h2>
                            <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase mt-1">Exquisite Checkout</p>
                        </div>

                        <div className="space-y-12">
                            {[
                                { n: 1, label: 'Boutique Bag', icon: '01' },
                                { n: 2, label: 'Client Details', icon: '02' },
                                { n: 3, label: 'Payment', icon: '03' },
                                { n: 4, label: 'Confirmation', icon: '04' }
                            ].map((s) => (
                                <div key={s.n} className={`flex items-center gap-6 transition-all duration-700 ${step >= s.n ? 'opacity-100' : 'opacity-20'}`}>
                                    <span className="text-2xl font-light italic font-serif text-white/20">{s.icon}</span>
                                    <span className={`text-xs tracking-[0.2em] uppercase ${step === s.n ? 'text-white font-medium' : 'text-white/40'}`}>
                                        {s.label}
                                    </span>
                                    {step === s.n && <motion.div layoutId="luxora-dot" className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center gap-3 text-white/30 mb-2">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] tracking-[0.1em] uppercase">Secure Concierge</span>
                        </div>
                        <p className="text-[9px] text-white/20 leading-relaxed uppercase tracking-widest font-light">
                            Your transaction is protected by enterprise-grade encryption and curated security protocols.
                        </p>
                    </div>
                </div>

                {/* Right Side: Main Content */}
                <div className="flex-grow flex flex-col bg-zinc-950 overflow-hidden relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-6 right-8 z-10 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex-grow p-10 md:p-14 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, scale: 0.99 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.01 }}
                                    transition={premiumTransition}
                                    className="space-y-10"
                                >
                                    <h3 className="text-3xl font-serif italic text-white">Your Selection</h3>
                                    <div className="space-y-6">
                                        {storeItems.map(item => (
                                            <div key={item.id} className="flex gap-8 items-center border-b border-white/5 pb-6 last:border-0 group">
                                                <div className="w-24 h-32 overflow-hidden bg-zinc-900 border border-white/5 relative">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-sm tracking-[0.1em] uppercase text-white font-light">{item.name}</h4>
                                                    <p className="text-xs text-white/40 mt-1 uppercase tracking-widest italic">{(item as any).category || 'Exclusive Piece'}</p>
                                                    <div className="flex items-center gap-6 mt-6">
                                                        <div className="flex items-center gap-4 text-white/40">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-white transition-colors">-</button>
                                                            <span className="text-[10px] font-medium tracking-widest">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-white transition-colors">+</button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-white transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-serif italic text-white">${item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, scale: 0.99 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.01 }}
                                    transition={premiumTransition}
                                    className="space-y-10"
                                >
                                    <h3 className="text-3xl font-serif italic text-white">Client Portfolio</h3>
                                    <div className="space-y-8">
                                        <div className="relative group">
                                            <label className="absolute -top-2 left-0 text-[9px] uppercase tracking-[0.3em] text-white/40 bg-zinc-950 px-2 group-focus-within:text-white transition-all">Full Name</label>
                                            <input 
                                                type="text" 
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/10 py-5 text-white focus:outline-none focus:border-white transition-all font-light tracking-widest"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="absolute -top-2 left-0 text-[9px] uppercase tracking-[0.3em] text-white/40 bg-zinc-950 px-2 group-focus-within:text-white transition-all">Email Address</label>
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                onChange={e => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/10 py-5 text-white focus:outline-none focus:border-white transition-all font-light tracking-widest"
                                                placeholder="name@exclusive.com"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <label className="absolute -top-2 left-0 text-[9px] uppercase tracking-[0.3em] text-white/40 bg-zinc-950 px-2 group-focus-within:text-white transition-all">Shipping Address</label>
                                            <textarea 
                                                value={formData.address}
                                                onChange={e => setFormData({...formData, address: e.target.value})}
                                                className="w-full bg-transparent border-b border-white/10 py-5 text-white focus:outline-none focus:border-white transition-all font-light tracking-widest min-h-[100px] resize-none"
                                                placeholder="Street, City, Country"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div 
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.99 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.01 }}
                                    transition={premiumTransition}
                                    className="space-y-10"
                                >
                                    <h3 className="text-3xl font-serif italic text-white">Payment Method</h3>
                                    <div className="bg-zinc-900/50 p-10 border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <CreditCard size={120} />
                                        </div>
                                        <div className="space-y-8 relative z-10">
                                            <div className="flex justify-between items-center text-white/40 border-b border-white/5 pb-4">
                                                <span className="text-[10px] uppercase tracking-[0.3em]">Credit Card Only</span>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale invert" />
                                            </div>
                                            <div className="space-y-6">
                                                <p className="text-xl tracking-[0.4em] text-white font-serif italic py-2 border-b border-white/10">**** **** **** 8842</p>
                                                <div className="grid grid-cols-2 gap-12">
                                                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2">EXP: 08/30</p>
                                                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2">CVC: ***</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] text-center italic mt-12">
                                        Luxury payment protocols active • Encrypted
                                    </p>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div 
                                    key="step4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5 }}
                                    className="text-center py-10 space-y-12"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-serif italic text-white leading-tight">Order Confirmed</h3>
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-light">Your selection is being prepared</p>
                                    </div>
                                    
                                    <div className="max-w-md mx-auto bg-zinc-900/40 p-10 border border-white/5 space-y-8">
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Client Information</p>
                                            <p className="text-xs text-white tracking-widest font-light">{formData.name}</p>
                                            <p className="text-xs text-white/60 tracking-widest font-light">{formData.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Destination</p>
                                            <p className="text-xs text-white tracking-widest font-light">{formData.address}</p>
                                        </div>
                                        <div className="pt-8 border-t border-white/5 flex justify-between items-baseline">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Investment Total</p>
                                            <p className="text-2xl font-serif italic text-white">${total.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={onClose}
                                        className="group relative px-12 py-5 overflow-hidden transition-all duration-700 hover:scale-105"
                                    >
                                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                        <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] text-white group-hover:text-black transition-colors duration-700">Enter Salon</span>
                                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    {step < 4 && (
                        <div className="p-10 border-t border-white/5 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Total Investment</p>
                                <p className="text-2xl font-serif italic text-white">${total.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex gap-12 items-center">
                                {step > 1 && (
                                    <button 
                                        onClick={handleBack}
                                        className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button 
                                    disabled={storeItems.length === 0 || isProcessing || (step === 2 && (!formData.name || !formData.email || !formData.address))}
                                    onClick={step === 3 ? handleSubmit : handleNext}
                                    className="group relative px-12 py-5 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white transition-all duration-700" />
                                    <div className="relative z-10 flex items-center gap-4">
                                        {isProcessing ? (
                                            <div className="w-4 h-4 border border-black/20 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <span className="text-[10px] uppercase tracking-[0.5em] text-white group-hover:text-black transition-colors duration-700">
                                                {step === 3 ? 'Confirm Order' : 'Continue'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
