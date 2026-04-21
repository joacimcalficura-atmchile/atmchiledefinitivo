import { Metadata } from 'next';
import { InsightsContent } from '@/components/sections/InsightsContent';

export const metadata: Metadata = {
  title: 'Insights | Recursos Estratégicos y Transformación Digital - ATM',
  description: 'Análisis profundo, casos de éxito y tendencias tech para líderes de negocio. Domina la logística, el software a medida y la ciberseguridad con nuestra comunidad senior.',
  openGraph: {
    title: 'Insights | Recursos Estratégicos y Transformación Digital - ATM',
    description: 'Análisis profundo, casos de éxito y tendencias tech para líderes de negocio. Domina la logística, el software a medida y la ciberseguridad con nuestra comunidad senior.',
    url: 'https://atmchile.com/insights',
    siteName: 'ATM Chile',
    images: [
      {
        url: 'https://atmchile.com/images/og-profepyme.png',
        width: 1200,
        height: 630,
        alt: 'Insights by ATM Chile',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function InsightsPage() {
  return <InsightsContent />;
}
