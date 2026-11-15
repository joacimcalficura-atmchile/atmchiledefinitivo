import { track } from "@vercel/analytics";

/**
 * Eventos de conversión del sitio. Hasta ahora solo se medían páginas vistas,
 * así que no había forma de saber qué página o campaña generaba contactos.
 *
 * Se envían a Vercel Web Analytics (pestaña «Events»). Cuando se instale el
 * Meta Pixel / GA4 (con banner de consentimiento), este es el único punto que
 * hay que extender para que cada evento llegue también allí.
 */
type ConversionEvent =
    | { name: "lead_submit"; props: { form: "contacto" | "whatsapp" | "club100" } }
    | { name: "whatsapp_open"; props: { contact: string } }
    | { name: "chat_start"; props?: undefined };

export function trackConversion(event: ConversionEvent): void {
    try {
        track(event.name, event.props);
    } catch {
        // La medición nunca debe romper un formulario.
    }
}
