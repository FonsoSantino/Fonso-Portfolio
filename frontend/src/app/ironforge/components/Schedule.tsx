"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schedule = [
    { time: '07:00', mon: 'Strength', tue: 'HIIT', wed: 'Cardio', thu: 'Strength', fri: 'HIIT', sat: 'Open' },
    { time: '09:00', mon: 'HIIT', tue: 'Boxing', wed: 'Strength', thu: 'HIIT', fri: 'Boxing', sat: 'Open' },
    { time: '13:00', mon: 'Strength', tue: 'HIIT', wed: 'Strength', thu: 'Cardio', fri: 'HIIT', sat: 'Open' },
    { time: '17:00', mon: 'Boxing', tue: 'Strength', wed: 'HIIT', thu: 'Boxing', fri: 'Strength', sat: 'Open' },
    { time: '19:00', mon: 'Strength', tue: 'HIIT', wed: 'Boxing', thu: 'Strength', fri: 'HIIT', sat: 'Open' },
];

export default function Schedule() {
    const [isBooking, setIsBooking] = React.useState(false);
    const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = React.useState(false);

    const handleBook = () => {
        setIsBooking(true);
        setTimeout(() => {
            setIsBooking(false);
            setIsConfirmed(true);
            setTimeout(() => setIsConfirmed(false), 3000);
        }, 1500);
    };

    return (
        <section className="py-32 bg-black relative" id="horarios">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-start gap-4 mb-20">
                    <span className="text-rose-600 font-bold uppercase tracking-[0.4em] text-xs">Horarios</span>
                    <h2 className="font-if-header text-5xl md:text-8xl italic leading-none tracking-tighter">
                        PLANIFICA <br />
                        <span className="text-white/20 italic if-outline-text">TU ASCENSO</span>
                    </h2>
                </div>

                <div className="overflow-x-auto border border-white/5 bg-white/[0.01]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 uppercase font-if-header italic text-lg tracking-widest text-left">
                                <th className="p-8 text-rose-600">HORA</th>
                                <th className="p-8">LUNES</th>
                                <th className="p-8">MARTES</th>
                                <th className="p-8">MIÉRCOLES</th>
                                <th className="p-8">JUEVES</th>
                                <th className="p-8">VIERNES</th>
                                <th className="p-8">SÁBADO</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-bold tracking-widest uppercase">
                            {schedule.map((row, i) => (
                                <tr key={i} className="border-b border-white/5 group hover:bg-rose-600/5 transition-colors">
                                    <td className="p-8 font-if-header text-2xl italic text-white/40 group-hover:text-rose-600 transition-colors">{row.time}</td>
                                    <td onClick={() => setSelectedSlot(`${row.time} - Lunes`)} className={`p-8 cursor-pointer transition-colors ${selectedSlot?.includes(row.time) ? 'bg-rose-600 text-white' : 'group-hover:text-white'}`}>{row.mon}</td>
                                    <td onClick={() => setSelectedSlot(`${row.time} - Martes`)} className={`p-8 cursor-pointer transition-colors text-rose-600/40 ${selectedSlot?.includes(row.time) ? 'bg-rose-600 text-white' : 'group-hover:text-rose-600'}`}>{row.tue}</td>
                                    <td onClick={() => setSelectedSlot(`${row.time} - Miércoles`)} className={`p-8 cursor-pointer transition-colors ${selectedSlot?.includes(row.time) ? 'bg-rose-600 text-white' : 'group-hover:text-white'}`}>{row.wed}</td>
                                    <td onClick={() => setSelectedSlot(`${row.time} - Jueves`)} className={`p-8 cursor-pointer transition-colors text-rose-600/40 ${selectedSlot?.includes(row.time) ? 'bg-rose-600 text-white' : 'group-hover:text-rose-600'}`}>{row.thu}</td>
                                    <td onClick={() => setSelectedSlot(`${row.time} - Viernes`)} className={`p-8 cursor-pointer transition-colors ${selectedSlot?.includes(row.time) ? 'bg-rose-600 text-white' : 'group-hover:text-white'}`}>{row.fri}</td>
                                    <td className="p-8 text-white/20 group-hover:text-white/40">{row.sat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/20 max-w-sm">
                        * Los horarios de las clases están sujetos a cambios. Se requiere reserva previa para todas las sesiones. 
                        {selectedSlot && <span className="block text-rose-600 mt-2">Seleccionado: {selectedSlot}</span>}
                    </p>
                    <button 
                        disabled={!selectedSlot || isBooking}
                        onClick={handleBook}
                        className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest italic hover:bg-rose-600 hover:text-white transition-all skew-x-[-12deg] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="block skew-x-[12deg]">{isBooking ? 'Reservando...' : 'Reservar esta sesión'}</span>
                    </button>
                </div>

                <AnimatePresence>
                    {isConfirmed && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed bottom-10 right-10 z-[100] bg-rose-600 text-white p-8 rounded-2xl shadow-2xl flex flex-col gap-2 border-2 border-white/20"
                        >
                            <h4 className="font-if-header text-2xl italic">¡Sesión Reservada!</h4>
                            <p className="text-[10px] uppercase font-bold tracking-widest">Te hemos enviado un correo con los detalles.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
