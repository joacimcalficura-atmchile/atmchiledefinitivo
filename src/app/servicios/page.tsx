"use client";
import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Database, Building2, Truck, Cpu, Box, ShieldCheck, Users, ArrowRight, X, BrainCircuit } from "lucide-react";
import { EcommerceArchitecture } from "@/components/sections/EcommerceArchitecture";
import { SaasArchitecture }      from "@/components/sections/SaasArchitecture";
import { FintechArchitecture }   from "@/components/sections/FintechArchitecture";
import { LogisticsArchitecture } from "@/components/sections/LogisticsArchitecture";
import { ErpArchitecture }       from "@/components/sections/ErpArchitecture";
import { ProductVisualization3DServices } from "@/components/sections/ProductVisualization3DServices";
import { AIGenerativeArchitecture } from "@/components/sections/AIGenerativeArchitecture";

// ── Tipos ────────────────────────────────────────────────────────────────────
interface Solution {
    id: string;
    num: string;
    title: string;
    desc: string;
    tags: string[];
    cta: string;
    ctaHref?: string;
    hasModal: boolean;
    Icon: React.ComponentType<{ className?: string }>;
}

// ── Solo los servicios exclusivos de esta página (los del home se retiran) ───
const solutions: Solution[] = [
    {
        id: "talento",
        num: "01",
        title: "Talento Senior On-Demand",
        desc: "Células ágiles de programadores de alto rendimiento integradas a su flujo de trabajo bajo supervisión técnica senior.",
        tags: ["Agile", "Senior Management", "High Performance"],
        cta: "Ver equipo",
        ctaHref: "/talento",
        hasModal: false,
        Icon: Users,
    },
    {
        id: "ia-generativa",
        num: "02",
        title: "IA Generativa & Automatización",
        desc: "Soluciones de IA que razonan según el perfil del cliente. No es un chatbot: es un equipo digital a medida con CRM inteligente y scoring de leads.",
        tags: ["LangChain", "GPT-4o", "CRM AI", "RAG"],
        cta: "Explorar Soluciones IA",
        hasModal: true,
        Icon: BrainCircuit,
    },
    {
        id: "seguridad",
        num: "03",
        title: "Ciberseguridad 360",
        desc: "Auditoría y protección integral bajo estándares internacionales. Evaluación estratégica de infraestructuras críticas.",
        tags: ["ISO 27001", "Pentesting", "Zero Trust"],
        cta: "Centro de Mando",
        ctaHref: "/seguridad",
        hasModal: false,
        Icon: ShieldCheck,
    },
    {
        id: "3d",
        num: "04",
        title: "Virtualización de Productos 3D",
        desc: "Catálogos interactivos y gemelos digitales que potencian ventas B2B. Exhiba productos complejos con total interactividad.",
        tags: ["WebGL", "Three.js", "Unreal Engine 5"],
        cta: "Explorar Servicios",
        hasModal: true,
        Icon: Box,
    },
    {
        id: "ecommerce",
        num: "05",
        title: "E-commerce B2B/B2C",
        desc: "Plataformas transaccionales headless diseñadas para conversión máxima y experiencia de compra premium.",
        tags: ["Headless", "API-First", "Omnicanal"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: ShoppingCart,
    },
    {
        id: "logistica",
        num: "06",
        title: "Logística (WMS & TMS)",
        desc: "Optimización integral de la cadena de suministro. Orquestación inteligente desde el almacén hasta la última milla.",
        tags: ["WMS", "TMS", "Last Mile"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Truck,
    },
    {
        id: "saas",
        num: "07",
        title: "SaaS Enterprise",
        desc: "Arquitecturas multi-tenant y escalabilidad en la nube. Productos digitales a medida para potenciar su negocio.",
        tags: ["Multi-tenant", "Cloud", "Scalable"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Cpu,
    },
    {
        id: "fintech",
        num: "08",
        title: "Core Financiero & Fintech",
        desc: "Integración ágil de pasarelas de pago y modernización de sistemas transaccionales bajo los más altos estándares.",
        tags: ["Payments", "SAP", "Oracle"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Building2,
    },
    {
        id: "erp",
        num: "09",
        title: "ERP Custom & Integraciones",
        desc: "Centralización operativa y conectividad avanzada mediante API con SAP, Oracle y ecosistemas corporativos existentes.",
        tags: ["SAP", "API REST", "Integración"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Database,
    },
];

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Modal Glass de Arquitectura ───────────────────────────────────────────────
const ArchitectureModal = ({
    id,
    onClose,
}: {
    id: string;
    onClose: () => void;
}) => {
    // Cerrar con Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    // Bloquear scroll del body mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const Content = () => {
        switch (id) {
            case "ia-generativa": return <AIGenerativeArchitecture />;
            case "3d":        return <ProductVisualization3DServices />;
            case "ecommerce": return <EcommerceArchitecture />;
            case "logistica": return <LogisticsArchitecture />;
            case "saas":      return <SaasArchitecture />;
            case "fintech":   return <FintechArchitecture />;
            case "erp":       return <ErpArchitecture />;
            default:          return null;
        }
    };

    return (
        <m.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", backgroundColor: "rgba(248,250,252,0.6)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <m.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.93, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-6xl max-h-[88vh] overflow-y-auto rounded-[2.5rem]"
            style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "saturate(180%) blur(48px)",
                WebkitBackdropFilter: "saturate(180%) blur(48px)",
                border: "1.5px solid rgba(255,255,255,0.95)",
                boxShadow: [
                    "0 60px 140px -20px rgba(0,71,171,0.20)",
                    "0 32px 64px -8px rgba(0,0,0,0.10)",
                    "0 0 0 1px rgba(0,71,171,0.06)",
                    "inset 0 1px 0 rgba(255,255,255,1)",
                    "inset 0 -1px 0 rgba(0,71,171,0.04)",
                ].join(","),
            }}
        >
            {/* Brillo superior — firma Apple glass */}
            <div
                className="absolute top-0 left-12 right-12 h-px pointer-events-none z-20 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent 100%)" }}
            />
            {/* Glow ambiental azul sutil */}
            <div
                className="absolute -inset-1 rounded-[2.5rem] pointer-events-none -z-10 opacity-40"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,71,171,0.12), transparent)" }}
            />

            {/* Botón cerrar — azul cobalto */}
            <button
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#0047AB] hover:bg-[#003380] text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0047AB]/30 border border-[#0047AB]/80"
            >
                <X size={18} />
            </button>

            {/* Contenido */}
            <div className="overflow-hidden rounded-[2.5rem]">
                <Content />
            </div>
        </m.div>
        </m.div>

    );
};

// ── Página Principal ──────────────────────────────────────────────────────────
export default function ServiciosPage() {
    const [isLoading, setIsLoading]         = useState(true);
    const [activeModal, setActiveModal]     = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(t);
    }, []);

    const openModal  = (id: string) => setActiveModal(id);
    const closeModal = ()           => setActiveModal(null);

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] selection:bg-[#0047AB] selection:text-white">

            {/* ── Loading Screen ───────────────────────────────────────────── */}
            <AnimatePresence>
                {isLoading && (
                    <m.div
                        key="loading"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F8FAFC]/95 backdrop-blur-2xl"
                    >
                        <div className="flex flex-col items-center max-w-sm w-full px-6">
                            <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                                <m.div animate={{ rotateZ: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-[#0047AB]/20"
                                    style={{ rotateX: 75, borderTopColor: "rgba(0,71,171,0.8)" }} />
                                <m.div animate={{ rotateZ: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 rounded-full border-2 border-transparent border-l-[#22D3EE]/80 border-r-[#22D3EE]/80 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                    style={{ rotateX: 75 }} />
                                <m.div animate={{ rotateZ: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-10 rounded-full border-2 border-[#0047AB]/40"
                                    style={{ rotateX: 75, borderBottomColor: "#0047AB", borderTopColor: "#0047AB" }} />
                                <m.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-20 h-20 bg-gradient-to-tr from-[#0047AB] to-[#22D3EE] rounded-full blur-[28px] -z-10" />
                                <m.span animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute text-2xl font-black tracking-tighter text-slate-900">
                                    <span className="text-slate-400 font-light">{"<"}</span>
                                    {" ATM "}
                                    <span className="text-slate-400 font-light">{"/>"}</span>
                                </m.span>
                            </div>
                            <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent mb-6 opacity-70" />
                            <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-[10px] font-black tracking-[0.35em] text-[#0047AB] uppercase mb-5">
                                Iniciando Transformación...
                            </m.p>
                            <div className="w-full h-[2px] bg-slate-200/50 rounded-full overflow-hidden">
                                <m.div initial={{ width: "0%" }} animate={{ width: "100%" }}
                                    transition={{ duration: 2.6, ease: smoothEase }}
                                    className="h-full bg-gradient-to-r from-[#0047AB] to-[#22D3EE]" />
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* ── Modal de Arquitectura (Glass Apple-style) ────────────────── */}
            <AnimatePresence>
                {activeModal && (
                    <ArchitectureModal key={activeModal} id={activeModal} onClose={closeModal} />
                )}
            </AnimatePresence>

            {/* ── Contenido principal ──────────────────────────────────────── */}
            <AnimatePresence>
                {!isLoading && (
                    <m.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        className="max-w-7xl mx-auto px-6 py-24 lg:py-32"
                    >
                        {/* Hero */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
                            className="mb-20 space-y-5"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/5 text-[#0047AB] text-xs font-black uppercase tracking-[0.2em] border border-[#0047AB]/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                                Soluciones B2B
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                                ATM{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                    Services
                                </span>
                            </h1>
                            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                                Ecosistemas tecnológicos de alto impacto diseñados para la escalabilidad corporativa y la eficiencia operativa.
                            </p>
                        </m.div>

                        {/* Grid de Servicios */}
                        <m.div
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: { opacity: 0 },
                                show:   { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {solutions.map((item) => (
                                <m.div
                                    key={item.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 24 },
                                        show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 18 } }
                                    }}
                                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                    className="group bg-white border border-slate-200 p-10 rounded-2xl flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_14px_40px_-8px_rgba(0,51,102,0.12)]"
                                >
                                    <div>
                                        {/* Cabecera */}
                                        <div className="mb-8 flex items-center justify-between">
                                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[#0047AB] group-hover:bg-[#0047AB] group-hover:text-white group-hover:border-[#0047AB] transition-colors duration-300">
                                                <item.Icon className="w-7 h-7" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-300 tracking-[0.25em] uppercase">
                                                {item.num}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{item.title}</h3>
                                        <p className="text-slate-500 mb-6 leading-relaxed text-[0.9375rem]">{item.desc}</p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {item.tags.map((tag) => (
                                                <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    {item.ctaHref ? (
                                        <Link
                                            href={item.ctaHref}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#0047AB] hover:gap-3 transition-all duration-200 group/link"
                                        >
                                            {item.cta}
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                                        </Link>
                                    ) : item.hasModal ? (
                                        <button
                                            onClick={() => openModal(item.id)}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#0047AB] hover:gap-3 transition-all duration-200 text-left group/btn"
                                        >
                                            {item.cta}
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 cursor-default">
                                            {item.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </m.div>
                            ))}
                        </m.div>

                        {/* CTA Banner */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="mt-24 bg-[#003366] rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
                        >
                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    ¿Listo para escalar su infraestructura?
                                </h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Hable con nuestros consultores senior sobre su próximo proyecto estratégico.
                                </p>
                            </div>
                            <m.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="whitespace-nowrap bg-white text-[#003366] font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors shadow-xl text-base flex items-center gap-2"
                            >
                                Agendar Consultoría
                                <ArrowRight className="w-5 h-5" />
                            </m.button>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
