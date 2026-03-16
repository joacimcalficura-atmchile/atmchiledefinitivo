"use client";
import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Settings,
    FileText,
    Share2,
    CheckCircle2,
    X,
    Zap,
} from "lucide-react";

// ─── TypeScript: declarar el elemento custom de model-viewer ────────────────
// React 18+ requiere augmentar React.JSX en vez del namespace global JSX
declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & Record<string, any>, HTMLElement>;
        }
    }
}

interface ProductVirtualizationMVPProps {
    onClose?: () => void;
}

export const ProductVirtualizationMVP = ({ onClose }: ProductVirtualizationMVPProps) => {
    const [activeMaterial, setActiveMaterial] = useState("Acero Inoxidable");
    const [activeCapacidad, setActiveCapacidad] = useState("Alta (500 L/min)");
    const [modelReady, setModelReady] = useState(false);

    // Manejo ultra seguro de carga para Next.js App Router: 
    // Inyectamos el tag <script type="module"> vía DOM estándar 
    // para evitar que el framework bloquee o postergue Web Components.
    useEffect(() => {
        if (typeof window !== "undefined") {
            const scriptId = "model-viewer-script";
            if (!document.getElementById(scriptId)) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.type = "module";
                script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
                document.head.appendChild(script);
            }
        }

        // Timeout para pintar el tag solo tras haber disparado la inyección
        const timer = setTimeout(() => setModelReady(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const specsMap: Record<string, Record<string, string>> = {
        "Acero Inoxidable": {
            "Alta (500 L/min)": "AISI 316L · 500 L/min · 8 bar · 22 kW",
            "Estándar (250 L/min)": "AISI 316L · 250 L/min · 5 bar · 11 kW",
        },
        "Titanio Ligero": {
            "Alta (500 L/min)": "Gr. 5 Ti · 500 L/min · 10 bar · 22 kW",
            "Estándar (250 L/min)": "Gr. 5 Ti · 250 L/min · 6 bar · 11 kW",
        },
    };

    const priceMap: Record<string, Record<string, string>> = {
        "Acero Inoxidable": {
            "Alta (500 L/min)": "$14,500",
            "Estándar (250 L/min)": "$9,200",
        },
        "Titanio Ligero": {
            "Alta (500 L/min)": "$21,800",
            "Estándar (250 L/min)": "$14,100",
        },
    };

    const currentSpecs = specsMap[activeMaterial]?.[activeCapacidad] ?? "";
    const currentPrice = priceMap[activeMaterial]?.[activeCapacidad] ?? "";

    return (
        <section className="relative w-full py-16 bg-white/40 border-t border-white/60">

            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera ------------------------------------------------------- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/5 border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-4">
                            <Zap size={14} className="text-[#22D3EE]" />
                            Demo Comercial B2B
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Catálogo{" "}
                            <span className="text-[#0047AB]">Interactivo 3D</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl font-medium">
                            Empodere a su fuerza de ventas. Configure, visualice y cotice
                            productos industriales complejos en tiempo real, directamente
                            desde el navegador y sin conocimientos técnicos.
                        </p>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/60 hover:bg-white text-slate-600 hover:text-[#0047AB] rounded-full border border-slate-200 transition-all font-semibold shadow-sm hover:shadow-md"
                        >
                            <X size={18} /> Cerrar Demo
                        </button>
                    )}
                </div>

                {/* Configurador MVP ------------------------------------------------ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLUMNA IZQUIERDA: VISOR 3D --------------------------------- */}
                    {/*
                        IMPORTANTE: sin z-index en el contenedor para que los
                        eventos de pointer del model-viewer no queden bloqueados.
                    */}
                    <div className="lg:col-span-8 relative aspect-[4/3] lg:aspect-video rounded-[2rem] border border-slate-200 shadow-inner overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">

                        {/* ─────────────────────────────────────────────────────────── */}
                        {/* ZONA DE INTEGRACIÓN: model-viewer / partner 3D             */}
                        <div
                            id="victor-3d-model-container"
                            className="absolute inset-0 w-full h-full"
                        >
                            {modelReady && (
                                /* eslint-disable-next-line react/no-unknown-property */
                                <model-viewer
                                    src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                                    alt="Modelo 3D Interactivo"
                                    shadow-intensity="2"
                                    camera-controls
                                    auto-rotate
                                    interaction-prompt="hover"
                                    environment-image="neutral"
                                    style={{ width: "100%", height: "100%", outline: "none", backgroundColor: "transparent" }}
                                >
                                    {/* Botones y UI interna */}
                                    {/* Botón AR — visible en iOS/Android compatibles */}
                                    <button
                                        slot="ar-button"
                                        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md text-[#0047AB] font-bold px-4 py-2 rounded-xl shadow-lg border border-white hover:bg-white transition-all text-xs uppercase tracking-widest"
                                    >
                                        Ver en mi espacio (AR)
                                    </button>
                                </model-viewer>
                            )}
                        </div>
                        {/* ─────────────────────────────────────────────────────────── */}

                        {/* Badge flotante con instrucción de arrastre */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-white shadow-sm pointer-events-none">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                Arrastra para rotar · Pinch para zoom
                            </span>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: PANEL DE VENTAS ----------------------------- */}
                    <div className="lg:col-span-4 sticky top-32 flex flex-col gap-6">
                        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] p-8">

                            {/* Producto ------------------------------------------- */}
                            <div className="mb-8">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                                    Referencia: Válvula CX-99
                                </span>
                                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 mb-2">
                                    Motor Centrífugo B2B
                                </h3>
                                <m.p
                                    key={currentPrice}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-2xl font-black text-[#0047AB]"
                                >
                                    {currentPrice}{" "}
                                    <span className="text-sm text-slate-400 font-medium">
                                        USD / Unidad
                                    </span>
                                </m.p>
                            </div>

                            {/* Configuradores ------------------------------------ */}
                            <div className="space-y-6">

                                {/* Selector Material */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                                        <Settings size={14} /> Aleación del Material
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Acero Inoxidable", "Titanio Ligero"].map((mat) => (
                                            <button
                                                key={mat}
                                                onClick={() => setActiveMaterial(mat)}
                                                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${activeMaterial === mat
                                                    ? "bg-[#0047AB]/5 border-[#0047AB] text-[#0047AB] shadow-sm"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                                    }`}
                                            >
                                                {mat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Selector Capacidad */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                                        Capacidad de Flujo
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Estándar (250 L/min)", "Alta (500 L/min)"].map((cap) => (
                                            <button
                                                key={cap}
                                                onClick={() => setActiveCapacidad(cap)}
                                                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${activeCapacidad === cap
                                                    ? "bg-[#0047AB]/5 border-[#0047AB] text-[#0047AB] shadow-sm"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                                    }`}
                                            >
                                                {cap}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Resumen dinámico ----------------------------------- */}
                            <m.div
                                key={currentSpecs}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-100"
                            >
                                <p className="text-xs text-slate-500 mb-2 font-medium flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-[#22D3EE]" />
                                    Configuración validada
                                </p>
                                <p className="text-sm text-slate-700 font-semibold">
                                    {currentSpecs} · Conexión Bridada ANSI
                                </p>
                            </m.div>

                            {/* CTAs ----------------------------------------------- */}
                            <div className="mt-8 space-y-3">
                                <button className="w-full py-4 bg-[#0047AB] hover:bg-[#003380] text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
                                    <FileText size={18} /> Generar Cotización PDF
                                </button>
                                <button className="w-full py-4 bg-white hover:bg-slate-50 text-[#0047AB] border border-[#0047AB]/20 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                    <Share2 size={18} /> Compartir Enlace 3D al Cliente
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};
