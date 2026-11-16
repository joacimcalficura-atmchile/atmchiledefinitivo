"use client";
import React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BrandPattern } from "@/components/ui/BrandPattern";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { SITE } from "@/data/site";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hola ATM, les escribo desde atmchile.com/servicios. Quiero conversar sobre un proyecto."
)}`;

/**
 * Cierre de /servicios: bloque Sapphire con el patrón del brandbook (mismo
 * lenguaje que el cierre de /leasing-de-software y el Club 100 de la home).
 * Texto blanco sobre #176BDE (contraste AA para texto grande y negrita).
 */
export const ServicesCTA = () => (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8" style={{ background: "linear-gradient(135deg, #176BDE 0%, #176BDE 55%, #0E4FA5 100%)" }}>
        <BrandPattern tone="onDark" opacity={0.12} className="-z-10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#16F3E8]/15 blur-[120px]" />
        <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left"
        >
            <div className="max-w-2xl">
                <p className="mb-4 font-slab text-sm font-medium uppercase tracking-[0.2em] text-white/85">A tu medida</p>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                    Conversemos tu próximo desafío tecnológico
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/90">
                    En un diagnóstico revisamos tu operación y te proponemos alcance, plazos y la mejor forma de financiarlo.
                </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:min-w-[300px]">
                <Link
                    href="/contacto"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#0E4FA5] shadow-[0_14px_40px_rgba(15,18,21,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8E8E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Agenda un diagnóstico
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <WhatsAppLink
                    href={whatsappHref}
                    boton="servicios-cierre"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                >
                    <MessageCircle className="h-5 w-5" aria-hidden />
                    WhatsApp {SITE.whatsappDisplay}
                </WhatsAppLink>
            </div>
        </m.div>
    </section>
);
