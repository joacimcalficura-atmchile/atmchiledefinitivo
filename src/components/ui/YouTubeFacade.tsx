"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface YouTubeFacadeProps {
    /** ID del video (no la URL completa). */
    readonly videoId: string;
    /** Se usa como `title` del iframe y en la etiqueta accesible del botón. */
    readonly title: string;
    /** Póster 16:9 autoalojado en `public/`. */
    readonly poster: string;
    readonly posterAlt: string;
    /** `sizes` de next/image según el ancho real del contenedor. */
    readonly sizes?: string;
}

/**
 * Fachada de YouTube: hasta que el usuario pulsa "play" solo se sirve una imagen
 * local. El iframe (≈1 MB de JS de terceros) se monta únicamente al hacer clic,
 * sobre el dominio `youtube-nocookie` para no sembrar cookies de tracking.
 *
 * Requiere `frame-src https://www.youtube-nocookie.com` en la CSP (next.config.ts).
 */
export const YouTubeFacade = ({ videoId, title, poster, posterAlt, sizes = "100vw" }: YouTubeFacadeProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
            {isPlaying ? (
                <React.Fragment>
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        /*
                         * `pointer-events` inline a propósito: la hoja de estilos de Lenis
                         * aplica `.lenis.lenis-smooth iframe { pointer-events: none }` para
                         * que el scroll suave no se "coma" dentro de un iframe. Sin este
                         * override el usuario no puede pausar ni mover el video.
                         */
                        style={{ pointerEvents: "auto" }}
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                    {/* Salida garantizada: desmontar el iframe detiene la reproducción. */}
                    <button
                        type="button"
                        onClick={() => setIsPlaying(false)}
                        aria-label="Detener video y volver a la portada"
                        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur-sm transition-colors hover:bg-[#176BDE]"
                    >
                        <X size={16} />
                    </button>
                </React.Fragment>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Reproducir video: ${title}`}
                    className="group/play absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16F3E8] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                    <Image
                        src={poster}
                        alt={posterAlt}
                        fill
                        sizes={sizes}
                        className="object-cover opacity-80 transition-all duration-500 group-hover/play:scale-105 group-hover/play:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#176BDE] shadow-[0_8px_30px_rgba(23,107,222,0.45)] transition-transform duration-300 group-hover/play:scale-110 md:size-20">
                        <Play size={26} className="translate-x-0.5 fill-white text-white" />
                    </span>

                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                        Ver demo real
                    </span>
                </button>
            )}
        </div>
    );
};
