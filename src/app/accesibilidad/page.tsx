import { Accessibility, Keyboard, MessageCircle, MonitorSmartphone, SlidersHorizontal, Eye } from "lucide-react";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { OpenA11yPanelButton } from "@/components/a11y/OpenA11yPanelButton";
import { SITE } from "@/data/site";

const REVISION = "20 de noviembre de 2026";

const PANEL = [
    { title: "Tamaño del texto", text: "Hasta 150 %, sin que el contenido se corte ni aparezca desplazamiento horizontal." },
    { title: "Contraste reforzado", text: "Revisa el texto de cada página y lo lleva a contraste 7:1 (nivel AAA) donde haga falta." },
    { title: "Pausar animaciones", text: "Detiene movimientos y desplazamiento suave. Si tu sistema ya pide menos movimiento, lo respetamos sin que hagas nada." },
    { title: "Fuente de alta legibilidad", text: "Cambia a Atkinson Hyperlegible, diseñada para personas con baja visión." },
    { title: "Más espacio en el texto", text: "Aumenta el interlineado y la separación entre letras y palabras." },
    { title: "Subrayar enlaces y foco reforzado", text: "Distingue los enlaces sin depender del color y marca con fuerza dónde está el foco del teclado." },
];

const PRACTICES = [
    {
        icon: Keyboard,
        title: "Teclado",
        items: [
            "Todo se puede usar sin mouse: Tab avanza, Mayús + Tab retrocede, Enter o Espacio activan.",
            "Al presionar Tab por primera vez aparece «Saltar al contenido principal».",
            "Las ventanas emergentes retienen el foco y se cierran con Escape; al cerrar, vuelves a donde estabas.",
            "Alt + A abre el panel de accesibilidad desde cualquier página.",
        ],
    },
    {
        icon: Eye,
        title: "Lectores de pantalla",
        items: [
            "Páginas con regiones (menú, contenido, pie) y títulos en orden para moverse rápido.",
            "Imágenes con descripción cuando aportan información; las decorativas se omiten.",
            "Formularios con etiquetas, ayudas y mensajes de error que se anuncian.",
            "El asistente virtual anuncia cada respuesta nueva.",
        ],
    },
    {
        icon: MonitorSmartphone,
        title: "Visión y dispositivos",
        items: [
            "Contraste mínimo 4,5:1 en el texto y 3:1 en íconos y controles.",
            "Botones y enlaces de al menos 24 × 24 px; los principales, 44 × 44 px.",
            "Se adapta a teléfonos, tablets, zoom del navegador al 200 % y modo de alto contraste de Windows.",
            "Idioma de la página declarado como español de Chile, para que los lectores de voz pronuncien bien.",
        ],
    },
    {
        icon: MessageCircle,
        title: "Lenguaje claro e inclusivo",
        items: [
            "Hablamos de «personas», «equipos» y «quienes» en vez de genéricos en masculino.",
            "No usamos «x», «@» ni «e» para marcar género: los lectores de pantalla no los leen bien.",
            "Frases cortas y directas, con el trato de «tú» en todo el sitio.",
        ],
    },
];

const LIMITS = [
    "Los videos y publicaciones de Instagram y YouTube se muestran con los reproductores de esas plataformas, cuya accesibilidad no controlamos. Siempre incluimos el título y un enlace directo.",
    "La verificación antispam de Cloudflare (Turnstile) aparece solo cuando detecta tráfico sospechoso; si te impide enviar un formulario, escríbenos por correo o WhatsApp.",
    "Las respuestas del asistente virtual las genera una inteligencia artificial y pueden no estar en lenguaje claro. Si algo no se entiende, pide que lo explique de otra forma o escríbenos.",
];

export default function AccesibilidadPage() {
    return (
        <div className="relative">
            <section
                id="accesibilidad"
                aria-labelledby="accesibilidad-titulo"
                className="relative isolate -mt-24 overflow-hidden bg-[#0F1215] pb-16 pt-36 md:pb-20 md:pt-44"
            >
                <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#176BDE]/25 blur-[150px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#16F3E8]/10 blur-[140px]" />
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#16F3E8]">
                        <Accessibility size={16} aria-hidden="true" />
                        Accesibilidad e inclusión
                    </p>
                    <h1 id="accesibilidad-titulo" className="mt-6 text-[2.4rem] font-black leading-[1.08] tracking-tight text-white sm:text-6xl">
                        Una web que <span className="text-[#6AA5F5]">todas las personas</span> puedan usar
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                        Software a la medida también es software para cada forma de ver, oír, moverse y leer. Este sitio sigue
                        las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, nivel AA, y aplica criterios AAA donde es
                        posible.
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <OpenA11yPanelButton />
                        <p className="text-sm text-slate-300">
                            O presiona <kbd className="rounded-md border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-white">Alt</kbd>{" "}
                            + <kbd className="rounded-md border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-white">A</kbd> en cualquier página.
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="panel-titulo" className="relative isolate bg-[#F5F7FB] py-16 md:py-24">
                <BrandPattern tone="onLight" opacity={0.04} className="-z-10" />
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        <SlidersHorizontal className="h-6 w-6 text-[#176BDE]" aria-hidden="true" />
                        <h2 id="panel-titulo" className="text-3xl font-black tracking-tight text-[#0F1215]">
                            Tu panel de preferencias
                        </h2>
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                        Lo desarrollamos nosotros, sin herramientas de terceros que agreguen scripts o recopilen datos. Tus
                        ajustes quedan guardados solo en este navegador y se aplican en todas las páginas.
                    </p>
                    <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                        {PANEL.map((p) => (
                            <li key={p.title} className="rounded-2xl border border-[#b8ccf0] border-l-4 border-l-[#176BDE] bg-white p-6">
                                <h3 className="text-base font-bold text-[#0F1215]">{p.title}</h3>
                                <p className="mt-2 text-[0.9375rem] leading-6 text-slate-700">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="practicas-titulo" className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <h2 id="practicas-titulo" className="text-3xl font-black tracking-tight text-[#0F1215]">
                        Cómo lo hacemos
                    </h2>
                    <div className="mt-10 grid gap-10 md:grid-cols-2">
                        {PRACTICES.map(({ icon: Icon, title, items }) => (
                            <div key={title}>
                                <h3 className="flex items-center gap-3 text-lg font-bold text-[#0F1215]">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176BDE]/10 text-[#176BDE]">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    {title}
                                </h3>
                                <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-7 text-slate-700 marker:text-[#176BDE]">
                                    {items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-labelledby="limites-titulo" className="bg-[#F5F7FB] py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <h2 id="limites-titulo" className="text-3xl font-black tracking-tight text-[#0F1215]">
                        Lo que aún no depende de nosotros
                    </h2>
                    <ul className="mt-8 space-y-4">
                        {LIMITS.map((l) => (
                            <li key={l} className="rounded-2xl border-l-4 border-l-[#16F3E8] bg-[#0F1215] p-6 text-[0.9375rem] leading-7 text-slate-200">
                                {l}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="contacto-a11y-titulo" className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <h2 id="contacto-a11y-titulo" className="text-3xl font-black tracking-tight text-[#0F1215]">
                        ¿Encontraste una barrera?
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                        Cuéntanos qué página, qué intentabas hacer y con qué dispositivo o tecnología de apoyo navegas. Te
                        respondemos en un máximo de 5 días hábiles y, mientras lo resolvemos, te entregamos la información por
                        otro medio.
                    </p>
                    <ul className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <li>
                            <a
                                href={`mailto:${SITE.email}?subject=${encodeURIComponent("Accesibilidad en atmchile.com")}`}
                                className="inline-flex min-h-12 items-center rounded-xl bg-[#176BDE] px-6 font-bold text-white transition-colors hover:bg-[#0E4FA5]"
                            >
                                Escribir a {SITE.email}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hola ATM, quiero reportar una barrera de accesibilidad en atmchile.com.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center rounded-xl border-2 border-[#0F1215] px-6 font-bold text-[#0F1215] transition-colors hover:bg-slate-100"
                            >
                                WhatsApp {SITE.whatsappDisplay}
                                <span className="sr-only"> (se abre en una pestaña nueva)</span>
                            </a>
                        </li>
                    </ul>
                    <p className="mt-10 text-sm text-slate-600">
                        Última revisión: {REVISION}. Evaluado con axe-core, Lighthouse y navegación solo con teclado.
                    </p>
                </div>
            </section>
        </div>
    );
}
