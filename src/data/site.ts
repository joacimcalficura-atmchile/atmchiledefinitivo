/**
 * Fuente única de verdad de los datos públicos de ATM.
 *
 * Antes cada sección repetía (y contradecía) estos valores: el footer tenía el
 * LinkedIn corporativo real mientras /insights apuntaba a `https://linkedin.com`.
 * Cualquier dato de contacto o red social que se muestre al cliente sale de aquí.
 */

export const SITE = {
    name: "ATM Chile",
    legalName: "ATM Future Solution SpA",
    url: "https://atmchile.com",
    locale: "es_CL",
    tagline: "A tu medida",
    description:
        "Desarrollo de software a medida, ciberseguridad avanzada y transformación digital en Chile. Partner tecnológico estratégico 360 para procesos críticos.",
    email: "contacto@atmchile.com",
    region: "Región Metropolitana, Chile",
} as const;

export interface SocialLink {
    /** Clave del ícono; el mapeo a componente vive en la capa de UI. */
    readonly icon: "linkedin" | "instagram" | "mail";
    readonly href: string;
    readonly label: string;
}

/**
 * Solo perfiles que existen de verdad. Un ícono de red social que lleva al
 * home genérico de la plataforma (y no al perfil de ATM) resta credibilidad:
 * si no hay canal, no se renderiza el ícono.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        icon: "linkedin",
        href: "https://www.linkedin.com/company/atm-future-solution-spa/",
        label: "LinkedIn",
    },
    {
        icon: "instagram",
        href: "https://www.instagram.com/atm_chile/",
        label: "Instagram",
    },
    { icon: "mail", href: `mailto:${SITE.email}`, label: "Correo electrónico" },
] as const;
