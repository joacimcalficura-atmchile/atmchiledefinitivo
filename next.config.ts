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
  async redirects() {
    return [
      {
        source: '/profepyme',
        destination: '/insights',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
