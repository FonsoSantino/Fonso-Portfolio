'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Zap, Target, Shield } from 'lucide-react';

interface GymSubscriptionProps {
    isOpen: boolean;
    onClose: () => void;
    plan: any;
    onSuccess?: () => void;
}

export const GymSubscription = ({ isOpen, onClose, plan, onSuccess }: GymSubscriptionProps) => {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirm = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch('/api/subscribe-gym', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId: plan?.id, planName: plan?.name })
            });
            
            if (response.ok) {
                setStep(2);
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            console.error('Subscription error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen || !plan) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                className="bg-zinc-900 w-full max-w-lg rounded-sm overflow-hidden border-2 border-rose-600 shadow-[0_0_50px_rgba(225,29,72,0.3)] flex flex-col"
            >
                {/* Header */}
                <div className="bg-rose-600 p-6 flex justify-between items-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-if-header text-3xl italic text-white uppercase tracking-tighter">
                            {step === 1 ? 'Confirmar Plan' : '¡Bienvenido!'}
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">IronForge Membership</p>
                    </div>
                    <button onClick={onClose} className="relative z-10 p-2 hover:bg-black/10 rounded-full transition-colors text-white">
                        <X size={24} />
                    </button>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-10">
                        <Zap size={150} fill="white" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Plan Seleccionado</span>
                                    <div className="flex justify-between items-baseline border-b-2 border-white/5 pb-4">
                                        <h3 className="text-4xl font-if-header italic text-rose-600 uppercase tracking-tighter">{plan.name}</h3>
                                        <div className="text-right">
                                            <p className="text-3xl font-if-header italic text-white">${plan.price}</p>
                                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">/ mes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <Target className="text-rose-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-black uppercase tracking-widest">Pago Automático</p>
                                            <p className="text-white/40 text-[10px] leading-relaxed">Se te cobrará automáticamente cada mes. Cancela en cualquier momento sin penalizaciones.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                            <Shield className="text-rose-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-black uppercase tracking-widest">Acceso Inmediato</p>
                                            <p className="text-white/40 text-[10px] leading-relaxed">Al confirmar, recibirás tu código QR de acceso digital por correo electrónico de inmediato.</p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={isProcessing}
                                    onClick={handleConfirm}
                                    className="w-full py-6 bg-rose-600 text-white font-black uppercase tracking-[0.3em] italic skew-x-[-10deg] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-600/20 flex items-center justify-center gap-3"
                                >
                                    {isProcessing ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span className="skew-x-[10deg]">Activar Suscripción</span>
                                            <ArrowRight className="skew-x-[10deg]" size={20} />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6 space-y-8"
                            >
                                <div className="w-24 h-24 bg-rose-600/10 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                                    <CheckCircle size={56} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-if-header italic text-white uppercase tracking-tighter">
                                        ¡FORJA <span className="text-rose-600">INICIADA</span>!
                                    </h3>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">
                                        Tu suscripción al plan <b>{plan.name}</b> ha sido activada con éxito. Revisa tu correo para tu código de acceso.
                                    </p>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="w-full py-6 border-2 border-white/10 text-white font-black uppercase tracking-[0.3em] italic hover:bg-white/5 transition-all"
                                >
                                    Comenzar ahora
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Footer Style */}
                <div className="h-2 bg-rose-600 w-full" />
            </motion.div>
        </div>
    );
};
