"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    Lock,
    ServerCrash,
    FileCode2,
    Terminal,
    GraduationCap,
    ArrowRight,
    Zap,
    X,
    ExternalLink,
    ChevronRight,
    BadgeCheck,
    AlertTriangle,
    RefreshCw,
    Database,
} from "lucide-react";

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
    color: string;
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
        title: "Certificación NCh-ISO 27001",
        shortDesc: "Sistema de Gestión de Seguridad de la Información. Auditorías continuas y gestión robusta de riesgos bajo norma chilena e internacional.",
        icon: <BadgeCheck className="w-5 h-5" />,
        badge: "SGSI · AUDITORÍA · RIESGOS",
        color: "#3B00B9",
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
        color: "#7C3AED",
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
        color: "#059669",
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
        color: "#DC2626",
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
        shortDesc: "Planes de recuperación ante desastres, redundancia de servidores y arquitecturas resilientes con SLA de 99.9% de uptime garantizado.",
        icon: <RefreshCw className="w-5 h-5" />,
        badge: "BCP · RTO<4H · RPO<1H",
        color: "#D97706",
        modal: {
            tag: "ISO 22301 · BCP / DRP",
            headline: "Continuidad Operacional y Recuperación ante Desastres Garantizada",
            intro: "La continuidad del negocio de nuestros clientes es no negociable. Nuestra arquitectura cloud-native está diseñada para garantizar disponibilidad del 99.9% con planes de recuperación probados y documentados bajo ISO 22301.",
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
        color: "#0891B2",
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
// FRAMER MOTION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 120, damping: 20 }
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 }
    }
};

const backdropVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
    exit:  { opacity: 0, transition: { duration: 0.2 } }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 40 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 26 }
    },
    exit: {
        opacity: 0,
        scale: 0.94,
        y: 20,
        transition: { duration: 0.22 }
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// PILLAR CARD — mini component
// ─────────────────────────────────────────────────────────────────────────────
interface PillarCardProps {
    pillar: SecurityPillar;
    onOpen: (pillar: SecurityPillar) => void;
    side: "left" | "right";
}

function PillarCard({ pillar, onOpen, side }: PillarCardProps) {
    return (
        <m.button
            id={`pillar-card-${pillar.id}`}
            type="button"
            aria-label={`Ver detalles: ${pillar.title}`}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 22 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpen(pillar)}
            className="group w-full text-left bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:shadow-[#0047AB]/8 hover:border-[#0047AB]/25 rounded-[2rem] p-6 lg:p-8 transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0047AB]"
        >
            <div className="flex items-start gap-3 mb-2.5">
                <div
                    className="p-2.5 rounded-xl border shadow-sm flex-shrink-0 transition-colors duration-300 group-hover:border-transparent"
                    style={{
                        backgroundColor: `${pillar.color}10`,
                        color: pillar.color,
                        borderColor: `${pillar.color}25`
                    }}
                >
                    {pillar.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight pt-1">{pillar.title}</h3>
            </div>

            <p className="text-slate-600 text-[13px] leading-relaxed mb-4">{pillar.shortDesc}</p>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] text-slate-500 border border-slate-200 bg-transparent rounded-md uppercase tracking-widest font-semibold truncate">
                    {pillar.badge}
                </span>
                <span
                    className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold text-[#0047AB] group-hover:gap-1.5 transition-all"
                    aria-hidden="true"
                >
                    Leer más
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
            </div>
        </m.button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAROUSEL — side column with auto-scroll + pause on hover
// ─────────────────────────────────────────────────────────────────────────────
interface CarouselColumnProps {
    pillars: SecurityPillar[];
    onOpen: (pillar: SecurityPillar) => void;
    side: "left" | "right";
}

function CarouselColumn({ pillars, onOpen, side }: CarouselColumnProps) {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setIdx((prev) => (prev + 1) % pillars.length);
        }, 7000);
    }, [pillars.length]);

    const clearIntervalRef = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (!paused) startInterval();
        return clearIntervalRef;
    }, [paused, startInterval, clearIntervalRef]);

    const handleMouseEnter = () => {
        setPaused(true);
        clearIntervalRef();
    };

    const handleMouseLeave = () => {
        setPaused(false);
    };

    return (
        <div
            className={`hidden lg:flex lg:col-span-1 flex-col gap-3 justify-center ${side === "left" ? "lg:order-1" : "lg:order-3"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={`Pilares de seguridad — columna ${side === "left" ? "izquierda" : "derecha"}`}
        >
            <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                    {[0, 1].map((offset) => {
                        const pillarIdx = (idx + offset) % pillars.length;
                        return (
                            <m.div
                                key={`${side}-${pillars[pillarIdx].id}-${offset}`}
                                variants={cardVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                            >
                                <PillarCard pillar={pillars[pillarIdx]} onOpen={onOpen} side={side} />
                            </m.div>
                        );
                    })}
                </AnimatePresence>

                <div className="flex justify-center gap-1.5 pt-1" role="tablist" aria-label="Indicadores de pilar">
                    {pillars.map((p, i) => (
                        <button
                            key={p.id}
                            role="tab"
                            aria-selected={i === idx}
                            aria-label={p.title}
                            onClick={() => { setIdx(i); clearIntervalRef(); setPaused(false); }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0047AB] ${i === idx ? "w-5 bg-[#0047AB]" : "bg-slate-300"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE CAROUSEL — Premium Auto-Scrolling Strip
// ─────────────────────────────────────────────────────────────────────────────
function MobileSecurityCarousel({ pillars, onOpen }: { pillars: SecurityPillar[], onOpen: (p: SecurityPillar) => void }) {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setIdx((prev) => (prev + 1) % pillars.length);
        }, 7000);
    }, [pillars.length]);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (!paused) startInterval();
        return stopInterval;
    }, [paused, startInterval, stopInterval]);

    return (
        <div 
            className="relative flex flex-col gap-8"
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <div className="relative overflow-hidden px-1">
                <m.div
                    animate={{ x: `-${idx * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className="flex"
                >
                    {pillars.map((pillar) => (
                        <div 
                            key={pillar.id} 
                            className="flex-shrink-0 w-full px-1"
                        >
                            <PillarCard pillar={pillar} onOpen={onOpen} side="left" />
                        </div>
                    ))}
                </m.div>
            </div>

            <div className="flex items-center justify-center gap-2">
                {pillars.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setIdx(i); setPaused(true); }}
                        className={`transition-all duration-700 rounded-full h-1.5 ${
                            i === idx 
                                ? "w-10 bg-[#3B00B9] shadow-[0_0_12px_rgba(59,0,185,0.4)]" 
                                : "w-1.5 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Ir a pilar ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TECHNICAL MODAL
// ─────────────────────────────────────────────────────────────────────────────
interface TechnicalModalProps {
    pillar: SecurityPillar | null;
    onClose: () => void;
}

function TechnicalModal({ pillar, onClose }: TechnicalModalProps) {
    useEffect(() => {
        if (!pillar) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [pillar, onClose]);

    if (!pillar) return <AnimatePresence />;

    const mdata = pillar.modal;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 cursor-default">
                <m.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    onClick={onClose}
                    className="absolute inset-0 bg-[#001A40]/40 backdrop-blur-md"
                />

                <m.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col"
                >
                    <header className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div
                                className="p-2.5 rounded-2xl shadow-sm"
                                style={{ backgroundColor: `${pillar.color}10`, color: pillar.color }}
                            >
                                {pillar.icon}
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {mdata.tag}
                                </span>
                                <h2 className="text-xl font-bold text-slate-900 leading-none mt-1">
                                    {mdata.headline}
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-10 border-l-4 pl-6 border-[#00AEEF]">
                                {mdata.intro}
                            </p>

                            <div className="grid gap-12">
                                {mdata.sections.map((section, sidx) => (
                                    <div key={sidx} className="group">
                                        <h3 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[#0047AB] mb-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                                            {section.heading}
                                        </h3>
                                        <div className="text-slate-600 text-sm leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100 group-hover:border-[#00AEEF]/20 transition-colors">
                                            {section.body}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <footer className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-[#059669]" />
                            Cumplimiento Auditado
                        </div>
                        <Link
                            href="/contacto"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#3B00B9] text-white rounded-2xl font-bold text-sm hover:scale-[1.02] hover:shadow-xl transition-all"
                        >
                            {mdata.cta}
                            <ArrowRight size={16} />
                        </Link>
                    </footer>
                </m.div>
            </div>
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SeguridadPage() {
    const [activePillar, setActivePillar] = useState<SecurityPillar | null>(null);

    const leftPillars = PILLARS.slice(0, 3);
    const rightPillars = PILLARS.slice(3, 6);

    return (
        <>
            <TechnicalModal
                pillar={activePillar}
                onClose={() => setActivePillar(null)}
            />

            <div className="min-h-screen bg-white relative overflow-hidden font-sans pt-20 lg:pt-28 pb-12">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top translate-x-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-50/30 blur-[120px] pointer-events-none" />

                <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">

                        {/* ── LEFT CAROUSEL ── */}
                        <CarouselColumn pillars={leftPillars} onOpen={setActivePillar} side="left" />

                        {/* ── CENTER PANEL (Hero Image + Info) ── */}
                        <m.div
                            variants={cardVariants}
                            initial="hidden"
                            animate="show"
                            className="lg:col-span-3 lg:order-2 flex flex-col items-center justify-center relative rounded-[3rem] overflow-hidden bg-[#001A40] aspect-square md:aspect-video lg:aspect-auto self-stretch lg:h-[650px] shadow-2xl group"
                        >
                            <Image
                                src="/images/executive-security.png"
                                alt="Senior Security Architect monitoring critical infrastructure"
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                priority
                                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-[5000ms] ease-out"
                            />

                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[#001A40]/70 via-[#001A40]/20 to-transparent z-10 pointer-events-none"
                                aria-hidden="true"
                            />

                            {/* Floating glass card */}
                            <div className="relative z-20 m-5 lg:m-7 bg-white/85 backdrop-blur-2xl border border-white/90 shadow-2xl rounded-[2rem] p-7 md:p-9 text-center">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0047AB]/5 border border-[#0047AB]/10 text-xs font-bold uppercase tracking-[0.2em] text-[#0047AB] mb-5">
                                    <ShieldCheck size={14} className="text-[#22D3EE]" />
                                    Innovación y Escalabilidad
                                </span>

                                <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed mb-7">
                                    Nuestro compromiso es con la seguridad total. Operamos bajo estándares globales y nos encontramos en vías de certificación{" "}
                                    <strong className="text-slate-900 font-black">ISO 27001</strong>{" "}
                                    para garantizar la protección absoluta de sus datos.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                                    <Link
                                        id="cta-auditoria-seguridad"
                                        href="/servicios"
                                        className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#3B00B9] text-white rounded-2xl font-bold text-sm overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(59,0,185,0.3)] active:scale-[0.98]"
                                        prefetch={true}
                                    >
                                        <span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                                            aria-hidden="true"
                                        />
                                        Potenciar Operación 360
                                        <Zap size={16} className="group-hover:rotate-12 transition-transform" />
                                    </Link>
                                    <Link
                                        id="cta-club100-seguridad"
                                        href="/#club100"
                                        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                                    >
                                        Descubrir el Club 100
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </m.div>

                        {/* ── RIGHT CAROUSEL ── */}
                        <CarouselColumn pillars={rightPillars} onOpen={setActivePillar} side="right" />

                    </div>

                    {/* Mobile: Dynamic Auto-Scrolling Carousel (below central panel) */}
                    <div className="lg:hidden w-full max-w-[1600px] mx-auto px-3 sm:px-4 mt-2 mb-6">
                        <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-6">
                            Sistemas Críticos Protegidos
                        </p>
                        <MobileSecurityCarousel pillars={PILLARS} onOpen={setActivePillar} />
                    </div>
                </m.div>
            </div>
        </>
    );
}
