import type { Metadata } from "next";

// La página es un Client Component y no puede exportar `metadata`: se declara aquí.
export const metadata: Metadata = {
  title: "Términos de servicio",
  description: "Condiciones de servicio de ATM Future Solution SpA (ATM Chile) para proyectos de software a medida, consultoría y soporte.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
