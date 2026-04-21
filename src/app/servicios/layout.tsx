import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Software a Medida | Ingeniería B2B Chile",
  description: "Ecosistemas tecnológicos de alto impacto: Desarrollo ágil, arquitecturas escalables y soluciones cloud diseñadas para la transformación digital en Chile.",
  keywords: ["software a medida chile", "desarrollo ágil b2b", "arquitectura cloud", "transformación digital", "ATM Chile servicios"],
  openGraph: {
    title: "Software a Medida — ATM Chile | Soluciones Tecnológicas B2B",
    description: "Transformamos operaciones complejas en Chile a través de ingeniería de software premium y arquitectura escalable.",
    images: ["/images/talento_senior.png"],
  }
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
