import type { Article } from "./types";
import { agentesProduccion } from "./agentes-produccion";
import { geoBusquedaGenerativa } from "./geo-busqueda-generativa";
import { iso42001 } from "./iso-42001";
import { ley21663 } from "./ley-21663";
import { ley21719 } from "./ley-21719";
import { regulacionIa } from "./regulacion-ia";

export type { Article, ArticleBlock, ArticleCategory, ArticleIcon, ArticleSource } from "./types";

/**
 * Registro único de Insights, ordenado del más reciente al más antiguo.
 *
 * Tanto la grilla de /insights como el preview del home leen de aquí: antes el
 * home mantenía su propia copia de los artículos y ya se había desincronizado
 * (un artículo de IA aparecía bajo la categoría «Criptografía & Software»).
 */
export const ARTICLES: readonly Article[] = [
    ley21719,
    ley21663,
    regulacionIa,
    iso42001,
    agentesProduccion,
    geoBusquedaGenerativa,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getArticle(slug: string): Article | undefined {
    return ARTICLES.find((article) => article.slug === slug);
}

/** Artículos destacados para el preview del home. */
export function getFeaturedArticles(limit = 3): readonly Article[] {
    const featured = ARTICLES.filter((article) => article.featured);
    return (featured.length >= limit ? featured : ARTICLES).slice(0, limit);
}

/** Otros artículos para el bloque «seguir leyendo», excluyendo el actual. */
export function getRelatedArticles(slug: string, limit = 2): readonly Article[] {
    const current = getArticle(slug);
    if (!current) return ARTICLES.slice(0, limit);

    const sameCategory = ARTICLES.filter(
        (article) => article.slug !== slug && article.category === current.category
    );
    const others = ARTICLES.filter(
        (article) => article.slug !== slug && article.category !== current.category
    );
    return [...sameCategory, ...others].slice(0, limit);
}
