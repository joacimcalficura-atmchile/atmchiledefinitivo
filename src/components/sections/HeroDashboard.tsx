"use client";
import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import {
    ShieldCheck,
    ArrowRight,
    Zap,
    Cpu,
    Layers,
    Users,
    LineChart
} from "lucide-react";

interface ServiceCard {
    title: string;
    desc: string;
    icon: React.ReactNode;
    tech: string;
}

const leftServices: ServiceCard[] = [
    {
        title: "IA & Automatización",
        desc: "Despliegue de agentes inteligentes y LLMs locales para optimizar procesos críticos.",
        icon: <Cpu className="w-5 h-5" />,
        tech: "Python / PyTorch / LangChain"
    },
    {
        title: "Talento Senior On-Demand",
        desc: "Células ágiles de programadores subcontratados bajo supervisión técnica senior.",
        icon: <Users className="w-5 h-5" />,
        tech: "Agile / Senior Management"
    },
    {
        title: "BI & Data Strategy",
        desc: "Transformamos datos crudos en dashboards estratégicos para decisiones gerenciales.",
        icon: <LineChart className="w-5 h-5" />,
        tech: "PowerBI / SQL / Snowflake"
    }
];

const rightServices: ServiceCard[] = [
    {
        title: "Ciberseguridad 360",
        desc: "Evaluación estratégica y blindaje. Entornos de alta confianza contra OWASP Top 10 y Zero-Day.",
        icon: <ShieldCheck className="w-5 h-5" />,
        tech: "ISO 27001 / Pentesting"
    },
    {
        title: "Arquitectura Cloud",
        desc: "Diseño de sistemas resilientes en AWS/Azure con escalado automático.",
        icon: <Layers className="w-5 h-5" />,
        tech: "Docker / Kubernetes / Terraform"
    },
    {
        title: "RPA Enterprise",
        desc: "Automatización de tareas repetitivas mediante robots de software con precisión milimétrica.",
        icon: <Zap className="w-5 h-5" />,
        tech: "UiPath / BluePrism / Custom Bots"
    }
];

export const HeroDashboard = () => {
    return (
        <section
            className="relative w-full min-h-screen pt-28 pb-24 overflow-hidden bg-[#F8FAFC] flex items-center justify-center"
            aria-label="ATM Chile - Panel de Control Estratégico 360"
        >
            {/* Fondo holográfico sutil */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
                <div className="w-[800px] h-[800px] bg-gradient-to-tr from-[#0047AB]/5 to-[#22D3EE]/5 rounded-full blur-[140px]" />
            </div>
            <m.div
                className="absolute top-[10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#0047AB]/4 blur-[120px] pointer-events-none"
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
            />
            <m.div
                className="absolute bottom-[10%] right-[-5%] w-[25vw] h-[25vw] rounded-full bg-[#22D3EE]/4 blur-[120px] pointer-events-none"
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
            />

            {/* ═══════════════════════════════════════════════════════
                GRID MAESTRO: 1 Col Móvil / 4 Col Desktop
            ═══════════════════════════════════════════════════════ */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">

                {/* ─────────────────────────────────────────────────
                    COLUMNA IZQUIERDA — Order-2 en móvil / Order-1 en desktop
                ───────────────────────────────────────────────── */}
                <div className="order-2 lg:order-1 lg:col-span-1 flex flex-col gap-4 justify-center">
                    {leftServices.map((service, idx) => (
                        <m.div
                            key={service.title}
                            id={`service-left-${idx}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.4 + idx * 0.12,
                                type: "spring",
                                stiffness: 120,
                                damping: 18
                            }}
                            whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                            className="group bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm hover:shadow-xl hover:shadow-[#0047AB]/5 rounded-3xl p-6 transition-colors duration-300 cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-[#0047AB]/5 text-[#0047AB] rounded-xl group-hover:bg-[#0047AB] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                    {service.icon}
                                </div>
                                <h3 className="font-bold text-slate-900 text-base leading-tight">{service.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 truncate pr-2">
                                    Stack: {service.tech}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]/30 group-hover:bg-[#22D3EE] flex-shrink-0 transition-colors duration-300" />
                            </div>
                        </m.div>
                    ))}
                </div>

                {/* ─────────────────────────────────────────────────
                    PANEL CENTRAL — Order-1 en móvil / Order-2 en desktop
                ───────────────────────────────────────────────── */}
                <m.div
                    id="hero-central-panel"
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 20 }}
                    className="order-1 lg:order-2 lg:col-span-2 flex flex-col items-center text-center justify-center p-8 md:p-12 lg:p-14 bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_20px_80px_rgba(23, 107, 222,0.07)] rounded-[3rem] relative overflow-hidden"
                >
                    {/* Brillo interno estilo Apple */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                    />
                    {/* Borde luminoso superior */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#0047AB]/30 to-transparent pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Badge */}
                    <span className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] shadow-sm mb-8">
                        <ShieldCheck size={14} className="text-[#22D3EE]" />
                        Innovación y Escalabilidad
                    </span>

                    {/* Logo */}
                    <h2 className="relative z-10 text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-4">
                        <span className="text-slate-300 font-light">&lt;</span>
                        {" "}ATM{" "}
                        <span className="text-slate-300 font-light">/&gt;</span>
                    </h2>

                    {/* Headline */}
                    <h1 className="relative z-10 text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                        Capacidades de partner
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                            Visión Tecnológica 360°
                        </span>
                    </h1>

                    {/* Copy estratégico */}
                    <p className="relative z-10 text-base md:text-lg text-slate-600 max-w-xl mb-10 leading-relaxed font-medium">
                        No implementamos tecnología. Transformamos negocios mejorando el valor. Integramos Inteligencia Artificial, Arquitectura Cloud y liderazgo senior para alinear procesos, personas y estrategia con resultados medibles.
                    </p>

                    {/* CTAs */}
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            id="cta-auditoria-hero"
                            href="/talento"
                            className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0047AB] text-white rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-[0.98]"
                            prefetch={true}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                            Potenciar Operación 360
                            <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                        </Link>
                        <a
                            id="cta-club100-hero"
                            href="#club100"
                            className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-base transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                        >
                            Descubrir el Club 100
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </m.div>

                {/* ─────────────────────────────────────────────────
                    COLUMNA DERECHA — Order-3 en móvil y desktop
                ───────────────────────────────────────────────── */}
                <div className="order-3 lg:order-3 lg:col-span-1 flex flex-col gap-4 justify-center">
                    {rightServices.map((service, idx) => (
                        <m.div
                            key={service.title}
                            id={`service-right-${idx}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.4 + idx * 0.12,
                                type: "spring",
                                stiffness: 120,
                                damping: 18
                            }}
                            whileHover={{ y: -4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                            className="group bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm hover:shadow-xl hover:shadow-[#0047AB]/5 rounded-3xl p-6 transition-colors duration-300 cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-[#0047AB]/5 text-[#0047AB] rounded-xl group-hover:bg-[#0047AB] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                    {service.icon}
                                </div>
                                <h3 className="font-bold text-slate-900 text-base leading-tight">{service.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 truncate pr-2">
                                    Stack: {service.tech}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]/30 group-hover:bg-[#22D3EE] flex-shrink-0 transition-colors duration-300" />
                            </div>
                        </m.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
