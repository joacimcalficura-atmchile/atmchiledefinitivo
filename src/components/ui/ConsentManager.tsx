"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AtmSeal } from "@/components/ui/AtmSeal";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "@/lib/consent";

/**
 * Aviso de entrada: aceptación de Términos y Política de Privacidad + elección
 * de cookies (Ley 19.628 / Ley 21.719). Nada no esencial carga antes de que el
 * visitante elija: ver `ConsentedAnalytics` y `hasConsent()`.
 *
 * En /terminos y /privacidad se muestra como barra inferior sin bloquear, para
 * que se puedan leer antes de aceptar.
 */
const LEGAL_PATHS = ["/terminos", "/privacidad"];

export function ConsentManager() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const existing = readConsent();
        // Leer localStorage solo es posible en el cliente, después de montar.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!existing) setOpen(true);

        const reopen = () => {
            const current = readConsent();
            setAnalytics(current?.analytics ?? false);
            setMarketing(current?.marketing ?? false);
            setTermsChecked(Boolean(current));
            setCustomize(true);
            setOpen(true);
        };
        window.addEventListener(CONSENT_OPEN_EVENT, reopen);
        return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    }, []);

    const isLegalPage = LEGAL_PATHS.some((p) => pathname?.startsWith(p));
    const blocking = open && !isLegalPage;

    useEffect(() => {
        if (!blocking) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        checkboxRef.current?.focus();
        return () => {
            document.body.style.overflow = previous;
        };
    }, [blocking]);

    const decide = useCallback(
        (choice: { analytics: boolean; marketing: boolean }) => {
            if (!termsChecked) {
                checkboxRef.current?.focus();
                return;
            }
            saveConsent(choice);
            setOpen(false);
            setCustomize(false);
        },
        [termsChecked],
    );

    if (!open) return null;

    const panel = (
        <div
            role="dialog"
            aria-modal={blocking}
            aria-labelledby="consent-title"
            aria-describedby="consent-desc"
            className={`relative w-full overflow-hidden bg-white shadow-2xl ring-1 ring-slate-200 ${
                blocking ? "max-w-lg rounded-3xl" : "max-w-3xl rounded-t-3xl md:rounded-3xl"
            }`}
        >
            {/* Cabecera de marca */}
            {blocking && (
            <div className="relative isolate flex items-center gap-4 overflow-hidden bg-[#0F1215] px-6 py-5">
                <BrandPattern tone="onDark" opacity={0.1} size={260} className="-z-10" />
                <AtmSeal className="h-12 w-12 shrink-0" />
                <div className="min-w-0">
                    <Image
                        src="/images/brand/logo-slogan-blanco.png"
                        alt="ATM Chile, A tu medida"
                        width={1036}
                        height={620}
                        className="h-auto w-20"
                    />
                </div>
                <span className="ml-auto rounded-full border border-[#16F3E8]/30 bg-[#16F3E8]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#16F3E8]">
                    Sitio seguro
                </span>
            </div>
            )}

            <div className={`overflow-y-auto px-6 ${blocking ? "max-h-[70vh] py-6" : "max-h-[50vh] py-4"}`}>
                <h2 id="consent-title" className="flex items-center gap-2 text-xl font-black tracking-tight text-[#0F1215]">
                    {!blocking && <AtmSeal className="h-6 w-6 shrink-0" />}
                    Tu privacidad y seguridad
                </h2>
                <p id="consent-desc" className={blocking ? "mt-2 text-sm leading-relaxed text-slate-600" : "sr-only"}>
                    Usamos cookies esenciales para que el sitio funcione y, solo si lo autorizas, cookies de
                    analítica y marketing para medir visitas y mejorar nuestras campañas. Tratamos tus datos
                    conforme a la Ley 19.628 y la Ley 21.719 de protección de datos personales. Puedes cambiar
                    tu elección cuando quieras desde «Preferencias de cookies» en el pie de página.
                </p>

                <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 ${blocking ? "mt-5 p-4" : "mt-3 p-3"}`}>
                    <input
                        ref={checkboxRef}
                        type="checkbox"
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#176BDE]"
                    />
                    <span className="text-sm leading-relaxed text-slate-700">
                        He leído y acepto los{" "}
                        <Link href="/terminos" className="font-bold text-[#176BDE] underline underline-offset-2">
                            Términos y Condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link href="/privacidad" className="font-bold text-[#176BDE] underline underline-offset-2">
                            Política de Privacidad y Seguridad
                        </Link>
                        .
                    </span>
                </label>

                {customize && (
                    <fieldset className="mt-5 space-y-3">
                        <legend className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                            Tipos de cookies
                        </legend>
                        <ConsentToggle
                            title="Esenciales"
                            description="Necesarias para navegar, recordar esta elección y proteger los formularios. Siempre activas."
                            checked
                            disabled
                        />
                        <ConsentToggle
                            title="Analítica"
                            description="Medición anónima de visitas y de contactos generados (Vercel Analytics)."
                            checked={analytics}
                            onChange={setAnalytics}
                        />
                        <ConsentToggle
                            title="Marketing"
                            description="Píxeles publicitarios (por ejemplo, Meta) para medir campañas y mostrar anuncios relevantes."
                            checked={marketing}
                            onChange={setMarketing}
                        />
                    </fieldset>
                )}

                {!termsChecked && (
                    <p className="mt-3 text-xs font-medium text-slate-500">
                        Para continuar, marca la casilla de aceptación.
                    </p>
                )}

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    {customize ? (
                        <button
                            type="button"
                            onClick={() => decide({ analytics, marketing })}
                            disabled={!termsChecked}
                            className="flex-1 rounded-xl bg-[#176BDE] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0E4FA5] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Guardar mi elección
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => decide({ analytics: true, marketing: true })}
                            disabled={!termsChecked}
                            className="flex-1 rounded-xl bg-[#176BDE] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0E4FA5] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Aceptar todas
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => decide({ analytics: false, marketing: false })}
                        disabled={!termsChecked}
                        className="flex-1 rounded-xl border-2 border-[#0F1215] px-5 py-3 text-sm font-bold text-[#0F1215] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Solo esenciales
                    </button>
                </div>
                {!customize && (
                    <button
                        type="button"
                        onClick={() => setCustomize(true)}
                        className="mt-3 w-full text-center text-sm font-bold text-[#176BDE] underline underline-offset-2"
                    >
                        Configurar cookies
                    </button>
                )}
            </div>
        </div>
    );

    if (!blocking) {
        return <div className="fixed inset-x-0 bottom-0 z-[100000] flex justify-center md:bottom-4 md:px-4">{panel}</div>;
    }

    return (
        <div className="fixed inset-0 z-[100000] flex items-end justify-center bg-[#0F1215]/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
            {panel}
        </div>
    );
}

function ConsentToggle({
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
        <label
            className={`flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 ${
                disabled ? "bg-slate-50" : "cursor-pointer"
            }`}
        >
            <span>
                <span className="block text-sm font-bold text-[#0F1215]">{title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">{description}</span>
            </span>
            <input
                type="checkbox"
                role="switch"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#176BDE]"
            />
        </label>
    );
}
