"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accessibility, RotateCcw, X } from "lucide-react";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import {
    A11Y_EVENT,
    A11Y_OPEN_EVENT,
    DEFAULT_PREFS,
    TEXT_SCALES,
    readPrefs,
    savePrefs,
    type A11yPrefs,
    type TextScale,
} from "@/lib/a11y-prefs";
import { clearContrast, enhanceContrast } from "./ContrastEnhancer";
import { ReaderBar, ReaderControls } from "./PageReader";

type ToggleKey = Exclude<keyof A11yPrefs, "textScale">;

const TOGGLES: { key: ToggleKey; title: string; description: string }[] = [
    {
        key: "contrast",
        title: "Contraste reforzado",
        description: "Lleva todo el texto a contraste AAA (7:1) y quita transparencias.",
    },
    {
        key: "reduceMotion",
        title: "Pausar animaciones",
        description: "Detiene movimientos, transiciones y el desplazamiento suave.",
    },
    {
        key: "readableFont",
        title: "Fuente de alta legibilidad",
        description: "Usa Atkinson Hyperlegible, pensada para baja visión.",
    },
    {
        key: "textSpacing",
        title: "Más espacio en el texto",
        description: "Separa líneas, letras y palabras para leer con menos esfuerzo.",
    },
    {
        key: "underlineLinks",
        title: "Subrayar enlaces",
        description: "Distingue los enlaces sin depender del color.",
    },
    {
        key: "strongFocus",
        title: "Foco reforzado",
        description: "Marca con un borde grueso el elemento activo al usar el teclado.",
    },
];

/**
 * Botón flotante y panel de preferencias de accesibilidad. Todo es propio del
 * sitio (sin scripts de terceros): los cambios se aplican como clases en
 * <html> y se recuerdan en este navegador.
 */
export function AccessibilityPanel() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_PREFS);
    const [systemMotion, setSystemMotion] = useState(false);
    const [announce, setAnnounce] = useState("");
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();
    const descId = useId();

    useEffect(() => {
        // localStorage y matchMedia solo existen en el cliente.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setPrefs(readPrefs());
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncMotion = () => setSystemMotion(mq.matches);
        syncMotion();
        mq.addEventListener("change", syncMotion);
        const onOpen = () => setOpen(true);
        const onChange = (e: Event) => setPrefs((e as CustomEvent<A11yPrefs>).detail);
        // Alt + A abre el panel desde cualquier página (e.code: en Mac Alt+A escribe «å»).
        const onKey = (e: KeyboardEvent) => {
            if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyA") {
                e.preventDefault();
                setOpen(true);
            }
        };
        window.addEventListener(A11Y_OPEN_EVENT, onOpen);
        window.addEventListener(A11Y_EVENT, onChange);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", syncMotion);
            window.removeEventListener(A11Y_OPEN_EVENT, onOpen);
            window.removeEventListener(A11Y_EVENT, onChange);
        };
    }, []);

    // Contraste reforzado: se recalcula al cambiar de página o de contenido.
    useEffect(() => {
        if (!prefs.contrast) {
            clearContrast();
            return;
        }
        let timer = 0;
        const run = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(enhanceContrast, 120);
        };
        run();
        const observer = new MutationObserver(run);
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        window.addEventListener("resize", run);
        // Las secciones que aparecen al hacer scroll cambian de estilo sin mutar el DOM.
        let scrollTimer = 0;
        const onScroll = () => {
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(enhanceContrast, 400);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.clearTimeout(timer);
            window.clearTimeout(scrollTimer);
            observer.disconnect();
            window.removeEventListener("resize", run);
            window.removeEventListener("scroll", onScroll);
        };
    }, [prefs.contrast, prefs.textScale, prefs.readableFont, pathname]);

    const close = useCallback(() => setOpen(false), []);
    useDialogA11y(dialogRef, { open, onClose: close, initialFocus: closeRef });

    const update = (next: A11yPrefs, message: string) => {
        setPrefs(next);
        savePrefs(next);
        setAnnounce(message);
    };

    const changed = (Object.keys(DEFAULT_PREFS) as (keyof A11yPrefs)[]).some((k) => prefs[k] !== DEFAULT_PREFS[k]);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Preferencias de accesibilidad"
                title="Preferencias de accesibilidad"
                className="fixed bottom-[5.25rem] left-[1.25rem] z-[9998] flex h-12 w-12 items-center justify-center rounded-full border border-[#16F3E8]/50 bg-[#0F1215] text-[#16F3E8] shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:bottom-[6.25rem] sm:left-[1.75rem]"
            >
                <Accessibility size={24} aria-hidden="true" />
                {changed && (
                    <span
                        aria-hidden="true"
                        className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[#0F1215] bg-[#16F3E8]"
                    />
                )}
            </button>

            <ReaderBar />

            {mounted &&
                createPortal(
                    <>
                        {open && (
                            <div
                                className="fixed inset-0 z-[100001] flex items-end justify-center bg-[#0F1215]/60 sm:items-center sm:justify-start sm:p-6"
                                onMouseDown={(e) => {
                                    if (e.target === e.currentTarget) close();
                                }}
                            >
                                <div
                                    ref={dialogRef}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby={titleId}
                                    aria-describedby={descId}
                                    tabIndex={-1}
                                    className="a11y-panel flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white text-[#0F1215] shadow-[0_24px_80px_rgba(15,18,21,0.45)] sm:max-h-[calc(100dvh-3rem)] sm:max-w-[26rem] sm:rounded-3xl"
                                >
                                    <div className="flex items-start justify-between gap-4 bg-[#0F1215] px-6 py-5 text-white">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#176BDE]/25 text-[#16F3E8]">
                                                <Accessibility size={24} aria-hidden="true" />
                                            </span>
                                            <div>
                                                <h2 id={titleId} className="text-lg font-black tracking-tight">
                                                    Accesibilidad
                                                </h2>
                                                <p id={descId} className="text-sm text-slate-300">
                                                    Ajusta el sitio a tu forma de navegar.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            ref={closeRef}
                                            type="button"
                                            onClick={close}
                                            aria-label="Cerrar preferencias de accesibilidad"
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                        >
                                            <X size={20} aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="overflow-y-auto overscroll-contain px-6 pb-6 pt-5">
                                        {/* Anuncio para lectores de pantalla de cada cambio aplicado */}
                                        <p className="sr-only" role="status" aria-live="polite">
                                            {announce}
                                        </p>
                                        <ReaderControls onStart={close} />

                                        <fieldset className="mt-6">
                                            <legend className="text-sm font-bold text-[#0F1215]">Tamaño del texto</legend>
                                            <div className="mt-3 grid grid-cols-4 gap-1 rounded-2xl bg-slate-100 p-1">
                                                {TEXT_SCALES.map((s) => {
                                                    const checked = prefs.textScale === s.value;
                                                    return (
                                                        <label
                                                            key={s.value}
                                                            className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-xl text-sm font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#176BDE] ${
                                                                checked
                                                                    ? "bg-[#176BDE] text-white shadow-sm"
                                                                    : "text-slate-700 hover:bg-white"
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="a11y-text-scale"
                                                                value={s.value}
                                                                checked={checked}
                                                                onChange={() =>
                                                                    update(
                                                                        { ...prefs, textScale: s.value as TextScale },
                                                                        `Tamaño del texto: ${s.label}`
                                                                    )
                                                                }
                                                                className="sr-only"
                                                            />
                                                            {s.label}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </fieldset>

                                        <ul className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                                            {TOGGLES.map((t) => (
                                                <li key={t.key}>
                                                    <Switch
                                                        title={t.title}
                                                        description={
                                                            t.key === "reduceMotion" && systemMotion
                                                                ? `${t.description} Tu sistema ya lo pide y lo respetamos.`
                                                                : t.description
                                                        }
                                                        checked={prefs[t.key] || (t.key === "reduceMotion" && systemMotion)}
                                                        disabled={t.key === "reduceMotion" && systemMotion}
                                                        onChange={(value) =>
                                                            update(
                                                                { ...prefs, [t.key]: value },
                                                                `${t.title}: ${value ? "activado" : "desactivado"}`
                                                            )
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => update(DEFAULT_PREFS, "Se restablecieron las preferencias")}
                                                disabled={!changed}
                                                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#0F1215] px-4 text-sm font-bold text-[#0F1215] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-500"
                                            >
                                                <RotateCcw size={16} aria-hidden="true" />
                                                Restablecer
                                            </button>
                                            <Link
                                                href="/accesibilidad"
                                                onClick={close}
                                                className="inline-flex min-h-11 items-center text-sm font-bold text-[#176BDE] underline underline-offset-4 hover:text-[#0E4FA5]"
                                            >
                                                Declaración de accesibilidad
                                            </Link>
                                        </div>
                                        <p className="mt-4 text-xs leading-5 text-slate-600">
                                            Tus preferencias se guardan solo en este navegador. Atajos: Alt + A abre este panel y
                                            Alt + L empieza o pausa la lectura en voz alta.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>,
                    document.body
                )}
        </>
    );
}

function Switch({
    title,
    description,
    checked,
    disabled,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (value: boolean) => void;
}) {
    const id = useId();
    return (
        <label
            htmlFor={id}
            className={`flex min-h-14 items-center justify-between gap-4 px-4 py-3 ${disabled ? "" : "cursor-pointer hover:bg-slate-50"}`}
        >
            <span>
                <span className="block text-sm font-bold text-[#0F1215]">{title}</span>
                <span id={`${id}-d`} className="mt-0.5 block text-[0.8125rem] leading-5 text-slate-600">
                    {description}
                </span>
            </span>
            <span className="relative inline-flex shrink-0">
                <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    aria-describedby={`${id}-d`}
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                    className="peer sr-only"
                />
                <span
                    aria-hidden="true"
                    className="h-7 w-12 rounded-full border-2 border-slate-500 bg-slate-200 transition-colors peer-checked:border-[#176BDE] peer-checked:bg-[#176BDE] peer-disabled:opacity-70 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#176BDE]"
                />
                <span
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow ring-1 ring-slate-400 transition-transform peer-checked:translate-x-5 peer-checked:ring-0"
                />
            </span>
        </label>
    );
}
