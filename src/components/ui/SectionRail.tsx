"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { CURATED_RAILS } from "@/data/section-rail";

interface RailItem {
    key: string;
    title: string;
    summary: string;
    el: HTMLElement;
}

/** Margen mínimo entre la tarjeta y el borde de la ventana. */
const EDGE = 12;

const clean = (text: string | null | undefined, max: number) => {
    // «1.Titular» (número en un <span> pegado al título) → «1. Titular».
    const t = (text ?? "").replace(/\s+/g, " ").trim().replace(/^(\d+\.)(?=\S)/, "$1 ");
    return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

const isShown = (el: HTMLElement) => el.getClientRects().length > 0 && el.offsetHeight >= 140;

/**
 * Arma la lista de secciones de la página actual: las escritas a mano en
 * `CURATED_RAILS` o, si la ruta no está ahí, las <section> principales de <main>.
 */
function discover(pathname: string): RailItem[] {
    const curated = CURATED_RAILS[pathname];
    if (curated) {
        return curated.flatMap((s) => {
            const el = document.getElementById(s.id);
            return el && isShown(el) ? [{ key: s.id, title: s.title, summary: s.summary, el }] : [];
        });
    }

    const main = document.querySelector("main");
    if (!main) return [];
    const items: RailItem[] = [];
    main.querySelectorAll<HTMLElement>("section").forEach((el, i) => {
        if (el.parentElement?.closest("section")) return; // solo secciones de primer nivel
        if (el.closest("[data-rail-ignore]") || !isShown(el)) return;
        const heading = el.querySelector("h1, h2");
        const title = clean(el.dataset.railTitle ?? heading?.textContent, 56);
        if (!title) return;
        const paragraph = Array.from(el.querySelectorAll("p")).find((p) => clean(p.textContent, 400).length > 30);
        const summary = clean(el.dataset.railSummary ?? paragraph?.textContent, 120);
        items.push({ key: el.id || `seccion-${i}`, title, summary, el });
    });
    return items;
}

/**
 * Menú lateral de secciones, a la derecha y en todas las páginas: una rayita por
 * sección, la actual resaltada en zafiro. Al pasar el mouse, con el teclado o al
 * tocarla en el teléfono muestra el título y un resumen hacia la izquierda; al
 * hacer clic baja hasta la sección con el scroll suave de Lenis.
 *
 * Siempre queda dentro de la pantalla: vive en la franja entre el menú superior
 * y los botones flotantes (WhatsApp y asistente), se achica en pantallas bajas y
 * la tarjeta se ajusta para no salirse por arriba, abajo ni por el costado.
 * Queda bajo los modales y el aviso de privacidad (z 10000+), que lo cubren con
 * su velo como al resto de la página.
 */
export function SectionRail() {
    const pathname = usePathname();
    const lenis = useLenis();
    const [items, setItems] = useState<RailItem[]>([]);
    const [active, setActive] = useState<string | null>(null);
    const [shown, setShownState] = useState<string | null>(null);
    const [lastShown, setLastShown] = useState<string | null>(null);
    const setShown = useCallback((key: string | null) => {
        setShownState(key);
        if (key) setLastShown(key);
    }, []);
    const [awake, setAwake] = useState(true);
    const [cardTop, setCardTop] = useState(0);

    const navRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const buttons = useRef(new Map<string, HTMLButtonElement>());
    const tapTimer = useRef<number>(0);

    // Secciones presentes: al cambiar de página y cuando el contenido cambia
    // (secciones que cargan después, como los reels o los productos).
    useEffect(() => {
        let timer = 0;
        const scan = () => {
            const found = discover(pathname);
            setItems((prev) =>
                prev.length === found.length && prev.every((p, i) => p.el === found[i].el && p.title === found[i].title)
                    ? prev
                    : found
            );
        };
        const schedule = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(scan, 250);
        };
        // Primera lectura en el siguiente frame (al cambiar de página se cierra la tarjeta).
        const first = requestAnimationFrame(() => {
            setShownState(null);
            scan();
        });
        const main = document.querySelector("main");
        const observer = new MutationObserver(schedule);
        if (main) observer.observe(main, { childList: true, subtree: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(first);
            observer.disconnect();
            window.removeEventListener("resize", schedule);
            window.clearTimeout(timer);
        };
    }, [pathname]);

    // Sección activa: la última cuyo borde superior ya pasó el 40 % de la ventana.
    // En pantallas táctiles el menú se atenúa mientras no hay scroll, para no tapar texto.
    useEffect(() => {
        let frame = 0;
        let idle = 0;
        const touch = window.matchMedia("(hover: none)").matches;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.4;
            let current = items[0]?.key ?? null;
            for (const it of items) if (it.el.getBoundingClientRect().top <= line) current = it.key;
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
            if (touch) {
                setAwake(true);
                window.clearTimeout(idle);
                idle = window.setTimeout(() => setAwake(false), 1600);
            }
        };
        update();
        if (touch) idle = window.setTimeout(() => setAwake(false), 2500);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
            window.clearTimeout(idle);
        };
    }, [items]);

    // Ubica la tarjeta a la altura de la rayita, sin salirse de la ventana.
    useLayoutEffect(() => {
        if (!shown) return;
        const btn = buttons.current.get(shown);
        const nav = navRef.current;
        if (!btn || !nav) return;
        const b = btn.getBoundingClientRect();
        const n = nav.getBoundingClientRect();
        const h = cardRef.current?.offsetHeight ?? 96;
        const center = b.top + b.height / 2;
        const top = Math.min(Math.max(center - h / 2, EDGE), window.innerHeight - h - EDGE);
        setCardTop(top - n.top);
    }, [shown, items]);

    useEffect(() => () => window.clearTimeout(tapTimer.current), []);

    const go = useCallback(
        (it: RailItem) => {
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (lenis && !reduced) {
                lenis.scrollTo(it.el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
            } else {
                it.el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
            }
        },
        [lenis]
    );

    if (items.length < 2) return null;
    const current = items.find((it) => it.key === shown);
    // La tarjeta conserva su último contenido mientras se desvanece.
    const card = current ?? items.find((it) => it.key === lastShown);

    return (
        // Franja segura: bajo el menú superior (top-24) y sobre los flotantes (bottom-28).
        <div className="pointer-events-none fixed bottom-28 right-1 top-24 z-[9990] flex items-center sm:right-3 lg:right-5">
            <nav
                ref={navRef}
                aria-label="Secciones de la página"
                className={`pointer-events-auto relative max-h-full transition-opacity duration-500 ${
                    awake || shown ? "opacity-100" : "opacity-45"
                }`}
                onMouseLeave={() => setShown(null)}
            >
                <ul className="flex max-h-full flex-col gap-[clamp(2px,0.9vh,7px)] rounded-full border border-[#176BDE]/35 bg-[#0F1215]/70 px-1 py-3 shadow-[0_8px_30px_rgba(2,8,23,0.25)] ring-1 ring-white/5 backdrop-blur-md sm:px-2.5 sm:py-4">
                    {items.map((it) => {
                        const isActive = it.key === active;
                        const isShownNow = it.key === shown;
                        return (
                            <li key={it.key} className="flex justify-end">
                                <button
                                    type="button"
                                    ref={(node) => {
                                        if (node) buttons.current.set(it.key, node);
                                        else buttons.current.delete(it.key);
                                    }}
                                    onClick={() => go(it)}
                                    onPointerDown={(e) => {
                                        // En táctil no hay hover: el toque muestra la tarjeta un momento.
                                        if (e.pointerType === "mouse") return;
                                        setShown(it.key);
                                        window.clearTimeout(tapTimer.current);
                                        tapTimer.current = window.setTimeout(() => setShown(null), 1600);
                                    }}
                                    onMouseEnter={() => setShown(it.key)}
                                    onFocus={() => setShown(it.key)}
                                    onBlur={() => setShown(null)}
                                    aria-label={`Ir a ${it.title}`}
                                    aria-current={isActive ? "true" : undefined}
                                    className="group relative flex h-[clamp(8px,1.6vh,12px)] w-3 items-center justify-end outline-none after:absolute after:-inset-x-1.5 after:-inset-y-1 after:content-[''] sm:w-6"
                                >
                                    <span
                                        className={`block h-[2px] rounded-full transition-all duration-300 ease-out ${
                                            isActive
                                                ? "w-3 bg-gradient-to-l from-[#176BDE] to-[#16F3E8] shadow-[0_0_10px_rgba(22,243,232,0.55)] sm:w-6"
                                                : isShownNow
                                                  ? "w-2.5 bg-white sm:w-5"
                                                  : "w-1.5 bg-white/45 group-focus-visible:bg-white sm:w-3"
                                        }`}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* Tarjeta con título y resumen, hacia la izquierda del menú */}
                <div
                    ref={cardRef}
                    role="presentation"
                    style={{ top: cardTop }}
                    className={`pointer-events-none absolute right-full mr-3 w-[min(18rem,calc(100vw-3.5rem))] rounded-2xl border border-[#176BDE]/35 bg-[#0F1215]/95 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out sm:mr-4 ${
                        current ? "translate-x-0 opacity-100" : "invisible translate-x-1 opacity-0"
                    }`}
                >
                    {card && (
                        <>
                            <p className="flex items-center gap-2 text-sm font-bold text-white">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]" />
                                {card.title}
                            </p>
                            {card.summary && (
                                <p className="mt-1.5 text-[13px] leading-snug text-slate-300">{card.summary}</p>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
