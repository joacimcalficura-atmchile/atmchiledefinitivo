import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, RefreshCw } from "lucide-react";
import { ARTICLES, getArticle, getRelatedArticles } from "@/data/insights";
import { SITE } from "@/data/site";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleFooter } from "@/components/insights/ArticleFooter";
import { ArticleFaq } from "@/components/insights/ArticleFaq";
import { ArticleIcon } from "@/components/insights/ArticleIcon";
import { ArticleMediaFigure } from "@/components/insights/ArticleMediaFigure";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { ServicesCTA } from "@/components/sections/ServicesCTA";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) return { title: "Artículo no encontrado" };

    const url = `${SITE.url}/insights/${article.slug}`;
    const image = article.cover?.src ?? article.imageUrl;

    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.keywords ? [...article.keywords] : undefined,
        alternates: { canonical: url },
        authors: [{ name: SITE.name, url: SITE.url }],
        openGraph: {
            type: "article",
            title: article.title,
            description: article.excerpt,
            url,
            siteName: SITE.name,
            locale: SITE.locale,
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt ?? article.publishedAt,
            section: article.category,
            tags: article.keywords ? [...article.keywords] : undefined,
            images: [{ url: image, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [image],
        },
    };
}

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(
        new Date(iso)
    );

const absolute = (src: string) => (src.startsWith("http") ? src : `${SITE.url}${src}`);

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) notFound();

    const related = getRelatedArticles(slug);
    const url = `${SITE.url}/insights/${article.slug}`;
    const modified = article.updatedAt ?? article.publishedAt;
    const wasUpdated = Boolean(article.updatedAt && article.updatedAt !== article.publishedAt);

    // Grafo Schema.org: artículo con fechas y fuentes verificables, migas de pan
    // y preguntas frecuentes. Es lo que permite a buscadores y motores
    // generativos atribuir el contenido a ATM y citarlo con fecha.
    const graph: Record<string, unknown>[] = [
        {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: article.title,
            description: article.excerpt,
            abstract: article.answer,
            image: [absolute(article.cover?.src ?? article.imageUrl)],
            datePublished: article.publishedAt,
            dateModified: modified,
            inLanguage: "es-CL",
            articleSection: article.category,
            keywords: article.keywords?.join(", "),
            isAccessibleForFree: true,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: {
                "@type": "Organization",
                name: SITE.legalName,
                url: SITE.url,
                logo: {
                    "@type": "ImageObject",
                    url: `${SITE.url}/logos/ATM_logo.png`,
                },
            },
            speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["#respuesta-corta", "#resumen-ejecutivo"],
            },
            citation: article.sources.map((source) => ({
                "@type": "CreativeWork",
                name: source.label,
                url: source.url,
            })),
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE.url}/insights` },
                { "@type": "ListItem", position: 3, name: article.cardTitle, item: url },
            ],
        },
    ];

    if (article.faq?.length) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: article.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        });
    }

    const jsonLd = { "@context": "https://schema.org", "@graph": graph };

    // -mt-24 sube el fondo detrás del menú flotante (el <main> trae pt-24).
    return (
        <div className="relative -mt-24 overflow-x-hidden bg-[#F5F7FB]">
            {/* ── Hero Onyx a sangre detrás del menú (el <main> trae pt-24) ── */}
            <header className="relative isolate overflow-hidden bg-[#0F1215] pb-14 pt-32 md:pb-20 md:pt-44">
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[380px] w-[380px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />

                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Migas de pan" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#A09DA0]">
                            <li>
                                <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
                            </li>
                            <ChevronRight aria-hidden className="h-3 w-3" />
                            <li>
                                <Link href="/insights" className="transition-colors hover:text-white">Insights</Link>
                            </li>
                            <ChevronRight aria-hidden className="h-3 w-3" />
                            <li aria-current="page" className="max-w-[16rem] truncate text-white/80">
                                {article.cardTitle}
                            </li>
                        </ol>
                    </nav>

                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#16F3E8]/30 bg-[#16F3E8]/[0.08] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-[#16F3E8]">
                            <ArticleIcon icon={article.icon} className="h-3.5 w-3.5" />
                            {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                            <Clock aria-hidden className="h-3.5 w-3.5" />
                            {article.readTime} de lectura
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
                            <CalendarDays aria-hidden className="h-3.5 w-3.5" />
                            <span>
                                Publicado el{" "}
                                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                            </span>
                        </span>
                        {wasUpdated && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#176BDE] px-3 py-1 text-xs font-bold text-white">
                                <RefreshCw aria-hidden className="h-3.5 w-3.5" />
                                <span>
                                    Actualizado el{" "}
                                    <time dateTime={modified}>{formatDate(modified)}</time>
                                </span>
                            </span>
                        )}
                    </div>

                    <h1 className="mb-6 text-[2rem] font-black leading-[1.1] tracking-tight text-white md:text-5xl">
                        {article.title}
                    </h1>

                    <p className="max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                        {article.excerpt}
                    </p>

                    <p className="mt-6 text-sm text-[#A09DA0]">
                        Por el equipo de <span className="font-bold text-white">{SITE.name}</span>
                        <span className="mx-2 text-white/30">·</span>
                        <span className="font-slab font-medium text-[#6AA5F5]">A tu medida</span>
                    </p>

                    {article.updateNote && (
                        <aside className="mt-8 rounded-2xl border border-white/10 border-l-4 border-l-[#16F3E8] bg-white/[0.04] p-5 backdrop-blur-sm md:p-6">
                            <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#16F3E8]">
                                Actualización {formatDate(modified)}
                            </p>
                            <p className="text-[15px] leading-relaxed text-slate-200">{article.updateNote}</p>
                        </aside>
                    )}
                </div>
            </header>

            <article className="relative isolate">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />

                <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:px-8">
                    {/* Respuesta directa: el párrafo que un buscador o una IA puede citar tal cual. */}
                    {article.answer && (
                        <section
                            id="respuesta-corta"
                            aria-labelledby="respuesta-corta-titulo"
                            className="mb-10 rounded-2xl bg-[#0F1215] p-6 text-white shadow-[0_20px_50px_rgba(15,18,21,0.18)] md:p-8"
                        >
                            <h2
                                id="respuesta-corta-titulo"
                                className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#16F3E8]"
                            >
                                Respuesta corta
                            </h2>
                            <p className="text-lg font-medium leading-relaxed md:text-xl">{article.answer}</p>
                        </section>
                    )}

                    {article.cover ? (
                        <ArticleMediaFigure media={article.cover} priority className="mb-12" />
                    ) : (
                        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0F1215] shadow-[0_20px_50px_rgba(15,18,21,0.15)]">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Resumen ejecutivo: para quien decide y no va a leer el artículo completo */}
                    <section
                        id="resumen-ejecutivo"
                        aria-labelledby="resumen"
                        className="mb-12 rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-[#f2f7ff] p-6 md:p-8"
                    >
                        <h2
                            id="resumen"
                            className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-[#176BDE]"
                        >
                            Resumen ejecutivo
                        </h2>
                        <ul className="space-y-3">
                            {article.tldr.map((point) => (
                                <li key={point} className="flex gap-3.5">
                                    <span
                                        aria-hidden="true"
                                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]"
                                    />
                                    <span className="text-[15px] leading-relaxed text-[#3F3D44] md:text-base">
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {article.keyFacts && (
                        <dl className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4">
                            {article.keyFacts.map((fact) => (
                                <div
                                    key={fact.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
                                >
                                    <dt className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        {fact.label}
                                    </dt>
                                    <dd className="text-base font-black leading-tight text-[#176BDE] md:text-lg">
                                        {fact.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    <ArticleBody blocks={article.body} />

                    {article.faq && article.faq.length > 0 && <ArticleFaq items={article.faq} />}

                    <ArticleFooter article={article} related={related} />
                </div>
            </article>

            {article.relatedService && (
                <ServicesCTA
                    title="¿Cómo se ve esto en tu operación?"
                    text="Revisamos tu caso concreto y te decimos qué alcanza a construirse con el tiempo y el presupuesto que tienes. Sin compromiso."
                    page={`insights/${article.slug}`}
                    whatsappMessage={`Leí el artículo «${article.cardTitle}» y quiero conversar.`}
                />
            )}

            {/* <script> plano para que el marcado viaje en el HTML servido. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
