import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMhGRRHLx8UylQSoCITSLqc_r8PZGm3cwYX5yYQ_aWwgJ2yk1XIbiPS4KY0njfHeMJqg/exec';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Extraemos trampa y generamos un texto dinámico para la IA basado en todos los valores recibidos
        const { _honey, ...payload } = body;
        
        // 1. HONEYPOT TRAP: Validation silently catches bots
        if (_honey) {
            console.warn("SPAM REJECTED: Honeypot triggered");
            return NextResponse.json({ error: 'SPAM_DETECTED' }, { status: 400 });
        }

        // 2. AI SEMANTIC FILTER: Analyze sense and context
        if (process.env.GEMINI_API_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                const prompt = `Eres un sistema de seguridad anti-spam corporativo. Evalúa este payload de formulario para decidir si fue escrito por un humano o es spam generado.
        
Datos del formulario (formato JSON):
${JSON.stringify(payload, null, 2)}

Pregúntate: ¿Tienen sentido las palabras ingresadas? ¿O es una secuencia aleatoria de letras ("KGufwxLsxUL", "TnoqLsn")? No importa el idioma, pero DEBE ser lenguaje humano o datos reales.

Responde ÚNICAMENTE con la palabra "VALID" (si es texto normal/humano) o "SPAM" (si es basura/aleatorio). No incluyas signos de puntuación, ni explicaciones extra.`;

                const result = await model.generateContent(prompt);
                const aiResponse = result.response.text().trim().toUpperCase();

                if (aiResponse.includes('SPAM')) {
                    console.warn(`SPAM REJECTED by AI. Response: ${aiResponse}. Payload: ${JSON.stringify(payload)}`);
                    return NextResponse.json({ error: 'SPAM_DETECTED' }, { status: 400 });
                }
            } catch (aiError) {
                console.error("AI Filtering error, proceeding to submit anyway to avoid data loss.", aiError);
            }
        } else {
            console.warn("Google Generative AI key not configured. Bypassing AI spam check.");
        }

        // 3. SECURE FORWARDING: Send purely validated dynamic data to Apps Script
        const sheetResponse = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' }, // Apps Script usually requires text/plain for CORS or directly consumes it
            body: JSON.stringify(payload)
        });

        if (!sheetResponse.ok) {
            throw new Error(`Apps Script responded with status: ${sheetResponse.status}`);
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('CRITICAL ERROR processing lead:', error);
        return NextResponse.json({ 
            error: 'Error interno del servidor', 
            details: error.message 
        }, { status: 500 });
    }
}
