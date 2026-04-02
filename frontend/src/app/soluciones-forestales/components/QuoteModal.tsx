"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

export function QuoteModal({ isOpen, onClose, product }: QuoteModalProps) {
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const form = e.target as HTMLFormElement;
        const data = {
            productName: product?.name,
            customerName: (form.elements.namedItem('name') as HTMLInputElement).value,
            company: (form.elements.namedItem('company') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value
        };

        try {
            await fetch('/api/request-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Quote request error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product && !isSubmitted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {isSubmitted ? (
                            <div className="p-12 text-center flex flex-col items-center gap-6">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Solicitud Enviada</h2>
                                <p className="text-slate-500 font-medium">
                                    Hemos recibido tu interés en <strong>{product?.name}</strong>. Un asesor técnico se contactará contigo a la brevedad.
                                </p>
                                <button onClick={onClose} className="mt-4 px-8 py-3 bg-[#367C2B] text-white font-bold rounded-xl uppercase tracking-widest text-xs">Cerrar</button>
                            </div>
                        ) : (
                            <>
                                <div className="bg-[#367C2B] p-8 text-white relative">
                                    <button 
                                        onClick={onClose}
                                        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Solicitar Cotización Industrial</span>
                                    <h2 className="text-2xl font-black uppercase tracking-tight mt-2">{product?.name}</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre</label>
                                            <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" placeholder="Juan Pérez" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Empresa</label>
                                            <input required name="company" type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" placeholder="Forestal S.A." />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Corporativo</label>
                                        <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700" placeholder="juan@empresa.com" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mensaje / Requerimientos Específicos</label>
                                        <textarea name="message" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#367C2B] outline-none transition-all font-bold text-slate-700 min-h-[100px]" placeholder="Necesito cotización por 3 unidades con servicio de mantenimiento incluido..." />
                                    </div>

                                    <button disabled={isSubmitting} type="submit" className="w-full py-5 rounded-2xl bg-[#367C2B] text-white font-extrabold flex items-center justify-center gap-3 hover:bg-[#2d6624] transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Enviar Solicitud B2B
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
