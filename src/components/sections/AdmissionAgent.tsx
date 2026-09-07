"use client";

import React, { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
    ChevronRight, 
    Lock, 
    CheckCircle, 
    Smartphone, 
    Mail, 
    Building, 
    Briefcase, 
    Zap, 
    Info, 
    Loader2,
    ArrowLeft,
    ShieldAlert
} from "lucide-react";
import dynamic from "next/dynamic";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { validatePersonName } from "@/lib/anti-spam";

// Three.js + react-three-fiber (~430 KB) fuera del bundle inicial: este bloque
// vive bajo el pliegue, así que se carga en cliente cuando hace falta.
const FloatingCubes = dynamic(
    () => import("@/components/ui/FloatingCubes").then((mod) => mod.FloatingCubes),
    { ssr: false }
);

interface FormData {
    fullName: string;
    email: string;
    whatsapp: string;
    projectName: string;
    legalStatus: string;
    industry: string;
    whatsappStatus: string;
    painPoint: string;
    wantAudit: string;
    /** Honeypot con nombre verosímil; ver el comentario extendido en `/contacto`. */
    website: string;
}

const EMPTY_FORM: FormData = {
    fullName: '',
    email: '',
    whatsapp: '',
    projectName: '',
    legalStatus: '',
    industry: '',
    whatsappStatus: '',
    painPoint: '',
    wantAudit: '',
    website: ''
};

export const AdmissionAgent = () => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSpamBlocked, setIsSpamBlocked] = useState(false);
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    /** Aviso inline. Sustituye al `alert()` nativo, que mostraba texto técnico en inglés. */
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Este protocolo tiene 9 pasos: un humano tarda minutos, un bot milisegundos.
    const mountedAt = useRef(Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [challengeKey, setChallengeKey] = useState(0);

    /** Reinicia el protocolo completo y pide un desafío nuevo. */
    const resetProtocol = () => {
        setFormData(EMPTY_FORM);
        setStep(0);
        mountedAt.current = Date.now();
        setChallengeKey((k) => k + 1);
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

     const submitForm = async () => {
         setIsSubmitting(true);
         setErrorMessage(null);

         try {
             // Mapeo de variables de estado al payload requerido
             const payload = {
                 hojaDestino: "el_club_de_los_100", // Exactamente como en la hoja
                 nombre: formData.fullName.trim(),
                 correo: formData.email.trim(),
                 numero: formData.whatsapp.trim(),
                 empresa: formData.projectName.trim(),
                 estadoLegal: formData.legalStatus.trim(),
                 rubro: formData.industry.trim(),
                 comunicaciones: formData.whatsappStatus.trim(),
                 desafio: formData.painPoint.trim(),
                 auditoria: formData.wantAudit.trim(),
                 _honey: formData.website,   // Trampa: si viene con valor, es un bot
                 _ts: mountedAt.current,     // Para medir el tiempo de llenado
                 turnstileToken              // Prueba de Cloudflare (si está configurado)
             };
 
             // Enviar al nuevo backend protegido por IA
             const response = await fetch('/api/submit-lead', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload)
             });

             if (!response.ok) {
                 const errorData = await response.json().catch(() => ({}));

                 if (errorData.error === 'SPAM_DETECTED') {
                     setIsSpamBlocked(true);
                     setIsSubmitting(false);
                     return;
                 }
                 if (response.status === 429) {
                     throw new Error('Hemos recibido varias solicitudes desde tu conexión en poco tiempo. Espera un minuto y vuelve a intentarlo.');
                 }
                 if (response.status === 400) {
                     throw new Error(errorData.message || 'Revisa los datos ingresados e inténtalo nuevamente.');
                 }
                 throw new Error('No pudimos procesar tu solicitud en este momento. Escríbenos a contacto@atmchile.com y te atenderemos de inmediato.');
             }

             setStep(9);
         } catch (error: unknown) {
             console.error('Error submitting form:', error);
             setErrorMessage(
                 error instanceof Error
                     ? error.message
                     : 'Verifica tu conexión e inténtalo nuevamente.'
             );
             // El desafío consumido ya no sirve: pedimos uno nuevo para el reintento.
             setChallengeKey((k) => k + 1);
         } finally {
             setIsSubmitting(false);
         }
     };

    const nextStep = () => {
        if (step === 8) {
            submitForm();
            return;
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const isStepValid = () => {
        switch (step) {
            // Exige nombre y apellido: el bot manda siempre un único token.
            case 0: return validatePersonName(formData.fullName).ok;
            case 1: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
            case 2: return formData.whatsapp.trim().length >= 8;
            case 3: return formData.projectName.trim().length > 2;
            case 4: return formData.legalStatus !== '';
            case 5: return formData.industry.trim().length > 2;
            case 6: return formData.whatsappStatus !== '';
            case 7: return formData.painPoint !== '';
            case 8: return formData.wantAudit !== '';
            default: return true;
        }
    };

    const variants = {
        enter: { opacity: 0, x: 20 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <section id="admision-form" className="relative py-12 md:py-24 px-4 md:px-6 bg-[#050505] overflow-hidden min-h-[100dvh] flex items-center">
            {/* 3D Background Experience */}
            <FloatingCubes />
            
            {/* Overlay Gradient for focus */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 w-full">
                {/* Header del Formulario */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2 md:p-2.5 rounded-xl bg-[#176BDE]/10 text-[#176BDE] shadow-[0_0_20px_rgba(23, 107, 222,0.1)] border border-[#176BDE]/30">
                            <Lock size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-lg md:text-xl tracking-tight uppercase">Portal de Admisión</h3>
                            <p className="text-[#176BDE] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Protocolo Nivel Senior</p>
                        </div>
                    </div>
                    {step < 9 && (
                        <div className="text-right">
                            <span className="block text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5">Sincronización en curso</span>
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <m.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step / 9) * 100}%` }}
                                        className="h-full bg-[#176BDE] shadow-[0_0_15px_#176BDE]"
                                    />
                                </div>
                                <span className="text-[#176BDE] font-black text-xs tabular-nums">{Math.round((step / 9) * 100)}%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contenedor Principal (Dark Glassmorphism) */}
                <div 
                    className="bg-[#02121d]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden min-h-[500px] flex flex-col relative group ring-1 ring-white/5 will-change-transform"
                    style={{ transform: "translateZ(0)" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#176BDE]/5 to-transparent pointer-events-none" />
                    <div className="p-8 md:p-14 flex-grow flex flex-col justify-center relative z-10">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={step}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {isSpamBlocked ? (
                                    <div className="flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6">
                                            <ShieldAlert className="w-10 h-10 text-brand-cyan" />
                                        </div>
                                        <h4 className="text-3xl font-black text-white mb-4 tracking-tight">Verificación de seguridad no superada</h4>
                                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-4">
                                            Por tu seguridad y la nuestra, ATM valida cada solicitud entrante antes de
                                            incorporarla a nuestros sistemas. Esta no superó dicha validación.
                                        </p>
                                        <p className="text-slate-400 text-base font-medium leading-relaxed max-w-lg mx-auto mb-8">
                                            Si eres una persona real, escríbenos directamente a{" "}
                                            <a href="mailto:contacto@atmchile.com" className="text-brand-cyan font-bold underline underline-offset-4 hover:text-white transition-colors">
                                                contacto@atmchile.com
                                            </a>{" "}
                                            y te atenderemos de inmediato.
                                        </p>
                                        <button
                                            onClick={() => { setIsSpamBlocked(false); resetProtocol(); }}
                                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                                        >
                                            Volver al inicio
                                        </button>
                                    </div>
                                ) : isSubmitting ? (
                                    <div className="text-center py-12">
                                        <m.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="inline-block p-4 rounded-3xl bg-brand-cyan/5 mb-6"
                                        >
                                            <Loader2 size={48} className="text-brand-cyan" />
                                        </m.div>
                                        <h4 className="text-2xl font-black text-white mb-2 tracking-tight">Sincronizando Datos...</h4>
                                        <p className="text-slate-300 font-medium italic">Conectando con el ecosistema ATM Architecture</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Step 0: Name */}
                                        {step === 0 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-brand-cobalt/20 border border-brand-cobalt/30 w-fit text-brand-cyan">
                                                    <Info size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    Para comenzar, <br/><span className="text-brand-cyan glow-text-subtle">¿cuál es tu nombre completo?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    placeholder="Ej: Juan Pérez"
                                                    className="w-full bg-black/40 border-2 border-white/20 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-black/60 focus:ring-4 focus:ring-brand-cyan/10 transition-all placeholder:text-slate-600"
                                                />
                                                {/* Explica por qué el botón sigue deshabilitado. */}
                                                {formData.fullName.trim().length > 0 && !validatePersonName(formData.fullName).ok && (
                                                    <p className="text-sm text-amber-400 font-medium">
                                                        {validatePersonName(formData.fullName).message}
                                                    </p>
                                                )}
                                                {/*
                                                  * Honeypot fuera del viewport, NO `display:none`:
                                                  * los bots headless consultan la visibilidad y
                                                  * saltan los campos ocultos.
                                                  */}
                                                <div
                                                    aria-hidden="true"
                                                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                                                >
                                                    <label htmlFor="admission-website">No completar este campo</label>
                                                    <input
                                                        id="admission-website"
                                                        type="text"
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                                        tabIndex={-1}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 1: Email */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 w-fit text-brand-cyan">
                                                    <Mail size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    ¿A qué correo <br/><span className="text-brand-cyan glow-text-subtle">te enviamos la información?</span>
                                                </h4>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="ejemplo@empresa.com"
                                                    className="w-full bg-black/40 border-2 border-white/20 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-black/60 focus:ring-4 focus:ring-brand-cyan/10 transition-all placeholder:text-slate-600"
                                                    autoFocus
                                                />
                                            </div>
                                        )}

                                        {/* Step 2: WhatsApp */}
                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 w-fit text-green-400">
                                                    <Smartphone size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    Tu número de <br/><span className="text-green-400 glow-text-subtle">WhatsApp para contacto</span>
                                                </h4>
                                                <input
                                                    type="tel"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                                                    placeholder="+56 9 XXXX XXXX"
                                                    className="w-full bg-black/40 border-2 border-white/20 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-green-500 focus:bg-black/60 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-slate-600"
                                                    autoFocus
                                                />
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <Lock size={12} className="text-brand-cyan" /> Protocolo de Seguridad
                                                </p>
                                            </div>
                                        )}

                                        {/* Step 3: Project Name */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-[#176BDE]/10 border border-[#176BDE]/20 w-fit text-[#176BDE]">
                                                    <Building size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    ¿Cómo se llama <br/><span className="text-[#176BDE] glow-text-subtle">tu empresa o proyecto?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.projectName}
                                                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                                                    placeholder="Nombre de la organización..."
                                                    className="w-full bg-black/40 border-2 border-white/10 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-[#176BDE] focus:bg-black/60 focus:ring-4 focus:ring-[#176BDE]/10 transition-all placeholder:text-slate-700"
                                                    autoFocus
                                                />
                                            </div>
                                        )}

                                        {/* Step 4: Legal Status */}
                                        {step === 4 && (
                                            <div className="space-y-6">
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Estado legal del negocio?
                                                </h4>
                                                <div className="grid gap-3">
                                                    {[
                                                        "Empresa constituida (Rut Empresa)",
                                                        "En proceso de regularización",
                                                        "Persona natural con giro"
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleInputChange('legalStatus', opt)}
                                                            className={`p-4 md:p-5 rounded-2xl text-left font-bold transition-all border-2 text-sm md:text-base ${
                                                                formData.legalStatus === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-black/40 border-white/20 text-slate-300 hover:border-brand-cyan/40 hover:text-white'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 5: Industry */}
                                        {step === 5 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 w-fit text-brand-cyan">
                                                    <Briefcase size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    ¿En qué rubro <br/><span className="text-brand-cyan glow-text-subtle">te desempeñas?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.industry}
                                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                                    placeholder="Ej: Retail, Minería, Finanzas..."
                                                    className="w-full bg-black/40 border-2 border-white/20 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-black/60 focus:ring-4 focus:ring-brand-cyan/10 transition-all placeholder:text-slate-600"
                                                    autoFocus
                                                />
                                            </div>
                                        )}

                                        {/* Step 6: current communication */}
                                        {step === 6 && (
                                            <div className="space-y-6">
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Cómo gestionas tus comunicaciones?
                                                </h4>
                                                <div className="grid gap-3">
                                                    {[
                                                        "Manual (Respuesta 1 a 1)",
                                                        "Listas de difusión o grupos",
                                                        "Tengo una automatización básica"
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleInputChange('whatsappStatus', opt)}
                                                            className={`p-4 md:p-5 rounded-2xl text-left font-bold transition-all border-2 text-sm md:text-base ${
                                                                formData.whatsappStatus === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-black/40 border-white/20 text-slate-300 hover:border-brand-cyan/40 hover:text-white'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 7: pain point */}
                                        {step === 7 && (
                                            <div className="space-y-6">
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Mayor desafío tecnológico hoy?
                                                </h4>
                                                <div className="grid gap-3">
                                                    {[
                                                        "No tengo tiempo para responder a todos",
                                                        "No sé cómo escalar mis procesos",
                                                        "Falta de visibilidad de datos en tiempo real"
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleInputChange('painPoint', opt)}
                                                            className={`p-4 md:p-5 rounded-2xl text-left font-bold transition-all border-2 text-sm md:text-base ${
                                                                formData.painPoint === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-black/40 border-white/20 text-slate-300 hover:border-brand-cyan/40 hover:text-white'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 8: Audit? */}
                                        {step === 8 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-[#176BDE]/10 border border-[#176BDE]/20 w-fit text-[#176BDE]">
                                                    <Zap size={28} />
                                                </div>
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Deseas una <span className="text-[#176BDE]">auditoría estratégica</span> <br/>de procesos gratuita?
                                                </h4>
                                                <div className="grid gap-3 pt-4">
                                                    {[
                                                        "Sí, agendar análisis senior",
                                                        "No por el momento"
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleInputChange('wantAudit', opt)}
                                                            className={`p-5 rounded-2xl text-left font-black tracking-widest uppercase transition-all border-2 text-xs md:text-sm ${
                                                                formData.wantAudit === opt 
                                                                ? 'bg-[#176BDE] border-[#176BDE] text-[#010912] shadow-[0_0_30px_rgba(23, 107, 222,0.3)]' 
                                                                : 'bg-black/40 border-white/10 text-slate-400 hover:border-[#176BDE]/40 hover:text-white'
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 9: Success */}
                                        {step === 9 && (
                                            <div className="text-center py-10">
                                                <m.div 
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="inline-block p-8 rounded-full bg-[#176BDE]/10 text-[#176BDE] mb-10 border border-[#176BDE]/20 shadow-[0_0_50px_rgba(23, 107, 222,0.1)]"
                                                >
                                                    <CheckCircle size={84} />
                                                </m.div>
                                                <h4 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">Protocolo Sincronizado</h4>
                                                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-12">
                                                    Misión cumplida. Un arquitecto senior procesará sus datos y se conectará a través de un canal seguro en menos de 24 horas.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-6 text-left p-8 rounded-[2rem] bg-black/40 border border-white/10 shadow-2xl">
                                                    <div className="space-y-1">
                                                        <span className="text-[9px] font-black text-[#176BDE] uppercase tracking-[0.3em] block opacity-70">Canal Seguro</span>
                                                        <span className="font-bold text-white text-lg block">{formData.email}</span>
                                                    </div>
                                                    <div className="space-y-1 border-l border-white/5 pl-6">
                                                        <span className="text-[9px] font-black text-[#176BDE] uppercase tracking-[0.3em] block opacity-70">WhatsApp Directo</span>
                                                        <span className="font-bold text-white text-lg block">{formData.whatsapp}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </m.div>
                        </AnimatePresence>
                    </div>

                    {errorMessage && !isSpamBlocked && (
                        <div
                            role="alert"
                            className="mx-8 md:mx-14 mb-2 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 relative z-10"
                        >
                            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-100 leading-relaxed text-left">{errorMessage}</p>
                        </div>
                    )}

                    {/* CAPTCHA invisible: solo se muestra si Cloudflare sospecha del visitante. */}
                    {step < 9 && !isSpamBlocked && (
                        <TurnstileWidget onToken={setTurnstileToken} resetKey={challengeKey} />
                    )}

                    {/* Footer del Formulario */}
                    {step < 9 && !isSpamBlocked && (
                        <div className="px-8 md:px-14 py-8 bg-black/40 border-t border-white/10 flex items-center justify-between relative z-10">
                            <button
                                onClick={prevStep}
                                disabled={step === 0}
                                className={`flex items-center gap-2 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                                    step === 0 
                                    ? 'opacity-0 pointer-events-none' 
                                    : 'text-white/40 hover:text-[#176BDE] hover:translate-x-[-4px]'
                                }`}
                            >
                                <ArrowLeft size={16} /> <span className="hidden xs:inline">Volver</span>
                            </button>
                            
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`group flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden ${
                                    isStepValid() 
                                    ? 'bg-[#176BDE] text-[#010912] shadow-[0_0_40px_rgba(23, 107, 222,0.3)] hover:scale-105 hover:bg-white active:scale-95' 
                                    : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                                }`}
                            >
                                <span className="relative z-10">
                                    {step === 8 ? 'Confirmar Admisión' : 'Siguiente Protocolo'}
                                </span>
                                <ChevronRight 
                                    size={18} 
                                    className={`relative z-10 transition-all duration-500 ${isStepValid() ? 'group-hover:translate-x-1.5' : 'opacity-40'}`} 
                                 />
                                {isStepValid() && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
