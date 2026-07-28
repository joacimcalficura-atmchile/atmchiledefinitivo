import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/providers/Providers";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} bg-brand-light text-slate-900 antialiased selection:bg-brand-cobalt selection:text-white`}
        suppressHydrationWarning
      >
        {/* Spline Viewer Runtime — registers <spline-viewer> web component globally */}
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"
          strategy="lazyOnload"
        />

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
