import Link from "next/link";
import { ArrowRight, ExternalLink, Link2 } from "lucide-react";
import type { Article } from "@/data/insights";
import { ArticleIcon } from "./ArticleIcon";

/**
 * Cierre del artículo: fuentes verificables, CTA al servicio relacionado y
 * siguientes lecturas. Las fuentes van primero a propósito —son lo que
 * sostiene el contenido— y el CTA apunta al servicio del tema, no a un
 * «contáctanos» genérico.
 */
export const ArticleFooter = ({
    article,
    related,
}: {
    article: Article;
    related: readonly Article[];
}) => (
    <>
        <section
            aria-labelledby="fuentes"
            className="mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8"
        >
            <h2
                id="fuentes"
                className="mb-5 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500"
            >
                <Link2 className="h-3.5 w-3.5" />
                Fuentes
            </h2>
            <ol className="space-y-3">
                {article.sources.map((source, idx) => (
                    <li key={source.url} className="flex gap-3">
                        <span className="text-sm font-bold text-slate-600">{idx + 1}.</span>
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-start gap-1.5 text-sm leading-relaxed text-slate-400 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-[#8FC0FF] hover:decoration-[#176BDE]"
                        >
                            {source.label}
                            <ExternalLink className="mt-1 h-3 w-3 shrink-0 opacity-60" />
                        </a>
                    </li>
                ))}
            </ol>
        </section>

        {article.relatedService && (
            <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#176BDE]/20 bg-gradient-to-br from-[#176BDE]/[0.09] to-transparent p-8 md:p-10">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#176BDE]/10 blur-[100px]"
                />
                <div className="relative z-10">
                    <p className="mb-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#8FC0FF]">
                        Servicio relacionado
                    </p>
                    <h2 className="mb-3 text-2xl font-black leading-tight text-white md:text-3xl">
                        ¿Cómo se ve esto en su operación?
                    </h2>
                    <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-slate-400">
                        Revisamos su caso concreto y le decimos qué alcanza a construirse con
                        el tiempo y el presupuesto que tiene. Sin compromiso.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-7 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(23,107,222,0.35)] active:scale-[0.98]"
                        >
                            Agendar diagnóstico
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href={article.relatedService.href}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                        >
                            Ver {article.relatedService.label}
                        </Link>
                    </div>
                </div>
            </section>
        )}

        {related.length > 0 && (
            <section aria-labelledby="seguir-leyendo" className="mt-16">
                <h2
                    id="seguir-leyendo"
                    className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500"
                >
                    Seguir leyendo
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                    {related.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/insights/${item.slug}`}
                            className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-[#176BDE]/30 hover:bg-white/[0.04]"
                        >
                            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <ArticleIcon icon={item.icon} className="h-3 w-3" />
                                {item.category}
                            </span>
                            <h3 className="mb-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-[#8FC0FF]">
                                {item.cardTitle}
                            </h3>
                            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
                                {item.cardDesc}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        )}
    </>
);
