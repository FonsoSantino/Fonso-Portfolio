"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle"
import { SplashScreen } from '@/components/SplashScreen';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from "@/components/LanguageToggle"
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from "lucide-react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const isHome = pathname === '/';
    const isDemo = pathname.startsWith('/demos') || pathname.startsWith('/soluciones-forestales') || pathname.startsWith('/supermarket') || pathname.startsWith('/luxora') || pathname.startsWith('/ironforge') || pathname.startsWith('/crm');
    const [isLoading, setIsLoading] = useState(isHome);

    if (isDemo) {
        return <main className="flex-1 overflow-x-hidden">{children}</main>;
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && isHome && <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />}
            </AnimatePresence>
            <div className={cn(
                "relative flex min-h-screen flex-col transition-opacity duration-1000",
                "opacity-100"
            )}>
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container px-4 flex h-16 items-center justify-between mx-auto">
                        <div className="flex items-center">
                            <Link href="/" className="mr-4 md:mr-8 flex items-center space-x-2 group shrink-0">
                                <span className="font-black text-2xl tracking-tighter uppercase italic text-gradient group-hover:scale-105 transition-transform duration-300">
                                    Fonso <span className="text-foreground">Dev</span>
                                </span>
                            </Link>
                            <nav className="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-[0.2em] italic">
                                <Link href="/" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">{t('nav.home')}</Link>
                                <Link href="/projects" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">{t('nav.projects')}</Link>
                                <Link href="/experience" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">{t('nav.experience')}</Link>
                                <Link href="/contact" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">{t('nav.contact')}</Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                <main className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                <footer className="border-t py-14 bg-muted/30 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
                    <div className="container px-4 mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                            <Link href="/" className="group">
                                <span className="font-black text-3xl tracking-tighter uppercase italic text-gradient group-hover:scale-105 transition-transform duration-300">
                                    Fonso <span className="text-foreground">Dev</span>
                                </span>
                            </Link>

                            <div className="flex items-center gap-6">
                                {[
                                    { icon: <Github size={20} />, link: "https://github.com/fonsosantino", label: "GitHub" },
                                    { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/fonsosantino", label: "LinkedIn" },
                                    { icon: <Instagram size={20} />, link: "https://instagram.com/fonsosantino", label: "Instagram" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all hover:-translate-y-1 shadow-sm"
                                        title={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-border/50 w-full mb-8" />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest italic">
                                © {new Date().getFullYear()} Fonso Dev • Construyendo el futuro digital
                            </p>
                            <p className="text-[10px] text-muted-foreground/50 font-medium uppercase tracking-[0.2em] italic">
                                Developed with Passion by Santino Fonso
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
