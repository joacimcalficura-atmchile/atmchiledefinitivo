import Link from "next/link";
import { ArrowRight, ExternalLink, Link2 } from "lucide-react";
import type { Article } from "@/data/insights";
import { ArticleIcon } from "./ArticleIcon";

/**
 * Cierre del artículo: fuentes verificables, enlace al servicio relacionado y
 * siguientes lecturas. El llamado a la acción (bloque Sapphire) lo pone la
 * página con `ServicesCTA`, igual que en /servicios y /seguridad.
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
            className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
            <h2
                id="fuentes"
                className="mb-2 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#176BDE]"
            >
                <Link2 aria-hidden className="h-3.5 w-3.5" />
                Fuentes consultadas
            </h2>
            <p className="mb-5 text-sm text-slate-500">
                Cada fecha y cifra del artículo se puede rastrear a una de estas referencias.
            </p>
            <ol className="space-y-3">
                {article.sources.map((source, idx) => (
                    <li key={source.url} className="flex gap-3">
                        <span className="text-sm font-bold text-slate-400">{idx + 1}.</span>
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-start gap-1.5 text-sm leading-relaxed text-[#3F3D44] underline decoration-slate-300 underline-offset-4 transition-colors hover:text-[#176BDE] hover:decoration-[#176BDE]"
                        >
                            {source.label}
                            <ExternalLink aria-hidden className="mt-1 h-3 w-3 shrink-0 opacity-60" />
                        </a>
                    </li>
                ))}
            </ol>
            <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
                Contenido divulgativo elaborado por ATM Chile. No constituye asesoría legal: para
                decisiones jurídicas, consulta el texto oficial de la norma y a tu equipo legal.
            </p>
        </section>

        {article.relatedService && (
            <Link
                href={article.relatedService.href}
                className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#b8ccf0] bg-[#f2f7ff] p-5 transition-colors hover:border-[#176BDE] md:p-6"
            >
                <span>
                    <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#176BDE]">
                        Servicio relacionado
                    </span>
                    <span className="mt-1 block text-lg font-bold text-[#0F1215]">
                        {article.relatedService.label}
                    </span>
                </span>
                <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-[#176BDE] transition-transform group-hover:translate-x-1" />
            </Link>
        )}

        {related.length > 0 && (
            <section aria-labelledby="seguir-leyendo" className="mt-16">
                <h2
                    id="seguir-leyendo"
                    className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500"
                >
                    Seguir leyendo
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {related.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/insights/${item.slug}`}
                            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#176BDE]/40 hover:shadow-md"
                        >
                            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-[#0F1215] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#16F3E8]">
                                <ArticleIcon icon={item.icon} className="h-3 w-3" />
                                {item.category}
                            </span>
                            <h3 className="mb-2 text-base font-bold leading-snug text-[#0F1215] transition-colors group-hover:text-[#176BDE]">
                                {item.cardTitle}
                            </h3>
                            <p className="line-clamp-2 text-sm leading-relaxed text-[#3F3D44]">
                                {item.cardDesc}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        )}
    </>
);
