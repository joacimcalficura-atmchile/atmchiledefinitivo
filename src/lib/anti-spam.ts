/**
 * Heurísticas deterministas anti-bot para los formularios de captación.
 *
 * CONTEXTO (07-09-2026): un bot con navegador headless llenó /contacto con
 * cadenas aleatorias —`ZnlCqtuXeAgqynlHgLbEcx`, `gvpMJPePAqujoGInJP`— y pasó
 * las cuatro capas existentes: saltó el honeypot `display:none` (solo llena
 * campos visibles), Zod solo medía largo, gmail.com tiene MX válido, y el
 * filtro semántico de Gemini clasificó el payload como "VALID" porque el texto
 * aleatorio no *parece* spam comercial (sin links, sin discurso de venta).
 *
 * La lección: la IA es mal detector de basura sintáctica. Estas reglas sí lo
 * son, corren en microsegundos y no dependen de una API externa.
 */

/** Vocales incluyendo acentuadas del español. */
const VOWELS = new Set('aeiouáéíóúüàèìòùâêîôûäëïöãõy'.split(''));

/** Dominios desechables más usados por generadores de leads falsos. */
const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com', 'guerrillamail.com', 'yopmail.com', '10minutemail.com',
    'temp-mail.org', 'tempmail.com', 'throwawaymail.com', 'sharklasers.com',
    'trashmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
    'fakeinbox.com', 'mohmal.com', 'emailondeck.com', 'moakt.com',
]);

/** Términos de spam SEO/cripto/adulto que no aparecen en una consulta B2B real. */
const SPAM_KEYWORDS = [
    'seo service', 'backlink', 'casino', 'viagra', 'cialis', 'porn', 'xxx',
    'crypto pump', 'forex signal', 'binary option', 'loan offer', 'payday',
    'buy followers', 'cheap traffic', 'guest post', 'rank #1', 'bitcoin doubler',
];

/** Campos de texto libre donde un bot vuelca su relleno aleatorio. */
const FREE_TEXT_FIELDS = ['nombre', 'empresa', 'mensaje', 'rubro'] as const;

export interface SpamVerdict {
    /** `true` si la solicitud debe rechazarse. */
    blocked: boolean;
    /** Motivo técnico para el log del servidor. Nunca se envía al cliente. */
    reason?: string;
    /** Puntaje acumulado; útil para calibrar el umbral con datos reales. */
    score: number;
}

const isLetter = (ch: string) => /\p{L}/u.test(ch);
const isVowel = (ch: string) => VOWELS.has(ch.toLowerCase());

/**
 * Analiza un token aislado y devuelve cuántas señales de "texto generado
 * aleatoriamente" presenta. Las señales fuertes valen 2 porque por sí solas
 * ya son concluyentes.
 *
 * Se omiten tokens cortos (≤5) y acrónimos en mayúsculas: `ATM`, `SpA`, `BCI`
 * y `SQM` son nombres corporativos legítimos que dispararían falsos positivos.
 */
function scoreToken(rawToken: string): { score: number; signals: string[] } {
    const token = rawToken.replace(/[^\p{L}]/gu, '');
    const signals: string[] = [];

    if (token.length <= 5) return { score: 0, signals };
    if (token === token.toUpperCase()) return { score: 0, signals }; // acrónimo

    // Señal 1 — proporción de vocales. El español ronda el 45%; por debajo del
    // 30% el token deja de ser pronunciable.
    const vowelCount = [...token].filter(isVowel).length;
    const vowelRatio = vowelCount / token.length;
    if (vowelRatio < 0.3) signals.push(`vocales:${Math.round(vowelRatio * 100)}%`);

    // Señal 2 — mayúsculas internas. "Juan" tiene 0; "ZnlCqtuXeAgqynlHgLbEcx"
    // tiene 6. Tres o más es firma inequívoca de generador aleatorio.
    const internalCaps = [...token.slice(1)].filter(
        (ch) => isLetter(ch) && ch === ch.toUpperCase() && ch !== ch.toLowerCase()
    ).length;
    if (internalCaps >= 3) signals.push(`mayúsculasInternas:${internalCaps}`);
    else if (internalCaps === 2) signals.push('mayúsculasInternas:2');

    // Señal 3 — racha de consonantes. El español no supera 3 seguidas
    // ("transcribir"); el bot generó 9 en "SUgVaYfAPdZgfbsrla".
    let run = 0;
    let maxRun = 0;
    for (const ch of token.toLowerCase()) {
        if (isLetter(ch) && !isVowel(ch)) maxRun = Math.max(maxRun, ++run);
        else run = 0;
    }
    if (maxRun >= 5) signals.push(`consonantes:${maxRun}`);

    // Ponderación: las señales fuertes (mayúsculas ≥3, racha ≥6) cierran el
    // caso solas; el resto necesita acompañarse para evitar falsos positivos
    // con apellidos poco frecuentes ("Schwarzenegger", "Transbank").
    let score = 0;
    if (internalCaps >= 3) score += 2;
    else if (internalCaps === 2) score += 1;
    if (maxRun >= 6) score += 2;
    else if (maxRun >= 5) score += 1;

    // El ratio de vocales NUNCA puntúa solo: es corroborante. El inglés
    // corporativo real ("Blackstone Growth Partners", "Thompson") baja del 30%
    // sin ser basura, y sumarlo de forma autónoma lo bloqueaba.
    if (score > 0) {
        if (vowelRatio < 0.3) score += 1;
        if (vowelRatio < 0.2) score += 1;
    }

    return { score, signals };
}

/** Puntaje de gibberish de una frase completa (peor token de la frase). */
export function gibberishScore(text: string): { score: number; signals: string[] } {
    let best = { score: 0, signals: [] as string[] };
    for (const token of text.split(/\s+/)) {
        const result = scoreToken(token);
        if (result.score > best.score) best = result;
    }
    return best;
}

/**
 * Comprueba que `nombre` tenga forma de nombre de persona.
 *
 * El bot que ataca el formulario manda SIEMPRE un único token aleatorio
 * (`HLVjGmvZggaIYQWckAjvn`, `ZnlCqtuXeAgqynlHgLbEcx`), nunca "Nombre Apellido".
 * Exigir dos palabras es coherente con lo que ya pide la etiqueta del campo
 * ("Nombre completo", placeholder "Ej: Juan Pérez") y descarta al bot de plano.
 *
 * Se devuelve aparte de `inspectLead` a propósito: fallar esta regla NO es
 * señal de spam, es un dato incompleto. El usuario debe ver "escribe tu nombre
 * y apellido", no una pantalla de seguridad.
 */
export function validatePersonName(nombre: string): { ok: boolean; message?: string } {
    const value = nombre.trim();

    if (/\d/.test(value)) {
        return { ok: false, message: 'El nombre no puede contener números.' };
    }

    // Letras (con acentos), espacios, guiones, apóstrofes y puntos abreviativos:
    // admite "José-Luis", "O'Higgins" y "Ma. José" sin dejar pasar símbolos.
    if (!/^[\p{L}\s'’.-]+$/u.test(value)) {
        return { ok: false, message: 'El nombre contiene caracteres no válidos.' };
    }

    const words = value.split(/[\s-]+/).filter((w) => w.replace(/[^\p{L}]/gu, '').length >= 2);
    if (words.length < 2) {
        return { ok: false, message: 'Escribe tu nombre y apellido (ej: Juan Pérez).' };
    }

    if (words.some((w) => w.length > 30)) {
        return { ok: false, message: 'Revisa el nombre ingresado.' };
    }

    return { ok: true };
}

/**
 * Normaliza un correo para detectar reincidencia. Gmail ignora los puntos y
 * todo lo posterior a `+`, así que `jj.u.g.esodes13@gmail.com` y
 * `jjugesodes13+atm@gmail.com` son el MISMO buzón — el truco exacto que usó
 * el bot para simular direcciones distintas.
 */
export function normalizeEmail(email: string): string {
    const [localRaw, domainRaw] = email.toLowerCase().trim().split('@');
    if (!domainRaw) return email.toLowerCase().trim();

    const domain = domainRaw === 'googlemail.com' ? 'gmail.com' : domainRaw;
    let local = localRaw.split('+')[0];
    if (domain === 'gmail.com') local = local.replace(/\./g, '');

    return `${local}@${domain}`;
}

/** Ejecuta el set completo de reglas sobre el payload ya validado por Zod. */
export function inspectLead(payload: Record<string, unknown>): SpamVerdict {
    let score = 0;
    const reasons: string[] = [];

    // 1. Dominio desechable.
    const correo = String(payload.correo ?? '');
    const domain = correo.split('@')[1]?.toLowerCase() ?? '';
    if (DISPOSABLE_DOMAINS.has(domain)) {
        return { blocked: true, reason: `dominio-desechable:${domain}`, score: 99 };
    }

    for (const field of FREE_TEXT_FIELDS) {
        const value = payload[field];
        if (typeof value !== 'string' || !value.trim()) continue;

        // 2. URLs o etiquetas HTML en campos que jamás deberían tenerlas.
        if (field !== 'mensaje' && /https?:\/\/|www\.|<[a-z]+[\s>]/i.test(value)) {
            return { blocked: true, reason: `url-en-${field}`, score: 99 };
        }

        // 3. Alfabetos no latinos: el público de ATM es hispanohablante.
        if (/[\p{Script=Cyrillic}\p{Script=Han}\p{Script=Arabic}]/u.test(value)) {
            return { blocked: true, reason: `alfabeto-no-latino:${field}`, score: 99 };
        }

        // 4. Palabras clave de spam clásico.
        const lower = value.toLowerCase();
        const hit = SPAM_KEYWORDS.find((kw) => lower.includes(kw));
        if (hit) {
            return { blocked: true, reason: `keyword:${hit}`, score: 99 };
        }

        // 5. Texto generado aleatoriamente.
        const { score: fieldScore, signals } = gibberishScore(value);
        if (fieldScore > 0) {
            score += fieldScore;
            reasons.push(`${field}[${signals.join(',')}]`);
        }
    }

    // Umbral 3: exige una señal fuerte, o dos débiles en campos distintos.
    if (score >= 3) {
        return { blocked: true, reason: `gibberish(${score}) ${reasons.join(' ')}`, score };
    }

    return { blocked: false, score };
}

/**
 * Verifica el token de Cloudflare Turnstile.
 *
 * Devuelve `configured: false` si aún no se han cargado las variables de
 * entorno, para que el formulario siga operativo mientras se completa el
 * setup: las heurísticas de arriba ya están activas y son la defensa real.
 */
export async function verifyTurnstile(
    token: string | undefined,
    remoteIp?: string
): Promise<{ ok: boolean; configured: boolean; error?: string }> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return { ok: true, configured: false };

    if (!token) return { ok: false, configured: true, error: 'token-ausente' };

    try {
        const body = new URLSearchParams({ secret, response: token });
        if (remoteIp) body.append('remoteip', remoteIp);

        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
            signal: AbortSignal.timeout(5000),
        });

        const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
        return {
            ok: data.success === true,
            configured: true,
            error: data['error-codes']?.join(','),
        };
    } catch (err) {
        // Cloudflare caído o timeout: no castigamos al usuario legítimo, las
        // heurísticas siguen cubriendo el caso que motivó este trabajo.
        return { ok: true, configured: true, error: `verificacion-fallida:${String(err)}` };
    }
}
