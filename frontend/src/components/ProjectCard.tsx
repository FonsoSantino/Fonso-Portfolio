"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface Project {
    id: string
    title: string
    description?: string
    link?: string
    tags: string[]
    priority: number
    metadata_json?: any
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
        >
            <Card className="h-full flex flex-col overflow-hidden border-primary/10 bg-card/50 backdrop-blur-md hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <CardHeader className="p-0 overflow-hidden">
                    <div className="aspect-video w-full bg-muted relative group-hover:scale-105 transition-transform duration-500">
                        {/* Gradient Overlay for aesthetic depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />

                        {/* Priority Badge */}
                        {project.priority > 0 && (
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md">
                                    Destacado
                                </Badge>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-6 space-y-4">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[10px] font-medium tracking-wider uppercase opacity-70">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                    <div className="flex gap-4">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                        {project.metadata_json?.github && (
                            <a
                                href={project.metadata_json.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github size={18} />
                            </a>
                        )}
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-semibold text-primary/80 hover:text-primary transition-colors"
                    >
                        Ver Detalles →
                    </motion.button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
