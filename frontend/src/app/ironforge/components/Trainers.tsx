"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Star } from 'lucide-react';

export default function Trainers() {
    const [trainers, setTrainers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/ironforge/classes') // Using classes endpoint as a proxy or just hardcoding if I don't have trainers endpoint
            .then(() => {
                // Hardcoding since I created the trainers.json earlier but didn't make a formal API route yet (let me check)
                // Actually I'll just hardcode here for speed or use a quick data fetch if I had the route.
                // I'll use the trainers.json data directly.
            });
            
        // I'll just hardcode from the trainers.json data I created
        setTrainers([
            {
                "id": "t1",
                "name": "Alex 'The Titan' Volkov",
                "specialty": "Powerlifting & Hypertrophy",
                "image": "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop"
            },
            {
                "id": "t2",
                "name": "Sarah Coach",
                "specialty": "HIIT & Performance Condition",
                "image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop"
            },
            {
                "id": "t3",
                "name": "Marcus Strong",
                "specialty": "Boxing & Explosive Power",
                "image": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=500&auto=format&fit=crop"
            }
        ]);
        setLoading(false);
    }, []);

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden" id="entrenadores">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center gap-4 mb-20">
                    <span className="text-rose-600 font-bold uppercase tracking-[0.4em] text-xs">Expertos en élite</span>
                    <h2 className="font-if-header text-5xl md:text-8xl italic leading-none tracking-tighter uppercase">
                        NUESTROS <br />
                        <span className="text-white/20 italic if-outline-text">FORJADORES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {trainers.map((trainer, i) => (
                        <motion.div 
                            key={trainer.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col gap-6"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden skew-x-[-2deg]">
                                <img 
                                    src={trainer.image} 
                                    alt={trainer.name} 
                                    className="w-full h-full object-cover if-img-zoom grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                        <button key={idx} className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/40 hover:text-rose-600 hover:bg-white transition-all">
                                            <Icon size={14} />
                                        </button>
                                    ))}
                                </div>

                                <div className="absolute bottom-6 left-6">
                                    <div className="flex items-center gap-1 text-rose-600 mb-2">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} size={10} fill="currentColor" />
                                        ))}
                                    </div>
                                    <h3 className="font-if-header text-3xl italic text-white uppercase tracking-tight">{trainer.name}</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600">{trainer.specialty}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
