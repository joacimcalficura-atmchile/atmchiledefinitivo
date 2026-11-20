"use client";
import React, { useState, useRef } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    Lock,
    FileCode2,
    Terminal,
    ArrowRight,
    ArrowDown,
    X,
    BadgeCheck,
    RefreshCw,
    ScanSearch,
    ListChecks,
    ShieldHalf,
    Activity,
} from "lucide-react";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { useDialogA11y } from "@/hooks/useDialogA11y";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface ModalSection {
    heading: string;
    body: string;
}

interface SecurityPillar {
    id: string;
    title: string;
    shortDesc: string;
    icon: React.ReactNode;
    badge: string;
    modal: {
        tag: string;
        headline: string;
        intro: string;
        sections: ModalSection[];
        cta: string;
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// PILARES DATA — Normativa Chilena + Técnica Senior
// ─────────────────────────────────────────────────────────────────────────────
const PILLARS: SecurityPillar[] = [
    {
        id: "nch-iso-27001",
        title: "NCh-ISO 27001 · en proceso de certificación",
        shortDesc: "Sistema de Gestión de Seguridad de la Información. Auditorías continuas y gestión robusta de riesgos bajo norma chilena e internacional.",
        icon: <BadgeCheck className="w-5 h-5" />,
        badge: "SGSI · AUDITORÍA · RIESGOS",
        modal: {
            tag: "NCh-ISO 27001:2022",
            headline: "Sistema de Gestión de Seguridad de la Información",
            intro: "La norma NCh-ISO/IEC 27001, adoptada por el Instituto Nacional de Normalización (INN) para Chile, establece los requisitos para implementar, mantener y mejorar continuamente un SGSI alineado con los estándares internacionales más exigentes.",
            sections: [
                {
                    heading: "Alcance y Marco Legal",
                    body: "Cubrimos todos los activos de información críticos bajo el Decreto Supremo N° 83 y la Política Nacional de Ciberseguridad 2023-2028. El SGSI incluye procedimientos de clasificación de activos, análisis de amenazas y planes de tratamiento de riesgos documentados y revisados por un CISO certificado."
                },
                {
                    heading: "Gestión de Riesgos (Cláusula 6.1)",
                    body: "Evaluación de riesgos mediante metodología ISO/IEC 27005. Criterios de aceptación definidos, registro de riesgos formalizados y revisión semestral. Controles seleccionados del Anexo A con Declaración de Aplicabilidad (SoA) mantenida al día."
                },
                {
                    heading: "Auditorías Internas y Revisiones",
                    body: "Ciclo de auditorías internas trimestrales con registros de no-conformidades y planes de acción correctiva. Revisión gerencial anual con métricas KPI de seguridad (MTTD, MTTR, ratio de incidentes). Preparación completa para auditoría externa de certificación."
                }
            ],
            cta: "Ver Hoja de Ruta de Certificación"
        }
    },
    {
        id: "ley-ciberseguridad-chile",
        title: "Ley Marco de Ciberseguridad",
        shortDesc: "Cumplimiento de la nueva Ley N°21.663 chilena, infraestructura crítica y protección de datos personales (Ley N°19.628 actualizada).",
        icon: <ShieldCheck className="w-5 h-5" />,
        badge: "LEY 21.663 · CSIRT · DATOS",
        modal: {
            tag: "Ley N°21.663 · Chile 2024",
            headline: "Cumplimiento Ley Marco de Ciberseguridad e Infraestructura Crítica",
            intro: "La Ley N°21.663 (promulgada en 2024) establece la Agencia Nacional de Ciberseguridad (ANCI) y define obligaciones concretas para operadores de infraestructura crítica de la información. Nuestra plataforma está diseñada para cumplir cada artículo exigible.",
            sections: [
                {
                    heading: "Notificación Obligatoria de Incidentes (Art. 23)",
                    body: "Implementamos pipelines de detección y reporte automático al CSIRT Nacional dentro de las 3 horas exigidas por la ley para incidentes críticos. Contamos con runbooks documentados para cada categoría de incidente (confidencialidad, integridad, disponibilidad)."
                },
                {
                    heading: "Protección de Datos Personales — Ley N°19.628",
                    body: "Base de datos mínima necesaria para el servicio (data minimization). Contratos de mandatarios/procesadores firmados y auditados. Procedimientos de ejercicio de derechos ARCO documentados con time-to-respond < 15 días hábiles. Transferencias internacionales solo a países con nivel de protección adecuado."
                },
                {
                    heading: "Coordinación con CSIRT Gov y Sectorial",
                    body: "Integración técnica con los indicadores de compromiso (IoC) publicados por CSIRT del Gobierno de Chile. Participación en mesas de trabajo sectoriales para el intercambio de inteligencia de amenazas bajo el Protocolo TLP (Traffic Light Protocol)."
                }
            ],
            cta: "Descargar Declaración de Conformidad Legal"
        }
    },
    {
        id: "zero-trust-aes256",
        title: "Zero Trust & Encriptación AES-256",
        shortDesc: "Arquitectura Zero Trust nativa. AES-256 en reposo y TLS 1.3 en tránsito. Control de accesos granular con principio de mínimo privilegio.",
        icon: <Lock className="w-5 h-5" />,
        badge: "AES-256 · TLS 1.3 · RBAC",
        modal: {
            tag: "Zero Trust Architecture",
            headline: "Encriptación de Nivel Militar y Control de Accesos Granular",
            intro: "Nuestra arquitectura opera bajo el principio 'Never Trust, Always Verify'. Todo acceso — interno o externo — es auténticado, autorizado y cifrado antes de permitir cualquier operación sobre datos sensibles.",
            sections: [
                {
                    heading: "Encriptación de Datos",
                    body: "AES-256-GCM en reposo para todas las bases de datos y almacenamiento de archivos. TLS 1.3 estricto (sin fallback a 1.2) en todos los canales de transmisión. Gestión de claves mediante KMS dedicado con rotación automática cada 90 días y hardware security modules (HSM) para claves maestras."
                },
                {
                    heading: "Autenticación y Autorización",
                    body: "MFA obligatorio con TOTP (RFC 6238) y soporte de llaves de seguridad FIDO2/WebAuthn. RBAC + ABAC con revisiones de permisos trimestrales automatizadas. Sesiones JWT de vida corta (15 min) con refresh token rotation y detección de uso anómalo mediante ML."
                },
                {
                    heading: "Microsegmentación de Red",
                    body: "Segmentación de la infraestructura en zonas de confianza con políticas iptables y grupos de seguridad de nube. Inspección TLS en gateway con bloqueo automático de tráfico anómalo. VPNs de acceso basadas en identidad con registros de auditoría centralizados (SIEM)."
                }
            ],
            cta: "Solicitar Arquitectura de Referencia"
        }
    },
    {
        id: "owasp-sanitizacion",
        title: "Sanitización & Validación OWASP",
        shortDesc: "Prevención estricta de Inyecciones SQL, XSS y mitigación del OWASP Top 10 desde el backend con validación esquemas Zod.",
        icon: <FileCode2 className="w-5 h-5" />,
        badge: "OWASP · ZOD · PARAMETERIZED",
        modal: {
            tag: "OWASP Top 10 — 2021/2025",
            headline: "Sanitización Total y Defensa en Capas contra Vulnerabilidades Web",
            intro: "Implementamos controles técnicos específicos para cada vulnerabilidad del OWASP Top 10, con validación de entrada en todas las capas (API Gateway, servidor de aplicaciones y base de datos), eliminando vectores de ataque desde el origen.",
            sections: [
                {
                    heading: "Validación y Sanitización de Entradas (A03 — Injection)",
                    body: "100% de endpoints API validados mediante esquemas Zod con modo strict. Consultas parametrizadas obligatorias (sin interpolación de strings en SQL). Salida codificada con encode/escape contextual (HTML, JS, URL, CSS) para prevención XSS. CSP Level 3 con nonces dinámicos en cada respuesta para bloquear scripts no autorizados."
                },
                {
                    heading: "Gestión de Autenticación y Sesiones (A01, A07)",
                    body: "Contraseñas hasheadas con Argon2id (configuración: m=65536, t=3, p=4). Tiempo de respuesta de login constante para prevenir enumeración de usuarios. Rate limiting por IP + usuario con exponential backoff. Invalidación de sesión universal (logout de todos los dispositivos) disponible para el usuario."
                },
                {
                    heading: "Componentes y Configuración Segura (A05, A06)",
                    body: "Auditoría semanal automatizada de dependencias con `npm audit` y Snyk. Política de dependencias: solo versiones LTS con mantenimiento activo. Headers de seguridad HTTP configurados: HSTS (max-age=31536000), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy restrictiva."
                }
            ],
            cta: "Ver Informe de Pentest Último Ciclo"
        }
    },
    {
        id: "bcp-drp",
        title: "Continuidad de Negocio (BCP/DRP)",
        shortDesc: "Planes de recuperación ante desastres, redundancia de servidores y arquitecturas resilientes con un SLA de disponibilidad del 99,597 %.",
        icon: <RefreshCw className="w-5 h-5" />,
        badge: "BCP · RTO<4H · RPO<1H",
        modal: {
            tag: "ISO 22301 · BCP / DRP",
            headline: "Continuidad Operacional y Recuperación ante Desastres Garantizada",
            intro: "La continuidad del negocio de cada cliente es no negociable. Nuestra arquitectura cloud-native está diseñada para garantizar una disponibilidad del 99,597 % (SLA) con planes de recuperación probados y documentados bajo ISO 22301.",
            sections: [
                {
                    heading: "Arquitectura de Alta Disponibilidad",
                    body: "Despliegue multi-región activo-pasivo con failover automático < 5 minutos. Load balancers con health checks cada 10 segundos. Bases de datos con replicación síncrona cross-region (read replicas en 2 regiones adicionales). CDN edge nodes distribuidos para disponibilidad de assets estáticos con 100% SLA."
                },
                {
                    heading: "Backup y Recovery (RTO/RPO)",
                    body: "Backups automatizados cada hora con retención de 30 días (cifrados AES-256). RTO objetivo: < 4 horas para recuperación completa del sistema. RPO objetivo: < 1 hora de pérdida máxima de datos. Pruebas de restore documentadas mensualmente con evidencia de éxito. Almacenamiento de backups en región geográfica diferente según Ley N°19.628."
                },
                {
                    heading: "Plan de Respuesta a Incidentes (IRP)",
                    body: "Runbooks detallados para cada escenario de desastre (ransomware, falla de DC, brecha de datos). Equipo de respuesta 24/7 con escalamiento definido. Simulacros de DR semestrales con métricas MTTD/MTTR documentadas. Post-mortems obligatorios con análisis de causa raíz (5 Whys + Fishbone)."
                }
            ],
            cta: "Solicitar Informe BCP Ejecutivo"
        }
    },
    {
        id: "devsecops-sast-dast",
        title: "Pipeline DevSecOps & SAST/DAST",
        shortDesc: "Análisis de seguridad estático y dinámico continuo (SAST/DAST) integrado en el pipeline CI/CD antes de cada despliegue a producción.",
        icon: <Terminal className="w-5 h-5" />,
        badge: "SAST · DAST · CI/CD · SCA",
        modal: {
            tag: "DevSecOps Pipeline",
            headline: "Seguridad Integrada en Cada Commit — Shift-Left Security",
            intro: "Adoptamos el enfoque 'Security as Code' con controles automáticos de seguridad en cada etapa del ciclo de vida del software (SDLC). El objetivo es detectar vulnerabilidades en el origen — en el código — antes de llegar a producción.",
            sections: [
                {
                    heading: "SAST — Análisis Estático (Pre-commit)",
                    body: "Análisis estático integrado en el IDE y el pipeline CI/CD como quality gate bloqueante. Herramientas: Semgrep (reglas customizadas para el stack Next.js/TypeScript), ESLint Security Plugin y CodeQL. Umbral de severidad: 0 vulnerabilidades CRITICAL o HIGH permiten el merge a main."
                },
                {
                    heading: "DAST — Análisis Dinámico (Pre-producción)",
                    body: "OWASP ZAP en modo headless ejecutado automáticamente en el entorno de staging antes de cada release. Escaneo activo de APIs REST con fuzzing de parámetros. Resultados integrados en el dashboard de seguridad del equipo con asignación automática de tickets para hallazgos. SCA (Software Composition Analysis) con detección de licencias incompatibles y CVEs en dependencias."
                },
                {
                    heading: "Infraestructura como Código Segura (IaC)",
                    body: "Escaneo de templates Terraform/Pulumi con Checkov y Terrascan para detectar misconfiguraciones de cloud (puertos abiertos, buckets públicos, cifrado ausente). Políticas de seguridad como código (OPA/Rego) aplicadas en el Admission Controller de Kubernetes. Secretos gestionados con Vault o AWS Secrets Manager — prohibido en variables de entorno no cifradas."
                }
            ],
            cta: "Ver Métricas del Pipeline de Seguridad"
        }
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMACIÓN
// ─────────────────────────────────────────────────────────────────────────────
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 26 } },
    exit: { opacity: 0, scale: 0.97, y: 20, transition: { duration: 0.2 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DE LA PÁGINA
// ─────────────────────────────────────────────────────────────────────────────
const HERO_FACTS = [
    { value: "Ley 21.663", label: "Ley Marco de Ciberseguridad" },
    { value: "ISO 27001", label: "en proceso de certificación" },
    { value: "99,597 %", label: "SLA de disponibilidad" },
    { value: "RTO < 4 h", label: "recuperación ante desastres" },
];

/** Método en cuatro pasos (mensaje de marca: evaluamos, diagnosticamos y solventamos). */
const STEPS = [
    { icon: ScanSearch, title: "Evaluamos", text: "Revisamos tu infraestructura, tus accesos y dónde viven tus datos críticos." },
    { icon: ListChecks, title: "Diagnosticamos", text: "Priorizamos los riesgos frente a la Ley 21.663 y la NCh-ISO 27001, con un plan claro." },
    { icon: ShieldHalf, title: "Protegemos", text: "Implementamos los controles: Zero Trust, cifrado, validación OWASP y respaldos." },
    { icon: Activity, title: "Acompañamos", text: "Monitoreamos, probamos la recuperación y te reportamos de forma continua." },
];

// ─────────────────────────────────────────────────────────────────────────────
// TARJETA DE PILAR
// ─────────────────────────────────────────────────────────────────────────────
function PillarCard({ pillar, index, onOpen }: { pillar: SecurityPillar; index: number; onOpen: (p: SecurityPillar) => void }) {
    return (
        <m.li variants={rise} className="h-full">
            <button
                id={`pillar-card-${pillar.id}`}
                type="button"
                onClick={() => onOpen(pillar)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-[0_10px_40px_rgba(15,18,21,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#176BDE]/40 hover:shadow-[0_24px_60px_rgba(23,107,222,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176BDE] sm:p-7 md:p-8"
            >
                {/* Filete superior Sapphire → Neon Ice que se enciende al pasar */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176BDE]/10 text-[#176BDE] transition-colors duration-300 group-hover:bg-[#176BDE] group-hover:text-white [&_svg]:h-6 [&_svg]:w-6">
                        {pillar.icon}
                    </span>
                    <span className="text-3xl font-black leading-none tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-[#176BDE]/40">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </span>
                <span className="mt-6 block text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#176BDE] md:text-xl">
                    {pillar.title}
                </span>
                <span className="mt-3 block flex-1 text-[0.9375rem] leading-relaxed text-slate-600">{pillar.shortDesc}</span>
                <span className="mt-6 flex flex-wrap gap-2">
                    {pillar.badge.split(" · ").map((b) => (
                        <span key={b} className="rounded-md border border-[#b8ccf0] bg-[#f2f7ff] px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-wide text-[#0E4FA5]">
                            {b}
                        </span>
                    ))}
                </span>
                <span className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-bold text-[#176BDE]">
                    Ver detalle técnico
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
            </button>
        </m.li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL TÉCNICO
// ─────────────────────────────────────────────────────────────────────────────
function TechnicalModal({ pillar, onClose }: { pillar: SecurityPillar; onClose: () => void }) {
    // Foco atrapado en el diálogo, Escape cierra y el foco vuelve al botón que lo abrió.
    const dialogRef = useRef<HTMLDivElement>(null);
    useDialogA11y(dialogRef, { onClose });

    const mdata = pillar.modal;

    return (
        <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[10000] flex items-end justify-center outline-none sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-seguridad-titulo">
            <m.div
                variants={backdropVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={onClose}
                aria-hidden="true"
                className="absolute inset-0 bg-[#0F1215]/70 backdrop-blur-md"
            />

            {/* En el teléfono sube como hoja inferior; en escritorio, centrado. */}
            <m.div
                variants={modalVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-[2rem]"
            >
                <header className="relative isolate shrink-0 overflow-hidden bg-[#0F1215] px-5 pb-6 pt-5 sm:px-8 sm:py-7">
                    <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                    <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-[#176BDE]/30 blur-[90px]" />
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#176BDE] text-white sm:flex [&_svg]:h-6 [&_svg]:w-6">
                                {pillar.icon}
                            </span>
                            <div>
                                <span className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#16F3E8]">{mdata.tag}</span>
                                <h2 id="modal-seguridad-titulo" className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                                    {mdata.headline}
                                </h2>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16F3E8]"
                            aria-label="Cerrar"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </header>

                <div tabIndex={0} className="flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#176BDE] overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
                    <div className="mx-auto max-w-3xl">
                        <p className="mb-8 border-l-4 border-[#176BDE] pl-4 text-base font-medium leading-relaxed text-slate-700 sm:pl-6 sm:text-lg">
                            {mdata.intro}
                        </p>
                        <div className="grid gap-6 sm:gap-8">
                            {mdata.sections.map((section) => (
                                <section key={section.heading} className="rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-[#f2f7ff] p-5 sm:p-6">
                                    <h3 className="text-sm font-black uppercase tracking-wider text-[#0E4FA5]">{section.heading}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">{section.body}</p>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="flex shrink-0 flex-col items-stretch gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
                    <span className="hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 sm:flex">
                        <ShieldCheck size={14} className="text-[#176BDE]" aria-hidden />
                        Ciberseguridad 360 · ATM
                    </span>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0E4FA5]"
                    >
                        {mdata.cta}
                        <ArrowRight size={16} aria-hidden />
                    </Link>
                </footer>
            </m.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────────────────────────
export default function SeguridadPage() {
    const [activePillar, setActivePillar] = useState<SecurityPillar | null>(null);

    return (
        <div className="relative selection:bg-[#176BDE] selection:text-white">
            <AnimatePresence>
                {activePillar && <TechnicalModal key={activePillar.id} pillar={activePillar} onClose={() => setActivePillar(null)} />}
            </AnimatePresence>

            {/* ── Hero: Onyx + patrón andino-circuito ── */}
            {/* -mt-24 sube el fondo detrás del menú flotante (el <main> trae pt-24). */}
            <section className="relative isolate -mt-24 overflow-hidden bg-[#0F1215] pb-14 pt-36 md:pb-20 md:pt-48">
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                        <m.div initial={{ x: -32 }} animate={{ x: 0 }} transition={{ duration: 1.1, ease: smoothEase }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#16F3E8] backdrop-blur-md">
                                <ShieldCheck size={16} aria-hidden />
                                <span>Ciberseguridad 360</span>
                            </div>
                            <h1 className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
                                Seguridad que protege <span className="text-[#6AA5F5]">tu operación</span>
                            </h1>
                            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
                                Operamos bajo estándares globales, cumplimos la Ley Marco de Ciberseguridad y estamos en proceso de certificación{" "}
                                <strong className="font-bold text-white">NCh-ISO 27001</strong> para proteger los datos de tu empresa.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    id="cta-auditoria-seguridad"
                                    href="/contacto"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#176BDE] px-7 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(23,107,222,0.45)] ring-1 ring-inset ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A78F5] hover:shadow-[0_14px_40px_rgba(23,107,222,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Agenda una evaluación
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                                </Link>
                                <a
                                    href="#pilares"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Ver los 6 pilares
                                    <ArrowDown className="h-5 w-5 text-[#8FC0FF] transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
                                </a>
                            </div>
                        </m.div>

                        {/* Foto con marco de marca y sello de certificación */}
                        <m.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: smoothEase }}
                            className="relative"
                        >
                            <div aria-hidden="true" className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#176BDE]/70 via-white/10 to-[#16F3E8]/50" />
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0F1215]">
                                <Image
                                    src="/images/executive-security.png"
                                    alt="Especialista de seguridad monitoreando infraestructura crítica"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 46vw"
                                    className="object-cover"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1215]/80 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0F1215]/85 p-4 shadow-2xl backdrop-blur-xl sm:left-6 sm:right-auto sm:p-5">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#176BDE] text-white">
                                    <BadgeCheck className="h-6 w-6" aria-hidden />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-white">NCh-ISO 27001</p>
                                    <p className="text-xs text-slate-300">SGSI en proceso de certificación</p>
                                </div>
                            </div>
                        </m.div>
                    </div>

                    {/* Datos clave */}
                    <m.dl
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="mt-20 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md md:grid-cols-4"
                    >
                        {HERO_FACTS.map((f, i) => (
                            <m.div
                                key={f.label}
                                variants={rise}
                                className={`flex flex-col px-5 py-6 md:px-7 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                            >
                                <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{f.label}</dt>
                                <dd className="order-1 text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl">{f.value}</dd>
                            </m.div>
                        ))}
                    </m.dl>
                </div>
            </section>

            {/* ── Pilares: fondo claro con patrón ── */}
            <section id="pilares" aria-labelledby="pilares-titulo" className="relative isolate scroll-mt-24 overflow-hidden bg-[#F5F7FB] py-20 md:py-28">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
                    >
                        <div className="max-w-2xl">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#176BDE]">Sistemas críticos protegidos</p>
                            <h2 id="pilares-titulo" className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
                                Seis pilares, <span className="text-[#176BDE]">un solo estándar</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-base leading-relaxed text-slate-600">
                            Normativa chilena y práctica técnica senior. Abre cada pilar para ver los controles que aplicamos.
                        </p>
                    </m.div>

                    <m.ul
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                    >
                        {PILLARS.map((pillar, i) => (
                            <PillarCard key={pillar.id} pillar={pillar} index={i} onOpen={setActivePillar} />
                        ))}
                    </m.ul>
                </div>
            </section>

            {/* ── Método: Onyx con patrón ── */}
            <section aria-labelledby="metodo-titulo" className="relative isolate overflow-hidden bg-[#0F1215] py-20 md:py-28">
                <BrandPattern tone="onDark" opacity={0.07} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176BDE]/15 blur-[150px]" />
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#176BDE]/70 to-transparent" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="mb-12 max-w-3xl md:mb-16"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#176BDE]/40 bg-[#176BDE]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8FC0FF]">
                            Cómo trabajamos
                        </span>
                        <h2 id="metodo-titulo" className="mt-5 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                            Del diagnóstico a la <span className="text-[#6AA5F5]">protección continua</span>
                        </h2>
                    </m.div>

                    <m.ol
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
                    >
                        {STEPS.map((step, i) => (
                            <m.li
                                key={step.title}
                                variants={rise}
                                className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-7"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176BDE] text-white shadow-[0_8px_24px_rgba(23,107,222,0.45)]">
                                        <step.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <span className="font-slab text-sm font-medium text-[#16F3E8]">Paso {i + 1}</span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-300">{step.text}</p>
                            </m.li>
                        ))}
                    </m.ol>
                </div>
            </section>

            <ServicesCTA
                page="seguridad"
                title="Protejamos tu operación desde hoy"
                text="En una evaluación revisamos tus riesgos frente a la Ley 21.663 y te proponemos un plan de protección a la medida de tu empresa."
                primaryLabel="Agenda una evaluación"
                whatsappMessage="Quiero una evaluación de ciberseguridad."
            />
        </div>
    );
}
