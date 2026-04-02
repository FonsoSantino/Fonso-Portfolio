'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Truck, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Trash2, MapPin, Clock, DollarSign } from 'lucide-react';

interface SupermarketCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    storeId: string;
    onSuccess?: () => void;
}

export const SupermarketCheckout = ({ isOpen, onClose, storeId, onSuccess }: SupermarketCheckoutProps) => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ 
        address: '', 
        timeSlot: 'Today, 2:00 PM - 4:00 PM',
        paymentMethod: 'card' 
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
            const response = await fetch('/api/checkout-supermarket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: storeItems,
                    total,
                    delivery: formData
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-emerald-100"
            >
                {/* Header */}
                <div className="p-6 pb-2 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-600">
                            {step === 1 && <ShoppingBag className="w-6 h-6" />}
                            {step === 2 && <Truck className="w-6 h-6" />}
                            {step === 3 && <CreditCard className="w-6 h-6" />}
                            {step === 4 && <CheckCircle className="w-6 h-6" />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {step === 1 && 'Review Cart'}
                                {step === 2 && 'Delivery Details'}
                                {step === 3 && 'Payment'}
                                {step === 4 && 'All set!'}
                            </h2>
                            <div className="flex gap-1 mt-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 w-6 rounded-full transition-all duration-300 ${i <= step ? 'bg-emerald-500' : 'bg-emerald-100'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 pt-4">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-4"
                            >
                                {storeItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="w-16 h-16 text-emerald-100 mx-auto mb-4" />
                                        <p className="text-gray-400">Your basket is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {storeItems.map(item => (
                                            <div key={item.id} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                                                <div className="flex-grow">
                                                    <h3 className="text-gray-900 font-semibold">{item.name}</h3>
                                                    <p className="text-emerald-600 font-bold">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border shadow-sm">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-emerald-600"
                                                    >-</button>
                                                    <span className="text-gray-900 w-4 text-center font-medium">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-emerald-600"
                                                    >+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <MapPin size={16} className="text-emerald-500" /> Delivery Address
                                        </label>
                                        <input 
                                            type="text" 
                                            value={formData.address}
                                            onChange={e => setFormData({...formData, address: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            placeholder="Street name, Number, Flat"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Clock size={16} className="text-emerald-500" /> Delivery Time
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['ASAP', 'Today, 2-4 PM', 'Today, 4-6 PM', 'Tomorrow morning'].map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setFormData({...formData, timeSlot: slot})}
                                                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.timeSlot === slot ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-500'}`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                                        className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                                <CreditCard size={20} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900">Credit / Debit Card</p>
                                                <p className="text-xs text-gray-500">Fast & Secure</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'card' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                            {formData.paymentMethod === 'card' && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                                        className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                <DollarSign size={20} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900">Cash on Delivery</p>
                                                <p className="text-xs text-gray-500">Pay when you receive</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                            {formData.paymentMethod === 'cod' && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                                    We've received your order. Your fresh products will arrive at <b>{formData.timeSlot}</b>.
                                </p>
                                <button 
                                    onClick={onClose}
                                    className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 active:scale-[0.98] transition-all"
                                >
                                    Track Order
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                {step < 4 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 font-medium">Total Price</span>
                            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex gap-4">
                            {step > 1 && (
                                <button 
                                    onClick={handleBack}
                                    className="w-14 h-14 rounded-2xl border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-white transition-all"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <button 
                                disabled={storeItems.length === 0 || isProcessing || (step === 2 && !formData.address)}
                                onClick={step === 3 ? handleSubmit : handleNext}
                                className="flex-grow h-14 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                            >
                                {isProcessing ? (
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {step === 3 ? 'Place Order' : 'Next Step'} 
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
