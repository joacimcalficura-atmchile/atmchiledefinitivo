import type { Article } from "./types";

export const agentesProduccion: Article = {
    slug: "agentes-ia-del-piloto-a-produccion",
    title: "Agentes de IA: la arquitectura que separa el piloto de la producción",
    cardTitle: "Agentes de IA: del piloto a producción",
    category: "Inteligencia Artificial",
    icon: "cpu",
    excerpt:
        "Un agente que conversa es una demo; uno que ejecuta acciones con consecuencias es un sistema crítico. Los siete controles de ingeniería que, en nuestra experiencia, definen si un piloto de IA llega a producción o muere en la presentación al directorio.",
    cardDesc:
        "Un agente que conversa es una demo; uno que ejecuta acciones es un sistema crítico. Los siete controles que marcan la diferencia.",
    readTime: "13 min",
    publishedAt: "2026-08-05",
    imageUrl: "/images/insights/ia-agentes.png",
    featured: true,
    tldr: [
        "La diferencia entre un piloto y un sistema en producción no es la calidad del modelo: es la ingeniería que lo rodea.",
        "Todo agente que ejecuta acciones necesita permisos acotados, idempotencia y límites de gasto explícitos.",
        "Las acciones irreversibles exigen confirmación humana; es una decisión de arquitectura, no de producto.",
        "Sin evaluación sistemática antes de desplegar, cada cambio de prompt es un despliegue a ciegas.",
        "La observabilidad no es opcional: si no se puede reconstruir qué hizo el agente y por qué, no se puede operar ni defender.",
    ],
    body: [
        {
            kind: "paragraph",
            text: "Hay un patrón que se repite con una regularidad casi aburrida. El piloto de IA funciona espectacularmente en la demo, el directorio aprueba, y seis meses después el proyecto está detenido. No porque el modelo fuera malo, sino porque la demo nunca tuvo que lidiar con un usuario que pide lo mismo tres veces, un sistema externo caído a mitad de una transacción, o un mes en que el consumo de tokens se multiplicó por veinte.",
        },
        {
            kind: "paragraph",
            text: "La distinción que importa no es «chatbot» versus «agente». Es si el sistema solo produce texto o si además ejecuta acciones con consecuencias: emitir una nota de crédito, modificar un despacho, escribirle a un cliente. En el momento en que hay consecuencias, deja de ser un proyecto de IA y pasa a ser un sistema transaccional que además usa IA. El estándar de ingeniería que corresponde es el segundo.",
        },
        { kind: "heading", text: "Los siete controles" },
        {
            kind: "numbered",
            items: [
                {
                    title: "Permisos acotados por herramienta",
                    text: "Cada capacidad del agente es una credencial distinta, con el mínimo privilegio necesario y auditable por separado. Un agente de atención que puede consultar el estado de un pedido no debe compartir credenciales con uno que puede anularlo. El error clásico es darle al agente las llaves de un usuario administrador «para la etapa de pruebas» y nunca revertirlo.",
                },
                {
                    title: "Idempotencia en toda acción con efecto",
                    text: "Los reintentos son inevitables: se cae la red, expira un token, el usuario insiste. Sin claves de idempotencia, un reintento emite la segunda nota de crédito. Esta es la falla que más daño causa en producción y la que menos aparece en las demos, porque en la demo nada falla.",
                },
                {
                    title: "Confirmación humana en lo irreversible",
                    text: "Clasifique las acciones por reversibilidad, no por complejidad. Consultar es libre; modificar es registrable; borrar, pagar o comunicarse con un cliente externo requiere confirmación explícita de una persona. Esta frontera se define en la arquitectura, no se deja a criterio del modelo en tiempo de ejecución.",
                },
                {
                    title: "Control de acceso dentro de la búsqueda",
                    text: "Si el agente consulta una base de conocimiento, el filtro de permisos tiene que aplicarse en la consulta, antes de que el contenido llegue al modelo. Filtrar después es inútil: el dato ya entró al contexto y el modelo puede parafrasearlo. Es la vía más común de filtración de información interna en sistemas de IA.",
                },
                {
                    title: "Evaluación antes de cada despliegue",
                    text: "Un conjunto de casos representativos, con respuestas esperadas, que corre automáticamente ante cualquier cambio de prompt, modelo o herramienta. Sin esto, cada ajuste es un despliegue a ciegas y la única forma de detectar una regresión es que la reporte un cliente.",
                },
                {
                    title: "Límites de gasto y de iteraciones",
                    text: "Topes explícitos de tokens por conversación, de iteraciones por tarea y de costo diario, con corte automático. Un agente en un bucle de razonamiento puede consumir el presupuesto de un mes en una tarde, y lo hará un sábado.",
                },
                {
                    title: "Trazas completas de cada decisión",
                    text: "Registre la entrada, el contexto recuperado, las herramientas invocadas con sus parámetros, la salida y el costo. Cuando un cliente reclame por lo que el agente le dijo o hizo, esta traza es la única forma de saber qué pasó, corregirlo y demostrar diligencia.",
                },
            ],
        },
        {
            kind: "callout",
            tone: "alert",
            title: "El atajo que sale caro",
            text: "Darle al agente acceso directo a la base de datos de producción con un usuario amplio acelera el piloto unas semanas y compromete el proyecto entero. Cuando llega el momento de acotar permisos, la lógica ya asume accesos que no debería tener, y acotarlos significa reescribir. Es más rápido empezar con los permisos correctos que corregirlos después.",
        },
        { kind: "heading", text: "Cómo decidir si un caso de uso está listo" },
        {
            kind: "paragraph",
            text: "No todos los procesos convienen como primer agente. Antes de comprometer presupuesto, nosotros evaluamos cuatro condiciones; si alguna falta, el caso de uso casi siempre se transforma en un piloto que no escala.",
        },
        {
            kind: "table",
            headers: ["Condición", "Pregunta de control"],
            rows: [
                [
                    "Proceso definido",
                    "¿Existe un procedimiento que una persona nueva podría seguir? Si el proceso vive en la cabeza de alguien, primero hay que escribirlo.",
                ],
                [
                    "Error tolerable",
                    "¿Qué cuesta una respuesta equivocada? Si el costo es alto e irreversible, empiece con el agente como asistente del operador, no como ejecutor.",
                ],
                [
                    "Volumen suficiente",
                    "¿Ocurre lo bastante seguido para que automatizarlo se pague? Automatizar un proceso de diez casos al mes es un hobby.",
                ],
                [
                    "Resultado medible",
                    "¿Se puede definir hoy qué significa «funcionó»? Sin métrica previa, el proyecto se evalúa por impresiones y nunca se cierra.",
                ],
            ],
        },
        { kind: "heading", text: "Lo que sí cambia con el tiempo" },
        {
            kind: "paragraph",
            text: "Las capacidades de los modelos avanzan rápido y seguirán haciéndolo, por lo que anclar una arquitectura a un proveedor o a una versión específica es una decisión que envejece mal. Lo que recomendamos es aislar el modelo detrás de una interfaz propia: que el sistema dependa de una capacidad («clasificar este caso», «redactar esta respuesta») y no de un proveedor concreto.",
        },
        {
            kind: "paragraph",
            text: "Los siete controles de arriba, en cambio, no han cambiado y no dependen de qué modelo se use. Son los mismos principios de sistemas distribuidos que ya conocíamos —mínimo privilegio, idempotencia, observabilidad, límites de recursos— aplicados a un componente nuevo que, a diferencia de los anteriores, es no determinista. Esa es la única novedad real, y es suficiente para justificar tratarlo con más rigor, no con menos.",
        },
        {
            kind: "callout",
            tone: "info",
            title: "Una pregunta útil para evaluar un piloto",
            text: "Pida ver la traza de una conversación que salió mal. Si el equipo puede mostrarla, con el contexto recuperado y las herramientas invocadas, el proyecto tiene bases de producción. Si la respuesta es que habría que reproducirlo a mano, lo que existe es una demo.",
        },
    ],
    sources: [
        {
            label: "OWASP Top 10 for Large Language Model Applications",
            url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        },
        {
            label: "NIST AI Risk Management Framework (AI RMF 1.0)",
            url: "https://www.nist.gov/itl/ai-risk-management-framework",
        },
    ],
    relatedService: { label: "IA Generativa & Automatización", href: "/servicios" },
};
