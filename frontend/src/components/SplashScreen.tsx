"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10)
        const finishTimeout = setTimeout(() => finishLoading(), 2500)
        return () => {
            clearTimeout(timeout)
            clearTimeout(finishTimeout)
        }
    }, [finishLoading])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
            <div className="relative">
                {/* Ambient Glow */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.5 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"
                />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center space-y-2 relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 0.5, letterSpacing: "1.2em" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-sm md:text-base font-light uppercase tracking-[1.2em] text-foreground mb-8"
                    >
                        Bienvenido a
                    </motion.div>

                    <motion.h1
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none"
                    >
                        FONSO <span className="text-primary italic">DEV</span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "80px", opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-12 mx-auto"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}
