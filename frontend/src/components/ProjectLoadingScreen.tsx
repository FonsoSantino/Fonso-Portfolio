"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectLoadingScreenProps {
    projectName: string
    onComplete: () => void
    accentColor?: string
}

const loadingLogs = [
    "Initializing system...",
    "Loading assets...",
    "Connecting modules...",
    "Rendering interface...",
    "Finalizing environment..."
]

export const ProjectLoadingScreen = ({ projectName, onComplete, accentColor = "rgb(var(--primary-rgb))" }: ProjectLoadingScreenProps) => {
    const [currentLog, setCurrentLog] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const logInterval = setInterval(() => {
            setCurrentLog(prev => (prev + 1) % loadingLogs.length)
        }, 500)

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100
                return prev + 1
            })
        }, 20)

        const timeout = setTimeout(() => {
            onComplete()
        }, 2500)

        return () => {
            clearInterval(logInterval)
            clearInterval(progressInterval)
            clearTimeout(timeout)
        }
    }, [onComplete])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Ambient Glow */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse" 
                style={{ backgroundColor: accentColor, opacity: 0.15 }}
            />

            <div className="relative z-10 flex flex-col items-center gap-12 text-center px-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                >
                    <span 
                        className="text-[10px] font-black uppercase tracking-[0.6em] italic block mb-4"
                        style={{ color: accentColor }}
                    >
                        System Interface
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                        {projectName}
                    </h2>
                </motion.div>

                {/* Progress Bar Container */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-64 md:w-96 h-1 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            className="h-full"
                            style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}` }}
                        />
                    </div>
                    <span className="text-[10px] font-black italic tracking-widest" style={{ color: accentColor, opacity: 0.6 }}>{progress}%</span>
                </div>

                {/* Loading Logs */}
                <div className="h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentLog}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest italic"
                        >
                            {loadingLogs[currentLog]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-white/10" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-white/10" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-white/10" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-white/10" />
        </motion.div>
    )
}
