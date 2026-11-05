import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/**
 * El sitio declaraba un sitemap pero no tenía robots.txt, así que ningún
 * rastreador lo encontraba por la vía estándar.
 *
 * Las rutas de API quedan fuera de índice: no aportan nada en resultados de
 * búsqueda y exponen la superficie de los endpoints.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
        sitemap: `${SITE.url}/sitemap.xml`,
        host: SITE.url,
    };
}
