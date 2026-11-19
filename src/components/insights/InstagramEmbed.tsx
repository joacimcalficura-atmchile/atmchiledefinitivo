"use client";

import { useState } from "react";
import { ExternalLink, Instagram } from "lucide-react";

/**
 * Fachada para una publicación oficial de Instagram.
 *
 * Hasta que el lector pulsa «Ver publicación» no se carga nada de Meta (ni
 * scripts ni cookies): solo una tarjeta con el crédito y el enlace. Al pulsar
 * se monta el iframe oficial `/embed` de Instagram, que es la forma de mostrar
 * material de prensa/RRSS respetando los derechos de su autor.
 *
 * Requiere `frame-src https://www.instagram.com` en la CSP (next.config.ts).
 */
export const InstagramEmbed = ({
    url,
    account,
    caption,
}: {
    url: string;
    account: string;
    caption: string;
}) => {
    const [loaded, setLoaded] = useState(false);
    const clean = url.replace(/\/?(\?.*)?$/, "/");
    const embedSrc = `${clean}embed/captioned/`;

    return (
        <figure className="my-10">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {loaded ? (
                    <iframe
                        src={embedSrc}
                        title={`Publicación de Instagram de ${account}`}
                        loading="lazy"
                        className="mx-auto block h-[640px] w-full max-w-[540px] border-0"
                        style={{ pointerEvents: "auto" }}
                    />
                ) : (
                    <div className="relative isolate flex flex-col items-center gap-4 overflow-hidden bg-[#0F1215] px-6 py-12 text-center">
                        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[#176BDE]/30 blur-[100px]" />
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#176BDE] to-[#16F3E8] text-white">
                            <Instagram aria-hidden className="h-7 w-7" />
                        </span>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#16F3E8]">
                            Publicación oficial · {account}
                        </p>
                        <p className="max-w-md text-[15px] leading-relaxed text-slate-300">{caption}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setLoaded(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#176BDE] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1259BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16F3E8]"
                            >
                                Ver publicación aquí
                            </button>
                            <a
                                href={clean}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                            >
                                Abrir en Instagram
                                <ExternalLink aria-hidden className="h-4 w-4" />
                            </a>
                        </div>
                        <p className="text-xs text-slate-500">
                            Al cargarla, Instagram (Meta) puede usar sus propias cookies.
                        </p>
                    </div>
                )}
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">
                Fuente: {account} en Instagram.{" "}
                <a href={clean} target="_blank" rel="noopener noreferrer" className="font-medium text-[#176BDE] underline underline-offset-4">
                    Ver original
                </a>
            </figcaption>
        </figure>
    );
};
