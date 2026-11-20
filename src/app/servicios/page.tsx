"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, ArrowDown, BadgeCheck, Wallet } from "lucide-react";
import { ArchitectureModal } from "@/components/sections/ArchitectureModal";
import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { solutions, type Solution } from "@/data/services";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

/** Servicios insignia: llevan foto (las mismas de la home) y van primero. */
const FEATURED_IMAGES: Record<string, { src: string; alt: string }> = {
    talento: { src: "/images/talento_senior.png", alt: "Desarrollador revisando código en un monitor curvo, en una oficina de trabajo colaborativo" },
    "ia-generativa": { src: "/images/ia_generativa.png", alt: "Analista revisando un tablero de datos con gráficos en su notebook, mientras su equipo trabaja en una pizarra al fondo" },
    seguridad: { src: "/images/ciberseguridad_soc.png", alt: "Centro de operaciones de ciberseguridad" },
};

const featured = solutions.filter((s) => s.id in FEATURED_IMAGES);
const architectures = solutions.filter((s) => !(s.id in FEATURED_IMAGES));

const HERO_FACTS = [
    { value: `${solutions.length}`, label: "líneas de servicio" },
    { value: "99,597 %", label: "SLA de disponibilidad" },
    { value: "360°", label: "acompañamiento integral" },
    { value: "Cuotas", label: "con leasing de software" },
];

/** Enlace o botón de cada servicio: página propia, modal de arquitectura o nada. */
function ServiceAction({ item, onOpen, tone }: { item: Solution; onOpen: (id: string) => void; tone: "light" | "dark" }) {
    const color = tone === "light" ? "text-[#176BDE] hover:text-[#0E4FA5]" : "text-[#8FC0FF] hover:text-white";
    const cls = `group/cta inline-flex items-center gap-2 text-sm font-bold transition-colors ${color} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16F3E8] rounded`;
    const arrow = <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden />;
    if (item.ctaHref) return <Link href={item.ctaHref} className={cls}>{item.cta} {arrow}</Link>;
    if (item.hasModal) return <button type="button" onClick={() => onOpen(item.id)} className={cls}>{item.cta} {arrow}</button>;
    return null;
}

export default function ServiciosPage() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div className="relative selection:bg-[#176BDE] selection:text-white">
            <AnimatePresence>{activeModal && <ArchitectureModal id={activeModal} onClose={() => setActiveModal(null)} />}</AnimatePresence>

            {/* ── Hero: Onyx + patrón andino-circuito, mismo lenguaje que la home ── */}
            {/* -mt-24 sube el fondo detrás del menú flotante (el <main> trae pt-24). */}
            <section className="relative isolate -mt-24 overflow-hidden bg-[#0F1215] pb-16 pt-40 md:pb-20 md:pt-48">
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                        <m.div initial={{ x: -32 }} animate={{ x: 0 }} transition={{ duration: 1.1, ease: smoothEase }}>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#16F3E8] backdrop-blur-md">
                                <BadgeCheck size={16} aria-hidden />
                                <span>Ecosistema de soluciones B2B</span>
                            </div>
                            <h1 className="text-[2.6rem] font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Servicios ATM: <br />
                                <span className="text-[#6AA5F5]">ingeniería a tu medida</span>
                            </h1>
                            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
                                Evaluamos, diagnosticamos y resolvemos los retos digitales de tu empresa con equipos senior, inteligencia artificial y arquitecturas que escalan contigo.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/contacto"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#176BDE] px-7 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(23,107,222,0.45)] ring-1 ring-inset ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A78F5] hover:shadow-[0_14px_40px_rgba(23,107,222,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Agenda un diagnóstico
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                                </Link>
                                <a
                                    href="#soluciones"
                                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                                >
                                    Ver los servicios
                                    <ArrowDown className="h-5 w-5 text-[#8FC0FF] transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
                                </a>
                            </div>
                        </m.div>

                        {/* Logotipo oficial blanco con eslogan: sin brillos sobre el logo, solo luz ambiente detrás */}
                        <m.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.1, delay: 0.1, ease: smoothEase }}
                            className="relative hidden items-center justify-center lg:flex"
                        >
                            <div aria-hidden="true" className="absolute h-80 w-80 rounded-full bg-[#176BDE]/20 blur-[120px]" />
                            <div className="relative aspect-[1036/620] w-full max-w-[440px]">
                                <Image
                                    src="/images/brand/logo-slogan-blanco.png"
                                    alt="ATM · A tu medida"
                                    fill
                                    priority
                                    sizes="440px"
                                    className="object-contain"
                                />
                            </div>
                        </m.div>
                    </div>

                    {/* Datos clave */}
                    <m.dl
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md md:mt-20 md:grid-cols-4"
                    >
                        {HERO_FACTS.map((f, i) => (
                            <m.div
                                key={f.label}
                                variants={rise}
                                className={`flex flex-col px-5 py-6 md:px-7 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                            >
                                <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{f.label}</dt>
                                <dd className="order-1 text-2xl font-black tracking-tight text-white md:text-3xl">{f.value}</dd>
                            </m.div>
                        ))}
                    </m.dl>
                </div>
            </section>

            {/* ── Servicios insignia: fondo claro con patrón ── */}
            <section id="soluciones" aria-labelledby="insignia" className="relative isolate scroll-mt-24 overflow-hidden bg-[#F5F7FB] py-20 md:py-28">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
                    >
                        <div className="max-w-2xl">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#176BDE]">Servicios insignia</p>
                            <h2 id="insignia" className="text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
                                Lo que más nos piden <span className="text-[#176BDE]">las empresas</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-base leading-relaxed text-slate-600">
                            Tres capacidades que sostienen la operación de las empresas que acompañamos: personas, inteligencia y protección.
                        </p>
                    </m.div>

                    <m.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {featured.map((item) => {
                            const img = FEATURED_IMAGES[item.id];
                            return (
                                <m.article
                                    key={item.id}
                                    variants={rise}
                                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,18,21,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#176BDE]/40 hover:shadow-[0_24px_60px_rgba(23,107,222,0.18)]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0F1215]">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                                        />
                                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1215]/85 via-[#0F1215]/10 to-transparent" />
                                        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#176BDE] text-white shadow-[0_8px_24px_rgba(23,107,222,0.5)] ring-1 ring-inset ring-white/20">
                                                <item.Icon className="h-6 w-6" />
                                            </span>
                                            <span className="text-4xl font-black leading-none tracking-tight text-white/85">{item.num}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-7 md:p-8">
                                        <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-[#176BDE] md:text-2xl">{item.title}</h3>
                                        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-600">{item.desc}</p>
                                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Especialidades">
                                            {item.tags.map((tag) => (
                                                <li key={tag} className="rounded-md border border-[#b8ccf0] bg-[#f2f7ff] px-2.5 py-1 text-[0.75rem] font-bold text-[#0E4FA5]">
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-7 border-t border-slate-100 pt-5">
                                            <ServiceAction item={item} onOpen={setActiveModal} tone="light" />
                                        </div>
                                    </div>
                                </m.article>
                            );
                        })}
                    </m.div>

                    {/* Leasing: bloque destacado Onyx con filete Neon Ice */}
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="relative isolate mt-14 overflow-hidden rounded-3xl border-l-4 border-[#16F3E8] bg-[#0F1215] p-8 md:mt-16 md:p-10"
                    >
                        <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-[#176BDE]/30 blur-[110px]" />
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-5">
                                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#16F3E8] sm:flex">
                                    <Wallet className="h-6 w-6" aria-hidden />
                                </span>
                                <div>
                                    <p className="text-xl font-black text-white md:text-2xl">
                                        ¿Necesitas un sistema a medida? <span className="text-[#6AA5F5]">Págalo en cuotas.</span>
                                    </p>
                                    <p className="mt-2 max-w-2xl leading-relaxed text-slate-300">
                                        Con el leasing de software desarrollamos tu ERP o plataforma y terminas con licencia perpetua de uso.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/leasing-de-software"
                                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-6 py-3.5 font-bold text-white transition-colors hover:bg-[#1A78F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                            >
                                Ver cómo funciona
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                            </Link>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* ── Arquitecturas por industria: Onyx con patrón, tarjetas de vidrio ── */}
            <section aria-labelledby="arquitecturas" className="relative isolate overflow-hidden bg-[#0F1215] py-20 md:py-28">
                <BrandPattern tone="onDark" opacity={0.07} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-[#176BDE]/15 blur-[150px]" />
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#176BDE]/70 to-transparent" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="mb-14 max-w-3xl md:mb-16"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#176BDE]/40 bg-[#176BDE]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8FC0FF]">
                            Arquitecturas por industria
                        </span>
                        <h2 id="arquitecturas" className="mt-5 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                            Plataformas que <span className="text-[#6AA5F5]">ordenan tu operación</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                            Comercio, logística, finanzas y gestión: abre cada arquitectura para ver cómo la construimos.
                        </p>
                    </m.div>

                    <m.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                    >
                        {architectures.map((item) => (
                            <m.article
                                key={item.id}
                                variants={rise}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#176BDE]/60 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(23,107,222,0.25)] md:p-8"
                            >
                                {/* Filete superior Sapphire → Neon Ice que se enciende al pasar */}
                                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] transition-transform duration-500 group-hover:scale-x-100" />
                                <div className="flex items-start justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#176BDE]/15 text-[#8FC0FF] transition-colors duration-300 group-hover:bg-[#176BDE] group-hover:text-white">
                                        <item.Icon className="h-6 w-6" />
                                    </span>
                                    <span className="text-3xl font-black leading-none tracking-tight text-white/15 transition-colors duration-300 group-hover:text-[#16F3E8]/60">{item.num}</span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-300">{item.desc}</p>
                                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Especialidades">
                                    {item.tags.map((tag) => (
                                        <li key={tag} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.75rem] font-bold text-slate-200">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-7 border-t border-white/10 pt-5">
                                    <ServiceAction item={item} onOpen={setActiveModal} tone="dark" />
                                </div>
                            </m.article>
                        ))}
                    </m.div>
                </div>
            </section>

            <ServicesCTA />
        </div>
    );
}
