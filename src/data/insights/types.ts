/**
 * Modelo de contenido de Insights.
 *
 * El cuerpo de cada artículo es una lista de bloques *tipados*, no HTML en
 * crudo: así el renderizado no necesita `dangerouslySetInnerHTML` (que obligaría
 * a relajar la CSP) y el compilador detecta cualquier bloque mal formado.
 */

export type ArticleCategory =
    | "Cumplimiento & Datos"
    | "Ciberseguridad"
    | "Gobernanza de IA"
    | "Inteligencia Artificial"
    | "Visibilidad Digital";

/** Claves de ícono; el mapeo a componente vive en la capa de UI (datos serializables). */
export type ArticleIcon =
    | "shield"
    | "siren"
    | "scale"
    | "gavel"
    | "cpu"
    | "search";

export type ArticleBlock =
    | { kind: "paragraph"; text: string }
    | { kind: "heading"; text: string }
    | { kind: "list"; items: readonly string[] }
    | { kind: "numbered"; items: readonly { title: string; text: string }[] }
    | { kind: "callout"; tone: "alert" | "info"; title: string; text: string }
    | { kind: "table"; headers: readonly string[]; rows: readonly (readonly string[])[] };

/** Referencia verificable. Todo dato duro del artículo debe ser rastreable a una de estas. */
export interface ArticleSource {
    readonly label: string;
    readonly url: string;
}

/** Dato clave destacado en la ficha superior del artículo. */
export interface ArticleFact {
    readonly label: string;
    readonly value: string;
}

export interface Article {
    readonly slug: string;
    readonly title: string;
    /** Versión corta para tarjetas, donde el título completo no cabe. */
    readonly cardTitle: string;
    readonly category: ArticleCategory;
    readonly icon: ArticleIcon;
    /** Bajada larga (grilla de /insights y meta description). */
    readonly excerpt: string;
    /** Bajada corta (preview del home). */
    readonly cardDesc: string;
    readonly readTime: string;
    /** ISO 8601. Alimenta <time>, el JSON-LD y el orden de la grilla. */
    readonly publishedAt: string;
    readonly updatedAt?: string;
    readonly imageUrl: string;
    /** Destacado en el home. */
    readonly featured?: boolean;
    /** Resumen ejecutivo: lo que un gerente necesita saber sin leer el artículo. */
    readonly tldr: readonly string[];
    readonly keyFacts?: readonly ArticleFact[];
    readonly body: readonly ArticleBlock[];
    readonly sources: readonly ArticleSource[];
    /** Servicio de ATM con el que conecta el artículo (CTA contextual, no genérico). */
    readonly relatedService?: { readonly label: string; readonly href: string };
}
