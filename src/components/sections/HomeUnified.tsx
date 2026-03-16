"use client";
import React from "react";
import { m, Variants } from "framer-motion";
import Link from "next/link";
import { BadgeCheck, Layers, Users, Bot, LineChart, ShieldCheck, Cloud, Box, Check, ArrowRight } from "lucide-react";
import { PartnersEcosystem } from "./PartnersEcosystem";
import { AdmissionAgent } from "./AdmissionAgent";

// Premium Easing Curves
const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Apple-like smooth ease out

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
        }
    }
};

const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity
        }
    }
};

export const HomeUnified = () => {
    return (
        <React.Fragment>
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-primary">
                {/* Ocultamos el scroll horizontal para evitar desbordes */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(0,51,102,0.05)_0%,rgba(245,247,248,0)_100%)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: smoothEase }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent border border-white/5 text-xs font-bold mb-6">
                                <BadgeCheck size={16} />
                                <span>&lt; ATM /&gt; | Partner Tecnológico Estratégico 360</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
                                Capacidades de partner: <span className="text-accent glow-text">Visión Tecnológica 360°</span>
                            </h1>
                            <p className="text-lg text-blue-200/80 leading-relaxed mb-10 max-w-xl">
                                No implementamos tecnología. Transformamos negocios mejorando el valor y la eficiencia a través de una integración estratégica total.
                            </p>
                            <m.div 
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: smoothEase }}
                            >
                                <Link href="/servicios" className="neon-button text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform text-center flex items-center justify-center">
                                    Potenciar Operación 360
                                </Link>
                                <a href="#club100" className="bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors text-center flex items-center justify-center">
                                    Descubrir el Club 100
                                </a>
                            </m.div>
                        </m.div>
                        <m.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: smoothEase }}
                            className="relative"
                        >
                            <m.div 
                                variants={floatAnimation}
                                initial="initial"
                                animate="animate"
                                className="aspect-square rounded-3xl overflow-hidden shadow-2xl glass-card-premium"
                            >
                                <img
                                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                                    alt="Modern corporate team collaborating in a bright office"
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                />
                                {/* Overlay de color para integrar con el fondo oscuro */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#02121d]/80 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl animate-pulse">
                                        <span className="text-4xl font-black text-white tracking-tighter opacity-70">&lt; /&gt;</span>
                                    </div>
                                </div>
                            </m.div>
                            <m.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-8 glass-3d p-6 rounded-2xl max-w-xs z-10 shadow-2xl"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 bg-primary/40 rounded-lg border border-white/10">
                                        <Layers size={24} className="text-accent icon-3d" />
                                    </div>
                                    <span className="font-bold text-white">Eficiencia Operativa</span>
                                </div>
                                <p className="text-xs text-blue-200/80">Optimizamos procesos críticos con tecnología de última generación.</p>
                            </m.div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">Ecosistema de Soluciones</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Nuestros Servicios Estratégicos</h3>
                    </m.div>

                    <m.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {/* Highlighted Card: Talento Senior */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group relative p-8 rounded-2xl neon-border bg-white shadow-xl depth-3d flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 text-white text-[10px] font-bold px-2 py-1 rounded bg-accent uppercase tracking-wider">Most Requested</div>
                            <div className="size-14 bg-accent rounded-xl flex items-center justify-center text-white mb-6">
                                <Users size={32} className="icon-3d text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-blue mb-4">Talento Senior On-Demand</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Células ágiles de programadores subcontratados bajo supervisión técnica senior.
                            </p>
                            <div className="pt-4 border-t border-primary/10 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">Agile / Senior Management / High Performance Teams</p>
                            </div>
                            <Link href="/talento" className="mt-6 flex items-center justify-center w-full py-3 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue font-bold rounded-lg transition-colors text-sm">
                                Ver equipo
                            </Link>
                        </m.div>

                        {/* IA & Automatización */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100 bg-background-light shadow-sm hover:shadow-xl hover:bg-white transition-all depth-3d flex flex-col h-full"
                        >
                            <div className="size-14 bg-slate-100 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Bot size={32} className="icon-3d group-hover:filter-none" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">IA &amp; Automatización</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Despliegue de agentes inteligentes para optimizar la toma de decisiones.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">Python / PyTorch / LangChain</p>
                            </div>
                            <Link href="/servicios" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-600 font-bold rounded-lg transition-colors text-sm">
                                Explorar
                            </Link>
                        </m.div>

                        {/* BI & Data Strategy */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100 bg-background-light shadow-sm hover:shadow-xl hover:bg-white transition-all depth-3d flex flex-col h-full"
                        >
                            <div className="size-14 bg-slate-100 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <LineChart size={32} className="icon-3d group-hover:filter-none" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">BI &amp; Data Strategy</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Transformamos datos crudos en activos estratégicos accionables.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">PowerBI / SQL / Snowflake</p>
                            </div>
                        </m.div>

                        {/* Ciberseguridad 360 */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100 bg-background-light shadow-sm hover:shadow-xl hover:bg-white transition-all depth-3d flex flex-col h-full"
                        >
                            <div className="size-14 bg-slate-100 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <ShieldCheck size={32} className="icon-3d group-hover:filter-none" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Ciberseguridad 360</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Evaluación estratégica y protección de infraestructuras críticas.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">ISO 27001 / Pentesting / Zero Trust</p>
                            </div>
                            <Link href="/seguridad" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-600 font-bold rounded-lg transition-colors text-sm">
                                Centro de Mando
                            </Link>
                        </m.div>

                        {/* Arquitectura Cloud */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100 bg-background-light shadow-sm hover:shadow-xl hover:bg-white transition-all depth-3d flex flex-col h-full"
                        >
                            <div className="size-14 bg-slate-100 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Cloud size={32} className="icon-3d group-hover:filter-none" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Arquitectura Cloud</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Diseño de sistemas resilientes y escalables para alta demanda.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">Docker / Kubernetes / Terraform</p>
                            </div>
                        </m.div>

                        {/* MVP & 3D (Replacing RPA based on user request) */}
                        <m.div
                            variants={cardVariant}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="service-card group p-8 rounded-2xl border border-slate-100 bg-background-light shadow-sm hover:shadow-xl hover:bg-white transition-all depth-3d flex flex-col h-full"
                        >
                            <div className="size-14 bg-slate-100 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Box size={32} className="icon-3d group-hover:filter-none" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-4">Catálogos 3D e Interactividad</h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                Desarrollamos visualizadores de modelos 3D y MVP para cerrar ventas B2B con tecnología de punta.
                            </p>
                            <div className="pt-4 border-t border-slate-200 mt-auto">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tech Stack</span>
                                <p className="text-xs font-semibold text-slate-500 italic">WebGL / Three.js / Model Viewer</p>
                            </div>
                            <Link href="/servicios" className="mt-6 flex items-center justify-center w-full py-3 bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-600 font-bold rounded-lg transition-colors text-sm">
                                Ver Demo 3D
                            </Link>
                        </m.div>
                    </m.div>
                </div>
            </section>

            {/* Providers Carousel */}
            <PartnersEcosystem />

            {/* Premium Section: Club 100 */}
            <section id="club100" className="py-24 bg-brand-blue relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[40%] md:w-1/3 h-full bg-white/5 skew-x-[15deg] md:skew-x-[-20deg] translate-x-10 md:translate-x-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/10 blur-[100px] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <m.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-white font-bold text-xs uppercase tracking-widest mb-6 border border-white/10">
                                Exclusividad Senior
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                                Círculo de Excelencia: <br/><span className="text-primary">El Club 100</span>
                            </h2>
                            <p className="text-blue-100 text-lg mb-10 leading-relaxed font-medium">
                                Una alianza restringida exclusivamente a 100 empresas de alto rendimiento. Acceda a recursos de élite y soporte prioritario directo con nuestros arquitectos.
                            </p>
                            <m.div 
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="space-y-6 mb-12"
                            >
                                {[
                                    { title: "Pentesting continuo", desc: "Seguridad proactiva sin interrupciones." },
                                    { title: "Implementación prioritaria de Agentes IA", desc: "Acceso beta a nuevas tecnologías de automatización." },
                                    { title: "Soporte de Arquitectos Cloud 24/7", desc: "Línea directa con expertos sin intermediarios." }
                                ].map((item, idx) => (
                                    <m.div key={idx} variants={cardVariant} className="flex items-start gap-4">
                                        <div className="mt-1 size-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-white" />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold text-sm">{item.title}</h5>
                                            <p className="text-blue-200 text-xs">{item.desc}</p>
                                        </div>
                                    </m.div>
                                ))}
                            </m.div>
                            <m.button 
                                onClick={() => document.getElementById('admision-form')?.scrollIntoView({ behavior: 'smooth' })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="neon-button text-white px-10 py-5 rounded-xl text-lg md:text-xl font-bold shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 w-full sm:w-auto"
                            >
                                <span>Solicitar Admisión</span>
                                <ArrowRight size={20} className="text-white" />
                            </m.button>
                        </m.div>
                        <m.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ 
                                type: "spring",
                                stiffness: 80,
                                damping: 20,
                                delay: 0.2 
                            }}
                            className="relative hidden lg:block"
                        >
                            <m.div 
                                variants={floatAnimation}
                                initial="initial"
                                animate="animate"
                                className="p-4 rounded-[40px] bg-white/10 backdrop-blur-sm border border-white/20 glass-card-premium"
                            >
                                <img
                                    className="rounded-[30px] w-full shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                                    alt="Digital dashboard displaying corporate performance analytics"
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                />
                            </m.div>
                            {/* Floating Badge */}
                            <m.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-10 -right-10 bg-white p-8 rounded-full shadow-2xl border-4 border-accent text-center pointer-events-none"
                            >
                                <span className="block text-4xl font-black text-primary drop-shadow-sm">100</span>
                                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plazas</span>
                            </m.div>
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Formulario de Admisión Senior */}
            <AdmissionAgent />
        </React.Fragment>
    );
};
