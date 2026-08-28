"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    BrainCircuit,
    FileText,
    Truck,
    BarChart3,
    ArrowRight,
    Database,
    X
} from "lucide-react";

// Datos extraídos de tu diagrama
const flowData = [
    { id: 'ecommerce', title: 'E-Commerce & Portal', icon: <ShoppingCart className="w-6 h-6" />, desc: 'Punto de entrada unificado para todos los canales de venta digitales.', inputs: 'Solicitud de cliente, Carrito.', outputs: 'Orden registrada pendiente de validación.' },
    { id: 'oms', title: 'OMS Core (Gestión)', icon: <BrainCircuit className="w-6 h-6" />, desc: 'Núcleo central de orquestación. Decide qué inventario usar y qué ruta logística es óptima.', inputs: 'Orden registrada, Disponibilidad.', outputs: 'Orden asignada, Plan de preparación.' },
    { id: 'inventory', title: 'Gestión de Inventario', icon: <Database className="w-6 h-6" />, desc: 'Control de stock multialmacén, reservas dinámicas y liberación automática.', inputs: 'Solicitud de producto, Datos de carga.', outputs: 'Confirmación de reserva, Stock unificado.' },
    { id: 'prep', title: 'Preparación y Facturación', icon: <FileText className="w-6 h-6" />, desc: 'Proceso de picking/packing físico e integración con el SII para emisión fiscal.', inputs: 'Orden de preparación, Datos fiscales.', outputs: 'Pedido listo (embalado), Factura generada.' },
    { id: 'logistics', title: 'Logística y Entrega', icon: <Truck className="w-6 h-6" />, desc: 'Asignación de cupos de camiones, despacho a domicilio o retiro en tienda.', inputs: 'Pedido listo, Solicitud de agendamiento.', outputs: 'Pedido entregado, Confirmación de última milla.' },
    { id: 'reports', title: 'Data & Analytics', icon: <BarChart3 className="w-6 h-6" />, desc: 'Monitoreo en tiempo real de toda la cadena de suministro para decisiones gerenciales.', inputs: 'Trazabilidad de todas las etapas.', outputs: 'Dashboards ejecutivos, Estados actualizados.' }
];

interface EcommerceArchitectureProps {
    onClose?: () => void;
}

export const EcommerceArchitecture = ({ onClose }: EcommerceArchitectureProps) => {
    const [activeNode, setActiveNode] = useState(flowData[1]); // OMS por defecto

    return (
        <section className="relative w-full py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera Ejecutiva */}
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Arquitectura E-commerce <span className="text-[#0047AB]">& OMS</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl font-medium">
                            Pase el cursor sobre los nodos del sistema para explorar el flujo de datos, entradas y salidas de nuestra solución de gestión de pedidos omnicanal.
                        </p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Cerrar"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0047AB] hover:bg-[#003380] text-white shadow-lg shadow-[#0047AB]/30 transition-all hover:scale-105 active:scale-95 border border-[#0047AB]/80"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* COLUMNA IZQUIERDA: DIAGRAMA INTERACTIVO (7 columnas) */}
                    <div className="lg:col-span-7 flex flex-col gap-6 relative">
                        {/* SVG Decorativo para simular conexiones (opcional, simplificado con borders) */}
                        <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-200 rounded-full -z-10"></div>

                        {flowData.map((node) => {
                            const isActive = activeNode.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    onMouseEnter={() => setActiveNode(node)}
                                    className={`
                    relative z-10 flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-500
                    ${isActive
                                            ? 'bg-white/80 border-[#0047AB] shadow-[0_10px_40px_rgba(23, 107, 222,0.15)] scale-[1.02]'
                                            : 'bg-white/40 border-white/60 hover:bg-white/60 shadow-sm hover:shadow-md'
                                        }
                    border backdrop-blur-xl
                  `}
                                >
                                    {/* Icon Container */}
                                    <div className={`
                    p-3 rounded-xl mr-5 transition-colors duration-500
                    ${isActive ? 'bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/30' : 'bg-slate-100 text-slate-500'}
                  `}>
                                        {node.icon}
                                    </div>

                                    {/* Node Title */}
                                    <h3 className={`text-xl font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-[#0047AB]' : 'text-slate-700'}`}>
                                        {node.title}
                                    </h3>

                                    {/* Indicador Activo */}
                                    {isActive && (
                                        <m.div layoutId="active-indicator" className="absolute -right-3 w-6 h-6 bg-[#F8FAFC] flex items-center justify-center rounded-full border border-[#0047AB]/20 shadow-sm text-[#0047AB]">
                                            <ArrowRight className="w-4 h-4" />
                                        </m.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* COLUMNA DERECHA: PANEL EJECUTIVO DINÁMICO (5 columnas) */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 w-full p-8 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] min-h-[400px] flex flex-col">

                            <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                Telemetría de Nodo
                            </div>

                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeNode.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-6 text-[#0047AB]">
                                        {activeNode.icon}
                                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{activeNode.title}</h3>
                                    </div>

                                    <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                        {activeNode.desc}
                                    </p>

                                    {/* Tabla de Inputs / Outputs Minimalista */}
                                    <div className="flex-grow space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">

                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Entradas (Inputs)</h4>
                                            <p className="text-sm font-semibold text-slate-800 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                {activeNode.inputs}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Salidas (Outputs)</h4>
                                            <p className="text-sm font-semibold text-[#0047AB] bg-[#0047AB]/5 p-3 rounded-lg border border-[#0047AB]/10 shadow-sm">
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
