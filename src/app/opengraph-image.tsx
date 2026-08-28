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
    // Logotipo oficial embebido (Brandbook)
    const logo = await fetch(
        new URL('../../public/logos/ATM_logo_white.png', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const logoSrc = `data:image/png;base64,${Buffer.from(logo).toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0F1215', // Onyx
                    backgroundSize: '100px 100px',
                    backgroundImage:
                        'radial-gradient(circle at 25px 25px, rgba(23, 107, 222, 0.12) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(22, 243, 232, 0.08) 2%, transparent 0%)',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Resplandor de marca sutil (ambiente, no sobre el logo) */}
                <div
                    style={{
                        position: 'absolute',
                        width: '620px',
                        height: '620px',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(23, 107, 222, 0.35) 0%, rgba(22, 243, 232, 0.10) 45%, transparent 70%)',
                        display: 'flex',
                    }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={logoSrc}
                    alt="ATM Chile"
                    width={640}
                    height={258}
                    style={{ objectFit: 'contain' }}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '44px',
                        padding: '14px 34px',
                        borderRadius: '999px',
                        border: '1px solid rgba(22, 243, 232, 0.35)',
                        background: 'rgba(23, 107, 222, 0.10)',
                    }}
                >
                    <span
                        style={{
                            fontSize: '30px',
                            fontWeight: 600,
                            letterSpacing: '4px',
                            color: '#16F3E8', // Neon Ice
                            textTransform: 'uppercase',
                        }}
                    >
                        Partner Tecnológico Estratégico 360
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
