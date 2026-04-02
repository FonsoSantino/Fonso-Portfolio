"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { ServicesSection } from "@/components/ServicesSection"
import { TechStack } from "@/components/TechStack"
import { ReviewsSection } from "@/components/ReviewsSection"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Main Content Sections */}
            <div className="relative z-10 flex flex-col gap-0">
                <HeroSection />

                <div className="container mx-auto px-4 space-y-32 md:space-y-64 pb-32">
                    <AboutSection />
                    <ServicesSection />
                </div>

                <TechStack />

                <ReviewsSection />
            </div>

            {/* Global Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-full h-[100vh] bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-primary/5 to-transparent" />
            </div>
        </main>
    )
}
