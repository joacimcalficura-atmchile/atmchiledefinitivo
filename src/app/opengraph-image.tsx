import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'ATM Chile - Partner Tecnológico Estratégico 360';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            // Estilo Glassmorphism para el OG Image
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a', // slate-900
                    backgroundSize: '100px 100px',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        borderRadius: '24px',
                        padding: '60px 80px',
                        maxWidth: '900px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', // cobalt blue
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                marginRight: '20px',
                            }}
                        >
                            &lt;/&gt;
                        </div>
                        <h1
                            style={{
                                fontSize: '64px',
                                fontWeight: '800',
                                color: 'white',
                                letterSpacing: '-2px',
                                margin: 0,
                                lineHeight: 1,
                            }}
                        >
                            ATM CHILE
                        </h1>
                    </div>

                    <h2
                        style={{
                            fontSize: '36px',
                            fontWeight: '500',
                            color: '#94a3b8', // slate-400
                            textAlign: 'center',
                            margin: 0,
                            maxWidth: '800px',
                            lineHeight: 1.4,
                        }}
                    >
                        Partner Tecnológico Estratégico 360
                    </h2>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
