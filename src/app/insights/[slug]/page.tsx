import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { ARTICLES, getArticle, getRelatedArticles } from "@/data/insights";
import { SITE } from "@/data/site";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleFooter } from "@/components/insights/ArticleFooter";
import { ArticleIcon } from "@/components/insights/ArticleIcon";

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

    return {
        title: article.title,
        description: article.excerpt,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            title: article.title,
            description: article.excerpt,
            url,
            siteName: SITE.name,
            locale: SITE.locale,
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt ?? article.publishedAt,
            images: [{ url: article.imageUrl, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.imageUrl],
        },
    };
}

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(
        new Date(iso)
    );

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticle(slug);

    if (!article) notFound();

    const related = getRelatedArticles(slug);
    const url = `${SITE.url}/insights/${article.slug}`;

    // Schema.org Article: es lo que permite a buscadores y motores generativos
    // atribuir el contenido con fecha y autor verificables.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: `${SITE.url}${article.imageUrl}`,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        inLanguage: "es-CL",
        articleSection: article.category,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: {
            "@type": "Organization",
            name: SITE.legalName,
            url: SITE.url,
            logo: {
                "@type": "ImageObject",
                url: `${SITE.url}/logos/ATM_logo_white.png`,
            },
        },
        citation: article.sources.map((source) => ({
            "@type": "CreativeWork",
            name: source.label,
            url: source.url,
        })),
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#010912]">
            {/* Ambiente de marca */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-[55vh] w-1/3 bg-[#176BDE]/5 blur-[160px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"
            />

            <article className="relative z-10 mx-auto max-w-3xl px-4 pb-32 pt-10 sm:px-6 lg:px-8">
                <Link
                    href="/insights"
                    className="group mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-[#8FC0FF]"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Volver a Insights
                </Link>

                <header>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#176BDE]/20 bg-[#176BDE]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#8FC0FF]">
                            <ArticleIcon icon={article.icon} className="h-3.5 w-3.5" />
                            {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readTime} de lectura
                        </span>
                        <time
                            dateTime={article.publishedAt}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"
                        >
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(article.publishedAt)}
                        </time>
                    </div>

                    <h1 className="mb-6 text-3xl font-black leading-[1.12] tracking-tight text-white md:text-5xl">
                        {article.title}
                    </h1>

                    <p className="mb-10 text-lg leading-relaxed text-slate-400 md:text-xl">
                        {article.excerpt}
                    </p>

                    <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/[0.07]">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover opacity-70"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#010912] via-transparent to-transparent"
                        />
                    </div>
                </header>

                {/* Resumen ejecutivo: para quien decide y no va a leer 11 minutos */}
                <section
                    aria-labelledby="resumen"
                    className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                    <h2
                        id="resumen"
                        className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-[#8FC0FF]"
                    >
                        Resumen ejecutivo
                    </h2>
                    <ul className="space-y-3">
                        {article.tldr.map((point) => (
                            <li key={point} className="flex gap-3.5">
                                <span
                                    aria-hidden="true"
                                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]"
                                />
                                <span className="text-[15px] leading-relaxed text-slate-300">
                                    {point}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {article.keyFacts && (
                    <dl className="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-4">
                        {article.keyFacts.map((fact) => (
                            <div key={fact.label} className="bg-[#02121d] p-5">
                                <dt className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    {fact.label}
                                </dt>
                                <dd className="text-base font-black leading-tight text-white">
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                <ArticleBody blocks={article.body} />

                <ArticleFooter article={article} related={related} />
            </article>

            {/* <script> plano para que el marcado viaje en el HTML servido. */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}
