"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    Clock,
    Instagram,
    Linkedin,
    Mail,
} from "lucide-react";
import { ARTICLES } from "@/data/insights";
import { SITE, SOCIAL_LINKS } from "@/data/site";
import { ArticleIcon } from "@/components/insights/ArticleIcon";

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram, mail: Mail } as const;

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
};

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-CL", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(iso));

export const InsightsContent = () => (
    <div className="relative min-h-screen overflow-x-hidden bg-[#010912]">
        {/* Ambiente de marca */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-[60vh] w-1/3 bg-[#176BDE]/5 blur-[160px]"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[20%] left-0 h-[40vh] w-1/4 bg-[#176BDE]/[0.04] blur-[120px]"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
        />

        {/* ── Encabezado ── */}
        <section className="relative z-10 pb-20 pt-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#176BDE]/20 bg-[#176BDE]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#8FC0FF]">
                        <BookOpen size={14} />
                        Análisis técnico
                    </div>
                    <h1 className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-white md:text-6xl">
                        Insights con{" "}
                        <span className="bg-gradient-to-r from-[#176BDE] to-[#16F3E8] bg-clip-text text-transparent">
                            fuente verificable
                        </span>
                    </h1>
                    <p className="text-lg leading-relaxed text-slate-400 md:text-xl">
                        Normativa chilena, gobernanza de IA y arquitectura de software, con los
                        plazos y las cifras citados a su fuente. Sin predicciones ni humo: lo
                        que afecta su operación y qué hacer al respecto.
                    </p>
                </m.div>
            </div>
        </section>

        {/* ── Grilla de artículos ── */}
        <section className="relative z-10 pb-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {ARTICLES.map((article, idx) => (
                        <m.article key={article.slug} variants={cardVariants}>
                            <Link
                                href={`/insights/${article.slug}`}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#02121d] transition-all duration-300 hover:-translate-y-2 hover:border-[#176BDE]/30 hover:shadow-[0_0_40px_rgba(23,107,222,0.12)]"
                            >
                                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-[#031d2e]">
                                    <Image
                                        src={article.imageUrl}
                                        alt=""
                                        fill
                                        // La primera tarjeta es el LCP de la página.
                                        priority={idx === 0}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-gradient-to-t from-[#02121d] via-transparent to-transparent"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                                            <ArticleIcon
                                                icon={article.icon}
                                                className="h-5 w-5 text-[#4D9BFF]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-grow flex-col p-7">
                                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:border-[#176BDE]/20 group-hover:text-slate-300">
                                            <ArticleIcon
                                                icon={article.icon}
                                                className="h-3 w-3"
                                            />
                                            {article.category}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600">
                                            <Clock className="h-3 w-3" />
                                            {article.readTime}
                                        </span>
                                        <time
                                            dateTime={article.publishedAt}
                                            className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600"
                                        >
                                            <CalendarDays className="h-3 w-3" />
                                            {formatDate(article.publishedAt)}
                                        </time>
                                    </div>

                                    <h2 className="mb-3.5 text-xl font-bold leading-tight text-white transition-colors group-hover:text-[#8FC0FF]">
                                        {article.cardTitle}
                                    </h2>

                                    <p className="mb-7 flex-grow text-sm leading-relaxed text-slate-400">
                                        {article.excerpt}
                                    </p>

                                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#4D9BFF]">
                                        Leer análisis
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </span>
                                </div>
                            </Link>
                        </m.article>
                    ))}
                </m.div>
            </div>
        </section>

        {/* ── Cierre: conversación real, no una suscripción que no existe ── */}
        <section className="relative z-10 pb-32">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center backdrop-blur-xl md:p-16"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#176BDE]/10 blur-[100px]"
                    />

                    <div className="relative z-10">
                        <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-4xl">
                            ¿Cuál de estos plazos{" "}
                            <span className="text-[#4D9BFF]">le corre a usted?</span>
                        </h2>
                        <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                            Revisamos su operación y le decimos con qué obligaciones se cruza y
                            qué alcanza a construirse antes de cada fecha. Una conversación
                            técnica, sin presentación comercial.
                        </p>

                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#176BDE] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(23,107,222,0.35)] active:scale-[0.98]"
                        >
                            Agendar diagnóstico
                            <ArrowRight size={16} />
                        </Link>

                        <div className="mt-10 flex items-center justify-center gap-4">
                            {SOCIAL_LINKS.map(({ icon, href, label }) => {
                                const Icon = SOCIAL_ICONS[icon];
                                const isExternal = href.startsWith("http");
                                return (
                                    <a
                                        key={label}
                                        href={href}
                                        {...(isExternal
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                        className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-500 transition-all hover:border-[#176BDE]/30 hover:bg-[#176BDE]/5 hover:text-[#4D9BFF]"
                                        aria-label={label}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="mt-5 text-xs text-slate-600">{SITE.email}</p>
                    </div>

                    <div
                        aria-hidden="true"
                        className="absolute right-6 top-6 size-12 rounded-tr-2xl border-r-2 border-t-2 border-[#176BDE]/15"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute bottom-6 left-6 size-12 rounded-bl-2xl border-b-2 border-l-2 border-[#176BDE]/15"
                    />
                </m.div>
            </div>
        </section>
    </div>
);
