import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory Rate Limiter (Note: In production, use Redis/Upstash for multi-instance consistency)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 50; // peticiones por minuto por IP

export function proxy(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();
    const url = request.nextUrl.pathname;

    // 1. RATE LIMITING LOGIC
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateData.count = 0;
        rateData.lastReset = now;
    }
    rateData.count++;
    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS) {
        return NextResponse.json({ 
            status: "SECURITY_BLOCK",
            message: "Has excedido el límite de peticiones. Tu actividad ha sido registrada para análisis forense." 
        }, { 
            status: 429,
            headers: { 'X-ATM-Security': 'Rate-Limit-Exceeded' }
        });
    }

    // 2. BASIC IDS (Intrusion Detection System) - Detect common malicious payloads
    const searchParams = request.nextUrl.search;
    const bodyPreview = request.headers.get('content-length') ? "check-required" : "";
    const maliciousPatterns = [/<script>/i, /union select/i, /drop table/i, /--/i, /OR 1=1/i];
    
    if (maliciousPatterns.some(p => p.test(searchParams))) {
        console.warn(`[SECURITY ALERT] Attack pattern detected from IP: ${ip} on URL: ${url}`);
        return NextResponse.json({ 
            status: "SENTINEL_TRIGGERED",
            message: "ATM Sentinel ha detectado un intento de intrusión. Tu sesión ha sido terminada y reportada." 
        }, { 
            status: 403,
            headers: { 'X-ATM-Action': 'Counter-Attack-Signaling' }
        });
    }

    // 3. SECURITY SIGNALING HEADERS
    const response = NextResponse.next();
    response.headers.set('X-ATM-Sentinel', 'Active-Monitoring');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
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
