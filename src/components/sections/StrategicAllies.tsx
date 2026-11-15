"use client";

import React from "react";
import Image from "next/image";
import { m, Variants } from "framer-motion";
import { STRATEGIC_ALLIES } from "@/data/allies";
import { BrandPattern } from "@/components/ui/BrandPattern";

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 20 } },
};

/**
 * Aliados comerciales (pasarelas de pago, marketplace, clientes de alianza).
 * Complementa a `PartnersEcosystem` (stack tecnológico): logos estáticos, no
 * el carrusel infinito, para no duplicar ese lenguaje visual.
 *
 * Fondo Onyx con el patrón andino-circuito del brandbook (mismo lenguaje que el
 * bloque de leasing). Los logos van sobre tarjetas blancas para que cada marca
 * conserve sus colores originales y su contraste.
 */
export const StrategicAllies = () => (
    <section className="relative isolate w-full overflow-hidden bg-[#0F1215] py-20 md:py-28">
        <BrandPattern tone="onDark" opacity={0.08} className="-z-10" />
        {/* Halo zafiro sutil detrás de los logos */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176BDE]/15 blur-[140px]"
        />
        {/* Filete superior e inferior en degradado oficial Sapphire → Neon Ice */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#176BDE]/70 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#16F3E8]/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-14 text-center md:mb-16"
            >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#176BDE]/40 bg-[#176BDE]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8FC0FF]">
                    Alianzas estratégicas
                </span>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                    Empresas que confían en <span className="text-[#6AA5F5]">nuestra integración</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                    Pagos, marketplaces, facturación y operación: integramos tus sistemas con las plataformas que mueven tu negocio.
                </p>
            </m.div>

            {/*
             * `flex-wrap` en vez de `grid`: con un número de aliados que no es
             * múltiplo parejo de las columnas, una grilla fija deja un
             * último card huérfano pegado a la izquierda. Con flex-wrap la
             * última fila se centra sola, sin importar cuántos aliados haya.
             */}
            <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="mx-auto flex max-w-[700px] flex-wrap items-center justify-center gap-5 md:gap-6"
            >
                {STRATEGIC_ALLIES.map((ally) => {
                    const card = (
                        <div className="group relative flex aspect-[3/2] w-[150px] items-center justify-center rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(23,107,222,0.35)] hover:ring-2 hover:ring-[#176BDE] sm:w-[200px] md:p-8">
                            <div className="relative h-full w-full">
                                <Image
                                    src={ally.logo}
                                    alt={ally.name}
                                    fill
                                    sizes="(max-width: 640px) 150px, 200px"
                                    className={ally.fit === "cover" ? "object-cover" : "object-contain"}
                                />
                            </div>
                        </div>
                    );

                    return (
                        <m.div key={ally.id} variants={cardVariant}>
                            {ally.href ? (
                                <a
                                    href={ally.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={ally.name}
                                    className="block"
                                >
                                    {card}
                                </a>
                            ) : (
                                card
                            )}
                        </m.div>
                    );
                })}
            </m.div>
        </div>
    </section>
);
