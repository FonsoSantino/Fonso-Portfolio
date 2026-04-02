"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Monitor, ShoppingBag, Database, Palette, Server, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export const ServicesSection = () => {
    const { t } = useLanguage();
    const router = useRouter();

    const services = [
        {
            icon: Monitor,
            id: "web_apps"
        },
        {
            icon: ShoppingBag,
            id: "ecommerce"
        },
        {
            icon: Database,
            id: "business_software"
        },
        {
            icon: Palette,
            id: "ui_ux"
        },
        {
            icon: Server,
            id: "hosting"
        }
    ]

    return (
        <section id="services" className="scroll-mt-32 w-full py-16 md:py-32 px-4 bg-background relative z-20">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="flex flex-col mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic mb-6 w-fit"
                    >
                        {t('services.badge')}
                    </motion.div>
                    <h2 className="text-3xl md:text-8xl font-black italic uppercase tracking-tighter text-foreground dark:text-white leading-none">
                        {t('services.title').split(' ').map((word: string, i: number) => (
                            <span key={i} className={word.toLowerCase().includes('servicios') || word.toLowerCase().includes('services') ? "text-primary italic" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h2>
                    <p className="max-w-2xl text-muted-foreground text-base md:text-xl font-light italic leading-relaxed mt-6 md:mt-8 border-l-2 border-primary/20 pl-6">
                        {t('services.description')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative p-8 md:p-10 rounded-3xl md:rounded-[3.5rem] bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-700 hover:-translate-y-2 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative background icon */}
                            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                                <service.icon size={150} className="text-primary rotate-12" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-black transition-colors" />
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-foreground dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">
                                    {t(`services.items.${service.id}.title`)}
                                </h3>
                                
                                <p className="text-muted-foreground dark:text-white/40 text-xs md:text-sm font-light italic leading-relaxed mb-6 md:mb-8 flex-grow">
                                    {t(`services.items.${service.id}.desc`)}
                                </p>

                                <div className="space-y-4">
                                    <div className="h-px bg-border/50 w-full" />
                                    <div className="flex items-center justify-between">
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 italic max-w-[180px] md:max-w-[200px]">
                                            {t(`services.items.${service.id}.examples`)}
                                        </p>
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                                            <ArrowRight size={14} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Contact Teaser Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: services.length * 0.1, duration: 0.6 }}
                        className="group relative p-8 md:p-10 rounded-3xl md:rounded-[3.5rem] bg-primary text-black flex flex-col justify-center items-center text-center shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden min-h-[300px]"
                        onClick={() => router.push('/contact')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                            Ready to build?
                        </h3>
                        <p className="text-black/60 text-[10px] md:text-sm font-black uppercase tracking-widest italic mb-6 md:mb-8">
                            Let's discuss your next project
                        </p>
                        <div className="px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest italic text-[10px] md:text-xs flex items-center gap-3 hover:gap-5 transition-all">
                            GET STARTED <ArrowRight size={14} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
