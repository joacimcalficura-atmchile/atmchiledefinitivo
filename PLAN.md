# PLAN.md: Estructura de la Plataforma Enterprise

## 1. Arquitectura de Software (The "Senior" Stack)
Para asegurar que el "F12" sea impecable, utilizaremos:
- **Framework**: Next.js 14+ (App Router) para máxima eficiencia en SEO y carga.
- **Lenguaje**: TypeScript Estricto (Interfaces complejas, tipos genéricos, nada de any).
- **Estilo**: Tailwind CSS + Framer Motion (para ese toque "vanguardista" de animaciones fluidas).
- **Seguridad de Capa**: Zod para validación de datos en tiempo real y Lucia Auth o NextAuth con configuración de sesiones seguras (HttpOnly Cookies).

## 2. Estructura de Directorios (Limpia y Escalable)
```text
src/
├── app/              # Rutas y Server Components (Next.js 14)
├── components/       # UI Atómica (shadcn/ui customizado con Glassmorphism)
│   ├── ui/           # Componentes base (Botones, inputs)
│   ├── shared/       # Navbar, Footer, Layouts de Socio 360
│   └── animations/   # Wrappers de Framer Motion
├── lib/              # Utilidades de seguridad, config de BD, validaciones Zod
├── hooks/            # Lógica reutilizable (ej. usePartnerStatus)
├── services/         # Llamadas a API y lógica de negocio (Fuera del alcance del cliente)
└── styles/           # Variables de marca (Slate Gray, Cobalt Blue)
```

## 3. Hitos de Implementación (Fase Inicial)
- **[Core]** Configuración de `next.config.js` con Headers de Seguridad (CSP, X-Frame-Options, HSTS).
- **[Design System]** Creación del `ThemeProvider` con el estilo "Glass-Light" (fondos claros, bordes translúcidos, desenfoque de fondo).
- **[Partner-Landing]** Hero section con el logo `< ATM />` y animación de entrada tipo "Socio Estratégico".
- **[Security]** Implementación de un middleware que bloquee intentos de fuerza bruta o escaneos básicos de vulnerabilidades.

## 🛡️ Auditoría de Seguridad: El "Efecto F12"
Para que los TI de tus clientes nos respeten, implementaremos:
- **Ofuscación en Producción**: Los nombres de las funciones y variables internas estarán minificados, pero la estructura del DOM será semántica (usando etiquetas ARIA para accesibilidad).
- **No fugas en el Bundle**: Verificaremos que las variables de entorno (`.env`) y la lógica crítica de base de datos nunca lleguen al cliente.
- **Consola Limpia**: Removeremos automáticamente todos los `console.log` en el build de producción mediante un plugin de Webpack/Turbopack.
