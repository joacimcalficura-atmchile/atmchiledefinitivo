import type { Metadata } from "next";
import { InsightsContent } from "@/components/sections/InsightsContent";
import { ARTICLES } from "@/data/insights";
import { SITE } from "@/data/site";

const TITLE = "Insights | Normativa, IA y arquitectura con fuente verificable";
const DESCRIPTION =
    "Análisis técnico para decisiones de negocio: Ley 21.719, Ley Marco de Ciberseguridad, gobernanza de IA y arquitectura de software. Cada plazo y cada cifra, citados a su fuente.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE.url}/insights` },
    openGraph: {
        type: "website",
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE.url}/insights`,
        siteName: SITE.name,
        locale: SITE.locale,
        // Sin `images`: hereda el OG dinámico de `app/opengraph-image.tsx`. La
        // ruta estática anterior (`/images/og-profepyme.png`) no existía en
        // `public/`, así que las vistas previas salían sin imagen.
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** Listado de artículos para buscadores y motores generativos. */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/insights`,
    inLanguage: "es-CL",
    publisher: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: ARTICLES.length,
        itemListElement: ARTICLES.map((article, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${SITE.url}/insights/${article.slug}`,
            name: article.title,
        })),
    },
};

export default function InsightsPage() {
    return (
        <>
            <InsightsContent />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
