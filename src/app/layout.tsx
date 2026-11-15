import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/providers/Providers";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { SITE, SOCIAL_LINKS } from "@/data/site";

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
    default: "ATM Chile | Desarrollo de software a medida en Chile",
    template: "%s | ATM Chile"
  },
  description: "Desarrollo de software a medida, ciberseguridad avanzada y transformación digital en Chile. Partner tecnológico estratégico 360 para procesos críticos.",
  keywords: ["ATM Chile", "Software a tu medida", "Consultoría TI Chile", "Desarrollo de Software B2B", "Ciberseguridad Chile", "IA Automatización Chile"],
  robots: "index, follow",
  // Sin `alternates.canonical` aquí a propósito: el layout raíz lo heredan
  // todas las rutas, y una canónica global hacía que /servicios, /contacto,
  // /talento, etc. le dijeran a Google que su versión principal era la home.
  // Cada página declara la suya (ruta relativa, resuelta contra metadataBase).
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
  },
  // Iconos resueltos por convención de archivos en app/: icon.png, apple-icon.png, favicon.ico
};

/**
 * Datos estructurados de la empresa. Antes se declaraba como
 * `SoftwareApplication` con precio 0, lo que le decía a Google que ATM era una
 * app gratuita. Ahora: la organización + su ficha de servicio profesional.
 * Se emite como <script> plano para que llegue en el HTML del servidor
 * (con next/script no se renderizaba en el SSR).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: "ATM Future Solutions",
      slogan: SITE.tagline,
      url: SITE.url,
      logo: `${SITE.url}/logos/ATM_logo.png`,
      email: SITE.email,
      description: SITE.description,
      sameAs: SOCIAL_LINKS.filter((link) => link.href.startsWith("http")).map((link) => link.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/logos/ATM_logo.png`,
      email: SITE.email,
      parentOrganization: { "@id": `${SITE.url}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Santa Magdalena 75",
        addressLocality: "Providencia",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      areaServed: { "@type": "Country", name: "Chile" },
      knowsAbout: [
        "Desarrollo de software a medida",
        "ERP a medida",
        "Integración de sistemas",
        "Inteligencia artificial aplicada",
        "Ciberseguridad",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "es-CL",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Analytics />
      </body>
    </html>
  );
}
