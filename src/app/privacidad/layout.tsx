import type { Metadata } from "next";

// La página es un Client Component y no puede exportar `metadata`: se declara aquí.
export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo ATM Chile (ATM Future Solutions SpA) trata y protege los datos personales que recibe a través de su sitio web y sus servicios.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
