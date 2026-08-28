"use client";
import React, { useEffect } from "react";
import { m } from "framer-motion";
import { X } from "lucide-react";
import { EcommerceArchitecture } from "./EcommerceArchitecture";
import { SaasArchitecture }      from "./SaasArchitecture";
import { FintechArchitecture }   from "./FintechArchitecture";
import { LogisticsArchitecture } from "./LogisticsArchitecture";
import { ErpArchitecture }       from "./ErpArchitecture";
import { ProductVisualization3DServices } from "./ProductVisualization3DServices";
import { AIGenerativeArchitecture } from "./AIGenerativeArchitecture";

export const ArchitectureModal = ({
    id,
    onClose,
}: {
    id: string;
    onClose: () => void;
}) => {
    // Cerrar con Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    // Bloquear scroll del body mientras el modal está abierto
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

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
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", backgroundColor: "rgba(248,250,252,0.6)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <m.div
                key="modal-panel"
                initial={{ opacity: 0, scale: 0.93, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-6xl max-h-[88vh] overflow-y-auto rounded-[2.5rem]"
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
                    aria-label="Cerrar"
                    className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#0047AB] hover:bg-[#003380] text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0047AB]/30 border border-[#0047AB]/80"
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
