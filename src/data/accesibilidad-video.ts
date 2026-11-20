/**
 * Accesibilidad de los videos del sitio para personas sordas.
 *
 * SUBTÍTULOS DE REELS
 * Cada reel de Instagram se identifica por su id de la API (el mismo que usa
 * `src/lib/instagram.ts`). Para agregarle subtítulos:
 *   1. Guarda el archivo WebVTT en `public/subtitulos/<id>.vtt`.
 *   2. Agrega aquí la línea `"<id>": "/subtitulos/<id>.vtt"`.
 * El reproductor del sitio los muestra activados por defecto.
 *
 * VIDEO EN LENGUA DE SEÑAS CHILENA (LSCh)
 * Lo graba ATM con una persona intérprete o sorda señante. Mientras
 * `LSCH_VIDEO` sea `null`, el espacio no se muestra en el sitio. Para
 * publicarlo:
 *   1. Sube el MP4 (y si quieres, un póster JPG y subtítulos VTT) a
 *      `public/lengua-de-senas/`.
 *   2. Completa `LSCH_VIDEO` con sus rutas y una descripción de lo que dice.
 */

export const REEL_SUBTITLES: Readonly<Record<string, string>> = {};

export type LschVideo = {
    /** MP4 en `public/lengua-de-senas/`. */
    readonly src: string;
    /** Póster JPG o WebP (opcional). */
    readonly poster?: string;
    /** Subtítulos WebVTT en español, para quien no maneja LSCh (opcional). */
    readonly captions?: string;
    /** Resumen de lo que explica el video, en texto. */
    readonly summary: string;
    /** Duración legible, por ejemplo «2 min». */
    readonly duration?: string;
};

export const LSCH_VIDEO: LschVideo | null = null;
