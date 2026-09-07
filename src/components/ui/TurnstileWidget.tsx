"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile en modo invisible/managed.
 *
 * Es la barrera contra navegadores headless, que es exactamente lo que llenó
 * el formulario de /contacto con datos aleatorios. A diferencia de un CAPTCHA
 * clásico, el usuario legítimo no ve ni resuelve nada.
 *
 * Si `NEXT_PUBLIC_TURNSTILE_SITE_KEY` no está definida el componente no
 * renderiza nada y el formulario sigue funcionando con las heurísticas de
 * `@/lib/anti-spam`. Así el sitio nunca queda bloqueado por un setup a medias.
 */

declare global {
    interface Window {
        turnstile?: {
            render: (el: HTMLElement, opts: Record<string, unknown>) => string;
            reset: (id?: string) => void;
            remove: (id?: string) => void;
        };
        onTurnstileLoad?: () => void;
    }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";

interface TurnstileWidgetProps {
    /** Recibe el token a enviar al backend, o `null` si expiró o falló. */
    onToken: (token: string | null) => void;
    /** Cambiar este valor fuerza un nuevo desafío (tras un envío o un error). */
    resetKey?: number;
}

export function TurnstileWidget({ onToken, resetKey = 0 }: TurnstileWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    // Evita re-renderizar el widget si el padre pasa una función nueva en cada
    // render. Se actualiza en un effect, nunca durante el render.
    const onTokenRef = useRef(onToken);
    useEffect(() => {
        onTokenRef.current = onToken;
    });

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    useEffect(() => {
        if (!siteKey || !containerRef.current) return;

        const renderWidget = () => {
            if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                callback: (token: string) => onTokenRef.current(token),
                "error-callback": () => onTokenRef.current(null),
                "expired-callback": () => onTokenRef.current(null),
                theme: "light",
                appearance: "interaction-only", // solo se muestra si sospecha
            });
        };

        if (window.turnstile) {
            renderWidget();
        } else if (!document.getElementById(SCRIPT_ID)) {
            window.onTurnstileLoad = renderWidget;
            const script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src = SCRIPT_SRC;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } else {
            // El script ya está cargando por otro montaje del widget.
            window.onTurnstileLoad = renderWidget;
        }

        const id = widgetIdRef.current;
        return () => {
            if (id && window.turnstile) window.turnstile.remove(id);
            widgetIdRef.current = null;
        };
    }, [siteKey]);

    // Reinicia el desafío cuando el formulario se reutiliza.
    useEffect(() => {
        if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
            onTokenRef.current(null);
        }
    }, [resetKey]);

    if (!siteKey) return null;

    return <div ref={containerRef} className="flex justify-center empty:hidden" />;
}
