/**
 * Consentimiento de cookies y aceptación de términos (Ley 19.628 modificada por
 * la Ley 21.719). Se guarda solo en el navegador del visitante.
 *
 * - "necessary": siempre activas (el sitio no funciona sin ellas).
 * - "analytics": Vercel Web Analytics y eventos de conversión.
 * - "marketing": píxeles publicitarios (Meta Pixel, etc.) cuando se instalen.
 *
 * Todo script no esencial debe preguntar a `hasConsent()` antes de cargar y
 * escuchar CONSENT_EVENT para reaccionar si el visitante cambia de opinión.
 */

export type ConsentCategory = "analytics" | "marketing";

export type ConsentState = {
    version: number;
    termsAccepted: true;
    analytics: boolean;
    marketing: boolean;
    updatedAt: string;
};

/** Subir este número obliga a pedir el consentimiento de nuevo (p. ej. si cambian los términos). */
export const CONSENT_VERSION = 1;
const STORAGE_KEY = "atm-consent";

export const CONSENT_EVENT = "atm:consent-change";
export const CONSENT_OPEN_EVENT = "atm:consent-open";

export function readConsent(): ConsentState | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as ConsentState;
        if (parsed?.version !== CONSENT_VERSION || parsed.termsAccepted !== true) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveConsent(choice: Pick<ConsentState, "analytics" | "marketing">): ConsentState {
    const state: ConsentState = {
        version: CONSENT_VERSION,
        termsAccepted: true,
        analytics: choice.analytics,
        marketing: choice.marketing,
        updatedAt: new Date().toISOString(),
    };
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Modo privado o almacenamiento bloqueado: la elección vale para esta visita.
    }
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
    return state;
}

export function hasConsent(category: ConsentCategory): boolean {
    return readConsent()?.[category] === true;
}

/** Vuelve a abrir el aviso (enlace «Preferencias de cookies» del footer). */
export function openConsentPreferences(): void {
    window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
