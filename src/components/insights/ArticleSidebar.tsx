import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/insights";

export interface TocItem {
    readonly id: string;
    readonly text: string;
}

/**
 * Columna lateral de escritorio (`lg:` en adelante): índice de saltos directos
 * + CTA al servicio relacionado, ambos `sticky` bajo el nav flotante. En
 * pantallas grandes la columna de lectura (`max-w-3xl`, pensada para
 * legibilidad) dejaba el resto del ancho vacío; esto le da un uso real sin
 * ensanchar el texto.
 */
export const ArticleSidebar = ({ toc, article }: { toc: readonly TocItem[]; article: Article }) => {
    if (toc.length === 0 && !article.relatedService) return null;

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
                {toc.length > 0 && (
                    <nav
                        aria-label="Índice del artículo"
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
                    >
                        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                            En este artículo
                        </p>
                        <ol className="space-y-1">
                            {toc.map((item, idx) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className="group flex items-baseline gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-[#8FC0FF]"
                                    >
                                        <span className="shrink-0 text-[11px] font-bold text-slate-600 group-hover:text-[#4D9BFF]">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="leading-snug">{item.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {article.relatedService && (
                    <div className="relative overflow-hidden rounded-2xl border border-[#176BDE]/20 bg-gradient-to-br from-[#176BDE]/[0.09] to-transparent p-6">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-[#176BDE]/15 blur-[80px]"
                        />
                        <p className="relative mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#8FC0FF]">
                            ¿Le interesa esto?
                        </p>
                        <p className="relative mb-5 text-sm leading-relaxed text-slate-300">
                            Revisamos su caso concreto, sin compromiso.
                        </p>
                        <Link
                            href="/contacto"
                            className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(23,107,222,0.35)] active:scale-[0.98]"
                        >
                            Agendar diagnóstico
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </aside>
    );
};
