"use client";
import React, { useState, useEffect } from "react";
import { m, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue, useAnimationFrame } from "framer-motion";
import {
    TransbankSvg, MercadoPagoSvg, AnthropicSvg, AwsSvg, AzureSvg, GoogleCloudSvg,
    DockerSvg, KubernetesSvg, OpenAiSvg, GeminiSvg, NvidiaSvg, LangChainSvg,
    SnowflakeSvg, DatadogSvg, DatabricksSvg, CiCdSvg, UiPathSvg, ZeroTrustSvg,
    NextJsSvg, GraphQlSvg, VercelSvg, SiiSvg
} from "@/components/ui/BrandLogos";

// ── Tech Ecosystem Data ───────────────────────────────────────────────────────
interface Tech {
    name: string;
    label: string;
    logo: React.ReactNode;
}

const techBase: Tech[] = [
    { name: "Transbank",  label: "TRANSBANK",  logo: <TransbankSvg /> },
    { name: "Mercado Pago",label: "MERCADO PAGO",logo: <MercadoPagoSvg /> },
    { name: "Anthropic",  label: "CLAUDE",     logo: <AnthropicSvg /> },
    { name: "AWS",        label: "AWS",        logo: <AwsSvg /> },
    { name: "Azure",      label: "AZURE",      logo: <AzureSvg /> },
    { name: "GCP",        label: "GCP",        logo: <GoogleCloudSvg /> },
    { name: "Docker",     label: "DOCKER",     logo: <DockerSvg /> },
    { name: "Kubernetes", label: "K8S",        logo: <KubernetesSvg /> },
    { name: "OpenAI",     label: "GPT-4O",     logo: <OpenAiSvg /> },
    { name: "Gemini",     label: "GEMINI",     logo: <GeminiSvg /> },
    { name: "NVIDIA",     label: "NVIDIA",     logo: <NvidiaSvg /> },
    { name: "LangChain",  label: "LANGCHAIN",  logo: <LangChainSvg /> },
    { name: "Snowflake",  label: "SNOWFLAKE",  logo: <SnowflakeSvg /> },
    { name: "Datadog",    label: "DATADOG",    logo: <DatadogSvg /> },
    { name: "Databricks", label: "DATABRICKS", logo: <DatabricksSvg /> },
    { name: "CI/CD",      label: "CI/CD",      logo: <CiCdSvg /> },
    { name: "UiPath",     label: "UIPATH",     logo: <UiPathSvg /> },
    { name: "Zero Trust", label: "ZERO TRUST", logo: <ZeroTrustSvg /> },
    { name: "Next.js",    label: "NEXT.JS",    logo: <NextJsSvg /> },
    { name: "GraphQL",    label: "GRAPHQL",    logo: <GraphQlSvg /> },
    { name: "Vercel",     label: "VERCEL",     logo: <VercelSvg /> },
    { name: "SII Chile",  label: "SII CHILE",  logo: <SiiSvg /> },
];

const pillsMerged = [
    { label: "TRANSBANK",  bg: "bg-red-50",    text: "text-red-600"    },
    { label: "MERCADO PAGO",bg: "bg-blue-50",  text: "text-blue-500"   },
    { label: "CLAUDE",     bg: "bg-slate-100", text: "text-slate-500"  },
    { label: "AWS",        bg: "bg-orange-50", text: "text-orange-500" },
    { label: "AZURE",      bg: "bg-blue-50",   text: "text-blue-500"   },
    { label: "GCP",        bg: "bg-sky-50",    text: "text-sky-500"    },
    { label: "DOCKER",     bg: "bg-cyan-50",   text: "text-cyan-600"   },
    { label: "K8S",        bg: "bg-indigo-50", text: "text-indigo-500" },
    { label: "GPT-4O",     bg: "bg-emerald-50",text: "text-emerald-600"},
    { label: "GEMINI",     bg: "bg-violet-50", text: "text-violet-500" },
    { label: "NVIDIA",     bg: "bg-lime-50",   text: "text-lime-600"   },
    { label: "LANGCHAIN",  bg: "bg-teal-50",   text: "text-teal-600"   },
    { label: "SNOWFLAKE",  bg: "bg-sky-50",    text: "text-sky-500"    },
    { label: "DATADOG",    bg: "bg-purple-50", text: "text-purple-500" },
    { label: "DATABRICKS", bg: "bg-red-50",    text: "text-red-500"    },
    { label: "CI/CD",      bg: "bg-blue-50",   text: "text-blue-500"   },
    { label: "UIPATH",     bg: "bg-orange-50", text: "text-orange-500" },
    { label: "ZERO TRUST", bg: "bg-amber-50",  text: "text-amber-600"  },
    { label: "NEXT.JS",    bg: "bg-slate-100", text: "text-slate-500"  },
    { label: "GRAPHQL",    bg: "bg-pink-50",   text: "text-pink-500"   },
    { label: "VERCEL",     bg: "bg-slate-100", text: "text-slate-500"  },
    { label: "SII CHILE",  bg: "bg-indigo-50", text: "text-indigo-600" },
];

// TRIANGULATED INFINITE LOOP ARRAY
const TOTAL_TECHS = techBase.length;
const loopedTech = [...techBase, ...techBase, ...techBase];

interface Dimensions {
    w: number;
    gap: number;
    step: number;
    maxDist: number;
    viewportW: number;
}

// ── Focus-Snap Interactive Glass Card ───────────────────────────────────────
const GlassCard = ({ tech, index, dragX, dim }: { tech: Tech; index: number; dragX: MotionValue<number>; dim: Dimensions }) => {
    // Exact center position of the screen
    const screenCenter = dim.viewportW / 2;

    // Mathematical position of this card locally within the flex track (assuming 0 padding start)
    const cardLocalCenter = index * dim.step + (dim.w / 2);

    // Single unified useTransform: Distance physically from the card to the perfect center of the device screen
    const offsetFromCenter = useTransform(dragX, (x) => {
        const cardGlobalCenter = cardLocalCenter + x;
        return cardGlobalCenter - screenCenter;
    });

    // Apple VisionOS style interpolations with 3 cards in focus
    const scale = useTransform(offsetFromCenter, [-dim.maxDist, -dim.step, 0, dim.step, dim.maxDist], [0.8, 1.15, 1.2, 1.15, 0.8]);
    const opacity = useTransform(offsetFromCenter, [-dim.maxDist, -dim.step, 0, dim.step, dim.maxDist], [0.3, 1, 1, 1, 0.3]);
    const blurObj = useTransform(offsetFromCenter, [-dim.maxDist, -dim.step, 0, dim.step, dim.maxDist], [10, 0, 0, 0, 10]);
    const filter = useTransform(blurObj, (val) => `blur(${val}px)`);
    const shadow = useTransform(offsetFromCenter, [-dim.step, 0, dim.step], [
        "0 20px 50px rgba(0,0,0,0.15), 0 0 0px rgba(0,174,239,0)",
        "0 20px 50px rgba(0,0,0,0.15), 0 0 60px rgba(0,174,239,0.3)",
        "0 20px 50px rgba(0,0,0,0.15), 0 0 0px rgba(0,174,239,0)",
    ]);

    // Heavily organic springs
    const spScale = useSpring(scale, { stiffness: 200, damping: 25 });
    const spOpac = useSpring(opacity, { stiffness: 200, damping: 25 });
    const spShadow = useSpring(shadow, { stiffness: 200, damping: 25 });

    return (
        <m.div
            className="flex flex-col items-center justify-center shrink-0 rounded-[2.5rem] bg-white border border-gray-100"
            style={{
                width: dim.w,
                height: dim.w,
                scale: spScale,
                opacity: spOpac,
                filter: filter,
                boxShadow: spShadow,
                // Make sure center card sits on top of others
                zIndex: useTransform(scale, (s) => Math.round(s * 100)),
            }}
        >
            <div className="relative flex items-center justify-center w-[65%] h-[65%] mb-2">
                {tech.logo}
            </div>
            <span className="text-[10px] md:text-xs font-black tracking-widest text-[#00AEEF] uppercase mt-2 px-2 text-center pointer-events-none">
                {tech.label}
            </span>
        </m.div>
    );
};

// ── Main Carousel Component ───────────────────────────────────────────────────
export const PartnersEcosystem = () => {
    const dragX = useMotionValue(0);
    const [dim, setDim] = useState<Dimensions | null>(null);
    const [initialDragSet, setInitialDragSet] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize dimensions & perfect CSS-free centering
    useEffect(() => {
        const updateDims = () => {
            const vW = window.innerWidth;
            const isDesktop = vW >= 1024;
            const isTablet = vW >= 768;

            const w = isDesktop ? 200 : isTablet ? 160 : 140;
            const gap = isDesktop ? 48 : isTablet ? 32 : 24;
            const step = w + gap;
            const maxDist = step * 2.5;

            setDim({ w, gap, step, maxDist, viewportW: vW });

            // Exactly center the very first element of the MIDDLE set (index 20)
            const middleSetStartIndex = TOTAL_TECHS;
            const cardCenterInTrack = middleSetStartIndex * step + (w / 2);
            // We want cardGlobalCenter to equal viewportW / 2
            // cardGlobalCenter = cardCenterInTrack + dragX
            // dragX = (viewportW / 2) - cardCenterInTrack
            const pureCenterDrag = (vW / 2) - cardCenterInTrack;

            // Only snap on massive resizes, don't interrupt active drag interactions
            if (!initialDragSet || vW !== window.innerWidth) {
                dragX.set(pureCenterDrag);
                setInitialDragSet(true);
            }
        };

        updateDims();
        window.addEventListener("resize", updateDims);
        return () => window.removeEventListener("resize", updateDims);
    }, [dragX, initialDragSet]);

    // Constant Seamless Teleportation Logic
    useMotionValueEvent(dragX, "change", (latest) => {
        if (!dim) return;

        const setWidth = TOTAL_TECHS * dim.step;
        // Perfect center position when array[20] is at 50vw
        const originDrag = (dim.viewportW / 2) - (TOTAL_TECHS * dim.step + (dim.w / 2));

        // If dragged left past half of the third set, snap right into second set
        if (latest < originDrag - (setWidth * 0.5)) {
            dragX.set(latest + setWidth);
        }
        // If dragged right past half of the first set, snap left into second set
        else if (latest > originDrag + (setWidth * 0.5)) {
            dragX.set(latest - setWidth);
        }
    });

    // Auto-scroll loop
    useAnimationFrame((time, delta) => {
        if (!dim || isDragging) return;
        // Smooth slide left: approx 30px per second
        const moveBy = (delta / 1000) * 30;
        dragX.set(dragX.get() - moveBy);
    });

    return (
        <section
            id="ecosistema"
            className="relative w-full py-24 md:py-40 overflow-hidden bg-[#FAFAFA]"
        >
            {/* ── Transition & Blends ── */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#010912] to-transparent z-10 pointer-events-none w-full" />
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#00AEEF] to-transparent z-10 pointer-events-none w-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00AEEF]/[0.02] to-transparent pointer-events-none" />

            {/* ── Header ── */}
            <div className="max-w-7xl mx-auto px-6 relative z-20">
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[10px] uppercase font-black tracking-[0.22em] text-[#00AEEF] mb-5">
                        ✦ Ecosistema 360
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4">
                        Integración perfecta con <br className="hidden md:block" />
                        <span className="text-[#00AEEF]">estándares globales</span>
                    </h2>
                </m.div>
            </div>

            {/* ── Seamless 3D Carousel Track ── */}
            <div 
                className={`relative flex items-center py-16 w-full z-20 transition-opacity duration-500 ease-in-out ${dim ? "opacity-100" : "opacity-0"}`}
                style={{ 
                    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", 
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" 
                }}
            >
                {dim && (
                    <m.div
                        drag="x"
                        dragConstraints={{ left: -10000, right: 10000 }}
                        dragElastic={1}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        className="flex cursor-grab active:cursor-grabbing w-max items-center touch-pan-y"
                        style={{
                            x: dragX,
                            gap: dim.gap,
                        }}
                    >
                        {loopedTech.map((tech, i) => (
                            <GlassCard 
                                key={`${tech.name}-${i}`} 
                                tech={tech} 
                                index={i} 
                                dragX={dragX} 
                                dim={dim} 
                            />
                        ))}
                    </m.div>
                )}
            </div>

            {/* ── Pills Header ── */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 mt-4 md:mt-8">
                <m.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-[10px] md:text-xs text-slate-400 tracking-widest uppercase mb-8 pointer-events-none"
                >
                    ← Experimenta la fluidez →
                </m.p>
                
                <m.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-4xl mx-auto"
                >
                    {pillsMerged.map((p) => (
                        <span key={p.label} className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider shadow-sm transition-transform duration-300 hover:scale-105 cursor-default ${p.bg} ${p.text}`}>
                            {p.label}
                        </span>
                    ))}
                </m.div>
            </div>
        </section>
    );
};
