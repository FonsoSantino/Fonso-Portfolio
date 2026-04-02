"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { Calendar, Briefcase, MapPin, Sparkles } from "lucide-react"

export const ExperienceSection = () => {
    const { t } = useLanguage();

    const milestoneKeys = ['age14', 'security', 'software', 'professional', 'specialization']

    return (
        <section id="experience" className="w-full py-16 md:py-32 px-4 bg-background relative z-20">
            <div className="container mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-foreground dark:text-white"
                    >
                        {t('experience.title_part1')} <span className="text-primary">{t('experience.title_part2')}</span>
                    </motion.h2>
                    <p className="text-muted-foreground dark:text-white/40 text-xl font-black uppercase tracking-[0.4em] italic">{t('experience.subtitle')}</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Road Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary to-primary/0 hidden md:block opacity-40" />

                    {milestoneKeys.map((key, i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-24 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Marker */}
                            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black border-4 border-primary shadow-[0_0_30px_rgba(168,85,247,0.5)] z-10 hidden md:block" />

                            <div className="w-full md:w-1/2">
                                <div className="group p-10 rounded-[4rem] bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-700 hover:-translate-y-4 relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Briefcase size={120} className="text-primary rotate-12" />
                                    </div>

                                    <div className="flex items-center gap-4 text-primary text-[10px] font-black uppercase tracking-[0.4em] italic mb-6">
                                        <Calendar size={14} />
                                        {t(`experience.milestones.${key}.date`)}
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4 group-hover:text-primary transition-colors text-foreground dark:text-white">
                                        {t(`experience.milestones.${key}.title`)}
                                    </h3>
                                    <p className="text-muted-foreground dark:text-white/40 text-sm font-light italic leading-relaxed uppercase tracking-wider">
                                        {t(`experience.milestones.${key}.desc`)}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
