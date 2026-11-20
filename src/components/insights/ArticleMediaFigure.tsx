import type { ArticleMedia } from "@/data/insights";

/**
 * Imagen de terceros con crédito visible y enlace a la fuente original.
 * Se usa <img> plano (no next/image) porque la imagen vive en el dominio de su
 * autor: no la copiamos ni la reprocesamos.
 */
export const ArticleMediaFigure = ({
    media,
    priority = false,
    className = "",
}: {
    media: ArticleMedia;
    priority?: boolean;
    className?: string;
}) => (
    <figure className={`my-10 ${className}`}>
        <div
            className="relative w-full overflow-hidden rounded-2xl bg-[#0F1215] shadow-[0_20px_50px_rgba(15,18,21,0.15)]"
            style={{ aspectRatio: media.ratio ?? "16 / 9" }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={media.src}
                alt={media.alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
        <figcaption className="mt-3 text-sm leading-relaxed text-slate-500">
            {media.caption && <span className="text-[#3F3D44]">{media.caption} </span>}
            Crédito:{" "}
            <a
                href={media.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#176BDE] underline underline-offset-4"
            >
                {media.credit}
            </a>
        </figcaption>
    </figure>
);
