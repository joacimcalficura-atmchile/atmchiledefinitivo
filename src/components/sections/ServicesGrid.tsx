"use client";
import { m } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import {
    Cpu,
    ShieldCheck,
    Layers,
    Users,
    LineChart,
    Zap
} from "lucide-react";

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string;
}

const services: ServiceItem[] = [
    {
        title: "IA & Automatización",
        description: "Despliegue de agentes inteligentes y LLMs locales para optimizar procesos críticos sin fuga de datos.",
        icon: <Cpu className="w-6 h-6" />,
        tech: "Python / PyTorch / LangChain"
    },
    {
        title: "Ciberseguridad 360",
        description: "Evaluación estratégica y blindaje de infraestructura. Entornos de alta confianza contra OWASP Top 10 y Zero-Day.",
        icon: <ShieldCheck className="w-6 h-6" />,
        tech: "ISO 27001 / Pentesting"
    },
    {
        title: "Arquitectura Cloud",
        description: "Diseño de sistemas resilientes en AWS/Azure con escalado automático y alta disponibilidad.",
        icon: <Layers className="w-6 h-6" />,
        tech: "Docker / Kubernetes / Terraform"
    },
    {
        title: "Talento Senior On-Demand",
        description: "Células ágiles de programadores subcontratados, gestionados bajo nuestra supervisión técnica senior.",
        icon: <Users className="w-6 h-6" />,
        tech: "Agile / Senior Management"
    },
    {
        title: "BI & Data Strategy",
        description: "Transformamos datos crudos en dashboards estratégicos para la toma de decisiones gerenciales.",
        icon: <LineChart className="w-6 h-6" />,
        tech: "PowerBI / SQL / Snowflake"
    },
    {
        title: "RPA Enterprise",
        description: "Automatización de tareas repetitivas mediante robots de software, elevando la precisión operativa a su máximo nivel.",
        icon: <Zap className="w-6 h-6" />,
        tech: "UiPath / BluePrism / Custom Bots"
    }
];

export const ServicesGrid = () => {
    return (
        <section id="servicios" className="py-24 px-6 relative w-full">
            <div className="max-w-7xl mx-auto">
                {/* Header de la sección */}
                <div className="mb-16">
                    <m.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-slate-900 mb-4"
                    >
                        Capacidades del Partner <span className="text-brand-cobalt">360</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-brand-slate max-w-2xl"
                    >
                        Soluciones enterprise diseñadas para escalar. No somos un proveedor, somos la extensión tecnológica de su empresa.
                    </m.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <GlassCard
                            key={index}
                            delay={index * 0.1}
                            className="group hover:bg-white/60 transition-all duration-500 border-white/40 h-full"
                        >
                            <div className="flex flex-col h-full min-h-[300px]">
                                <div className="mb-6 p-3 w-fit rounded-xl bg-brand-cobalt/5 text-brand-cobalt group-hover:bg-brand-cobalt group-hover:text-white transition-colors duration-500">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-cobalt transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                    {service.description}
                                </p>

                                <div className="pt-4 border-t border-slate-200/50 flex justify-between items-center mt-auto">
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                        Stack: {service.tech}
                                    </span>
                                    {/* Micro-interacción: LED pulse indicator */}
                                    <div className="w-2 h-2 rounded-full bg-brand-cobalt/20 group-hover:bg-brand-cobalt animate-pulse" />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
