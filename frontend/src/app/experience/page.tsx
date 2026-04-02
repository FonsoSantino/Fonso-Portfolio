"use client"

import { useQuery } from "@tanstack/react-query"
import { experienceService } from "@/services/experience"
import { motion } from "framer-motion"
import { Briefcase, Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function ExperiencePage() {
    const { t, language } = useLanguage();
    const { data: apiExperiences, isLoading } = useQuery({
        queryKey: ['experiences'],
        queryFn: () => experienceService.getAll(),
    })

    const milestoneKeys = ['age14', 'security', 'software', 'professional', 'specialization'];

    return (
        <main className="min-h-screen bg-background text-foreground pb-24 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 py-24 md:py-32 relative z-10 mx-auto">
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary border border-primary/20 backdrop-blur-xl"
                    >
                        <Briefcase className="w-4 h-4" />
                        <span className="uppercase tracking-widest italic">{t('experience.badge')}</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none py-4 text-center">
                        {t('experience.title')} <br />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">{t('experience.accent')}</span>.
                    </h1>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-light italic leading-relaxed">
                        {t('experience.subtitle')}
                    </p>
                </div>

                {/* Timeline — Responsive Fix */}
                <div className="max-w-4xl mx-auto">
                    {/* The line runs alongside the cards at all zoom levels */}
                    <div className="relative">
                        {/* Vertical line — uses padding trick so it always spans the full content height */}
                        <div
                            aria-hidden
                            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                            style={{ transform: 'translateX(-50%)' }}
                        />

                        <div className="flex flex-col gap-16">
                            {milestoneKeys.map((key, index) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                                        index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Center dot — always visible, never depends on fixed height */}
                                    <div
                                        className="hidden md:flex absolute left-1/2 top-8 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 shrink-0"
                                        style={{ transform: 'translate(-50%, 0)' }}
                                    />

                                    {/* Mobile: left-column line + dot */}
                                    <div className="md:hidden flex items-start gap-4 w-full">
                                        <div className="flex flex-col items-center shrink-0 pt-1">
                                            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                            {index < milestoneKeys.length - 1 && (
                                                <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                                            )}
                                        </div>

                                        {/* Card */}
                                        <div className="flex-1 group p-6 rounded-3xl bg-card/40 backdrop-blur-3xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden shadow-xl">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Sparkles size={60} className="text-primary rotate-12" />
                                            </div>
                                            <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest italic mb-3">
                                                <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                                    {t(`experience.milestones.${key}.date`)} años
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-3 group-hover:text-primary transition-colors">
                                                {t(`experience.milestones.${key}.title`)}
                                            </h3>
                                            <p className="text-muted-foreground text-sm font-light italic leading-relaxed">
                                                {t(`experience.milestones.${key}.desc`)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop: half-width card + spacer */}
                                    <div className="hidden md:block w-full md:w-[calc(50%-2rem)]">
                                        <div className="group p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-3xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Sparkles size={80} className="text-primary rotate-12" />
                                            </div>
                                            <div className="flex items-center gap-3 text-primary text-xs font-black uppercase tracking-widest italic mb-4">
                                                <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                                    {t(`experience.milestones.${key}.date`)} años
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic mb-4 group-hover:text-primary transition-colors">
                                                {t(`experience.milestones.${key}.title`)}
                                            </h3>
                                            <p className="text-muted-foreground text-base font-light italic leading-relaxed">
                                                {t(`experience.milestones.${key}.desc`)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for opposite side on desktop */}
                                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Final Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-32 text-center"
                    >
                        <div className="inline-block relative">
                            <span className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter opacity-10">
                                {t('experience.quote')}
                            </span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xl md:text-2xl font-light italic text-foreground/60">
                                    {t('experience.quote')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
