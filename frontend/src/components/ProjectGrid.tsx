"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ProjectCard } from "./ProjectCard"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { 
    Search, Sparkles, Filter, X, Terminal, 
    FileText, RefreshCw, AlertCircle, CheckCircle2 
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"
import { SafeImage as Image } from "@/components/SafeImage"
import { ProjectLoadingScreen } from "./ProjectLoadingScreen"

import { FEATURED_PROJECTS } from "@/data/projects"

export function ProjectGrid() {
    const { t } = useLanguage();
    const router = useRouter()
    const [selectedProject, setSelectedProject] = useState<any | null>(null)
    const [activeFilter, setActiveFilter] = useState("ALL")
    const [search, setSearch] = useState("")
    const [notification, setNotification] = useState<{ msg: string, type: 'success' | 'error' } | null>(null)


    // Body Scroll Lock
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedProject])

    const notify = (msg: string, type: 'success' | 'error') => {
        setNotification({ msg, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const categories = ["ALL", "RETAIL", "INDUSTRIAL", "BUSINESS", "SOFTWARE"]

    const filteredProjects = FEATURED_PROJECTS.filter(p => {
        const matchesCategory = activeFilter === "ALL" || p.category.toUpperCase() === activeFilter
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    }

    return (
        <section className="space-y-32">
            <AnimatePresence mode="popLayout">
                {filteredProjects.length > 0 ? (
                    <motion.div
                        key="grid"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-24"
                    >
                         {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onPreview={() => setSelectedProject(project)}
                                onOpenDemo={() => {
                                    if (project.demo_url) {
                                        const win = window.open(project.demo_url, '_blank');
                                        if (win) win.focus();
                                    } else {
                                        notify(t('projects.modal_restricted'), 'error');
                                    }
                                }}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="no-data"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-60 bg-black/[0.02] dark:bg-white/[0.02] rounded-[5rem] border border-dashed border-border flex flex-col items-center justify-center gap-10"
                    >
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                            <Search className="text-primary w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-5xl font-black uppercase italic tracking-tighter">{t('projects.no_results_title')}</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto italic">{t('projects.no_results_desc')}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        className={cn(
                            "fixed bottom-12 left-1/2 -translate-x-1/2 z-[70] px-8 py-4 rounded-2xl flex items-center gap-4 border shadow-2xl backdrop-blur-2xl bg-zinc-950/50",
                            notification.type === 'success' ? "border-primary/20 text-primary" : "border-red-500/20 text-red-400"
                        )}
                    >
                        {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        <span className="text-xs font-black uppercase italic tracking-widest">{notification.msg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-24">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-2xl"
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40 }}
                            className="relative w-full max-w-6xl h-full max-h-[85vh] bg-zinc-900 rounded-[4rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        >
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 z-30 w-12 h-12 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center"
                            >
                                <X size={20} />
                            </button>

                            {/* Left: Visual */}
                            <div className="md:w-1/2 relative bg-black">
                                <Image 
                                    src={selectedProject.image_url}
                                    alt=""
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent z-10" />
                                <div className="absolute bottom-12 left-12 z-20 space-y-4">
                                    <div className="flex gap-2">
                                        {selectedProject.tags.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-white/60">{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="text-7xl font-black uppercase italic tracking-tighter text-white leading-none">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Right: Data */}
                            <div className="flex-1 p-12 overflow-y-auto space-y-12">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
                                        {t('projects.modal_description_label')}
                                    </label>
                                    <p className="text-2xl font-light italic text-white/60 leading-relaxed border-l-2 border-primary/30 pl-8">
                                        {t(`projects.items.${selectedProject.id}.description`) !== `projects.items.${selectedProject.id}.description`
                                            ? t(`projects.items.${selectedProject.id}.description`)
                                            : selectedProject.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-3 text-white/40">
                                            <Terminal size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{t('projects.modal_logs_label')}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {selectedProject.logs?.map((l: string, i: number) => (
                                                <div key={i} className="text-[11px] font-mono text-white/20 italic line-clamp-1 flex items-center gap-3">
                                                    <span className="w-1 h-3 bg-white/10 rounded-full" />
                                                    {l}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-3 text-white/40">
                                            <FileText size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{t('projects.modal_artifacts_label')}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {selectedProject.artifacts?.map((a: string, i: number) => (
                                                <div key={i} className="text-[11px] font-black uppercase tracking-tighter text-primary/60 hover:text-primary cursor-pointer flex items-center gap-3">
                                                    <RefreshCw size={10} className="animate-spin" />
                                                    {a}.pdf
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Button
                                        onClick={() => {
                                            if (selectedProject.demo_url) {
                                                const win = window.open(selectedProject.demo_url, '_blank');
                                                if (win) win.focus();
                                            } else {
                                                notify(t('projects.modal_restricted'), 'error')
                                            }
                                        }}
                                        className="w-full h-20 rounded-[2rem] bg-primary hover:bg-primary/80 text-white font-black uppercase italic tracking-[0.3em] text-xs shadow-2xl transition-all"
                                    >
                                        {t('projects.modal_open_btn')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    )
}
