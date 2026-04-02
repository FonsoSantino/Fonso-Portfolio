"use client"

import { motion } from "framer-motion"
import { 
    LayoutDashboard, 
    Box, 
    BarChart3, 
    Settings, 
    Bell, 
    Search, 
    User,
    ChevronRight,
    Menu,
    X,
    ExternalLink
} from "lucide-react"
import { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface UnifiedDashboardProps {
    title: string;
    subtitle: string;
    icon: ReactNode;
    children: ReactNode;
    stats?: { label: string; value: string; trend?: string }[];
    sidebarItems?: { label: string; icon: ReactNode; active?: boolean }[];
}

export const UnifiedDashboard = ({ 
    title, 
    subtitle, 
    icon, 
    children, 
    stats,
    sidebarItems = []
}: UnifiedDashboardProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const defaultItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
        { label: "Assets", icon: <Box size={20} /> },
        { label: "Reports", icon: <BarChart3 size={20} /> },
        { label: "Settings", icon: <Settings size={20} /> },
    ]

    const items = sidebarItems.length > 0 ? sidebarItems : defaultItems

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20">
            {/* Sidebar Desktop */}
            <motion.aside 
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-muted/30 backdrop-blur-xl border-r border-border transition-transform lg:relative lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center gap-4 mb-12 px-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/20">
                            {icon}
                        </div>
                        <div>
                            <h1 className="font-black italic uppercase tracking-tighter text-xl leading-none">{title}</h1>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">{subtitle}</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {items.map((item, i) => (
                            <button
                                key={i}
                                className={cn(
                                    "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                                    item.active 
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/10 font-bold" 
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className={cn(
                                    "transition-transform group-hover:scale-110",
                                    item.active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                                )}>
                                    {item.icon}
                                </span>
                                <span className={cn("text-sm transition-colors", item.active ? "opacity-100" : "opacity-70 group-hover:opacity-100")}>
                                    {item.label}
                                </span>
                                {item.active && <ChevronRight size={16} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-border/50">
                        <Link href="/" className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all group">
                            <X size={20} className="group-hover:rotate-90 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Exit Interface</span>
                        </Link>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-background/50 dark:bg-[#050505] overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 h-20 bg-background/80 backdrop-blur-md border-b border-border/50 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-xl bg-muted">
                            <Menu size={20} />
                        </button>
                    </div>

                    <div className="hidden md:flex items-center flex-1 max-w-md bg-muted px-4 py-2.5 rounded-2xl border border-border/50 group focus-within:border-primary/50 transition-all">
                        <Search size={18} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search records, assets..." 
                            className="bg-transparent border-none outline-none text-sm px-4 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-12 h-12 rounded-2xl bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                        </button>
                        <div className="h-10 w-[1px] bg-border/50" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black italic">
                                JD
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-black italic uppercase tracking-tighter leading-none">Test User</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard View */}
                <div className="p-8 space-y-8">
                    {/* Hero Stats */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-[2.5rem] bg-muted/30 border border-border/50 shadow-2xl shadow-black/5"
                                >
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic mb-2">{stat.label}</p>
                                    <div className="flex items-baseline gap-3">
                                        <h3 className="text-4xl font-black italic tracking-tighter text-foreground">{stat.value}</h3>
                                        {stat.trend && (
                                            <span className="text-xs font-black text-emerald-500 italic uppercase">
                                                {stat.trend}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="min-h-[60vh]">
                        {children}
                    </div>
                </div>

                {/* Footer / Meta */}
                <footer className="mt-auto p-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                                {icon}
                            </div>
                            <span className="text-sm font-black italic uppercase tracking-tighter text-foreground">{title}</span>
                        </div>
                        <p className="text-xs font-medium">Enterprise Management Solution v2.4.0</p>
                    </div>
                    <div className="flex gap-12 font-black italic uppercase tracking-widest text-[10px]">
                        <Link href="/" className="hover:text-primary transition-colors">Documentation</Link>
                        <Link href="/" className="hover:text-primary transition-colors">System Status</Link>
                        <Link href="/" className="hover:text-primary transition-colors">Support</Link>
                    </div>
                </footer>
            </main>
        </div>
    )
}
