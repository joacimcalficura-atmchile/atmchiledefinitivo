import type { Article } from "./types";

export const ley21663: Article = {
    slug: "ley-21663-anci-regla-3-72-15",
    title: "Ley 21.663 y la ANCI: qué significa la regla 3/72/15 para tu operación",
    cardTitle: "Ley 21.663: la regla 3/72/15 de la ANCI",
    category: "Ciberseguridad",
    icon: "siren",
    excerpt:
        "La Ley Marco de Ciberseguridad está vigente desde marzo de 2025 y la ANCI ya calificó 1.154 Operadores de Importancia Vital. El reporte en 3 horas no es un trámite administrativo: es un requisito de arquitectura que la mayoría de las operaciones no puede cumplir hoy.",
    cardDesc:
        "La ANCI ya calificó 1.154 operadores vitales. Por qué el reporte en 3 horas es un problema de arquitectura.",
    readTime: "10 min",
    publishedAt: "2026-09-15",
    updatedAt: "2026-11-19",
    keywords: [
        "Ley 21.663",
        "ANCI",
        "Ley Marco de Ciberseguridad Chile",
        "reporte de incidentes 3 horas",
        "Operadores de Importancia Vital",
        "CSIRT Nacional",
    ],
    updateNote:
        "Sumamos las nóminas de Operadores de Importancia Vital (915 en diciembre de 2025 y 239 en julio de 2026), el plazo de 24 horas para el segundo reporte de los OIV, las Instrucciones Generales N°2, 3 y 4 de la ANCI, y corregimos el cruce con la Ley 21.719, que no fija 72 horas y ahora entraría en vigencia en octubre de 2027.",
    answer:
        "La Ley 21.663 obliga a los servicios esenciales y a los Operadores de Importancia Vital a reportar incidentes de ciberseguridad al CSIRT Nacional de la ANCI en tres tramos: alerta temprana en 3 horas, actualización en 72 horas (24 horas para los OIV) e informe final en 15 días. Las multas llegan a 20.000 UTM y, para los OIV, a 40.000 UTM.",
    imageUrl: "/images/ciberseguridad_soc.png",
    featured: true,
    tldr: [
        "La Ley 21.663 se publicó el 8 de abril de 2024 y sus obligaciones clave rigen desde el 1 de marzo de 2025.",
        "Creó la Agencia Nacional de Ciberseguridad (ANCI), que ya calificó 1.154 Operadores de Importancia Vital en dos etapas y recibió más de 400 reportes de incidentes en 2025.",
        "Alcanza a órganos del Estado, prestadores de servicios esenciales y Operadores de Importancia Vital (OIV).",
        "Exige alertar al CSIRT Nacional en 3 horas, actualizar en 72 horas (24 horas si es OIV) y entregar un informe final en 15 días.",
        "Las multas gravísimas llegan a 20.000 UTM y a 40.000 UTM para los OIV.",
    ],
    keyFacts: [
        { label: "Publicación", value: "8 abr 2024" },
        { label: "Obligaciones vigentes", value: "desde 1 mar 2025" },
        { label: "Primer reporte", value: "3 horas" },
        { label: "OIV calificados", value: "1.154" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "A diferencia de la Ley 21.719 de datos personales, cuya entrada en vigencia se postergó a octubre de 2027, la Ley Marco de Ciberseguridad ya no es un plazo futuro. Sus obligaciones clave rigen desde el 1 de marzo de 2025, y la Agencia Nacional de Ciberseguridad ya está operando: califica operadores, dicta instrucciones generales y recibe reportes de incidentes. Su potestad sancionadora está vigente, aunque a octubre de 2026 no había publicado sanciones.",
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
            kind: "table",
            headers: ["Nómina de OIV", "Fecha", "Entidades"],
            rows: [
                [
                    "Primera etapa",
                    "17 dic 2025",
                    "915 (servicios digitales y TI 413, Administración del Estado 158, electricidad 147, salud 114, banca 34, telecomunicaciones 29, empresas públicas 20)",
                ],
                [
                    "Segunda etapa",
                    "24 jul 2026",
                    "239 (combustibles, agua y saneamiento, transporte, concesiones, seguridad social, correos y farmacéutico)",
                ],
                ["Total acumulado", "—", "1.154 Operadores de Importancia Vital"],
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
                    title: "72 horas (24 horas si es OIV) — actualización",
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
                "Designación de un delegado de ciberseguridad, obligatoria para los OIV según la Instrucción General N°3 de la ANCI.",
                "Medidas técnicas de contención inmediata (segmentación, bloqueo por defecto), según la Instrucción General N°4.",
                "Mecanismos de autenticación robusta.",
                "Monitoreo continuo 24/7.",
                "Canales de reporte inmediato, probados antes de necesitarlos.",
            ],
        },
        { kind: "heading", text: "Cómo se cruza con la Ley 21.719" },
        {
            kind: "paragraph",
            text: "Cuando la Ley 21.719 entre en vigencia (el 15 de octubre de 2027, según la postergación despachada por el Congreso), una brecha que exponga datos personales activará los dos regímenes: el reporte escalonado a la ANCI y el aviso a la Agencia de Protección de Datos Personales, que debe hacerse sin dilaciones indebidas. Son dos autoridades, dos estándares y dos expedientes sobre un mismo evento. Conviene diseñar el procedimiento de respuesta a incidentes considerando ambos desde el principio, porque intentar reconstruirlo en medio de una crisis es exactamente cuando se cometen los errores que después quedan por escrito.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "Una prueba que vale la pena hacer",
            text: "Pregúntale a tu equipo quién recibe la alerta si un servidor crítico empieza a exfiltrar datos a las 3 de la madrugada de un domingo, y cuánto demoraría esa persona en notificar al CSIRT. Si no hay una respuesta inmediata y con nombre, el tramo de 3 horas está descubierto.",
        },
    ],
    faq: [
        {
            q: "¿Cuánto plazo hay para reportar un incidente a la ANCI?",
            a: "Alerta temprana en 3 horas desde que se toma conocimiento, actualización en 72 horas (24 horas para los Operadores de Importancia Vital) e informe final en 15 días corridos.",
        },
        {
            q: "¿Cuántos Operadores de Importancia Vital hay en Chile?",
            a: "La ANCI calificó 915 OIV en diciembre de 2025 y 239 más en julio de 2026: 1.154 en total.",
        },
        {
            q: "¿Cuál es la multa máxima de la Ley 21.663?",
            a: "Las infracciones gravísimas tienen multas de hasta 20.000 UTM, y de hasta 40.000 UTM cuando el infractor es un Operador de Importancia Vital.",
        },
        {
            q: "¿Mi empresa está afectada si no es OIV?",
            a: "Puede estarlo si presta un servicio esencial, y también por contrato: los proveedores tecnológicos de un OIV suelen quedar sujetos a sus mismos estándares de seguridad.",
        },
    ],
    sources: [
        {
            label: "Ley 21.663, artículo 40 (multas) — texto en iura.cl",
            url: "https://iura.cl/21663/40",
        },
        {
            label: "Diario Oficial (24-jul-2026) — Resolución Exenta 187 de la ANCI, nómina final de OIV de la segunda etapa",
            url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/07/24/44507/01/2842835.pdf",
        },
        {
            label: "Carey — ANCI aprueba la nómina final de Operadores de Importancia Vital de la segunda etapa",
            url: "https://www.carey.cl/en/anci-approves-the-final-list-of-operators-of-vital-importance-for-the-second-stage-of-the-first-qualification-procedure",
        },
        {
            label: "Actualidad Jurídica DOE — ANCI fija estándares para OIV: delegado de ciberseguridad, reporte y contención",
            url: "https://actualidadjuridica.doe.cl/anci-fija-estandares-obligatorios-para-operadores-vitales-delegado-de-ciberseguridad-reporte-de-incidentes-y-contencion-inmediata/",
        },
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
