import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMhGRRHLx8UylQSoCITSLqc_r8PZGm3cwYX5yYQ_aWwgJ2yk1XIbiPS4KY0njfHeMJqg/exec';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nombre, empresa, correo, datoExtra, mensaje, hojaDestino, _honey } = body;

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

                const prompt = `Eres un sistema de seguridad anti-spam de grado empresarial (B2B). Tu único objetivo es evaluar el siguiente envío de formulario y decidir si fue escrito por un humano o si es spam/keyboard-mashing generado por un bot.

Datos del formulario:
- Nombre: "${nombre}"
- Empresa: "${empresa}"
- Mensaje: "${mensaje}"

Pregúntate: ¿Tienen sentido las palabras? ¿Parece texto real (independiente del idioma) o es una secuencia aleatoria de letras sin sentido (ej: "KGufwxLsxUL", "poGQeR", "TnoqLsn")? No te preocupes si el mensaje es corto o de prueba, pero DEBE ser lenguaje humano.

Responde ÚNICAMENTE con la palabra "VALID" (si es texto normal/humano) o "SPAM" (si es basura/aleatorio). No incluyas signos de puntuación, ni explicaciones extra.`;

                const result = await model.generateContent(prompt);
                const aiResponse = result.response.text().trim().toUpperCase();

                if (aiResponse.includes('SPAM')) {
                    console.warn(`SPAM REJECTED by AI. AI Response: ${aiResponse}. Payload: ${nombre} / ${mensaje}`);
                    return NextResponse.json({ error: 'SPAM_DETECTED' }, { status: 400 });
                }
            } catch (aiError) {
                console.error("AI Filtering error, proceeding to submit anyway to avoid data loss.", aiError);
            }
        } else {
            console.warn("Google Generative AI key not configured. Bypassing AI spam check.");
        }

        // 3. SECURE FORWARDING: Send purely validated data to Apps Script
        const payload = {
            nombre,
            empresa,
            correo,
            datoExtra,
            mensaje,
            hojaDestino
        };

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
