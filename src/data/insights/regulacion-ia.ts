import type { Article } from "./types";

export const regulacionIa: Article = {
    slug: "regulacion-ia-chile-senado-eu-ai-act",
    title: "Mapa regulatorio de la IA: Chile en el Senado, Europa movió la fecha",
    cardTitle: "Regulación de IA: Chile y Europa en 2026",
    category: "Cumplimiento & Datos",
    icon: "gavel",
    excerpt:
        "El proyecto chileno sigue en segundo trámite y el Ejecutivo anunció que lo reemplazará. En Europa, el Digital Omnibus postergó las obligaciones de alto riesgo a diciembre de 2027 sin simplificarlas. Cómo decidir qué construir cuando las fechas se mueven.",
    cardDesc:
        "El proyecto chileno sigue en el Senado y Europa postergó las reglas de alto riesgo a 2027. Qué construir mientras las fechas se mueven.",
    readTime: "12 min",
    publishedAt: "2026-09-08",
    imageUrl: "/images/ia_generativa.png",
    tldr: [
        "El proyecto de ley de IA chileno (Boletín 16.821-19) está en segundo trámite constitucional en el Senado, con urgencia simple.",
        "El Ministerio de Ciencia anunció un nuevo proyecto que reemplazaría la iniciativa actual, por lo que el texto final aún puede cambiar.",
        "Ambos marcos, el chileno y el europeo, clasifican los sistemas por nivel de riesgo: esa estructura es lo estable.",
        "En la UE, el Digital Omnibus postergó las obligaciones de alto riesgo del Anexo III al 2 de diciembre de 2027, y las del Anexo I al 2 de agosto de 2028.",
        "Las obligaciones no se simplificaron: solo se corrió la fecha. El expediente técnico sigue siendo el mismo trabajo.",
    ],
    keyFacts: [
        { label: "Chile — estado", value: "2.º trámite (Senado)" },
        { label: "Chile — aprobado en Cámara", value: "13 oct 2025" },
        { label: "UE — alto riesgo (Anexo III)", value: "2 dic 2027" },
        { label: "UE — productos regulados (Anexo I)", value: "2 ago 2028" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "Hay una pregunta que aparece en casi toda conversación de directorio sobre inteligencia artificial: «¿tenemos que esperar la ley para decidir?». La respuesta corta es que esperar es la estrategia más cara, porque lo que se está moviendo son las fechas de entrada en vigencia, no la estructura de fondo de las obligaciones.",
        },
        { kind: "heading", text: "Chile: aprobado en la Cámara, en discusión en el Senado" },
        {
            kind: "paragraph",
            text: "El proyecto que regula los sistemas de inteligencia artificial (Boletín 16.821-19) se inició por mensaje presidencial en mayo de 2024 y se fusionó con una moción parlamentaria anterior. La Cámara de Diputadas y Diputados lo aprobó en particular el 13 de octubre de 2025 y lo remitió al Senado, donde se encuentra en segundo trámite constitucional con urgencia simple.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "Un detalle que cambia la lectura",
            text: "El Ministerio de Ciencia anunció que el Ejecutivo presentaría un nuevo proyecto de ley de inteligencia artificial, que reemplazaría la iniciativa actualmente en el Senado. Para una empresa esto significa que el articulado final todavía puede cambiar de forma relevante, y que atar un plan de inversión a un texto específico es un riesgo innecesario.",
        },
        {
            kind: "paragraph",
            text: "Lo que sí se mantiene estable entre versiones es el enfoque: clasificar los usos de la IA en categorías de riesgo —inaceptable, alto, limitado y sin riesgo evidente— con prohibiciones, obligaciones, reporte de incidentes y sanciones asociadas a cada nivel. Ese es el andamiaje que conviene adoptar hoy, porque es el que sobrevive a los cambios de redacción.",
        },
        { kind: "heading", text: "Europa: la fecha se movió, el trabajo no" },
        {
            kind: "paragraph",
            text: "El caso europeo importa a cualquier empresa chilena que exporte servicios, procese datos de residentes europeos o venda software a clientes con operación en la UE. Y es también una lección sobre el costo de esperar.",
        },
        {
            kind: "paragraph",
            text: "La Comisión Europea publicó el Digital Omnibus sobre IA el 19 de noviembre de 2025, proponiendo diferir el plazo de cumplimiento de alto riesgo, que originalmente vencía el 2 de agosto de 2026. El 7 de mayo de 2026, el Consejo y el Parlamento Europeo alcanzaron un acuerdo político provisional.",
        },
        {
            kind: "table",
            headers: ["Hito", "Fecha", "Estado"],
            rows: [
                ["Prácticas de IA prohibidas", "2 feb 2025", "En vigor"],
                ["Proveedores de IA de propósito general (GPAI)", "2 ago 2025", "En vigor"],
                [
                    "Alto riesgo — sistemas autónomos (Anexo III)",
                    "2 dic 2027",
                    "Diferido desde ago 2026",
                ],
                [
                    "Alto riesgo — IA en productos regulados (Anexo I)",
                    "2 ago 2028",
                    "Diferido",
                ],
            ],
        },
        {
            kind: "callout",
            tone: "alert",
            title: "La postergación no es un indulto",
            text: "Las obligaciones que pasan a ser exigibles en diciembre de 2027 no se simplificaron. Un proveedor o implementador de un sistema de alto riesgo del Anexo III seguirá necesitando un sistema de gestión de riesgos funcionando, documentación de gobierno de datos, expediente técnico, procedimientos de supervisión humana y, cuando corresponda, una evaluación de impacto en derechos fundamentales. Lo único que cambió es cuándo se lo van a pedir.",
        },
        { kind: "heading", text: "Qué construir sin saber el texto final" },
        {
            kind: "paragraph",
            text: "Cuando la norma es incierta pero su estructura es previsible, la decisión correcta es invertir en las capacidades que todas las versiones van a exigir. En los cuatro puntos siguientes coinciden el proyecto chileno, el reglamento europeo e ISO/IEC 42001, lo que los convierte en inversión segura.",
        },
        {
            kind: "numbered",
            items: [
                {
                    title: "Inventario de sistemas de IA",
                    text: "Qué modelos y automatizaciones están en producción, qué decisiones toman o influyen, sobre qué personas y con qué datos. Ninguna versión de ninguna ley le va a pedir menos que esto, y casi ninguna empresa lo tiene.",
                },
                {
                    title: "Clasificación por riesgo de cada caso de uso",
                    text: "Un chatbot que responde preguntas de catálogo y un modelo que pre-filtra postulantes a un empleo no pertenecen a la misma categoría. Clasificar temprano evita descubrir tarde que el caso de uso más rentable era también el más regulado.",
                },
                {
                    title: "Supervisión humana en decisiones con impacto",
                    text: "Para cualquier decisión que afecte derechos, acceso a crédito, empleo o salud: una persona identificable con capacidad real de revertir el resultado, y el registro de que esa revisión ocurrió.",
                },
                {
                    title: "Trazabilidad de entradas y salidas",
                    text: "Poder reconstruir por qué el sistema respondió lo que respondió en una fecha determinada. Sin registros, es imposible defenderse de un reclamo, y también imposible mejorar el sistema.",
                },
            ],
        },
        {
            kind: "paragraph",
            text: "Las cuatro capacidades tienen algo en común: mejoran la operación incluso si la ley se postergara otra vez. Un inventario de sistemas reduce costos de mantención, la clasificación de riesgo ordena la cartera de proyectos, la supervisión humana evita errores caros y la trazabilidad acelera la depuración. Por eso las recomendamos como punto de partida: no son un costo de cumplimiento, son ingeniería que además cumple.",
        },
    ],
    sources: [
        {
            label: "IAPP — Continúa la tramitación del Proyecto de Ley sobre IA en Chile",
            url: "https://iapp.org/news/a/contin-a-la-tramitaci-n-del-proyecto-de-ley-sobre-ia-en-chile",
        },
        {
            label: "Ministerio de Ciencia fija seis ejes para 2026-2030 y prepara nuevo proyecto de ley de IA",
            url: "https://www.latercera.com/nacional/noticia/ministerio-de-ciencia-fija-seis-ejes-para-2026-2030-y-prepara-nuevo-proyecto-de-ley-de-inteligencia-artificial/",
        },
        {
            label: "Gibson Dunn — EU AI Act Omnibus Agreement: Postponed High-Risk Deadlines",
            url: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/",
        },
        {
            label: "Digital Omnibus y la postergación de las obligaciones de alto riesgo a diciembre de 2027",
            url: "https://www.praxikon.com/en/posts/digital-omnibus-high-risk-postponement-december-2027",
        },
    ],
    relatedService: { label: "IA Generativa & Automatización", href: "/servicios" },
};
