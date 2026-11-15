import type { NextConfig } from "next";

// Políticas de Seguridad de Contenido (CSP) - Hardened Version
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://unpkg.com blob:;
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https: wss: https://prod.spline.design https://va.vercel-scripts.com;
  frame-src 'self' https://www.youtube-nocookie.com https://vercel.live;
  frame-ancestors 'self' https://vercel.com;
`;

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // Active Defense Signaling
  {
    key: 'X-Powered-By',
    value: 'ATM-Sentinel-Defense-System'
  }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Mantenemos esto desactivado para asegurar que solo código "Senior" y sin errores llegue a producción
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    // Consola limpia en producción: se conservan error/warn para observabilidad en el servidor
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    // AVIF primero (≈20-30 % más liviano que WebP); los hero son PNG de 1-2 MB.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/profepyme',
        destination: '/insights',
        permanent: true,
      },
      // URLs de la web anterior que Google aún tiene indexadas.
      {
        source: '/services/:path*',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/insights',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
