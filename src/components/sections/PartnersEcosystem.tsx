"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { m } from "framer-motion";
import {
    Cloud, Database, Cpu, Shield, Bot,
    Server, Code, Zap, Network, Layers,
    Globe, Lock, Atom, GitBranch, Activity,
    Sparkles, BrainCircuit, ScanLine, Workflow, Eye
} from "lucide-react";

interface Partner {
    name: string;
    label: string;
    color: string;
    glow: string;
    Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const partners: Partner[] = [
    { name: "AWS Cloud",      label: "AWS",         color: "#FF9900", glow: "rgba(255,153,0,0.6)",   Icon: Cloud },
    { name: "Azure",          label: "AZURE",       color: "#0078D4", glow: "rgba(0,120,212,0.6)",   Icon: Network },
    { name: "Docker",         label: "DOCKER",      color: "#2496ED", glow: "rgba(36,150,237,0.6)",  Icon: Server },
    { name: "Kubernetes",     label: "K8S",         color: "#326CE5", glow: "rgba(50,108,229,0.6)",  Icon: Layers },
    { name: "Terraform",      label: "TERRAFORM",   color: "#7B42BC", glow: "rgba(123,66,188,0.6)",  Icon: Globe },
    { name: "Gemini Pro",     label: "GEMINI PRO",  color: "#4285F4", glow: "rgba(66,133,244,0.7)",  Icon: Sparkles },
    { name: "Vertex AI",      label: "VERTEX AI",   color: "#34A853", glow: "rgba(52,168,83,0.6)",   Icon: BrainCircuit },
    { name: "Google Stitch",  label: "STITCH",      color: "#EA4335", glow: "rgba(234,67,53,0.6)",   Icon: Workflow },
    { name: "Looker Studio",  label: "LOOKER",      color: "#FBBC05", glow: "rgba(251,188,5,0.6)",   Icon: Eye },
    { name: "OpenAI GPT",     label: "GPT-4o",      color: "#10A37F", glow: "rgba(16,163,127,0.6)",  Icon: Bot },
    { name: "Claude",         label: "CLAUDE",      color: "#CC4E00", glow: "rgba(204,78,0,0.6)",    Icon: Atom },
    { name: "LangChain",      label: "LANGCHAIN",   color: "#1C3D5A", glow: "rgba(28,61,90,0.5)",    Icon: GitBranch },
    { name: "Zero Trust",     label: "0-TRUST",     color: "#6C47FF", glow: "rgba(108,71,255,0.6)",  Icon: Shield },
    { name: "Pentesting",     label: "PENTEST",     color: "#EF4444", glow: "rgba(239,68,68,0.6)",   Icon: Lock },
    { name: "RPA UiPath",     label: "UIPATH",      color: "#fa4616", glow: "rgba(250,70,22,0.6)",   Icon: Zap },
    { name: "Snowflake",      label: "SNOWFLAKE",   color: "#29B5E8", glow: "rgba(41,181,232,0.6)",  Icon: Database },
    { name: "Datadog",        label: "DATADOG",     color: "#632CA6", glow: "rgba(99,44,166,0.6)",   Icon: Activity },
    { name: "DevOps CI/CD",   label: "DEVOPS",      color: "#22C55E", glow: "rgba(34,197,94,0.6)",   Icon: Code },
    { name: "Next.js",        label: "NEXT.JS",     color: "#475569", glow: "rgba(71,85,105,0.4)",   Icon: Cpu },
    { name: "GraphQL",        label: "GRAPHQL",     color: "#E535AB", glow: "rgba(229,53,171,0.6)",  Icon: ScanLine },
];

const CARD_W          = 148;
const CARD_H          = 116;
const ROTATION_SPEED  = 0.006;
const LENS_HALF_ANGLE = 24;
const COUNT           = partners.length;
const STEP            = 360 / COUNT;
const DEG_TO_RAD      = Math.PI / 180;

// Pre-calc "in lens" box-shadows (evita crear strings por frame)
const lensCardShadows = partners.map(
    (p) => `0 12px 40px rgba(0,71,171,0.15), 0 0 24px ${p.glow}`
);

export const PartnersEcosystem = () => {
    const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
    const innerRefs    = useRef<(HTMLDivElement | null)[]>([]);
    const scannerRef   = useRef<HTMLDivElement | null>(null);

    const rotRef       = useRef(0);
    const tRef         = useRef(0);
    const scanRef      = useRef(0);
    const rRef         = useRef(560);
    const rafRef       = useRef(0);
    // Cache estado "inLens" por tarjeta para solo mutar cuando cambia
    const lensState    = useRef<boolean[]>(new Array(COUNT).fill(false));

    const updateR = useCallback(() => {
        rRef.current = window.innerWidth < 768 ? 280 : 560;
    }, []);

    const tick = useCallback((now: number) => {
        if (tRef.current === 0) tRef.current = now;
        const dt = now - tRef.current;
        tRef.current = now;

        const R = rRef.current;
        rotRef.current = (rotRef.current + ROTATION_SPEED * dt) % 360;
        const angle = rotRef.current;

        // Scanner — solo una propiedad, muy barato
        scanRef.current = (scanRef.current + dt * 0.005) % 100;
        if (scannerRef.current) {
            scannerRef.current.style.top = `${scanRef.current}%`;
        }

        for (let i = 0; i < COUNT; i++) {
            const card  = cardRefs.current[i];
            if (!card) continue;

            const itemAngle = (STEP * i + angle + 360) % 360;
            const rad       = itemAngle * DEG_TO_RAD;
            const x         = Math.sin(rad) * R;
            const z         = Math.cos(rad) * R;
            const norm      = (z + R) / (2 * R); // 0=atrás, 1=frente
            const relAngle  = itemAngle > 180 ? 360 - itemAngle : itemAngle;
            const inLens    = relAngle < LENS_HALF_ANGLE;

            const scale = 0.55 + norm * 0.45;

            // ── GPU-ONLY: transform + opacity. CERO filter/blur ──
            // transform y opacity son las únicas propiedades que el GPU
            // compone sin re-paint. Esto es lo que garantiza 60fps.
            card.style.transform = `translate(-50%,-50%) translate3d(${x}px, 0px, 0px) scale(${scale})`;
            card.style.opacity   = inLens ? "1" : `${0.12 + norm * 0.38}`;
            card.style.zIndex    = `${Math.round(norm * 100)}`;

            // ── Mutar el inner SOLO cuando cruza el umbral ──
            // Evita escribir al DOM 60 veces por segundo por tarjeta
            const wasInLens = lensState.current[i];
            if (wasInLens !== inLens) {
                lensState.current[i] = inLens;
                const inner = innerRefs.current[i];
                if (inner) {
                    if (inLens) {
                        inner.style.background  = "rgba(255,255,255,0.97)";
                        inner.style.borderColor = "rgba(255,255,255,1)";
                        inner.style.boxShadow   = lensCardShadows[i];
                    } else {
                        inner.style.background  = "rgba(255,255,255,0.40)";
                        inner.style.borderColor = "rgba(255,255,255,0.50)";
                        inner.style.boxShadow   = "0 4px 12px rgba(0,0,0,0.04)";
                    }
                }
            }
        }

        rafRef.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        updateR();
        window.addEventListener("resize", updateR, { passive: true });
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", updateR);
        };
    }, [tick, updateR]);

    return (
        <section
            id="ecosistema"
            className="relative w-full py-28 overflow-hidden select-none"
            style={{ background: "linear-gradient(175deg, #EEF4FF 0%, #F0F7FF 45%, #F8FAFC 100%)", contain: "content" }}
        >
            {/* ── Decoración de fondo (estática, no afecta rendimiento) ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12]"
                     style={{ background: "radial-gradient(circle, #00d2ff 0%, transparent 70%)" }} />
                <div className="absolute -bottom-44 -right-44 w-[600px] h-[600px] rounded-full opacity-[0.06]"
                     style={{ background: "radial-gradient(circle, #0047AB 0%, transparent 65%)" }} />
                <div className="absolute inset-0 opacity-[0.02]"
                     style={{
                         backgroundImage: "linear-gradient(rgba(0,71,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,71,171,1) 1px, transparent 1px)",
                         backgroundSize: "64px 64px"
                     }} />
            </div>

            {/* ── Encabezado ── */}
            <m.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="text-center mb-12 px-6 relative z-10"
            >
                <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full text-[10px] font-black tracking-[0.22em] uppercase mb-5 border"
                      style={{ background: "rgba(0,71,171,0.06)", color: "#0047AB", borderColor: "rgba(0,71,171,0.18)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                    Ecosistema 360
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Respaldado por{" "}
                    <span style={{ background: "linear-gradient(135deg, #0047AB 0%, #00d2ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        tecnología de clase mundial
                    </span>
                </h2>
                <p className="mt-4 text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    Desde motores de IA de Google y OpenAI hasta infraestructura enterprise en AWS, Azure y Kubernetes.
                </p>
            </m.div>

            {/* ── Escena 3D ── */}
            <div
                className="relative mx-auto flex items-center justify-center"
                style={{ height: `${CARD_H + 80}px`, contain: "layout style" }}
            >
                <div style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, position: "relative" }}>
                    {partners.map((partner, i) => (
                        <div
                            key={partner.name}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            style={{
                                position           : "absolute",
                                left               : "50%",
                                top                : "50%",
                                width              : `${CARD_W}px`,
                                height             : `${CARD_H}px`,
                                willChange         : "transform, opacity",
                                backfaceVisibility : "hidden",
                                transform          : "translate(-50%,-50%) translate3d(0,0,0)",
                                opacity            : 0,
                            }}
                        >
                            <div
                                ref={(el) => { innerRefs.current[i] = el; }}
                                className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2.5"
                                style={{
                                    background         : "rgba(255,255,255,0.40)",
                                    border             : "1px solid rgba(255,255,255,0.50)",
                                    boxShadow          : "0 4px 12px rgba(0,0,0,0.04)",
                                    backfaceVisibility : "hidden",
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                                    style={{
                                        background : `linear-gradient(135deg, ${partner.color}20, ${partner.color}40)`,
                                        border     : `1.5px solid ${partner.color}55`,
                                    }}
                                >
                                    <partner.Icon size={26} style={{ color: partner.color }} />
                                </div>
                                <span
                                    className="text-[9px] font-black tracking-[0.16em] uppercase text-center leading-tight px-1 text-slate-600"
                                >
                                    {partner.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── LENTE GLASS ── */}
                <div
                    className="absolute z-[200] pointer-events-none overflow-hidden"
                    style={{
                        width       : "212px",
                        height      : `${CARD_H + 30}px`,
                        borderRadius: "22px",
                        background  : "rgba(255,255,255,0.06)",
                        border      : "1.5px solid rgba(255,255,255,0.88)",
                        boxShadow   : "0 0 0 1px rgba(0,71,171,0.07), 0 28px 60px rgba(0,71,171,0.14), inset 0 2px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(0,71,171,0.05)",
                    }}
                >
                    {/* Reflejo superior */}
                    <div className="absolute top-0 left-5 right-5 h-[1.5px]"
                         style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)" }} />
                    {/* Reflejo inferior */}
                    <div className="absolute bottom-0 left-8 right-8 h-[1px]"
                         style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} />

                    {/* Scanner */}
                    <div
                        ref={scannerRef}
                        className="absolute left-0 right-0 h-[2px]"
                        style={{
                            top       : "0%",
                            background: "linear-gradient(90deg, transparent 0%, #00d2ff 35%, #0047AB 50%, #00d2ff 65%, transparent 100%)",
                            boxShadow : "0 0 14px rgba(0,210,255,0.9), 0 0 28px rgba(0,210,255,0.25)",
                            opacity   : 0.95,
                            willChange: "top",
                        }}
                    />

                    {/* Cruces HUD */}
                    {([
                        { top: 7, left: 7 },
                        { top: 7, right: 7 },
                        { bottom: 7, left: 7 },
                        { bottom: 7, right: 7 },
                    ] as React.CSSProperties[]).map((pos, i) => (
                        <div key={i} className="absolute w-4 h-4" style={pos}>
                            <div className="absolute top-0 left-0 w-4 h-[1.5px]" style={{ background: "#00d2ff", opacity: 0.95 }} />
                            <div className="absolute top-0 left-0 w-[1.5px] h-4" style={{ background: "#00d2ff", opacity: 0.95 }} />
                        </div>
                    ))}

                    <div className="absolute -bottom-7 left-0 right-0 flex justify-center">
                        <span className="text-[8px] font-black tracking-[0.3em] text-[#0047AB] opacity-55 uppercase">● SCAN</span>
                    </div>
                </div>

                {/* Fades laterales */}
                <div className="absolute inset-y-0 left-0 z-[190] pointer-events-none w-32 md:w-48"
                     style={{ background: "linear-gradient(to right, #EEF4FF, transparent)" }} />
                <div className="absolute inset-y-0 right-0 z-[190] pointer-events-none w-32 md:w-48"
                     style={{ background: "linear-gradient(to left, #F8FAFC, transparent)" }} />
            </div>

            {/* ── Tags ── */}
            <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="flex flex-wrap items-center justify-center gap-2 mt-16 px-4 relative z-10 max-w-5xl mx-auto"
            >
                {partners.map((p) => (
                    <span
                        key={p.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-[0.14em] uppercase border cursor-default"
                        style={{
                            background  : `${p.color}12`,
                            color       : p.color === "#475569" ? "#334155" : p.color,
                            borderColor : `${p.color}33`,
                        }}
                    >
                        <p.Icon size={9} style={{ color: p.color === "#475569" ? "#334155" : p.color }} />
                        {p.label}
                    </span>
                ))}
            </m.div>
        </section>
    );
};
