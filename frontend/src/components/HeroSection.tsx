"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Brain, Code2, Rocket, MousePointer2, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export function HeroSection() {
    const { t } = useLanguage()
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const { scrollY } = useScroll()
    
    const yParallax = useTransform(scrollY, [0, 500], [0, 150])
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0])
    const scaleHero = useTransform(scrollY, [0, 300], [1, 0.9])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 100 
            } 
        }
    }

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Mobile Fallback */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent md:hidden" />
                
                <motion.div 
                    className="hidden md:block absolute inset-0 opacity-30 dark:opacity-20"
                    style={{
                        background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb), 0.15), transparent 80%)`
                    }}
                />
                <div 
                    className="hidden md:block absolute top-0 left-0 w-full h-full opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" 
                    style={{
                        backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />
                
                {/* Orbital Glows */}
                <motion.div 
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="hidden md:block absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div 
                    animate={{ 
                        rotate: -360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"
                />
            </div>

            <motion.div 
                style={{ y: yParallax, opacity: opacityHero, scale: scaleHero }}
                className="container relative z-10 px-6 mx-auto text-center"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Status Badge */}
                    <motion.div variants={itemVariants} className="inline-flex">
                        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary/20 bg-white/5 backdrop-blur-3xl shadow-2xl group cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] italic text-muted-foreground dark:text-white/60 group-hover:text-primary transition-colors">
                                {t('hero.status')}
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-[13rem] font-black tracking-tighter uppercase italic leading-[0.8] text-foreground dark:text-white"
                    >
                        {t('hero.title').split(' ').map((word: string, i: number) => (
                            <span key={i} className="block overflow-hidden pb-4">
                                <motion.span 
                                    className={`inline-block ${i === 1 ? 'text-gradient' : ''}`}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (i * 0.1) }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>

                    {/* Description & CTAs */}
                    <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                        <div className="flex flex-col items-center gap-6 md:gap-8">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="h-px w-8 md:w-12 bg-primary/30" />
                                <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-primary italic">
                                    {t('hero.subtitle')}
                                </span>
                                <div className="h-px w-8 md:w-12 bg-primary/30" />
                            </div>
                            
                            <p className="text-xl md:text-3xl font-light italic leading-tight text-muted-foreground dark:text-white/40 max-w-3xl px-4 md:px-0">
                                {t('hero.description')}
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-4 md:pt-8 px-4">
                            <Button
                                asChild
                                className="h-16 md:h-20 px-8 md:px-12 rounded-full bg-primary hover:bg-primary/90 text-white dark:text-black font-black uppercase italic tracking-[0.2em] md:tracking-[0.4em] shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-2 transition-all duration-500 w-full md:w-auto text-[10px] md:text-xs"
                            >
                                <a href="#projects" className="flex items-center">
                                    {t('hero.cta_projects')}
                                    <ArrowRight className="ml-3 md:ml-4 w-4 h-4 md:w-5 md:h-5" />
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="h-16 md:h-20 px-8 md:px-12 rounded-full bg-white/5 backdrop-blur-xl border-zinc-200 dark:border-white/10 hover:border-primary/50 text-foreground dark:text-white font-black uppercase italic tracking-[0.2em] md:tracking-[0.4em] hover:-translate-y-2 transition-all duration-500 w-full md:w-auto text-[10px] md:text-xs"
                            >
                                <Link href="/contact">
                                    {t('hero.cta_contact')}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>


            {/* Section Fade */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        </section>
    )
}
