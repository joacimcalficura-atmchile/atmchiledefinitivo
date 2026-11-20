"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Pause, Play, SkipBack, SkipForward, Square, Volume2 } from "lucide-react";
import {
    READER_RATES,
    getReaderState,
    getServerReaderState,
    pauseReading,
    resumeReading,
    setReaderRate,
    skipReading,
    startReading,
    stopReading,
    subscribeReader,
    toggleReading,
} from "@/lib/page-reader";

export function useReader() {
    return useSyncExternalStore(subscribeReader, getReaderState, getServerReaderState);
}

/**
 * Bloque «Escuchar esta página» dentro del panel de accesibilidad.
 * `onStart` cierra el panel para que la lectura empiece por el contenido.
 */
export function ReaderControls({ onStart }: { onStart: () => void }) {
    const reader = useReader();

    if (!reader.supported) {
        return (
            <div className="rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-[#f2f7ff] p-4">
                <p className="text-sm font-bold text-[#0F1215]">Escuchar esta página</p>
                <p className="mt-1 text-[0.8125rem] leading-5 text-slate-700">
                    Este navegador no permite la lectura en voz alta. Prueba con Chrome, Edge, Safari o Firefox actualizados.
                </p>
            </div>
        );
    }

    const active = reader.status !== "idle";

    return (
        <div className="rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-[#f2f7ff] p-4">
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#176BDE] text-white">
                    <Volume2 size={20} aria-hidden="true" />
                </span>
                <div>
                    <p className="text-sm font-bold text-[#0F1215]">Escuchar esta página</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-5 text-slate-700">
                        Lee en voz alta los títulos, textos y descripciones de imágenes, en orden. Si marcas un texto, lee
                        solo ese.
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {active ? (
                    <>
                        <button
                            type="button"
                            onClick={reader.status === "playing" ? pauseReading : resumeReading}
                            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#176BDE] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0E4FA5]"
                        >
                            {reader.status === "playing" ? (
                                <Pause size={16} aria-hidden="true" />
                            ) : (
                                <Play size={16} aria-hidden="true" />
                            )}
                            {reader.status === "playing" ? "Pausar" : "Seguir"}
                        </button>
                        <button
                            type="button"
                            onClick={stopReading}
                            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#0F1215] bg-white px-4 text-sm font-bold text-[#0F1215] transition-colors hover:bg-slate-100"
                        >
                            <Square size={14} aria-hidden="true" />
                            Detener
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            if (startReading()) onStart();
                        }}
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#176BDE] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0E4FA5]"
                    >
                        <Play size={16} aria-hidden="true" />
                        Escuchar esta página
                    </button>
                )}
            </div>

            <fieldset className="mt-4">
                <legend className="text-[0.8125rem] font-bold text-[#0F1215]">Velocidad de la voz</legend>
                <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-white p-1 ring-1 ring-[#b8ccf0]">
                    {READER_RATES.map((r) => {
                        const checked = reader.rate === r.value;
                        return (
                            <label
                                key={r.value}
                                className={`flex min-h-10 cursor-pointer items-center justify-center rounded-lg text-[0.8125rem] font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#176BDE] ${
                                    checked ? "bg-[#0F1215] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="a11y-reader-rate"
                                    value={r.value}
                                    checked={checked}
                                    onChange={() => setReaderRate(r.value)}
                                    className="sr-only"
                                />
                                {r.label}
                            </label>
                        );
                    })}
                </div>
            </fieldset>
            <p className="mt-3 text-xs leading-5 text-slate-600">
                Usa la voz de tu dispositivo: nada sale de tu navegador. Atajo: Alt + L empieza o pausa. Si ya usas un
                lector de pantalla (VoiceOver, TalkBack o NVDA), no necesitas activarlo.
            </p>
        </div>
    );
}

const barButton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15";

/**
 * Barra flotante mientras se lee: permite pausar, saltar y detener sin volver
 * a abrir el panel. También escucha Alt + L y detiene la lectura al cambiar de
 * página.
 */
export function ReaderBar() {
    const reader = useReader();
    const pathname = usePathname();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyL") {
                e.preventDefault();
                toggleReading();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => stopReading, [pathname]);

    useEffect(() => {
        const stop = () => stopReading();
        window.addEventListener("pagehide", stop);
        return () => window.removeEventListener("pagehide", stop);
    }, []);

    if (reader.status === "idle" || typeof document === "undefined") return null;

    const progress = reader.source === "selection" ? "Texto marcado" : `Parte ${reader.index + 1} de ${reader.total}`;

    return createPortal(
        <div
            role="region"
            aria-label="Lectura en voz alta"
            data-reader-skip
            className="fixed inset-x-3 bottom-3 z-[10000] mx-auto flex max-w-md items-center gap-1 rounded-full border border-[#16F3E8]/40 bg-[#0F1215] py-1.5 pl-4 pr-1.5 text-white shadow-[0_18px_50px_rgba(15,18,21,0.5)] sm:bottom-6"
        >
            <Volume2 size={18} className="shrink-0 text-[#16F3E8]" aria-hidden="true" />
            <p className="sr-only" role="status">
                {reader.status === "paused" ? "Lectura en pausa" : "Leyendo en voz alta"}
            </p>
            <p className="ml-2 mr-auto min-w-0 truncate text-sm font-bold">
                {reader.status === "paused" ? "En pausa · " : ""}
                <span className="font-normal text-slate-300">{progress}</span>
            </p>
            <button type="button" onClick={() => skipReading(-1)} className={barButton} aria-label="Parte anterior">
                <SkipBack size={18} aria-hidden="true" />
            </button>
            <button
                type="button"
                onClick={reader.status === "playing" ? pauseReading : resumeReading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#176BDE] text-white transition-colors hover:bg-[#1A78F5]"
                aria-label={reader.status === "playing" ? "Pausar lectura" : "Seguir leyendo"}
            >
                {reader.status === "playing" ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => skipReading(1)} className={barButton} aria-label="Parte siguiente">
                <SkipForward size={18} aria-hidden="true" />
            </button>
            <button type="button" onClick={stopReading} className={barButton} aria-label="Detener lectura">
                <Square size={16} aria-hidden="true" />
            </button>
        </div>,
        document.body
    );
}
