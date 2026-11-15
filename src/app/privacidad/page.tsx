"use client";

import React from "react";
import { m } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, ChevronRight, Cookie, Scale, Globe } from "lucide-react";
import { openConsentPreferences } from "@/lib/consent";
import Link from "next/link";

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cobalt/5 border border-brand-cobalt/10 text-brand-cobalt text-xs font-bold uppercase tracking-widest mb-6">
                        <Lock size={14} />
                        Transparencia & Seguridad · ISO 27001 en proceso
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Política de <span className="text-brand-cobalt">Privacidad</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        En ATM Chile, la protección de su propiedad intelectual y datos estratégicos es nuestra máxima prioridad. Este documento detalla cómo salvaguardamos su información en nuestra relación 360.
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
                            title: "Compromiso de Confidencialidad (NDA)",
                            content: "Todo proyecto iniciado con ATM Chile está bajo un protocolo estricto de Acuerdo de Confidencialidad. No compartimos, vendemos ni exponemos la lógica de negocio, bases de datos o infraestructuras de nuestros clientes a terceros. Su 'receta secreta' está segura con nosotros.",
                            icon: <ShieldCheck className="text-brand-cobalt" />
                        },
                        {
                            title: "Recolección de Datos Estratégicos",
                            content: "Recopilamos únicamente la información necesaria para la ejecución de servicios de consultoría, desarrollo de software y auditoría de ciberseguridad. Esto incluye datos corporativos, flujos de procesos e infraestructura técnica bajo su consentimiento explícito.",
                            icon: <Eye className="text-brand-cyan" />
                        },
                        {
                            title: "Seguridad de la Información",
                            content: "Implementamos estándares de encriptación de grado militar (AES-256) para el almacenamiento de datos sensibles y seguimos las mejores prácticas de OWASP y marcos ISO 27001 en todos nuestros despliegues.",
                            icon: <Lock className="text-brand-cobalt" />
                        },
                        {
                            id: "datos-sitio",
                            title: "Datos que recogemos en este sitio",
                            content: "Cuando nos escribes por el formulario de contacto, WhatsApp o el chat, tratamos tu nombre, correo, teléfono, empresa y el mensaje que envías, con la única finalidad de responder tu consulta y preparar una propuesta comercial. Usamos proveedores de infraestructura (alojamiento web, correo y hojas de cálculo en la nube) que actúan por encargo de ATM Chile. No vendemos ni cedemos tus datos a terceros para sus propios fines.",
                            icon: <Globe className="text-brand-cobalt" />
                        },
                        {
                            id: "cookies",
                            title: "Cookies y tecnologías de medición",
                            content: "Usamos cookies esenciales para que el sitio funcione, recordar tu elección y proteger los formularios. Las cookies de analítica (medición anónima de visitas y contactos) y de marketing (píxeles publicitarios, como el de Meta) solo se activan si las aceptas en el aviso de entrada. Puedes cambiar o retirar tu consentimiento en cualquier momento.",
                            icon: <Cookie className="text-brand-cyan" />,
                            action: true
                        },
                        {
                            id: "derechos",
                            title: "Derechos del Titular",
                            content: "Conforme a la Ley 19.628, modificada por la Ley 21.719, puedes solicitar el acceso, rectificación, supresión, oposición, portabilidad y bloqueo de tus datos personales, y retirar tu consentimiento cuando quieras. Escríbenos desde la página de contacto y responderemos dentro de los plazos legales. También puedes reclamar ante la Agencia de Protección de Datos Personales.",
                            icon: <FileText className="text-brand-cyan" />
                        },
                        {
                            id: "compliance",
                            title: "Cumplimiento normativo",
                            content: "Alineamos nuestra gestión con la Ley 21.719 de protección de datos personales, la Ley 21.663 Marco de Ciberseguridad y la norma NCh-ISO 27001, cuya certificación se encuentra en proceso. Conservamos los datos solo el tiempo necesario para la finalidad informada o el que exija la ley.",
                            icon: <Scale className="text-brand-cobalt" />
                        }
                    ].map((section, i) => (
                        <m.div
                            key={section.title}
                            id={"id" in section ? section.id : undefined}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="scroll-mt-32 p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex gap-6">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-brand-cobalt/5 group-hover:border-brand-cobalt/10 transition-colors">
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{section.content}</p>
                                    {"action" in section && section.action && (
                                        <button
                                            type="button"
                                            onClick={openConsentPreferences}
                                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-cobalt hover:underline"
                                        >
                                            Cambiar mis preferencias de cookies <ChevronRight size={14} />
                                        </button>
                                    )}
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
                        Última actualización: 15 de noviembre de 2026
                    </p>
                    <div className="flex gap-4">
                        <Link href="/contacto" className="text-sm font-bold text-brand-cobalt hover:underline flex items-center gap-1">
                            Consultas Legales <ChevronRight size={14} />
                        </Link>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
