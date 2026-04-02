"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Cpu, ShoppingCart, Sparkles, Brain, Car, Plus, Info, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { SafeImage as Image } from "@/components/SafeImage"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

export const ProjectCard = ({ 
    project, 
    index, 
    onPreview,
    onOpenDemo 
}: { 
    project: any, 
    index: number, 
    onPreview: () => void,
    onOpenDemo: () => void
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [imgError, setImgError] = useState(false)
    const { t } = useLanguage()

    const IconComponent = (project.id === 'forest' || project.id === 'soluciones-forestales') ? Leaf :
        project.id === 'gym' ? Cpu :
        project.id === 'supermarket' ? ShoppingCart :
        project.id === 'clothing' ? Sparkles :
        project.id === 'cars' ? Car : Brain

    // Resolve translated description or fall back to project default
    const description: string = t(`projects.items.${project.id}.description`) !== `projects.items.${project.id}.description`
        ? t(`projects.items.${project.id}.description`)
        : project.description;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            <Card 
                className={cn(
                    "overflow-hidden border-none bg-zinc-50 dark:bg-[#111] transition-all duration-700",
                    "rounded-[2.5rem] md:rounded-[4rem] flex flex-col h-auto min-h-[500px] md:min-h-[700px] md:h-[850px] relative",
                    "shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] md:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)]",
                    "dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] md:dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]"
                )}
            >
                {/* Visual Header / Hero Area */}
                <div className="relative h-[250px] md:h-[450px] overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        {!imgError ? (
                            <Image
                                src={project.image_url || "/projects/placeholder.png"}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-110"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800" />
                        )}
                        {/* Immersive Gradients */}
                        <div 
                            className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-700" 
                            style={{ background: `linear-gradient(to bottom, transparent, ${project.themeColor})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/20 to-transparent dark:from-[#111] dark:via-[#111]/40 dark:to-transparent z-10" />
                    </div>

                    {/* App Floating Icon & Meta */}
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20 flex items-end gap-4 md:gap-6">
                        <motion.div 
                            animate={isHovered ? { y: -5, rotate: 5, scale: 1.05 } : { y: 0, rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-16 h-16 md:w-32 md:h-32 rounded-2xl md:rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center p-4 md:p-8 border border-black/5 dark:border-white/10"
                        >
                            <IconComponent className="w-full h-full" style={{ color: project.themeColor }} />
                        </motion.div>
                        <div className="flex-1 space-y-1 md:space-y-2 mb-1 md:mb-2 text-left">
                             <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.themeColor }} />
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] italic" style={{ color: project.themeColor }}>
                                    {t('projects.product_live')}
                                </span>
                            </motion.div>
                            <h3 className="text-2xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-foreground dark:text-white drop-shadow-sm">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Quick Action Overlay */}
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 flex gap-3">
                        <Button
                            onClick={onPreview}
                            className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group/btn"
                        >
                            <Info className="w-4 h-4 md:w-6 md:h-6 group-hover/btn:rotate-12 transition-transform" />
                        </Button>
                    </div>
                </div>

                <CardContent className="px-6 md:px-10 py-6 md:py-8 flex-1 flex flex-col gap-6 md:gap-8 text-left">
                    {/* App Specs Grid */}
                    <div className="grid grid-cols-3 gap-4 md:gap-6">
                        {Object.entries(project.metrics || {}).map(([key, value]: [string, any], i) => (
                            <div key={key} className="space-y-1">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground dark:text-white/20 leading-none">{key}</p>
                                <p className="text-lg md:text-2xl font-black italic tracking-tighter text-foreground dark:text-white">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="h-px w-full bg-black/5 dark:bg-white/5" />

                    {/* Features & Narrative */}
                    <div className="space-y-4 md:space-y-6">
                        <p className="text-lg md:text-2xl font-light italic text-muted-foreground dark:text-white/50 leading-tight">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.features?.map((f: string) => (
                                <span key={f} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 bg-black/[0.03] dark:bg-white/[0.03] rounded-lg md:rounded-xl text-muted-foreground dark:text-white/40 border border-transparent hover:border-primary/20 transition-colors">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-auto flex items-center justify-between gap-4">
                        <div className="flex -space-x-2 md:-space-x-3 overflow-hidden">
                            {project.tech?.map((tech: string, i: number) => (
                                <div 
                                    key={tech}
                                    title={tech}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-zinc-800 border-2 border-zinc-50 dark:border-[#111] flex items-center justify-center shadow-lg transition-transform hover:z-10 hover:scale-110 cursor-help"
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                >
                                    <Code2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            {project.tags.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="text-[8px] md:text-[10px] font-black italic uppercase tracking-widest text-[#888]">{tag}</span>
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="px-6 md:px-10 pb-8 md:pb-12 pt-0">
                    <Button
                        onClick={onOpenDemo}
                        className="w-full h-16 md:h-24 rounded-2xl md:rounded-[2rem] font-black uppercase italic tracking-[0.3em] md:tracking-[0.6em] shadow-2xl transition-all duration-500 hover:-translate-y-2 group/btn relative overflow-hidden"
                        style={{ backgroundColor: project.themeColor, color: '#000' }}
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center text-[10px] md:text-xs">
                            {t('projects.open_interface')}
                            <ExternalLink className="ml-3 md:ml-5 w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </span>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

const Code2 = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
    </svg>
)
