"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, Linkedin, Instagram, Send, Sparkles, CheckCircle2, Loader2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/context/LanguageContext"

export const ContactSection = () => {
    const { t } = useLanguage();
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormState('success');
                setFormData({ nombre: '', email: '', mensaje: '' });
                setTimeout(() => setFormState('idle'), 5000);
            } else {
                setFormState('error');
            }
        } catch (error) {
            setFormState('error');
        }
    };

    return (
        <section id="contact" className="scroll-mt-32 w-full py-16 md:py-32 px-4 bg-background relative z-20 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary border border-primary/20 backdrop-blur-xl overflow-visible pr-8"
                    >
                        <Mail className="w-4 h-4" />
                        <span className="uppercase tracking-widest italic">{t('contact.badge')}</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic overflow-visible pr-8 leading-none">
                        {t('contact.title').split(' ').map((word: string, i: number) => (
                            <span key={i} className={word.toLowerCase().includes('proyecto') || word.toLowerCase().includes('project') ? "text-gradient" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-light italic pr-4">
                        "{t('contact.subtitle')}"
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="p-8 md:p-12 rounded-[3.5rem] bg-card/50 dark:bg-zinc-900/50 border border-border/50 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {formState === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center text-center space-y-6 py-12"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter overflow-visible pr-4">{t('contact.success')}</h3>
                                        <p className="text-muted-foreground font-medium italic overflow-visible pr-2">{t('contact.success_desc')}</p>
                                    </div>
                                    <Button onClick={() => setFormState('idle')} variant="outline" className="rounded-2xl border-primary/20 text-primary font-black uppercase tracking-widest italic">{t('contact.send_another')}</Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] ml-1 italic opacity-50">{t('contact.form_name')}</label>
                                        <Input
                                            required
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            placeholder={t('contact.form_name')}
                                            className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30 italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] ml-1 italic opacity-50">{t('contact.form_email')}</label>
                                        <Input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="tu@email.com"
                                            className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30 italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] ml-1 italic opacity-50">{t('contact.form_message')}</label>
                                        <Textarea
                                            required
                                            value={formData.mensaje}
                                            onChange={(e) => {
                                                setFormData({ ...formData, mensaje: e.target.value });
                                                e.target.style.height = 'auto';
                                                e.target.style.height = e.target.scrollHeight + 'px';
                                            }}
                                            placeholder="..."
                                            className="min-h-[150px] rounded-[2rem] bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30 italic resize-none overflow-hidden"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={formState === 'loading'}
                                        className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] active:scale-95 group italic"
                                    >
                                        {formState === 'loading' ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                {t('contact.form_submit')}
                                                <Send className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                    {formState === 'error' && (
                                        <p className="text-destructive text-center text-sm font-bold uppercase italic">{t('contact.error')}</p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Contact Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter overflow-visible pr-4">{t('contact.channels_title')}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group cursor-pointer bg-card/30 p-4 rounded-[2rem] border border-border/50 hover:border-primary/50 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                                        <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div className="overflow-visible pr-2">
                                        <p className="text-xs font-black text-primary uppercase tracking-widest italic leading-none mb-1">Email</p>
                                        <p className="text-xl font-bold italic tracking-tight">fonsolinkedin@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer bg-card/30 p-4 rounded-[2rem] border border-border/50 hover:border-primary/50 transition-all">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                                        <Phone className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div className="overflow-visible pr-2">
                                        <p className="text-xs font-black text-primary uppercase tracking-widest italic leading-none mb-1">WhatsApp</p>
                                        <p className="text-xl font-bold italic tracking-tight">+54 3751 336381</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter overflow-visible pr-4">{t('contact.socials_title')}</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: Github, label: "GitHub", link: "https://github.com/santinofonso" },
                                    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/santinofonso" },
                                    { icon: Instagram, label: "Instagram", link: "https://instagram.com/fonsosantino" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-6 rounded-[2.5rem] bg-card dark:bg-zinc-900 border border-border/50 flex flex-col items-center gap-3 hover:border-primary transition-all hover:scale-105 group"
                                    >
                                        <social.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 italic overflow-visible text-center">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 backdrop-blur-xl">
                            <p className="text-lg font-bold italic text-foreground/80 leading-relaxed italic pr-4">
                                "{t('contact.quote')}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
