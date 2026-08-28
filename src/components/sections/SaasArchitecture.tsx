"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Network,
    Cpu,
    Database,
    Cloud,
    TerminalSquare,
    ArrowRight,
    X
} from "lucide-react";

const flowData = [
    { id: 'auth', title: 'Identity & Access (Zero Trust)', icon: <ShieldCheck className="w-6 h-6" />, desc: 'Autenticación centralizada y autorización basada en roles (RBAC). Aislamiento estricto por Tenant.', inputs: 'Credenciales, Tokens OAuth/SAML.', outputs: 'JWT Seguro, Sesión validada.' },
    { id: 'gateway', title: 'API Gateway & Load Balancer', icon: <Network className="w-6 h-6" />, desc: 'Punto único de entrada. Enruta el tráfico inteligentemente, previene ataques DDoS y maneja Rate Limiting.', inputs: 'Peticiones HTTPS de clientes.', outputs: 'Tráfico balanceado hacia microservicios.' },
    { id: 'microservices', title: 'Core de Microservicios', icon: <Cpu className="w-6 h-6" />, desc: 'Lógica de negocio distribuida en contenedores (Docker/Kubernetes). Alta resiliencia y despliegue independiente.', inputs: 'Peticiones validadas, Eventos.', outputs: 'Ejecución de procesos, Emisión de eventos.' },
    { id: 'data', title: 'Capa de Datos Multi-tenant', icon: <Database className="w-6 h-6" />, desc: 'Bases de datos particionadas lógicamente o físicamente para garantizar la privacidad absoluta entre clientes.', inputs: 'Consultas SQL/NoSQL, ID de Tenant.', outputs: 'Datos aislados, Backups automatizados.' },
    { id: 'scaling', title: 'Auto-scaling Cloud', icon: <Cloud className="w-6 h-6" />, desc: 'Infraestructura elástica en AWS/Azure. Los recursos se expanden o contraen en tiempo real según la demanda.', inputs: 'Métricas de CPU/RAM, Tráfico en vivo.', outputs: 'Nuevos nodos instanciados, Ahorro de costos.' },
    { id: 'cicd', title: 'DevOps & Telemetría', icon: <TerminalSquare className="w-6 h-6" />, desc: 'Integración y despliegue continuo (CI/CD) con observabilidad profunda del rendimiento del sistema.', inputs: 'Commits de código, Logs del sistema.', outputs: 'Despliegues Zero-Downtime, Dashboards.' }
];

interface SaasArchitectureProps {
    onClose?: () => void;
}

export const SaasArchitecture = ({ onClose }: SaasArchitectureProps) => {
    const [activeNode, setActiveNode] = useState(flowData[0]);

    return (
        <section className="relative w-full py-16 bg-white/40 border-t border-white/60">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera y Botón de Cierre */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Arquitectura <span className="text-[#0047AB]">SaaS Enterprise</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl font-medium">
                            Explore cómo diseñamos plataformas en la nube altamente escalables, seguras y preparadas para soportar miles de inquilinos simultáneos.
                        </p>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Cerrar"
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0047AB] hover:bg-[#003380] text-white shadow-lg shadow-[#0047AB]/30 transition-all hover:scale-105 active:scale-95 border border-[#0047AB]/80"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* COLUMNA IZQUIERDA: DIAGRAMA INTERACTIVO */}
                    <div className="lg:col-span-7 flex flex-col gap-5 relative">
                        <div className="absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-[#0047AB]/20 via-slate-200 to-[#0047AB]/20 rounded-full -z-10"></div>

                        {flowData.map((node) => {
                            const isActive = activeNode.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    onMouseEnter={() => setActiveNode(node)}
                                    className={`
                    relative z-10 flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-500
                    ${isActive
                                            ? 'bg-white border-[#0047AB] shadow-[0_10px_30px_rgba(23, 107, 222,0.12)] scale-[1.02]'
                                            : 'bg-white/50 border-transparent hover:border-slate-200 hover:bg-white/80 shadow-sm'
                                        }
                    border backdrop-blur-xl
                  `}
                                >
                                    <div className={`
                    p-3 rounded-xl mr-5 transition-colors duration-500
                    ${isActive ? 'bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/30' : 'bg-slate-100 text-slate-500'}
                  `}>
                                        {node.icon}
                                    </div>

                                    <h3 className={`text-lg font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-[#0047AB]' : 'text-slate-700'}`}>
                                        {node.title}
                                    </h3>

                                    {isActive && (
                                        <m.div layoutId="active-indicator-saas" className="absolute -right-3 w-6 h-6 bg-[#F8FAFC] flex items-center justify-center rounded-full border border-[#0047AB]/20 shadow-sm text-[#0047AB]">
                                            <ArrowRight className="w-4 h-4" />
                                        </m.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* COLUMNA DERECHA: PANEL EJECUTIVO DINÁMICO */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 w-full p-8 bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] min-h-[420px] flex flex-col">

                            <div className="text-[10px] font-bold tracking-[0.2em] text-[#0047AB] uppercase mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                                Módulo Cloud Activo
                            </div>

                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeNode.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
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

                                    <div className="flex-grow space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
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
