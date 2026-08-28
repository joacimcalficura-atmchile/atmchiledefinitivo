"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Box, Cog, Globe, Film, Video, Projector,
    Code2, Brain, ArrowRight, ChevronRight
} from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface SubService {
    name: string;
    workflow: string;
    deliverables: string;
}

interface CategoryNode {
    id: string;
    category: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    services: SubService[];
}

// ── Datos de Servicios (sin precios, con flujos de trabajo) ────────────────────
const categoryData: CategoryNode[] = [
    {
        id: "modelado",
        category: "A",
        title: "Desarrollo y Modelado 3D",
        desc: "Producción de activos digitales de alta fidelidad para visualización web, realidad aumentada y entornos industriales interactivos.",
        icon: <Box className="w-6 h-6" />,
        services: [
            {
                name: "Asset Estándar (Low Poly / Arquitectura)",
                workflow: "Brief → Modelado Base → UV Unwrap → Texturizado PBR → Optimización LOD → Entrega",
                deliverables: "Modelo .glb/.gltf optimizado, texturas PBR, múltiples niveles de detalle (LODs).",
            },
            {
                name: "Asset Industrial Complejo (Rigging / PBR / Mecánicas)",
                workflow: "Análisis CAD → Modelado de Alta Fidelidad → Rigging & Weights → Animación de Mecánicas → QA Técnico → Entrega",
                deliverables: "Modelo rigged con animaciones, materiales PBR físicamente correctos, escena lista para motor de render.",
            },
            {
                name: "Entornos / Gemelos Digitales",
                workflow: "Captura LiDAR/Planos → Modelado de Entorno → Integración de Datos IoT → Lógica de Simulación → Despliegue",
                deliverables: "Gemelo digital navegable en tiempo real, dashboard de datos operacionales integrado, simulación de procesos.",
            },
        ],
    },
    {
        id: "audiovisual",
        category: "B",
        title: "Desarrollo Audiovisual & Videomapping",
        desc: "Producción de contenido audiovisual corporativo de alta gama, desde motion graphics hasta videomapping para eventos de gran formato.",
        icon: <Film className="w-6 h-6" />,
        services: [
            {
                name: "Motion Graphics 2D / Infografía Animada",
                workflow: "Brief Creativo → Guión y Storyboard → Diseño de Frames → Animación → Sonorización → Exportación Multiplatforma",
                deliverables: "Video animado en mp4/ProRes, archivos fuente editables (After Effects), versiones adaptadas para RRSS.",
            },
            {
                name: "Animación 3D / CGI & Edición Corporativa",
                workflow: "Preproducción → Modelado/Rigging → Animación → Iluminación y Render → Composición → Postproducción Final",
                deliverables: "Video 4K final renderizado, passes individuales de efectos, versiones localizadas para diferentes mercados.",
            },
            {
                name: "Contenido para Videomapping",
                workflow: "Medición Geométrica de Superficie → Maqueta 3D de Proyección → Producción de Contenido → Calibración → Show Final",
                deliverables: "Contenido mapeado por zona de proyección, cuadrícula de alineación técnica, guía de calibración para operador.",
            },
        ],
    },
    {
        id: "interactivo",
        category: "C",
        title: "Lógicas e Implementación Interactiva",
        desc: "Desarrollo de experiencias interactivas en tiempo real con Unreal Engine 5, Unity y WebAR para plataformas B2B, educativas e industriales.",
        icon: <Code2 className="w-6 h-6" />,
        services: [
            {
                name: "Módulo Interactivo Nivel 1 (Navegación / Visualización)",
                workflow: "UX Wireframe → Integración de Assets → Programación de Interacciones → QA Multiplataforma → Despliegue Web/AR",
                deliverables: "Módulo ejecutable (WebGL/APK/EXE), documentación técnica de integración, guía de despliegue y mantenimiento.",
            },
            {
                name: "Simuladores y Procesos Educativos Complejos",
                workflow: "Análisis de Procedimientos → Diseño Instruccional → Desarrollo de Lógicas → Pruebas con Usuarios → Certificación",
                deliverables: "Simulador con sistema de evaluación gamificado, reportes de desempeño por usuario, actualizaciones de contenido.",
            },
        ],
    },
];

interface ProductVisualization3DProps {
    onClose?: () => void;
}

// ── Componente Principal ────────────────────────────────────────────────────────
export const ProductVisualization3DServices = ({ onClose }: ProductVisualization3DProps) => {
    const [activeCategory, setActiveCategory] = useState(categoryData[0]);
    const [activeService, setActiveService]   = useState<SubService | null>(null);

    const handleCategorySelect = (cat: CategoryNode) => {
        setActiveCategory(cat);
        setActiveService(null);
    };

    return (
        <section className="relative w-full py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-[#0047AB] uppercase mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                            Portafolio de Servicios
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Virtualización{" "}
                            <span className="text-[#0047AB]">& Producción 3D</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl font-medium">
                            Explore nuestros flujos de trabajo y entregables por categoría de servicio. Seleccione un área para conocer el proceso detallado.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                    {/* ── Columna izquierda: Categorías ── */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {categoryData.map((cat) => {
                            const isActive = activeCategory.id === cat.id;
                            return (
                                <div key={cat.id}>
                                    {/* Tarjeta de categoría */}
                                    <div
                                        onMouseEnter={() => handleCategorySelect(cat)}
                                        onClick={() => handleCategorySelect(cat)}
                                        className={`
                                            relative z-10 flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-400 border backdrop-blur-xl
                                            ${isActive
                                                ? "bg-white border-[#0047AB] shadow-[0_10px_30px_rgba(23, 107, 222,0.12)] scale-[1.02]"
                                                : "bg-white/50 border-transparent hover:border-slate-200 hover:bg-white/80 shadow-sm"
                                            }
                                        `}
                                    >
                                        <div className={`p-3 rounded-xl mr-5 transition-colors duration-400 ${isActive ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/30" : "bg-slate-100 text-slate-500"}`}>
                                            {cat.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`text-[10px] font-black tracking-[0.2em] uppercase mb-0.5 ${isActive ? "text-[#22D3EE]" : "text-slate-400"}`}>
                                                Categoría {cat.category}
                                            </div>
                                            <h3 className={`text-base font-bold tracking-tight transition-colors duration-400 ${isActive ? "text-[#0047AB]" : "text-slate-700"}`}>
                                                {cat.title}
                                            </h3>
                                        </div>
                                        {isActive && (
                                            <m.div layoutId="active-indicator-3d" className="w-6 h-6 bg-[#F8FAFC] flex items-center justify-center rounded-full border border-[#0047AB]/20 shadow-sm text-[#0047AB]">
                                                <ArrowRight className="w-4 h-4" />
                                            </m.div>
                                        )}
                                    </div>

                                    {/* Sub-servicios expandibles al seleccionar */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <m.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden mt-2 ml-4 flex flex-col gap-2"
                                            >
                                                {cat.services.map((svc, i) => {
                                                    const isServiceActive = activeService?.name === svc.name;
                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => setActiveService(isServiceActive ? null : svc)}
                                                            className={`
                                                                text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-3
                                                                ${isServiceActive
                                                                    ? "bg-[#0047AB]/5 border-[#0047AB]/20 text-[#0047AB]"
                                                                    : "bg-white/60 border-slate-100 text-slate-600 hover:bg-white hover:border-slate-200"
                                                                }
                                                            `}
                                                        >
                                                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isServiceActive ? "rotate-90 text-[#0047AB]" : "text-slate-300"}`} />
                                                            {svc.name}
                                                        </button>
                                                    );
                                                })}
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Columna derecha: Panel de detalles ── */}
                    <div className="lg:col-span-7 relative">
                        <div className="sticky top-32 w-full p-8 bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] min-h-[420px] flex flex-col">

                            <AnimatePresence mode="wait">
                                {activeService ? (
                                    /* Vista detalle de sub-servicio */
                                    <m.div
                                        key={activeService.name}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.28 }}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                            Flujo de Trabajo
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-5">
                                            {activeService.name}
                                        </h3>

                                        {/* Pipeline visual */}
                                        <div className="mb-6">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Pipeline</p>
                                            <div className="flex flex-wrap gap-2">
                                                {activeService.workflow.split("→").map((step, i, arr) => (
                                                    <React.Fragment key={i}>
                                                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${i === 0 ? "bg-[#0047AB] text-white" : i === arr.length - 1 ? "bg-[#22D3EE]/10 text-[#0047AB] border border-[#22D3EE]/30" : "bg-slate-100 text-slate-600"}`}>
                                                            {step.trim()}
                                                        </span>
                                                        {i < arr.length - 1 && <span className="text-slate-300 text-xs self-center">›</span>}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex-grow bg-slate-50/70 p-6 rounded-xl border border-slate-100">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Entregables</p>
                                            <p className="text-sm font-semibold text-[#0047AB] leading-relaxed">
                                                {activeService.deliverables}
                                            </p>
                                        </div>
                                    </m.div>
                                ) : (
                                    /* Vista resumen de categoría */
                                    <m.div
                                        key={activeCategory.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.28 }}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                            Categoría {activeCategory.category} — Resumen
                                        </div>

                                        <div className="flex items-center gap-4 mb-5 text-[#0047AB]">
                                            {activeCategory.icon}
                                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{activeCategory.title}</h3>
                                        </div>

                                        <p className="text-slate-600 font-medium leading-relaxed mb-6">{activeCategory.desc}</p>

                                        <div className="flex-grow space-y-3">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Servicios incluidos</p>
                                            {activeCategory.services.map((svc, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="w-5 h-5 rounded-full bg-[#0047AB]/10 border border-[#0047AB]/20 flex items-center justify-center shrink-0 mt-0.5">
                                                        <span className="text-[9px] font-black text-[#0047AB]">{i + 1}</span>
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-700">{svc.name}</p>
                                                </div>
                                            ))}
                                            <p className="text-xs text-slate-400 font-medium pt-2">
                                                ↑ Selecciona un servicio para ver el flujo de trabajo detallado
                                            </p>
                                        </div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Condiciones Operativas */}
                <div className="mt-12 p-8 rounded-2xl border border-[#0047AB]/10 bg-gradient-to-br from-[#0047AB]/5 to-[#22D3EE]/5">
                    <div className="text-[10px] font-black tracking-[0.25em] text-[#0047AB] uppercase mb-4 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Condiciones Operativas y Validación
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Validación Técnica Obligatoria</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                ATM se compromete a no presentar presupuestos o plazos de entrega sin la revisión y validación técnica previa, ajustando los precios a la complejidad real del proyecto.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Facturación Mínima por Operación</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Se establece un volumen mínimo por etapa o proyecto activo para garantizar la disponibilidad prioritaria de equipos especializados y el cumplimiento de normativas de seguridad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
