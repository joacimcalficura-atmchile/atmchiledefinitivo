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
    ArrowLeft
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
}

export const AdmissionAgent = () => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        whatsapp: '',
        projectName: '',
        legalStatus: '',
        industry: '',
        whatsappStatus: '',
        painPoint: '',
        wantAudit: ''
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

     const submitForm = async () => {
         setIsSubmitting(true);
         
         try {
             const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMhGRRHLx8UylQSoCITSLqc_r8PZGm3cwYX5yYQ_aWwgJ2yk1XIbiPS4KY0njfHeMJqg/exec';
             
             // Mapeo de variables de estado al payload requerido (v2 con enrutamiento dinámico)
             const payload = {
                 hojaDestino: "web_site", // Exactamente como en la hoja
                 nombre: formData.fullName,
                 correo: formData.email,
                 numero: formData.whatsapp,
                 empresa: formData.projectName,
                 estadoLegal: formData.legalStatus,
                 rubro: formData.industry,
                 comunicaciones: formData.whatsappStatus,
                 desafio: formData.painPoint,
                 auditoria: formData.wantAudit
             };
 
             const response = await fetch(APPS_SCRIPT_URL, {
                 method: 'POST',
                 headers: { 'Content-Type': 'text/plain' },
                 body: JSON.stringify(payload)
             });
 
             if (!response.ok) {
                 // Intentamos obtener más detalles si la respuesta es JSON
                 let errorDetails = '';
                 try {
                     const errorData = await response.json();
                     errorDetails = `: ${errorData.details || ''}`;
                 } catch (e) {
                     // Si no es JSON, continuamos sin detalles
                 }
                 throw new Error(`Error ${response.status}: ${response.statusText}${errorDetails}`);
             }
             
             setStep(9); // Éxito
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
        <section id="admision-form" className="relative py-24 px-6 bg-[#050505] overflow-hidden min-h-screen flex items-center">
            {/* 3D Background Experience */}
            <FloatingCubes />
            
            {/* Overlay Gradient for focus */}
            <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 w-full">
                {/* Header del Formulario */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-brand-cobalt text-white shadow-xl shadow-brand-cobalt/40 border border-white/10">
                            <Lock size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-xl tracking-tight">Portal de Admisión</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Protocolo de Exclusividad Club 100</p>
                        </div>
                    </div>
                    {step < 9 && (
                        <div className="text-right">
                            <span className="block text-brand-cyan/60 text-[10px] font-black uppercase tracking-widest mb-1">Estado: Gravedad Cero</span>
                            <div className="flex items-center gap-3">
                                <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <m.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(step / 9) * 100}%` }}
                                        className="h-full bg-brand-cyan shadow-[0_0_15px_#22D3EE]"
                                    />
                                </div>
                                <span className="text-brand-cyan font-black text-sm">{Math.round((step / 9) * 100)}%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contenedor Principal (Dark Glassmorphism) */}
                <div className="bg-[#0A0F14]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden min-h-[500px] flex flex-col relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cobalt/5 to-transparent pointer-events-none" />
                    <div className="p-8 md:p-12 flex-grow flex flex-col justify-center relative z-10">
                        <AnimatePresence mode="wait">
                            <m.div
                                key={step}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {isSubmitting ? (
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
                                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                                                    Para comenzar, <br/><span className="text-brand-cyan glow-text-subtle">¿cuál es tu nombre completo?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    placeholder="Escribe tu respuesta aquí..."
                                                    className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-2xl text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-white/10 transition-all placeholder:text-slate-600"
                                                />
                                            </div>
                                        )}

                                        {/* Step 1: Email */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div className="p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 w-fit text-brand-cyan">
                                                    <Mail size={28} />
                                                </div>
                                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                                                    ¿A qué correo <br/><span className="text-brand-cyan glow-text-subtle">te enviamos la información?</span>
                                                </h4>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="ejemplo@empresa.com"
                                                    className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-2xl text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-white/10 transition-all placeholder:text-slate-600"
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
                                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                                                    Tu número de <br/><span className="text-green-400 glow-text-subtle">WhatsApp para contacto</span>
                                                </h4>
                                                <input
                                                    type="tel"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                                                    placeholder="+56 9 XXXX XXXX"
                                                    className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-2xl text-xl font-bold text-white outline-none focus:border-green-500 focus:bg-white/10 transition-all placeholder:text-slate-600"
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
                                                <div className="p-4 rounded-2xl bg-brand-cobalt/20 border border-brand-cobalt/30 w-fit text-brand-cyan">
                                                    <Building size={28} />
                                                </div>
                                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                                                    ¿Cómo se llama <br/><span className="text-brand-cyan glow-text-subtle">tu empresa o proyecto?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.projectName}
                                                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                                                    placeholder="Nombre de la organización..."
                                                    className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-2xl text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-white/10 transition-all placeholder:text-slate-600"
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
                                                            className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                                                formData.legalStatus === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand-cyan/40 hover:text-white'
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
                                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                                                    ¿En qué rubro <br/><span className="text-brand-cyan glow-text-subtle">te desempeñas?</span>
                                                </h4>
                                                <input
                                                    type="text"
                                                    value={formData.industry}
                                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                                    placeholder="Ej: Retail, Minería, Finanzas..."
                                                    className="w-full bg-white/5 border-2 border-white/10 p-5 rounded-2xl text-xl font-bold text-white outline-none focus:border-brand-cyan focus:bg-white/10 transition-all placeholder:text-slate-600"
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
                                                            className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                                                formData.whatsappStatus === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand-cyan/40 hover:text-white'
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
                                                            className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                                                formData.painPoint === opt 
                                                                ? 'bg-brand-cyan border-brand-cyan text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand-cyan/40 hover:text-white'
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
                                                <div className="p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/30 w-fit text-brand-cyan">
                                                    <Zap size={28} />
                                                </div>
                                                <h4 className="text-3xl font-black text-white tracking-tight leading-none">
                                                    ¿Deseas una auditoría <br/><span className="text-brand-cyan glow-text-subtle">de procesos gratuita?</span>
                                                </h4>
                                                <div className="grid gap-3">
                                                    {[
                                                        "Sí, me interesa optimizar",
                                                        "No por el momento"
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleInputChange('wantAudit', opt)}
                                                            className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                                                                formData.wantAudit === opt 
                                                                ? 'bg-[#FACC15] border-[#FACC15] text-slate-900 shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-[#FACC15]/40 hover:text-white'
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
                                            <div className="text-center py-6">
                                                <m.div 
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="inline-block p-6 rounded-full bg-brand-cyan/10 text-brand-cyan mb-8"
                                                >
                                                    <CheckCircle size={84} />
                                                </m.div>
                                                <h4 className="text-4xl font-black text-white mb-4 tracking-tight">¡Perfil Sincronizado!</h4>
                                                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-10">
                                                    Misión cumplida. Un arquitecto senior procesará sus datos y se conectará a través de un canal seguro en menos de 24 horas.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-4 text-left p-6 rounded-3xl bg-white/5 border border-white/10">
                                                    <div>
                                                        <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest block mb-1">Email de Auditoría</span>
                                                        <span className="font-bold text-white text-lg">{formData.email}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest block mb-1">WhatsApp Directo</span>
                                                        <span className="font-bold text-white text-lg">{formData.whatsapp}</span>
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
                    {step < 9 && (
                        <div className="px-8 md:px-12 py-8 bg-white/[0.02] border-t border-white/10 flex items-center justify-between relative z-10">
                            <button
                                onClick={prevStep}
                                disabled={step === 0}
                                className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all ${
                                    step === 0 
                                    ? 'opacity-0 pointer-events-none' 
                                    : 'text-brand-cyan/60 hover:text-brand-cyan hover:translate-x-[-4px]'
                                }`}
                            >
                                <ArrowLeft size={16} /> Atrás
                            </button>
                            
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className={`group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden ${
                                    isStepValid() 
                                    ? 'bg-brand-cyan text-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-105 hover:bg-white hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] active:scale-95' 
                                    : 'bg-white/10 text-white border border-white/20 opacity-100 cursor-not-allowed shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
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
                                    <m.div 
                                        layoutId="glow"
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
                                    />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
