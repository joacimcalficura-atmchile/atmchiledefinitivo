"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    BookOpen,
    Play,
    ArrowRight,
    X,
    Youtube,
    Linkedin,
    Mail,
    Sparkles,
    TrendingUp,
    ShieldCheck,
    Cpu,
    BarChart3,
    Boxes,
} from "lucide-react";

// ── Resource Data ─────────────────────────────────────────────────────────────
interface Resource {
    title: string;
    category: string;
    excerpt: string;
    icon: React.ReactNode;
    videoUrl?: string;
    imageUrl?: string;
    readTime: string;
}

const resources: Resource[] = [
    {
        title: "IA en la Operación Real: De Chatbots a Agentes Autónomos",
        category: "Inteligencia Artificial",
        excerpt: "Análisis técnico de cómo la industria chilena (minería y logística) está migrando hacia agentes que no solo conversan, sino que ejecutan flujos de trabajo autónomos sin intervención humana.",
        icon: <Cpu className="w-5 h-5" />,
        imageUrl: "/images/insights/ia-agentes.png",
        readTime: "12 min",
    },
    {
        title: "OpenAI o1 y Razonamiento Crítico: El fin de la alucinación",
        category: "Software de Alto Nivel",
        excerpt: "La nueva arquitectura de razonamiento profundo ('Strawberry') está permitiendo el desarrollo de software a medida con lógica compleja y auditorías de seguridad automáticas de nivel senior.",
        icon: <Sparkles className="w-5 h-5" />,
        imageUrl: "/images/insights/openai-o1.png",
        readTime: "15 min",
    },
    {
        title: "Controversias 2026: Privacidad, Copyright y el Dilema del Entrenamiento",
        category: "Ética & Regulación",
        excerpt: "Balance sobre las disputas legales entre generadores de contenido y modelos de IA. Cómo proteger la propiedad intelectual de su empresa en el Hub Metropolitano.",
        icon: <ShieldCheck className="w-5 h-5" />,
        imageUrl: "/images/ia_generativa.png",
        readTime: "10 min",
    },
    {
        title: "Automatización 360: Como los Agentes redefinen el ROI",
        category: "Transformación Digital",
        excerpt: "Más allá de la automatización tradicional (RPA): los agentes de 2026 analizan contextos en tiempo real y gestionan el Customer Journey de forma autónoma.",
        icon: <Boxes className="w-5 h-5" />,
        imageUrl: "/images/ia-core.jpg",
        readTime: "14 min",
    },
    {
        title: "Santiago Tech Hub: Liderazgo Tecnológico en el Cono Sur",
        category: "Ecosistema Latam",
        excerpt: "Por qué Chile se ha consolidado como el centro neurálgico de infraestructura de IA en Sudamérica y cómo las empresas locales pueden aprovechar esta latencia mínima.",
        icon: <TrendingUp className="w-5 h-5" />,
        imageUrl: "/images/equipo-real-4k.png",
        readTime: "9 min",
    },
    {
        title: "Benchmark Q2 2026: Claude 4.6 vs GPT-5.2 vs Gemini 3.1 Pro",
        category: "Business Intelligence",
        excerpt: "Comparativa exhaustiva de latencia, precisión y costos de tokens para implementaciones empresariales de gran escala en nubes soberanas.",
        icon: <BarChart3 className="w-5 h-5" />,
        imageUrl: "/images/asistente-futurista.jpg",
        readTime: "11 min",
    },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};

// ── Video Lightbox Modal ──────────────────────────────────────────────────────
const VideoLightbox = ({ url, onClose }: { url: string; onClose: () => void }) => (
    <AnimatePresence>
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <m.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-10 w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,174,239,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                <iframe
                    src={url}
                    title="Video Player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </m.div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-colors"
                aria-label="Cerrar video"
            >
                <X size={20} />
            </button>
        </m.div>
    </AnimatePresence>
);

// ── Main Client Component ─────────────────────────────────────────────────────
export const InsightsContent = () => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-[#010912] overflow-x-hidden">
            {/* ── Background Effects ── */}
            <div className="absolute top-0 right-0 w-1/3 h-[60vh] bg-[#00AEEF]/5 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-0 w-1/4 h-[40vh] bg-[#0047AB]/5 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* ── Hero Header ── */}
            <section className="relative z-10 pt-12 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[10px] font-black tracking-[0.2em] text-[#00AEEF] uppercase mb-6">
                            <BookOpen size={14} />
                            Recursos Estratégicos
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                            Insights: <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#22D3EE]">
                                Recursos Estratégicos
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Capacitación gratuita y análisis profundo para dueños de negocio que buscan liderar la transformación digital.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* ── Resources Grid ── */}
            <section className="relative z-10 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <m.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {resources.map((resource, idx) => (
                            <m.article
                                key={idx}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className="group bg-[#02121d] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00AEEF]/30 hover:shadow-[0_0_40px_rgba(0,174,239,0.12)] flex flex-col h-full"
                            >
                                {/* Thumbnail / Video Trigger */}
                                <div className="relative aspect-video w-full bg-[#031d2e] overflow-hidden flex items-center justify-center border-b border-white/5">
                                {resource.imageUrl && (
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={resource.imageUrl}
                                            alt={resource.title}
                                            fill
                                            className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#02121d] via-transparent to-transparent" />
                                    </div>
                                )}

                                {resource.videoUrl ? (
                                    <button
                                        onClick={() => setActiveVideo(resource.videoUrl ?? null)}
                                        className="relative z-10 size-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:scale-110 group-hover:border-[#00AEEF]/60 group-hover:bg-[#00AEEF]/10 transition-all duration-500"
                                        aria-label={`Ver video: ${resource.title}`}
                                    >
                                        <Play size={28} className="text-white/50 group-hover:text-[#00AEEF] transition-colors ml-1" />
                                    </button>
                                ) : (
                                    <div className="relative z-10 size-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                        <BookOpen size={24} className="text-[#00AEEF]/40 group-hover:text-[#00AEEF] transition-colors" />
                                    </div>
                                )}
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:border-[#00AEEF]/20 group-hover:text-slate-300 transition-colors">
                                            {resource.icon}
                                            {resource.category}
                                        </span>
                                        <span className="text-[10px] text-slate-600 font-medium">{resource.readTime}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[#00AEEF] transition-colors">
                                        {resource.title}
                                    </h2>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {resource.excerpt}
                                    </p>

                                    {resource.videoUrl ? (
                                        <button
                                            onClick={() => setActiveVideo(resource.videoUrl ?? null)}
                                            className="inline-flex items-center gap-2 text-[#00AEEF] font-bold text-sm group/btn hover:gap-3 transition-all"
                                        >
                                            <Play size={14} />
                                            <span>Ver video</span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    ) : (
                                        <Link
                                            href="/contacto"
                                            className="inline-flex items-center gap-2 text-[#00AEEF] font-bold text-sm group/btn hover:gap-3 transition-all"
                                        >
                                            <span>Leer más</span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </m.article>
                        ))}
                    </m.div>
                </div>
            </section>

            {/* ── Community CTA Section ── */}
            <section className="relative z-10 pb-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden"
                    >
                        {/* Inner Glow */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[10px] font-black tracking-[0.2em] text-[#00AEEF] uppercase mb-6">
                                <Sparkles size={14} />
                                Comunidad Insights
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                Únete a la comunidad de{" "}
                                <span className="text-[#00AEEF]">líderes digitales</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                Recibe insights exclusivos, acceso anticipado a webinars y herramientas estratégicas directamente en tu bandeja.
                            </p>

                            {/* Newsletter Input */}
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-10"
                            >
                                <input
                                    type="email"
                                    placeholder="tu@empresa.cl"
                                    className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:border-[#00AEEF]/50 focus:ring-2 focus:ring-[#00AEEF]/20 transition-all"
                                    required
                                />
                                <m.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-8 py-4 bg-[#00AEEF] text-[#010912] rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,174,239,0.4)] transition-shadow shrink-0"
                                >
                                    Suscribirse
                                </m.button>
                            </form>

                            {/* Social Links */}
                            <div className="flex items-center justify-center gap-4">
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                                    aria-label="YouTube"
                                >
                                    <Youtube size={20} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href="mailto:contacto@atmchile.com"
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-[#00AEEF] hover:border-[#00AEEF]/30 hover:bg-[#00AEEF]/5 transition-all"
                                    aria-label="Correo electrónico"
                                >
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute top-6 right-6 size-12 border-t-2 border-r-2 border-[#00AEEF]/15 rounded-tr-2xl" />
                        <div className="absolute bottom-6 left-6 size-12 border-b-2 border-l-2 border-[#00AEEF]/15 rounded-bl-2xl" />
                    </m.div>
                </div>
            </section>

            {/* ── Video Lightbox ── */}
            {activeVideo && (
                <VideoLightbox
                    url={activeVideo}
                    onClose={() => setActiveVideo(null)}
                />
            )}
        </div>
    );
};
