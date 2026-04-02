"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame } from 'lucide-react';
import { GymSubscription } from './GymSubscription';

export default function Pricing() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

    useEffect(() => {
        fetch('/api/ironforge/plans')
            .then(res => res.json())
            .then(data => {
                setPlans(data);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden" id="membresias">
            <div className="container mx-auto px-6">
                {/* ... existing header ... */}
                <div className="flex flex-col items-center text-center gap-6 mb-24">
                    <span className="text-rose-600 font-bold uppercase tracking-[0.5em] text-xs">Membresías</span>
                    <h2 className="font-if-header text-5xl md:text-8xl italic tracking-tighter">
                        ELIGE TU <span className="text-white/20 if-outline-text">DESTINO</span>
                    </h2>
                    <p className="max-w-xl text-white/40 text-sm font-medium leading-relaxed tracking-widest uppercase mt-4">
                        Sin contratos ocultos. Solo resultados reales. <br />
                        Accede a la mejor comunidad fitness del país.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-[500px] bg-white/5 animate-pulse rounded-sm" />
                        ))
                    ) : (
                        plans.map((plan, i) => (
                            <motion.div 
                                key={plan.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative p-8 md:p-12 flex flex-col gap-10 group transition-all duration-500 hover:scale-105 active:scale-95 ${
                                    plan.highlight ? 'bg-rose-600 shadow-2xl shadow-rose-600/20 skew-x-[-5deg]' : 'bg-white/[0.03] border border-white/5 skew-x-[-2deg]'
                                }`}
                            >
                                <div className={`flex flex-col gap-2 ${plan.highlight ? 'skew-x-[5deg]' : 'skew-x-[2deg]'}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-if-header text-4xl italic tracking-tight">{plan.name}</h3>
                                        {plan.highlight && <Flame size={24} fill="white" />}
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-if-header italic">${plan.price}</span>
                                        <span className={`text-[10px] uppercase font-bold tracking-widest pb-1 ${plan.highlight ? 'text-white/80' : 'text-white/40'}`}>/ Mes</span>
                                    </div>
                                </div>

                                <ul className={`flex flex-col gap-6 flex-1 ${plan.highlight ? 'skew-x-[5deg]' : 'skew-x-[2deg]'}`}>
                                    {plan.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-4 text-xs font-bold uppercase tracking-widest">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className={plan.highlight ? 'text-white' : 'text-white/60'}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`w-full py-5 font-black uppercase tracking-[0.2em] italic transition-colors ${plan.highlight ? 'bg-white text-rose-600 hover:bg-black hover:text-white skew-x-[5deg]' : 'bg-rose-600 text-white hover:bg-rose-700 skew-x-[2deg]'}`}
                                >
                                    Seleccionar plan
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <GymSubscription 
                isOpen={!!selectedPlan}
                onClose={() => setSelectedPlan(null)}
                plan={selectedPlan}
            />
            
            {/* Background text decoration */}
            <div className="absolute left-0 bottom-0 translate-y-1/2 -rotate-12 hidden lg:block pointer-events-none">
                <span className="if-outline-text text-[12rem] font-if-header opacity-[0.03] italic tracking-tighter">
                    STRONGER EVERY DAY
                </span>
            </div>
        </section>
    );
}
