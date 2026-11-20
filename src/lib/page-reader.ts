/**
 * «Escuchar esta página»: lectura en voz alta con la síntesis de voz del
 * propio navegador (Web Speech API). No envía texto a ningún servicio externo
 * ni carga scripts de terceros.
 *
 * Lee el contenido principal (<main id="contenido">) bloque a bloque: cada
 * título, párrafo, ítem o celda es una frase aparte, así se puede pausar,
 * saltar y resaltar en pantalla lo que se está leyendo. Las imágenes con
 * descripción se anuncian como «Imagen: …».
 *
 * El estado vive en este módulo (un solo lector por pestaña) y los
 * componentes se suscriben con `useSyncExternalStore`.
 */

export type ReaderStatus = "idle" | "playing" | "paused";

export type ReaderState = {
    status: ReaderStatus;
    /** Bloque actual (desde 0) y total de bloques de la lectura. */
    index: number;
    total: number;
    rate: number;
    /** `false` si el navegador no tiene síntesis de voz. */
    supported: boolean;
    /** «selección» si se está leyendo solo el texto marcado. */
    source: "page" | "selection";
};

export const READER_RATES = [
    { value: 0.8, label: "Lenta" },
    { value: 1, label: "Normal" },
    { value: 1.25, label: "Rápida" },
] as const;

export const READING_CLASS = "a11y-reading";

type Block = { text: string; el: Element | null };

const SERVER_STATE: ReaderState = { status: "idle", index: 0, total: 0, rate: 1, supported: false, source: "page" };

let state: ReaderState = SERVER_STATE;
let blocks: Block[] = [];
/** Cada `speak` lleva un número; los eventos de una frase cancelada se ignoran. */
let token = 0;
const listeners = new Set<() => void>();

function emit(patch: Partial<ReaderState>) {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
}

export function subscribeReader(listener: () => void) {
    listeners.add(listener);
    if (typeof window !== "undefined" && !state.supported && "speechSynthesis" in window) {
        emit({ supported: true, rate: readRate() });
        // En Chrome la lista de voces llega después del primer pintado.
        window.speechSynthesis.getVoices();
    }
    return () => listeners.delete(listener);
}

export const getReaderState = () => state;
export const getServerReaderState = () => SERVER_STATE;

const RATE_KEY = "atm-a11y-rate";

function readRate() {
    try {
        const r = Number(window.localStorage.getItem(RATE_KEY));
        return READER_RATES.some((x) => x.value === r) ? r : 1;
    } catch {
        return 1;
    }
}

/* ---------------------------------------------------------------- texto -- */

const SKIP = "script,style,noscript,template,svg,canvas,iframe,video,audio,[aria-hidden='true'],[hidden],[inert],[data-reader-skip]";

function isBlock(el: Element) {
    const d = getComputedStyle(el).display;
    return !(d.startsWith("inline") || d === "contents");
}

function visible(el: Element) {
    const anyEl = el as Element & { checkVisibility?: (o?: object) => boolean };
    if (typeof anyEl.checkVisibility === "function") {
        return anyEl.checkVisibility({ visibilityProperty: true, opacityProperty: false });
    }
    return (el as HTMLElement).offsetParent !== null || getComputedStyle(el).position === "fixed";
}

/** Recorre el contenido principal y lo agrupa en bloques legibles. */
export function collectBlocks(root: Element): Block[] {
    const out: Block[] = [];
    let current: { el: Element; parts: string[] } | null = null;
    const flush = () => {
        if (!current) return;
        const text = current.parts.join(" ").replace(/\s+/g, " ").trim();
        if (text && /[\p{L}\p{N}]/u.test(text)) out.push({ text, el: current.el });
        current = null;
    };
    const blockOf = (node: Node) => {
        let el = node.parentElement;
        while (el && el !== root && !isBlock(el)) el = el.parentElement;
        return el ?? root;
    };

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as Element;
                if (el.matches(SKIP) || !visible(el)) return NodeFilter.FILTER_REJECT;
                return el.tagName === "IMG" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
            return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const alt = (node as HTMLImageElement).alt?.trim();
            if (alt) {
                flush();
                out.push({ text: `Imagen: ${alt}`, el: node as Element });
            }
            continue;
        }
        const block = blockOf(node);
        if (!current || current.el !== block) {
            flush();
            current = { el: block, parts: [] };
        }
        current.parts.push(node.textContent ?? "");
    }
    flush();

    // Cifras sueltas («9», «01», «+20») se leen junto al texto que las sigue:
    // «9 líneas de servicio» en vez de dos frases cortadas.
    const merged: Block[] = [];
    for (let i = 0; i < out.length; i++) {
        const b = out[i];
        const prev = merged[merged.length - 1];
        // En una lista de datos (<dt>etiqueta</dt><dd>9</dd>) la cifra va después.
        if (b.text.length <= 4 && b.el?.tagName === "DD" && prev?.el?.tagName === "DT" && prev.el.parentElement === b.el.parentElement) {
            merged[merged.length - 1] = { ...prev, text: `${prev.text}: ${b.text}` };
            continue;
        }
        if (b.text.length <= 4 && !b.text.startsWith("Imagen") && out[i + 1]) {
            out[i + 1] = { ...out[i + 1], text: `${b.text} ${out[i + 1].text}`, el: out[i + 1].el };
            continue;
        }
        merged.push(b);
    }
    return merged;
}

/* ----------------------------------------------------------------- voz -- */

/** Prefiere voces de Chile, luego de Latinoamérica, luego cualquier español. */
function pickVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("es"));
    const by = (re: RegExp) => voices.filter((v) => re.test(v.lang.replace("_", "-")));
    const ranked = [
        ...by(/^es-CL$/i),
        ...by(/^es-(419|US|MX|AR|CO|PE|UY)$/i),
        ...by(/^es-ES$/i),
        ...voices,
    ];
    return ranked.find((v) => v.localService) ?? ranked[0] ?? null;
}

function clearHighlight() {
    document.querySelectorAll(`.${READING_CLASS}`).forEach((el) => el.classList.remove(READING_CLASS));
}

function highlight(el: Element | null) {
    clearHighlight();
    if (!el || el === document.getElementById("contenido")) return;
    el.classList.add(READING_CLASS);
    const r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight - 120) {
        const reduce =
            document.documentElement.classList.contains("a11y-reduce-motion") ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    }
}

function speak(index: number) {
    const synth = window.speechSynthesis;
    const my = ++token;
    synth.cancel();
    if (index >= blocks.length) {
        finish();
        return;
    }
    const block = blocks[index];
    emit({ status: "playing", index });
    if (state.source === "page") highlight(block.el);

    const u = new SpeechSynthesisUtterance(block.text);
    u.lang = "es-CL";
    const voice = pickVoice();
    if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
    }
    u.rate = state.rate;
    u.onend = () => {
        if (my === token && state.status === "playing") speak(index + 1);
    };
    u.onerror = (e) => {
        // «interrupted»/«canceled» son nuestras propias pausas o saltos.
        if (my !== token || e.error === "interrupted" || e.error === "canceled") return;
        speak(index + 1);
    };
    synth.speak(u);
}

function finish() {
    token++;
    clearHighlight();
    blocks = [];
    emit({ status: "idle", index: 0, total: 0 });
}

/* ------------------------------------------------------------ acciones -- */

/** Empieza a leer: el texto seleccionado si hay, si no, el contenido principal. */
export function startReading(): boolean {
    if (!("speechSynthesis" in window)) return false;
    const selection = window.getSelection()?.toString().trim() ?? "";
    if (selection.length > 1) {
        blocks = selection
            .split(/\n+/)
            .map((t) => t.trim())
            .filter(Boolean)
            .map((text) => ({ text, el: null }));
        emit({ source: "selection", total: blocks.length });
    } else {
        const root = document.getElementById("contenido") ?? document.querySelector("main") ?? document.body;
        blocks = collectBlocks(root);
        emit({ source: "page", total: blocks.length });
    }
    if (blocks.length === 0) return false;
    speak(0);
    return true;
}

/**
 * Pausar = cancelar y recordar el bloque. La pausa nativa de la Web Speech API
 * falla en Chrome con voces en línea y en Android; reanudar repite la frase.
 */
export function pauseReading() {
    if (state.status !== "playing") return;
    token++;
    window.speechSynthesis.cancel();
    emit({ status: "paused" });
}

export function resumeReading() {
    if (state.status === "paused") speak(state.index);
}

export function stopReading() {
    if (state.status === "idle") return;
    window.speechSynthesis.cancel();
    finish();
}

export function skipReading(delta: 1 | -1) {
    if (state.status === "idle") return;
    const next = Math.min(Math.max(state.index + delta, 0), blocks.length - 1);
    speak(next);
}

export function setReaderRate(rate: number) {
    try {
        window.localStorage.setItem(RATE_KEY, String(rate));
    } catch {
        // Sin almacenamiento: vale para esta visita.
    }
    emit({ rate });
    if (state.status === "playing") speak(state.index);
}

/** Alt + L: empezar, pausar o reanudar. */
export function toggleReading() {
    if (state.status === "playing") pauseReading();
    else if (state.status === "paused") resumeReading();
    else startReading();
}
