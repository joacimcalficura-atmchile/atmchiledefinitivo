"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Box,
    Globe,
    Film,
    Aperture,
    Layers,
    Cpu,
    ArrowRight,
    X,
    Sparkles
} from "lucide-react";

// Pipeline Creativo e Interactivo (Sin precios, puro valor técnico)
const flowData = [
    { id: 'modeling', title: 'Modelado 3D & Rigging', icon: <Box className="w-6 h-6" />, desc: 'Creación de assets digitales de alta fidelidad, desde modelos estándar (Low Poly) para web, hasta gemelos industriales complejos con físicas, rigging y materiales PBR.', inputs: 'Planos CAD, Referencias fotográficas, Escaneos.', outputs: 'Modelos 3D optimizados, Texturas 4K/8K.' },
    { id: 'twins', title: 'Entornos & Gemelos Digitales', icon: <Globe className="w-6 h-6" />, desc: 'Virtualización a gran escala de plantas industriales, edificios o ciudades. Conectamos la representación visual 1:1 con telemetría e IoT en tiempo real.', inputs: 'Planos BIM, APIs de sensores (IoT).', outputs: 'Entorno virtual interactivo y vivo.' },
    { id: 'cgi', title: 'Animación CGI & Audiovisual', icon: <Film className="w-6 h-6" />, desc: 'Producción de vanguardia: desde Motion Graphics 2D e infografías animadas, hasta secuencias completas en 3D y edición corporativa cinematográfica.', inputs: 'Guion, Storyboard, Branding Corporativo.', outputs: 'Piezas audiovisuales 4K, Renders fotorrealistas.' },
    { id: 'mapping', title: 'Videomapping Inmersivo', icon: <Aperture className="w-6 h-6" />, desc: 'Contenido visual de ultra-alta resolución proyectado sobre superficies arquitectónicas, con cálculo exacto de deformación de perspectiva (Warping & Blending).', inputs: 'Mapeo de superficies (Scan 3D), Planos de fachada.', outputs: 'Experiencia visual inmersiva a gran escala.' },
    { id: 'interactive', title: 'Lógica Interactiva (UE5/Unity)', icon: <Layers className="w-6 h-6" />, desc: 'Desarrollo de experiencias en tiempo real usando Unreal Engine 5, Unity o WebAR. Creamos módulos de navegación fluida y visualización de productos.', inputs: 'Assets 3D optimizados, Lógica de negocio/UX.', outputs: 'Aplicación interactiva ejecutable o WebAR.' },
    { id: 'simulation', title: 'Simuladores y VR/AR', icon: <Cpu className="w-6 h-6" />, desc: 'Desarrollo de procesos educativos complejos y simuladores de entrenamiento inmersivo con realidad virtual y aumentada para industrias de alto riesgo.', inputs: 'Manuales de procedimiento, Reglas físicas.', outputs: 'Plataforma de entrenamiento inmersiva y certificable.' }
];

interface DigitalTwinsArchitectureProps {
    onClose?: () => void;
}

export const DigitalTwinsArchitecture = ({ onClose }: DigitalTwinsArchitectureProps) => {
    const [activeNode, setActiveNode] = useState(flowData[0]);

    return (
        <section className="relative w-full py-16 bg-white/40 border-t border-white/60">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera y Botón de Cierre */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center gap-4">
                            Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">3D & XR</span>
                            <Sparkles className="w-8 h-8 text-[#22D3EE] animate-pulse" />
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl font-medium">
                            Transformamos conceptos físicos en experiencias inmersivas. Desde la creación del asset en bruto hasta la simulación interactiva en motores de próxima generación.
                        </p>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/60 hover:bg-white text-slate-600 hover:text-[#0047AB] rounded-full border border-slate-200 transition-all font-semibold shadow-sm hover:shadow-md"
                        >
                            <X size={18} /> Cerrar Pipeline
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* COLUMNA IZQUIERDA: PIPELINE CREATIVO */}
                    <div className="lg:col-span-7 flex flex-col gap-5 relative">
                        {/* Línea de conexión con gradiente "creativo" */}
                        <div className="absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-[#22D3EE]/30 via-[#0047AB]/20 to-[#22D3EE]/30 rounded-full -z-10"></div>

                        {flowData.map((node) => {
                            const isActive = activeNode.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    onMouseEnter={() => setActiveNode(node)}
                                    className={`
                    relative z-10 flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-500
                    ${isActive
                                            ? 'bg-white border-[#22D3EE]/50 shadow-[0_10px_40px_rgba(34,211,238,0.15)] scale-[1.02]'
                                            : 'bg-white/50 border-transparent hover:border-[#22D3EE]/30 hover:bg-white/80 shadow-sm'
                                        }
                    border backdrop-blur-xl
                  `}
                                >
                                    <div className={`
                    p-3 rounded-xl mr-5 transition-colors duration-500
                    ${isActive ? 'bg-gradient-to-br from-[#0047AB] to-[#22D3EE] text-white shadow-lg shadow-[#22D3EE]/30' : 'bg-slate-100 text-slate-500'}
                  `}>
                                        {node.icon}
                                    </div>

                                    <h3 className={`text-lg font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-[#0047AB]' : 'text-slate-700'}`}>
                                        {node.title}
                                    </h3>

                                    {isActive && (
                                        <m.div layoutId="active-indicator-3d" className="absolute -right-3 w-6 h-6 bg-[#F8FAFC] flex items-center justify-center rounded-full border border-[#22D3EE]/40 shadow-sm text-[#22D3EE]">
                                            <ArrowRight className="w-4 h-4" />
                                        </m.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* COLUMNA DERECHA: PANEL EJECUTIVO CREATIVO */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 w-full p-8 bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(34,211,238,0.05)] rounded-[2rem] min-h-[420px] flex flex-col overflow-hidden">

                            {/* Reflejo de luz sutil en el cristal */}
                            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#22D3EE]/20 blur-3xl rounded-full pointer-events-none" />

                            <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                Pipeline de Producción
                            </div>

                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeNode.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full relative z-10"
                                >
                                    <div className="flex items-center gap-4 mb-6 text-[#0047AB]">
                                        {activeNode.icon}
                                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{activeNode.title}</h3>
                                    </div>

                                    <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                        {activeNode.desc}
                                    </p>

                                    <div className="flex-grow space-y-6 bg-slate-50/80 p-6 rounded-xl border border-slate-100 backdrop-blur-sm">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Requerimientos (Inputs)</h4>
                                            <p className="text-sm font-semibold text-slate-800 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                {activeNode.inputs}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Entregables (Outputs)</h4>
                                            <p className="text-sm font-semibold text-[#0047AB] bg-gradient-to-r from-[#0047AB]/5 to-[#22D3EE]/5 p-3 rounded-lg border border-[#0047AB]/10 shadow-sm">
                                                {activeNode.outputs}
                                            </p>
                                        </div>
                                    </div>
                                </m.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
