"use client"

import { useLanguage } from "@/context/LanguageContext"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="relative flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden"
        >
            <motion.div
                animate={{ rotate: language === 'es' ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Globe className="w-4 h-4 text-primary group-hover:animate-pulse" />
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.span
                    key={language}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-widest min-w-[24px]"
                >
                    {language.toUpperCase()}
                </motion.span>
            </AnimatePresence>

            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
    )
}
