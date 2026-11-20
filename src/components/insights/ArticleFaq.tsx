import { ChevronDown } from "lucide-react";
import type { ArticleFaq as Faq } from "@/data/insights";

/**
 * Preguntas frecuentes visibles. Usa <details> nativo: funciona sin JS, es
 * accesible por teclado y el texto queda en el HTML servido (lo leen
 * buscadores y motores generativos). El mismo contenido va al JSON-LD FAQPage.
 */
export const ArticleFaq = ({ items }: { items: readonly Faq[] }) => (
    <section aria-labelledby="preguntas-frecuentes" className="mt-16">
        <h2
            id="preguntas-frecuentes"
            className="mb-6 text-2xl font-black leading-tight tracking-tight text-[#0F1215] md:text-3xl"
        >
            Preguntas frecuentes
        </h2>
        <div className="space-y-3">
            {items.map((item, idx) => (
                <details
                    key={item.q}
                    open={idx === 0}
                    className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:border-[#b8ccf0]"
                >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-base font-bold leading-snug text-[#0F1215] md:p-6 md:text-lg [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <ChevronDown
                            aria-hidden
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#176BDE] transition-transform group-open:rotate-180"
                        />
                    </summary>
                    <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-[#3F3D44] md:px-6 md:pb-6 md:text-base">
                        {item.a}
                    </p>
                </details>
            ))}
        </div>
    </section>
);
