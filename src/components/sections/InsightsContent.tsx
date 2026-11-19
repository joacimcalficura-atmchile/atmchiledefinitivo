"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays, Clock, RefreshCw } from "lucide-react";
import { ARTICLES, type Article, type ArticleCategory } from "@/data/insights";
import { ArticleIcon } from "@/components/insights/ArticleIcon";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-CL", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(iso));

const lastEdit = (a: Article) => a.updatedAt ?? a.publishedAt;
const wasUpdated = (a: Article) => Boolean(a.updatedAt && a.updatedAt !== a.publishedAt);

// Datos de la barra del hero, calculados desde el registro de artículos.
const LATEST_EDIT = ARTICLES.map(lastEdit).sort().at(-1) ?? "";
const SOURCES_COUNT = ARTICLES.reduce((total, a) => total + a.sources.length, 0);
const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category))) as ArticleCategory[];

/** Fila de metadatos compartida por la tarjeta destacada y las de la grilla. */
const Meta = ({ article, tone }: { article: Article; tone: "dark" | "light" }) => {
    const muted = tone === "dark" ? "text-slate-300" : "text-slate-500";
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0F1215] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#16F3E8] ring-1 ring-white/10">
                <ArticleIcon icon={article.icon} className="h-3 w-3" />
                {article.category}
            </span>
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${muted}`}>
                <Clock aria-hidden className="h-3.5 w-3.5" />
                {article.readTime}
            </span>
            <time dateTime={article.publishedAt} className={`inline-flex items-center gap-1 text-xs font-medium ${muted}`}>
                <CalendarDays aria-hidden className="h-3.5 w-3.5" />
                {formatDate(article.publishedAt)}
            </time>
            {wasUpdated(article) && (
                <span className="inline-flex items-center gap-1 rounded-md bg-[#176BDE] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    <RefreshCw aria-hidden className="h-3 w-3" />
                    Actualizado {formatDate(lastEdit(article))}
                </span>
            )}
        </div>
    );
};

export const InsightsContent = () => {
    const [category, setCategory] = useState<ArticleCategory | "Todos">("Todos");

    // El artículo más reciente va destacado; el resto, en la grilla filtrable.
    const [featured, ...rest] = ARTICLES;
    const visible =
        category === "Todos" ? rest : ARTICLES.filter((a) => a.category === category);

    return (
        // -mt-24 sube el fondo detrás del menú flotante (el <main> trae pt-24).
        <div className="relative -mt-24 overflow-x-hidden bg-[#F5F7FB]">
            {/* ── Hero Onyx con patrón del brandbook ── */}
            <section className="relative isolate overflow-hidden bg-[#0F1215] pb-14 pt-36 md:pb-20 md:pt-48">
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ y: 24 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, ease: smoothEase }}
                        className="max-w-3xl"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#16F3E8] backdrop-blur-md">
                            <BookOpen size={16} aria-hidden />
                            <span>Análisis técnico</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-black leading-[1.06] tracking-tight text-white md:text-6xl">
                            Insights con <span className="text-[#6AA5F5]">fuente verificable</span>
                        </h1>
                        <p className="text-lg leading-relaxed text-slate-300 md:text-xl">
                            Normativa chilena, gobernanza de IA y arquitectura de software, con
                            cada plazo y cada cifra citados a su fuente. Sin humo: lo que afecta
                            a tu operación y qué hacer al respecto.
                        </p>
                    </m.div>

                    {/* Barra de datos */}
                    <dl className="mt-10 grid max-w-3xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                        {[
                            { label: "Análisis publicados", value: String(ARTICLES.length) },
                            { label: "Fuentes citadas", value: String(SOURCES_COUNT) },
                            { label: "Última revisión", value: LATEST_EDIT ? formatDate(LATEST_EDIT) : "—" },
                        ].map((item) => (
                            <div key={item.label} className="px-4 py-4 md:px-6 md:py-5">
                                <dt className="text-[10px] font-bold uppercase tracking-widest text-[#A09DA0] md:text-[11px]">
                                    {item.label}
                                </dt>
                                <dd className="mt-1 text-lg font-black text-white md:text-2xl">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ── Contenido sobre fondo claro ── */}
            <section className="relative isolate py-14 md:py-20">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Destacado: el análisis más reciente */}
                    {featured && (
                        <Link
                            href={`/insights/${featured.slug}`}
                            className="group mb-14 grid overflow-hidden rounded-3xl bg-[#0F1215] shadow-[0_24px_60px_rgba(15,18,21,0.18)] transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-[1.1fr_1fr]"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:min-h-[380px]">
                                <Image
                                    src={featured.imageUrl}
                                    alt=""
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 55vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1215]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0F1215]" />
                                <span className="absolute left-4 top-4 rounded-full bg-[#16F3E8] px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#0F1215]">
                                    Lo más reciente
                                </span>
                            </div>
                            <div className="relative isolate flex flex-col justify-center p-7 md:p-10">
                                <BrandPattern tone="onDark" opacity={0.05} className="-z-10" />
                                <Meta article={featured} tone="dark" />
                                <h2 className="mt-5 text-2xl font-black leading-tight text-white transition-colors group-hover:text-[#6AA5F5] md:text-3xl">
                                    {featured.cardTitle}
                                </h2>
                                <p className="mt-4 text-[15px] leading-relaxed text-slate-300 md:text-base">
                                    {featured.excerpt}
                                </p>
                                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#16F3E8]">
                                    Leer análisis
                                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    )}

                    {/* Filtro por tema */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#176BDE]">Biblioteca</p>
                            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0F1215] md:text-4xl">
                                Todos los análisis
                            </h2>
                        </div>
                        <div role="group" aria-label="Filtrar por tema" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
                            {(["Todos", ...CATEGORIES] as const).map((cat) => {
                                const active = category === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setCategory(cat)}
                                        className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176BDE] ${
                                            active
                                                ? "bg-[#176BDE] text-white"
                                                : "border border-slate-200 bg-white text-[#3F3D44] hover:border-[#176BDE]/50 hover:text-[#176BDE]"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Grilla */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visible.map((article) => (
                            <article key={article.slug}>
                                <Link
                                    href={`/insights/${article.slug}`}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#176BDE]/40 hover:shadow-[0_18px_40px_rgba(23,107,222,0.12)]"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden bg-[#0F1215]">
                                        <Image
                                            src={article.imageUrl}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                    <div className="flex flex-grow flex-col p-6 md:p-7">
                                        <Meta article={article} tone="light" />
                                        <h3 className="mt-4 text-xl font-black leading-tight text-[#0F1215] transition-colors group-hover:text-[#176BDE]">
                                            {article.cardTitle}
                                        </h3>
                                        <p className="mt-3 line-clamp-4 flex-grow text-sm leading-relaxed text-[#3F3D44]">
                                            {article.excerpt}
                                        </p>
                                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#176BDE]">
                                            Leer análisis
                                            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <ServicesCTA
                title="¿Cuál de estos plazos te corre a ti?"
                text="Revisamos tu operación y te decimos con qué obligaciones se cruza y qué alcanza a construirse antes de cada fecha. Una conversación técnica, sin presentación comercial."
                page="insights"
                whatsappMessage="Quiero revisar qué plazos normativos aplican a mi empresa."
            />
        </div>
    );
};
