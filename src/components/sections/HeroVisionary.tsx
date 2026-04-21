"use client";
import React from "react";
import { m } from "framer-motion";
import { ShieldCheck, ArrowRight, Zap, Cpu, Server, Users, LineChart } from "lucide-react";
import Link from "next/link";

const CAPABILITIES = [
    {
        id: "ia",
        title: "IA & Automatización",
        description: "Despliegue de agentes inteligentes y LLMs locales para optimizar procesos críticos con confiabilidad absoluta.",
        stack: "PYTHON / PYTORCH / LANGCHAIN",
        icon: <Cpu size={28} className="text-[#0047AB]" />
    },
    {
        id: "cyber",
        title: "Ciberseguridad 360",
        description: "Evaluación estratégica y blindaje de infraestructura. Entornos de alta confianza contra OWASP Top 10 y Zero-Day.",
        stack: "ISO 27001 / PENTESTING",
        icon: <ShieldCheck size={28} className="text-[#0047AB]" />
    },
    {
        id: "cloud",
        title: "Arquitectura Cloud",
        description: "Diseño de sistemas resilientes en AWS/Azure con escalado automático y alta disponibilidad.",
        stack: "DOCKER / KUBERNETES / TERRAFORM",
        icon: <Server size={28} className="text-[#0047AB]" />
    },
    {
        id: "talent",
        title: "Talento Senior On-Demand",
        description: "Células ágiles de programadores subcontratados, gestionados bajo nuestra supervisión técnica senior.",
        stack: "AGILE / SENIOR MANAGEMENT",
        icon: <Users size={28} className="text-[#0047AB]" />
    },
    {
        id: "bi",
        title: "BI & Data Strategy",
        description: "Transformamos datos crudos en dashboards estratégicos para la toma de decisiones gerenciales.",
        stack: "POWERBI / SQL / SNOWFLAKE",
        icon: <LineChart size={28} className="text-[#0047AB]" />
    },
    {
        id: "rpa",
        title: "RPA Enterprise",
        description: "Automatización de tareas repetitivas mediante robots de software, elevando la precisión operativa a su máximo nivel.",
        stack: "UIPATH / BLUEPRISM / CUSTOM BOTS",
        icon: <Zap size={28} className="text-[#0047AB]" />
    }
];

export const HeroVisionary = () => {
    // Variantes de animación orquestadas (Senior Level)
    const fadeUpContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
    };

    const fadeUpItem = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring" as const, stiffness: 300, damping: 24 },
        },
    };

    const futuristicCardContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const futuristicCardVariants = {
        hidden: { opacity: 0, y: 120, scale: 0.8, rotateX: 30 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 20 },
        },
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#F8FAFC] selection:bg-[#0047AB] selection:text-white" style={{ perspective: "1000px" }}>

            {/* 1. MOTOR DE FÍSICA DE PARTÍCULAS (Background Orbs) - FORCE LIGHT MODE BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <m.div
                    animate={{
                        x: ["-10%", "10%", "-10%"],
                        y: ["-10%", "5%", "-10%"],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0047AB]/5 blur-[120px] will-change-transform"
                />
                <m.div
                    animate={{
                        x: ["10%", "-10%", "10%"],
                        y: ["5%", "-10%", "5%"],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" as const }}
                    className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#22D3EE]/10 blur-[120px] will-change-transform"
                />
            </div>

            {/* 2. CONTENEDOR CENTRAL */}
            <div className="relative z-10 w-full max-w-[90rem] px-4 md:px-8 mx-auto flex flex-col items-center">

                {/* ---------------- HERO (Centro de Comando) ---------------- */}
                <m.div
                    variants={fadeUpContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center max-w-5xl mx-auto w-full mb-24 relative"
                >
                    {/* Resplandor Radial de Fondo (Profundidad) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[800px] h-[120%] md:h-[800px] bg-[#22D3EE]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

                    <m.div variants={fadeUpItem} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#0047AB]/10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm">
                            <ShieldCheck size={16} className="text-[#22D3EE]" />
                            Innovación y Escalabilidad
                        </span>
                    </m.div>

                    <m.div variants={fadeUpItem} className="mb-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900">
                            ATM Chile
                        </h2>
                    </m.div>

                    <m.h1
                        variants={fadeUpItem}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 md:mb-8"
                    >
                        Capacidades de partner <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                            Visión Tecnológica 360°
                        </span>
                    </m.h1>

                    <m.p
                        variants={fadeUpItem}
                        className="text-base md:text-lg lg:text-xl text-slate-600 md:text-slate-700 max-w-3xl mb-10 md:mb-12 leading-relaxed font-medium mx-auto"
                    >
                        No implementamos tecnología. Transformamos negocios mejorando el valor. Integramos Inteligencia Artificial, Arquitectura Cloud y liderazgo senior para alinear procesos, personas y estrategia con resultados medibles.
                    </m.p>

                    <m.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="/servicios"
                            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0047AB] text-white rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,71,171,0.3)] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            Potenciar Operación 360
                            <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                        </Link>

                        <a
                            href="#club100"
                            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-700 rounded-2xl font-bold text-base transition-all hover:shadow-sm active:scale-[0.98]"
                        >
                            Descubrir el Club 100
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </m.div>
                </m.div>

                {/* ---------------- GRID DE SERVICIOS (Despliegue Futurista 3D) ---------------- */}
                <m.div
                    variants={futuristicCardContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto z-10"
                >
                    {CAPABILITIES.map((cap) => (
                        <m.div
                            key={cap.id}
                            variants={futuristicCardVariants}
                            whileHover={{ y: -5, scale: 1.02, transition: { type: "spring" as const, stiffness: 400, damping: 25 } }}
                            className="flex flex-col bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl shadow-blue-900/5 rounded-3xl p-6 md:p-8 transition-colors hover:border-[#22D3EE]/40 group"
                        >
                            <div className="flex-1 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#0047AB]/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0047AB]/10 transition-all duration-300">
                                        {cap.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{cap.title}</h3>
                                </div>

                                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-8 flex-1">
                                    {cap.description}
                                </p>

                                <div className="w-full h-[1px] bg-slate-200/50 my-4"></div>

                                <div className="flex items-center justify-between w-full mt-auto">
                                    <span className="text-[10px] md:text-xs font-bold font-mono text-slate-400 tracking-[0.15em] uppercase truncate pr-4">
                                        STACK: {cap.stack}
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]/40 group-hover:bg-[#22D3EE] transition-colors flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0)] group-hover:shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </m.div>

            </div>
        </section>
    );
};
