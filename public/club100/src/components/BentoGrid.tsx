import type { ReactNode } from 'react';
import { Zap, MessageCircle, Cloud, BarChart3, ShieldCheck, Cpu } from 'lucide-react';

interface BentoItemProps {
    title: string;
    description: string;
    icon: ReactNode;
    colSpan?: number;
    rowSpan?: number;
}

const BentoItem = ({ title, description, icon, colSpan = 1, rowSpan = 1 }: BentoItemProps) => {
    return (
        <div
            className="glass-panel bento-item"
            style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                padding: 'min(35px, 6vw)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid rgba(0, 242, 255, 0.1)',
                minHeight: '180px'
            }}
        >
            <div style={{
                color: 'var(--accent-color)',
                marginBottom: 'auto',
                background: 'rgba(0, 242, 255, 0.05)',
                width: 'fit-content',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3 style={{
                    fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#fff',
                    letterSpacing: '-0.02em'
                }}>
                    {title}
                </h3>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    lineHeight: '1.5',
                    fontWeight: 300
                }}>
                    {description}
                </p>
            </div>

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                opacity: 0.05,
                pointerEvents: 'none'
            }}>
                {icon}
            </div>
        </div>
    );
};

export const BentoGrid = () => {
    return (
        <section id="benefits" style={{ padding: '80px 20px' }}>
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                <p style={{
                    color: 'var(--accent-color)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.4em',
                    marginBottom: '15px',
                    textTransform: 'uppercase',
                    fontWeight: 600
                }}>
                    /// TECH ECOSYSTEM
                </p>
                <h2 className="glow-text" style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    marginBottom: '20px',
                    letterSpacing: '-0.03em'
                }}>
                    Soluciones Tecnológicas
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6', fontWeight: 300 }}>
                    Diseñamos arquitecturas de software de alto impacto que transforman desafíos empresariales complejos en ventajas competitivas exponenciales.
                </p>
            </div>

            <div className="bento-grid-container">
                <BentoItem
                    title="Inteligencia Artificial"
                    description="Implementación de agentes IA de última generación, análisis predictivo y automatización cognitiva."
                    icon={<Zap size={28} />}
                    colSpan={2}
                    rowSpan={2}
                />
                <BentoItem
                    title="Automatización de Ventas"
                    description="Convertimos tu WhatsApp en una máquina de ventas 24/7 mediante flujos inteligentes."
                    icon={<MessageCircle size={28} />}
                    colSpan={2}
                />
                <BentoItem
                    title="Infraestructura Cloud"
                    description="Servidores escalables con disponibilidad del 99.9% en AWS y Google Cloud."
                    icon={<Cloud size={28} />}
                    colSpan={2}
                />
                <BentoItem
                    title="Data Analytics"
                    description="Visualiza el pulso de tu negocio en tiempo real. Dashboards interactivos."
                    icon={<BarChart3 size={28} />}
                    colSpan={1}
                />
                <BentoItem
                    title="Ciberseguridad"
                    description="Protocolos de protección de datos nivel empresarial."
                    icon={<ShieldCheck size={28} />}
                    colSpan={1}
                />
                <BentoItem
                    title="Consultoría IT"
                    description="Hoja de ruta personalizada para tu transformación digital."
                    icon={<Cpu size={28} />}
                    colSpan={2}
                />
            </div>

            <style>{`
                .bento-grid-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-auto-rows: minmax(160px, auto);
                    gap: 15px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                @media (max-width: 1024px) {
                    .bento-grid-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (max-width: 768px) {
                    .bento-grid-container {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                    
                    .bento-item {
                        grid-column: span 1 !important;
                        grid-row: span 1 !important;
                        min-height: auto !important;
                        padding: 30px 20px !important;
                    }
                }
            `}</style>
        </section>
    );
};
