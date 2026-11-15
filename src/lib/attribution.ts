import { CONSENT_EVENT, hasConsent } from "@/lib/consent";

/**
 * Origen del visitante (página de entrada, sitio de donde venía y UTM) para
 * saber qué página o campaña trae cada prospecto al CRM.
 *
 * - La página desde la que se envía un formulario siempre viaja: es parte de
 *   la solicitud que el visitante hace.
 * - Entrada, referrer y UTM son datos de analítica: solo se envían, y solo se
 *   guardan en el navegador (sessionStorage), si el visitante aceptó la
 *   analítica en el aviso de cookies. Sin consentimiento viven solo en memoria
 *   durante la visita y no salen del navegador.
 */
export type Origen = {
    pagina?: string;
    landing?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "atm-origen";

let primerToque: Omit<Origen, "pagina"> | null = null;

const recortar = (v: string | null | undefined, max: number) => (v ? v.slice(0, max) : undefined);

function guardar() {
    if (!primerToque || !hasConsent("analytics")) return;
    try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(primerToque));
    } catch {
        // Almacenamiento bloqueado: queda en memoria.
    }
}

/** Se llama una vez al cargar el sitio: anota por dónde entró el visitante. */
export function capturarOrigen(): void {
    if (typeof window === "undefined" || primerToque) return;
    try {
        const guardado = window.sessionStorage.getItem(STORAGE_KEY);
        if (guardado) {
            primerToque = JSON.parse(guardado);
            return;
        }
    } catch {
        // Sigue con la URL actual.
    }

    const url = new URL(window.location.href);
    const toque: Omit<Origen, "pagina"> = { landing: recortar(url.pathname, 300) };
    for (const key of UTM_KEYS) {
        const v = recortar(url.searchParams.get(key), 160);
        if (v) toque[key] = v;
    }
    // Solo el dominio de origen (no la URL completa, que puede traer datos personales).
    try {
        const ref = document.referrer ? new URL(document.referrer) : null;
        if (ref && ref.hostname !== url.hostname) toque.referrer = recortar(ref.hostname, 300);
    } catch {
        // Referrer ilegible: se omite.
    }
    primerToque = toque;
    guardar();
    // Si acepta la analítica más tarde en esta visita, se guarda entonces.
    window.addEventListener(CONSENT_EVENT, guardar);
}

/** Origen que acompaña a un formulario o evento hacia el CRM. */
export function origenActual(): Origen {
    if (typeof window === "undefined") return {};
    const pagina = recortar(window.location.pathname, 300);
    if (!hasConsent("analytics")) return { pagina };
    return { ...(primerToque ?? {}), pagina };
}
