import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import logoAtm from '../assets/logo_atm.jpg';

const Fragment = ({ position, rotation, scale, color }: any) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            mesh.current.position.y += Math.sin(time + position[0]) * 0.002;
            mesh.current.rotation.x += 0.001;
            mesh.current.rotation.z += 0.001;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={mesh}
                position={position}
                rotation={rotation}
                scale={scale}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={hovered ? '#00f2ff' : color}
                    emissive={hovered ? '#00f2ff' : '#000000'}
                    emissiveIntensity={hovered ? 2 : 0}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
};

const FragmentsCloud = ({ count = 60 }) => {
    const fragments = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10;
            const rX = Math.random() * Math.PI;
            const rY = Math.random() * Math.PI;
            const rZ = Math.random() * Math.PI;
            const s = 0.05 + Math.random() * 0.3;
            temp.push({
                position: [x, y, z],
                rotation: [rX, rY, rZ],
                scale: [s, s, s],
                color: '#1a1a1a'
            });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {fragments.map((props, i) => (
                <Fragment key={i} {...props} />
            ))}
        </group>
    );
};

export const Hero = () => {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
                    <FragmentsCloud />
                    <Environment preset="city" />
                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.15} far={10} color="#000000" />
                </Canvas>
            </div>

            <div className="hero-content" style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                padding: '0 20px',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <div
                    className="hero-logo-wrapper"
                    style={{
                        pointerEvents: 'auto',
                        animation: 'pulse 4s infinite ease-in-out',
                        marginBottom: '30px'
                    }}
                >
                    <img src={logoAtm} alt="Future Solution SpA" className="hero-logo-img" />
                </div>

                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    margin: '20px 0',
                    background: 'linear-gradient(to bottom, #fff 40%, #999 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.05,
                    maxWidth: '900px'
                }}>
                    Ingeniería Invisible.<br />Impacto Tangible.
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                    marginBottom: '25px',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    maxWidth: '650px',
                    lineHeight: '1.6'
                }}>
                    Lideramos la transformación digital empresarial en Chile mediante IA avanzada, Automatización de Procesos y Cloud Computing de alto rendimiento.
                </p>

                <div style={{ pointerEvents: 'auto' }}>
                    <button
                        className="postular-btn"
                        onClick={() => {
                            const admission = document.getElementById('admission');
                            if (admission) {
                                admission.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        POSTULAR AHORA
                    </button>

                    <p style={{
                        marginTop: '20px',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em'
                    }}>
                        <span className="notranslate" translate="no">Future Solution SpA</span> - A TU MEDIDA
                    </p>
                </div>
            </div>

            <style>{`
                .postular-btn {
                    color: #000;
                    background: var(--accent-color);
                    border: none;
                    padding: 18px 45px;
                    border-radius: 50px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    text-transform: uppercase;
                    box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
                }
                
                .postular-btn:hover {
                    transform: scale(1.05) translateY(-2px);
                    box-shadow: 0 0 40px rgba(0, 242, 255, 0.6);
                    background: #fff;
                }

                @media (max-width: 768px) {
                    .postular-btn {
                        padding: 15px 35px;
                        font-size: 0.85rem;
                        width: 100%;
                        max-width: 280px;
                    }
                }
            `}</style>
        </div>
    );
};
