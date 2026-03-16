import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Providers } from "@/components/providers/Providers";
import { FloatingChatWidget } from "@/components/ui/FloatingChatWidget";
import { Analytics } from "@vercel/analytics/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  title: "< ATM /> | Partner Tecnológico Estratégico 360",
  description: "Asesoría nivel 360 y transformación digital empresarial.",
  robots: "index, follow",
  icons: {
    icon: "/favicon.png",
  },
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
        <Analytics />
      </body>
    </html>
  );
}
