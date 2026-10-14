/**
 * Productos propios de ATM (software ya desarrollado e integrado en clientes),
 * a diferencia de `src/data/services.ts`, que describe capacidades y servicios.
 *
 * Módulo de datos puro: sin `"use client"` ni JSX, para que pueda consumirse
 * tanto desde componentes de servidor (JSON-LD, metadata) como de cliente.
 */
import type React from "react";
import { Target, Layers, type LucideProps } from "lucide-react";

/**
 * Demo audiovisual del producto. `youtubeId: null` significa "demo todavía no
 * publicada": la UI renderiza un placeholder de marca en vez de un embed roto.
 */
export interface ProductDemo {
    readonly youtubeId: string | null;
    /** Imagen 16:9 autoalojada que oficia de póster (evita pedirla a YouTube). */
    readonly poster: string | null;
    readonly posterAlt: string;
}

export interface DevelopedProduct {
    readonly id: string;
    readonly name: string;
    readonly subtitle: string;
    readonly description: string;
    readonly features: readonly string[];
    readonly techStack: readonly string[];
    /** Etiqueta de madurez mostrada en la tarjeta. */
    readonly status: "En producción" | "En implementación";
    readonly metric: { readonly label: string; readonly value: string };
    readonly demo: ProductDemo;
    readonly Icon: React.ComponentType<LucideProps>;
}

export const DEVELOPED_PRODUCTS: readonly DevelopedProduct[] = [
    {
        id: "atm-agent",
        name: "ATM Agent",
        subtitle: "Tu CRM con inteligencia artificial",
        description:
            "No solo almacena contactos: califica cada lead según su comportamiento e interacciones, y lo entrega priorizado al equipo comercial. Ya integrado y operando en clientes.",
        features: [
            "Lead scoring en tiempo real con IA",
            "Pipeline predictivo con probabilidad de cierre",
            "Segmentación automática por comportamiento",
            "Integración con el agente conversacional ATM",
        ],
        techStack: ["Next.js", "Python", "PostgreSQL", "Webhooks"],
        status: "En producción",
        metric: { label: "Conversión de leads", value: "+58%" },
        Icon: Target,
        demo: {
            youtubeId: "VpQqVi9f71s",
            poster: "/images/products/atm-agent-demo-poster.jpg",
            posterAlt: "Demo de ATM Agent: tablero de leads con scoring automático",
        },
    },
    {
        id: "atm-erp",
        name: "ATM ERP",
        subtitle: "Un solo dato maestro para toda la operación",
        description:
            "Núcleo transaccional para finanzas y operaciones con gobierno de datos centralizado. Unifica silos vía arquitectura orientada a eventos y convive con los sistemas legados del cliente.",
        features: [
            "Master Data Management: una única fuente de verdad",
            "Módulos core de finanzas y operaciones",
            "Capa anticorrupción para sistemas legados",
            "Tableros ejecutivos alimentados por CDC",
        ],
        techStack: ["TypeScript", "PostgreSQL", "Event Bus", "BI"],
        status: "En implementación",
        metric: { label: "Eficiencia operativa", value: "+65%" },
        Icon: Layers,
        demo: {
            youtubeId: null,
            poster: null,
            posterAlt: "Demo del ERP de ATM en preparación",
        },
    },
] as const;
