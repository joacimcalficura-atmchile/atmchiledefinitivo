import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/providers/Providers";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { SITE, SOCIAL_LINKS } from "@/data/site";
import { solutions } from "@/data/services";

// Tipografía oficial ATM Brandbook: Roboto (ExtraLight/Medium/Black) para textos,
// Roboto Slab (Medium) reservada para el eslogan «A tu medida».
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ATM Chile | Software a tu medida - Consultoría TI Premium",
    template: "%s | ATM Chile"
  },
  description: SITE.description,
  keywords: ["ATM Chile", "Software a tu medida", "Consultoría TI Chile", "Desarrollo de Software B2B", "Ciberseguridad Chile", "IA Automatización Chile"],
  robots: "index, follow",
  alternates: {
    canonical: SITE.url,
  },
  // Iconos resueltos por convención de archivos en app/: icon.png, apple-icon.png, favicon.ico
};

/**
 * ATM es una consultora que presta servicios, no un producto descargable.
 * El esquema anterior (`SoftwareApplication` con `offers.price: 0`) le decía a
 * Google y a los motores generativos que esto era software gratuito, que es
 * justo la descripción que terminan citando.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  "name": SITE.name,
  "legalName": SITE.legalName,
  "url": SITE.url,
  "logo": `${SITE.url}/logos/ATM_logo_white.png`,
  "description": SITE.description,
  "slogan": SITE.tagline,
  "email": SITE.email,
  "inLanguage": "es-CL",
  "areaServed": { "@type": "Country", "name": "Chile" },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": SITE.region,
    "addressCountry": "CL"
  },
  "sameAs": SOCIAL_LINKS.filter((link) => link.icon !== "mail").map((link) => link.href),
  "knowsAbout": [
    "Desarrollo de software a medida",
    "Ciberseguridad y Ley 21.663",
    "Protección de datos personales y Ley 21.719",
    "Inteligencia artificial generativa y gobernanza de IA",
    "Arquitectura cloud y sistemas ERP"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios ATM Chile",
    "itemListElement": solutions.map((service) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.desc
      }
    }))
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} bg-brand-light text-slate-900 antialiased selection:bg-brand-cobalt selection:text-white`}
        suppressHydrationWarning
      >
        {/* Spline Viewer Runtime removed to avoid multiple ThreeJS instances / eval issues */}

        <Providers>
          
          {/* Capa de Grain/Ruido sutil para textura premium */}
          <div
            className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none noise-bg"
            aria-hidden="true"
          />

          <Navbar />
          
          <main className="relative min-h-screen flex flex-col pt-24">
            {children}
          </main>

          <FloatingChatWidget />
        </Providers>
        {/* <script> plano, no next/script: con la estrategia por defecto el
            JSON-LD se inyectaba después de hidratar y no aparecía en el HTML
            servido, así que los rastreadores que no ejecutan JS no lo veían. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
