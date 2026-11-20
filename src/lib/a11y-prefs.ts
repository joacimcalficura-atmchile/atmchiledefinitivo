/**
 * Preferencias de accesibilidad del sitio (panel propio, sin overlays de
 * terceros). Se guardan en este navegador y se aplican como clases en <html>
 * antes del primer pintado (ver `A11Y_BOOT_SCRIPT`), para que quien las elige
 * no vea un parpadeo con el diseño por defecto en cada página.
 *
 * Es una preferencia que la persona pide de forma expresa, así que es un
 * almacenamiento estrictamente necesario: no depende del aviso de cookies.
 */

export type TextScale = 0 | 1 | 2 | 3;

export type A11yPrefs = {
    /** Tamaño del texto: 100 %, 112,5 %, 125 % y 150 %. */
    textScale: TextScale;
    /** Contraste reforzado (texto con contraste AAA, superficies sólidas). */
    contrast: boolean;
    /** Sin animaciones, transiciones ni desplazamiento suave. */
    reduceMotion: boolean;
    /** Enlaces siempre subrayados. */
    underlineLinks: boolean;
    /** Tipografía Atkinson Hyperlegible, diseñada para baja visión. */
    readableFont: boolean;
    /** Más espacio entre líneas, letras y palabras (WCAG 1.4.12). */
    textSpacing: boolean;
    /** Indicador de foco más grueso y siempre visible. */
    strongFocus: boolean;
};

export const DEFAULT_PREFS: A11yPrefs = {
    textScale: 0,
    contrast: false,
    reduceMotion: false,
    underlineLinks: false,
    readableFont: false,
    textSpacing: false,
    strongFocus: false,
};

export const TEXT_SCALES = [
    { value: 0, label: "100 %", root: "100%" },
    { value: 1, label: "112 %", root: "112.5%" },
    { value: 2, label: "125 %", root: "125%" },
    { value: 3, label: "150 %", root: "150%" },
] as const;

export const A11Y_STORAGE_KEY = "atm-a11y";
export const A11Y_EVENT = "atm:a11y-change";
export const A11Y_OPEN_EVENT = "atm:a11y-open";

/** Clase en <html> por cada preferencia booleana. */
const CLASS_BY_PREF = {
    contrast: "a11y-contrast",
    reduceMotion: "a11y-reduce-motion",
    underlineLinks: "a11y-underline-links",
    readableFont: "a11y-readable-font",
    textSpacing: "a11y-text-spacing",
    strongFocus: "a11y-strong-focus",
} as const satisfies Record<Exclude<keyof A11yPrefs, "textScale">, string>;

export function readPrefs(): A11yPrefs {
    if (typeof window === "undefined") return DEFAULT_PREFS;
    try {
        const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
        if (!raw) return DEFAULT_PREFS;
        const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
        const scale = Number(parsed.textScale);
        return {
            ...DEFAULT_PREFS,
            ...parsed,
            textScale: (scale >= 0 && scale <= 3 ? scale : 0) as TextScale,
        };
    } catch {
        return DEFAULT_PREFS;
    }
}

export function applyPrefs(prefs: A11yPrefs) {
    const root = document.documentElement;
    for (const [key, cls] of Object.entries(CLASS_BY_PREF)) {
        root.classList.toggle(cls, Boolean(prefs[key as keyof typeof CLASS_BY_PREF]));
    }
    root.style.fontSize = prefs.textScale ? TEXT_SCALES[prefs.textScale].root : "";
}

export function savePrefs(prefs: A11yPrefs) {
    try {
        const isDefault = (Object.keys(DEFAULT_PREFS) as (keyof A11yPrefs)[]).every(
            (k) => prefs[k] === DEFAULT_PREFS[k]
        );
        if (isDefault) window.localStorage.removeItem(A11Y_STORAGE_KEY);
        else window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
        // Modo privado o almacenamiento bloqueado: la preferencia vale para esta visita.
    }
    applyPrefs(prefs);
    window.dispatchEvent(new CustomEvent<A11yPrefs>(A11Y_EVENT, { detail: prefs }));
}

export function openA11yPanel() {
    window.dispatchEvent(new Event(A11Y_OPEN_EVENT));
}

/** ¿La persona pidió menos movimiento, en el sistema o en el panel? */
export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return (
        document.documentElement.classList.contains(CLASS_BY_PREF.reduceMotion) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * Script en línea para <head>: aplica las preferencias guardadas antes de que
 * React hidrate. Debe ser autocontenido (no puede importar nada).
 */
export const A11Y_BOOT_SCRIPT = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(
    A11Y_STORAGE_KEY
)})||"null");if(!p)return;var r=document.documentElement,m=${JSON.stringify(CLASS_BY_PREF)},s=${JSON.stringify(
    TEXT_SCALES.map((t) => t.root)
)};for(var k in m){if(p[k])r.classList.add(m[k]);}if(p.textScale>0&&p.textScale<4)r.style.fontSize=s[p.textScale];}catch(e){}})();`;
