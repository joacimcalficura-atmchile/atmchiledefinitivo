"use client";

import type { ReactNode } from "react";
import { trackConversion } from "@/lib/analytics";

/**
 * Enlace a WhatsApp que registra el clic (con consentimiento) para el CRM.
 * `boton` identifica dónde está el enlace, p. ej. «leasing-hero».
 */
export function WhatsAppLink({ href, boton, className, children }: {
    href: string;
    boton: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            onClick={() => trackConversion({ name: "whatsapp_open", props: { contact: boton } })}
        >
            {children}
        </a>
    );
}
