"use client";

import React, { useRef, useState } from "react";
import { Captions, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import type { InstagramReel } from "@/lib/instagram";
import { REEL_SUBTITLES } from "@/data/accesibilidad-video";

/** Primera línea del caption, sin hashtags, para usarla como título accesible. */
function captionTitle(caption: string) {
    const line = caption.split("\n").find((l) => l.trim() && !l.trim().startsWith("#")) ?? "Reel de ATM";
    return line.length > 90 ? `${line.slice(0, 87).trimEnd()}…` : line;
}

const ReelCard = ({ reel }: { reel: InstagramReel }) => {
    const [playing, setPlaying] = useState(false);
    const title = captionTitle(reel.caption);
    const canPlayInline = Boolean(reel.videoUrl);
    const subtitles = REEL_SUBTITLES[reel.id];
    // Texto completo del reel (sin la línea de hashtags), para quien no puede oírlo.
    const description = reel.caption
        .split("\n")
        .filter((l) => !/^(\s*#\S+\s*)+$/.test(l))
        .join("\n")
        .trim();

    return (
        <li className="snap-start shrink-0 w-[68vw] sm:w-[260px] lg:w-[270px]">
            <div className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 bg-atm-graphite">
                {playing && reel.videoUrl ? (
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        // pointer-events inline: Lenis desactiva eventos en elementos embebidos.
                        style={{ pointerEvents: "auto" }}
                        src={reel.videoUrl}
                        poster={reel.thumbnailUrl ?? undefined}
                        controls
                        autoPlay
                        playsInline
                        preload="none"
                        aria-label={title}
                    >
                        {subtitles && <track kind="captions" src={subtitles} srcLang="es" label="Español" default />}
                    </video>
                ) : (
                    <>
                        {reel.thumbnailUrl && (
                            // <img> nativo a propósito: las URLs del CDN de Instagram vienen firmadas y
                            // caducan, así que no conviene que el optimizador de Next las cachee.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={reel.thumbnailUrl}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-atm-onyx via-atm-onyx/20 to-transparent" />

                        {canPlayInline ? (
                            <button
                                type="button"
                                onClick={() => setPlaying(true)}
                                className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atm-neon-ice rounded-3xl"
                                aria-label={`Reproducir: ${title}`}
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110">
                                    <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" aria-hidden />
                                </span>
                            </button>
                        ) : (
                            <a
                                href={reel.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atm-neon-ice rounded-3xl"
                                aria-label={`Ver en Instagram: ${title}`}
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
                                    <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" aria-hidden />
                                </span>
                            </a>
                        )}

                        <p className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-sm font-light leading-snug text-white line-clamp-3">
                            {title}
                        </p>
                    </>
                )}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                    href={reel.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-6 items-center gap-1.5 text-xs font-medium text-atm-rosy-granite hover:text-atm-neon-ice transition-colors"
                >
                    Ver en Instagram <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
                {subtitles && (
                    <span className="inline-flex items-center gap-1 rounded border border-white/25 px-1.5 text-[0.6875rem] font-bold uppercase tracking-wide text-atm-alabaster">
                        <Captions className="h-3.5 w-3.5" aria-hidden />
                        Con subtítulos
                    </span>
                )}
            </div>
            {description && (
                <details className="group/desc mt-2 text-atm-alabaster">
                    <summary className="inline-flex min-h-6 cursor-pointer list-none items-center gap-1 text-xs font-medium text-[#6AA5F5] hover:text-atm-neon-ice [&::-webkit-details-marker]:hidden">
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open/desc:rotate-180" aria-hidden />
                        Leer el texto del reel
                    </summary>
                    <p className="mt-2 max-h-48 overflow-y-auto whitespace-pre-line rounded-xl bg-white/5 p-3 text-xs leading-5 text-atm-alabaster">
                        {description}
                    </p>
                </details>
            )}
        </li>
    );
};

/** Carrusel horizontal con scroll-snap: deslizable en móvil, con flechas en escritorio. */
export const ReelsCarousel = ({ reels }: { reels: readonly InstagramReel[] }) => {
    const trackRef = useRef<HTMLUListElement>(null);

    const scrollBy = (dir: 1 | -1) => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
    };

    const arrow =
        "hidden md:flex absolute top-[40%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white text-atm-onyx shadow-lg transition hover:bg-atm-alabaster focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atm-neon-ice";

    return (
        <div className="relative">
            <button type="button" onClick={() => scrollBy(-1)} className={`${arrow} -left-5`} aria-label="Reels anteriores">
                <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            {/*
              * Scroll vertical en móvil: la hoja de estilos de Lenis pone
              * `overscroll-behavior: contain` (en ambos ejes) a todo elemento con
              * `data-lenis-prevent-horizontal`. Como `overflow-x: auto` obliga a que
              * el eje Y también sea un contenedor de scroll, Chrome en Android cortaba
              * ahí la cadena y el gesto vertical sobre los reels no movía la página
              * ("se queda pegado"). Se anula solo en el eje Y (estilo inline para
              * ganarle a la regla de Lenis) y se apaga el scroll vertical propio de
              * la pista: el deslizamiento vertical pasa a la página y el horizontal
              * sigue contenido en el carrusel (sin activar el "atrás" del navegador).
              */}
            <ul
                ref={trackRef}
                data-lenis-prevent-horizontal
                style={{ overscrollBehaviorX: "contain", overscrollBehaviorY: "auto", touchAction: "pan-x pan-y pinch-zoom" }}
                className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {reels.map((reel) => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
            </ul>
            <button type="button" onClick={() => scrollBy(1)} className={`${arrow} -right-5`} aria-label="Más reels">
                <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
        </div>
    );
};
