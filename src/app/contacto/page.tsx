"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Mail, Phone, MapPin, Send, Users,
    CheckCircle2, ArrowRight, Building2, MessageSquare
} from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface FormData {
    nombre: string;
    empresa: string;
    email: string; // Nuevo campo requerido por el usuario
    tamano: string;
    mensaje: string;
}

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Avatar placeholder para consultores ────────────────────────────────────────
const ConsultantAvatar = ({ initials, color }: { initials: string; color: string }) => (
    <div
        className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-black text-white shrink-0"
        style={{ background: color }}
    >
        {initials}
    </div>
);

// ── Íconos Oficiales SVG ───────────────────────────────────────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M22.5 4.5v15c0 .55-.45 1-1 1h-19c-.55 0-1-.45-1-1v-15c0-.55.45-1 1-1h19c.55 0 1 .45 1 1z"/>
        <path fill="#FBBC04" d="M2.5 4.5l9.5 7 9.5-7"/>
        <path fill="#EA4335" d="M22.5 4.5L12 12.5 1.5 4.5h21z"/>
        <path fill="#34A853" d="M12 12.5L1.5 4.5v2.5l10.5 7.5L22.5 7V4.5l-10.5 8z"/>
        <path fill="rgba(0,0,0,0.05)" d="M12 13.5l10.5-7.5v-1L12 12.5 1.5 5v1l10.5 7.5z"/>
    </svg>
);

import { FloatingCubes } from "@/components/ui/FloatingCubes";

// ── Página de Contacto ─────────────────────────────────────────────────────────
export default function ContactoPage() {
    const [form, setForm]           = useState<FormData>({ nombre: "", empresa: "", email: "", tamano: "", mensaje: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]     = useState(false);
    const [isWhatsAppMode, setIsWhatsAppMode] = useState(false);
    const [targetContact, setTargetContact]   = useState<"manager" | "ceo">("manager");

    // Configuración de contactos reales
    const WHATSAPP_MANAGER = "56945186499"; 
    const WHATSAPP_CEO     = "56942781028"; 
    const MANAGER_EMAIL    = "francisco.cesped@atmchile.cl";
    const CEO_EMAIL        = "joacim.calficura@atmchile.cl";
    const LOCATION_TEXT    = "Santa Magdalena 75, Providencia, Santiago de Chile";

    // Función para navegar al formulario
    const scrollToForm = (mode: boolean, target: "manager" | "ceo") => {
        setIsWhatsAppMode(mode);
        setTargetContact(target);
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
          
          try {
              // Envío directo a Google Apps Script (Web App v2 con enrutamiento dinámico corregido)
              const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMhGRRHLx8UylQSoCITSLqc_r8PZGm3cwYX5yYQ_aWwgJ2yk1XIbiPS4KY0njfHeMJqg/exec';
              
              // Mapeo de variables de estado al payload (blindado con .trim())
              const payload = {
                  hojaDestino: isWhatsAppMode ? "leeads_wsp" : "Leeads_atm",
                  nombre: form.nombre.trim(),
                  correo: form.email.trim(),
                  numero: "", 
                  empresa: form.empresa.trim(),
                  estadoLegal: "", 
                  rubro: "", 
                  comunicaciones: isWhatsAppMode ? 'WhatsApp' : 'Formulario Web', 
                  desafio: form.mensaje.trim(), 
                  auditoria: "" 
              };
              
              // Blindaje de comunicación con patrón Senior
              await fetch(APPS_SCRIPT_URL, {
                  method: 'POST',
                  mode: 'no-cors', // Evita bloqueos de redirección de Google
                  headers: { 'Content-Type': 'text/plain' },
                  body: JSON.stringify(payload)
              });
             
             setSubmitted(true);
            
            // 2. Lógica Dual: Redirección según canal con Copywriting especializado
            if (isWhatsAppMode) {
                const targetPhone = targetContact === "ceo" ? WHATSAPP_CEO : WHATSAPP_MANAGER;
                
                const message = targetContact === "ceo" 
                    ? `Estimado Joacim, es un honor saludarle. Mi nombre es ${form.nombre} de la empresa ${form.empresa}. Me pongo en contacto directo con usted para conversar sobre una oportunidad estratégica de alto nivel. Entiendo que su tiempo es valioso, por lo que me gustaría saber cuándo sería prudente agendar una breve llamada. Quedo a su disposición.`
                    : `Hola Francisco, ¿cómo estás? Mi nombre es ${form.nombre} de ${form.empresa}. Te escribo para solicitar la evaluación y desarrollo de un nuevo proyecto. Ya dejé mis datos registrados y me gustaría que conversáramos sobre los detalles técnicos y comerciales cuando tengas un momento. ¡Gracias!`;

                window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, '_blank');
                setSubmitted(true);
            } else {
                setSubmitted(true);
            }
        } catch (error: any) {
            console.error('Error submitting contact form:', error);
            alert(`Error al enviar: ${error.message || 'Verifica tu conexión.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] selection:bg-[#0047AB] selection:text-white overflow-hidden">
            
            {/* Fondo 3D Antigravedad (Versión Light) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <FloatingCubes count={15} light={true} />
            </div>

            {/* Glow decorativo */}
            <div
                className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none -translate-y-1/4 translate-x-1/4 z-10"
                style={{ background: "radial-gradient(ellipse, rgba(0,71,171,0.05) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">

                {/* ── Hero ── */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/5 text-[#0047AB] text-xs font-black uppercase tracking-[0.2em] border border-[#0047AB]/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                        B2B Enterprise
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                        ¿Listo para{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047AB] to-[#22D3EE]">
                            escalar?
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
                        Hablemos sobre tu próximo gran paso. Nuestro equipo está listo para asesorarte en la expansión tecnológica de tu negocio.
                    </p>
                </m.div>

                {/* ── Grid principal ── */}
                <div className="grid lg:grid-cols-12 gap-10 items-start">

                    {/* ── Sidebar ── */}
                    <m.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
                        className="lg:col-span-4 space-y-6"
                    >
                        {/* Info de Contacto */}
                        <div
                            className="p-8 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                            style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#0047AB]" />
                                Información de contacto
                            </h3>
                            <ul className="space-y-6">
                                {/* Francisco Cesped */}
                                <li className="group">
                                    <div className="flex items-start gap-4 p-2 -m-2 rounded-xl">
                                        <div className="w-10 h-10 rounded-xl bg-[#0047AB]/8 border border-[#0047AB]/10 flex items-center justify-center shrink-0">
                                            <Users className="w-5 h-5 text-[#0047AB]" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gerente de Proyectos (Operativo)</p>
                                            <p className="font-bold text-slate-800 text-sm mb-2">Francisco Césped</p>
                                            <div className="flex gap-2">
                                                <a href={`mailto:${MANAGER_EMAIL}?subject=Solicitud de Nuevo Proyecto / Cotización - [Nombre de la Empresa]&body=Hola Francisco, ¿qué tal? Te escribo porque estamos interesados en iniciar un nuevo proyecto con ustedes. Nos gustaría que nos pudieras asesorar y enviar una cotización basada en nuestros requerimientos. Quedo atento a tus comentarios para coordinar los próximos pasos. Saludos.`} 
                                                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold hover:bg-slate-200 hover:text-[#EA4335] transition-all group/btn">
                                                    <GmailIcon className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" /> Email
                                                </a>
                                                <button 
                                                   type="button"
                                                   onClick={() => scrollToForm(true, "manager")}
                                                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all group/btn">
                                                    <WhatsAppIcon className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" /> WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                {/* Joacim Calficura */}
                                <li className="group">
                                    <div className="flex items-start gap-4 p-2 -m-2 rounded-xl">
                                        <div className="w-10 h-10 rounded-xl bg-[#0047AB]/8 border border-[#0047AB]/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-[#0047AB]" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Founder & CEO (Strategic Contact)</p>
                                            <p className="font-bold text-slate-800 text-sm mb-2">Joacim Calficura</p>
                                            <div className="flex gap-2">
                                                <a href={`mailto:${CEO_EMAIL}?subject=Propuesta Estratégica / Oportunidad de Negocio - [Nombre de la Empresa]&body=Estimado Joacim, un cordial saludo. Me dirijo a usted, conociendo su rol como fundador de ATM Chile, para plantearle una oportunidad de negocio/alianza de alto nivel. Me gustaría que pudiéramos agendar una breve reunión para conversar sobre cómo nuestras empresas pueden colaborar y generar valor mutuo. Quedo atento a su disponibilidad. Saludos cordiales.`} 
                                                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold hover:bg-slate-200 hover:text-[#EA4335] transition-all group/btn">
                                                    <GmailIcon className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" /> Email
                                                </a>
                                                <button 
                                                   type="button"
                                                   onClick={() => scrollToForm(true, "ceo")}
                                                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all group/btn">
                                                    <WhatsAppIcon className="w-3.5 h-3.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" /> WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                {/* Ubicación */}
                                <li className="group border-t border-slate-100 pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#0047AB] group-hover:text-white transition-all">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Ubicación Central</p>
                                            <p className="font-bold text-slate-800 text-sm leading-relaxed">{LOCATION_TEXT}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Card Asesoría Directa */}
                        <div
                            className="p-8 rounded-2xl border border-[#0047AB]/10 overflow-hidden relative"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,71,171,0.06) 0%, rgba(34,211,238,0.04) 100%)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                            }}
                        >
                            {/* Glow fondo */}
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                                 style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent)" }} />

                            <div className="relative">
                                <Building2 className="w-6 h-6 text-[#0047AB] mb-4" />
                                <h4 className="font-bold text-slate-900 text-lg mb-2">Asesoría Directa</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                    Recibe una respuesta en menos de 24 horas hábiles por parte de nuestros especialistas senior.
                                </p>

                                {/* Avatares del equipo */}
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <ConsultantAvatar initials="JC" color="#0047AB" />
                                        <ConsultantAvatar initials="AM" color="#0369A1" />
                                        <ConsultantAvatar initials="RV" color="#22D3EE" />
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0">
                                            +5
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">Equipo disponible</p>
                                        <p className="text-xs text-slate-400">Consultores senior</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </m.div>

                    {/* ── Formulario ── */}
                    <m.div
                        id="contact-form"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: smoothEase }}
                        className="lg:col-span-8 scroll-mt-20"
                    >
                        <div
                            className="p-8 md:p-12 rounded-2xl border border-white/80 shadow-[0_20px_60px_-12px_rgba(0,71,171,0.10),0_0_0_1px_rgba(255,255,255,0.8),inset_0_1px_0_rgba(255,255,255,0.9)]"
                            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "saturate(180%) blur(40px)", WebkitBackdropFilter: "saturate(180%) blur(40px)" }}
                        >
                            {/* Brillo superior */}
                            <div className="absolute top-0 left-12 right-12 h-px rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)" }} />

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    /* ── Estado de éxito ── */
                                    <m.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="flex flex-col items-center justify-center gap-6 py-16 text-center"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-[#0047AB]/10 border border-[#0047AB]/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-10 h-10 text-[#0047AB]" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud enviada!</h3>
                                            <p className="text-slate-500 text-lg">
                                                Nuestro equipo se comunicará contigo en menos de 24 horas hábiles.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => { setSubmitted(false); setForm({ nombre: "", empresa: "", email: "", tamano: "", mensaje: "" }); }}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#0047AB] hover:gap-3 transition-all"
                                        >
                                            Enviar otra consulta <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </m.div>
                                ) : (
                                    /* ── Formulario ── */
                                    <m.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col gap-4 mb-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Cuéntanos sobre tu proyecto</h2>
                                                    <p className="text-slate-500 text-sm">Escoge tu canal de contacto preferido.</p>
                                                </div>
                                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsWhatsAppMode(false)}
                                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isWhatsAppMode ? 'bg-white text-[#0047AB] shadow-sm' : 'text-slate-400'}`}
                                                    >
                                                        Email
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsWhatsAppMode(true)}
                                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isWhatsAppMode ? 'bg-[#25D366] text-white shadow-sm' : 'text-slate-400'}`}
                                                    >
                                                        WhatsApp
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Nombre completo</label>
                                                <input
                                                    name="nombre"
                                                    type="text"
                                                    value={form.nombre}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Ej: Juan Pérez"
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30 focus:border-[#0047AB] transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Empresa</label>
                                                <input
                                                    name="empresa"
                                                    type="text"
                                                    value={form.empresa}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Nombre de tu organización"
                                                    className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30 focus:border-[#0047AB] transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Correo Electrónico</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="tu@empresa.com"
                                                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30 focus:border-[#0047AB] transition-all"
                                            />
                                        </div>

                                        {!isWhatsAppMode && (
                                            <m.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-6 overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Tamaño de la empresa</label>
                                                    <select
                                                        name="tamano"
                                                        value={form.tamano}
                                                        onChange={handleChange}
                                                        required={!isWhatsAppMode}
                                                        className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30 focus:border-[#0047AB] transition-all appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Selecciona una opción</option>
                                                        <option value="startup">Startup (1-10 empleados)</option>
                                                        <option value="small">Pequeña (11-50 empleados)</option>
                                                        <option value="medium">Mediana (51-200 empleados)</option>
                                                        <option value="large">Grande (+200 empleados)</option>
                                                    </select>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Mensaje</label>
                                                    <textarea
                                                        name="mensaje"
                                                        value={form.mensaje}
                                                        onChange={handleChange}
                                                        required={!isWhatsAppMode}
                                                        rows={4}
                                                        placeholder="Cuéntanos sobre tu proyecto, necesidades o desafíos tecnológicos..."
                                                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30 focus:border-[#0047AB] transition-all resize-none"
                                                    />
                                                </div>
                                            </m.div>
                                        )}

                                        <m.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: loading ? 1 : 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-70 shadow-lg group/submit"
                                            style={{ 
                                                background: isWhatsAppMode 
                                                    ? "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" 
                                                    : "linear-gradient(135deg, #0047AB 0%, #0369A1 100%)",
                                                boxShadow: isWhatsAppMode 
                                                    ? "0 8px 24px -4px rgba(37,211,102,0.35)" 
                                                    : "0 8px 24px -4px rgba(0,71,171,0.35)" 
                                            }}
                                        >
                                            {loading ? (
                                                <>
                                                    <m.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Sincronizando...
                                                </>
                                            ) : (
                                                <>
                                                    {isWhatsAppMode ? <WhatsAppIcon className="w-5 h-5" /> : <GmailIcon className="w-5 h-5 brightness-200 contrast-125" />}
                                                    {isWhatsAppMode ? "Contactar por WhatsApp" : "Enviar Solicitud"}
                                                </>
                                            )}
                                        </m.button>

                                        <p className="text-center text-xs text-slate-400 leading-relaxed">
                                            Al enviar este formulario, aceptas nuestras{" "}
                                            <a href="#" className="text-[#0047AB] underline underline-offset-2 hover:text-[#003380]">
                                                Políticas de Privacidad
                                            </a>
                                            .
                                        </p>
                                    </m.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </m.div>
                </div>
            </div>
        </div>
    );
}
