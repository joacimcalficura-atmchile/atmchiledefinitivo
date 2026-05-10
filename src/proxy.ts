import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory Rate Limiter (Note: In production, use Redis/Upstash for multi-instance consistency)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 50; // peticiones por minuto por IP

export function proxy(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();

    // 1. RATE LIMITING LOGIC (Simplified)
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateData.count = 0;
        rateData.lastReset = now;
    }
    rateData.count++;
    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS) {
        return NextResponse.json({ 
            error: "Rate limit exceeded" 
        }, { status: 429 });
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
