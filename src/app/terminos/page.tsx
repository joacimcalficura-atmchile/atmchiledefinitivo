"use client";

import React from "react";
import { m } from "framer-motion";
import { FileText, Shield, Gavel, Handshake, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TerminosPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22D3EE]/5 border border-[#22D3EE]/10 text-[#0047AB] text-xs font-bold uppercase tracking-widest mb-6">
                        <Gavel size={14} />
                        Marco Legal Estratégico
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Términos de <span className="text-brand-cobalt">Servicio</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Al colaborar con ATM Chile, usted accede a un ecosistema de excelencia técnica regido por los más altos estándares corporativos y de cumplimiento.
                    </p>
                </m.div>

                {/* Content */}
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid gap-8"
                >
                    {[
                        {
                            title: "Prestación de Servicios 360",
                            content: "ATM Chile se compromete a entregar servicios de consultoría, arquitectura y desarrollo tecnológico bajo el principio de 'Audit-Ready'. Todo entregable debe cumplir con criterios técnicos senior antes de su paso a producción.",
                            icon: <Handshake className="text-brand-cobalt" />
                        },
                        {
                            title: "Propiedad Intelectual",
                            content: "Salvo acuerdo explícito en contrario, los desarrollos personalizados realizados para el cliente son de propiedad exclusiva del cliente una vez finalizada la relación contractual y liquidados los haberes correspondientes. ATM Chile retiene la propiedad de sus marcos de trabajo base y metodologías propietarias.",
                            icon: <FileText className="text-brand-cyan" />
                        },
                        {
                            title: "Responsabilidad y Garantía",
                            content: "Ofrecemos una garantía de soporte sobre el código entregado, asegurando la resolución de fallos críticos en los términos acordados en el SLA (Service Level Agreement). Nuestra responsabilidad está limitada al valor del servicio contratado, enfocándonos siempre en la continuidad operativa.",
                            icon: <Shield className="text-brand-cobalt" />
                        },
                        {
                            title: "Cumplimiento y Jurisdicción",
                            content: "Nuestros términos se rigen por las leyes vigentes de la República de Chile. Cualquier discrepancia técnica será resuelta preferentemente mediante paneles de expertos senior antes de recurrir a instancias legales ordinarias.",
                            icon: <Gavel className="text-brand-cyan" />
                        }
                    ].map((section, i) => (
                        <m.div
                            key={section.title}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex gap-6">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-brand-cobalt/5 group-hover:border-brand-cobalt/10 transition-colors">
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{section.content}</p>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </m.div>

                {/* Footer Legal */}
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <p className="text-xs text-slate-400 font-medium">
                        Documento oficial para Partners ATM Chile
                    </p>
                    <div className="flex gap-4">
                        <Link href="/contacto" className="text-sm font-bold text-brand-cobalt hover:underline flex items-center gap-1">
                            Sesión Estratégica <ChevronRight size={14} />
                        </Link>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
