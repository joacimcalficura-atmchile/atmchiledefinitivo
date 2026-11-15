import { track } from "@vercel/analytics";
import { hasConsent } from "@/lib/consent";
import { origenActual } from "@/lib/attribution";

/**
 * Eventos de conversión del sitio. Hasta ahora solo se medían páginas vistas,
 * así que no había forma de saber qué página o campaña generaba contactos.
 *
 * Se envían a Vercel Web Analytics (pestaña «Events») y, los clics en WhatsApp
 * y los chats iniciados, también al CRM (con página de origen y UTM) para
 * medir qué ventas trae la web. Cuando se instale el Meta Pixel / GA4, este es
 * el único punto que hay que extender para que cada evento llegue también allí.
 */
type ConversionEvent =
    | { name: "lead_submit"; props: { form: "contacto" | "whatsapp" | "club100" } }
    | { name: "whatsapp_open"; props: { contact: string } }
    | { name: "chat_start"; props?: undefined };

/** Evento anónimo al CRM. sendBeacon sobrevive a que se abra WhatsApp en otra pestaña. */
function enviarEventoCrm(evento: "whatsapp_click" | "chat_inicio", boton?: string): void {
    const body = JSON.stringify({ evento, boton: boton?.slice(0, 80), origen: origenActual() });
    if (navigator.sendBeacon?.("/api/web-evento", body)) return;
    void fetch("/api/web-evento", { method: "POST", body, keepalive: true }).catch(() => {});
}

export function trackConversion(event: ConversionEvent): void {
    // Sin consentimiento de analítica no se envía nada (Ley 21.719).
    if (!hasConsent("analytics")) return;
    try {
        track(event.name, event.props);
    } catch {
        // La medición nunca debe romper un formulario.
    }
    try {
        if (event.name === "whatsapp_open") enviarEventoCrm("whatsapp_click", event.props.contact);
        if (event.name === "chat_start") enviarEventoCrm("chat_inicio");
    } catch {
        // Ídem.
    }
}
