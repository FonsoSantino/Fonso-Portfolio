"use client"

import { motion } from "framer-motion"
import { Code2, Globe, Rocket, Sparkles, Smartphone, Zap } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import Image from "next/image"

export const AboutSection = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: Rocket,
            title: t('about.feature1_title'),
            desc: t('about.feature1_desc')
        },
        {
            icon: Globe,
            title: t('about.feature2_title'),
            desc: t('about.feature2_desc')
        },
        {
            icon: Smartphone,
            title: t('about.feature3_title'),
            desc: t('about.feature3_desc')
        }
    ]

    return (
        <section className="relative z-10 w-full py-16 md:py-32 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic"
                            >
                                <Sparkles className="w-3 h-3" />
                                {t('about.badge')}
                            </motion.div>
                            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter italic leading-none text-foreground dark:text-white">
                                {t('about.title_start')} <span className="text-primary italic">{t('about.title_highlight')}</span> {t('about.title_end')}
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg font-light italic leading-relaxed max-w-xl">
                                {t('about.description')}
                            </p>
                        </div>

                        <div className="grid gap-4 md:gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-6 md:p-8 rounded-3xl md:rounded-[2rem] bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-700 hover:-translate-y-1 shadow-2xl"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                            <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-black transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-base md:text-lg font-black uppercase tracking-tighter italic text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">{feature.title}</h3>
                                            <p className="text-[10px] md:text-xs text-muted-foreground dark:text-white/40 font-light leading-relaxed italic uppercase tracking-[0.1em]">{feature.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative mt-12 md:mt-0"
                    >
                        <div className="relative aspect-[4/5]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-[2.5rem] md:rounded-[4.5rem] blur-3xl opacity-50" />
                            <div className="relative h-full w-full rounded-[2.5rem] md:rounded-[4.5rem] border border-black/10 dark:border-white/5 overflow-hidden bg-zinc-100 dark:bg-zinc-900 group shadow-2xl">
                                <Image
                                    src="/images/profile-photo.png"
                                    alt="Fonso Santino Profile"
                                    fill
                                    className="object-cover transition-transform duration-700 opacity-100"
                                />
                                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
                            </div>
                        </div>

                        {/* Floating Tech Badges */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:-top-10 md:-right-10 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/90 dark:bg-black/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-30 hidden sm:block group-hover:border-primary/30 dark:group-hover:border-primary/30 transition-colors"
                        >
                            <Zap className="w-8 h-8 md:w-12 md:h-12 text-primary mb-2 md:mb-4" />
                            <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.2em] italic text-foreground dark:text-white">{t('about.performance')}</p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-white/90 dark:bg-black/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-30 hidden sm:block group-hover:border-primary/30 dark:group-hover:border-primary/30 transition-colors"
                        >
                            <Code2 className="w-8 h-8 md:w-12 md:h-12 text-primary mb-2 md:mb-4" />
                            <p className="text-[8px] md:text-xs font-black uppercase tracking-[0.2em] italic text-foreground dark:text-white">{t('about.architecture')}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
