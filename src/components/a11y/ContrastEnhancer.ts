/**
 * Contraste reforzado: recorre el texto visible y, donde el contraste contra
 * su fondo real queda bajo 7:1 (WCAG 1.4.6, nivel AAA), lo pasa a Onyx o a
 * blanco, el que contraste más. No cambia los colores que ya cumplen, así la
 * página conserva la marca y solo se corrige lo que hace falta.
 *
 * Los colores se leen con un canvas para entender cualquier formato que
 * devuelva el navegador (rgb, oklch, color-mix…).
 */

const MARK = "data-a11y-contrast";
// Margen sobre 7:1 para absorber redondeos y capas en plena animación.
const TARGET = 7.5;
const DARK = "#0F1215";
const LIGHT = "#FFFFFF";

type RGBA = [number, number, number, number];

let ctx: CanvasRenderingContext2D | null = null;
const cache = new Map<string, RGBA>();

function toRGBA(color: string): RGBA {
    const hit = cache.get(color);
    if (hit) return hit;
    if (!ctx) {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        ctx = canvas.getContext("2d", { willReadFrequently: true });
    }
    let out: RGBA = [0, 0, 0, 0];
    if (ctx && color && color !== "transparent") {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        out = [d[0], d[1], d[2], d[3] / 255];
    }
    cache.set(color, out);
    return out;
}

function over(top: RGBA, bottom: RGBA): RGBA {
    const a = top[3] + bottom[3] * (1 - top[3]);
    if (a === 0) return [0, 0, 0, 0];
    const mix = (i: number) => (top[i] * top[3] + bottom[i] * bottom[3] * (1 - top[3])) / a;
    return [mix(0), mix(1), mix(2), a];
}

function luminance([r, g, b]: RGBA) {
    const ch = (v: number) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

function ratio(a: RGBA, b: RGBA) {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Fondo efectivo de un elemento, componiendo las capas semitransparentes. */
function backgroundOf(el: Element): RGBA | null {
    const layers: RGBA[] = [];
    let node: Element | null = el;
    while (node) {
        const cs = getComputedStyle(node);
        const bg = toRGBA(cs.backgroundColor);
        if (bg[3] > 0) layers.push(bg);
        if (bg[3] >= 0.99) break;
        // Sobre una foto o video no se puede calcular: se deja como está.
        if (cs.backgroundImage.includes("url(") && bg[3] < 0.85) return null;
        node = node.parentElement;
    }
    let result: RGBA = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i--) result = over(layers[i], result);
    return result;
}

function textElements(): Set<HTMLElement> {
    const set = new Set<HTMLElement>();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const parent = n.parentElement;
        if (!parent || parent.closest("script,style,noscript,svg,.sr-only")) continue;
        set.add(parent);
    }
    // Campos de formulario: su texto no es un nodo de texto.
    document.querySelectorAll<HTMLElement>("input:not([type=hidden]),textarea,select").forEach((el) => set.add(el));
    return set;
}

export function enhanceContrast() {
    for (const el of textElements()) {
        if (el.getClientRects().length === 0) continue;
        // Lo que ya se corrigió queda corregido; solo se evalúa lo nuevo.
        if (el.hasAttribute(MARK)) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden") continue;
        const bg = backgroundOf(el);
        if (!bg) continue;
        let fg = toRGBA(cs.color);
        const fill = cs.getPropertyValue("-webkit-text-fill-color");
        if (fill && fill !== cs.color) {
            const f = toRGBA(fill);
            if (f[3] > 0) fg = f;
        }
        const solid = over(fg, bg);
        if (ratio(solid, bg) >= TARGET) continue;
        const dark = toRGBA(DARK);
        const light = toRGBA(LIGHT);
        const best = ratio(dark, bg) >= ratio(light, bg) ? DARK : LIGHT;
        el.style.setProperty("color", best, "important");
        el.setAttribute(MARK, "");
    }
}

export function clearContrast() {
    document.querySelectorAll<HTMLElement>(`[${MARK}]`).forEach((el) => {
        el.style.removeProperty("color");
        el.removeAttribute(MARK);
    });
}
