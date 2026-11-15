"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "@/lib/consent";

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

    useEffect(() => {
        if (!blocking) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();
        return () => {
            document.body.style.overflow = previous;
        };
    }, [blocking]);

    const decide = useCallback((choice: { analytics: boolean; marketing: boolean }) => {
        saveConsent(choice);
        setOpen(false);
        setCustomize(false);
    }, []);

    if (!open) return null;

    const acceptance = (
        <>
            Al seleccionar una opción declaras haber leído y aceptado los{" "}
            <Link href="/terminos" className={link}>Términos y Condiciones</Link> y la{" "}
            <Link href="/privacidad" className={link}>Política de Privacidad y Seguridad</Link>.
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
                    <p className="text-[13px] leading-5 text-slate-700 md:flex-1">
                        Usamos cookies esenciales y, con tu autorización, de analítica y marketing. {acceptance}
                    </p>
                    <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
                        <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={btnDark}>
                            Rechazar opcionales
                        </button>
                        <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnBlue}>
                            Aceptar todas
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
                className="w-full max-w-[540px] overflow-hidden rounded-t-2xl outline-none bg-white shadow-[0_24px_80px_rgba(15,18,21,0.35)] sm:rounded-2xl"
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
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Aviso de privacidad
                    </span>
                </div>

                <div className="max-h-[72vh] overflow-y-auto px-6 pb-6 pt-5">
                    <h2 id="consent-title" className="text-lg font-bold tracking-tight text-[#0F1215]">
                        {customize ? "Preferencias de cookies" : "Antes de continuar"}
                    </h2>
                    <p id="consent-desc" className="mt-2 text-sm leading-6 text-slate-600">
                        Este sitio utiliza cookies esenciales para su funcionamiento y, solo con tu autorización, cookies
                        de analítica y marketing. Tratamos tus datos conforme a la Ley N° 19.628 y la Ley N° 21.719.{" "}
                        {acceptance}
                    </p>

                    {customize && (
                        <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200">
                            <PreferenceRow
                                title="Esenciales"
                                description="Funcionamiento del sitio, registro de tu elección y protección de formularios."
                                checked
                                disabled
                            />
                            <PreferenceRow
                                title="Analítica"
                                description="Medición de visitas y de contactos generados."
                                checked={analytics}
                                onChange={setAnalytics}
                            />
                            <PreferenceRow
                                title="Marketing"
                                description="Medición de campañas publicitarias en redes sociales."
                                checked={marketing}
                                onChange={setMarketing}
                            />
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => decide({ analytics: false, marketing: false })}
                            className={btnDark}
                        >
                            Rechazar opcionales
                        </button>
                        <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnBlue}>
                            Aceptar todas
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                        {customize ? (
                            <button
                                type="button"
                                onClick={() => decide({ analytics, marketing })}
                                className="font-semibold text-[#0F1215] underline underline-offset-2 hover:text-[#176BDE]"
                            >
                                Guardar mi selección
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setCustomize(true)}
                                className="font-semibold text-[#0F1215] underline underline-offset-2 hover:text-[#176BDE]"
                            >
                                Configurar preferencias
                            </button>
                        )}
                        <span className="text-right text-xs text-slate-500">Responsable: {SITE.legalName}</span>
                    </div>
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
