import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { INSTAGRAM_CACHE_TAG, refreshInstagramToken } from "@/lib/instagram";

/**
 * Cron semanal (vercel.json): renueva el token de Instagram si es de tipo
 * "Instagram Login" (vence a los 60 días) y refresca la caché del feed.
 * Vercel firma la llamada con `Authorization: Bearer $CRON_SECRET`.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const result = await refreshInstagramToken();
    revalidateTag(INSTAGRAM_CACHE_TAG, "max");
    return NextResponse.json(result, { status: result.status === "error" ? 502 : 200 });
}
