"use client";
import React, { useRef } from "react";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { EcommerceArchitecture } from "./EcommerceArchitecture";
import { SaasArchitecture }      from "./SaasArchitecture";
import { FintechArchitecture }   from "./FintechArchitecture";
import { LogisticsArchitecture } from "./LogisticsArchitecture";
import { ErpArchitecture }       from "./ErpArchitecture";
import { ProductVisualization3DServices } from "./ProductVisualization3DServices";
import { AIGenerativeArchitecture } from "./AIGenerativeArchitecture";

const TITLES: Record<string, string> = {
    "ia-generativa": "IA generativa",
    "3d": "Visualización 3D de productos",
    ecommerce: "E-commerce",
    logistica: "Logística",
    saas: "SaaS",
    fintech: "Fintech",
    erp: "ERP a medida",
};

export const ArchitectureModal = ({
    id,
    onClose,
}: {
    id: string;
    onClose: () => void;
}) => {
    // Foco dentro del diálogo, Escape para cerrar, resto de la página inerte
    // y scroll bloqueado; al cerrar, el foco vuelve a la tarjeta que lo abrió.
    const panelRef = useRef<HTMLDivElement>(null);
    useDialogA11y(panelRef, { onClose });

    const Content = () => {
        switch (id) {
            case "ia-generativa": return <AIGenerativeArchitecture />;
            case "3d":        return <ProductVisualization3DServices />;
            case "ecommerce": return <EcommerceArchitecture />;
            case "logistica": return <LogisticsArchitecture />;
            case "saas":      return <SaasArchitecture />;
            case "fintech":   return <FintechArchitecture />;
            case "erp":       return <ErpArchitecture />;
            default:          return null;
        }
    };

    return (
        <m.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", backgroundColor: "rgba(248,250,252,0.6)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <m.div
                ref={panelRef}
                key="modal-panel"
                role="dialog"
                aria-modal="true"
                aria-label={`Detalle del servicio: ${TITLES[id] ?? "arquitectura"}`}
                tabIndex={-1}
                initial={{ opacity: 0, scale: 0.93, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-6xl max-h-[88vh] overflow-y-auto rounded-[2.5rem] outline-none"
                style={{
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "saturate(180%) blur(48px)",
                    WebkitBackdropFilter: "saturate(180%) blur(48px)",
                    border: "1.5px solid rgba(255,255,255,0.95)",
                    boxShadow: [
                        "0 60px 140px -20px rgba(23, 107, 222,0.20)",
                        "0 32px 64px -8px rgba(0,0,0,0.10)",
                        "0 0 0 1px rgba(23, 107, 222,0.06)",
                        "inset 0 1px 0 rgba(255,255,255,1)",
                        "inset 0 -1px 0 rgba(23, 107, 222,0.04)",
                    ].join(","),
                }}
            >
                {/* Brillo superior — firma Apple glass */}
                <div
                    className="absolute top-0 left-12 right-12 h-px pointer-events-none z-20 rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent 100%)" }}
                />
                {/* Glow ambiental azul sutil */}
                <div
                    className="absolute -inset-1 rounded-[2.5rem] pointer-events-none -z-10 opacity-40"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(23, 107, 222,0.12), transparent)" }}
                />

                {/* Botón cerrar — azul cobalto */}
                <button
                    onClick={onClose}
                    type="button"
                    aria-label="Cerrar detalle"
                    className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-[#176BDE] hover:bg-[#0E4FA5] text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#176BDE]/30 border border-[#176BDE]/80"
                >
                    <X size={18} />
                </button>

                {/* Contenido */}
                <div className="overflow-hidden rounded-[2.5rem]">
                    <Content />
                </div>
            </m.div>
        </m.div>
    );
};
