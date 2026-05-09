import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // Basic Rate Limiting / Brute Force Prevention logic block
    response.headers.set('x-middleware-cache', 'no-cache');

    // To prevent basic automated scanning
    // const userAgent = request.headers.get('user-agent') || '';
    // if (userAgent.includes('curl') || userAgent.includes('python-requests')) {
    //     return new NextResponse('Forbidden', { status: 403 });
    // }

    return response;
}

export default proxy;

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
