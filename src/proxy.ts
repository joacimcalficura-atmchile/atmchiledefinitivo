import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Rate limiter best-effort, en memoria y POR INSTANCIA.
 *
 * LIMITACIÓN CONOCIDA: en Vercel cada instancia serverless/edge tiene su propio
 * Map, así que el límite real es MAX_REQUESTS × nº de instancias activas. Sirve
 * para frenar escaneos triviales, NO es una defensa contra un atacante decidido
 * ni contra fuerza bruta distribuida. Para eso hace falta un contador compartido
 * (Upstash Redis / Vercel KV) — ver README.
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 50; // peticiones por minuto por IP (navegación general)
const MAX_TRACKED_IPS = 10_000; // techo de memoria

/**
 * Los endpoints de captación llevan su propio cupo, mucho más estrecho: nadie
 * envía cinco formularios de contacto legítimos en un minuto, pero el límite
 * general de 50 le dejaba margen de sobra a un bot para insistir.
 */
const SENSITIVE_PATHS = ['/api/submit-lead', '/api/forms'];
const MAX_REQUESTS_SENSITIVE = 5;

/**
 * En Vercel, `x-vercel-forwarded-for` lo inyecta la plataforma y el cliente no
 * puede falsificarlo. `x-forwarded-for` sí es falsificable si la petición no
 * pasa por el proxy de Vercel, por eso queda solo como fallback local.
 */
function getClientIp(request: NextRequest): string {
    return (
        request.headers.get('x-vercel-forwarded-for') ??
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        '127.0.0.1'
    );
}

/** Evita que el Map crezca sin límite (fuga de memoria en instancias longevas). */
function evictStaleEntries(now: number) {
    for (const [key, entry] of rateLimitMap) {
        if (now - entry.lastReset > RATE_LIMIT_WINDOW) {
            rateLimitMap.delete(key);
        }
    }
    // Si tras limpiar sigue desbordado, soltamos el Map entero antes que agotar RAM.
    if (rateLimitMap.size > MAX_TRACKED_IPS) {
        rateLimitMap.clear();
    }
}

export function proxy(request: NextRequest) {
    const ip = getClientIp(request);
    const now = Date.now();

    evictStaleEntries(now);

    // Los formularios se contabilizan en su propio cubo (`ip|form`) para que la
    // navegación normal del visitante no consuma el cupo estricto, ni al revés.
    const isSensitive = SENSITIVE_PATHS.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );
    const key = isSensitive ? `${ip}|form` : ip;
    const limit = isSensitive ? MAX_REQUESTS_SENSITIVE : MAX_REQUESTS;

    // 1. RATE LIMITING
    const rateData = rateLimitMap.get(key) ?? { count: 0, lastReset: now };
    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateData.count = 0;
        rateData.lastReset = now;
    }
    rateData.count++;
    rateLimitMap.set(key, rateData);

    if (rateData.count > limit) {
        const retryAfter = Math.ceil(
            (RATE_LIMIT_WINDOW - (now - rateData.lastReset)) / 1000
        );
        return NextResponse.json(
            { error: 'Rate limit exceeded' },
            {
                status: 429,
                headers: {
                    'Retry-After': String(Math.max(retryAfter, 1)),
                    'X-ATM-Sentinel': 'Blocked/RateLimit',
                },
            }
        );
    }

    // 2. SECURITY SIGNALING
    const response = NextResponse.next();
    response.headers.set('X-ATM-Sentinel', 'Active');

    return response;
}

export default proxy;

export const config = {
    matcher: [
        /*
         * Protegemos TODO, incluyendo API, excepto estáticos
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
