import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/insights";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE.url, changeFrequency: "weekly", priority: 1, lastModified: now },
        { url: `${SITE.url}/servicios`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
        { url: `${SITE.url}/seguridad`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
        { url: `${SITE.url}/talento`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
        { url: `${SITE.url}/insights`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
        { url: `${SITE.url}/contacto`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
        // Las legales faltaban por completo en el sitemap anterior.
        { url: `${SITE.url}/privacidad`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
        { url: `${SITE.url}/terminos`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    ];

    // `lastModified` real por artículo: declarar "daily" sobre contenido que no
    // cambia solo entrena al rastreador a desconfiar del sitemap.
    const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
        url: `${SITE.url}/insights/${article.slug}`,
        lastModified: new Date(article.updatedAt ?? article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticPages, ...articlePages];
}
