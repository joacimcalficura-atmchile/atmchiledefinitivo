import type { NextConfig } from "next";

// Políticas de Seguridad de Contenido (CSP)
// Restringe de dónde se pueden cargar scripts, imágenes y estilos.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://unpkg.com blob:;
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https: wss: https://prod.spline.design https://va.vercel-scripts.com;
  frame-ancestors 'none';
`;

const securityHeaders = [
  // 1. Fuerza la conexión segura por HTTPS (HSTS) durante 2 años.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  // 2. Previene Clickjacking bloqueando que tu web se incruste en iframes de terceros.
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // 3. Previene que el navegador "adivine" el tipo de archivo (MIME Sniffing), forzando el declarado.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // 4. Controla cuánta información se envía cuando el usuario hace clic en un enlace saliente.
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // 5. Bloquea el acceso a hardware (cámara, micrófono, ubicación) por defecto. (Zero Trust)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  // 6. Inyecta la Política de Seguridad de Contenido definida arriba.
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig: NextConfig = {
  // Elimina la cabecera "x-powered-by: Next.js" (Seguridad por oscuridad)
  // No le damos pistas a los atacantes sobre nuestro stack.
  poweredByHeader: false,

  // Inyectamos las cabeceras de seguridad en todas las rutas de la app
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
};

export default nextConfig;
