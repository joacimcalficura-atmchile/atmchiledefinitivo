import { z } from "zod";

/**
 * Envío al CRM de ATM (ruta /api/webhooks/web del CRM). Solo servidor.
 *
 * Variables de entorno (Vercel, proyecto atmchiledefinitivo):
 *   CRM_WEB_URL     → https://<dominio-del-crm>/api/webhooks/web
 *   CRM_WEB_SECRET  → la misma clave que WEB_LEADS_SECRET en el proyecto del CRM
 *
 * Sin esas variables no se envía nada y el sitio sigue como antes (planilla y
 * correo). Nunca lanza: el CRM no debe tumbar un formulario.
 */

const texto = (max: number) => z.string().trim().max(max).optional();

export const OrigenSchema = z
    .object({
        pagina: texto(300),
        landing: texto(300),
        referrer: texto(300),
        utm_source: texto(120),
        utm_medium: texto(120),
        utm_campaign: texto(160),
        utm_term: texto(160),
        utm_content: texto(160),
    })
    .strip();

export type OrigenCrm = z.infer<typeof OrigenSchema>;

export type FormularioWeb = "contacto" | "whatsapp" | "club100" | "chat_ia";

export type LeadCrm = {
    tipo: "lead";
    formulario: FormularioWeb;
    nombre: string;
    correo: string;
    telefono?: string;
    empresa?: string;
    mensaje?: string;
    extra?: Record<string, string>;
    origen?: OrigenCrm;
};

export type EventoCrm = {
    tipo: "evento";
    evento: "whatsapp_click" | "chat_inicio";
    boton?: string;
    origen?: OrigenCrm;
};

export function crmConfigurado(): boolean {
    return Boolean(process.env.CRM_WEB_URL && process.env.CRM_WEB_SECRET);
}

/** Devuelve true si el CRM confirmó la recepción. */
export async function enviarAlCrm(datos: LeadCrm | EventoCrm, trackingId?: string): Promise<boolean> {
    const url = process.env.CRM_WEB_URL;
    const secret = process.env.CRM_WEB_SECRET;
    if (!url || !secret) return false;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-web-key": secret },
            body: JSON.stringify(datos),
            signal: AbortSignal.timeout(6000),
        });
        if (!res.ok) {
            console.error(`[CRM] HTTP ${res.status} al enviar ${datos.tipo}. ID: ${trackingId ?? "-"}`);
            return false;
        }
        return true;
    } catch (err) {
        console.error(`[CRM] No se pudo enviar ${datos.tipo}. ID: ${trackingId ?? "-"}`, err);
        return false;
    }
}

const FORMULARIO_POR_HOJA: Record<string, FormularioWeb> = {
    leeads_wsp: "whatsapp",
    Leeads_atm: "contacto",
    el_club_de_los_100: "club100",
    ia_leeds: "chat_ia",
};

/** Campos propios de cada formulario que el CRM guarda como comentario. */
const CAMPOS_EXTRA: Record<string, string> = {
    datoExtra: "tamano",
    rubro: "rubro",
    estadoLegal: "estadoLegal",
    comunicaciones: "comunicaciones",
    desafio: "desafio",
    auditoria: "auditoria",
};

/** Traduce el payload que ya va a la planilla al formato del CRM. */
export function leadDesdeFormulario(payload: Record<string, unknown>, origen?: OrigenCrm): LeadCrm {
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const extra: Record<string, string> = {};
    for (const [campo, clave] of Object.entries(CAMPOS_EXTRA)) {
        const v = str(payload[campo]);
        if (v) extra[clave] = v.slice(0, 500);
    }
    return {
        tipo: "lead",
        formulario: FORMULARIO_POR_HOJA[str(payload.hojaDestino) ?? ""] ?? "contacto",
        nombre: String(payload.nombre ?? "").slice(0, 120),
        correo: String(payload.correo ?? "").slice(0, 200),
        telefono: str(payload.numero)?.slice(0, 40),
        empresa: str(payload.empresa)?.slice(0, 160),
        mensaje: str(payload.mensaje)?.slice(0, 2000),
        extra: Object.keys(extra).length ? extra : undefined,
        origen,
    };
}
