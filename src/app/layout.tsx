import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/providers/Providers";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { Analytics } from "@vercel/analytics/react";

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
  metadataBase: new URL("https://atmchile.com"),
  title: {
    default: "ATM Chile | Software a tu medida - Consultoría TI Premium",
    template: "%s | ATM Chile"
  },
  description: "Desarrollo de software a medida, ciberseguridad avanzada y transformación digital en Chile. Partner tecnológico estratético 360 para procesos críticos.",
  keywords: ["ATM Chile", "Software a tu medida", "Consultoría TI Chile", "Desarrollo de Software B2B", "Ciberseguridad Chile", "IA Automatización Chile"],
  robots: "index, follow",
  alternates: {
    canonical: "https://atmchile.com",
  },
  icons: {
    icon: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ATM Chile",
  "operatingSystem": "Web, Cloud",
  "applicationCategory": "BusinessApplication",
  "description": "Software a tu medida y Consultoría TI de alta fidelidad en Chile.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CLP"
  },
  "author": {
    "@type": "Organization",
    "name": "ATM Chile",
    "url": "https://atmchile.com"
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
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
