import { NextResponse } from "next/server";
import { z } from "zod";
import { OrigenSchema, enviarAlCrm } from "@/lib/crm";

/**
 * Clics en WhatsApp y chats iniciados → CRM (eventos anónimos, sin datos
 * personales). El navegador solo llama aquí si el visitante aceptó la
 * analítica (ver trackConversion en src/lib/analytics.ts).
 */
const EventoSchema = z
    .object({
        evento: z.enum(["whatsapp_click", "chat_inicio"]),
        boton: z.string().trim().max(80).optional(),
        origen: OrigenSchema.optional(),
    })
    .strip();

export async function POST(req: Request) {
    let body: unknown;
    try {
        // sendBeacon manda texto plano: se lee como texto y se parsea.
        body = JSON.parse(await req.text());
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
    }
    const parsed = EventoSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

    await enviarAlCrm({ tipo: "evento", ...parsed.data });
    // Siempre 204: el resultado no le sirve al navegador.
    return new NextResponse(null, { status: 204 });
}
