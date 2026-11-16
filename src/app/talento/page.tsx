"use client";
import React from "react";
import { m, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Users,
    Target,
    Settings,
    Lightbulb,
    ArrowRight,
    ArrowDown,
    CheckCircle2,
    TrendingUp,
    Compass,
    Map,
    Rocket,
    Flag,
    BrainCircuit,
    Linkedin,
} from "lucide-react";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

// ─────────────────────────────────────────────────────────
// CONTENIDO
// ─────────────────────────────────────────────────────────

const teamMembers = [
    {
        role: "Liderazgo tecnológico",
        desc: "Experiencia real en liderazgo tecnológico, conectando visión estratégica y ejecución práctica.",
        Icon: BrainCircuit,
        tags: ["CTO", "Tech Lead", "Arquitecto"],
    },
    {
        role: "Liderazgo operacional",
        desc: "Integramos cada iniciativa con el negocio, los procesos y la tecnología para lograr resultados medibles y sostenibles.",
        Icon: Settings,
        tags: ["COO", "PMO", "Ops Manager"],
    },
    {
        role: "Liderazgo comercial",
        desc: "No solo diseñamos la transformación: la implementamos con foco en el cliente y métricas de éxito claras.",
        Icon: TrendingUp,
        tags: ["CEO", "CSO", "Account Lead"],
    },
    {
        role: "Gestión del cambio",
        desc: "Acompañamos a los equipos desde el inicio, integrándolos al proceso y fortaleciendo las capacidades clave.",
        Icon: Users,
        tags: ["Change Manager", "Coach"],
    },
];

const phases = [
    {
        number: "01",
        title: "Escuchar y comprender",
        objective: "Conocer tu negocio, su estado actual y los desafíos de la empresa.",
        deliverables: ["Resumen ejecutivo", "Entrevistas clave", "Mapeo preliminar"],
        Icon: Compass,
    },
    {
        number: "02",
        title: "Planificar",
        objective: "Diseñar una hoja de ruta pragmática y priorizada que equilibre impacto y esfuerzo.",
        deliverables: ["Hoja de ruta tecnología, procesos y personas", "Priorización por impacto y esfuerzo", "Indicadores de éxito"],
        Icon: Map,
    },
    {
        number: "03",
        title: "Ejecutar y acompañar",
        objective: "Poner en marcha el plan con un acompañamiento cercano y práctico.",
        deliverables: ["Intervenciones por pilar", "Herramientas, rediseño de procesos y gestión del cambio", "Soporte en terreno"],
        Icon: Rocket,
    },
    {
        number: "04",
        title: "Transferir y consolidar",
        objective: "Asegurar la continuidad, empoderar a los equipos y dejar herramientas para el futuro.",
        deliverables: ["Capacitación", "Documentación", "Cierre y siguiente hoja de ruta"],
        Icon: Flag,
    },
];

const aportes = [
    {
        title: "Claridad estratégica",
        desc: "Te ayudamos a ordenar ideas, visualizar prioridades y tomar decisiones con foco en lo que genera mayor impacto.",
        Icon: Lightbulb,
    },
    {
        title: "Transformación realista y sostenible",
        desc: "Diseñamos soluciones desde tu realidad: procesos, personas y tecnología integrados de forma gradual y alineada a tu madurez organizacional.",
        Icon: TrendingUp,
    },
    {
        title: "Fortalecimiento del equipo",
        desc: "El cambio no es técnico, es humano. Trabajamos con tu equipo desde el inicio y fortalecemos las capacidades que sostienen la transformación.",
        Icon: Users,
    },
];

const HERO_FACTS = [
    { value: "Senior", label: "liderazgo con experiencia real" },
    { value: "4 fases", label: "del diagnóstico al traspaso" },
    { value: "24 h", label: "tiempo de respuesta" },
    { value: "99,597 %", label: "SLA de disponibilidad" },
];

const LEADERS = [
    { initials: "JC", name: "Joacim Calficura", role: "CEO", href: "https://www.linkedin.com/in/joacim-elias-calficura-marillanca-077bbb234/" },
    { initials: "AC", name: "Alberto Castillo", role: "Project Manager" },
];

// ─────────────────────────────────────────────────────────
// ANIMACIÓN
// ─────────────────────────────────────────────────────────
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const headerReveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: smoothEase },
};

// ─────────────────────────────────────────────────────────
// PÁGINA
// ─────────────────────────────────────────────────────────
export default function TalentoPage() {
    return (
        <div className="relative selection:bg-[#176BDE] selection:text-white">
            {/* ── Hero: Onyx + patrón andino-circuito ── */}
            {/* -mt-24 sube el fondo detrás del menú flotante (el <main> trae pt-24). */}
            <section id="talento" aria-labelledby="talento-heading" className="relative isolate -mt-24 overflow-hidden bg-[#0F1215] pb-14 pt-36 md:pb-20 md:pt-48">
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                        <m.div initial={{ x: -32 }} animate={{ x: 0 }} transition={{ duration: 1.1, ease: smoothEase }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#16F3E8] backdrop-blur-md">
                                <Target size={16} aria-hidden />
                                <span>Talento senior y transformación</span>
                            </div>
                            <h1 id="talento-heading" className="text-[2.4rem] font-black leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
                                Acompañamos a tu empresa en su <span className="text-[#6AA5F5]">crecimiento y modernización</span>
                            </h1>
                            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
                                Conectamos <strong className="font-bold text-white">tecnología</strong>, <strong className="font-bold text-white">procesos</strong> y{" "}
                                <strong className="font-bold text-white">personas</strong> desde la estrategia del negocio, para una transformación eficiente y equipos alineados, competentes y empoderados.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    id="cta-talento-primary"
                                    href="/contacto"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#176BDE] px-7 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(23,107,222,0.45)] ring-1 ring-inset ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A78F5] hover:shadow-[0_14px_40px_rgba(23,107,222,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Agenda una sesión estratégica
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                                </Link>
                                <a
                                    id="cta-talento-metodologia"
                                    href="#metodologia"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Ver la metodología
                                    <ArrowDown className="h-5 w-5 text-[#8FC0FF] transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
                                </a>
                            </div>
                        </m.div>

                        {/* Foto del equipo con marco de marca */}
                        <m.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: smoothEase }}
                            className="relative"
                        >
                            <div aria-hidden="true" className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#176BDE]/70 via-white/10 to-[#16F3E8]/50" />
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0F1215]">
                                <Image
                                    src="/images/equipo-real-4k.png"
                                    alt="Equipo de ATM trabajando en la oficina"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 46vw"
                                    className="object-cover"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1215]/80 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0F1215]/85 p-4 shadow-2xl backdrop-blur-xl sm:left-6 sm:right-auto sm:p-5">
                                <div className="flex -space-x-2">
                                    {LEADERS.map((l) => (
                                        <span key={l.initials} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#176BDE] text-xs font-black text-white ring-2 ring-[#0F1215]">
                                            {l.initials}
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Liderazgo directo</p>
                                    <p className="text-xs text-slate-300">Los fundadores en cada proyecto</p>
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

            {/* ── Propuesta de valor: fondo claro con patrón ── */}
            <section id="aporte" aria-labelledby="aporte-heading" className="relative isolate overflow-hidden bg-[#F5F7FB] py-20 md:py-28">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div {...headerReveal} className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#176BDE]">Propuesta de valor</p>
                            <h2 id="aporte-heading" className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
                                Lo que obtiene <span className="text-[#176BDE]">tu empresa</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-base leading-relaxed text-slate-600">
                            Identificamos fortalezas, proponemos soluciones realistas y preparamos a tus equipos para liderar el cambio.
                        </p>
                    </m.div>

                    <m.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid gap-5 md:grid-cols-3 lg:gap-6">
                        {aportes.map((a, i) => (
                            <m.li
                                key={a.title}
                                variants={rise}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,18,21,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#176BDE]/40 hover:shadow-[0_24px_60px_rgba(23,107,222,0.16)] sm:p-8"
                            >
                                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] transition-transform duration-500 group-hover:scale-x-100" />
                                <div className="flex items-start justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176BDE]/10 text-[#176BDE] transition-colors duration-300 group-hover:bg-[#176BDE] group-hover:text-white">
                                        <a.Icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <span className="text-3xl font-black leading-none tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-[#176BDE]/40">
                                        0{i + 1}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{a.title}</h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{a.desc}</p>
                            </m.li>
                        ))}
                    </m.ul>
                </div>
            </section>

            {/* ── Equipo: Onyx con patrón ── */}
            <section id="equipo" aria-labelledby="equipo-heading" className="relative isolate overflow-hidden bg-[#0F1215] py-20 md:py-28">
                <BrandPattern tone="onDark" opacity={0.07} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176BDE]/15 blur-[150px]" />
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#176BDE]/70 to-transparent" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div {...headerReveal} className="mb-12 max-w-3xl md:mb-16">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#176BDE]/40 bg-[#176BDE]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8FC0FF]">
                            El equipo
                        </span>
                        <h2 id="equipo-heading" className="mt-5 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                            Equipo senior de <span className="text-[#6AA5F5]">alto nivel</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                            Experiencia real en liderazgo tecnológico, operacional y comercial. No solo diseñamos la transformación: la implementamos con foco en resultados medibles y sostenibles.
                        </p>
                    </m.div>

                    <m.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {teamMembers.map((t) => (
                            <m.li
                                key={t.role}
                                variants={rise}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#176BDE]/60 hover:bg-white/[0.07] md:p-7"
                            >
                                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] transition-transform duration-500 group-hover:scale-x-100" />
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176BDE] text-white shadow-[0_8px_24px_rgba(23,107,222,0.45)]">
                                    <t.Icon className="h-6 w-6" aria-hidden />
                                </span>
                                <h3 className="mt-6 text-xl font-bold text-white">{t.role}</h3>
                                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-300">{t.desc}</p>
                                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
                                    {t.tags.map((tag) => (
                                        <li key={tag} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-200">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </m.li>
                        ))}
                    </m.ul>

                    {/* Liderazgo directo: bloque destacado con filete Neon Ice */}
                    <m.div
                        {...headerReveal}
                        className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 border-l-4 border-l-[#16F3E8] bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8 md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <p className="text-xl font-black text-white md:text-2xl">Liderazgo estratégico senior</p>
                            <p className="mt-2 max-w-xl leading-relaxed text-slate-300">Acompañamiento directo de nuestros fundadores en cada proyecto, sin intermediarios.</p>
                        </div>
                        <ul className="flex flex-col gap-3 sm:flex-row">
                            {LEADERS.map((l) => {
                                const inner = (
                                    <>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#176BDE] text-xs font-black text-white">{l.initials}</span>
                                        <span>
                                            <span className="block text-sm font-bold text-white">{l.name}</span>
                                            <span className="block text-xs text-slate-400">{l.role}</span>
                                        </span>
                                        {l.href && <Linkedin className="ml-auto h-4 w-4 text-[#8FC0FF]" aria-hidden />}
                                    </>
                                );
                                const cls = "flex min-w-[220px] items-center gap-3 rounded-2xl border border-white/10 bg-[#0F1215]/60 px-4 py-3";
                                return (
                                    <li key={l.initials}>
                                        {l.href ? (
                                            <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:border-[#176BDE]/60`} aria-label={`${l.name} en LinkedIn`}>
                                                {inner}
                                            </a>
                                        ) : (
                                            <div className={cls}>{inner}</div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </m.div>
                </div>
            </section>

            {/* ── Metodología: cuatro fases siempre visibles ── */}
            <section id="metodologia" aria-labelledby="metodologia-heading" className="relative isolate scroll-mt-24 overflow-hidden bg-white py-20 md:py-28">
                <BrandPattern tone="onLight" opacity={0.035} className="-z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div {...headerReveal} className="mb-12 max-w-3xl md:mb-16">
                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#176BDE]">Metodología</p>
                        <h2 id="metodologia-heading" className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
                            Nuestro proceso, <span className="text-[#176BDE]">paso a paso</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                            Cuatro fases con objetivos y entregables claros, desde el primer diagnóstico hasta dejar a tu equipo autónomo.
                        </p>
                    </m.div>

                    <m.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {/* Línea de tiempo en escritorio */}
                        <span aria-hidden="true" className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-[#176BDE]/0 via-[#176BDE]/40 to-[#16F3E8]/0 lg:block" />
                        {phases.map((p) => (
                            <m.li key={p.number} variants={rise} className="relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,18,21,0.05)] sm:p-7">
                                <div className="flex items-center justify-between">
                                    <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F1215] text-[#16F3E8]">
                                        <p.Icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <span className="font-slab text-sm font-medium text-[#176BDE]">Fase {p.number}</span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{p.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.objective}</p>
                                <div className="mt-6 rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-[#f2f7ff] p-4">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-[#0E4FA5]">Entregables</p>
                                    <ul className="mt-3 space-y-2">
                                        {p.deliverables.map((d) => (
                                            <li key={d} className="flex items-start gap-2 text-sm leading-snug text-slate-700">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176BDE]" aria-hidden />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </m.li>
                        ))}
                    </m.ol>
                </div>
            </section>

            <ServicesCTA
                page="talento"
                title="¿Listo para transformar tu organización?"
                text="Agenda una sesión estratégica con nuestro equipo senior y descubre cómo la tecnología, los procesos y las personas pueden trabajar juntos para impulsar tu empresa."
                primaryLabel="Agenda una sesión estratégica"
                whatsappMessage="Quiero conversar sobre talento y transformación para mi empresa."
            />
        </div>
    );
}
