"use client";

import React from "react";
import Link from "next/link";
import { m, Variants } from "framer-motion";
import { ArrowRight, Check, Clapperboard } from "lucide-react";
import { DEVELOPED_PRODUCTS, type DevelopedProduct } from "@/data/products";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 } },
};

/** Marco visual cuando el producto aún no tiene demo grabada. */
const DemoPending = ({ product }: { product: DevelopedProduct }) => (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden bg-[#0A2E6B]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,#8FC0FF_1px,transparent_1px),linear-gradient(to_bottom,#8FC0FF_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16F3E8]/10 blur-[90px]" />

        <product.Icon className="relative z-10 mb-4 size-12 text-[#8FC0FF]" strokeWidth={1.5} />
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
            <Clapperboard size={13} />
            Demo en grabación
        </span>
        <p className="relative z-10 mt-4 max-w-xs px-6 text-center text-xs font-medium leading-relaxed text-[#8FC0FF]">
            Solicite una sesión en vivo con el equipo para recorrer los módulos en funcionamiento.
        </p>
    </div>
);

const ProductCard = ({ product }: { product: DevelopedProduct }) => {
    const { demo } = product;

    return (
        <m.article
            variants={cardVariant}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-[#176BDE]/50"
        >
            {/* Media: demo real o placeholder de marca */}
            <div className="relative border-b border-white/10">
                {demo.youtubeId && demo.poster ? (
                    <YouTubeFacade
                        videoId={demo.youtubeId}
                        title={`${product.name} — demo del producto`}
                        poster={demo.poster}
                        posterAlt={demo.posterAlt}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                ) : (
                    <DemoPending product={product} />
                )}
            </div>

            <div className="flex flex-grow flex-col p-7 md:p-9">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-xl border border-[#176BDE]/30 bg-[#176BDE]/15 text-[#4D9BFF]">
                            <product.Icon className="size-5" />
                        </span>
                        <div>
                            <h3 className="text-xl font-black tracking-tight text-white md:text-2xl">{product.name}</h3>
                            <p className="text-xs font-semibold text-[#8FC0FF]">{product.subtitle}</p>
                        </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/70">
                        {product.status}
                    </span>
                </div>

                <p className="mb-7 text-sm leading-relaxed text-blue-100/70">{product.description}</p>

                <ul className="mb-7 space-y-3">
                    {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#16F3E8]/15 text-[#16F3E8]">
                                <Check size={12} strokeWidth={3} />
                            </span>
                            <span className="text-sm font-medium text-blue-50/90">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto space-y-5 border-t border-white/10 pt-6">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <span className="block text-2xl font-black text-[#16F3E8]">{product.metric.value}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                                {product.metric.label}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-white/40">
                                Stack
                            </span>
                            <p className="text-xs font-semibold italic text-white/60">{product.techStack.join(" / ")}</p>
                        </div>
                    </div>

                    <Link
                        href={`/contacto?producto=${product.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#176BDE]"
                    >
                        Agendar demo de {product.name}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </m.article>
    );
};

/**
 * Productos propios de ATM: software ya construido e integrado, a diferencia
 * del bloque de servicios (capacidades). Los datos salen de `@/data/products`.
 */
export const DevelopedProducts = () => (
    <section id="productos" className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
        <div className="pointer-events-none absolute left-0 top-0 size-96 rounded-full bg-[#176BDE]/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-[#16F3E8]/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: smoothEase }}
                className="mb-16 max-w-3xl md:mb-20"
            >
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#4D9BFF]">
                    Productos desarrollados
                </p>
                <h2 className="mb-6 text-4xl font-black leading-tight text-white lg:text-5xl">
                    No es un portafolio de promesas: <br className="hidden md:block" />
                    <span className="text-[#176BDE] drop-shadow-[0_0_15px_rgba(23,107,222,0.5)]">es software corriendo</span>
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-blue-200/80">
                    Dos plataformas construidas por nuestro equipo e integradas en operaciones reales: ATM Agent, el CRM
                    que califica cada lead con IA, y ATM ERP, que unifica el dato maestro. Vea la demo, no el folleto.
                </p>
            </m.div>

            <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid gap-8 lg:grid-cols-2"
            >
                {DEVELOPED_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </m.div>
        </div>
    </section>
);
