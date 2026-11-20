"use client";

import { openA11yPanel } from "@/lib/a11y-prefs";

/**
 * Enlaces de salto (WCAG 2.4.1): lo primero que encuentra quien navega con
 * teclado o lector de pantalla. Invisibles hasta recibir el foco.
 */
export function SkipLinks() {
    const skipTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start" });
    };

    return (
        <nav aria-label="Accesos rápidos" className="skip-links">
            <a href="#contenido" onClick={skipTo("contenido")}>
                Saltar al contenido principal
            </a>
            <a href="#navegacion-principal" onClick={skipTo("navegacion-principal")}>
                Ir al menú
            </a>
            <button type="button" onClick={openA11yPanel}>
                Preferencias de accesibilidad (Alt + A)
            </button>
        </nav>
    );
}
