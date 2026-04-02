'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, Hammer, Shield, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Trash2, MapPin, Building2, User } from 'lucide-react';

interface ForestalCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    onSuccess?: () => void;
}

export const ForestalCheckout = ({ isOpen, onClose, storeId, onSuccess }: ForestalCheckoutProps) => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ 
        name: '', 
        company: '',
        address: '', 
        paymentMethod: 'invoice' 
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
            // Reusing supermarket checkout for manual tools but with industrial feel
            const response = await fetch('/api/checkout-supermarket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: storeItems,
                    total,
                    customer: formData,
                    type: 'forestal-tools'
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

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border-4 border-[#367C2B]"
            >
                {/* Header */}
                <div className="bg-[#367C2B] p-8 text-white flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Hammer size={20} className="text-[#FEC10D]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Industrial Tools</span>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">
                            {step === 1 && 'Confirmar Pedido'}
                            {step === 2 && 'Datos de Envío'}
                            {step === 3 && 'Método de Pago'}
                            {step === 4 && 'Pedido Procesado'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    {storeItems.map(item => (
                                        <div key={item.id} className="flex gap-6 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border-2 border-slate-200" />
                                            <div className="flex-grow">
                                                <h3 className="text-slate-800 font-extrabold uppercase text-sm tracking-tight">{item.name}</h3>
                                                <p className="text-[#367C2B] font-black text-lg mt-1">${item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 font-black hover:text-[#367C2B]">-</button>
                                                <span className="text-slate-900 font-extrabold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 font-black hover:text-[#367C2B]">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input 
                                                type="text" 
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" 
                                                placeholder="Juan Pérez" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Empresa (Opcional)</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input 
                                                type="text" 
                                                value={formData.company}
                                                onChange={e => setFormData({...formData, company: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" 
                                                placeholder="Maderas Sur" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dirección de Entrega / Obra</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input 
                                            type="text" 
                                            value={formData.address}
                                            onChange={e => setFormData({...formData, address: e.target.value})}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" 
                                            placeholder="Ruta 5, Km 42 - Aserradero El Pino" 
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
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => setFormData({...formData, paymentMethod: 'invoice'})}
                                    className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.paymentMethod === 'invoice' ? 'border-[#367C2B] bg-emerald-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 rounded-xl bg-[#367C2B] text-white flex items-center justify-center">
                                            <Building2 size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 uppercase text-xs tracking-widest">Factura a Empresa</p>
                                            <p className="text-[10px] text-slate-500 font-bold">Transferencia bancaria a 30 días</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'invoice' ? 'border-[#367C2B]' : 'border-slate-300'}`}>
                                        {formData.paymentMethod === 'invoice' && <div className="w-3 h-3 bg-[#367C2B] rounded-full" />}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                                    className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.paymentMethod === 'card' ? 'border-[#367C2B] bg-emerald-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 rounded-xl bg-[#FEC10D] text-[#367C2B] flex items-center justify-center">
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 uppercase text-xs tracking-widest">Tarjeta Corporativa</p>
                                            <p className="text-[10px] text-slate-500 font-bold">Visa / Mastercard / Amex</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'card' ? 'border-[#367C2B]' : 'border-slate-300'}`}>
                                        {formData.paymentMethod === 'card' && <div className="w-3 h-3 bg-[#367C2B] rounded-full" />}
                                    </div>
                                </button>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-8"
                            >
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    <CheckCircle size={56} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">¡Orden Procesada!</h3>
                                    <p className="text-slate-500 font-bold text-sm max-w-sm mx-auto">
                                        Hemos registrado tu pedido para <b>{formData.company || formData.name}</b>. Un asesor de logística se comunicará para coordinar la entrega en obra.
                                    </p>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="w-full py-5 rounded-2xl bg-[#367C2B] text-white font-extrabold shadow-lg hover:bg-[#2d6624] transition-all"
                                >
                                    Volver al Catálogo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                {step < 4 && (
                    <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total con Impuestos</span>
                            <span className="text-3xl font-black text-slate-800">${total.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-4">
                            {step > 1 && (
                                <button 
                                    onClick={handleBack}
                                    className="w-16 h-16 rounded-2xl border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:bg-white transition-all"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <button 
                                disabled={storeItems.length === 0 || isProcessing || (step === 2 && (!formData.name || !formData.address))}
                                onClick={step === 3 ? handleSubmit : handleNext}
                                className="px-10 h-16 rounded-2xl bg-[#367C2B] text-white font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#2d6624] shadow-lg active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {step === 3 ? 'Finalizar Pedido' : 'Siguiente'} 
                                        {step < 3 && <ArrowRight size={20} />}
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
