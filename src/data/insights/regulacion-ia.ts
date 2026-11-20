import type { Article } from "./types";

export const regulacionIa: Article = {
    slug: "regulacion-ia-chile-senado-eu-ai-act",
    title: "Mapa regulatorio de la IA: Chile prepara un texto sustitutivo y Europa ya movió la fecha",
    cardTitle: "Regulación de IA: Chile y Europa en 2026",
    category: "Cumplimiento & Datos",
    icon: "gavel",
    excerpt:
        "El proyecto de ley de IA chileno fue aprobado en general por la comisión del Senado y el Gobierno prepara una indicación sustitutiva sin sanciones propias. En Europa, el Digital Omnibus ya es ley y postergó las obligaciones de alto riesgo a diciembre de 2027 sin simplificarlas. Cómo decidir qué construir cuando las fechas se mueven.",
    cardDesc:
        "Chile prepara un texto sustitutivo para su ley de IA y Europa ya postergó el alto riesgo a 2027. Qué construir mientras tanto.",
    readTime: "12 min",
    publishedAt: "2026-09-08",
    updatedAt: "2026-11-19",
    keywords: [
        "ley de inteligencia artificial Chile",
        "Boletín 16.821-19",
        "EU AI Act Digital Omnibus",
        "AI Act alto riesgo 2027",
        "regulación IA empresas",
    ],
    updateNote:
        "Actualizamos el estado del proyecto chileno (aprobado en general por la Comisión de Desafíos del Futuro del Senado el 26 de octubre de 2026, con indicación sustitutiva anunciada por el Gobierno) y la situación europea: el Digital Omnibus se publicó en el Diario Oficial de la UE el 24 de julio de 2026 y rige desde el 27 de julio.",
    answer:
        "En Chile, el proyecto de ley de IA está en el Senado: la comisión lo aprobó en general el 26 de octubre de 2026 y el Gobierno anunció un texto sustitutivo sin sanciones propias, por lo que el articulado final aún puede cambiar. En la Unión Europea, el Digital Omnibus ya está vigente y movió las obligaciones de alto riesgo al 2 de diciembre de 2027 (Anexo III) y al 2 de agosto de 2028 (Anexo I).",
    imageUrl: "/images/ia_generativa.png",
    tldr: [
        "El proyecto de ley de IA chileno (Boletín 16.821-19) fue aprobado en general por la comisión del Senado el 26 de octubre de 2026; el plazo preliminar para indicaciones es el 4 de diciembre.",
        "La ministra de Ciencia, Ximena Lincolao, anunció una indicación sustitutiva: regulación proporcional al impacto, certificación voluntaria y sin sanciones propias de IA.",
        "Ambos marcos, el chileno y el europeo, clasifican los sistemas por nivel de riesgo: esa estructura es lo estable.",
        "En la UE, el Digital Omnibus (vigente desde el 27 de julio de 2026) postergó las obligaciones de alto riesgo del Anexo III al 2 de diciembre de 2027, y las del Anexo I al 2 de agosto de 2028.",
        "Las obligaciones no se simplificaron: solo se corrió la fecha. El expediente técnico sigue siendo el mismo trabajo.",
    ],
    keyFacts: [
        { label: "Chile — estado", value: "Aprobado en general en comisión del Senado" },
        { label: "Chile — indicaciones", value: "hasta 4 dic 2026" },
        { label: "UE — alto riesgo (Anexo III)", value: "2 dic 2027" },
        { label: "UE — productos regulados (Anexo I)", value: "2 ago 2028" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "Hay una pregunta que aparece en casi toda conversación de directorio sobre inteligencia artificial: «¿tenemos que esperar la ley para decidir?». La respuesta corta es que esperar es la estrategia más cara, porque lo que se está moviendo son las fechas de entrada en vigencia, no la estructura de fondo de las obligaciones.",
        },
        { kind: "heading", text: "Chile: aprobado en general en el Senado, con un texto sustitutivo en camino" },
        {
            kind: "paragraph",
            text: "El proyecto que regula los sistemas de inteligencia artificial (Boletín 16.821-19) se inició por mensaje presidencial en mayo de 2024 y se fusionó con una moción parlamentaria anterior. La Cámara de Diputadas y Diputados lo aprobó en particular el 13 de octubre de 2025 y lo remitió al Senado, donde se encuentra en segundo trámite constitucional. El 26 de octubre de 2026 la Comisión de Desafíos del Futuro, Ciencia, Tecnología e Innovación del Senado lo aprobó en general por unanimidad y fijó, de forma preliminar, el 4 de diciembre de 2026 como plazo para presentar indicaciones.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "Un detalle que cambia la lectura",
            text: "La ministra de Ciencia, Ximena Lincolao, anunció una indicación sustitutiva que reemplazaría el texto aprobado por la Cámara: regulación proporcional al impacto real en lugar de la clasificación rígida en cuatro niveles, estándares técnicos actualizables, certificación y auditorías voluntarias, y sin sanciones específicas de IA (se aplicarían las leyes de datos, ciberseguridad y consumidor). El texto original contemplaba multas de hasta 20.000 UTM. Para una empresa, esto significa que el articulado final todavía puede cambiar de forma relevante.",
        },
        {
            kind: "paragraph",
            text: "Lo que sí se mantiene estable entre versiones es la idea de graduar las exigencias según el riesgo o el impacto de cada uso de la IA. Además, aunque la ley de IA no tuviera sanciones propias, la Ley 21.719 de datos personales y la Ley 21.663 de ciberseguridad sí las tienen, y ya alcanzan a los sistemas de IA que tratan datos o sostienen servicios esenciales.",
        },
        { kind: "heading", text: "Europa: la fecha se movió, el trabajo no" },
        {
            kind: "paragraph",
            text: "El caso europeo importa a cualquier empresa chilena que exporte servicios, procese datos de residentes europeos o venda software a clientes con operación en la UE. Y es también una lección sobre el costo de esperar.",
        },
        {
            kind: "paragraph",
            text: "La Comisión Europea propuso el Digital Omnibus sobre IA el 19 de noviembre de 2025 para diferir el plazo de alto riesgo, que originalmente vencía el 2 de agosto de 2026. Tras el acuerdo político del 7 de mayo de 2026, el Parlamento lo aprobó el 16 de junio y el Consejo el 29 de junio; se publicó en el Diario Oficial de la UE el 24 de julio y rige desde el 27 de julio de 2026.",
        },
        {
            kind: "table",
            headers: ["Hito", "Fecha", "Estado"],
            rows: [
                ["Prácticas de IA prohibidas", "2 feb 2025", "En vigor"],
                ["Proveedores de IA de propósito general (GPAI)", "2 ago 2025", "En vigor; modelos previos a esa fecha, hasta 2 ago 2027"],
                ["Transparencia (art. 50)", "2 ago 2026", "En vigor; marcado de contenido sintético de sistemas previos, hasta 2 dic 2026"],
                [
                    "Alto riesgo — sistemas autónomos (Anexo III)",
                    "2 dic 2027",
                    "Diferido por el Omnibus (antes ago 2026)",
                ],
                [
                    "Alto riesgo — IA en productos regulados (Anexo I)",
                    "2 ago 2028",
                    "Diferido por el Omnibus (antes ago 2027)",
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
    faq: [
        {
            q: "¿En qué estado está la ley de inteligencia artificial en Chile?",
            a: "En segundo trámite en el Senado. La Comisión de Desafíos del Futuro la aprobó en general el 26 de octubre de 2026 y el Gobierno anunció una indicación sustitutiva; el plazo preliminar para indicaciones es el 4 de diciembre de 2026.",
        },
        {
            q: "¿La ley de IA chilena tendrá multas?",
            a: "El texto aprobado por la Cámara contemplaba multas de hasta 20.000 UTM. La indicación sustitutiva anunciada por el Gobierno propone no tener sanciones propias de IA y aplicar las leyes existentes de datos personales, ciberseguridad y consumidor. Aún no se ha votado.",
        },
        {
            q: "¿Cuándo aplican las obligaciones de alto riesgo del AI Act europeo?",
            a: "Tras el Digital Omnibus, vigente desde el 27 de julio de 2026: el 2 de diciembre de 2027 para los sistemas del Anexo III y el 2 de agosto de 2028 para la IA integrada en productos regulados (Anexo I).",
        },
        {
            q: "¿Una empresa chilena debe cumplir el AI Act?",
            a: "Sí, si ofrece sistemas de IA en el mercado europeo o si los resultados de sus sistemas se usan en la UE. También puede quedar alcanzada por contrato, cuando sus clientes operan en Europa.",
        },
    ],
    sources: [
        {
            label: "G5 Noticias (4-nov-2026) — Comisión del Senado aprueba en general proyecto de ley de IA",
            url: "https://g5noticias.cl/?p=932347",
        },
        {
            label: "El Dínamo (3-nov-2026) — Ley de IA en Chile: el riesgo de llegar tarde a regular el futuro",
            url: "https://www.eldinamo.cl/opinion/2026/11/03/ley-de-ia-en-chile-el-riesgo-de-llegar-tarde-a-regular-el-futuro/",
        },
        {
            label: "Lewis Silkin (27-jul-2026) — The Digital Omnibus on AI enters into force today",
            url: "https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo",
        },
        {
            label: "Future of Privacy Forum — The AI Act implementation timeline: what changes under the AI Omnibus",
            url: "https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus",
        },
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
