import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talento Senior On-Demand | Células de Desarrollo en Chile",
  description: "Ingeniería de software de élite integrada a su flujo de trabajo. Equipos ágiles senior bajo estándares Audit-Ready y Clean Code para escalar su negocio.",
  keywords: ["talento it chile", "desarrolladores senior on-demand", "células ágiles chile", "ingeniería de software senior", "ATM Chile talento"],
  openGraph: {
    title: "Talento Senior — ATM Chile | Ingeniería de Software de Élite",
    description: "Acceda a ingenieros de software senior integrados a su operación. Escalabilidad técnica con estándares internacionales.",
    images: ["/images/talento_senior.png"],
  }
};

export default function TalentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
