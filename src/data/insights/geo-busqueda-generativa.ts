import type { Article } from "./types";

export const geoBusquedaGenerativa: Article = {
    slug: "geo-como-hacer-que-la-ia-cite-su-empresa",
    title: "GEO: cómo hacer que la IA cite a su empresa",
    cardTitle: "GEO: cómo hacer que la IA cite su empresa",
    category: "Visibilidad Digital",
    icon: "search",
    excerpt:
        "Cada vez más decisiones de compra B2B empiezan con una pregunta a un asistente de IA que responde sintetizando fuentes. Si su empresa no está entre esas fuentes, no está en la conversación. Qué se puede controlar técnicamente y qué no.",
    cardDesc:
        "Si la decisión de compra empieza con una pregunta a un asistente de IA, hay que estar entre las fuentes que cita.",
    readTime: "8 min",
    publishedAt: "2026-07-22",
    imageUrl: "/images/asistente-futurista.jpg",
    tldr: [
        "GEO consiste en estructurar el contenido y la presencia digital para ser recuperado y citado por sistemas generativos.",
        "JSON-LD es el formato de datos estructurados que Google recomienda y el que los motores interpretan con mayor fiabilidad.",
        "Schema.org aporta el vocabulario compartido que define entidades, atributos y relaciones desde 2011.",
        "Los datos estructurados convierten páginas en señales de entidad que los sistemas generativos extraen y citan.",
        "No reemplaza al SEO técnico: lo presupone. Un sitio lento o irrastreable no se cita.",
    ],
    body: [
        {
            kind: "paragraph",
            text: "El cambio de fondo en cómo se busca información no es que haya aparecido otro buscador, sino que la respuesta dejó de ser una lista de enlaces para convertirse en un texto sintetizado que cita algunas fuentes. Para una empresa B2B esto reordena el problema: antes se competía por aparecer en la primera página; ahora se compite por ser una de las tres o cuatro fuentes que el sistema decidió citar.",
        },
        {
            kind: "paragraph",
            text: "GEO (Generative Engine Optimization) es la práctica de estructurar el contenido y la presencia digital para mejorar la visibilidad en las respuestas que generan estos sistemas, influyendo en cómo los modelos recuperan, resumen y presentan la información.",
        },
        { kind: "heading", text: "Por qué los datos estructurados son la palanca técnica" },
        {
            kind: "paragraph",
            text: "Un modelo que sintetiza una respuesta necesita extraer hechos con confianza suficiente para citarlos. El texto corrido obliga a inferir; los datos estructurados declaran. Esa diferencia es la que se puede controlar desde la ingeniería.",
        },
        {
            kind: "paragraph",
            text: "El estándar viene de Schema.org, creado en 2011, que introdujo un vocabulario compartido para definir entidades, atributos y relaciones en el contenido web. Implementado como JSON-LD, funciona como una capa semántica que permite a los motores entender, extraer y citar el contenido de forma fiable. JSON-LD es además el formato que Google recomienda y el que estos sistemas interpretan con mayor consistencia que las alternativas.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "La traducción práctica",
            text: "Los datos estructurados transforman páginas en señales de entidad basadas en hechos, que los sistemas generativos pueden extraer, interpretar y citar dentro de una respuesta. No es un truco de posicionamiento: es declarar de forma inequívoca qué es su empresa, qué hace y qué afirma, en un formato que la máquina no tiene que adivinar.",
        },
        { kind: "heading", text: "Qué implementar, en orden de impacto" },
        {
            kind: "numbered",
            items: [
                {
                    title: "Marcado de organización correcto",
                    text: "El tipo de entidad debe corresponder a lo que la empresa realmente es. Una consultora declarada como aplicación de software le está entregando al modelo una descripción equivocada de sí misma, y esa es la que se va a citar.",
                },
                {
                    title: "Artículos con autoría y fechas verificables",
                    text: "Fecha de publicación, de actualización, autor y organización responsable. Los sistemas generativos ponderan la vigencia: un contenido sin fecha es indistinguible de uno obsoleto, y ante la duda se prefiere la fuente fechada.",
                },
                {
                    title: "Afirmaciones concretas y atribuibles",
                    text: "Cifras, plazos y nombres de normas se citan; los adjetivos no. «Multas de hasta 20.000 UTM» es citable. «Soluciones de clase mundial» no significa nada que un modelo pueda extraer.",
                },
                {
                    title: "Preguntas y respuestas explícitas",
                    text: "Estructurar contenido que responda de forma directa las preguntas que realmente hacen los clientes aumenta la probabilidad de recuperación, porque se parece a la consulta que origina la respuesta.",
                },
                {
                    title: "Fundamentos técnicos sin deuda",
                    text: "Rastreabilidad, velocidad de carga, URLs estables y contenido renderizado accesible sin interacción. GEO no sustituye al SEO técnico: lo da por supuesto. Una página que el rastreador no puede leer no entra en ninguna respuesta.",
                },
            ],
        },
        { kind: "heading", text: "Lo que no se puede controlar" },
        {
            kind: "paragraph",
            text: "Conviene ser honesto sobre los límites, porque este es un terreno donde abunda la promesa exagerada. No existe forma de garantizar que un sistema generativo cite a una empresa determinada: los criterios de selección son opacos, cambian sin aviso y varían entre plataformas. Cualquier proveedor que ofrezca «posición garantizada en respuestas de IA» está vendiendo algo que no puede cumplir.",
        },
        {
            kind: "paragraph",
            text: "Lo que sí se controla es el lado propio de la ecuación: que el contenido sea técnicamente legible, semánticamente explícito, verificable y fechado. Eso aumenta la probabilidad de ser recuperado y, además, mejora la experiencia de la persona que efectivamente llega al sitio. Es la razón por la que recomendamos tratarlo como ingeniería de contenido y no como una táctica de posicionamiento.",
        },
        {
            kind: "callout",
            tone: "alert",
            title: "El error que vuelve el esfuerzo contraproducente",
            text: "Publicar volumen de contenido genérico generado sin revisión para «alimentar» a los modelos. Las afirmaciones vagas o incorrectas no se citan, y un sitio lleno de material impreciso debilita la señal de las páginas que sí dicen algo verificable. Pocos contenidos con datos duros rinden más que muchos sin ellos.",
        },
    ],
    sources: [
        {
            label: "Google Search Central — Guía de optimización para funciones de IA generativa",
            url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
        },
        {
            label: "Generative Engine Optimization (Wikipedia)",
            url: "https://en.wikipedia.org/wiki/Generative_engine_optimization",
        },
        {
            label: "Schema for GEO: How Structured Data Improves AI Visibility, Retrieval & Citations",
            url: "https://searchatlas.com/blog/schema-for-geo/",
        },
    ],
    relatedService: { label: "E-commerce B2B/B2C", href: "/servicios" },
};
