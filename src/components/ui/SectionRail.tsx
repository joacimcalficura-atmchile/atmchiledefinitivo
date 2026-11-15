"use client";

import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export interface RailSection {
    /** id del elemento <section> en la página. */
    id: string;
    title: string;
    summary: string;
}

/**
 * Navegador lateral de la home: una rayita por sección, la actual resaltada en
 * zafiro. Al pasar el mouse (o con el teclado) muestra el título y un resumen;
 * al hacer clic baja hasta la sección con el scroll suave de Lenis.
 * Solo en escritorio: en móvil se usa el scroll nativo.
 */
export function SectionRail({ sections }: { sections: RailSection[] }) {
    const lenis = useLenis();
    const [present, setPresent] = useState<RailSection[]>([]);
    const [active, setActive] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    // Recalcula en cada frame de scroll: qué secciones existen (algunas son opcionales,
    // p. ej. los reels sin token) y cuál está activa (la última cuyo borde superior
    // ya pasó el 40 % de la ventana).
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const found = sections.filter((s) => document.getElementById(s.id));
            setPresent((prev) =>
                prev.length === found.length && prev.every((p, i) => p.id === found[i].id) ? prev : found
            );
            const line = window.innerHeight * 0.4;
            let current = found[0]?.id ?? null;
            for (const s of found) {
                const el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top <= line) current = s.id;
            }
            setActive(current);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [sections]);

    const go = useCallback(
        (id: string) => {
            const el = document.getElementById(id);
            if (!el) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (lenis && !reduced) {
                lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
            } else {
                el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
            }
        },
        [lenis]
    );

    if (present.length < 2) return null;

    return (
        <nav
            aria-label="Secciones de la página"
            className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
            onMouseLeave={() => setHovered(null)}
        >
            <ul className="flex flex-col gap-[7px] rounded-full border border-[#176BDE]/35 bg-[#0F1215]/70 ring-1 ring-white/5 px-2.5 py-4 shadow-[0_8px_30px_rgba(2,8,23,0.25)] backdrop-blur-md">
                {present.map((s) => {
                    const isActive = s.id === active;
                    const isHovered = s.id === hovered;
                    return (
                        <li key={s.id} className="relative flex">
                            <button
                                type="button"
                                onClick={() => go(s.id)}
                                onMouseEnter={() => setHovered(s.id)}
                                onFocus={() => setHovered(s.id)}
                                onBlur={() => setHovered(null)}
                                aria-label={`Ir a ${s.title}`}
                                aria-current={isActive ? "true" : undefined}
                                className="group flex h-3 w-6 items-center outline-none"
                            >
                                <span
                                    className={`block h-[2px] rounded-full transition-all duration-300 ease-out ${
                                        isActive
                                            ? "w-6 bg-gradient-to-r from-[#176BDE] to-[#16F3E8] shadow-[0_0_10px_rgba(22,243,232,0.55)]"
                                            : isHovered
                                              ? "w-5 bg-white"
                                              : "w-3 bg-white/45 group-focus-visible:bg-white"
                                    }`}
                                />
                            </button>

                            {/* Tarjeta con título y resumen de la sección */}
                            <div
                                role="presentation"
                                className={`pointer-events-none absolute left-full top-1/2 ml-5 w-72 -translate-y-1/2 rounded-2xl border border-[#176BDE]/35 bg-[#0F1215]/95 p-4 shadow-[0_18px_50px_rgba(2,8,23,0.45)] backdrop-blur-xl transition-all duration-200 ease-out ${
                                    isHovered ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                                }`}
                            >
                                <p className="flex items-center gap-2 text-sm font-bold text-white">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]" />
                                    {s.title}
                                </p>
                                <p className="mt-1.5 text-[13px] leading-snug text-slate-300">{s.summary}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
