import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `[ROL E IDENTIDAD]
Eres el Agente de Inteligencia Artificial de Élite de "ATM Chile". Tu perfil combina la maestría de un Arquitecto de Software Senior y la visión estratégica de un Consultor Enterprise. Eres excepcionalmente inteligente, amable y directo. Transmites autoridad técnica y cercanía humana.

[OBJETIVO ESTRATÉGICO]
Tu misión principal es CALIFICAR leads de alta calidad. No eres un chatbot de soporte general; eres un filtro estratégico para identificar oportunidades de negocio reales para ATM Chile.

[CRITERIOS DE CALIFICACIÓN (LEADS DE ALTA CALIDAD)]
Para que un lead sea considerado "Premium", debes indagar sutilmente estos 4 pilares:
1. El Dolor: ¿Qué problema crítico detiene su crecimiento actual?
2. La Visión: ¿Qué buscan lograr específicamente (escalabilidad, seguridad, automatización)?
3. El Momento: ¿Es una necesidad inmediata o exploración a largo plazo?
4. La Autoridad: Entender su rol dentro de la organización.

[REGLAS ESTRICTAS DE INTERACCIÓN]
1. Respuesta Instantánea y Ejecutiva: Máximo 2 párrafos cortos. Sin relleno.
2. Proactividad Absoluta: CADA mensaje debe terminar con una pregunta estratégica que invite al usuario a revelar una de las piezas faltantes del puzzle de calificación.
3. Cero Repetición: No saludes dos veces. No uses "Hola de nuevo".
4. Tono de Socio: Habla como un socio que ya está pensando en la solución, no como un vendedor.

[FLUJO DE CIERRE]
- Si detectas un lead con visión clara o urgencia (Software, BI, Cloud): Dirígelos a Francisco Cesped (Gerente de Proyectos).
- Si detectas visión estratégica global, alianzas corporativas o gran escala: Dirígelos con Joacim Calficura (Founder & CEO).

[REGLA TÉCNICA - CAPTURA DE DATOS]
Cuando el usuario proporcione Nombre, Correo y su desafío principal, incluye SIEMPRE al final de tu respuesta (oculto para el usuario): 
[LEAD_COMPLETO: nombre|correo|desafío]`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        // 1. Validación estricta de Input (Seguridad por Diseño)
        if (!messages || !Array.isArray(messages)) {
            console.warn("ALERTA DE SEGURIDAD: Payload inválido recibido.");
            return NextResponse.json({ error: "Formato de mensajes inválido." }, { status: 400 });
        }

        // 2. Verificación de Entorno Segura
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        console.log("KEY DISPONIBLE:", !!apiKey);
        
        if (!apiKey || apiKey.length < 10) {
            console.error("ERROR CRÍTICO: GOOGLE_GENERATIVE_AI_API_KEY no existe o es inválida.");
            return NextResponse.json({ error: "Configuración de API incompleta." }, { status: 500 });
        }

        try {
            const result = streamText({
                model: google("gemini-2.5-flash"),
                messages: await convertToModelMessages(messages),
                system: SYSTEM_PROMPT,
                temperature: 0.7,
                onFinish: async (event) => {
                    // Al finalizar el stream, verificamos si hay un lead para procesar
                    const fullText = event.text;
                    if (fullText.includes('[LEAD_COMPLETO:')) {
                        const match = fullText.match(/\[LEAD_COMPLETO:\s*(.*?)\|(.*?)\|(.*?)\]/);
                        if (match && match.length >= 4) {
                            const [_, nombre, correo, servicio] = match;
                            const url = new URL(req.url);
                            const baseUrl = `${url.protocol}//${url.host}`;

                            // Guardamos el lead de forma asíncrona sin bloquear la respuesta
                            try {
                                await fetch(`${baseUrl}/api/forms`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        type: 'contact',
                                        data: {
                                            nombre: nombre.trim(),
                                            email: correo.trim(),
                                            mensaje: `Lead calificado estratégicamente. Contexto: ${servicio.trim()}`,
                                            tamano: 'Lead IA Premium',
                                            canal: 'Chat IA'
                                        }
                                    })
                                });
                            } catch (err) {
                                console.error("Error al guardar lead:", err);
                            }
                        }
                    }
                }
            });

            // 3. Retorno de stream moderno (AI SDK v6)
            return result.toUIMessageStreamResponse({
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
        } catch (modelError: unknown) {
            // 4. Manejo de error con tipado estricto
            console.error("ERROR DETALLADO DE API:", modelError);
            const errorMessage = modelError instanceof Error ? modelError.message : "Error desconocido del modelo";
            return NextResponse.json({ 
                error: "Error interno del modelo de IA.",
                detail: errorMessage 
            }, { status: 500 });
        }

    } catch (error: unknown) {
        // 4. Manejo de error general con tipado estricto
        console.error("Chat API General Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Error de parseo desconocido";
        return NextResponse.json({ 
            error: "Inconveniente técnico momentáneo.",
            debug: errorMessage 
        }, { status: 500 });
    }
}
