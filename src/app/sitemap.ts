import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/insights";
import { SITE } from "@/data/site";

/**
 * Sitemap generado desde las fuentes de verdad: el dominio sale de `SITE.url`
 * (con www, el host que sirve producción) y los artículos de `ARTICLES`, así
 * que cada artículo nuevo entra solo, con su fecha real de publicación.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const latestArticle = ARTICLES[0]?.updatedAt ?? ARTICLES[0]?.publishedAt;

  const pages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/leasing-de-software`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contacto`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/seguridad`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/talento`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/insights`,
      lastModified: latestArticle ? new Date(latestArticle) : undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: `${base}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${base}/insights/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
