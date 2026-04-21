"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchitectureModal } from "@/components/sections/ArchitectureModal";
import { ServicesCTA } from "@/components/sections/ServicesCTA";
import { solutions } from "@/data/services";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Página Principal ──────────────────────────────────────────────────────────
export default function ServiciosPage() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] selection:bg-[#0047AB] selection:text-white pb-32">
            <AnimatePresence>{activeModal && <ArchitectureModal id={activeModal} onClose={() => setActiveModal(null)} />}</AnimatePresence>

            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 pt-32">
                {/* Hero */}
                <header className="mb-20 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/5 text-[#0047AB] text-xs font-black uppercase tracking-[0.2em] border border-[#0047AB]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" /> Soluciones B2B
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                        ATM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">Services</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">Ecosistemas tecnológicos de alto impacto diseñados para la escalabilidad corporativa.</p>
                </header>

                {/* Grid */}
                <m.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item) => (
                        <m.div key={item.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -5 }} className="group bg-white border border-slate-200 p-10 rounded-[2rem] flex flex-col justify-between transition-all hover:shadow-2xl">
                            <div>
                                <div className="mb-8 flex items-center justify-between">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[#0047AB] group-hover:bg-[#0047AB] group-hover:text-white transition-colors duration-300"><item.Icon className="w-7 h-7" /></div>
                                    <span className="text-[10px] font-black text-slate-300 tracking-[0.25em] uppercase">{item.num}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 mb-6 leading-relaxed text-sm">{item.desc}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {item.tags.map(tag => <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg">{tag}</span>)}
                                </div>
                            </div>
                            {item.ctaHref ? (
                                <Link href={item.ctaHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#0047AB] group/link">{item.cta} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" /></Link>
                            ) : item.hasModal ? (
                                <button onClick={() => setActiveModal(item.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#0047AB] group/btn">{item.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></button>
                            ) : (
                                <span className="text-sm font-bold text-slate-300 flex items-center gap-2">{item.cta} <ArrowRight className="w-4 h-4" /></span>
                            )}
                        </m.div>
                    ))}
                </m.div>

                <ServicesCTA />
            </m.div>
        </div>
    );
}

