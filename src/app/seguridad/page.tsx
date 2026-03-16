"use client";
import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    Lock,
    ServerCrash,
    FileCode2,
    Terminal,
    GraduationCap,
    ArrowRight,
    Zap
} from "lucide-react";

interface SecurityPillar {
    id: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    stack: string;
}

const leftPillars: SecurityPillar[] = [
    {
        id: "ISO1",
        title: "ISO 27001 – Pilar 1: Gestión Integral de Continuidad",
        desc: "Identificación, evaluación y aseguramiento proactivo para proteger el valor del negocio antes de escalar la operación.",
        icon: <ShieldCheck className="w-5 h-5" />,
        stack: "IDENTIFICACIÓN / EVALUACIÓN / PROTECCIÓN"
    },
    {
        id: "ISO2",
        title: "Pilar 2: Control de Accesos & Cultura de Datos",
        desc: "Zero Trust, encriptación y capacitación continua para instaurar una cultura de datos segura.",
        icon: <Lock className="w-5 h-5" />,
        stack: "ZERO TRUST / ENCRIPTACIÓN / CULTURA"
    },
    {
        id: "ISO3",
        title: "Pilar 3: Continuidad de Negocio & Uptime",
        desc: "Planes BCP/DRP y arquitecturas resilientes para garantizar uptime del 99.9%.",
        icon: <ServerCrash className="w-5 h-5" />,
        stack: "BCP / DRP / ALTA DISPONIBILIDAD"
    }
];

const rightPillars: SecurityPillar[] = [
    {
        id: "OWASP1",
        title: "Pilar 4: Sanitización & Validación OWASP",
        desc: "Prevención estricta de Inyecciones SQL y XSS mediante validación de inputs desde el backend.",
        icon: <FileCode2 className="w-5 h-5" />,
        stack: "SANITIZACIÓN / VALIDACIÓN / OWASP"
    },
    {
        id: "DEV1",
        title: "Pilar 5: Pipeline DevSecOps & Evaluación Estratégica",
        desc: "Análisis SAST/DAST continuo antes de cada despliegue a producción para asegurar la continuidad.",
        icon: <Terminal className="w-5 h-5" />,
        stack: "SAST / DAST / CI/CD"
    },
    {
        id: "CULT1",
        title: "Cultura de Seguridad & Human Firewall",
        desc: "Simulaciones de phishing y entrenamiento para el manejo adecuado de apps corporativas.",
        icon: <GraduationCap className="w-5 h-5" />,
        stack: "HUMAN FIREWALL / PHISHING SIMS / ENTRENAMIENTO"
    }
];

// Framer Motion variants
const sideContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const leftCardVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { type: "spring" as const, stiffness: 110, damping: 18 }
    }
};

const rightCardVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
        opacity: 1,
        x: 0,
        transition: { type: "spring" as const, stiffness: 110, damping: 18 }
    }
};

export default function SeguridadPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="relative min-h-screen bg-[#F8FAFC] selection:bg-[#0047AB] selection:text-white overflow-x-hidden"
            aria-label="ATM Chile - Centro de Mando Ciberseguridad"
        >
            {/* ══════════════════════════════════════════════════
                1. PANTALLA DE CARGA — Escudo Biométrico (2.8s)
            ══════════════════════════════════════════════════ */}
            <AnimatePresence>
                {isLoading && (
                    <m.div
                        key="security-loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)", scale: 1.08 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-3xl"
                    >
                        {/* Radar Concéntrico */}
                        <m.div
                            animate={{ scale: [1, 2.5, 3.5], opacity: [0.4, 0.1, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                            className="absolute w-48 h-48 border-[2px] border-[#22D3EE] rounded-full pointer-events-none"
                        />
                        <m.div
                            animate={{ scale: [1, 1.8, 2.8], opacity: [0.5, 0.15, 0] }}
                            transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                            className="absolute w-40 h-40 border-[2px] border-[#0047AB] rounded-full pointer-events-none"
                        />

                        {/* Escudo Central */}
                        <div className="relative z-10 w-48 h-48 flex items-center justify-center bg-white rounded-[2.5rem] shadow-[0_10px_60px_rgba(0,71,171,0.15)] border border-slate-100 overflow-hidden">
                            <ShieldCheck className="w-24 h-24 text-[#0047AB]" />
                            <m.div
                                initial={{ y: "-100%" }}
                                animate={{ y: "320%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE] shadow-[0_0_20px_4px_#22D3EE]"
                            />
                        </div>

                        {/* Texto */}
                        <m.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="mt-10 text-sm font-bold tracking-[0.3em] text-[#0047AB] uppercase"
                        >
                            Inicializando Protocolos de Seguridad...
                        </m.p>
                    </m.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════
                2. CONTENIDO — Centro de Mando
            ══════════════════════════════════════════════════ */}
            {!isLoading && (
                <m.div
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-center justify-center min-h-screen pt-28 pb-16"
                >
                    {/* Glows de fondo flotantes */}
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
                        <div className="w-[700px] h-[700px] bg-gradient-to-tr from-[#0047AB]/5 to-[#22D3EE]/5 rounded-full blur-[130px]" />
                    </div>
                    <m.div
                        className="absolute top-[5%] left-[-5%] w-[28vw] h-[28vw] rounded-full bg-[#0047AB]/4 blur-[110px] pointer-events-none"
                        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                    />
                    <m.div
                        className="absolute bottom-[5%] right-[-5%] w-[22vw] h-[22vw] rounded-full bg-[#22D3EE]/4 blur-[110px] pointer-events-none"
                        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                    />

                    {/* ────────────────────────────────────────────────
                        GRID MAESTRO: 1 Col Móvil / 4 Col Desktop
                    ──────────────────────────────────────────────── */}
                    <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">

                        {/* ─────────────────────────────
                            COL. IZQUIERDA — Pilares ISO
                        ───────────────────────────── */}
                        <m.div
                            variants={sideContainerVariants}
                            initial="hidden"
                            animate="show"
                            className="order-2 lg:order-1 lg:col-span-1 flex flex-col gap-4 justify-center"
                        >
                            {leftPillars.map((pillar) => (
                                <m.div
                                    key={pillar.id}
                                    id={`pillar-${pillar.id}`}
                                    variants={leftCardVariants}
                                    whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                                    className="group bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-[#0047AB]/5 hover:border-[#0047AB]/20 rounded-3xl p-6 transition-colors duration-300 cursor-default"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2.5 bg-slate-50 text-[#0047AB] rounded-xl border border-slate-100 shadow-sm flex-shrink-0 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] transition-colors duration-300">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{pillar.title}</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 truncate pr-2">
                                            Stack: {pillar.stack}
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]/30 group-hover:bg-[#22D3EE] flex-shrink-0 transition-colors duration-300" />
                                    </div>
                                </m.div>
                            ))}
                        </m.div>

                        {/* ─────────────────────────────────────────────
                            PANEL CENTRAL — Ejecutivo + Tarjeta Flotante
                        ───────────────────────────────────────────── */}
                        <m.div
                            id="security-central-panel"
                            initial={{ opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 90, damping: 20 }}
                            className="order-1 lg:order-2 lg:col-span-2 relative min-h-[600px] lg:min-h-[780px] rounded-[3rem] overflow-hidden shadow-[0_24px_90px_rgba(0,71,171,0.14)] flex flex-col justify-end"
                        >
                            {/* Imagen de fondo */}
                            <Image
                                src="/images/executive-security.png"
                                alt="Senior DevSecOps Architect — ATM Chile"
                                fill
                                className="object-cover object-center"
                                priority
                            />

                            {/* Gradiente de oscurecimiento hacia abajo */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[#001A40]/70 via-[#001A40]/20 to-transparent z-10 pointer-events-none"
                                aria-hidden="true"
                            />

                            {/* Tarjeta de cristal flotante en la parte inferior */}
                            <div className="relative z-20 m-5 lg:m-7 bg-white/85 backdrop-blur-2xl border border-white/90 shadow-2xl rounded-[2rem] p-7 md:p-9 text-center">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0047AB]/5 border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-5">
                                    <ShieldCheck size={14} className="text-[#22D3EE]" />
                                    Innovación y Escalabilidad
                                </span>

                                <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed mb-7">
                                    Nuestro compromiso es con la seguridad total. Operamos bajo estándares globales y nos encontramos en vías de certificación{" "}
                                    <strong className="text-slate-900 font-black">ISO 27001</strong>{" "}
                                    para garantizar la protección absoluta de sus datos.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                                    <Link
                                        id="cta-auditoria-seguridad"
                                        href="/servicios"
                                        className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0047AB] text-white rounded-2xl font-bold text-sm overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,71,171,0.3)] active:scale-[0.98]"
                                        prefetch={true}
                                    >
                                        <span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                            aria-hidden="true"
                                        />
                                        Potenciar Operación 360
                                        <Zap size={16} className="group-hover:rotate-12 transition-transform" />
                                    </Link>
                                    <Link
                                        id="cta-club100-seguridad"
                                        href="/#club100"
                                        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                                    >
                                        Descubrir el Club 100
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </m.div>

                        {/* ─────────────────────────────────────
                            COL. DERECHA — Pilares DevSecOps
                        ───────────────────────────────────── */}
                        <m.div
                            variants={sideContainerVariants}
                            initial="hidden"
                            animate="show"
                            className="order-3 lg:order-3 lg:col-span-1 flex flex-col gap-4 justify-center"
                        >
                            {rightPillars.map((pillar) => (
                                <m.div
                                    key={pillar.id}
                                    id={`pillar-${pillar.id}`}
                                    variants={rightCardVariants}
                                    whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                                    className="group bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-[#0047AB]/5 hover:border-[#0047AB]/20 rounded-3xl p-6 transition-colors duration-300 cursor-default"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2.5 bg-slate-50 text-[#0047AB] rounded-xl border border-slate-100 shadow-sm flex-shrink-0 group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] transition-colors duration-300">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{pillar.title}</h3>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{pillar.desc}</p>
                                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 truncate pr-2">
                                            Stack: {pillar.stack}
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]/30 group-hover:bg-[#22D3EE] flex-shrink-0 transition-colors duration-300" />
                                    </div>
                                </m.div>
                            ))}
                        </m.div>

                    </div>
                </m.div>
            )}
        </div>
    );
}
