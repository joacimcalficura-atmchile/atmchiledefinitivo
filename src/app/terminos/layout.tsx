import type { Metadata } from "next";

// La página es un Client Component y no puede exportar `metadata`: se declara aquí.
export const metadata: Metadata = {
  title: "Términos de servicio",
  description: "Términos y Condiciones de uso del sitio web de ATM Chile (ATM Future Solutions SpA).",
  alternates: { canonical: "/terminos" },
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
