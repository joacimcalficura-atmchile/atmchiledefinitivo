"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "@/lib/consent";
import { useDialogA11y } from "@/hooks/useDialogA11y";

/**
 * Aviso de ingreso: aceptación de Términos y Política de Privacidad y elección
 * de cookies (Ley 19.628 / Ley 21.719). Cualquier opción registra la
 * aceptación de los documentos (clickwrap); «Aceptar» y «Rechazar» tienen el
 * mismo peso visual. Nada no esencial carga antes de elegir.
 *
 * En /terminos y /privacidad se muestra como barra inferior que no bloquea,
 * para poder leer los documentos antes de decidir.
 */
const LEGAL_PATHS = ["/terminos", "/privacidad"];

const link = "font-semibold text-[#176BDE] underline underline-offset-2 hover:text-[#0E4FA5]";
const btn =
    "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176BDE]";
const btnDark = `${btn} bg-[#0F1215] text-white hover:bg-[#2A2D33]`;
const btnBlue = `${btn} bg-[#176BDE] text-white hover:bg-[#0E4FA5]`;
const btnOutline = `${btn} border border-[#0F1215] text-[#0F1215] hover:bg-slate-100`;

/** Textos oficiales del aviso de ingreso (entregados por ATM). */
const CATEGORIES = [
    { title: "Esenciales", description: "Necesarias para que el sitio funcione." },
    { title: "Analíticas", description: "Miden el tráfico web de forma anónima." },
    { title: "Marketing", description: "Personalizan publicidad B2B." },
] as const;

export function ConsentManager() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Leer localStorage solo es posible en el cliente, después de montar.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!readConsent()) setOpen(true);

        const reopen = () => {
            const current = readConsent();
            setAnalytics(current?.analytics ?? false);
            setMarketing(current?.marketing ?? false);
            setCustomize(true);
            setOpen(true);
        };
        window.addEventListener(CONSENT_OPEN_EVENT, reopen);
        return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    }, []);

    const isLegalPage = LEGAL_PATHS.some((p) => pathname?.startsWith(p));
    const blocking = open && (!isLegalPage || customize);

    // Diálogo modal: foco dentro, resto de la página inerte y scroll bloqueado.
    // Sin Escape: hay que elegir una opción para continuar.
    useDialogA11y(dialogRef, { open: blocking });

    const decide = useCallback((choice: { analytics: boolean; marketing: boolean }) => {
        saveConsent(choice);
        setOpen(false);
        setCustomize(false);
    }, []);

    if (!open) return null;

    const acceptance = (
        <>
            Al continuar, aceptas nuestros <Link href="/terminos" className={link}>Términos</Link> y{" "}
            <Link href="/privacidad" className={link}>Política de Privacidad</Link>.
        </>
    );

    // Barra discreta en las páginas legales.
    if (!blocking) {
        return (
            <div
                role="region"
                aria-label="Aviso de privacidad"
                className="fixed inset-x-0 bottom-0 z-[100000] border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_rgba(15,18,21,0.08)] backdrop-blur"
            >
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:gap-6">
                    <p className="text-[0.8125rem] leading-5 text-slate-700 md:flex-1">
                        {acceptance} Utilizamos cookies para mejorar tu experiencia.
                    </p>
                    <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
                        <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnBlue}>
                            Aceptar todas
                        </button>
                        <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={btnDark}>
                            Rechazar opcionales
                        </button>
                        <button
                            type="button"
                            onClick={() => setCustomize(true)}
                            className="col-span-2 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-[#176BDE] md:col-span-1 md:px-2"
                        >
                            Configurar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100000] flex items-end justify-center bg-[#0F1215]/60 backdrop-blur-[2px] sm:items-center sm:p-6">
            <div
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby="consent-title"
                aria-describedby="consent-desc"
                className="w-full max-w-[560px] overflow-hidden rounded-t-2xl outline-none bg-white shadow-[0_24px_80px_rgba(15,18,21,0.35)] sm:rounded-2xl"
            >
                <div className="flex items-center justify-between bg-[#0F1215] px-6 py-4">
                    <Image
                        src="/images/brand/logo-slogan-blanco.png"
                        alt={`${SITE.name}, A tu medida`}
                        width={1036}
                        height={620}
                        className="h-10 w-auto"
                        priority
                    />
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Aviso de privacidad
                    </span>
                </div>

                <div className="max-h-[72dvh] overflow-y-auto overscroll-contain px-6 pb-6 pt-5">
                    <h2 id="consent-title" className="text-lg font-bold tracking-tight text-[#0F1215]">
                        Privacidad y Configuración de Cookies
                    </h2>
                    <p id="consent-desc" className="mt-2 text-sm leading-6 text-slate-600">
                        {acceptance} Utilizamos cookies para mejorar tu experiencia:
                    </p>
                    {!customize && (
                        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-600">
                            {CATEGORIES.map((c) => (
                                <li key={c.title} className="flex gap-2">
                                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176BDE]" />
                                    <span>
                                        <strong className="font-semibold text-[#0F1215]">{c.title}:</strong> {c.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {customize && (
                        <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200">
                            <PreferenceRow
                                title={CATEGORIES[0].title}
                                description={CATEGORIES[0].description}
                                checked
                                disabled
                            />
                            <PreferenceRow
                                title={CATEGORIES[1].title}
                                description={CATEGORIES[1].description}
                                checked={analytics}
                                onChange={setAnalytics}
                            />
                            <PreferenceRow
                                title={CATEGORIES[2].title}
                                description={CATEGORIES[2].description}
                                checked={marketing}
                                onChange={setMarketing}
                            />
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnBlue}>
                            Aceptar todas
                        </button>
                        <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={btnDark}>
                            Rechazar opcionales
                        </button>
                        {customize ? (
                            <button type="button" onClick={() => decide({ analytics, marketing })} className={btnOutline}>
                                Guardar selección
                            </button>
                        ) : (
                            <button type="button" onClick={() => setCustomize(true)} className={btnOutline}>
                                Configurar
                            </button>
                        )}
                    </div>

                    <p className="mt-4 text-center text-xs text-slate-500">
                        Responsable: {SITE.legalName} · RUT {SITE.rut}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PreferenceRow({
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
    onChange?: (value: boolean) => void;
}) {
    return (
        <label className={`flex items-center justify-between gap-4 px-4 py-3 ${disabled ? "" : "cursor-pointer"}`}>
            <span>
                <span className="block text-sm font-semibold text-[#0F1215]">
                    {title}
                    {disabled && <span className="ml-2 text-xs font-medium text-slate-500">Siempre activas</span>}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-600">{description}</span>
            </span>
            <span className="relative inline-flex shrink-0">
                <input
                    type="checkbox"
                    role="switch"
                    aria-label={title}
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="peer sr-only"
                />
                <span
                    aria-hidden="true"
                    className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-[#176BDE] peer-disabled:opacity-60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#176BDE]"
                />
                <span
                    aria-hidden="true"
                    className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
                />
            </span>
        </label>
    );
}
