import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { FooterUnified } from "@/components/shared/FooterUnified";

export type LegalSection = {
    id: string;
    title: string;
    body: ReactNode;
};

type Props = {
    eyebrow: string;
    title: string;
    version: string;
    effectiveDate: string;
    summary: ReactNode;
    sections: LegalSection[];
    related: { href: string; label: string };
};

/**
 * Plantilla de documento legal: índice lateral, secciones numeradas, versión y
 * fecha de vigencia, e identificación del responsable. Sin animaciones ni
 * tarjetas: debe leerse como un documento formal.
 */
export function LegalDocument({ eyebrow, title, version, effectiveDate, summary, sections, related }: Props) {
    return (
        <>
            <div className="bg-white pb-24 pt-10 md:pt-16">
                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    <nav aria-label="Ruta de navegación" className="text-xs font-medium text-slate-600">
                        <Link href="/" className="hover:text-[#176BDE]">Inicio</Link>
                        <span aria-hidden="true" className="mx-2 text-slate-400">/</span>
                        <span>Legal</span>
                        <span aria-hidden="true" className="mx-2 text-slate-400">/</span>
                        <span aria-current="page" className="text-slate-700">{title}</span>
                    </nav>

                    <header className="mt-6 border-b border-slate-200 pb-10">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176BDE]">{eyebrow}</p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0F1215] md:text-5xl">{title}</h1>
                        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
                            <div className="flex gap-2">
                                <dt className="font-semibold text-slate-800">Versión</dt>
                                <dd>{version}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="font-semibold text-slate-800">Vigente desde</dt>
                                <dd>{effectiveDate}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="font-semibold text-slate-800">Responsable</dt>
                                <dd>{SITE.legalName}</dd>
                            </div>
                        </dl>
                        <div className="mt-8 max-w-3xl border-l-2 border-[#176BDE] pl-5 text-[0.9375rem] leading-7 text-slate-700">
                            {summary}
                        </div>
                    </header>

                    <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
                        <nav aria-labelledby="indice-documento" className="lg:sticky lg:top-32 lg:self-start">
                            <p id="indice-documento" className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Contenido</p>
                            <ol className="mt-4 space-y-2 border-l border-slate-200 text-sm">
                                {sections.map((s, i) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className="-ml-px block border-l border-transparent py-0.5 pl-4 text-slate-600 transition-colors hover:border-[#176BDE] hover:text-[#176BDE]"
                                        >
                                            <span className="mr-1.5 tabular-nums text-slate-600">{i + 1}.</span>
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <article className="min-w-0 max-w-[72ch]">
                            {sections.map((s, i) => (
                                <section
                                    key={s.id}
                                    id={s.id}
                                    aria-labelledby={`${s.id}-titulo`}
                                    className="scroll-mt-32 border-b border-slate-100 py-8 first:pt-0 last:border-b-0"
                                >
                                    <h2 id={`${s.id}-titulo`} className="text-xl font-bold tracking-tight text-[#0F1215]">
                                        <span className="mr-2 tabular-nums text-[#176BDE]">{i + 1}.</span>
                                        {s.title}
                                    </h2>
                                    <div className="legal-body mt-4 space-y-4 text-[0.9375rem] leading-7 text-slate-700">{s.body}</div>
                                </section>
                            ))}

                            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5 text-sm leading-6 text-slate-700">
                                ¿Dudas sobre este documento? Escríbenos a{" "}
                                <a href={`mailto:${SITE.privacyEmail}`} className="font-semibold text-[#176BDE] underline underline-offset-2">
                                    {SITE.privacyEmail}
                                </a>
                                . Consulta también nuestra{" "}
                                <Link href={related.href} className="font-semibold text-[#176BDE] underline underline-offset-2">
                                    {related.label}
                                </Link>
                                .
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <FooterUnified />
        </>
    );
}

/** Ficha de identificación del responsable (solo datos confirmados). */
export function ControllerCard() {
    const rows: [string, string][] = [
        ["Razón social", SITE.legalName],
        ...(SITE.rut ? ([["RUT", SITE.rut]] as [string, string][]) : []),
        ["Nombre de fantasía", SITE.name],
        ["Domicilio", SITE.address],
        ["Correo de contacto", SITE.privacyEmail],
        ["Sitio web", SITE.url.replace("https://", "")],
    ];
    return (
        <dl className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
            {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-slate-800">{k}</dt>
                    <dd className="text-sm text-slate-700">{v}</dd>
                </div>
            ))}
        </dl>
    );
}
