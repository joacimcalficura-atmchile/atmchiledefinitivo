"use client";
import React, { useState, useEffect } from "react";
import { m, useMotionValue, useTransform, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
// Imports nombrados (no `import * as`): permiten tree-shaking y evitan
// arrastrar los ~3.300 iconos del paquete al bundle del cliente.
import {
    siAnthropic, siCloudflare, siDatabricks, siDatadog, siDocker,
    siGithubactions, siGooglecloud, siGooglegemini, siGraphql, siKubernetes,
    siLangchain, siNextdotjs, siNvidia, siSnowflake, siTerraform,
    siUipath, siVercel,
    type SimpleIcon,
} from "simple-icons";

// ── Simple Icon renderer ──────────────────────────────────────────────────────
const SI = ({ icon, size = "100%" }: { icon: SimpleIcon; size?: string | number }) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        width={size} height={size} aria-label={icon.title}>
        <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
);

// ── AWS ───────────────────────────────────────────────────────────────────────
const AwsSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 0 25.5 24" width="100%" height="100%"
        aria-label="AWS" style={{ overflow: "visible" }}>
        <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.152.368.272.576a.35.35 0 0 1 .056.184.327.327 0 0 1-.16.264l-.528.352a.399.399 0 0 1-.216.072.384.384 0 0 1-.304-.16 3.153 3.153 0 0 1-.36-.472 8.938 8.938 0 0 1-.312-.592c-.784.928-1.768 1.392-2.952 1.392-.84 0-1.512-.24-2.008-.72S0 11.2 0 10.4c0-.856.304-1.552.92-2.08.616-.528 1.432-.792 2.464-.792.344 0 .696.032 1.064.088.368.056.744.144 1.136.248V7.28c0-.768-.16-1.304-.472-1.616-.32-.312-.864-.464-1.64-.464-.352 0-.712.04-1.08.128a8.067 8.067 0 0 0-1.08.336 2.88 2.88 0 0 1-.352.128.61.61 0 0 1-.16.024c-.144 0-.216-.104-.216-.32V4.88c0-.168.024-.296.08-.368.056-.072.16-.144.312-.216.352-.184.776-.336 1.272-.464A6.13 6.13 0 0 1 3.8 3.6c1.248 0 2.16.284 2.744.856.576.568.872 1.432.872 2.592v3.416l-.653-.428zm-3.448.84c.328 0 .664-.056.992-.168.328-.112.624-.32.872-.608.144-.176.264-.376.32-.608.056-.232.088-.512.088-.84V9.22a8.813 8.813 0 0 0-.928-.176 7.716 7.716 0 0 0-.944-.072c-.68 0-1.176.136-1.512.416-.336.272-.496.664-.496 1.176 0 .48.12.84.368 1.088.24.24.592.36 1.04.36l.2-.136zm8.24 1.112c-.192 0-.32-.032-.4-.104-.08-.064-.152-.208-.216-.408L8.6 4.828c-.064-.208-.096-.344-.096-.416 0-.168.08-.264.24-.264H9.7c.2 0 .336.032.408.104.08.064.144.208.208.408l1.44 5.664L13.12 4.66c.056-.208.12-.344.2-.408.08-.072.224-.104.416-.104h.84c.2 0 .336.032.416.104.072.064.144.208.2.408l1.392 5.728 1.48-5.728c.064-.208.136-.344.208-.408.08-.072.208-.104.4-.104h.96c.16 0 .248.088.248.264 0 .056-.008.112-.024.176-.016.064-.04.152-.08.272l-2.32 6.648c-.064.208-.136.344-.216.408-.08.072-.216.104-.4.104h-.904c-.2 0-.336-.032-.416-.104-.08-.08-.152-.208-.208-.416l-1.368-5.504-1.368 5.496c-.064.208-.128.344-.208.416-.08.072-.224.104-.416.104h-.904zm12.44.264c-.544 0-1.088-.064-1.616-.192a5.09 5.09 0 0 1-1.216-.448.715.715 0 0 1-.312-.312.79.79 0 0 1-.056-.312v-.56c0-.216.08-.32.232-.32.056 0 .112.008.168.024s.144.064.24.12c.32.144.664.256 1.032.336.376.08.744.12 1.12.12.592 0 1.056-.104 1.384-.312.328-.208.496-.504.496-.888 0-.264-.088-.488-.264-.672-.176-.184-.512-.352-.992-.504l-1.424-.44c-.72-.224-1.248-.56-1.584-1.008-.336-.44-.504-.936-.504-1.48 0-.424.088-.8.272-1.12.184-.32.432-.6.736-.824.304-.232.648-.4 1.048-.52.4-.12.816-.176 1.248-.176.216 0 .44.016.664.04.232.024.448.064.664.112.208.04.408.096.6.16.192.072.344.144.456.224.152.096.264.2.328.312.064.104.096.24.096.408v.52c0 .216-.08.328-.232.328-.08 0-.208-.04-.376-.12-.568-.256-1.208-.384-1.92-.384-.544 0-.968.088-1.264.272-.296.184-.448.456-.448.832 0 .264.096.488.296.672.2.184.568.368 1.104.528l1.392.44c.712.224 1.224.544 1.536.952.312.408.464.88.464 1.408 0 .432-.088.824-.264 1.168a2.7 2.7 0 0 1-.744.888c-.32.248-.7.432-1.144.56a4.944 4.944 0 0 1-1.456.2z" />
        <path fill="#FF9900" d="M21.543 17.624c-2.72 2.104-6.672 3.224-10.072 3.224-4.76 0-9.04-1.76-12.28-4.688-.256-.232-.024-.544.28-.368 3.504 2.04 7.832 3.272 12.288 3.272 3.008 0 6.32-.624 9.36-1.92.456-.2.84.304.424.48z" />
        <path fill="#FF9900" d="M22.547 16.472c-.344-.44-2.28-.208-3.144-.104-.264.032-.304-.2-.064-.376 1.536-1.08 4.064-.768 4.36-.408.296.368-.08 2.904-1.52 4.116-.224.188-.432.088-.336-.16.32-.8 1.044-2.628.704-3.068z" />
    </svg>
);

// ── Azure ─────────────────────────────────────────────────────────────────────
const AzureSvg = ({ uid }: { uid: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="100%" height="100%" aria-label="Microsoft Azure">
        <defs>
            <linearGradient id={`${uid}-a`} x1="15.59" y1="3.6" x2="9.04" y2="14.99" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#114a8b" /><stop offset="1" stopColor="#0669bc" />
            </linearGradient>
            <linearGradient id={`${uid}-b`} x1="11.97" y1="14.06" x2="8.81" y2="8.74" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopOpacity=".3" /><stop offset=".321" stopOpacity=".1" /><stop offset="1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${uid}-c`} x1="10.1" y1="3.72" x2="17.31" y2="17.79" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3ccbf4" /><stop offset="1" stopColor="#2892df" />
            </linearGradient>
        </defs>
        <path d="M6.18 1.5H11.87L5.9 16.7a.67.67 0 0 1-.63.43H1.13a.67.67 0 0 1-.63-.88L5.55 2.03A.67.67 0 0 1 6.18 1.5z" fill={`url(#${uid}-a)`} />
        <path d="M12.48 11.93H5.17L3.83 16.25l-.23 1.04L12.73 17z" fill={`url(#${uid}-b)`} />
        <path d="M11.87 1.5a.67.67 0 0 0-.63.44L5.3 16.24a.67.67 0 0 0 .63.89H16.9A.67.67 0 0 0 17.5 16.36l-1.15-3.5H12.47l1.15-4.09L15.8 2.17A.67.67 0 0 0 15.18 1.5H11.87Z" fill={`url(#${uid}-c)`} />
    </svg>
);

// ── OpenAI ────────────────────────────────────────────────────────────────────
const OpenAISvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" aria-label="OpenAI">
        <path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zm-9.022 12.608a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.01 14.025a4.5 4.5 0 0 1-1.67-6.129zm16.55 3.868-5.814-3.355 2.02-1.168a.076.076 0 0 1 .071 0l4.818 2.772a4.498 4.498 0 0 1-.678 8.112v-5.577a.79.79 0 0 0-.417-.784zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.35 9.208V6.876a.073.073 0 0 1 .028-.061l4.816-2.771a4.5 4.5 0 0 1 6.751 4.66zm-12.64 4.162L6.24 11.74a.08.08 0 0 1-.038-.057V6.1a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.66 5.48a.795.795 0 0 0-.396.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" />
    </svg>
);

// ── Tech Ecosystem Data ───────────────────────────────────────────────────────
interface Tech {
    name: string;
    label: string;
    logo: React.ReactNode;
}

const techBase: Tech[] = [
    { name: "AWS",        label: "AWS",        logo: <AwsSvg /> },
    { name: "Azure",      label: "AZURE",      logo: <AzureSvg uid="geco-az" /> },
    { name: "GCP",        label: "GCP",        logo: <SI icon={siGooglecloud} /> },
    { name: "Docker",     label: "DOCKER",     logo: <SI icon={siDocker} /> },
    { name: "Kubernetes", label: "K8S",        logo: <SI icon={siKubernetes} /> },
    { name: "Terraform",  label: "TERRAFORM",  logo: <SI icon={siTerraform} /> },
    { name: "GPT-4o",     label: "GPT-4O",     logo: <OpenAISvg /> },
    { name: "Claude",     label: "CLAUDE",     logo: <SI icon={siAnthropic} /> },
    { name: "Gemini",     label: "GEMINI",     logo: <SI icon={siGooglegemini} /> },
    { name: "NVIDIA",     label: "NVIDIA",     logo: <SI icon={siNvidia} /> },
    { name: "LangChain",  label: "LANGCHAIN",  logo: <SI icon={siLangchain} /> },
    { name: "Snowflake",  label: "SNOWFLAKE",  logo: <SI icon={siSnowflake} /> },
    { name: "Datadog",    label: "DATADOG",    logo: <SI icon={siDatadog} /> },
    { name: "Databricks", label: "DATABRICKS", logo: <SI icon={siDatabricks} /> },
    { name: "CI/CD",      label: "CI/CD",      logo: <SI icon={siGithubactions} /> },
    { name: "UiPath",     label: "UIPATH",     logo: <SI icon={siUipath} /> },
    { name: "Zero Trust", label: "ZERO TRUST", logo: <SI icon={siCloudflare} /> },
    { name: "Next.js",    label: "NEXT.JS",    logo: <SI icon={siNextdotjs} /> },
    { name: "GraphQL",    label: "GRAPHQL",    logo: <SI icon={siGraphql} /> },
    { name: "Vercel",     label: "VERCEL",     logo: <SI icon={siVercel} /> },
];

const pillsMerged = [
    { label: "AWS",        bg: "bg-orange-50", text: "text-orange-500" },
    { label: "AZURE",      bg: "bg-blue-50",   text: "text-blue-500"   },
    { label: "GCP",        bg: "bg-sky-50",    text: "text-sky-500"    },
    { label: "DOCKER",     bg: "bg-cyan-50",   text: "text-cyan-600"   },
    { label: "K8S",        bg: "bg-indigo-50", text: "text-indigo-500" },
    { label: "TERRAFORM",  bg: "bg-purple-50", text: "text-purple-500" },
    { label: "GPT-4O",     bg: "bg-emerald-50",text: "text-emerald-600"},
    { label: "CLAUDE",     bg: "bg-slate-100", text: "text-slate-500"  },
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

    // Apple VisionOS style interpolations
    const scale = useTransform(offsetFromCenter, [-dim.maxDist, 0, dim.maxDist], [0.8, 1.2, 0.8]);
    const opacity = useTransform(offsetFromCenter, [-dim.maxDist, 0, dim.maxDist], [0.3, 1, 0.3]);
    const blurObj = useTransform(offsetFromCenter, [-dim.maxDist, 0, dim.maxDist], [10, 0, 10]);
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
            className="flex flex-col items-center justify-center shrink-0 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/30"
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
            <div className="relative flex items-center justify-center w-[35%] h-[35%] mb-2">
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

    return (
        <section
            id="ecosistema"
            className="relative w-full py-24 md:py-40 overflow-hidden bg-[#FAFAFA]"
        >
            {/* ── Transition & Blends ── */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#010912] to-transparent z-10 pointer-events-none w-full" />
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#00AEEF] to-transparent z-10 pointer-events-none w-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none w-full" />

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
                        dragElastic={0.2}
                        dragTransition={{ power: 0.3, timeConstant: 200 }}
                        className="flex cursor-grab active:cursor-grabbing w-max items-center"
                        style={{
                            x: dragX,
                            gap: dim.gap,
                            // SSR: padding left/right removed to avoid calc mismatches 
                            // as positioning is entirely controlled by `dragX` math post-mount.
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
