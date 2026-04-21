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
import { FloatingCubes } from "@/components/ui/FloatingCubes";

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
    _honey: string;
}

export const AdmissionAgent = () => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSpamBlocked, setIsSpamBlocked] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        whatsapp: '',
        projectName: '',
        legalStatus: '',
        industry: '',
        whatsappStatus: '',
        painPoint: '',
        wantAudit: '',
        _honey: ''
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

     const submitForm = async () => {
         setIsSubmitting(true);
         
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
                 _honey: formData._honey
             };
 
             // Enviar al nuevo backend protegido por IA
             const response = await fetch('/api/submit-lead', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload)
             });

             if (!response.ok) {
                 const errorData = await response.json();
                 if (errorData.error === 'SPAM_DETECTED') {
                     setIsSpamBlocked(true);
                     setIsSubmitting(false);
                     return;
                 }
                 throw new Error(errorData.error || 'Error de conexión');
             }
             
             setStep(9);
         } catch (error: any) {
             console.error('Error submitting form:', error);
             alert(`Error al enviar la solicitud: ${error.message || 'Verifica tu conexión.'}`);
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
            case 0: return formData.fullName.trim().length > 2;
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
                        <div className="p-2 md:p-2.5 rounded-xl bg-[#00AEEF]/10 text-[#00AEEF] shadow-[0_0_20px_rgba(0,174,239,0.1)] border border-[#00AEEF]/30">
                            <Lock size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-lg md:text-xl tracking-tight uppercase">Portal de Admisión</h3>
                            <p className="text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Protocolo Nivel Senior</p>
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
                                        className="h-full bg-[#00AEEF] shadow-[0_0_15px_#00AEEF]"
                                    />
                                </div>
                                <span className="text-[#00AEEF] font-black text-xs tabular-nums">{Math.round((step / 9) * 100)}%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contenedor Principal (Dark Glassmorphism) */}
                <div className="bg-[#02121d]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden min-h-[500px] flex flex-col relative group ring-1 ring-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent pointer-events-none" />
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
                                        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center relative mb-6">
                                            <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full" />
                                            <ShieldAlert className="w-10 h-10 text-red-500 relative z-10" />
                                        </div>
                                        <h4 className="text-3xl font-black text-white mb-4 tracking-tight">Acceso Denegado</h4>
                                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-8">
                                            Nuestra Inteligencia Artificial consideró esta solicitud como <span className="text-red-500 font-bold">SPAM inusual</span> y bloqueó la conexión a nuestro ecosistema.
                                        </p>
                                        <button
                                            onClick={() => { setIsSpamBlocked(false); setStep(0); setFormData({
                                                fullName: '', email: '', whatsapp: '', projectName: '',
                                                legalStatus: '', industry: '', whatsappStatus: '',
                                                painPoint: '', wantAudit: '', _honey: ''
                                            }); }}
                                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                                        >
                                            Reintentar (Soy Humano)
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
                                                    placeholder="Escribe tu respuesta aquí..."
                                                    className="w-full bg-black/40 border-2 border-white/20 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-black/60 focus:ring-4 focus:ring-brand-cyan/10 transition-all placeholder:text-slate-600"
                                                />
                                                {/* Honeypot Silencioso */}
                                                <input 
                                                    type="text" 
                                                    name="_honey" 
                                                    value={formData._honey} 
                                                    onChange={(e) => handleInputChange('_honey', e.target.value)} 
                                                    style={{ display: 'none' }} 
                                                    tabIndex={-1} 
                                                    autoComplete="off" 
                                                />
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
                                                <div className="p-4 rounded-2xl bg-[#00AEEF]/10 border border-[#00AEEF]/20 w-fit text-[#00AEEF]">
                                                    <Building size={28} />
                                                </div>
                                                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                                    ¿Cómo se llama <br/><span className="text-[#00AEEF] glow-text-subtle">tu empresa o proyecto?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.projectName}
                                                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                                                    placeholder="Nombre de la organización..."
                                                    className="w-full bg-black/40 border-2 border-white/10 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold text-white outline-none focus:border-[#00AEEF] focus:bg-black/60 focus:ring-4 focus:ring-[#00AEEF]/10 transition-all placeholder:text-slate-700"
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
                                                <div className="p-4 rounded-2xl bg-[#00AEEF]/10 border border-[#00AEEF]/20 w-fit text-[#00AEEF]">
                                                    <Zap size={28} />
                                                </div>
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Deseas una <span className="text-[#00AEEF]">auditoría estratégica</span> <br/>de procesos gratuita?
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
                                                                ? 'bg-[#00AEEF] border-[#00AEEF] text-[#010912] shadow-[0_0_30px_rgba(0,174,239,0.3)]' 
                                                                : 'bg-black/40 border-white/10 text-slate-400 hover:border-[#00AEEF]/40 hover:text-white'
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
                                                    className="inline-block p-8 rounded-full bg-[#00AEEF]/10 text-[#00AEEF] mb-10 border border-[#00AEEF]/20 shadow-[0_0_50px_rgba(0,174,239,0.1)]"
                                                >
                                                    <CheckCircle size={84} />
                                                </m.div>
                                                <h4 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">Protocolo Sincronizado</h4>
                                                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-12">
                                                    Misión cumplida. Un arquitecto senior procesará sus datos y se conectará a través de un canal seguro en menos de 24 horas.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-6 text-left p-8 rounded-[2rem] bg-black/40 border border-white/10 shadow-2xl">
                                                    <div className="space-y-1">
                                                        <span className="text-[9px] font-black text-[#00AEEF] uppercase tracking-[0.3em] block opacity-70">Canal Seguro</span>
                                                        <span className="font-bold text-white text-lg block">{formData.email}</span>
                                                    </div>
                                                    <div className="space-y-1 border-l border-white/5 pl-6">
                                                        <span className="text-[9px] font-black text-[#00AEEF] uppercase tracking-[0.3em] block opacity-70">WhatsApp Directo</span>
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

                    {/* Footer del Formulario */}
                    {step < 9 && !isSpamBlocked && (
                        <div className="px-8 md:px-14 py-8 bg-black/40 border-t border-white/10 flex items-center justify-between relative z-10">
                            <button
                                onClick={prevStep}
                                disabled={step === 0}
                                className={`flex items-center gap-2 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                                    step === 0 
                                    ? 'opacity-0 pointer-events-none' 
                                    : 'text-white/40 hover:text-[#00AEEF] hover:translate-x-[-4px]'
                                }`}
                            >
                                <ArrowLeft size={16} /> <span className="hidden xs:inline">Volver</span>
                            </button>
                            
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`group flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden ${
                                    isStepValid() 
                                    ? 'bg-[#00AEEF] text-[#010912] shadow-[0_0_40px_rgba(0,174,239,0.3)] hover:scale-105 hover:bg-white active:scale-95' 
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
