"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ServicesCTA = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="mt-24 bg-[#003366] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden"
        >
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-15deg] translate-x-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        ¿Listo para escalar su infraestructura?
                    </h2>
                    <p className="text-blue-100 text-xl leading-relaxed opacity-90">
                        Hable con nuestros consultores senior sobre su próximo desafío tecnológico.
                    </p>
                </div>

                <div className="flex flex-col gap-4 min-w-[280px]">
                    <AnimatePresence mode="wait">
                        {!showOptions ? (
                            <m.button
                                key="cta-main"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                onClick={() => setShowOptions(true)}
                                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-white text-[#003366] font-black px-12 py-5 rounded-2xl shadow-2xl text-lg flex items-center justify-center gap-3 transition-colors hover:bg-slate-50"
                            >
                                Agendar Consultoría
                                <ArrowRight className="w-5 h-5 text-accent" />
                            </m.button>
                        ) : (
                            <m.div
                                key="cta-options"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-3"
                            >
                                <Link 
                                    href="/#club100"
                                    className="bg-accent text-white font-black px-8 py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all text-sm uppercase tracking-wider"
                                >
                                    Protocolo Club 100
                                    <BrainCircuit size={18} />
                                </Link>
                                <Link 
                                    href="/contacto"
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-sm uppercase tracking-wider"
                                >
                                    Contacto Corporativo
                                    <ArrowRight size={18} />
                                </Link>
                                <button 
                                    onClick={() => setShowOptions(false)}
                                    className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-2 hover:text-white transition-colors"
                                >
                                    ← Volver
                                </button>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </m.div>
    );
};
