import { useState, useRef } from 'react';
import { ChevronRight, Lock, CheckCircle, Smartphone, Mail, Building, Briefcase, Zap, Info, Loader2 } from 'lucide-react';

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

    const questionRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString()
                })
            });

            if (response.ok) {
                setStep(9); // Success step
            } else {
                alert('Hubo un error al enviar los datos. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error de conexión. Inténtalo más tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 8) {
            submitForm();
            return;
        }

        if (questionRef.current) {
            questionRef.current.style.opacity = '0';
            questionRef.current.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                setStep(prev => prev + 1);
                const section = document.getElementById('admission');
                if (section) {
                    window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
                }
                if (questionRef.current) {
                    questionRef.current.style.opacity = '1';
                    questionRef.current.style.transform = 'translateY(0)';
                }
            }, 300);
        } else {
            setStep(prev => prev + 1);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 0: return formData.fullName.length > 2;
            case 1: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
            case 2: return formData.whatsapp.length >= 8;
            case 3: return formData.projectName.length > 2;
            case 4: return formData.legalStatus !== '';
            case 5: return formData.industry.length > 2;
            case 6: return formData.whatsappStatus !== '';
            case 7: return formData.painPoint !== '';
            case 8: return formData.wantAudit !== '';
            default: return true;
        }
    }

    const renderInput = () => {
        if (isSubmitting) {
            return (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Loader2 size={50} className="spin-icon" color="var(--accent-color)" />
                    <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Procesando tu solicitud...</p>
                </div>
            );
        }

        switch (step) {
            case 0:
                return (
                    <div className="input-group">
                        <div className="step-icon"><Info size={24} /></div>
                        <label>Para comenzar, ¿cuál es tu nombre completo?</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Tu nombre y apellido"
                            autoFocus
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="input-group">
                        <div className="step-icon"><Mail size={24} /></div>
                        <label>¿A qué correo te enviamos la información?</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="ejemplo@correo.cl"
                            autoFocus
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="input-group">
                        <div className="step-icon"><Smartphone size={24} /></div>
                        <label>Tu número de WhatsApp para contacto directo</label>
                        <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            placeholder="+56 9 1234 5678"
                            autoFocus
                        />
                        <p className="helper-text">Usaremos este número para coordinar la auditoría.</p>
                    </div>
                );
            case 3:
                return (
                    <div className="input-group">
                        <div className="step-icon"><Building size={24} /></div>
                        <label>¿Cómo se llama tu empresa o proyecto?</label>
                        <input
                            type="text"
                            value={formData.projectName}
                            onChange={(e) => handleInputChange('projectName', e.target.value)}
                            placeholder="Nombre de tu negocio"
                            autoFocus
                        />
                    </div>
                );
            case 4:
                return (
                    <div className="radio-group">
                        <label>¿Cuál es el estado legal de tu negocio?</label>
                        {[
                            "Empresa constituida (Rut Empresa)",
                            "En proceso de regularización",
                            "Persona natural con giro"
                        ].map((opt) => (
                            <button
                                key={opt}
                                className={`option-btn ${formData.legalStatus === opt ? 'selected' : ''}`}
                                onClick={() => handleInputChange('legalStatus', opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div className="input-group">
                        <div className="step-icon"><Briefcase size={24} /></div>
                        <label>¿En qué rubro o industria te desempeñas?</label>
                        <input
                            type="text"
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            placeholder="Ej: Inmobiliaria, E-commerce, Salud..."
                        />
                    </div>
                );
            case 6:
                return (
                    <div className="radio-group">
                        <label>¿Cómo gestionas actualmente tus comunicaciones?</label>
                        {[
                            "Manual (Respuesta 1 a 1)",
                            "Listas de difusión o grupos",
                            "Tengo una automatización básica"
                        ].map((opt) => (
                            <button
                                key={opt}
                                className={`option-btn ${formData.whatsappStatus === opt ? 'selected' : ''}`}
                                onClick={() => handleInputChange('whatsappStatus', opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                );
            case 7:
                return (
                    <div className="radio-group">
                        <label>¿Cuál es tu mayor desafío tecnológico hoy?</label>
                        {[
                            "No tengo tiempo para responder a todos",
                            "No sé cómo escalar mis procesos",
                            "Falta de visibilidad de datos en tiempo real"
                        ].map((opt) => (
                            <button
                                key={opt}
                                className={`option-btn ${formData.painPoint === opt ? 'selected' : ''}`}
                                onClick={() => handleInputChange('painPoint', opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                );
            case 8:
                return (
                    <div className="radio-group">
                        <div className="step-icon accent"><Zap size={24} /></div>
                        <label>¿Te gustaría recibir una auditoría de procesos sin costo?</label>
                        {[
                            "Sí, me interesa optimizar",
                            "No por el momento"
                        ].map((opt) => (
                            <button
                                key={opt}
                                className={`option-btn ${formData.wantAudit === opt ? 'selected' : ''}`}
                                onClick={() => handleInputChange('wantAudit', opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                );
            case 9:
                return (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div className="success-icon">
                            <CheckCircle size={80} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>¡Solicitud Recibida!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
                            Un consultor de <span className="notranslate" translate="no">Future Solution SpA</span> revisará tus datos y se pondrá en contacto contigo en las próximas 24 horas para coordinar los siguientes pasos.
                        </p>
                        <div className="summary-card">
                            <p><span>Email:</span> {formData.email}</p>
                            <p><span>WhatsApp:</span> {formData.whatsapp}</p>
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <section id="admission" className="admission-section">
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${(step / 9) * 100}%` }}></div>
            </div>

            <div className="glass-panel form-container">
                <div className="form-header">
                    <div className="brand-tag">
                        <Lock size={14} />
                        <span><span className="notranslate" translate="no">Future Solution SpA</span> /// ADMISIÓN</span>
                    </div>
                    {step < 9 && <span className="step-counter">PASO {step + 1} DE 9</span>}
                </div>

                <div ref={questionRef} className="question-content">
                    {renderInput()}
                </div>

                {step < 9 && !isSubmitting && (
                    <div className="form-footer">
                        <button
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className={`next-btn ${isStepValid() ? 'active' : ''}`}
                        >
                            {step === 8 ? 'FINALIZAR POSTULACIÓN' : 'CONTINUAR'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .admission-section {
                    background: radial-gradient(circle at bottom, rgba(0, 242, 255, 0.05), transparent 70%);
                }
                
                .progress-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(255,255,255,0.05);
                    z-index: 10;
                }
                
                .progress-bar {
                    height: 100%;
                    background: var(--accent-color);
                    box-shadow: 0 0 15px var(--accent-color);
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .form-container {
                    width: 100%;
                    max-width: 650px;
                    min-height: 450px;
                    padding: 50px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    margin: 0 auto;
                }

                .form-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 20px;
                }

                .brand-tag {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--accent-color);
                    font-size: 0.75rem;
                    letter-spacing: 0.2em;
                    font-weight: 600;
                }

                .step-counter {
                    color: #444;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                .question-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    transition: all 0.4s ease;
                }

                .step-icon {
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #555;
                    margin-bottom: 25px;
                }

                .step-icon.accent {
                    color: var(--accent-color);
                    border-color: rgba(0,242,255,0.2);
                    background: rgba(0,242,255,0.05);
                }

                .input-group label, .radio-group label {
                    font-size: clamp(1.2rem, 3vw, 1.5rem);
                    color: #fff;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-bottom: 25px;
                    display: block;
                }

                .input-group input {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 18px 24px;
                    border-radius: 15px;
                    color: #fff;
                    font-size: clamp(1rem, 2vw, 1.25rem);
                    outline: none;
                    transition: all 0.3s;
                    font-family: inherit;
                }

                .input-group input:focus {
                    border-color: var(--accent-color);
                    background: rgba(0,242,255,0.02);
                    box-shadow: 0 0 20px rgba(0,242,255,0.1);
                }

                .helper-text {
                    color: #555;
                    font-size: 0.85rem;
                    margin-top: 12px;
                }

                .radio-group {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .option-btn {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: clamp(12px, 2vw, 18px) 24px;
                    border-radius: 15px;
                    color: rgba(255,255,255,0.6);
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: inherit;
                    font-size: clamp(0.9rem, 2vw, 1rem);
                    font-weight: 500;
                }

                .option-btn:hover {
                    background: rgba(255,255,255,0.07);
                    transform: translateX(5px);
                }

                .option-btn.selected {
                    border-color: var(--accent-color);
                    color: #fff;
                    background: rgba(0, 242, 255, 0.08);
                    box-shadow: 0 0 20px rgba(0, 242, 255, 0.1);
                }

                .form-footer {
                    margin-top: 40px;
                    display: flex;
                    justify-content: flex-end;
                }

                .next-btn {
                    padding: 16px 35px;
                    border-radius: 50px;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    letter-spacing: 0.05em;
                    cursor: not-allowed;
                    background: rgba(255,255,255,0.05);
                    color: #444;
                    transition: all 0.4s;
                }

                .next-btn.active {
                    background: var(--accent-color);
                    color: #000;
                    cursor: pointer;
                    box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
                }

                .next-btn.active:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 35px rgba(0, 242, 255, 0.5);
                }

                .success-icon {
                    color: var(--accent-color);
                    margin-bottom: 25px;
                    filter: drop-shadow(0 0 20px var(--accent-glow));
                }

                .summary-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 25px;
                    border-radius: 20px;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .summary-card p {
                    font-size: 0.95rem;
                    color: #888;
                }

                .summary-card p span {
                    color: #fff;
                    font-weight: 600;
                    margin-right: 10px;
                }

                .spin-icon {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .form-container {
                        padding: 30px 20px;
                        min-height: 480px;
                    }
                    
                    .input-group label, .radio-group label {
                        font-size: 1.25rem;
                        margin-bottom: 20px;
                    }
                    
                    .next-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 18px;
                    }
                    
                    .step-icon {
                        margin-bottom: 15px;
                        width: 40px;
                        height: 40px;
                    }
                }
            `}</style>
        </section>
    );
};
