import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ciberseguridad 360 | NCh-ISO 27001 & Ley Marco Chile | ATM Chile",
    description:
        "Centro de Mando de Ciberseguridad de ATM Chile. Cumplimiento de la Ley N°21.663 (Ley Marco de Ciberseguridad), certificación NCh-ISO 27001, arquitectura Zero Trust, OWASP Top 10 y pipeline DevSecOps/SAST/DAST para empresas chilenas.",
    keywords: [
        "ciberseguridad chile",
        "ISO 27001 chile",
        "NCh-ISO 27001",
        "ley marco ciberseguridad",
        "ley 21663",
        "zero trust",
        "OWASP Top 10",
        "DevSecOps",
        "pentesting chile",
        "BCP DRP chile",
        "ANCI chile",
        "CSIRT gobierno chile",
        "encriptación AES-256",
        "TLS 1.3",
        "seguridad informática empresas",
        "ATM Chile seguridad",
    ],
    authors: [{ name: "ATM Chile — Equipo de Arquitectura de Seguridad" }],
    creator: "ATM Chile",
    publisher: "ATM Chile",
    alternates: {
        canonical: "https://www.atmchile.com/seguridad",
    },
    openGraph: {
        type: "website",
        locale: "es_CL",
        url: "https://www.atmchile.com/seguridad",
        siteName: "ATM Chile",
        title: "Ciberseguridad 360 — ATM Chile | NCh-ISO 27001 & Ley Marco N°21.663",
        description:
            "Plataforma de seguridad empresarial alineada a la normativa chilena. Zero Trust, encriptación AES-256, OWASP Top 10, DevSecOps y cumplimiento de la Ley N°21.663 de Ciberseguridad.",
        images: [
            {
                url: "https://www.atmchile.com/images/executive-security.png",
                width: 1200,
                height: 630,
                alt: "ATM Chile — Centro de Mando Ciberseguridad",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ciberseguridad 360 — ATM Chile",
        description:
            "Seguridad total bajo estándares NCh-ISO 27001, Ley Marco N°21.663 y OWASP Top 10. Arquitectura Zero Trust y DevSecOps para empresas chilenas.",
        images: ["https://www.atmchile.com/images/executive-security.png"],
        creator: "@atmchile",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function SeguridadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* JSON-LD Structured Data — Security Service */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Ciberseguridad 360 — ATM Chile",
                        description:
                            "Servicio integral de ciberseguridad empresarial: NCh-ISO 27001, Ley Marco N°21.663, Zero Trust, OWASP Top 10, DevSecOps y BCP/DRP para empresas chilenas.",
                        provider: {
                            "@type": "Organization",
                            name: "ATM Chile",
                            url: "https://www.atmchile.com",
                            logo: "https://www.atmchile.com/favicon.png",
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: "CL",
                                addressLocality: "Santiago",
                            },
                        },
                        areaServed: {
                            "@type": "Country",
                            name: "Chile",
                        },
                        serviceType: "Ciberseguridad Empresarial",
                        offers: {
                            "@type": "Offer",
                            availability: "https://schema.org/InStock",
                            url: "https://www.atmchile.com/contacto",
                        },
                        hasOfferCatalog: {
                            "@type": "OfferCatalog",
                            name: "Pilares de Seguridad",
                            itemListElement: [
                                { "@type": "Offer", name: "Certificación NCh-ISO 27001" },
                                { "@type": "Offer", name: "Cumplimiento Ley Marco N°21.663" },
                                { "@type": "Offer", name: "Arquitectura Zero Trust & AES-256" },
                                { "@type": "Offer", name: "Sanitización OWASP Top 10" },
                                { "@type": "Offer", name: "Continuidad de Negocio BCP/DRP" },
                                { "@type": "Offer", name: "Pipeline DevSecOps SAST/DAST" },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    );
}
