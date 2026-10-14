import type { Article } from "./types";

export const ley21663: Article = {
    slug: "ley-21663-anci-regla-3-72-15",
    title: "Ley 21.663 y la ANCI: qué significa la regla 3/72/15 para su operación",
    cardTitle: "Ley 21.663: la regla 3/72/15 de la ANCI",
    category: "Ciberseguridad",
    icon: "siren",
    excerpt:
        "La Ley Marco de Ciberseguridad ya está vigente y la ANCI ya califica operadores, recibe reportes y sanciona. El reporte en 3 horas no es un trámite administrativo: es un requisito de arquitectura que la mayoría de las operaciones no puede cumplir hoy.",
    cardDesc:
        "La Ley Marco de Ciberseguridad ya está vigente y la ANCI ya sanciona. Por qué el reporte en 3 horas es un problema de arquitectura.",
    readTime: "10 min",
    publishedAt: "2026-09-15",
    imageUrl: "/images/ciberseguridad_soc.png",
    featured: true,
    tldr: [
        "La Ley 21.663 se publicó el 8 de abril de 2024 y sus obligaciones clave rigen desde el 1 de marzo de 2025.",
        "Creó la Agencia Nacional de Ciberseguridad (ANCI), que ya califica operadores, recibe reportes y aplica sanciones.",
        "Alcanza a órganos del Estado, prestadores de servicios esenciales y Operadores de Importancia Vital (OIV).",
        "Exige notificar al CSIRT Nacional en un plazo de 3 horas y mantener un SGSI formalizado.",
        "Las multas llegan hasta 40.000 UTM.",
    ],
    keyFacts: [
        { label: "Publicación", value: "8 abr 2024" },
        { label: "Obligaciones vigentes", value: "desde 1 mar 2025" },
        { label: "Primer reporte", value: "3 horas" },
        { label: "Multa máxima", value: "40.000 UTM" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "A diferencia de la Ley 21.719, que todavía está en su recta final de adecuación, la Ley Marco de Ciberseguridad ya no es un plazo futuro. Sus obligaciones clave rigen desde el 1 de marzo de 2025, y la Agencia Nacional de Ciberseguridad ya está operando: califica operadores, recibe reportes de incidentes y aplica sanciones.",
        },
        { kind: "heading", text: "A quién alcanza" },
        {
            kind: "paragraph",
            text: "La ley define tres grupos con obligaciones de intensidad creciente. El error más común que vemos es asumir que «esto es para las eléctricas y los bancos»: el alcance de servicios esenciales es considerablemente más amplio, y el proveedor tecnológico de un operador calificado termina arrastrado al mismo estándar por la vía contractual.",
        },
        {
            kind: "list",
            items: [
                "Órganos de la Administración del Estado.",
                "Prestadores de servicios esenciales, públicos o privados.",
                "Operadores de Importancia Vital (OIV), un subconjunto con obligaciones reforzadas que la ANCI califica.",
            ],
        },
        {
            kind: "paragraph",
            text: "Los sectores considerados esenciales incluyen energía (generación, transmisión y distribución eléctrica, gas y combustibles), agua potable y saneamiento, telecomunicaciones, servicios financieros (bancos, bolsas y sistemas de pago), salud (hospitales, laboratorios y prestadores críticos) y transporte (puertos, aeropuertos e infraestructura vial).",
        },
        { kind: "heading", text: "La regla 3/72/15" },
        {
            kind: "paragraph",
            text: "El régimen de reporte es escalonado, y cada tramo exige una capacidad distinta de la organización. Verlo como un solo trámite es lo que hace que las empresas fallen en el primero.",
        },
        {
            kind: "numbered",
            items: [
                {
                    title: "3 horas — alerta temprana",
                    text: "Notificación inicial al CSIRT Nacional. Tres horas no alcanzan para diagnosticar la causa raíz: alcanzan para informar que algo está ocurriendo. Esto implica que la organización necesita detección automatizada y un canal de escalamiento definido de antemano, con responsables nombrados y suplentes.",
                },
                {
                    title: "72 horas — actualización",
                    text: "Un reporte con el alcance estimado, los sistemas afectados y las medidas de contención aplicadas. Aquí se paga el precio de no tener inventario de activos: sin saber qué sistemas existen, no se puede estimar el alcance.",
                },
                {
                    title: "15 días — informe final",
                    text: "El análisis de causa raíz y las medidas correctivas adoptadas. Este es el documento que la ANCI contrastará con lo que la organización declaró en los tramos anteriores, por lo que la consistencia entre los tres reportes importa tanto como su contenido.",
                },
            ],
        },
        {
            kind: "callout",
            tone: "alert",
            title: "Dónde se rompe en la práctica",
            text: "El tramo de 3 horas es el que falla, y casi nunca por falta de voluntad. Falla porque nadie se enteró: sin monitoreo centralizado y alertas accionables, el incidente se descubre cuando un cliente reclama o cuando aparece publicado. A esa altura el plazo ya venció y el incumplimiento es independiente de qué tan bien se maneje el resto.",
        },
        { kind: "heading", text: "El SGSI: de la intención a la evidencia" },
        {
            kind: "paragraph",
            text: "La ley exige un Sistema de Gestión de Seguridad de la Información formalizado. En términos operativos, esto significa pasar de «tenemos buenas prácticas» a «podemos demostrar con registros qué hicimos, cuándo y quién lo autorizó». Las capacidades mínimas que se exigen a los sectores esenciales son concretas y auditables:",
        },
        {
            kind: "list",
            items: [
                "Registro en la plataforma oficial de la ANCI.",
                "Designación de un encargado de ciberseguridad con competencias técnicas verificables.",
                "Mecanismos de autenticación robusta.",
                "Monitoreo continuo 24/7.",
                "Canales de reporte inmediato, probados antes de necesitarlos.",
            ],
        },
        { kind: "heading", text: "Cómo se cruza con la Ley 21.719" },
        {
            kind: "paragraph",
            text: "Una brecha que expone datos personales de clientes activa simultáneamente los dos regímenes: el reporte de 3 horas a la ANCI y la notificación de 72 horas en materia de datos personales. Son dos autoridades, dos plazos y dos expedientes sobre un mismo evento. Conviene diseñar el procedimiento de respuesta a incidentes considerando ambos desde el principio, porque intentar reconstruirlo en medio de una crisis es exactamente cuando se cometen los errores que después quedan por escrito.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "Una prueba que vale la pena hacer",
            text: "Pregunte a su equipo quién recibe la alerta si un servidor crítico empieza a exfiltrar datos a las 3 de la madrugada de un domingo, y cuánto demoraría esa persona en notificar al CSIRT. Si no hay una respuesta inmediata y con nombre, el tramo de 3 horas está descubierto.",
        },
    ],
    sources: [
        {
            label: "Ley 21.663 Chile: Ciberseguridad, ANCI y Regla 3/72/15",
            url: "https://www.piranirisk.com/es/hub-regulatorio/ley-21663-ciberseguridad-chile-reporte-anci",
        },
        {
            label: "Ley 21.663: Chile avanza en ciberseguridad e Instrucción General N°1 de la ANCI",
            url: "https://www.cronup.com/ley-21-663-chile-avanza-en-ciberseguridad-y-sectores-esenciales-deben-aplicar-instruccion-general-n-1-de-la-anci/",
        },
        {
            label: "Ley Marco de Ciberseguridad: qué exige la Ley 21.663 y cómo cumplirla",
            url: "https://xmslatam.com/ley-marco-ciberseguridad-chile-21663/",
        },
    ],
    relatedService: { label: "Ciberseguridad 360", href: "/seguridad" },
};
