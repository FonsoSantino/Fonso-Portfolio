"use client"

import { ProjectGrid } from "@/components/ProjectGrid"
import { motion } from "framer-motion"
import { LayoutGrid } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function ProjectsPage() {
    const { t } = useLanguage();

    const titleRaw: string = t('projects.title');
    // Split on last word to color it — keep "." attached to highlight
    const parts = titleRaw.replace(/\.$/, '').split(' ');
    const lastWord = parts.pop() || '';
    const firstPart = parts.join(' ');

    return (
        <main className="min-h-screen bg-background text-foreground overflow-hidden pb-24">
            {/* Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 container px-4 md:px-6 py-12 md:py-24 mx-auto">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary border border-primary/20 backdrop-blur-xl overflow-visible pr-6"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        <span className="uppercase tracking-widest italic">{t('projects.badge')}</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase italic py-4 leading-tight overflow-visible pr-8">
                        {firstPart}{' '}
                        <span className="text-primary">{lastWord}</span>.
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-[850px] text-muted-foreground text-base md:text-xl font-light leading-relaxed italic pr-4"
                    >
                        {t('projects.subtitle')}
                    </motion.p>
                </div>

                <ProjectGrid />
            </div>
        </main>
    )
}
