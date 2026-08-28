"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, Users, Bot, LineChart, ShieldCheck, Cloud, Box, Check, ArrowRight, Lock, BookOpen } from "lucide-react";
const PartnersEcosystem = dynamic(() => import("./PartnersEcosystem").then(mod => mod.PartnersEcosystem), {
    loading: () => <div className="h-64 w-full animate-pulse bg-slate-50" />
});
const AdmissionAgent = dynamic(() => import("./AdmissionAgent").then(mod => mod.AdmissionAgent), {
    loading: () => <div className="h-[800px] w-full animate-pulse bg-slate-900" />
});
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";


// Premium Easing Curves
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Apple-like smooth ease out

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
        }
    }
};

const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
};

const HERO_IMAGES = [
    "/images/hero/hero-logistica.png",
    "/images/hero/hero-realestate.png",
    "/images/hero/hero-agente.png",
    "/images/hero/hero-finanzas.png"
];

export const HomeUnified = () => {
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const { containerRef, isVisible, shouldLoad, isMobile } = usePerformanceOptimization({ threshold: 0.1 });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                {/* Dynamic Background Carousel */}
                <div className="absolute inset-0 z-0 bg-slate-950">
                    <AnimatePresence mode="wait">
                        <m.div
                            key={currentImageIdx}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={HERO_IMAGES[currentImageIdx]}
                                alt="ATM Business Impact Chilean Professional"
                                fill
                                priority
                                className="object-cover"
                                sizes="100vw"
                            />
                            {/* Overlay para legibilidad */}
                            <div className="absolute inset-0 bg-slate-950/45" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        </m.div>
                    </AnimatePresence>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: smoothEase }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-accent border border-white/5 text-[10px] font-black tracking-widest uppercase mb-6">
                                <BadgeCheck size={16} />
                                <span>ATM Chile | Partner Tecnológico Estratégico 360</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
                                Software a Medida: <br/>
                                <span className="text-[#176BDE] glow-text drop-shadow-[0_0_15px_rgba(23, 107, 222,0.5)]">Hub Tecnológico Latam</span>
                            </h1>
                            <p className="text-lg text-blue-200/80 leading-relaxed mb-10 max-w-xl">
                                No solo implementamos tecnología. Somos el partner estratégico de alta fidelidad que transforma operaciones complejas en Chile y el mundo a través de ingeniería de software premium.
                            </p>
                            <m.div 
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: smoothEase }}
                            >
                                <Link href="/servicios" className="neon-button text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform text-center flex items-center justify-center bg-[#176BDE] hover:bg-[#009bcf]">
                                    Potenciar Operación 360
                                </Link>
                                <a href="#club100" className="bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors text-center flex items-center justify-center">
                                    Descubrir el Club 100
                                </a>
                            </m.div>
                        </m.div>
                        <m.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: smoothEase }}
                            className="relative flex items-center justify-center p-0 bg-transparent"
                        >
                            <m.div 
                                ref={containerRef}
                                variants={floatAnimation}
                                initial="initial"
                                animate="animate"
                                className="w-full h-[400px] md:h-[650px] relative group cursor-pointer bg-transparent overflow-visible will-change-transform"
                                style={{ transform: "translateZ(0)" }}
                            >
                                <div className="w-full h-full flex items-center justify-center relative overflow-hidden group">
                                    {/* Soft brand backlight (ambiance behind the logo, never on it) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#16F3E8]/12 blur-[130px] rounded-full animate-pulse pointer-events-none" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-[#176BDE]/15 blur-[150px] rounded-full pointer-events-none" />

                                    {/* Official ATM Logotype — white + "A TU MEDIDA" (Brandbook, no invasive glow) */}
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                                        <div className="relative w-full max-w-[560px] aspect-[1036/620]">
                                            <Image
                                                src="/logos/ATM_logo_slogan_white.png"
                                                alt="ATM Chile — A tu medida"
                                                fill
                                                priority
                                                sizes="(max-width: 768px) 90vw, 560px"
                                                className="object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">Ecosistema de Soluciones</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Nuestros Servicios Estratégicos</h3>
                    </m.div>

                    <m.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {/* Talento Senior */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group relative p-8 rounded-2xl border border-slate-100/50 hover:border-[#176BDE]/30 bg-white shadow-xl hover:shadow-[0_0_30px_rgba(23, 107, 222,0.15)] transition-all duration-300 depth-3d flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 text-white text-[10px] font-bold px-2 py-1 rounded bg-[#176BDE] shadow-[0_0_10px_rgba(23, 107, 222,0.5)] uppercase tracking-wider z-20">Most Requested</div>
                            
                            {/* High-Fidelity Photorealistic Image */}
                            <div className="aspect-video w-full rounded-xl bg-[#02121d] border border-white/5 group-hover:border-[#176BDE]/40 group-hover:shadow-[0_0_15px_rgba(23, 107, 222,0.2)] transition-all duration-300 mb-6 overflow-hidden relative z-10">
                               <Image src="/images/talento_senior.png" alt="Desarrollador Senior Chileno en vscode" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#176BDE] transition-colors">Talento Senior On-Demand</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Células ágiles de desarrolladores senior integradas a su flujo de trabajo. Ingeniería de software a medida bajo estándares Audit-Ready y Clean Code.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">Agile / Senior Management / High Performance Teams</p>
                            </div>
                            <Link href="/talento" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-50 group-hover:bg-[#176BDE]/10 text-slate-600 group-hover:text-[#176BDE] font-bold rounded-lg transition-colors text-sm">
                                Leer equipo
                            </Link>
                        </m.div>

                        {/* IA Generativa & Automatización */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100/50 hover:border-[#176BDE]/30 bg-white shadow-xl hover:shadow-[0_0_30px_rgba(23, 107, 222,0.15)] transition-all duration-300 depth-3d flex flex-col h-full"
                        >
                            {/* High-Fidelity Photorealistic Image */}
                            <div className="aspect-video w-full rounded-xl bg-[#02121d] border border-white/5 group-hover:border-[#176BDE]/40 group-hover:shadow-[0_0_15px_rgba(23, 107, 222,0.2)] transition-all duration-300 mb-6 overflow-hidden relative z-10">
                               <Image src="/images/ia_generativa.png" alt="Analista de IA Chilena" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#176BDE] transition-colors">IA Generativa & Automatización</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Soluciones de IA que razonan según el perfil del cliente. No es un chatbot: es un equipo digital a medida con CRM inteligente y scoring de leads.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">Python / PyTorch / LangChain</p>
                            </div>
                            <Link href="/servicios" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-50 group-hover:bg-[#176BDE]/10 text-slate-600 group-hover:text-[#176BDE] font-bold rounded-lg transition-colors text-sm">
                                Explorar
                            </Link>
                        </m.div>

                        {/* Ciberseguridad 360 */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100/50 hover:border-[#176BDE]/30 bg-white shadow-xl hover:shadow-[0_0_30px_rgba(23, 107, 222,0.15)] transition-all duration-300 depth-3d flex flex-col h-full"
                        >
                            {/* High-Fidelity Photorealistic Image */}
                            <div className="aspect-video w-full rounded-xl bg-[#02121d] border border-white/5 group-hover:border-[#176BDE]/40 group-hover:shadow-[0_0_15px_rgba(23, 107, 222,0.2)] transition-all duration-300 mb-6 overflow-hidden relative z-10">
                               <Image src="/images/ciberseguridad_soc.png" alt="Analista de Ciberseguridad SOC Chile" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                               <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#176BDE] transition-colors">Ciberseguridad 360</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Protección integral de infraestructuras críticas en el Hub Metropolitano. Auditoría preventiva, Pentesting y cumplimiento de estándares internacionales ISO 27001.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">ISO 27001 / Pentesting / Zero Trust</p>
                            </div>
                            <Link href="/seguridad" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-50 group-hover:bg-[#176BDE]/10 text-slate-600 group-hover:text-[#176BDE] font-bold rounded-lg transition-colors text-sm">
                                Centro de Mando
                            </Link>
                        </m.div>
                    </m.div>
                </div>
            </section>



            {/* Insights Section Preview (Profepyme) */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#176BDE]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-sm font-bold text-[#176BDE] tracking-[0.2em] uppercase mb-4">Insights de Vanguardia</h2>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                Recursos para liderar la <br className="hidden md:block" />
                                <span className="text-[#176BDE]">Transformación Digital</span>
                            </h3>
                        </div>
                        <Link href="/insights" className="group inline-flex items-center gap-2 text-slate-600 font-bold hover:text-[#176BDE] transition-colors">
                            Ver todos los recursos
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "IA en la Operación Real: Agentes Autónomos",
                                category: "Inteligencia Artificial",
                                img: "/images/insights/ia-agentes.png",
                                desc: "Cómo la industria chilena está migrando hacia agentes que ejecutan flujos de trabajo sin intervención."
                            },
                            {
                                title: "OpenAI o1: El fin de las alucinaciones",
                                category: "Criptografía & Software",
                                img: "/images/insights/openai-o1.png",
                                desc: "El impacto del razonamiento profundo en el desarrollo de software a medida de alta complejidad."
                            },
                            {
                                title: "GEO: El nuevo estándar del SEO",
                                category: "Marketing Tech",
                                img: "/images/asistente-futurista.jpg",
                                desc: "Cómo posicionar su marca en la era de las respuestas sintetizadas por IA."
                            }
                        ].map((post, idx) => (
                            <m.div 
                                key={idx}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-2xl border border-slate-100 p-2 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-6">
                                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black text-[#176BDE] uppercase tracking-wider">{post.category}</span>
                                    </div>
                                </div>
                                <div className="px-4 pb-6">
                                    <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#176BDE] transition-colors">{post.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{post.desc}</p>
                                    <Link href="/insights" className="text-xs font-black text-[#176BDE] uppercase tracking-widest flex items-center gap-2">
                                        Leer Artículo <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </m.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Providers Carousel */}
            <PartnersEcosystem />


            {/* Premium Section: Club 100 (Círculo Privado) */}
            <section id="club100" className="py-20 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #176BDE 0%, #0086C3 60%, #005F8E 100%)" }}>
                {/* Glows decorativos */}
                <div className="absolute top-0 left-0 w-[45%] h-full bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* ── Copy Side ── */}
                        <m.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/40 text-[10px] font-black tracking-[0.2em] text-white uppercase mb-6 md:mb-8">
                                Exclusividad Senior
                            </div>
                             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 leading-tight">
                                Círculo de Excelencia:<br/>
                                <span className="text-white/90">El Club 100</span>
                            </h2>
                            <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-medium max-w-xl">
                                Una alianza estratégica restringida exclusivamente a 100 empresas con visión de escala global. Acceda a recursos de ingeniería de élite y soporte arquitectónico prioritario en el Hub Metropolitano.
                            </p>

                            <m.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-4 md:space-y-6 mb-10 md:mb-12"
                            >
                                {[
                                    { title: "Pentesting continuo", desc: "Seguridad proactiva sin interrupciones." },
                                    { title: "Implementación prioritaria de Agentes IA", desc: "Acceso beta a nueva tecnología de automatización." },
                                    { title: "Soporte de Arquitectos Cloud 24/7", desc: "Línea directa con expertos sin intermediarios." }
                                ].map((item, idx) => (
                                    <m.div key={idx} variants={cardVariant} className="flex items-start gap-4">
                                        <div className="mt-0.5 size-6 rounded-full flex items-center justify-center shrink-0 bg-white/20 border border-white/40">
                                            <Check size={14} className="text-white" />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold text-sm md:text-base mb-0.5">{item.title}</h5>
                                            <p className="text-white/70 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </m.div>
                                ))}
                            </m.div>

                            <m.button
                                onClick={() => document.getElementById('admision-form')?.scrollIntoView({ behavior: 'smooth' })}
                                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.98)' }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-[#005F8E] rounded-2xl font-black text-base md:text-lg tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-[0_8px_40px_rgba(0,0,0,0.15)] w-full sm:w-auto"
                            >
                                <span className="relative z-10">Solicitar Admisión</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#176BDE]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </m.button>
                        </m.div>

                        {/* ── VIP Card Side ── */}
                        <m.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: smoothEase }}
                            className="relative"
                        >
                            <div className="relative w-full max-w-sm mx-auto md:max-w-md">
                                {/* Plazas badge flotante */}
                                <m.div
                                    animate={{ y: [-6, 6, -6] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-4 md:-top-8 md:-right-8 z-20 size-16 md:size-20 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white/50"
                                >
                                    <span className="font-black text-[#005F8E] text-lg md:text-2xl leading-none">100</span>
                                    <span className="font-bold text-[#0086C3] text-[8px] md:text-[10px] uppercase tracking-wider">Plazas</span>
                                </m.div>

                                {/* Glass VIP card */}
                                <div className="relative rounded-3xl md:rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_24px_80px_rgba(0,0,0,0.15)] overflow-hidden p-6 md:p-10">
                                    {/* 3D ATM Logo — Spline transparente */}
                                <div className="w-full h-36 md:h-52 relative mb-4 md:mb-6 overflow-hidden rounded-2xl bg-[#176BDE]/10 flex items-center justify-center border border-white/20">
                                    <div className="text-white/40 font-black text-4xl md:text-6xl tracking-tighter select-none">ATM</div>
                                    {/* Glass reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                                </div>

                                    <h4 className="text-xl md:text-3xl font-black text-white text-center mb-3 md:mb-4">Membresía<br/>VIP ATM</h4>

                                    <div className="w-12 md:w-16 h-0.5 bg-white/40 rounded-full mx-auto mb-4 md:mb-6"></div>

                                    <p className="text-white/75 font-medium text-center text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
                                        Disponibilidad actual del primer ciclo:
                                    </p>

                                    {/* Counter */}
                                    <div className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 rounded-2xl px-4 md:px-8 py-3 md:py-4">
                                        <span className="font-black text-white text-xl md:text-3xl tracking-[0.15em]">12</span>
                                        <span className="text-white/50 font-bold text-lg md:text-2xl">/</span>
                                        <span className="font-black text-white text-xl md:text-3xl tracking-[0.15em]">100</span>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Formulario de Admisión Senior */}
            <AdmissionAgent />
        </React.Fragment>
    );
};
