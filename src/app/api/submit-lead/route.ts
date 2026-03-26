import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dns from 'dns';

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

        // 2. DNS MX DOMAIN VERIFICATION: Block non-existent or fake domains
        const targetEmail = payload.correo || payload.email;
        if (targetEmail) {
            const domain = targetEmail.split('@')[1];
            if (domain) {
                try {
                    const mxRecords = await dns.promises.resolveMx(domain);
                    if (!mxRecords || mxRecords.length === 0) {
                        console.warn(`SPAM REJECTED: Domain ${domain} has no MX records.`);
                        return NextResponse.json({ error: 'SPAM_DETECTED' }, { status: 400 });
                    }
                } catch (mxError) {
                    console.warn(`SPAM REJECTED: Bad or non-existent email domain: ${domain}`);
                    return NextResponse.json({ error: 'SPAM_DETECTED' }, { status: 400 });
                }
            }
        }

        // 2. AI SEMANTIC FILTER: Analyze sense and context
        if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                const prompt = `Eres un sistema de seguridad anti-spam corporativo. Evalúa este payload de formulario para decidir si fue escrito por un humano o es spam generado.
        
Datos del formulario (formato JSON):
${JSON.stringify(payload, null, 2)}

Análisis obligatorio (Responde evaluando esto):
1. ¿El correo electrónico fue inventado golpeando el teclado al azar? Ojo especial si el correo es algo como "qweasd123@gmail.com", "asdfg@gmail.com", o "sdfsdgsfg@...". Incluso si el dominio es gmail/hotmail, si el nombre de usuario parece basura tipeada sin sentido (Keyboard Mashing), ES SPAM 100%.
2. ¿Los textos de nombre, empresa o mensaje parecen reales o secuencias aleatorias ("KGufwxLsxUL", "TnoqLsn")?

Si descubres textos o correos creados como "Keyboard Mashing" u odio, márcarlo como "SPAM". Si parece un mensaje real humano, sin importar si es corto, márcalo "VALID".

Responde ÚNICAMENTE con la palabra "VALID" (si es texto humano y correo creíble) o "SPAM" (si es basura o el correo parece falso/letras aleatorias). No escribas NADA MÁS que esa única palabra.`;

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
