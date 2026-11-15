/**
 * Patrón complementario del brandbook ATM (circuito + motivos andinos).
 *
 * Capa decorativa: va detrás del contenido, no recibe clics y queda oculta a
 * lectores de pantalla. Las opacidades están acotadas para no restar contraste
 * al texto: en fondos claros el patrón oscuro a ≤6 %, en fondos oscuros o azul
 * zafiro el patrón claro a ≤12 %.
 */
type Tone = "onLight" | "onDark";

const SOURCES: Record<Tone, string> = {
    onLight: "/images/brand/patron-atm-oscuro.webp",
    onDark: "/images/brand/patron-atm-claro.webp",
};

const DEFAULT_OPACITY: Record<Tone, number> = { onLight: 0.05, onDark: 0.1 };

export function BrandPattern({
    tone,
    opacity,
    size = 420,
    className = "",
}: {
    tone: Tone;
    opacity?: number;
    /** Lado de cada baldosa en px. */
    size?: number;
    className?: string;
}) {
    const max = tone === "onLight" ? 0.06 : 0.12;
    const value = Math.min(opacity ?? DEFAULT_OPACITY[tone], max);
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${className}`}
            style={{
                backgroundImage: `url(${SOURCES[tone]})`,
                backgroundRepeat: "repeat",
                backgroundSize: `${size}px ${size}px`,
                opacity: value,
            }}
        />
    );
}
