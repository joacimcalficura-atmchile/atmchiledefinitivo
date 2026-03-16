"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Bot,
    BrainCircuit,
    UserCheck,
    BarChart3,
    Settings2,
    MessageSquare,
    Sparkles,
    Target,
    Users,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    Fingerprint,
} from "lucide-react";

/* ─────────────── Tipos ─────────────── */
interface ComparisonItem {
    basic: string;
    atm: string;
}

interface AISolution {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    comparison: ComparisonItem[];
    techStack: string[];
    metric: { label: string; value: string };
}

/* ─────────────── Data ─────────────── */
const aiSolutions: AISolution[] = [
    {
        id: "ai-profile",
        title: "IA con Perfil de Marca",
        subtitle: "Tu negocio, su personalidad",
        description:
            "No es un chatbot genérico. Configuramos una IA que atiende exactamente como usted quiere: con el tono, el conocimiento y la personalidad de su marca. Cada interacción refleja la identidad y los valores de su empresa.",
        icon: <Fingerprint className="w-6 h-6" />,
        features: [
            "Personalidad configurada por el dueño del negocio",
            "Tono y lenguaje adaptado a la marca",
            "Conocimiento profundo del catálogo y servicios",
            "Respuestas contextuales según historial del cliente",
        ],
        comparison: [
            {
                basic: "Respuestas genéricas y frías de un script fijo",
                atm: "Responde con la voz y filosofía de su marca",
            },
            {
                basic: "No reconoce al cliente ni su historial",
                atm: "Razona sobre el perfil: frecuencia, preferencias, ticket",
            },
            {
                basic: "Mismo trato para todos los usuarios",
                atm: "Atención diferenciada: VIP, nuevo, recurrente",
            },
        ],
        techStack: ["LangChain", "GPT-4o", "RAG", "Vector DB"],
        metric: { label: "Satisfacción cliente", value: "+72%" },
    },
    {
        id: "crm-scoring",
        title: "CRM con Scoring Inteligente",
        subtitle: "Cada lead, calificado al instante",
        description:
            "Un CRM que no solo almacena contactos: califica automáticamente cada lead según su comportamiento, interacciones y probabilidad de conversión. Su equipo de ventas solo atiende oportunidades reales.",
        icon: <Target className="w-6 h-6" />,
        features: [
            "Lead scoring en tiempo real con IA",
            "Segmentación automática por comportamiento",
            "Alertas inteligentes al equipo de ventas",
            "Pipeline predictivo con probabilidad de cierre",
        ],
        comparison: [
            {
                basic: "Todos los leads van al mismo listado sin prioridad",
                atm: "Scoring automático: Hot, Warm, Cold con porcentaje exacto",
            },
            {
                basic: "El vendedor decide manualmente a quién contactar",
                atm: "La IA prioriza y asigna según carga y expertise",
            },
            {
                basic: "Sin visibilidad del journey del cliente",
                atm: "Mapa completo: qué vio, qué preguntó, cuánto interactuó",
            },
        ],
        techStack: ["Python", "Scikit-learn", "PostgreSQL", "Webhooks"],
        metric: { label: "Conversión de leads", value: "+58%" },
    },
    {
        id: "tools-custom",
        title: "Herramientas a Medida",
        subtitle: "Cada cliente, su solución única",
        description:
            "Cada herramienta que desplegamos se diseña a medida. No vendemos licencias genéricas: construimos la solución exacta que su operación necesita, integrada con sus sistemas existentes y adaptada a sus flujos.",
        icon: <Settings2 className="w-6 h-6" />,
        features: [
            "Desarrollo a medida según la operación real",
            "Integración nativa con ERP, CRM y plataformas existentes",
            "Flujos de trabajo personalizados por rol de usuario",
            "Escalabilidad planificada desde el diseño",
        ],
        comparison: [
            {
                basic: "Software genérico: usted se adapta a la herramienta",
                atm: "La herramienta se adapta a su flujo operativo real",
            },
            {
                basic: "Funciones que nunca usa, las que necesita faltan",
                atm: "Solo lo que necesita, exactamente como lo necesita",
            },
            {
                basic: "Integraciones con plugins genéricos que fallan",
                atm: "Conexión directa API-a-API con su ecosistema",
            },
        ],
        techStack: ["Next.js", "TypeScript", "API REST", "Custom Agents"],
        metric: { label: "Eficiencia operativa", value: "+65%" },
    },
];

/* ─────────── Componente Tarjeta Comparativa ─────────── */
const ComparisonCard = ({ item }: { item: ComparisonItem }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Basic */}
        <div className="relative p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="absolute top-3 right-3">
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Chatbot Básico
                </span>
            </div>
            <div className="flex items-start gap-2.5 mt-4">
                <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-500 leading-relaxed">
                    {item.basic}
                </p>
            </div>
        </div>
        {/* ATM */}
        <div
            className="relative p-4 rounded-xl border"
            style={{
                background:
                    "linear-gradient(135deg, rgba(0,71,171,0.04) 0%, rgba(34,211,238,0.04) 100%)",
                borderColor: "rgba(0,71,171,0.12)",
            }}
        >
            <div className="absolute top-3 right-3">
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#0047AB] bg-[#0047AB]/8 px-2 py-0.5 rounded-full border border-[#0047AB]/10">
                    ATM IA Generativa
                </span>
            </div>
            <div className="flex items-start gap-2.5 mt-4">
                <Sparkles className="w-4 h-4 text-[#0047AB] mt-0.5 shrink-0" />
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {item.atm}
                </p>
            </div>
        </div>
    </div>
);

/* ─────────── Componente Principal ─────────── */
interface AIGenerativeArchitectureProps {
    onClose?: () => void;
}

export const AIGenerativeArchitecture = ({
    onClose,
}: AIGenerativeArchitectureProps) => {
    const [activeSolution, setActiveSolution] = useState<AISolution>(
        aiSolutions[0]
    );

    return (
        <section className="relative w-full py-20 md:py-24 bg-[#F8FAFC] overflow-hidden">
            {/* Ambient glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] pointer-events-none -z-10 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,71,171,0.15), transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* ── Header ──────────────────────────── */}
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/5 text-[#0047AB] text-xs font-black uppercase tracking-[0.2em] border border-[#0047AB]/10 mb-5">
                            <BrainCircuit className="w-3.5 h-3.5" />
                            IA Generativa Estratégica
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            No es un chatbot.{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                                Es su equipo digital.
                            </span>
                        </h2>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed">
                            Inteligencia artificial que{" "}
                            <strong className="text-slate-800">razona</strong>,{" "}
                            <strong className="text-slate-800">personaliza</strong> y{" "}
                            <strong className="text-slate-800">convierte</strong>.
                            Cada herramienta se diseña a medida para su
                            operación, su marca y su cliente final.
                        </p>
                    </div>
                </div>

                {/* ── Layout Principal ─────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Sidebar de Soluciones */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {aiSolutions.map((sol) => {
                            const isActive = activeSolution.id === sol.id;
                            return (
                                <m.button
                                    key={sol.id}
                                    onClick={() => setActiveSolution(sol)}
                                    whileHover={{ x: isActive ? 0 : 4 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                    className={`
                                        relative text-left w-full p-5 rounded-2xl border transition-all duration-500 backdrop-blur-xl
                                        ${
                                            isActive
                                                ? "bg-white/90 border-[#0047AB]/20 shadow-[0_12px_48px_rgba(0,71,171,0.12)]"
                                                : "bg-white/50 border-white/60 hover:bg-white/70 shadow-sm hover:shadow-md"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`
                                                p-3 rounded-xl transition-all duration-500
                                                ${
                                                    isActive
                                                        ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/30"
                                                        : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                                        >
                                            {sol.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className={`text-base font-bold tracking-tight transition-colors duration-500 ${
                                                    isActive
                                                        ? "text-[#0047AB]"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {sol.title}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-0.5 truncate">
                                                {sol.subtitle}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                                                isActive
                                                    ? "text-[#0047AB] translate-x-0.5"
                                                    : "text-slate-300"
                                            }`}
                                        />
                                    </div>

                                    {/* Active indicator line */}
                                    {isActive && (
                                        <m.div
                                            layoutId="ai-active-tab"
                                            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#0047AB] to-[#22D3EE]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </m.button>
                            );
                        })}

                        {/* Metric Card */}
                        <AnimatePresence mode="wait">
                            <m.div
                                key={activeSolution.id + "-metric"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 p-5 rounded-2xl border border-[#0047AB]/10"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(0,71,171,0.03) 0%, rgba(34,211,238,0.03) 100%)",
                                }}
                            >
                                <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-2">
                                    Impacto Medido
                                </div>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                                        {activeSolution.metric.value}
                                    </span>
                                    <span className="text-sm text-slate-500 font-medium pb-1">
                                        {activeSolution.metric.label}
                                    </span>
                                </div>
                            </m.div>
                        </AnimatePresence>
                    </div>

                    {/* Panel de Detalle */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={activeSolution.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="w-full p-8 md:p-10 rounded-[2rem] border backdrop-blur-2xl"
                                style={{
                                    background: "rgba(255,255,255,0.75)",
                                    borderColor: "rgba(255,255,255,0.85)",
                                    boxShadow: [
                                        "0 24px 80px -12px rgba(0,71,171,0.10)",
                                        "0 8px 24px -4px rgba(0,0,0,0.04)",
                                        "inset 0 1px 0 rgba(255,255,255,1)",
                                    ].join(","),
                                }}
                            >
                                {/* Top accent light */}
                                <div
                                    className="absolute top-0 left-10 right-10 h-px pointer-events-none rounded-full"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent 100%)",
                                    }}
                                />

                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/25">
                                        {activeSolution.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                            {activeSolution.title}
                                        </h3>
                                        <p className="text-sm text-[#0047AB] font-semibold">
                                            {activeSolution.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-600 font-medium leading-relaxed mb-8 max-w-2xl">
                                    {activeSolution.description}
                                </p>

                                {/* Features */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                                        Capacidades Clave
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activeSolution.features.map(
                                            (feat, i) => (
                                                <m.div
                                                    key={feat}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: i * 0.08,
                                                    }}
                                                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/60 border border-slate-100"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-1.5 shrink-0" />
                                                    <span className="text-sm text-slate-700 font-medium leading-snug">
                                                        {feat}
                                                    </span>
                                                </m.div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Comparación */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                                        ¿Por qué no es lo mismo?
                                    </h4>
                                    <div className="space-y-3">
                                        {activeSolution.comparison.map(
                                            (comp, i) => (
                                                <m.div
                                                    key={i}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.15 + i * 0.1,
                                                    }}
                                                >
                                                    <ComparisonCard
                                                        item={comp}
                                                    />
                                                </m.div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Tech Stack & Security */}
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mr-1">
                                            Tech Stack
                                        </span>
                                        {activeSolution.techStack.map(
                                            (tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-md"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                        Enterprise-Grade Security
                                    </div>
                                </div>
                            </m.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Bottom Visual: Flujo de la IA ────── */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 p-8 md:p-12 rounded-[2rem] border backdrop-blur-xl"
                    style={{
                        background: "rgba(255,255,255,0.7)",
                        borderColor: "rgba(255,255,255,0.8)",
                        boxShadow:
                            "0 20px 60px -12px rgba(0,71,171,0.08), inset 0 1px 0 rgba(255,255,255,1)",
                    }}
                >
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0047AB] mb-8">
                        Flujo de Integración — De la consulta a la conversión
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Cliente llega",
                                desc: "Web, WhatsApp, redes sociales o email. Un solo punto de contacto inteligente.",
                                Icon: Users,
                                color: "#0047AB",
                            },
                            {
                                step: "02",
                                title: "IA personalizada responde",
                                desc: "Con el tono de su marca, razonando sobre el perfil del cliente en tiempo real.",
                                Icon: BrainCircuit,
                                color: "#0047AB",
                            },
                            {
                                step: "03",
                                title: "CRM califica al lead",
                                desc: "Scoring automático, segmentación y asignación inteligente al vendedor correcto.",
                                Icon: BarChart3,
                                color: "#0047AB",
                            },
                            {
                                step: "04",
                                title: "Conversión medida",
                                desc: "Dashboards en tiempo real, métricas de conversión y optimización continua con IA.",
                                Icon: Target,
                                color: "#22D3EE",
                            },
                        ].map((item, i) => (
                            <m.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="relative flex flex-col"
                            >
                                {/* Connector line */}
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                                )}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg"
                                    style={{
                                        background: item.color,
                                        boxShadow: `0 8px 24px -4px ${item.color}33`,
                                    }}
                                >
                                    <item.Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase mb-2">
                                    Paso {item.step}
                                </span>
                                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </m.div>
                        ))}
                    </div>
                </m.div>
            </div>
        </section>
    );
};
