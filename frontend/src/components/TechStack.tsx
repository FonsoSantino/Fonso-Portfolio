"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"

interface TechItem {
    name: string
    logo: string
    color?: string
}

const technologies: TechItem[] = [
    { 
        name: "Next.js", 
        logo: "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg"
    },
    { 
        name: "NestJS", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-original.svg" 
    },
    { 
        name: "Node.js", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" 
    },
    { 
        name: "React", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
    },
    { 
        name: "Tailwind CSS", 
        logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" 
    },
    { 
        name: "MongoDB", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" 
    },
    { 
        name: "MySQL", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" 
    },
    { 
        name: "JavaScript", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
    },
    { 
        name: "HTML5", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" 
    },
    { 
        name: "Git", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" 
    },
    { 
        name: "Python", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" 
    },
    { 
        name: "Java", 
        logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" 
    },
]

export const TechStack = () => {
    const { t } = useLanguage()

    return (
        <section id="tech-stack" className="scroll-mt-32 w-full py-24 px-4 bg-background relative z-20 text-foreground">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="flex flex-col mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic mb-6 w-fit"
                    >
                        {t('tech_stack.badge')}
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter text-foreground dark:text-white leading-none mb-8">
                        {t('tech_stack.title')}
                    </h2>

                    <p className="max-w-2xl text-muted-foreground text-lg md:text-xl font-light italic leading-relaxed border-l-2 border-primary/20 pl-6">
                        {t('tech_stack.description').split(' ').map((word: string, i: number) => {
                            const lower = word.toLowerCase().replace(/[.,]/g, '')
                            if (lower === 'technologies' || lower === 'tecnologías') {
                                return <span key={i} className="text-yellow-400 dark:text-yellow-400/80">{word} </span>
                            }
                            // Check for "cutting-edge solutions" or "soluciones de vanguardia"
                            // Note: This split logic is simple, for exact multi-word matching we'd need more logic
                            // But for this request, individual word highlights or specific phrase logic is better
                            if (lower === 'cutting-edge' || lower === 'solutions' || lower === 'vanguardia' || lower === 'soluciones') {
                                return <span key={i} className="text-cyan-400 dark:text-cyan-400/80">{word} </span>
                            }
                            return <span key={i}>{word} </span>
                        })}
                    </p>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative"
                        >
                            {/* Card Body */}
                            <div className="relative flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-muted/50 dark:bg-white/[0.02] border border-border transition-all duration-500 overflow-hidden h-full aspect-square">
                                
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.6rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
                                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                        <img 
                                            src={tech.logo} 
                                            alt={tech.name}
                                            className="w-full h-full object-contain transition-all duration-700"
                                            loading="lazy"
                                        />
                                    </div>
                                    
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors duration-300 italic text-center">
                                        {tech.name}
                                    </span>
                                </div>
                                
                                {/* 3D-like Shine */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Tooltip (CSS only for speed/simplicity, using peers or absolute positioning) */}
                            {/* Actually, the request mentions tooltip on hover. Let's add a simple one or just rely on the label. */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
