"use client";
import React, { MouseEvent, useCallback } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Crown, ShieldCheck, Zap, Lock } from "lucide-react";

export const Club100 = () => {
    // 1. Motor de Física 3D (Coordenadas del Mouse)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Resortes para suavizar el movimiento (Evita tirones bruscos)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // 3. Mapeo de posición a grados de rotación (Máximo 15 grados)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // 4. Mapeo para el reflejo de luz (Glare)
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        // Retorna al centro suavemente cuando el mouse sale
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <section id="club100" className="relative w-full py-32 bg-white overflow-hidden">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative z-10">

                {/* Lado Izquierdo: Copywriting Estratégico */}
                <div className="flex-1 max-w-2xl">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-[0.2em] uppercase shadow-md">
                            <Crown size={14} className="text-yellow-400" />
                            Círculo de Excelencia
                        </div>

                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            El <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Club 100.</span>
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Una alianza restringida exclusivamente a 100 empresas de alto rendimiento. Obten acceso directo a nuestro directorio tecnológico, prioridad absoluta en talento y un blindaje de ciberseguridad proactivo de grado militar.
                        </p>

                        <ul className="space-y-4 pt-4">
                            {[
                                { icon: <Lock size={20} />, text: "Pentesting continuo y evaluaciones estratégicas Zero-Day." },
                                { icon: <Zap size={20} />, text: "Implementación prioritaria de Agentes IA." },
                                { icon: <ShieldCheck size={20} />, text: "Soporte de Arquitectos Cloud 24/7." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-800 font-semibold">
                                    <div className="p-2 rounded-lg bg-slate-100 text-[#0047AB]">
                                        {item.icon}
                                    </div>
                                    {item.text}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-8">
                            <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 flex items-center gap-2">
                                Solicitar Admisión
                            </button>
                        </div>
                    </m.div>
                </div>

                {/* Lado Derecho: Tarjeta Interactiva 3D */}
                <div className="flex-1 w-full flex justify-center lg:justify-end perspective-[2000px]">
                    <m.div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-full max-w-[480px] aspect-[1.58/1] rounded-3xl cursor-crosshair"
                    >
                        {/* Sombra de la tarjeta (se proyecta en el fondo) */}
                        <m.div
                            className="absolute -inset-4 bg-slate-900/20 blur-2xl rounded-[3rem] -z-10"
                            style={{
                                x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]),
                                y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30])
                            }}
                        />

                        {/* CUERPO DE LA TARJETA (Dark Glassmorphism) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl p-8 border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col justify-between">

                            {/* Efecto de Reflejo Dinámico (Glare) */}
                            <m.div
                                className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay"
                                style={{
                                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 60%)",
                                    left: useTransform(glareX, (val) => `calc(${val} - 50%)`),
                                    top: useTransform(glareY, (val) => `calc(${val} - 50%)`),
                                }}
                            />

                            {/* Efecto de Patrón de Ruido (Opcional, da textura premium) */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

                            {/* Header Tarjeta */}
                            <div className="relative z-20 flex justify-between items-start">
                                <div className="text-2xl font-black tracking-tighter text-white">
                                    <span className="text-slate-500 font-light">&lt;</span> ATM <span className="text-slate-500 font-light">/&gt;</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-500">Miembro Exclusivo</span>
                                    <Crown size={24} className="text-yellow-400" />
                                </div>
                            </div>

                            {/* Chip (Chip EMV estilo tarjeta de crédito) */}
                            <div className="relative z-20 w-12 h-10 rounded-md border border-slate-600 bg-gradient-to-br from-slate-400 to-slate-500 opacity-80 grid grid-cols-3 grid-rows-3 gap-[1px] p-[1px]">
                                {/* Micro-líneas del chip */}
                                <div className="col-span-2 row-span-1 border-b border-r border-slate-600 rounded-tl-sm"></div>
                                <div className="col-span-1 row-span-1 border-b border-slate-600 rounded-tr-sm"></div>
                                <div className="col-span-1 row-span-2 border-r border-slate-600 rounded-bl-sm"></div>
                                <div className="col-span-2 row-span-2 rounded-br-sm"></div>
                            </div>

                            {/* Footer Tarjeta */}
                            <div className="relative z-20 flex justify-between items-end text-white">
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.2em] text-slate-400 mb-1">Nivel de Alianza</p>
                                    <p className="text-lg font-mono tracking-widest shadow-black drop-shadow-md">PARTNER 360</p>
                                </div>
                                {/* Símbolo tipo Mastercard/Visa pero tecnológico */}
                                <div className="flex">
                                    <div className="w-8 h-8 rounded-full bg-yellow-400/80 mix-blend-screen" />
                                    <div className="w-8 h-8 rounded-full bg-slate-300/80 -ml-4 mix-blend-screen" />
                                </div>
                            </div>
                        </div>
                    </m.div>
                </div>

            </div>
        </section>
    );
};
