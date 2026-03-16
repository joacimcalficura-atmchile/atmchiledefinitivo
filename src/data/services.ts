"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Database, Building2, Truck, Cpu, Box, ShieldCheck, Users, BrainCircuit } from "lucide-react";

export interface Solution {
    id: string;
    num: string;
    title: string;
    desc: string;
    tags: string[];
    cta: string;
    ctaHref?: string;
    hasModal: boolean;
    Icon: React.ComponentType<{ className?: string }>;
}

export const solutions: Solution[] = [
    {
        id: "talento",
        num: "01",
        title: "Talento Senior On-Demand",
        desc: "Células ágiles de programadores de alto rendimiento integradas a su flujo de trabajo bajo supervisión técnica senior.",
        tags: ["Agile", "Senior Management", "High Performance"],
        cta: "Ver equipo",
        ctaHref: "/talento",
        hasModal: false,
        Icon: Users,
    },
    {
        id: "ia-generativa",
        num: "02",
        title: "IA Generativa & Automatización",
        desc: "Soluciones de IA que razonan según el perfil del cliente. No es un chatbot: es un equipo digital a medida con CRM inteligente y scoring de leads.",
        tags: ["LangChain", "GPT-4o", "CRM AI", "RAG"],
        cta: "Explorar Soluciones IA",
        hasModal: true,
        Icon: BrainCircuit,
    },
    {
        id: "seguridad",
        num: "03",
        title: "Ciberseguridad 360",
        desc: "Auditoría y protección integral bajo estándares internacionales. Evaluación estratégica de infraestructuras críticas.",
        tags: ["ISO 27001", "Pentesting", "Zero Trust"],
        cta: "Centro de Mando",
        ctaHref: "/seguridad",
        hasModal: false,
        Icon: ShieldCheck,
    },
    {
        id: "3d",
        num: "04",
        title: "Virtualización de Productos 3D",
        desc: "Catálogos interactivos y gemelos digitales que potencian ventas B2B. Exhiba productos complejos con total interactividad.",
        tags: ["WebGL", "Three.js", "Unreal Engine 5"],
        cta: "Explorar Servicios",
        hasModal: true,
        Icon: Box,
    },
    {
        id: "ecommerce",
        num: "05",
        title: "E-commerce B2B/B2C",
        desc: "Plataformas transaccionales headless diseñadas para conversión máxima y experiencia de compra premium.",
        tags: ["Headless", "API-First", "Omnicanal"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: ShoppingCart,
    },
    {
        id: "logistica",
        num: "06",
        title: "Logística (WMS & TMS)",
        desc: "Optimización integral de la cadena de suministro. Orquestación inteligente desde el almacén hasta la última milla.",
        tags: ["WMS", "TMS", "Last Mile"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Truck,
    },
    {
        id: "saas",
        num: "07",
        title: "SaaS Enterprise",
        desc: "Arquitecturas multi-tenant y escalabilidad en la nube. Productos digitales a medida para potenciar su negocio.",
        tags: ["Multi-tenant", "Cloud", "Scalable"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Cpu,
    },
    {
        id: "fintech",
        num: "08",
        title: "Core Financiero & Fintech",
        desc: "Integración ágil de pasarelas de pago y modernización de sistemas transaccionales bajo los más altos estándares.",
        tags: ["Payments", "SAP", "Oracle"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Building2,
    },
    {
        id: "erp",
        num: "09",
        title: "ERP Custom & Integraciones",
        desc: "Centralización operativa y conectividad avanzada mediante API con SAP, Oracle y ecosistemas corporativos existentes.",
        tags: ["SAP", "API REST", "Integración"],
        cta: "Explorar Arquitectura",
        hasModal: true,
        Icon: Database,
    },
];
