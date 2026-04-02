"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Programas', id: 'programas' },
    { label: 'Membresías', id: 'membresias' },
    { label: 'Horarios', id: 'horarios' },
    { label: 'Entrenadores', id: 'entrenadores' },
];

function LoginModal({ onClose }: { onClose: () => void }) {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(onClose, 1500);
        }, 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-md p-10 relative"
            >
                <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                </button>

                {success ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center">
                            <Dumbbell size={28} />
                        </div>
                        <h3 className="font-if-header text-3xl italic text-white">¡Bienvenido!</h3>
                        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Acceso concedido</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-9 h-9 bg-rose-600 flex items-center justify-center">
                                <Dumbbell size={18} />
                            </div>
                            <span className="font-if-header text-2xl italic tracking-tighter">
                                IRON<span className="text-rose-600">FORGE</span>
                            </span>
                        </div>

                        <h2 className="font-if-header text-4xl italic uppercase tracking-tighter mb-2">Accede</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-8">
                            Ingresa a tu cuenta de entrenamiento
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-rose-600 outline-none text-sm font-bold tracking-wide transition-colors"
                                />
                            </div>

                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-rose-600 outline-none text-sm font-bold tracking-wide transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(v => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                                >
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-rose-600 text-white font-black uppercase tracking-[0.2em] italic hover:bg-rose-700 transition-colors skew-x-[-5deg] disabled:opacity-60 mt-2"
                            >
                                <span className="block skew-x-[5deg]">
                                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                                </span>
                            </button>

                            <p className="text-center text-white/30 text-xs font-bold uppercase tracking-widest">
                                ¿Sin cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('membresias')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-rose-600 hover:text-rose-400 transition-colors"
                                >
                                    Únete ahora
                                </button>
                            </p>
                        </form>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-rose-600/20' : 'bg-transparent py-8'
                }`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-rose-600 rounded-sm flex items-center justify-center text-white skew-x-[-10deg] group-hover:skew-x-0 transition-transform">
                            <Dumbbell size={24} className="skew-x-[10deg] group-hover:skew-x-0 transition-transform" />
                        </div>
                        <span className="font-if-header text-2xl tracking-tighter italic">
                            IRON<span className="text-rose-600">FORGE</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="text-white/60 hover:text-rose-600 transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full" />
                            </button>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="hidden sm:block px-6 py-2 border border-white/20 hover:border-rose-600 text-xs font-bold uppercase tracking-widest transition-all text-white"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => scrollTo('membresias')}
                            className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest skew-x-[-10deg] transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="block skew-x-[10deg]">Únete ahora</span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-white"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            className="fixed inset-0 top-[72px] bg-black z-40 lg:hidden p-8 flex flex-col gap-8"
                        >
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className="text-4xl font-if-header italic hover:text-rose-600 transition-colors text-left"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="mt-auto flex flex-col gap-4">
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                                    className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest italic"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => scrollTo('membresias')}
                                    className="w-full py-4 bg-rose-600 text-white font-bold uppercase tracking-widest italic"
                                >
                                    Únete ahora
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Login Modal */}
            <AnimatePresence>
                {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
