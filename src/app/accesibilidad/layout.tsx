import type { Metadata } from "next";
import { FooterUnified } from "@/components/shared/FooterUnified";

export const metadata: Metadata = {
  alternates: { canonical: "/accesibilidad" },
  title: "Accesibilidad",
  description:
    "Cómo hacemos atmchile.com accesible e inclusivo: estándar WCAG 2.2 AA, panel de preferencias propio, navegación por teclado y lectores de pantalla.",
};

export default function AccesibilidadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FooterUnified />
    </>
  );
}
