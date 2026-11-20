import { Hand } from "lucide-react";
import { LSCH_VIDEO } from "@/data/accesibilidad-video";

/**
 * Espacio para el video en Lengua de Señas Chilena (LSCh). No se muestra
 * hasta que ATM cargue el video en `src/data/accesibilidad-video.ts`.
 */
export function LschVideo({ className = "" }: { className?: string }) {
    if (!LSCH_VIDEO) return null;
    const { src, poster, captions, summary, duration } = LSCH_VIDEO;

    return (
        <figure
            className={`overflow-hidden rounded-3xl border border-[#b8ccf0] bg-white shadow-[0_18px_50px_rgba(15,18,21,0.12)] ${className}`}
        >
            <div className="flex items-center gap-3 bg-[#0F1215] px-5 py-4 text-white">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#176BDE]/25 text-[#16F3E8]">
                    <Hand size={20} aria-hidden="true" />
                </span>
                <div>
                    <p className="text-sm font-black tracking-tight">ATM en Lengua de Señas Chilena</p>
                    {duration && <p className="text-xs text-slate-300">Video · {duration}</p>}
                </div>
            </div>
            <video
                className="aspect-video w-full bg-[#0F1215]"
                style={{ pointerEvents: "auto" }}
                src={src}
                poster={poster}
                controls
                playsInline
                preload="metadata"
                aria-label="Video en Lengua de Señas Chilena sobre ATM"
            >
                {captions && <track kind="captions" src={captions} srcLang="es" label="Español" />}
            </video>
            <figcaption className="border-t border-[#b8ccf0] bg-[#f2f7ff] px-5 py-4 text-[0.9375rem] leading-7 text-slate-700">
                {summary}
            </figcaption>
        </figure>
    );
}
