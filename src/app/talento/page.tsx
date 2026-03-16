"use client";
import React, { useState, useEffect } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Users,
    Target,
    Heart,
    Settings,
    BarChart3,
    Lightbulb,
    ArrowRight,
    Zap,
    CheckCircle2,
    TrendingUp,
    Compass,
    Map,
    Rocket,
    Flag,
    BrainCircuit,
    ShieldCheck,
    Mail,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// DATA — Extraída fielmente de las imágenes de referencia
// ─────────────────────────────────────────────────────────

interface TeamMember {
    role: string;
    desc: string;
    icon: React.ReactNode;
    tag: string;
}

const teamMembers: TeamMember[] = [
    {
        role: "Liderazgo Tecnológico",
        desc: "Somos un equipo senior con experiencia real en liderazgo tecnológico, conectando visión estratégica y ejecución práctica.",
        icon: <BrainCircuit className="w-6 h-6" />,
        tag: "CTO / Tech Lead / Arquitecto",
    },
    {
        role: "Liderazgo Operacional",
        desc: "Integramos cada iniciativa con el negocio, procesos y tecnología para garantizar resultados medibles y sostenibles.",
        icon: <Settings className="w-6 h-6" />,
        tag: "COO / PMO / Ops Manager",
    },
    {
        role: "Liderazgo Comercial",
        desc: "No solo diseñamos la transformación: la implementamos con foco en el cliente y con métricas de éxito claras.",
        icon: <TrendingUp className="w-6 h-6" />,
        tag: "CEO / CSO / Account Lead",
    },
    {
        role: "Gestión del Cambio",
        desc: "Acompañamos a los equipos desde el inicio, integrándolos al proceso y fortaleciendo capacidades clave para sostener la transformación.",
        icon: <Users className="w-6 h-6" />,
        tag: "Change Manager / Coach",
    },
];

interface Phase {
    id: number;
    number: string;
    title: string;
    objective: string;
    deliverables: string[];
    icon: React.ReactNode;
}

const phases: Phase[] = [
    {
        id: 0,
        number: "01",
        title: "Escuchar y Comprender",
        objective: "Conocer el negocio del cliente, el estado actual y entender los desafíos de la empresa.",
        deliverables: ["Resumen ejecutivo", "Entrevistas clave", "Mapeo preliminar"],
        icon: <Compass className="w-5 h-5" />,
    },
    {
        id: 1,
        number: "02",
        title: "Planificar",
        objective: "Diseñar una hoja de ruta pragmática y priorizada que equilibre impacto y esfuerzo.",
        deliverables: ["Hoja de ruta con foco TPP", "Priorización por impacto y esfuerzo", "Indicadores de éxito"],
        icon: <Map className="w-5 h-5" />,
    },
    {
        id: 2,
        number: "03",
        title: "Ejecutar y Acompañar",
        objective: "Poner en marcha las acciones del plan, con un acompañamiento cercano y práctico.",
        deliverables: [
            "Intervenciones por pilar",
            "Implementación de herramientas / rediseño de procesos / gestión del cambio",
            "Soporte en terreno",
        ],
        icon: <Rocket className="w-5 h-5" />,
    },
    {
        id: 3,
        number: "04",
        title: "Transferir y Consolidar",
        objective: "Asegurar continuidad, empoderar a los equipos y dejar herramientas para el futuro.",
        deliverables: ["Capacitación", "Documentación", "Cierre y roadmap siguiente"],
        icon: <Flag className="w-5 h-5" />,
    },
];

interface Aporte {
    title: string;
    desc: string;
    icon: React.ReactNode;
    direction: "left" | "right";
}

const aportes: Aporte[] = [
    {
        title: "Claridad estratégica",
        desc: "Te ayudamos a ordenar ideas, visualizar prioridades y tomar decisiones con foco en lo que genera mayor impacto.",
        icon: <Lightbulb className="w-7 h-7" />,
        direction: "left",
    },
    {
        title: "Transformación realista y sostenible",
        desc: "Diseñamos soluciones desde tu realidad: integrando procesos, personas y tecnología de forma gradual, aplicable y alineada a tu madurez organizacional.",
        icon: <TrendingUp className="w-7 h-7" />,
        direction: "right",
    },
    {
        title: "Fortalecimiento del equipo",
        desc: "El cambio no es técnico, es humano. Trabajamos con tu equipo desde el inicio, integrándolo en el proceso y fortaleciendo capacidades clave para sostener la transformación.",
        icon: <Users className="w-7 h-7" />,
        direction: "left",
    },
];

// ─────────────────────────────────────────────────────────
// VARIANTS DE ANIMACIÓN
// ─────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 18 } },
};

const tabContentVariant: Variants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

// ─────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────

export default function TalentoPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="relative min-h-screen bg-[#F8FAFC] overflow-x-hidden"
            aria-label="ATM Chile – Talento & Transformación"
        >
            {/* ══════════════════════════════════════════════════
          PANTALLA DE CARGA — People Power
        ══════════════════════════════════════════════════ */}
                <AnimatePresence>
                    {isLoading && (
                        <m.div
                            key="talent-loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(16px)", scale: 1.06 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-3xl"
                        >
                            {/* Pulso animado */}
                            <m.div
                                animate={{ scale: [1, 2.2, 3.2], opacity: [0.35, 0.1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                                className="absolute w-48 h-48 border-2 border-[#0047AB]/40 rounded-full pointer-events-none"
                            />
                            <m.div
                                animate={{ scale: [1, 1.6, 2.6], opacity: [0.5, 0.15, 0] }}
                                transition={{ duration: 2.5, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
                                className="absolute w-40 h-40 border-2 border-[#22D3EE]/50 rounded-full pointer-events-none"
                            />

                            {/* Ícono central */}
                            <div className="relative z-10 w-48 h-48 flex items-center justify-center bg-white rounded-[2.5rem] shadow-[0_10px_60px_rgba(0,71,171,0.15)] border border-slate-100 overflow-hidden">
                                <m.div
                                    animate={{ y: [-4, 4, -4] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Users className="w-24 h-24 text-[#0047AB]" />
                                </m.div>
                                {/* Escáner horizontal */}
                                <m.div
                                    initial={{ y: "-100%" }}
                                    animate={{ y: "320%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE] shadow-[0_0_20px_4px_#22D3EE]"
                                />
                            </div>

                            <m.p
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mt-10 text-sm font-bold tracking-[0.3em] text-[#0047AB] uppercase"
                            >
                                Cargando Talento Senior...
                            </m.p>

                            {/* Barra de progreso */}
                            <div className="mt-6 w-48 h-[2px] bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
                                <m.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-full bg-gradient-to-r from-[#0047AB] to-[#22D3EE] shadow-[0_0_10px_#22D3EE]"
                                />
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>

                {/* ══════════════════════════════════════════════════
              CONTENIDO PRINCIPAL (post-loading)
            ══════════════════════════════════════════════════ */}
                {!isLoading && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* ──────────────────────────────────────────────────────
                    SECCIÓN 1: HERO — PROPÓSITO + PROPUESTA DE VALOR
                    ────────────────────────────────────────────────── */}
                        <section
                            id="talento"
                            aria-labelledby="talento-heading"
                            className="relative pt-36 pb-28 px-6 overflow-hidden"
                        >
                            {/* Fondo holográfico */}
                            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                <div className="w-[800px] h-[800px] bg-gradient-to-tr from-[#0047AB]/5 to-[#22D3EE]/5 rounded-full blur-[100px]" />
                            </div>
                                <m.div
                                    className="absolute top-[5%] left-[-8%] w-[25vw] h-[25vw] rounded-full bg-[#0047AB]/4 blur-[100px] pointer-events-none"
                                animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                aria-hidden="true"
                            />
                                <m.div
                                    className="absolute bottom-[5%] right-[-8%] w-[20vw] h-[20vw] rounded-full bg-[#22D3EE]/4 blur-[100px] pointer-events-none"
                                animate={{ x: [0, -25, 0], y: [0, 18, 0] }}
                                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                                aria-hidden="true"
                            />

                            <div className="relative z-10 max-w-6xl mx-auto">
                                {/* Badge */}
                                <m.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    className="flex justify-center mb-8"
                                >
                                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm">
                                        <Target size={14} className="text-[#22D3EE]" />
                                        Propósito &amp; Visión
                                    </span>
                                </m.div>

                                {/* Headline — Propósito */}
                                <m.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ delay: 0.1 }}
                                    className="text-center mb-10"
                                >
                                    <h1
                                        id="talento-heading"
                                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6"
                                    >
                                        Acompañar a las empresas
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                            en su crecimiento y modernización.
                                        </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                                        Conectamos{" "}
                                        <strong className="text-slate-900 font-black">Tecnología</strong>,{" "}
                                        <strong className="text-slate-900 font-black">Procesos</strong> y{" "}
                                        <strong className="text-slate-900 font-black">Personas</strong>{" "}
                                        desde la estrategia del negocio, para una transformación eficiente, equipos alineados, competentes y empoderados.
                                    </p>
                                </m.div>

                                {/* Propuesta de Valor — Tarjeta central destacada */}
                                <m.div
                                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 90, damping: 20 }}
                                    className="relative bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_20px_80px_rgba(0,71,171,0.08)] rounded-[2.5rem] p-10 md:p-14 text-center overflow-hidden"
                                >
                                    {/* Borde luminoso superior */}
                                    <div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#0047AB]/30 to-transparent pointer-events-none"
                                        aria-hidden="true"
                                    />
                                    {/* Brillo interno */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <span className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0047AB]/5 border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-6">
                                        <Heart size={14} className="text-[#22D3EE]" />
                                        Propuesta de Valor
                                    </span>

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {[
                                            {
                                                icon: <Lightbulb className="w-8 h-8" />,
                                                title: "Claridad estratégica",
                                                desc: "Te ayudamos a ordenar ideas, visualizar prioridades y tomar decisiones con foco en lo que genera mayor impacto.",
                                            },
                                            {
                                                icon: <TrendingUp className="w-8 h-8" />,
                                                title: "Transformación realista y sostenible",
                                                desc: "Diseñamos soluciones desde tu realidad: integrando procesos, personas y tecnología de forma gradual y alineada a tu madurez organizacional.",
                                            },
                                            {
                                                icon: <Users className="w-8 h-8" />,
                                                title: "Fortalecimiento del equipo",
                                                desc: "El cambio no es técnico, es humano. Trabajamos con tu equipo desde el inicio, integrándolo en el proceso y fortaleciendo capacidades clave.",
                                            },
                                        ].map((item, idx) => (
                                            <m.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 + idx * 0.12, type: "spring", stiffness: 100 }}
                                                className="flex flex-col items-center"
                                            >
                                                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0047AB]/10 to-[#22D3EE]/5 text-[#0047AB] mb-4 border border-[#0047AB]/10">
                                                    {item.icon}
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                            </m.div>
                                        ))}
                                    </div>
                                </m.div>

                                {/* CTAs */}
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                                >
                                    <Link
                                        id="cta-talento-primary"
                                        href="/servicios"
                                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0047AB] text-white rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,71,171,0.3)] active:scale-[0.98]"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                                        Ver Nuestros Servicios
                                        <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                                    </Link>
                                    <a
                                        id="cta-talento-metodologia"
                                        href="#metodologia"
                                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-base transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                                    >
                                        Ver Metodología
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </m.div>
                            </div>
                        </section>

                        {/* ──────────────────────────────────────────────────────
                    SECCIÓN 2: EL EQUIPO — Grid de Roles Senior
                    ────────────────────────────────────────────────── */}
                        <section
                            id="equipo"
                            aria-labelledby="equipo-heading"
                            className="relative py-24 px-6 bg-gradient-to-b from-[#F8FAFC] to-slate-50/80"
                        >
                            <div className="max-w-7xl mx-auto">
                                <m.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-80px" }}
                                    className="text-center mb-14"
                                >
                                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm mb-6">
                                        <Users size={14} className="text-[#22D3EE]" />
                                        El Equipo
                                    </span>
                                    <h2
                                        id="equipo-heading"
                                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
                                    >
                                        Equipo Senior de{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                            Alto Nivel
                                        </span>
                                    </h2>
                                    <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                                        Somos un equipo senior con experiencia real en liderazgo tecnológico, operacional y comercial. No solo diseñamos la transformación: la implementamos con foco en resultados medibles y sostenibles.
                                    </p>
                                </m.div>

                                {/* Grid de Roles */}
                                <m.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                >
                                    {teamMembers.map((member) => (
                                        <m.div
                                            key={member.role}
                                            variants={cardVariant}
                                            whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                                            className="group relative flex flex-col p-8 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,71,171,0.1)] transition-all duration-500 overflow-hidden cursor-default"
                                        >
                                            <div className="relative z-10">
                                                <div className="w-12 h-12 rounded-2xl bg-[#0047AB]/5 text-[#0047AB] flex items-center justify-center mb-6 group-hover:bg-[#0047AB] group-hover:text-white transition-colors duration-500">
                                                    {member.icon}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#22D3EE] mb-2 block">
                                                    {member.tag}
                                                </span>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{member.role}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{member.desc}</p>
                                            </div>
                                            {/* Glow decorativo */}
                                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#0047AB]/5 rounded-full blur-3xl group-hover:bg-[#22D3EE]/10 transition-colors duration-700" />
                                        </m.div>
                                    ))}
                                </m.div>
                            </div>
                        </section>

                        {/* ──────────────────────────────────────────────────────
                    SECCIÓN: DIGITAL OPERATIONS CENTER — Premium HQ Experience
                    ────────────────────────────────────────────────── */}
                        <section className="relative py-24 px-6 bg-[#020B12] overflow-hidden">
                            {/* Mesh Gradient Animado (Fondo Ops Center - Optimizado) */}
                            <div className="absolute inset-0 z-0 opacity-30">
                                <m.div 
                                    animate={{ 
                                        opacity: [0.3, 0.5, 0.3],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#0047AB_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#0047AB_0%,transparent_50%)]"
                                />
                                <div className="absolute inset-0 noise-bg opacity-20 mix-blend-overlay" />
                            </div>

                            <div className="max-w-7xl mx-auto relative z-10">
                                {/* Encabezado Ops Center */}
                                <m.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-center mb-16"
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#22D3EE] mb-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                                        ATM Global Command Center
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                                        Sercanía Real, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#0047AB]">Control Total.</span>
                                    </h2>
                                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                                        No somos solo software. Somos un equipo senior operando 24/7 para garantizar que su infraestructura escale sin fricciones.
                                    </p>
                                </m.div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                                    {/* Panel Lateral: Métricas Live */}
                                    <div className="lg:col-span-4 flex flex-col gap-4">
                                        {[
                                            { label: "SLA Uptime", value: "99.99%", detail: "Disponibilidad Garantizada", icon: <ShieldCheck className="w-5 h-5" />, color: "#22D3EE" },
                                            { label: "Response Time", value: "24 hrs", detail: "Soporte Senior Focalizado", icon: <Zap className="w-5 h-5" />, color: "#FACC15" },
                                            { label: "Active Nodes", value: "2.4k+", detail: "Monitoreo Distribuido", icon: <BrainCircuit className="w-5 h-5" />, color: "#0047AB" },
                                        ].map((metric, i) => (
                                            <m.div 
                                                key={i}
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:scale-110 transition-transform" style={{ color: metric.color }}>
                                                        {metric.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{metric.label}</p>
                                                        <p className="text-2xl font-black text-white">{metric.value}</p>
                                                        <p className="text-xs text-slate-400">{metric.detail}</p>
                                                    </div>
                                                </div>
                                            </m.div>
                                        ))}
                                    </div>

                                    {/* Panel Central: Imagen Pro - High Resolution Focus */}
                                    <m.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020B12] via-transparent to-transparent z-10" />
                                        
                                        {/* Frame Deco Apple Style */}
                                        <div className="absolute top-6 left-6 z-20 flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        </div>

                                        <div className="absolute top-6 right-6 z-20">
                                            <span className="px-3 py-1 rounded-md bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[9px] font-black text-[#22D3EE] uppercase tracking-[0.2em] backdrop-blur-md">
                                                Verified Operations Center
                                            </span>
                                        </div>

                                        <Image 
                                            src="/images/equipo-real-4k.png"
                                            alt="ATM operational team working at HQ"
                                            width={1600}
                                            height={900}
                                            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                        />

                                        {/* Info Box Floating */}
                                        <div className="absolute bottom-6 left-6 right-6 z-20 p-6 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="text-center md:text-left">
                                                <h4 className="text-white font-black text-lg mb-0.5">Liderazgo Estratégico Senior</h4>
                                                <p className="text-slate-400 text-xs">Acompañamiento directo de nuestros fundadores en cada proyecto.</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex -space-x-3">
                                                    <Link 
                                                        href="https://www.linkedin.com/in/joacim-elias-calficura-marillanca-077bbb234/"
                                                        target="_blank"
                                                        className="group/avatar relative w-12 h-12 rounded-full border-2 border-[#020B12] bg-[#0047AB] overflow-hidden hover:z-30 transition-all hover:scale-110"
                                                        title="Joacim Calficura - CEO"
                                                    >
                                                        <div className="w-full h-full bg-brand-cobalt flex items-center justify-center text-white font-black text-xs">JC</div>
                                                    </Link>
                                                    <Link 
                                                        href="https://www.linkedin.com/in/fcespedm/"
                                                        target="_blank"
                                                        className="group/avatar relative w-12 h-12 rounded-full border-2 border-[#020B12] bg-brand-cyan overflow-hidden hover:z-30 transition-all hover:scale-110"
                                                        title="Felipe Céspedes - Project Manager"
                                                    >
                                                        <div className="w-full h-full bg-brand-cyan flex items-center justify-center text-white font-black text-xs">FC</div>
                                                    </Link>
                                                </div>
                                                <div className="h-8 w-px bg-white/10 hidden md:block" />
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">
                                                    Direct Management <br /> Influence
                                                </div>
                                            </div>
                                        </div>
                                    </m.div>
                                </div>
                            </div>
                        </section>

                        {/* ──────────────────────────────────────────────────────
                    SECCIÓN 3: METODOLOGÍA — Tabs Interactivas
                    ────────────────────────────────────────────────── */}
                        <section
                            id="metodologia"
                            aria-labelledby="metodologia-heading"
                            className="relative py-24 px-6 bg-[#F8FAFC]"
                        >
                            {/* Fondo sutil */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0047AB]/4 to-[#22D3EE]/3 rounded-full blur-[100px]" />
                            </div>

                            <div className="relative z-10 max-w-5xl mx-auto">
                                <m.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="text-center mb-14"
                                >
                                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm mb-6">
                                        <Settings size={14} className="text-[#22D3EE]" />
                                        Metodología — Fases
                                    </span>
                                    <h2
                                        id="metodologia-heading"
                                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
                                    >
                                        Nuestro proceso,{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                            paso a paso.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                                        Haz clic en una fase para descubrir los objetivos y entregables de cada etapa de transformación.
                                    </p>
                                </m.div>

                                {/* Botones de Tabs */}
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="flex flex-wrap justify-center gap-3 mb-10"
                                    role="tablist"
                                    aria-label="Fases de la metodología"
                                >
                                    {phases.map((phase) => (
                                        <button
                                            key={phase.id}
                                            id={`tab-fase-${phase.id}`}
                                            role="tab"
                                            aria-selected={activeTab === phase.id}
                                            aria-controls={`tabpanel-fase-${phase.id}`}
                                            onClick={() => setActiveTab(phase.id)}
                                            className={`
                                                relative flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border
                                                ${activeTab === phase.id
                                                    ? "bg-[#0047AB] text-white border-[#0047AB] shadow-[0_8px_24px_rgba(0,71,171,0.25)]"
                                                    : "bg-white text-slate-700 border-slate-200 hover:border-[#0047AB]/30 hover:text-[#0047AB] hover:shadow-md"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                                                    ${activeTab === phase.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}
                                                `}
                                            >
                                                {phase.number}
                                            </span>
                                            {phase.title}
                                        </button>
                                    ))}
                                </m.div>

                                {/* Panel de contenido animado */}
                                <div className="relative min-h-[260px]">
                                    <AnimatePresence mode="wait">
                                        {phases.map(
                                            (phase) =>
                                                activeTab === phase.id && (
                                                    <m.div
                                                        key={phase.id}
                                                        id={`tabpanel-fase-${phase.id}`}
                                                        role="tabpanel"
                                                        aria-labelledby={`tab-fase-${phase.id}`}
                                                        variants={tabContentVariant}
                                                        initial="enter"
                                                        animate="center"
                                                        exit="exit"
                                                        className="bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_rgba(0,71,171,0.08)] rounded-[2rem] p-10 md:p-12"
                                                    >
                                                        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                                                            {/* Objetivo */}
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-5">
                                                                    <div className="p-3 rounded-xl bg-[#0047AB]/8 text-[#0047AB] border border-[#0047AB]/10">
                                                                        {phase.icon}
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">
                                                                            Fase {phase.number}
                                                                        </span>
                                                                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                                                            {phase.title}
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <p className="text-slate-700 font-medium leading-relaxed text-base">
                                                                    <strong className="text-slate-900">Objetivo: </strong>
                                                                    {phase.objective}
                                                                </p>
                                                            </div>

                                                            {/* Entregables */}
                                                            <div className="md:w-72 flex-shrink-0">
                                                                <h4 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400 mb-4">
                                                                    Entregables
                                                                </h4>
                                                                <ul className="space-y-3">
                                                                    {phase.deliverables.map((d, i) => (
                                                                        <li key={i} className="flex items-start gap-3">
                                                                            <CheckCircle2 className="w-4 h-4 text-[#22D3EE] flex-shrink-0 mt-0.5" />
                                                                            <span className="text-slate-700 text-sm leading-relaxed">{d}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </m.div>
                                                )
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Indicador de progreso de fases */}
                                <m.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center justify-center gap-2 mt-8"
                                >
                                    {phases.map((phase) => (
                                        <button
                                            key={phase.id}
                                            aria-label={`Ir a Fase ${phase.number}`}
                                            onClick={() => setActiveTab(phase.id)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === phase.id
                                                ? "w-8 bg-[#0047AB]"
                                                : "w-2 bg-slate-200 hover:bg-slate-300"
                                                }`}
                                        />
                                    ))}
                                </m.div>
                            </div>
                        </section>

                        {/* ──────────────────────────────────────────────────────
                    SECCIÓN 4: APORTE A SU EMPRESA — Scroll Animado
                    ────────────────────────────────────────────────── */}
                        <section
                            id="aporte"
                            aria-labelledby="aporte-heading"
                            className="relative py-24 px-6 bg-gradient-to-b from-slate-50/80 to-[#F8FAFC]"
                        >
                            <div className="max-w-5xl mx-auto">
                                <m.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-80px" }}
                                    className="text-center mb-18"
                                >
                                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm mb-6">
                                        <BarChart3 size={14} className="text-[#22D3EE]" />
                                        Aporte a su Empresa
                                    </span>
                                    <h2
                                        id="aporte-heading"
                                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
                                    >
                                        Lo que{" "}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                            usted obtiene.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                                        Identificamos fortalezas y sinergias, proponemos soluciones realistas, optimizamos procesos, desarrollamos tecnología y preparamos a los equipos para liderar el cambio con resultados reales y sostenibles.
                                    </p>
                                </m.div>

                                <div className="space-y-10 mt-14">
                                    {aportes.map((aporte, idx) => (
                                        <m.div
                                            key={aporte.title}
                                            initial={{ opacity: 0, x: aporte.direction === "left" ? -40 : 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{
                                                delay: idx * 0.1,
                                                type: "spring",
                                                stiffness: 80,
                                                damping: 18,
                                            }}
                                            whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                                            className={`group flex flex-col md:flex-row items-center gap-8 p-10 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,71,171,0.09)] transition-all duration-500 overflow-hidden ${aporte.direction === "right" ? "md:flex-row-reverse" : ""
                                                }`}
                                        >
                                            {/* Ícono */}
                                            <div className="flex-shrink-0 p-6 rounded-2xl bg-gradient-to-br from-[#0047AB]/8 to-[#22D3EE]/6 text-[#0047AB] border border-[#0047AB]/10 shadow-sm group-hover:bg-[#0047AB]/12 transition-colors duration-500">
                                                {aporte.icon}
                                            </div>

                                            {/* Texto */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE]">
                                                        Aporte 0{idx + 1}
                                                    </span>
                                                    <div className="flex-1 h-px bg-slate-100" />
                                                </div>
                                                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                                                    {aporte.title}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed text-base">
                                                    {aporte.desc}
                                                </p>
                                            </div>
                                        </m.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ──────────────────────────────────────────────────────
                    FOOTER CTA — Cierre Premium
                    ────────────────────────────────────────────────── */}
                        <section
                            aria-labelledby="cta-final-heading"
                            className="relative py-24 px-6 overflow-hidden"
                        >
                            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
                                <div className="w-[500px] h-[500px] bg-gradient-to-tr from-[#0047AB]/6 to-[#22D3EE]/6 rounded-full blur-[100px]" />
                            </div>
                            <m.div
                                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.9, type: "spring", stiffness: 80, damping: 18 }}
                                className="relative z-10 max-w-3xl mx-auto bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_24px_80px_rgba(0,71,171,0.1)] rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden"
                            >
                                {/* Borde luminoso */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-px bg-gradient-to-r from-transparent via-[#0047AB]/30 to-transparent" aria-hidden="true" />

                                <div className="flex justify-center mb-6">
                                    <div className="p-4 rounded-2xl bg-[#0047AB]/8 text-[#0047AB] border border-[#0047AB]/10">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                </div>

                                <h2 id="cta-final-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                                    ¿Listo para transformar
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                        tu organización?
                                    </span>
                                </h2>
                                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-10">
                                    Agenda una sesión estratégica con nuestro equipo senior y descubre cómo la tecnología, los procesos y las personas pueden trabajar juntos para impulsar tu empresa.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        id="cta-footer-servicios"
                                        href="/servicios"
                                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0047AB] text-white rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,71,171,0.3)] active:scale-[0.98]"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                                        Nuestros Servicios
                                        <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                                    </Link>
                                    <Link
                                        id="cta-footer-contacto"
                                        href="/contacto"
                                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-base transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                                    >
                                        Contactar Ahora
                                        <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </m.div>
                        </section>
                    </m.div>
                )}
        </div>
    );
}
