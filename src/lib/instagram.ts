/**
 * Feed de reels de Instagram (solo servidor).
 *
 * Lee los últimos reels de @atmchile_com con la API de Instagram de Meta y los
 * cachea con ISR: Next.js vuelve a pedirlos como máximo una vez por hora, así
 * que un reel nuevo aparece solo en la web sin redeploy.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables, nunca con
 * prefijo NEXT_PUBLIC_ para que el token no llegue al navegador):
 *   - INSTAGRAM_ACCESS_TOKEN  Token de página de Facebook (no vence) o token de
 *                             "Instagram Login" (empieza con "IG", vence en 60
 *                             días y se renueva solo, ver `refreshIfNeeded`).
 *   - INSTAGRAM_USER_ID       ID de la cuenta profesional de Instagram. Por
 *                             defecto, el de @atmchile_com.
 *
 * Si falta el token o la API falla, se devuelve una lista vacía y la sección
 * simplemente no se muestra: la home nunca se rompe por culpa de Instagram.
 */

const GRAPH_VERSION = "v21.0";
/** @atmchile_com (cuenta profesional enlazada a la página de Facebook de ATM). */
const DEFAULT_IG_USER_ID = "17841402108394457";
const REVALIDATE_SECONDS = 60 * 60;
export const INSTAGRAM_CACHE_TAG = "instagram-reels";

export interface InstagramReel {
    readonly id: string;
    readonly caption: string;
    /** MP4 firmado por el CDN de Instagram. `null` si Meta no lo entrega (p. ej. música con derechos). */
    readonly videoUrl: string | null;
    readonly thumbnailUrl: string | null;
    readonly permalink: string;
    readonly timestamp: string;
}

interface GraphMedia {
    id: string;
    caption?: string;
    media_type?: string;
    media_product_type?: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink?: string;
    timestamp?: string;
}

const FIELDS = "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp";

/** Los tokens de "Instagram Login" empiezan con "IG"; los de página de Facebook, con "EAA". */
const isInstagramLoginToken = (token: string) => token.startsWith("IG");

function buildMediaUrl(token: string, userId: string, limit: number) {
    const base = isInstagramLoginToken(token)
        ? `https://graph.instagram.com/${GRAPH_VERSION}/me/media`
        : `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media`;
    const params = new URLSearchParams({ fields: FIELDS, limit: String(limit), access_token: token });
    return `${base}?${params}`;
}

/**
 * Trae hasta `max` reels recientes. Pide más publicaciones de las necesarias
 * porque el endpoint mezcla fotos, carruseles y reels.
 */
export async function getLatestReels(max = 8): Promise<InstagramReel[]> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    if (!token) return [];
    const userId = process.env.INSTAGRAM_USER_ID?.trim() || DEFAULT_IG_USER_ID;

    try {
        const res = await fetch(buildMediaUrl(token, userId, 30), {
            next: { revalidate: REVALIDATE_SECONDS, tags: [INSTAGRAM_CACHE_TAG] },
        });
        if (!res.ok) {
            // Solo el código y el tipo de error: nunca se loguea la URL (lleva el token).
            const body = (await res.json().catch(() => null)) as { error?: { type?: string; code?: number } } | null;
            console.error("[instagram] La API respondió", res.status, body?.error?.type, body?.error?.code);
            return [];
        }
        const json = (await res.json()) as { data?: GraphMedia[] };
        return (json.data ?? [])
            .filter((m) => m.media_product_type === "REELS" || m.media_type === "VIDEO")
            .filter((m) => m.permalink)
            .slice(0, max)
            .map((m) => ({
                id: m.id,
                caption: m.caption ?? "",
                videoUrl: m.media_url ?? null,
                thumbnailUrl: m.thumbnail_url ?? null,
                permalink: m.permalink!,
                timestamp: m.timestamp ?? "",
            }));
    } catch (err) {
        console.error("[instagram] No se pudo leer el feed:", err instanceof Error ? err.message : "error desconocido");
        return [];
    }
}

/**
 * Renueva un token de "Instagram Login" (vigencia de 60 días). Meta solo lo
 * permite si el token tiene más de 24 h y aún no venció; cada renovación lo
 * extiende otros 60 días. Los tokens de página de Facebook no vencen y no
 * necesitan esto. Lo llama el cron semanal `/api/cron/instagram-token`.
 */
export async function refreshInstagramToken(): Promise<
    { status: "skipped"; reason: string } | { status: "refreshed"; expiresInDays: number } | { status: "error"; code?: number }
> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
    if (!token) return { status: "skipped", reason: "sin token" };
    if (!isInstagramLoginToken(token)) return { status: "skipped", reason: "token de página (no vence)" };

    const params = new URLSearchParams({ grant_type: "ig_refresh_token", access_token: token });
    const res = await fetch(`https://graph.instagram.com/refresh_access_token?${params}`, { cache: "no-store" });
    const json = (await res.json().catch(() => null)) as
        | { access_token?: string; expires_in?: number; error?: { code?: number } }
        | null;
    if (!res.ok || !json?.expires_in) {
        console.error("[instagram] Falló la renovación del token", res.status, json?.error?.code);
        return { status: "error", code: json?.error?.code };
    }
    if (json.access_token && json.access_token !== token) {
        // Meta suele mantener el mismo string; si algún día cambia, hay que actualizar la variable.
        console.warn("[instagram] Meta devolvió un token distinto: actualiza INSTAGRAM_ACCESS_TOKEN en Vercel.");
    }
    return { status: "refreshed", expiresInDays: Math.round(json.expires_in / 86400) };
}
