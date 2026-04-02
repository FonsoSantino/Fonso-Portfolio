"use client"

import { motion } from "framer-motion"
import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps {
    columns: { key: string; label: string }[];
    data: any[];
    onRowClick?: (row: any) => void;
}

export const DataTable = ({ columns, data, onRowClick }: DataTableProps) => {
    return (
        <div className="w-full overflow-x-auto rounded-[2rem] border border-border/50 bg-muted/20 backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border/50">
                        {columns.map((col) => (
                            <th key={col.key} className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <motion.tr
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onRowClick?.(row)}
                            className="group hover:bg-primary/[0.02] cursor-pointer transition-colors border-b border-border/20 last:border-none"
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-8 py-6">
                                    {col.key === "status" ? (
                                        <span className={cn(
                                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic",
                                            row[col.key] === "Active" || row[col.key] === "Healthy" || row[col.key] === "Completed"
                                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                : row[col.key] === "Pending" || row[col.key] === "Processing"
                                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                        )}>
                                            <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                            {row[col.key]}
                                        </span>
                                    ) : (
                                        <span className="text-sm font-bold italic tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                                            {row[col.key]}
                                        </span>
                                    )}
                                </td>
                            ))}
                            <td className="px-8 py-6 text-right">
                                <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                                    <MoreHorizontal size={18} />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
