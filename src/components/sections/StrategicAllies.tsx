"use client";

import React from "react";
import Image from "next/image";
import { m, Variants } from "framer-motion";
import { STRATEGIC_ALLIES } from "@/data/allies";

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
 */
export const StrategicAllies = () => (
    <section className="relative w-full bg-[#FAFAFA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-14 text-center md:mb-16"
            >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#176BDE]/30 bg-[#176BDE]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#176BDE]">
                    ✦ Alianzas Estratégicas
                </span>
                <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
                    Empresas que confían en <span className="text-[#176BDE]">nuestra integración</span>
                </h2>
            </m.div>

            {/*
             * `flex-wrap` en vez de `grid`: con un número de aliados que no es
             * múltiplo parejo de las columnas (hoy 5), una grilla fija deja un
             * último card huérfano pegado a la izquierda. Con flex-wrap la
             * última fila se centra sola, sin importar cuántos aliados haya.
             */}
            <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-wrap items-center justify-center gap-5 md:gap-6"
            >
                {STRATEGIC_ALLIES.map((ally) => {
                    const card = (
                        <div className="flex aspect-[3/2] w-[150px] items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#176BDE]/30 hover:shadow-[0_12px_30px_rgba(23,107,222,0.12)] sm:w-[200px] md:p-8">
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
