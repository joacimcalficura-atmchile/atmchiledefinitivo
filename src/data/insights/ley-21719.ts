import type { Article } from "./types";

/**
 * Actualizado el 19-nov-2026: el Congreso despachó la postergación de la
 * entrada en vigencia al 15-oct-2027 (Boletín 18.623-07). Se mantiene el slug
 * original para no perder el posicionamiento ni los enlaces existentes.
 */
export const ley21719: Article = {
    slug: "ley-21719-datos-personales-cuenta-regresiva",
    title: "Ley 21.719 se posterga al 15 de octubre de 2027: qué cambia y qué no para tu empresa",
    cardTitle: "Ley 21.719: nueva fecha, 15 de octubre de 2027",
    category: "Cumplimiento & Datos",
    icon: "scale",
    excerpt:
        "El Congreso aprobó mover la entrada en vigencia de la nueva ley de datos personales del 1 de diciembre de 2026 al 15 de octubre de 2027. Las obligaciones y las multas son las mismas: lo único que cambia es el tiempo para prepararse. Qué se aprobó, por qué y cómo aprovechar los meses extra desde la arquitectura de software.",
    cardDesc:
        "La ley de datos personales ahora entraría en vigencia el 15 de octubre de 2027. Qué cambió, qué no y cómo usar el tiempo extra.",
    readTime: "9 min",
    publishedAt: "2026-10-01",
    updatedAt: "2026-11-19",
    imageUrl: "/images/executive-security.png",
    featured: true,
    keywords: [
        "Ley 21.719",
        "postergación Ley 21.719",
        "ley de protección de datos personales Chile",
        "15 de octubre de 2027",
        "Agencia de Protección de Datos Personales",
        "cumplimiento datos personales empresas",
    ],
    updateNote:
        "El 17 de noviembre de 2026 la Cámara de Diputados despachó a ley el proyecto que posterga la entrada en vigencia al 15 de octubre de 2027. Falta su promulgación y publicación en el Diario Oficial: mientras eso no ocurra, la fecha legal vigente sigue siendo el 1 de diciembre de 2026.",
    answer:
        "La Ley 21.719 de protección de datos personales ya no entrará en vigencia el 1 de diciembre de 2026, sino el 15 de octubre de 2027. El Congreso despachó la postergación el 17 de noviembre de 2026 y solo falta que se publique. Las obligaciones, los derechos de las personas y las multas no cambian: lo que se gana son unos diez meses y medio para prepararse.",
    tldr: [
        "Nueva fecha de entrada en vigencia: 15 de octubre de 2027 (antes, 1 de diciembre de 2026). Es la primera postergación formal de la ley.",
        "El proyecto (Boletín 18.623-07) fue aprobado por el Senado el 28 de octubre y por la Cámara el 17 de noviembre de 2026, por 113 votos a favor; queda pendiente su publicación.",
        "El motivo oficial: dar tiempo para instalar la Agencia de Protección de Datos Personales, dictar la regulación de detalle y que el Estado y las empresas adapten sus sistemas.",
        "La Agencia tendrá un consejo de 5 integrantes (antes 3), que deberá estar nombrado a más tardar el 15 de enero de 2027.",
        "Las pymes mantienen 12 meses iniciales con amonestación escrita en vez de multa; la Cámara rechazó extender ese beneficio a todas las empresas.",
    ],
    keyFacts: [
        { label: "Nueva vigencia", value: "15 oct 2027" },
        { label: "Fecha anterior", value: "1 dic 2026" },
        { label: "Consejo de la Agencia", value: "5 integrantes" },
        { label: "Multa máxima", value: "20.000 UTM" },
    ],
    body: [
        {
            kind: "paragraph",
            text: "La Ley 21.719, que reemplaza el régimen de datos personales vigente desde 1999 y crea la Agencia de Protección de Datos Personales, se publicó en el Diario Oficial el 13 de diciembre de 2024 con un período de adecuación que terminaba el 1 de diciembre de 2026. A menos de dos semanas de esa fecha, el Congreso aprobó moverla: la ley comenzará a regir el 15 de octubre de 2027.",
        },
        { kind: "heading", text: "Cómo llegamos aquí: la tramitación de la postergación" },
        {
            kind: "timeline",
            items: [
                {
                    date: "13 dic 2024",
                    title: "Se publica la Ley 21.719",
                    text: "Entra al Diario Oficial con un período de adecuación hasta el 1 de diciembre de 2026.",
                },
                {
                    date: "31 ago – 1 sep 2026",
                    title: "El Gobierno propone un año más",
                    text: "El Ministerio de Economía ingresa un mensaje para ampliar el plazo de implementación y anticipar el nombramiento del consejo de la Agencia.",
                },
                {
                    date: "28 oct 2026",
                    title: "El Senado lo aprueba",
                    text: "Con discusión inmediata, el Senado acota la propuesta original (1 de diciembre de 2027) y fija el 15 de octubre de 2027.",
                },
                {
                    date: "17 nov 2026",
                    title: "La Cámara lo despacha a ley",
                    text: "Aprobado por 113 votos a favor, 27 en contra y 1 abstención. Queda listo para promulgación.",
                    current: true,
                },
                {
                    date: "15 oct 2027",
                    title: "Nueva entrada en vigencia",
                    text: "Desde ese día la Agencia podrá fiscalizar y sancionar el tratamiento de datos personales.",
                },
            ],
        },
        {
            kind: "callout",
            tone: "alert",
            title: "Ojo con dar la postergación por hecha",
            text: "Al 19 de noviembre de 2026 la ley que posterga la fecha está despachada por el Congreso, pero aún no se publica en el Diario Oficial. Hasta que eso ocurra, la fecha legal vigente sigue siendo el 1 de diciembre de 2026.",
        },
        { kind: "heading", text: "Por qué se postergó" },
        {
            kind: "paragraph",
            text: "El Gobierno argumentó que se necesitaban condiciones institucionales, regulatorias y operativas que todavía no existían: la Agencia de Protección de Datos Personales aún no estaba instalada y faltaba la regulación secundaria que define cómo se aplica la ley en la práctica. Según el Ministerio de Economía, el año adicional permite instalar la Agencia, definir estándares de aplicación y que organismos públicos, municipios y empresas adapten sus sistemas sin los costos de una implementación apresurada.",
        },
        {
            kind: "list",
            items: [
                "Consejo directivo de la Agencia: pasa de 3 a 5 consejeros, con mandatos de 6 años sin reelección y renovación parcial cada 2 años.",
                "Nombramiento anticipado: los consejeros deben designarse a más tardar nueve meses antes de la entrada en vigencia, es decir, hasta el 15 de enero de 2027, con acuerdo de dos tercios del Senado.",
                "Pymes: se mantiene que, durante los primeros 12 meses, a las empresas de menor tamaño se les pueda aplicar amonestación escrita en lugar de multa.",
                "Lo que no pasó: el Ejecutivo pidió extender ese primer año sin multas a todas las empresas; la Sala de la Cámara lo rechazó.",
            ],
        },
        { kind: "heading", text: "Qué NO cambia con la postergación" },
        {
            kind: "paragraph",
            text: "La postergación solo mueve el calendario. El contenido de la ley es el mismo que se publicó en 2024, y eso es lo que importa para planificar.",
        },
        {
            kind: "table",
            headers: ["Tema", "Qué exige la Ley 21.719"],
            rows: [
                [
                    "Derechos de las personas",
                    "Acceso, rectificación, supresión, oposición, portabilidad y bloqueo, más el derecho a oponerse a decisiones automatizadas. Las solicitudes se responden en 30 días corridos, prorrogables una vez.",
                ],
                [
                    "Brechas de seguridad",
                    "Reportar a la Agencia por los medios más expeditos y sin dilaciones indebidas cuando haya riesgo para los titulares, y avisar a los afectados si se trata de datos sensibles, de menores de 14 años o financieros.",
                ],
                [
                    "Fiscalizador",
                    "La Agencia de Protección de Datos Personales, corporación autónoma de derecho público con potestad para fiscalizar y sancionar.",
                ],
                [
                    "Sanciones",
                    "Leves: amonestación o hasta 5.000 UTM; graves: hasta 10.000 UTM; gravísimas: hasta 20.000 UTM. En reincidencia, hasta el triple; y si la empresa no es de menor tamaño, hasta el 2 % (graves) o 4 % (gravísimas) de sus ingresos anuales en Chile.",
                ],
                [
                    "Registro público",
                    "Un Registro Nacional de Sanciones y Cumplimiento que publica sanciones y modelos de prevención certificados.",
                ],
            ],
        },
        {
            kind: "callout",
            tone: "info",
            title: "Corrección respecto de la versión anterior",
            text: "En la primera versión de este artículo mencionamos un plazo de 72 horas para notificar brechas. Ese plazo corresponde a la Ley 21.663 Marco de Ciberseguridad (ANCI). La Ley 21.719 no fija horas: exige reportar «sin dilaciones indebidas», lo que en la práctica obliga a tener detección temprana.",
        },
        { kind: "heading", text: "La lectura de ingeniería: cuatro capacidades técnicas" },
        {
            kind: "paragraph",
            text: "En los diagnósticos que hemos hecho, el incumplimiento casi nunca viene de una mala intención, sino de sistemas que crecieron sin que nadie llevara la cuenta de dónde quedaba cada dato. Con o sin postergación, estas son las cuatro capacidades que determinan si una empresa puede responder a la Agencia.",
        },
        {
            kind: "numbered",
            items: [
                {
                    title: "Inventario de datos vivo",
                    text: "Un catálogo que responda, sin intervención manual, qué datos personales existen, en qué base y sistema viven, quién los puede leer y con qué justificación. Si hoy esa respuesta depende de revisar planillas, no es un inventario: es arqueología.",
                },
                {
                    title: "Derechos ejecutables por diseño",
                    text: "Cuando un titular pide suprimir, bloquear o portar sus datos, el sistema debe poder cumplirlo de forma verificable en todas las copias: base productiva, réplicas, respaldos, data warehouse y logs, y dentro de los 30 días que fija la ley.",
                },
                {
                    title: "Detección, no solo reacción",
                    text: "Reportar «sin dilaciones indebidas» supone enterarse a tiempo. Una organización sin monitoreo centralizado ni alertas se enterará semanas después, por un tercero, y llegará tarde antes de empezar a investigar.",
                },
                {
                    title: "Minimización en el origen",
                    text: "La defensa más barata es no almacenar lo que no se necesita. Cada campo que un formulario deja de capturar es un campo que no hay que inventariar, proteger, exportar ni eliminar.",
                },
            ],
        },
        { kind: "heading", text: "Cómo usar los meses extra: un plan por trimestre" },
        {
            kind: "paragraph",
            text: "Diez meses y medio alcanzan para un programa de adecuación serio, siempre que se empiece ahora. Este es el orden que recomendamos, de lo que más reduce el riesgo a lo que lo documenta.",
        },
        {
            kind: "table",
            headers: ["Período", "Foco", "Resultado esperado"],
            rows: [
                [
                    "Dic 2026 – feb 2027",
                    "Mapear bases y auditar formularios",
                    "Inventario de datos personales y menos datos capturados sin necesidad.",
                ],
                [
                    "Mar – may 2027",
                    "Centralizar logs, alertas y control de accesos",
                    "Capacidad de detectar y reportar una brecha a tiempo; terceros con acceso revisados.",
                ],
                [
                    "Jun – ago 2027",
                    "Automatizar derechos de los titulares",
                    "Flujos para acceso, supresión, portabilidad y bloqueo con trazabilidad.",
                ],
                [
                    "Sep – oct 2027",
                    "Formalizar políticas y modelo de prevención",
                    "Documentación que describe controles que ya funcionan, lista antes del 15 de octubre.",
                ],
            ],
        },
        {
            kind: "callout",
            tone: "info",
            title: "El criterio que aplicamos",
            text: "Postergar la ley no es postergar la preparación. Una política de privacidad que el sistema no puede cumplir técnicamente no es cumplimiento: es evidencia documentada de incumplimiento. Primero se construye la capacidad y después se escribe el documento que la describe.",
        },
    ],
    faq: [
        {
            q: "¿Cuándo entra en vigencia la Ley 21.719?",
            a: "Según el proyecto despachado por el Congreso el 17 de noviembre de 2026, el 15 de octubre de 2027. Mientras esa ley no se publique en el Diario Oficial, la fecha legal vigente sigue siendo el 1 de diciembre de 2026.",
        },
        {
            q: "¿Por qué se postergó la ley de datos personales?",
            a: "El Gobierno pidió más tiempo para instalar la Agencia de Protección de Datos Personales, dictar la regulación secundaria y permitir que el Estado y las empresas adapten sus sistemas sin una implementación apresurada.",
        },
        {
            q: "¿Cambian las multas o las obligaciones con la postergación?",
            a: "No. La postergación solo mueve la fecha y ajusta la Agencia (consejo de 5 integrantes). Las obligaciones, los derechos de los titulares y las sanciones de la Ley 21.719 se mantienen.",
        },
        {
            q: "¿Las pymes tendrán multas desde el primer día?",
            a: "Durante los primeros 12 meses, a las empresas de menor tamaño se les puede aplicar amonestación escrita en vez de multa. La propuesta de extender ese beneficio a todas las empresas fue rechazada por la Cámara.",
        },
        {
            q: "¿Cuánto plazo hay para notificar una brecha de datos personales?",
            a: "La Ley 21.719 no fija un número de horas: exige reportar a la Agencia por los medios más expeditos y sin dilaciones indebidas. El plazo de 72 horas es de la Ley 21.663 de ciberseguridad, que aplica a otros sujetos y reportes.",
        },
        {
            q: "¿Qué debería hacer mi empresa ahora?",
            a: "Usar el tiempo extra para construir capacidades: inventario de datos, detección de incidentes, control de accesos y flujos para atender los derechos de los titulares. La documentación formal va al final, describiendo controles que ya funcionan.",
        },
    ],
    sources: [
        {
            label: "BioBioChile (17-nov-2026) — Ley de Protección de Datos aplaza su entrada en vigencia: comenzará a regir en 2027",
            url: "https://www.biobiochile.cl/noticias/nacional/chile/2026/11/17/ley-de-proteccion-de-datos-vuelve-a-aplazar-su-entrada-en-vigencia-comenzara-a-regir-en-2027.shtml",
        },
        {
            label: "Diario Financiero (17-nov-2026) — Congreso despacha proyecto que posterga la entrada en vigencia de la ley de protección de datos",
            url: "https://www.df.cl/df-lab/tech-empresas/congreso-despacha-a-ley-proyecto-que-posterga-la-entrada-en-vigencia-de-la",
        },
        {
            label: "Cámara de Diputadas y Diputados (17-nov-2026) — A ley postergación de un año de ley de datos personales",
            url: "https://www.camara.cl/cms/2026/11/17/a-ley-postergacion-de-un-ano-de-ley-de-datos-personales/",
        },
        {
            label: "Ministerio de Economía (1-sep-2026) — Gobierno propone ampliar plazo para implementar nueva Ley de Protección de Datos",
            url: "https://www.economia.gob.cl/2026/09/01/gobierno-propone-ampliar-plazo-para-implementar-nueva-ley-de-proteccion-de-datos-y-institucionalidad.htm",
        },
        {
            label: "Garrigues — El Senado aprueba postergar al 15 de octubre de 2027 la nueva ley de protección de datos (Boletín 18.623-07)",
            url: "https://www.garrigues.com/es_ES/noticia/senado-chileno-aprueba-proyecto-ley-busca-postergar-15-octubre-2027-entrada-vigencia-nueva",
        },
        {
            label: "Alayia Trust — Multas y sanciones de la Ley 21.719",
            url: "https://alayiatrust.com/en/blog/multas-sanciones-ley-21719",
        },
        {
            label: "Diario Oficial (13-dic-2024) — Texto publicado de la Ley 21.719",
            url: "https://www.diariooficial.interior.gob.cl/publicaciones/2024/12/13/44023/01/2583630.pdf",
        },
        {
            label: "Biblioteca del Congreso Nacional — Ley 21.719 (texto actualizado)",
            url: "https://www.bcn.cl/leychile/navegar?i=1209272",
        },
    ],
    relatedService: { label: "Ciberseguridad 360", href: "/seguridad" },
};
