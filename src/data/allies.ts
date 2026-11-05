/**
 * Aliados estratégicos: empresas con las que ATM integra o colabora
 * directamente (pasarelas de pago, marketplaces, clientes de alianza).
 *
 * Distinto de `PartnersEcosystem`, que lista el stack tecnológico (AWS,
 * Docker, LangChain, etc.) y no relaciones comerciales.
 *
 * Módulo de datos puro: sin `"use client"` ni JSX, consumible desde
 * componentes de servidor o cliente.
 */

export interface Ally {
    readonly id: string;
    readonly name: string;
    readonly logo: string;
    /** `"contain"` para wordmarks con aire alrededor; `"cover"` recorta al cuadro. */
    readonly fit: "contain" | "cover";
    readonly href?: string;
}

export const STRATEGIC_ALLIES: readonly Ally[] = [
    { id: "transbank", name: "Transbank", logo: "/logos/transbank.png", fit: "contain", href: "https://www.transbank.cl" },
    { id: "flow", name: "Flow", logo: "/logos/flow.svg", fit: "contain", href: "https://www.flow.cl" },
    { id: "mercadolibre", name: "Mercado Libre", logo: "/logos/mercadolibre.svg", fit: "contain", href: "https://www.mercadolibre.cl" },
    { id: "facturax", name: "FacturaX", logo: "/logos/facturax.svg", fit: "contain", href: "https://www.factura-x.com" },
    // Sin `href`: eficazconstruye.cl dejó de resolver (DNS caído). El logo se
    // mantiene, pero no enlazamos a un sitio roto. Restaurar cuando vuelva.
    { id: "eficaz-ingenieria", name: "Eficaz Ingeniería", logo: "/logos/eficaz-ingenieria.png", fit: "contain" },
    { id: "tupana", name: "Tupana", logo: "/logos/tupana.svg", fit: "contain", href: "https://www.tupana.ai" },
] as const;
