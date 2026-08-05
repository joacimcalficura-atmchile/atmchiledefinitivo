import React from 'react';

// 1. Transbank
export const TransbankSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="200" fill="#FFFFFF" />
    {/* Wordmark "transbank." */}
    <text x="50" y="210" fontFamily="sans-serif" fontWeight="bold" fontSize="60" fill="#E6007E" letterSpacing="-2">
      transbank
    </text>
    <circle cx="355" cy="210" r="8" fill="#E6007E" />
    <circle cx="40" cy="180" r="8" fill="#00A0E0" />
    {/* Subtexto */}
    <text x="170" y="240" fontFamily="sans-serif" fontSize="16" fill="#888888" letterSpacing="1">
      APOYANDO NEGOCIOS
    </text>
  </svg>
);

// 2. Mercado Pago
export const MercadoPagoSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFE600" />
    {/* Óvalo */}
    <ellipse cx="200" cy="130" rx="80" ry="50" fill="#00A0E0" stroke="#212C9D" strokeWidth="8" />
    {/* Handshake simplificado */}
    <path d="M140,130 C160,110 180,110 200,130 C220,150 240,150 260,130" fill="none" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" />
    <path d="M140,130 C160,110 180,110 200,130 C220,150 240,150 260,130" fill="none" stroke="#212C9D" strokeWidth="6" strokeLinecap="round" />
    {/* Text */}
    <text x="200" y="240" fontFamily="sans-serif" fontWeight="bold" fontSize="50" fill="#212C9D" textAnchor="middle">mercado</text>
    <text x="200" y="295" fontFamily="sans-serif" fontWeight="bold" fontSize="50" fill="#212C9D" textAnchor="middle">pago</text>
  </svg>
);

// 3. Anthropic (AI)
export const AnthropicSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#F5F5F0" />
    <g transform="translate(100, 100)">
      <path d="M80,20 L160,180 L110,180 L95,150 L50,150 L35,180 L0,180 Z" fill="#000000" />
      <polygon points="175,20 205,20 185,180 155,180" fill="#000000" />
    </g>
  </svg>
);

// 4. AWS
export const AwsSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#232F3E" />
    <text x="200" y="220" fontFamily="sans-serif" fontWeight="bold" fontSize="100" fill="#FFFFFF" textAnchor="middle" letterSpacing="-4">aws</text>
    <path d="M 100,260 Q 200,320 290,250" fill="none" stroke="#FF9900" strokeWidth="12" strokeLinecap="round" />
    <polygon points="290,250 270,240 300,230" fill="#FF9900" />
  </svg>
);

// 5. Azure
export const AzureSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M140,80 L40,320 L140,320 Z" fill="#0089D6" />
    <path d="M220,40 L360,360 L100,360 Z" fill="#0089D6" />
    <path d="M120,200 L200,360 L80,360 Z" fill="#FFFFFF" />
  </svg>
);

// 6. Google Cloud
export const GoogleCloudSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M200,80 a70,70 0 0,0 -60,110 a60,60 0 0,0 10,120 h100 a80,80 0 0,0 0,-160 a50,50 0 0,0 -50,-70 z" fill="#4285F4" />
    <path d="M200,80 a70,70 0 0,0 -60,110 h120 a50,50 0 0,0 -60,-110 z" fill="#EA4335" />
    <path d="M140,190 a60,60 0 0,0 10,120 h60 v-120 z" fill="#FBBC05" />
    <path d="M150,310 h100 a80,80 0 0,0 80,-80 h-180 z" fill="#34A853" />
  </svg>
);

// 7. Docker
export const DockerSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M60,200 C60,300 280,300 340,180 C360,180 340,140 320,160 C300,160 300,200 280,200 Z" fill="#2496ED" />
    <g fill="#2496ED" transform="translate(100, 80)">
      <rect x="0" y="80" width="35" height="35" />
      <rect x="40" y="80" width="35" height="35" />
      <rect x="80" y="80" width="35" height="35" />
      <rect x="120" y="80" width="35" height="35" />
      <rect x="160" y="80" width="35" height="35" />
      <rect x="40" y="40" width="35" height="35" />
      <rect x="80" y="40" width="35" height="35" />
      <rect x="120" y="40" width="35" height="35" />
      <rect x="120" y="0" width="35" height="35" />
    </g>
  </svg>
);

// 8. Kubernetes
export const KubernetesSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <polygon points="200,20 340,80 340,320 200,380 60,320 60,80" fill="#326CE5" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="#FFFFFF" strokeWidth="15" />
    <g fill="#FFFFFF">
      {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((angle, i) => (
        <rect key={i} x="192" y="50" width="16" height="60" transform={`rotate(${angle} 200 200)`} />
      ))}
      {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((angle, i) => (
        <path key={i} d="M190,40 L210,40 L215,20 L185,20 Z" transform={`rotate(${angle} 200 200)`} />
      ))}
    </g>
    <polygon points="200,160 240,200 200,240 160,200" fill="#FFFFFF" />
    <polygon points="200,180 220,200 200,220 180,200" fill="#326CE5" />
  </svg>
);

// 9. OpenAI
export const OpenAiSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#10A37F" />
    <g transform="translate(200,200) scale(0.6)">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path key={i} d="M -20,-80 C -60,-160 40,-200 80,-120 C 100,-80 80,0 20,-20" fill="none" stroke="#FFFFFF" strokeWidth="25" strokeLinecap="round" transform={`rotate(${angle})`} />
      ))}
    </g>
  </svg>
);

// 10. Gemini
export const GeminiSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="33%" stopColor="#8A35F0" />
        <stop offset="66%" stopColor="#EA4335" />
        <stop offset="100%" stopColor="#FBBC05" />
      </linearGradient>
    </defs>
    <path d="M 120,200 Q 150,200 150,150 Q 150,200 200,200 Q 150,200 150,250 Q 150,200 120,200 Z" fill="url(#geminiGrad)" />
    <path d="M 80,120 Q 95,120 95,95 Q 95,120 120,120 Q 95,120 95,145 Q 95,120 80,120 Z" fill="url(#geminiGrad)" />
    <text x="210" y="215" fontFamily="sans-serif" fontSize="40" fill="#202124">Gemini</text>
  </svg>
);

// 11. NVIDIA
export const NvidiaSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M220,80 L220,220 L100,220 L100,140 C100,100 130,80 180,80 Z" fill="#76B900" />
    <path d="M120,150 C120,180 160,200 200,200 C240,200 280,180 280,150 C280,120 240,100 200,100 C160,100 120,120 120,150 Z" fill="#76B900" stroke="#FFFFFF" strokeWidth="20" />
    <path d="M140,150 C140,170 170,180 200,180 C230,180 260,170 260,150 C260,130 230,120 200,120 C170,120 140,130 140,150 Z" fill="#76B900" stroke="#FFFFFF" strokeWidth="10" />
    <text x="200" y="300" fontFamily="sans-serif" fontWeight="900" fontSize="70" fill="#000000" textAnchor="middle">NVIDIA</text>
  </svg>
);

// 12. LangChain
export const LangChainSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M200,80 C100,80 140,200 200,200 Z" fill="#1C1C1C" />
    <path d="M200,320 C300,320 260,200 200,200 Z" fill="#1C1C1C" />
    <path d="M80,200 C80,300 200,260 200,200 Z" fill="#6AB4F5" />
    <path d="M320,200 C320,100 200,140 200,200 Z" fill="#6AB4F5" />
  </svg>
);

// 13. Snowflake
export const SnowflakeSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <g fill="#29B5E8" transform="translate(200, 200)">
      <polygon points="-20,-20 0,-40 20,-20 0,0" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path key={i} d="M -10,-50 L 0,-100 L 10,-50 L 0,-70 Z" transform={`rotate(${angle})`} />
      ))}
      <text y="140" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="#29B5E8" textAnchor="middle">snowflake</text>
    </g>
  </svg>
);

// 14. Datadog
export const DatadogSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <rect x="100" y="80" width="200" height="200" fill="#632CA6" rx="40" />
    <path d="M150,140 L170,110 L190,140 L210,110 L230,140 L250,140 L250,220 L150,220 Z" fill="#FFFFFF" />
    <text x="200" y="340" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="#000000" textAnchor="middle">DATADOG</text>
  </svg>
);

// 15. Databricks
export const DatabricksSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <path d="M200,80 L300,120 L200,160 L100,120 Z" fill="none" stroke="#FF3621" strokeWidth="20" />
    <path d="M100,160 L200,200 L300,160" fill="none" stroke="#FF3621" strokeWidth="20" />
    <path d="M100,200 L200,240 L300,200" fill="none" stroke="#FF3621" strokeWidth="20" />
    <path d="M100,240 L200,280 L300,240" fill="none" stroke="#FF3621" strokeWidth="20" />
    <text x="200" y="340" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="#232C3A" textAnchor="middle">databricks</text>
  </svg>
);

// 16. CI/CD (GitHub Actions)
export const CiCdSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="160" fill="#2088FF" />
    <path d="M130,200 A 40,40 0 1,1 170,240 A 40,40 0 0,1 130,200" fill="none" stroke="#FFFFFF" strokeWidth="20" />
    <path d="M230,200 A 40,40 0 1,0 270,160 A 40,40 0 0,0 230,200" fill="none" stroke="#FFFFFF" strokeWidth="20" />
    <path d="M170,240 C 200,240 200,160 230,160" fill="none" stroke="#FFFFFF" strokeWidth="20" />
    <polygon points="270,200 300,170 270,140" fill="#FFFFFF" />
  </svg>
);

// 17. UiPath
export const UiPathSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <rect x="80" y="80" width="240" height="240" fill="none" stroke="#FA4616" strokeWidth="30" rx="40" />
    <text x="200" y="230" fontFamily="sans-serif" fontWeight="900" fontSize="90" fill="#FA4616" textAnchor="middle">Ui</text>
  </svg>
);

// 18. Zero Trust
export const ZeroTrustSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="180" fill="#1A1A1A" />
    <path d="M200,80 L280,110 L280,180 C280,250 200,320 200,320 C200,320 120,250 120,180 L120,110 Z" fill="#FFFFFF" />
    <path d="M170,180 L230,180 L230,230 L170,230 Z" fill="#1A1A1A" />
    <path d="M185,180 L185,160 C185,150 215,150 215,160 L215,180" fill="none" stroke="#1A1A1A" strokeWidth="10" />
    <path d="M120,180 L50,180 L50,220" fill="none" stroke="#FFFFFF" strokeWidth="10" />
    <circle cx="50" cy="220" r="15" fill="#FFFFFF" />
    <path d="M280,180 L350,180 L350,140" fill="none" stroke="#FFFFFF" strokeWidth="10" />
    <circle cx="350" cy="140" r="15" fill="#FFFFFF" />
    <text x="200" y="370" fontFamily="sans-serif" fontWeight="bold" fontSize="30" fill="#FFFFFF" textAnchor="middle">ZERO TRUST</text>
  </svg>
);

// 19. Next.js
export const NextJsSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="180" fill="#000000" />
    <defs>
      <linearGradient id="nextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>
    <path d="M120,280 L120,120 L260,300" fill="none" stroke="url(#nextGrad)" strokeWidth="30" />
    <path d="M280,120 L280,240" fill="none" stroke="#FFFFFF" strokeWidth="20" />
    <text x="200" y="360" fontFamily="sans-serif" fontWeight="bold" fontSize="40" fill="#FFFFFF" textAnchor="middle">Next.js</text>
  </svg>
);

// 20. GraphQL
export const GraphQlSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <polygon points="200,60 330,135 330,285 200,360 70,285 70,135" fill="none" stroke="#E10098" strokeWidth="15" strokeLinejoin="round" />
    <polygon points="200,120 280,260 120,260" fill="none" stroke="#E10098" strokeWidth="15" strokeLinejoin="round" />
    <path d="M200,60 L200,120 M70,135 L120,260 M330,135 L280,260 M70,285 L120,260 M330,285 L280,260 M200,360 L200,260" fill="none" stroke="#E10098" strokeWidth="15" />
    {[
      [200,60], [330,135], [330,285], [200,360], [70,285], [70,135]
    ].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="25" fill="#E10098" />)}
  </svg>
);

// 21. Vercel
export const VercelSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    <polygon points="200,80 320,280 80,280" fill="#000000" />
    <text x="200" y="350" fontFamily="sans-serif" fontWeight="900" fontSize="60" fill="#000000" textAnchor="middle">Vercel</text>
  </svg>
);

// 22. SII (Servicio de Impuestos Internos)
export const SiiSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="#FFFFFF" />
    {/* S */}
    <path d="M60,180 C60,120 120,120 120,160 C120,200 60,200 60,240 C60,280 120,280 140,240 L140,140" fill="none" stroke="#005A9C" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
    {/* ii */}
    <path d="M140,140 L140,260" fill="none" stroke="#005A9C" strokeWidth="25" strokeLinecap="round" />
    <path d="M190,140 L190,260" fill="none" stroke="#005A9C" strokeWidth="25" strokeLinecap="round" />
    <circle cx="140" cy="90" r="15" fill="#F37021" />
    <circle cx="190" cy="90" r="15" fill="#F37021" />
    {/* Texto gris */}
    <text x="230" y="150" fontFamily="sans-serif" fontWeight="bold" fontSize="25" fill="#666666">Servicio de</text>
    <text x="230" y="185" fontFamily="sans-serif" fontWeight="bold" fontSize="25" fill="#666666">Impuestos</text>
    <text x="230" y="220" fontFamily="sans-serif" fontWeight="bold" fontSize="25" fill="#666666">Internos</text>
  </svg>
);
