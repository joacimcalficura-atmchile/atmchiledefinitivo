"use client";

import { m } from "framer-motion";

export const Hero = () => {
    // Variantes para orquestar la aparición de elementos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Cada hijo aparece 0.2s después
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        },
    };

    return (
        <section
            className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-brand-light"
            aria-label="Presentación de ATM Chile - Partner Tecnológico Estratégico 360"
        >
            {/* Decoración de fondo: Elipses sutiles para profundidad en Z-index */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cobalt/5 rounded-full blur-[120px]"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-accent/10 rounded-full blur-[100px]"
                aria-hidden="true"
            />

            <m.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 text-center max-w-5xl"
            >
                {/* Badge de Socio 360 */}
                <m.span
                    variants={itemVariants}
                    className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-brand-cobalt bg-brand-cobalt/10 border border-brand-cobalt/20 rounded-full"
                >
                    Partner Estratégico 360
                </m.span>

                {/* El Logo / Headline Principal */}
                <m.h1
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8"
                >
                    <span className="text-brand-cobalt">&lt;</span> ATM <span className="text-brand-cobalt">/&gt;</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-brand-cobalt to-slate-800">
                        Visión Estratégica
                    </span>
                </m.h1>

                {/* Subtexto de Asesoría */}
                <m.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-brand-slate mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Transformamos empresas a través de <strong>IA, Cloud y RPA</strong>, gestionando el mejor talento tecnológico bajo estándares de ciberseguridad mundial.
                </m.p>

                {/* CTAs en Glassmorphism (Aislado de mutación global de DOM) */}
                <m.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-brand-cobalt text-white rounded-xl font-bold shadow-lg shadow-brand-cobalt/20 hover:scale-105 transition-transform active:scale-95 text-lg">
                        Potenciar Operación 360
                    </button>
                    <button className="px-8 py-4 glass text-slate-700 rounded-xl font-bold hover:bg-white/80 transition-all text-lg">
                        Conoce Club 100
                    </button>
                </m.div>
            </m.div>
        </section>
    );
};
