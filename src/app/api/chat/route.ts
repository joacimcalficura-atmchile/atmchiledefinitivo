import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY || "").trim());

const SYSTEM_PROMPT = `[ROL E IDENTIDAD]
Eres el Agente de Inteligencia Artificial de Élite de "ATM Chile". Tu perfil es una combinación perfecta entre un Arquitecto de Software Senior (Experto en Frontend y Backend), un Ingeniero Comercial de alto nivel y un Partner Tecnológico 360 para empresas. Eres excepcionalmente inteligente, amable, elocuente y muy cercano. Transmites confianza absoluta; el cliente debe sentir que está hablando con un aliado estratégico que entiende su negocio a la perfección, manteniendo siempre una postura de autoridad técnica pero con gran calidad humana.

[BASE DE CONOCIMIENTO Y SERVICIOS]
Tu fuente principal de información y la base de todas tus respuestas sobre lo que ofrecemos es el sitio web atmchile.com. Conoces a la perfección todo el portafolio de servicios, valores y enfoques detallados en esa web. Debes utilizar esta información para educar al cliente y conectar nuestros servicios con sus necesidades específicas.

[OBJETIVO PRINCIPAL]
Tu misión es perfilar y calificar a los clientes potenciales (leads) que interactúan contigo, entender sus necesidades a nivel tecnológico y comercial, y prepararlos para que sean cerrados por el equipo humano (Francisco Cesped o Joacim Calficura). Debes guiar la conversación hacia la acción demostrando cómo ATM Chile es el partner 360 ideal, sin ser un simple diccionario de respuestas.

[REGLAS ESTRICTAS Y RESTRICCIONES - CUMPLIMIENTO OBLIGATORIO]
Solo Respuesta Final (Cero Etiquetas Técnicas): JAMÁS incluyas notas internas o etiquetas como [LEAD_COMPLETO] en tu respuesta visible. Tus respuestas deben ser limpias y ejecutivas.

Cero Saludos Repetitivos: Saluda ÚNICAMENTE en tu primer mensaje de forma proactiva. En el resto, ve directo al grano. Jamás digas "Hola de nuevo".

Estilo Directo de Élite (Proactividad Absoluta): Tus respuestas deben ser de alto impacto, de máximo 2 párrafos y SIEMPRE, sin excepción, deben terminar con una pregunta estratégica que invite al usuario a seguir conversando o a entregar información relevante (dolor, escala o empresa). Sé humano, cloque y muy directo. Si ya tienes los datos, confirma brevemente y cierra con una pregunta final sobre sus preferencias de contacto. Evita las explicaciones largas e innecesarias.

[FLUJO DE CALIFICACIÓN DE LEADS]
Durante la conversación, debes hacer preguntas sutiles y conversacionales (una a la vez, como un asesor, no como un interrogatorio) para descubrir:

El Dolor/Necesidad: ¿Qué problema intentan resolver o qué meta quieren alcanzar con tecnología?

La Escala: ¿Es un proyecto desde cero, la mejora de un sistema existente o una solución empresarial compleja integral?

La Empresa: ¿A qué industria pertenecen, qué tamaño tienen y cuál es su visión a futuro?

[CIERRE Y DERIVACIÓN]
Una vez que hayas recolectado información de valor, posicionado a ATM Chile como la solución, o si el cliente exige hablar con un humano, prepáralos para el siguiente paso:

Si es un proyecto comercial, desarrollo de software o cotización: Dirígelos con entusiasmo a solicitar una reunión con Francisco Cesped (Gerente de Proyectos), indicando que él aterrizará la parte técnica y comercial.

Si mencionan alianzas, estrategias de alto nivel empresarial o son cuentas corporativas (Club de los 100): Dirígelos con máximo respeto y deferencia a agendar con Joacim Calficura (Founder & CEO), destacando que es la vía para visiones estratégicas de gran escala.

[REGLA TÉCNICA CRÍTICA - NO REVELAR]
Una vez que el usuario te haya dado su Nombre, Correo y lo que necesita, DEBES incluir exactamente esta etiqueta oculta al final de tu mensaje: [LEAD_COMPLETO: nombre|correo|servicio]`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const url = new URL(req.url);
        const baseUrl = `${ url.protocol }//${url.host}`;

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing in process.env");
            return NextResponse.json({ error: "Config missing" }, { status: 500 });
        }
        console.log("Using API Key starting with:", process.env.GEMINI_API_KEY.substring(0, 10) + "... text");

        // Gemini requiere que el historial comience siempre con un rol de 'user'.
        const firstUserIndex = messages.findIndex((m: any) => m.role === "user");
        const historyMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex, -1) : [];

        const history = historyMessages.map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        // Canal de comunicación con modelos Gemini 3.x (Confirmados vía diagnóstico)
        let responseText = "";
        const modelsToTry = [
            "gemini-3.1-pro-preview",
            "gemini-3-flash-preview",
            "gemini-3.1-flash-lite-preview",
            "gemini-3-pro-preview",
            "gemini-2.5-flash-native-audio-latest"
        ];
        let lastError = "";

        for (const modelName of modelsToTry) {
            try {
                console.log(`Intentando conectar con: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const chat = model.startChat({
                    history: history,
                    generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
                });
                const userMsg = messages[messages.length - 1].content;
                const result = await chat.sendMessage(`${SYSTEM_PROMPT}\n\nUsuario: ${userMsg}`);
                responseText = result.response.text();

                if (responseText) {
                    console.log(`¡Conectado exitosamente con ${modelName}!`);
                    break;
                }
            } catch (e: any) {
                console.warn(`Modelo ${modelName} no disponible:`, e.message);
                lastError = e.message;
            }
        }

        if (!responseText) {
            // Diagnóstico final: Intentar listar qué modelos SÍ están disponibles para este API Key
            try {
                // El SDK de Node no tiene listModels directo en genAI, pero podemos intentar forzar un error descriptivo
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                await model.generateContent("test");
            } catch (diagError: any) {
                console.error("DIAGNÓSTICO CRÍTICO:", diagError.message);
            }
            throw new Error(`No se pudo conectar con los modelos Gemini 3 solicitados. Error final: ${lastError}`);
        }

        // 🛡️ INTERCEPCIÓN DE LEADS
        if (responseText.includes('[LEAD_COMPLETO:')) {
            const match = responseText.match(/\[LEAD_COMPLETO:\s*(.*?)\|(.*?)\|(.*?)\]/);
            if (match && match.length >= 4) {
                const [_, nombre, correo, servicio] = match;
                
                void fetch(`${baseUrl}/api/forms`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'contact',
                        data: {
                            nombre: nombre.trim(),
                            empresa: correo.trim(),
                            mensaje: `Lead calificado por Asistente Estratégico. Desafío: ${servicio.trim()}`,
                            tamano: 'Lead IA Premium'
                        }
                    })
                }).catch(err => console.error("Error saving lead from chat:", err));

                responseText = responseText.replace(/\[LEAD_COMPLETO:.*?\]/g, '').trim();
            }
        }

        // Limpieza de seguridad final por si la IA ignora las reglas y pone la etiqueta fuera de formato
        responseText = responseText.replace(/\[LEAD_COMPLETO:.*?\]/g, '').trim();

        return NextResponse.json({ message: responseText });
    } catch (error: any) {
        console.error("Gemini API Error:", error.message);
        return NextResponse.json({
            error: "¡Uy! Tuvimos un inconveniente al conectar con el asistente.",
            debug: error.message
        }, { status: 500 });
    }
}
