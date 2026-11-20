import type { Article } from "./types";

export const iso42001: Article = {
    slug: "iso-42001-gobernanza-ia-certificable",
    title: "ISO/IEC 42001: cómo se audita la inteligencia artificial de una empresa",
    cardTitle: "ISO/IEC 42001: gobernanza de IA certificable",
    category: "Gobernanza de IA",
    icon: "shield",
    excerpt:
        "Es la primera norma internacional certificable para sistemas de gestión de IA. Para una empresa que vende o usa IA en procesos críticos, es la forma más concreta de responder a la pregunta incómoda: «¿cómo sé que su modelo no me va a meter en problemas?».",
    cardDesc:
        "La primera norma certificable de gestión de IA. Cómo convierte «confíe en nuestro modelo» en evidencia auditable.",
    readTime: "9 min",
    publishedAt: "2026-08-20",
    updatedAt: "2026-11-19",
    keywords: [
        "ISO/IEC 42001",
        "certificación ISO 42001 Chile",
        "ISO/IEC 42006",
        "sistema de gestión de inteligencia artificial",
        "gobernanza de IA",
    ],
    updateNote:
        "Sumamos ISO/IEC 42006:2025, la norma que fija los requisitos para los organismos que auditan y certifican ISO 42001, el ritmo de certificaciones en 2026 y la situación de la norma en Chile.",
    answer:
        "ISO/IEC 42001:2023 es la primera norma internacional certificable para sistemas de gestión de inteligencia artificial. Desde 2025, ISO/IEC 42006 regula a los organismos que la certifican, lo que da más peso al certificado. En Chile no es obligatoria ni ha sido adoptada como NCh, pero se puede certificar con organismos acreditados.",
    imageUrl: "/images/ia-core.jpg",
    tldr: [
        "ISO/IEC 42001:2023 es la primera norma internacional de sistemas de gestión de IA, y la única certificable.",
        "Define un SGIA: Sistema de Gestión de Inteligencia Artificial, aplicable a cualquier industria y tamaño de empresa.",
        "Cubre gobernanza, gestión de riesgos específicos de IA, transparencia, auditoría interna y mejora continua.",
        "Se estructura igual que ISO 27001, por lo que una empresa certificada en seguridad ya tiene buena parte del andamiaje.",
        "Es la vía más directa para convertir «confíe en nosotros» en evidencia verificable frente a un cliente corporativo.",
    ],
    keyFacts: [
        { label: "Norma", value: "ISO/IEC 42001:2023" },
        { label: "Alcance", value: "Cualquier industria" },
        { label: "Certificable", value: "Sí, por tercera parte" },
        { label: "Norma para certificadores", value: "ISO/IEC 42006:2025" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "Cuando una empresa grande evalúa a un proveedor de IA, la conversación llega siempre al mismo punto: ¿quién responde si el modelo se equivoca? Hasta hace poco la respuesta era una promesa comercial. ISO/IEC 42001 existe para que sea un certificado.",
        },
        { kind: "heading", text: "Qué es un SGIA" },
        {
            kind: "paragraph",
            text: "ISO/IEC 42001:2023 es la primera norma internacional dedicada a establecer un Sistema de Gestión de Inteligencia Artificial (SGIA). No es una norma técnica sobre cómo entrenar modelos: es un marco de gestión que define cómo una organización desarrolla, provee y usa sistemas de IA de forma responsable, transparente y trazable. Es, además, la única norma de IA que admite certificación por tercera parte.",
        },
        {
            kind: "paragraph",
            text: "La distinción importa. Una norma de gestión no dicta qué arquitectura usar; exige que exista un proceso documentado para decidirla, revisarla y corregirla. Esa es precisamente la pregunta que un auditor —o un cliente corporativo— necesita responder.",
        },
        { kind: "heading", text: "Qué exige, en términos prácticos" },
        {
            kind: "list",
            items: [
                "Gobernanza de IA y toma de decisiones responsable, con roles y responsabilidades nombradas.",
                "Políticas de IA alineadas con la estrategia de negocio, no documentos genéricos descargados de internet.",
                "Gestión de riesgos específicos de IA, desde el diseño hasta la operación y el retiro del sistema.",
                "Consideraciones éticas y de transparencia frente a las personas afectadas por el sistema.",
                "Auditorías internas y mejora continua, con evidencia de los hallazgos y su corrección.",
            ],
        },
        {
            kind: "callout",
            tone: "info",
            title: "Si ya tiene ISO 27001, ya avanzó más de lo que cree",
            text: "ISO/IEC 42001 comparte la estructura de alto nivel de las demás normas de sistemas de gestión. El ciclo de gobernanza, el tratamiento de riesgos, la auditoría interna y la revisión por la dirección son los mismos mecanismos que ya opera una empresa certificada en seguridad de la información: lo que cambia es el catálogo de riesgos que hay que considerar.",
        },
        { kind: "heading", text: "Los riesgos que son propios de la IA" },
        {
            kind: "paragraph",
            text: "Esta es la parte donde un SGIA se diferencia de un SGSI, y donde los proyectos subestiman el trabajo. Los riesgos de un sistema de IA no se agotan en la confidencialidad, integridad y disponibilidad del dato.",
        },
        {
            kind: "numbered",
            items: [
                {
                    title: "Deriva del modelo",
                    text: "Un sistema que funcionaba bien al desplegarse degrada silenciosamente cuando el mundo cambia y los datos de entrada dejan de parecerse a los de entrenamiento. Sin medición continua, nadie se entera hasta que el daño es visible en los números del negocio.",
                },
                {
                    title: "Sesgo y resultados dispares",
                    text: "El modelo puede rendir de forma distinta según grupo de personas sin que eso aparezca en la métrica agregada. Exige medir el desempeño por segmento, no solo el promedio global.",
                },
                {
                    title: "Explicabilidad proporcional al impacto",
                    text: "Mientras más consecuencias tenga una decisión automatizada, mayor es la exigencia de poder explicarla en términos comprensibles para la persona afectada, y no solo para el equipo técnico.",
                },
                {
                    title: "Dependencia de terceros",
                    text: "Si el sistema se apoya en un modelo de un proveedor externo, los cambios de versión, de política de uso o de disponibilidad son riesgos operacionales heredados que hay que documentar y monitorear.",
                },
                {
                    title: "Trazabilidad del dato de entrenamiento",
                    text: "Saber con qué datos se entrenó o afinó un modelo, con qué autorización y con qué restricciones de uso. Es el punto que más cuesta reconstruir cuando no se registró desde el inicio.",
                },
            ],
        },
        { kind: "heading", text: "Cómo está el mercado de la certificación en 2026" },
        {
            kind: "list",
            items: [
                "ISO/IEC 42006:2025, publicada en julio de 2025, fija los requisitos para los organismos que auditan y certifican sistemas de gestión de IA. En la práctica, exige auditores con competencia específica en IA y no solo en seguridad de la información.",
                "El ritmo se aceleró: BSI, uno de los principales certificadores, emitió su certificado ISO/IEC 42001 número 50 en octubre de 2026, frente a 11 en todo 2025, en más de 16 países.",
                "En Chile, el INN comercializa la norma internacional ISO/IEC 42001:2023 (en inglés); a noviembre de 2026 no encontramos una adopción como norma chilena NCh-ISO 42001.",
            ],
        },
        { kind: "heading", text: "Por qué conviene hacerlo antes de que lo exijan" },
        {
            kind: "paragraph",
            text: "ISO/IEC 42001 no es obligatoria en Chile. Su valor hoy es doble y bastante concreto: permite demostrar ante un cliente corporativo que la IA está gobernada, y adelanta buena parte del trabajo que el proyecto de ley chileno y el reglamento europeo van a exigir por otras vías. Si la ley de IA chilena adopta el enfoque de certificación voluntaria que anunció el Gobierno, una norma certificable como esta será la forma natural de demostrar cumplimiento. Las capacidades se solapan de forma casi total.",
        },
        {
            kind: "callout",
            tone: "alert",
            title: "El orden importa",
            text: "Certificar un sistema de gestión que no se opera realmente produce el peor resultado posible: el costo de la auditoría más la evidencia documentada de que la organización sabía qué debía hacer y no lo hizo. Primero se construye la capacidad; el certificado acredita algo que ya funciona.",
        },
    ],
    faq: [
        {
            q: "¿Qué es ISO/IEC 42001?",
            a: "Es la norma internacional que define un Sistema de Gestión de Inteligencia Artificial (SGIA): cómo una organización gobierna, evalúa riesgos, documenta y mejora los sistemas de IA que desarrolla o usa. Es certificable por tercera parte.",
        },
        {
            q: "¿Es obligatoria ISO/IEC 42001 en Chile?",
            a: "No. Ninguna ley chilena la exige a noviembre de 2026, pero sirve como evidencia frente a clientes corporativos y adelanta lo que pedirían la ley de IA en trámite y el AI Act europeo.",
        },
        {
            q: "¿Qué relación tiene con ISO 27001?",
            a: "Comparten la estructura de los sistemas de gestión ISO (gobernanza, riesgos, auditoría interna, revisión por la dirección). Una empresa con ISO 27001 reutiliza gran parte de ese andamiaje y suma los riesgos propios de la IA.",
        },
        {
            q: "¿Qué es ISO/IEC 42006?",
            a: "Es la norma publicada en 2025 que establece los requisitos para los organismos que auditan y certifican ISO/IEC 42001, incluida la competencia de sus auditores en IA.",
        },
    ],
    sources: [
        {
            label: "ISO — ISO/IEC 42006:2025, requisitos para organismos que auditan y certifican sistemas de gestión de IA",
            url: "https://www.iso.org/standard/42006",
        },
        {
            label: "BSI (nov-2026) — BSI awards its 50th ISO/IEC 42001 certificate",
            url: "https://www.bsigroup.com/en-GB/insights-and-media/media-centre/press-releases/2026/november/bsi-awards-its-50th-iso-iec-42001-certificate/",
        },
        {
            label: "INN — ISO/IEC 42001:2023 en la tienda del Instituto Nacional de Normalización",
            url: "https://ecommerce.inn.cl/isoiec-42001202387698",
        },
        {
            label: "Microsoft Compliance — ISO/IEC 42001:2023, sistema de gestión de la inteligencia artificial",
            url: "https://learn.microsoft.com/es-es/compliance/regulatory/offering-iso-42001",
        },
        {
            label: "AENOR — ISO 42001 Gestión de Inteligencia Artificial",
            url: "https://www.aenor.com/certificacion/empresas/tecnologias-de-la-informacion/gestion-inteligencia-artificial",
        },
        {
            label: "SGS — Certificación ISO/IEC 42001: sistema de gestión de IA",
            url: "https://www.sgs.com/es-es/services/certificacion-iso-iec-42001-sistema-de-gestion-de-ia-de-inteligencia-artificial",
        },
    ],
    relatedService: { label: "IA Generativa & Automatización", href: "/servicios" },
};
