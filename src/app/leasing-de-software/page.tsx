import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Code2, CalendarCheck, KeyRound, Users, TrendingDown, Building2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { FooterUnified } from "@/components/shared/FooterUnified";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { SITE } from "@/data/site";

const TITLE = "Leasing de software: tu sistema a medida, pagado en cuotas";
const DESCRIPTION =
    "Desarrollamos el software o ERP que tu rubro necesita y lo pagas en cuotas, con licencia perpetua al final. Mientras pagas, ganas un porcentaje cada vez que el sistema se vende a otras empresas.";

export const metadata: Metadata = {
    title: "Leasing de software a medida en Chile",
    description: DESCRIPTION,
    alternates: { canonical: "/leasing-de-software" },
    openGraph: {
        type: "website",
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE.url}/leasing-de-software`,
        siteName: SITE.name,
        locale: SITE.locale,
    },
};

const STEPS = [
    {
        icon: Lightbulb,
        title: "Traes la idea o el problema",
        text: "Una idea de producto o la necesidad de un ERP pensado para tu rubro. En un diagnóstico definimos el alcance juntos.",
    },
    {
        icon: Code2,
        title: "ATM lo desarrolla",
        text: "Nuestro equipo diseña, construye e implementa el sistema a la medida de tu operación.",
    },
    {
        icon: CalendarCheck,
        title: "Pagas la licencia en cuotas",
        text: "En vez de una gran inversión inicial, pagas una licencia mensual durante el plazo acordado.",
    },
    {
        icon: KeyRound,
        title: "Cuota final: licencia perpetua",
        text: "Al terminar, una cuota final te deja la licencia perpetua de uso. El sistema sigue trabajando para ti, sin pagar licencias por usuario para siempre.",
    },
];

const BENEFITS = [
    {
        icon: TrendingDown,
        title: "Sin inversión inicial grande",
        text: "Distribuyes el costo del desarrollo en cuotas que tu operación puede absorber desde el primer mes.",
    },
    {
        icon: Users,
        title: "Ganas mientras pagas",
        text: "Si el sistema le sirve a otras empresas de tu rubro, ATM puede comercializarlo. Recibes un porcentaje por cada venta e implementación, lo que baja tu costo neto. La primera meta es llegar a 20 clientes ideales.",
    },
    {
        icon: Building2,
        title: "Hecho para tu rubro",
        text: "No adaptas tu empresa a un software genérico: el sistema nace de tus procesos reales y de los de tu industria.",
    },
];

const COMPARISON = [
    { label: "Inversión inicial", compra: "Alta", saas: "Baja", leasing: "Baja" },
    { label: "Hecho a la medida de tu rubro", compra: "Sí", saas: "No", leasing: "Sí" },
    { label: "Pago por usuario para siempre", compra: "No", saas: "Sí", leasing: "No" },
    { label: "Uso del sistema al terminar de pagar", compra: "Sí", saas: "Se pierde si dejas de pagar", leasing: "Licencia perpetua" },
    { label: "Ingresos por ventas a otras empresas", compra: "No", saas: "No", leasing: "Porcentaje por venta e implementación" },
];

const FAQ = [
    {
        q: "¿Qué pasa cuando termino de pagar las cuotas?",
        a: "Pagas la cuota final y obtienes la licencia perpetua de uso del sistema. Desde ahí no hay más cuotas de licencia.",
    },
    {
        q: "¿Por qué ATM puede vender el sistema a otras empresas?",
        a: "Porque un sistema hecho para un rubro le sirve a otras empresas del mismo rubro. Lo que se comercializa es el producto, no tus datos. A cambio, recibes un porcentaje de cada venta e implementación mientras pagas tu leasing.",
    },
    {
        q: "¿Cuánto cuesta y en cuántas cuotas se paga?",
        a: "Depende del alcance del sistema. El monto, el plazo, el valor de la cuota final y los porcentajes por venta se definen contigo en la propuesta, después del diagnóstico.",
    },
    {
        q: "¿Sirve si ya tengo un ERP o sistemas en uso?",
        a: "Sí. Podemos construir el sistema para integrarse con lo que ya usas, o reemplazar solo la parte que no se ajusta a tu operación.",
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Leasing de software a medida",
    serviceType: "Desarrollo de software a medida con licencia en cuotas",
    description: DESCRIPTION,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "Chile" },
    url: `${SITE.url}/leasing-de-software`,
};

const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hola ATM, les escribo desde atmchile.com/leasing-de-software. Quiero saber más sobre el leasing de software."
)}`;

export default function LeasingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, faqJsonLd]).replace(/</g, "\\u003c") }}
            />

            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-atm-onyx px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24 lg:px-8">
                <BrandPattern tone="onDark" opacity={0.08} />
                <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#176BDE]/25 blur-[140px]" />
                <div className="relative mx-auto max-w-4xl text-center">
                    <Image
                        src="/images/brand/logo-slogan-blanco.png"
                        alt="ATM · A tu medida"
                        width={1036}
                        height={620}
                        priority
                        className="mx-auto mb-8 h-auto w-40 md:w-48"
                    />
                    <span className="inline-block rounded-full border border-[#176BDE]/40 bg-[#176BDE]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8FC0FF]">
                        Leasing de software
                    </span>
                    <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl">
                        Tu sistema a medida, <span className="text-[#6AA5F5]">pagado en cuotas</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-atm-alabaster/80">
                        Desarrollamos el software o ERP que tu rubro necesita. Lo pagas en cuotas, terminas con licencia perpetua de uso y, mientras pagas, ganas un porcentaje cada vez que el sistema se vende a otras empresas.
                    </p>
                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-[#0E4FA5]"
                        >
                            Agenda un diagnóstico <ArrowRight className="h-5 w-5" aria-hidden />
                        </Link>
                        <WhatsAppLink
                            href={whatsappHref}
                            boton="leasing-hero"
                            className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                        >
                            Conversemos por WhatsApp
                        </WhatsAppLink>
                    </div>
                </div>
            </section>

            {/* Cómo funciona */}
            <section aria-labelledby="como-funciona" className="relative isolate bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-6xl">
                    <h2 id="como-funciona" className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                        Cómo funciona
                    </h2>
                    <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#176BDE] text-sm font-black text-white">
                                        {i + 1}
                                    </span>
                                    <step.icon className="h-6 w-6 text-[#176BDE]" aria-hidden />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Beneficios */}
            <section aria-labelledby="beneficios" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <h2 id="beneficios" className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                        Por qué conviene
                    </h2>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {BENEFITS.map((b) => (
                            <div key={b.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <b.icon className="h-8 w-8 text-[#176BDE]" aria-hidden />
                                <h3 className="mt-5 text-xl font-bold text-slate-900">{b.title}</h3>
                                <p className="mt-3 leading-relaxed text-slate-600">{b.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparación */}
            <section aria-labelledby="comparacion" className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <h2 id="comparacion" className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                        Leasing frente a comprar o arrendar un SaaS
                    </h2>
                    <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <thead className="bg-slate-50 text-slate-900">
                                <tr>
                                    <th scope="col" className="p-4 font-bold"> </th>
                                    <th scope="col" className="p-4 font-bold">Desarrollo comprado</th>
                                    <th scope="col" className="p-4 font-bold">Software SaaS genérico</th>
                                    <th scope="col" className="bg-[#176BDE] p-4 font-bold text-white">Leasing ATM</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                                {COMPARISON.map((row) => (
                                    <tr key={row.label}>
                                        <th scope="row" className="p-4 font-semibold text-slate-900">{row.label}</th>
                                        <td className="p-4">{row.compra}</td>
                                        <td className="p-4">{row.saas}</td>
                                        <td className="bg-[#176BDE]/5 p-4 font-semibold text-[#0E4FA5]">{row.leasing}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section aria-labelledby="preguntas" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <h2 id="preguntas" className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                        Preguntas frecuentes
                    </h2>
                    <div className="mt-10 space-y-4">
                        {FAQ.map((item) => (
                            <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-6">
                                <summary className="cursor-pointer list-none text-lg font-bold text-slate-900 marker:hidden">
                                    {item.q}
                                </summary>
                                <p className="mt-3 leading-relaxed text-slate-600">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="relative isolate overflow-hidden bg-[#176BDE] px-4 py-20 text-center sm:px-6 lg:px-8">
                <BrandPattern tone="onDark" opacity={0.12} className="-z-10" />
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                        Conversemos tu idea
                    </h2>
                    <p className="mt-4 text-lg text-white">
                        En un diagnóstico revisamos tu necesidad y te proponemos alcance, plazo y condiciones del leasing.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0E4FA5] transition-colors hover:bg-atm-alabaster"
                        >
                            Agenda un diagnóstico
                        </Link>
                        <WhatsAppLink
                            href={whatsappHref}
                            boton="leasing-cierre"
                            className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                        >
                            WhatsApp {SITE.whatsappDisplay}
                        </WhatsAppLink>
                    </div>
                </div>
            </section>

            <FooterUnified />
        </>
    );
}
