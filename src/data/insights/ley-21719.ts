import type { Article } from "./types";

export const ley21719: Article = {
    slug: "ley-21719-datos-personales-cuenta-regresiva",
    title: "Ley 21.719: la cuenta regresiva al 1 de diciembre de 2026",
    cardTitle: "Ley 21.719: cuenta regresiva al 1 de diciembre",
    category: "Cumplimiento & Datos",
    icon: "scale",
    excerpt:
        "La reforma más profunda a la protección de datos en Chile en 25 años entra en plena vigencia el 1 de diciembre de 2026. Qué exige en términos de arquitectura —no de abogados— y qué se puede alcanzar a construir en las semanas que quedan.",
    cardDesc:
        "La nueva ley de datos entra en vigencia el 1 de diciembre de 2026. Qué exige a nivel de arquitectura y qué alcanza a construirse.",
    readTime: "11 min",
    publishedAt: "2026-10-01",
    imageUrl: "/images/executive-security.png",
    featured: true,
    tldr: [
        "La Ley 21.719 fue publicada el 13 de diciembre de 2024 y entra en plena vigencia el 1 de diciembre de 2026.",
        "Crea la Agencia de Protección de Datos Personales (APDP), con facultades para fiscalizar y sancionar.",
        "Las multas llegan hasta 20.000 UTM, y hasta el 4% de los ingresos anuales en caso de reincidencia.",
        "Las brechas de seguridad deben notificarse en un plazo de 72 horas.",
        "El cumplimiento es un problema de ingeniería: sin trazabilidad del dato ni control de acceso, no hay política que sirva.",
    ],
    keyFacts: [
        { label: "Publicación", value: "13 dic 2024" },
        { label: "Plena vigencia", value: "1 dic 2026" },
        { label: "Multa máxima", value: "20.000 UTM" },
        { label: "Notificación de brechas", value: "72 horas" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "Durante más de dos décadas, Chile operó con una ley de datos personales que, en la práctica, casi no se aplicaba: no existía un organismo con dientes para fiscalizarla. Eso termina el 1 de diciembre de 2026, cuando la Ley 21.719 entra en plena vigencia y la Agencia de Protección de Datos Personales empieza a ejercer sus facultades.",
        },
        {
            kind: "callout",
            tone: "alert",
            title: "El plazo ya no se mide en años",
            text: "La ley se publicó el 13 de diciembre de 2024 con un período de adecuación de dos años. Ese período está terminando: si su organización todavía no sabe en qué sistemas viven sus datos personales, el problema ya no es legal, es de arquitectura de software, y los proyectos de arquitectura no se improvisan en semanas.",
        },
        { kind: "heading", text: "Qué cambia realmente" },
        {
            kind: "paragraph",
            text: "El cambio de fondo no es la aparición de nuevas prohibiciones, sino la aparición de un fiscalizador con capacidad de sanción y de un estándar probatorio. Ya no basta con declarar que se protegen los datos: hay que poder demostrarlo con evidencia técnica.",
        },
        {
            kind: "list",
            items: [
                "Una autoridad especializada: la APDP es una corporación autónoma de derecho público con facultades fiscalizadoras y sancionatorias.",
                "Derechos ARCO completos: acceso, rectificación, cancelación y oposición, que su plataforma debe poder ejecutar y registrar.",
                "Notificación de brechas en 72 horas, lo que exige detección y no solo reacción.",
                "Sanciones de hasta 20.000 UTM, que escalan hasta el 4% de los ingresos anuales en caso de reincidencia.",
            ],
        },
        { kind: "heading", text: "La lectura de ingeniería: cuatro capacidades técnicas" },
        {
            kind: "paragraph",
            text: "En los diagnósticos que hemos hecho, el incumplimiento casi nunca viene de una mala intención, sino de sistemas que crecieron sin que nadie llevara la cuenta de dónde quedaba cada dato. Estas son las cuatro capacidades que, en nuestra experiencia, determinan si una empresa puede responder a la APDP o no.",
        },
        {
            kind: "numbered",
            items: [
                {
                    title: "Inventario de datos vivo",
                    text: "Un catálogo que responda, sin intervención manual, qué datos personales existen, en qué base y sistema viven, quién los puede leer y con qué justificación. Si esta respuesta hoy requiere que alguien revise planillas, no es un inventario: es arqueología.",
                },
                {
                    title: "Derechos ARCO ejecutables por diseño",
                    text: "Cuando un titular pide la eliminación de sus datos, el sistema debe poder cumplirlo de forma verificable en todas las copias: base productiva, réplicas, respaldos, data warehouse y logs. El borrado que deja rastros en un respaldo sigue siendo un dato almacenado.",
                },
                {
                    title: "Detección, no solo reacción",
                    text: "El plazo de 72 horas corre desde que se toma conocimiento de la brecha. Una organización sin monitoreo centralizado ni alertas se enterará semanas después, por un tercero, y habrá incumplido el plazo antes de empezar a investigar.",
                },
                {
                    title: "Minimización en el origen",
                    text: "La defensa más barata es no almacenar lo que no se necesita. Cada campo que un formulario deja de capturar es un campo que no hay que inventariar, proteger, exportar ni eliminar. Revisar los formularios de captación suele ser la acción con mejor retorno de todo el proyecto.",
                },
            ],
        },
        { kind: "heading", text: "Qué alcanza a hacerse ahora" },
        {
            kind: "paragraph",
            text: "Una adecuación completa es un programa de varios meses, pero el riesgo no se distribuye de forma uniforme: casi todo se concentra en unos pocos puntos. Si queda poco tiempo, el orden que recomendamos es atacar primero la superficie expuesta y la capacidad de detección, y dejar la documentación formal al final.",
        },
        {
            kind: "table",
            headers: ["Prioridad", "Acción", "Por qué primero"],
            rows: [
                [
                    "1",
                    "Auditar formularios y puntos de captación",
                    "Reduce el universo de datos a proteger y es la intervención más rápida.",
                ],
                [
                    "2",
                    "Centralizar logs y activar alertas",
                    "Sin detección, el plazo de 72 horas es imposible de cumplir.",
                ],
                [
                    "3",
                    "Mapear bases con datos personales",
                    "Es el insumo de todo lo demás; sin el mapa no hay plan.",
                ],
                [
                    "4",
                    "Revisar accesos y permisos de terceros",
                    "Los encargados de tratamiento externos son responsabilidad de su empresa.",
                ],
                [
                    "5",
                    "Formalizar políticas y registros",
                    "Es necesario, pero sin las capas anteriores sería documentar una ficción.",
                ],
            ],
        },
        {
            kind: "callout",
            tone: "info",
            title: "El criterio que aplicamos",
            text: "Una política de privacidad que el sistema no puede cumplir técnicamente no es cumplimiento: es evidencia documentada de incumplimiento. Siempre conviene construir primero la capacidad y después escribir el documento que la describe.",
        },
    ],
    sources: [
        {
            label: "Academia Judicial — Ley 21.719 que regula la protección y el tratamiento de los datos personales",
            url: "https://academiajudicial.cl/recursos/actualizaciones-normativas/ley-21-719-que-regula-la-proteccion-y-el-tratamiento-de-los-datos-personales-y-crea-la-agencia-de-proteccion-de-datos-personales/",
        },
        {
            label: "Chile Data Privacy Laws — reforma, nueva Agencia y vigencia en diciembre de 2026",
            url: "https://www.recordinglaw.com/es/world-laws/world-data-privacy-laws/chile-data-privacy-laws/",
        },
        {
            label: "Ley 21.719: obligaciones, multas y plan de cumplimiento",
            url: "https://preyproject.com/es/blog/ley-de-proteccion-de-datos-en-chile",
        },
    ],
    relatedService: { label: "Ciberseguridad 360", href: "/seguridad" },
};
