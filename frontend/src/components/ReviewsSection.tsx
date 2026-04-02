"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Static gradients — defined here so Tailwind purge never drops them
// and so they render correctly in both light and dark modes.
const AVATAR_GRADIENTS = [
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',  // violet
    'linear-gradient(135deg, #f43f5e, #db2777)',  // rose
    'linear-gradient(135deg, #10b981, #0d9488)',  // emerald
    'linear-gradient(135deg, #f97316, #d97706)',  // orange
    'linear-gradient(135deg, #3b82f6, #4f46e5)',  // blue
    'linear-gradient(135deg, #06b6d4, #0284c7)',  // cyan
    'linear-gradient(135deg, #d946ef, #7c3aed)',  // fuchsia
    'linear-gradient(135deg, #84cc16, #16a34a)',  // lime
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => {
                const full = n <= Math.floor(rating);
                const half = !full && n <= rating + 0.5;
                return (
                    <div key={n} className="relative">
                        <Star
                            size={14}
                            className="text-primary/20"
                            fill="currentColor"
                        />
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: full ? '100%' : half ? '50%' : '0%' }}
                        >
                            <Star size={14} className="text-primary" fill="currentColor" />
                        </div>
                    </div>
                );
            })}
            <span className="ml-1.5 text-xs font-black text-primary">{rating}</span>
        </div>
    );
}

export function ReviewsSection() {
    const { t } = useLanguage();
    const reviews: any[] = t('reviews.items');

    return (
        <section id="reviews" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Heading */}
                <div className="flex flex-col items-center text-center gap-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-black text-primary border border-primary/20 uppercase tracking-widest"
                    >
                        <Star size={12} fill="currentColor" />
                        {t('reviews.badge')}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-foreground"
                    >
                        {t('reviews.title_start')}{' '}
                        <span className="text-primary drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            {t('reviews.title_highlight')}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-xl text-muted-foreground font-light italic text-lg"
                    >
                        {t('reviews.subtitle')}
                    </motion.p>
                </div>

                {/* Review Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.isArray(reviews) && reviews.map((review: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative flex flex-col gap-5 p-6 rounded-3xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-default"
                        >
                            {/* Top: Avatar + info */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg"
                                    style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                                >
                                    {review.initials}
                                </div>
                                <div>
                                    <p className="font-black text-sm text-foreground leading-tight">{review.name}</p>
                                    <p className="text-xs text-muted-foreground font-medium italic">{review.role}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <StarRating rating={review.stars} />

                            {/* Review text */}
                            <p className="text-sm text-muted-foreground leading-relaxed font-light italic flex-1">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 flex flex-wrap justify-center gap-12 text-center"
                >
                    {[
                        { value: '5.0', labelKey: 'reviews.stat_rating' },
                        { value: '100%', labelKey: 'reviews.stat_clients' },
                        { value: '15+', labelKey: 'reviews.stat_projects' },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <span className="text-4xl font-black text-primary italic tracking-tighter">{stat.value}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t(stat.labelKey)}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
