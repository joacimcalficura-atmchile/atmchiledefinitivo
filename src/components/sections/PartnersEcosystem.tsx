"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { m } from "framer-motion";
import {
    siGooglecloud, siDocker, siKubernetes, siTerraform,
    siAnthropic, siGooglegemini, siNvidia, siLangchain,
    siSnowflake, siDatadog, siDatabricks, siGithubactions,
    siUipath, siCloudflare, siNextdotjs, siGraphql, siVercel,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

// ── Componente render de Simple Icons (path oficial + color oficial) ────────
const SI = ({ icon, size = 32 }: { icon: SimpleIcon; size?: number }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        aria-label={icon.title}
    >
        <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
);

// ── AWS — SVG oficial con rutas de la brand guide de Amazon ─────────────────
// (simple-icons no lo incluye por restricciones de marca de Amazon)
const AwsSvg = () => (
    // viewBox extendido a -1.5 0 25.5 24 para incluir la parte de la flecha
    // que se proyecta a x ≈ -0.8 en el path original
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1.5 0 25.5 24"
        width={30}
        height={30}
        aria-label="Amazon Web Services"
        style={{ overflow: "visible" }}
    >
        <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.152.368.272.576a.35.35 0 0 1 .056.184.327.327 0 0 1-.16.264l-.528.352a.399.399 0 0 1-.216.072.384.384 0 0 1-.304-.16 3.153 3.153 0 0 1-.36-.472 8.938 8.938 0 0 1-.312-.592c-.784.928-1.768 1.392-2.952 1.392-.84 0-1.512-.24-2.008-.72S0 11.2 0 10.4c0-.856.304-1.552.92-2.08.616-.528 1.432-.792 2.464-.792.344 0 .696.032 1.064.088.368.056.744.144 1.136.248V7.28c0-.768-.16-1.304-.472-1.616-.32-.312-.864-.464-1.64-.464-.352 0-.712.04-1.08.128a8.067 8.067 0 0 0-1.08.336 2.88 2.88 0 0 1-.352.128.61.61 0 0 1-.16.024c-.144 0-.216-.104-.216-.32V4.88c0-.168.024-.296.08-.368.056-.072.16-.144.312-.216.352-.184.776-.336 1.272-.464A6.13 6.13 0 0 1 3.8 3.6c1.248 0 2.16.284 2.744.856.576.568.872 1.432.872 2.592v3.416l-.653-.428zm-3.448.84c.328 0 .664-.056.992-.168.328-.112.624-.32.872-.608.144-.176.264-.376.32-.608.056-.232.088-.512.088-.84V9.22a8.813 8.813 0 0 0-.928-.176 7.716 7.716 0 0 0-.944-.072c-.68 0-1.176.136-1.512.416-.336.272-.496.664-.496 1.176 0 .48.12.84.368 1.088.24.24.592.36 1.04.36l.2-.136zm8.24 1.112c-.192 0-.32-.032-.4-.104-.08-.064-.152-.208-.216-.408L8.6 4.828c-.064-.208-.096-.344-.096-.416 0-.168.08-.264.24-.264H9.7c.2 0 .336.032.408.104.08.064.144.208.208.408l1.44 5.664L13.12 4.66c.056-.208.12-.344.2-.408.08-.072.224-.104.416-.104h.84c.2 0 .336.032.416.104.072.064.144.208.2.408l1.392 5.728 1.48-5.728c.064-.208.136-.344.208-.408.08-.072.208-.104.4-.104h.96c.16 0 .248.088.248.264 0 .056-.008.112-.024.176-.016.064-.04.152-.08.272l-2.32 6.648c-.064.208-.136.344-.216.408-.08.072-.216.104-.4.104h-.904c-.2 0-.336-.032-.416-.104-.08-.08-.152-.208-.208-.416l-1.368-5.504-1.368 5.496c-.064.208-.128.344-.208.416-.08.072-.224.104-.416.104h-.904zm12.44.264c-.544 0-1.088-.064-1.616-.192a5.09 5.09 0 0 1-1.216-.448.715.715 0 0 1-.312-.312.79.79 0 0 1-.056-.312v-.56c0-.216.08-.32.232-.32.056 0 .112.008.168.024s.144.064.24.12c.32.144.664.256 1.032.336.376.08.744.12 1.12.12.592 0 1.056-.104 1.384-.312.328-.208.496-.504.496-.888 0-.264-.088-.488-.264-.672-.176-.184-.512-.352-.992-.504l-1.424-.44c-.72-.224-1.248-.56-1.584-1.008-.336-.44-.504-.936-.504-1.48 0-.424.088-.8.272-1.12.184-.32.432-.6.736-.824.304-.232.648-.4 1.048-.52.4-.12.816-.176 1.248-.176.216 0 .44.016.664.04.232.024.448.064.664.112.208.04.408.096.6.16.192.072.344.144.456.224.152.096.264.2.328.312.064.104.096.24.096.408v.52c0 .216-.08.328-.232.328-.08 0-.208-.04-.376-.12-.568-.256-1.208-.384-1.92-.384-.544 0-.968.088-1.264.272-.296.184-.448.456-.448.832 0 .264.096.488.296.672.2.184.568.368 1.104.528l1.392.44c.712.224 1.224.544 1.536.952.312.408.464.88.464 1.408 0 .432-.088.824-.264 1.168a2.7 2.7 0 0 1-.744.888c-.32.248-.7.432-1.144.56a4.944 4.944 0 0 1-1.456.2z"/>
        <path fill="#FF9900" d="M21.543 17.624c-2.72 2.104-6.672 3.224-10.072 3.224-4.76 0-9.04-1.76-12.28-4.688-.256-.232-.024-.544.28-.368 3.504 2.04 7.832 3.272 12.288 3.272 3.008 0 6.32-.624 9.36-1.92.456-.2.84.304.424.48z"/>
        <path fill="#FF9900" d="M22.547 16.472c-.344-.44-2.28-.208-3.144-.104-.264.032-.304-.2-.064-.376 1.536-1.08 4.064-.768 4.36-.408.296.368-.08 2.904-1.52 4.116-.224.188-.432.088-.336-.16.32-.8 1.044-2.628.704-3.068z"/>
    </svg>
);

// ── Azure — SVG oficial (simple-icons no lo incluye, se usa el brand kit) ───
const AzureSvg = ({ uid }: { uid: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width={36} height={36} aria-label="Microsoft Azure">
        <defs>
            <linearGradient id={`${uid}-a`} x1="15.59" y1="3.6" x2="9.04" y2="14.99" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#114a8b"/>
                <stop offset="1" stopColor="#0669bc"/>
            </linearGradient>
            <linearGradient id={`${uid}-b`} x1="11.97" y1="14.06" x2="8.81" y2="8.74" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopOpacity=".3"/>
                <stop offset=".071" stopOpacity=".2"/>
                <stop offset=".321" stopOpacity=".1"/>
                <stop offset=".623" stopOpacity=".05"/>
                <stop offset="1" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id={`${uid}-c`} x1="10.1" y1="3.72" x2="17.31" y2="17.79" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3ccbf4"/>
                <stop offset="1" stopColor="#2892df"/>
            </linearGradient>
        </defs>
        <path d="M6.18 1.5H11.87L5.9 16.7a.67.67 0 0 1-.63.43H1.13a.67.67 0 0 1-.63-.88L5.55 2.03A.67.67 0 0 1 6.18 1.5z" fill={`url(#${uid}-a)`}/>
        <path d="M12.48 11.93H5.17L3.83 16.25l-.23 1.04L12.73 17z" fill={`url(#${uid}-b)`}/>
        <path d="M11.87 1.5a.67.67 0 0 0-.63.44L5.3 16.24a.67.67 0 0 0 .63.89H16.9A.67.67 0 0 0 17.5 16.36l-1.15-3.5H12.47l1.15-4.09L15.8 2.17A.67.67 0 0 0 15.18 1.5H11.87Z" fill={`url(#${uid}-c)`}/>
    </svg>
);

// ── OpenAI — SVG oficial (simple-icons no lo incluye) ──────────────────────
const OpenAISvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} aria-label="OpenAI">
        <path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zm-9.022 12.608a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.01 14.025a4.5 4.5 0 0 1-1.67-6.129zm16.55 3.868-5.814-3.355 2.02-1.168a.076.076 0 0 1 .071 0l4.818 2.772a4.498 4.498 0 0 1-.678 8.112v-5.577a.79.79 0 0 0-.417-.784zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.35 9.208V6.876a.073.073 0 0 1 .028-.061l4.816-2.771a4.5 4.5 0 0 1 6.751 4.66zm-12.64 4.162L6.24 11.74a.08.08 0 0 1-.038-.057V6.1a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.66 5.48a.795.795 0 0 0-.396.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z"/>
    </svg>
);

// ── Partner list — datos oficiales + logos correctos ────────────────────────
interface Partner {
    name:       string;
    label:      string;
    color:      string;    // color de marca oficial (para fondo de card y tags)
    glow:       string;
    logoNode:   React.ReactNode;
    bgLight?:   boolean;
}

const partners: Partner[] = [
    {
        name: "Amazon Web Services", label: "AWS",
        color: "#FF9900", glow: "rgba(255,153,0,0.6)",
        logoNode: <AwsSvg />,
    },
    {
        name: "Microsoft Azure", label: "AZURE",
        color: "#0078D4", glow: "rgba(0,120,212,0.6)",
        logoNode: <AzureSvg uid="par-az-01" />,
    },
    {
        name: "Google Cloud", label: "GCP",
        color: `#${siGooglecloud.hex}`, glow: "rgba(66,133,244,0.6)",
        logoNode: <SI icon={siGooglecloud} />,
    },
    {
        name: "Docker", label: "DOCKER",
        color: `#${siDocker.hex}`, glow: "rgba(36,150,237,0.6)",
        logoNode: <SI icon={siDocker} />,
    },
    {
        name: "Kubernetes", label: "K8S",
        color: `#${siKubernetes.hex}`, glow: "rgba(50,108,229,0.6)",
        logoNode: <SI icon={siKubernetes} />,
    },
    {
        name: "Terraform", label: "TERRAFORM",
        color: `#${siTerraform.hex}`, glow: "rgba(132,79,186,0.6)",
        logoNode: <SI icon={siTerraform} />,
    },
    {
        name: "OpenAI", label: "GPT-4o",
        color: "#10A37F", glow: "rgba(16,163,127,0.6)",
        logoNode: <OpenAISvg />,
    },
    {
        name: "Anthropic Claude", label: "CLAUDE",
        color: `#${siAnthropic.hex}`, glow: "rgba(25,25,25,0.4)",
        logoNode: <SI icon={siAnthropic} />,
        bgLight: true,
    },
    {
        name: "Google Gemini", label: "GEMINI",
        color: `#${siGooglegemini.hex}`, glow: "rgba(142,117,178,0.6)",
        logoNode: <SI icon={siGooglegemini} />,
    },
    {
        name: "NVIDIA", label: "NVIDIA",
        color: `#${siNvidia.hex}`, glow: "rgba(118,185,0,0.6)",
        logoNode: <SI icon={siNvidia} />,
    },
    {
        name: "LangChain", label: "LANGCHAIN",
        color: `#${siLangchain.hex}`, glow: "rgba(127,200,255,0.6)",
        logoNode: <SI icon={siLangchain} />,
    },
    {
        name: "Snowflake", label: "SNOWFLAKE",
        color: `#${siSnowflake.hex}`, glow: "rgba(41,181,232,0.6)",
        logoNode: <SI icon={siSnowflake} />,
    },
    {
        name: "Datadog", label: "DATADOG",
        color: `#${siDatadog.hex}`, glow: "rgba(99,44,166,0.6)",
        logoNode: <SI icon={siDatadog} />,
    },
    {
        name: "Databricks", label: "DATABRICKS",
        color: `#${siDatabricks.hex}`, glow: "rgba(255,54,33,0.6)",
        logoNode: <SI icon={siDatabricks} />,
    },
    {
        name: "GitHub Actions", label: "CI/CD",
        color: `#${siGithubactions.hex}`, glow: "rgba(32,136,255,0.6)",
        logoNode: <SI icon={siGithubactions} />,
    },
    {
        name: "UiPath", label: "UIPATH",
        color: `#${siUipath.hex}`, glow: "rgba(250,70,22,0.6)",
        logoNode: <SI icon={siUipath} />,
    },
    {
        name: "Cloudflare", label: "ZERO TRUST",
        color: `#${siCloudflare.hex}`, glow: "rgba(243,128,32,0.6)",
        logoNode: <SI icon={siCloudflare} />,
    },
    {
        name: "Next.js", label: "NEXT.JS",
        color: "#000000", glow: "rgba(71,85,105,0.4)",
        logoNode: <SI icon={siNextdotjs} />,
        bgLight: true,
    },
    {
        name: "GraphQL", label: "GRAPHQL",
        color: `#${siGraphql.hex}`, glow: "rgba(225,0,152,0.6)",
        logoNode: <SI icon={siGraphql} />,
    },
    {
        name: "Vercel", label: "VERCEL",
        color: "#000000", glow: "rgba(71,85,105,0.4)",
        logoNode: <SI icon={siVercel} />,
        bgLight: true,
    },
];

const CARD_W            = 148;
const CARD_H            = 116;
const AUTO_SPEED        = 0.006;   // rad/ms de auto-rotación
const LENS_HALF_ANGLE   = 24;
const COUNT             = partners.length;
const STEP              = 360 / COUNT;
const DEG_TO_RAD        = Math.PI / 180;

// ── Constantes de física ─────────────────────────────────────────
const INERTIA_BASE = 0.880;   // base de decaimiento (^ dt/16.67 = time-based)
const EMA_ALPHA    = 0.25;    // filtro EMA: 0=muy suave, 1=sin filtro
const DRAG_SCALE   = 0.0042;  // píxeles/ms → °/ms
const VEL_THRESH   = 0.0001;  // umbral bajo el cual satura a AUTO_SPEED

const lensCardShadows = partners.map(
    (p) => `0 12px 40px rgba(0,71,171,0.15), 0 0 24px ${p.glow}`
);

export const PartnersEcosystem = () => {
    const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
    const innerRefs  = useRef<(HTMLDivElement | null)[]>([]);
    const scannerRef = useRef<HTMLDivElement | null>(null);
    const sceneRef   = useRef<HTMLDivElement | null>(null);

    const rotRef      = useRef(0);
    const tRef        = useRef(0);
    const scanRef     = useRef(0);
    const rRef        = useRef(560);
    const rafRef      = useRef(0);
    const lensState   = useRef<boolean[]>(new Array(COUNT).fill(false));

    // ── Estado de drag / física de inercia ─────────────────────────
    const isDragging  = useRef(false);
    const dragX       = useRef(0);    // X del puntero en el evento anterior
    const velRef      = useRef(AUTO_SPEED);  // velocidad suavizada actual (°/ms)
    const rawVelRef   = useRef(0);    // velocidad bruta antes del filtro EMA

    const updateR = useCallback(() => {
        rRef.current = window.innerWidth < 768 ? 280 : 560;
    }, []);

    const tick = useCallback((now: number) => {
        if (tRef.current === 0) tRef.current = now;
        const dt = Math.min(now - tRef.current, 33);
        tRef.current = now;

        const R = rRef.current;

        if (isDragging.current) {
            // Drag activo: usar velocidad filtrada por EMA directamente
            rotRef.current = (rotRef.current + velRef.current * dt + 360) % 360;
        } else {
            // Inercia time-based: el decaimiento es independiente del framerate
            const decayFactor = Math.pow(INERTIA_BASE, dt / 16.67);
            const v = velRef.current;

            if (Math.abs(v - AUTO_SPEED) < VEL_THRESH) {
                // Ya estamos cerca de la velocidad de crucero: fijar exactamente
                velRef.current = AUTO_SPEED;
            } else {
                // Decaimiento exponencial hacia AUTO_SPEED
                velRef.current = v * decayFactor + AUTO_SPEED * (1 - decayFactor);
            }
            rotRef.current = (rotRef.current + velRef.current * dt + 360) % 360;
        }

        const angle = rotRef.current;

        scanRef.current = (scanRef.current + dt * 0.005) % 100;
        if (scannerRef.current) {
            scannerRef.current.style.top = `${scanRef.current}%`;
        }

        for (let i = 0; i < COUNT; i++) {
            const card = cardRefs.current[i];
            if (!card) continue;

            const itemAngle = (STEP * i + angle + 360) % 360;
            const rad       = itemAngle * DEG_TO_RAD;
            const x         = Math.sin(rad) * R;
            const z         = Math.cos(rad) * R;
            const norm      = (z + R) / (2 * R);
            const relAngle  = itemAngle > 180 ? 360 - itemAngle : itemAngle;
            const inLens    = relAngle < LENS_HALF_ANGLE;
            const scale     = 0.55 + norm * 0.45;

            card.style.transform = `translate(-50%,-50%) translate3d(${x}px, 0px, 0px) scale(${scale})`;
            card.style.opacity   = inLens ? "1" : `${0.12 + norm * 0.38}`;
            card.style.zIndex    = `${Math.round(norm * 100)}`;

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

    // ── Handlers de drag con filtro EMA de velocidad ──────────────────
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        isDragging.current  = true;
        dragX.current       = e.clientX;
        rawVelRef.current   = 0;          // resetear acumulador EMA
        // NO resetear velRef para evitar salto brusco; la inercia parte desde donde estaba
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const dx       = e.clientX - dragX.current;
        dragX.current  = e.clientX;

        // Velocidad bruta (píxeles por ms → °/ms) — negada por convenio de giro
        const rawVel   = dx * DRAG_SCALE;

        // Filtro EMA: suaviza spikes y vibraciones del input
        rawVelRef.current = rawVel;
        velRef.current    = EMA_ALPHA * rawVel + (1 - EMA_ALPHA) * velRef.current;
    }, []);

    const onPointerUp = useCallback(() => {
        isDragging.current = false;
        // velRef.current conserva la velocidad filtrada → inercia natural
    }, []);

    useEffect(() => {
        updateR();
        window.addEventListener("resize", updateR, { passive: true });
        velRef.current = AUTO_SPEED;   // arranca con velocidad de auto-rotación
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
            style={{
                background: "linear-gradient(175deg, #EEF4FF 0%, #F0F7FF 45%, #F8FAFC 100%)",
                contain: "content",
            }}
        >
            {/* ── Decoración de fondo ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12]"
                    style={{ background: "radial-gradient(circle, #00d2ff 0%, transparent 70%)" }} />
                <div className="absolute -bottom-44 -right-44 w-[600px] h-[600px] rounded-full opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #0047AB 0%, transparent 65%)" }} />
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0,71,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,71,171,1) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
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
                <span
                    className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full text-[10px] font-black tracking-[0.22em] uppercase mb-5 border"
                    style={{ background: "rgba(0,71,171,0.06)", color: "#0047AB", borderColor: "rgba(0,71,171,0.18)" }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
                    Ecosistema 360
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    Respaldado por{" "}
                    <span style={{
                        background: "linear-gradient(135deg, #0047AB 0%, #00d2ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        tecnología de clase mundial
                    </span>
                </h2>
                <p className="mt-4 text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    Desde motores de IA de Google y OpenAI hasta infraestructura enterprise en AWS, Azure y Kubernetes.
                </p>
            </m.div>

            {/* ── Escena 3D — drag interactivo ── */}
            <div
                ref={sceneRef}
                className="relative mx-auto flex items-center justify-center"
                style={{
                    height: `${CARD_H + 80}px`,
                    contain: "layout style",
                    cursor: isDragging.current ? "grabbing" : "grab",
                    touchAction: "none",   // evita scroll al arrastrar en móvil
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <div style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, position: "relative" }}>
                    {partners.map((partner, i) => (
                        <div
                            key={partner.name}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: `${CARD_W}px`,
                                height: `${CARD_H}px`,
                                willChange: "transform, opacity",
                                backfaceVisibility: "hidden",
                                transform: "translate(-50%,-50%) translate3d(0,0,0)",
                                opacity: 0,
                            }}
                        >
                            <div
                                ref={(el) => { innerRefs.current[i] = el; }}
                                className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2.5"
                                style={{
                                    background: "rgba(255,255,255,0.40)",
                                    border: "1px solid rgba(255,255,255,0.50)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                {/* ── Card: contenedor del logo ── */}
                                <div
                                    className="flex items-center justify-center rounded-xl"
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        padding: "9px",
                                        background: partner.bgLight
                                            ? "rgba(255,255,255,0.96)"
                                            : `linear-gradient(135deg, ${partner.color}18, ${partner.color}35)`,
                                        border: `1.5px solid ${partner.color}${partner.bgLight ? "20" : "44"}`,
                                    }}
                                >
                                    {partner.logoNode}
                                </div>

                                <span className="text-[9px] font-black tracking-[0.16em] uppercase text-center leading-tight px-1 text-slate-600">
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
                        width: "212px",
                        height: `${CARD_H + 30}px`,
                        borderRadius: "22px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1.5px solid rgba(255,255,255,0.88)",
                        boxShadow: "0 0 0 1px rgba(0,71,171,0.07), 0 28px 60px rgba(0,71,171,0.14), inset 0 2px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(0,71,171,0.05)",
                    }}
                >
                    <div className="absolute top-0 left-5 right-5 h-[1.5px]"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)" }} />
                    <div className="absolute bottom-0 left-8 right-8 h-[1px]"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} />

                    <div
                        ref={scannerRef}
                        className="absolute left-0 right-0 h-[2px]"
                        style={{
                            top: "0%",
                            background: "linear-gradient(90deg, transparent 0%, #00d2ff 35%, #0047AB 50%, #00d2ff 65%, transparent 100%)",
                            boxShadow: "0 0 14px rgba(0,210,255,0.9), 0 0 28px rgba(0,210,255,0.25)",
                            opacity: 0.95,
                            willChange: "top",
                        }}
                    />

                    {([
                        { top: 7, left: 7 },
                        { top: 7, right: 7 },
                        { bottom: 7, left: 7 },
                        { bottom: 7, right: 7 },
                    ] as React.CSSProperties[]).map((pos, idx) => (
                        <div key={idx} className="absolute w-4 h-4" style={pos}>
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
                            background: `${p.color}12`,
                            color: p.bgLight ? "#334155" : p.color,
                            borderColor: `${p.color}33`,
                        }}
                    >
                        <span
                            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: p.bgLight ? "#475569" : p.color, opacity: 0.85 }}
                        />
                        {p.label}
                    </span>
                ))}
            </m.div>
        </section>
    );
};
