import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Hablemos de su próximo Proyecto Tecnológico",
  description: "Inicie su transformación digital hoy. Contacte a los arquitectos de ATM Chile para soluciones de software a medida, ciberseguridad y consultoría senior.",
  keywords: ["contacto atm chile", "consultoría it santiago", "asesoría transformación digital", "presupuesto software a medida"],
  openGraph: {
    title: "Contacto — ATM Chile | Partner Tecnológico Estratégico",
    description: "Soporte arquitectónico y consultoría prioritaria para empresas con visión de escala global.",
  }
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
