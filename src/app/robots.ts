import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/** Antes no existía: /robots.txt devolvía 404 y Google no encontraba el sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
