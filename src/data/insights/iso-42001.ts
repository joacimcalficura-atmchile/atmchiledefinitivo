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
        { label: "Marco hermano", value: "ISO/IEC 27001" },
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
        { kind: "heading", text: "Por qué conviene hacerlo antes de que lo exijan" },
        {
            kind: "paragraph",
            text: "ISO/IEC 42001 no es obligatoria en Chile. Su valor hoy es doble y bastante concreto: permite demostrar ante un cliente corporativo que la IA está gobernada, y adelanta buena parte del trabajo que el proyecto de ley chileno y el reglamento europeo van a exigir por otras vías. Las capacidades se solapan de forma casi total.",
        },
        {
            kind: "callout",
            tone: "alert",
            title: "El orden importa",
            text: "Certificar un sistema de gestión que no se opera realmente produce el peor resultado posible: el costo de la auditoría más la evidencia documentada de que la organización sabía qué debía hacer y no lo hizo. Primero se construye la capacidad; el certificado acredita algo que ya funciona.",
        },
    ],
    sources: [
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
