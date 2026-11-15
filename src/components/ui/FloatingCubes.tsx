"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

const Fragment = ({ position, rotation, scale, color, light, isVisible }: any) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!isVisible) return; // Optimization: Stop calculations if not visible
        const time = state.clock.getElapsedTime();
        if (mesh.current) {
            // Movimiento base de antigravedad
            mesh.current.position.y += Math.sin(time + position[0]) * 0.002;
            
            // Interacción con mouse: rotación sutil hacia la posición del mouse
            mesh.current.rotation.x += 0.002 + (mouse.y * 0.01);
            mesh.current.rotation.z += 0.001 + (mouse.x * 0.01);
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
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
                    color={hovered ? (light ? "#176BDE" : "#16F3E8") : color}
                    emissive={hovered ? (light ? "#176BDE" : "#16F3E8") : (light ? "#176BDE" : "#176BDE")}
                    emissiveIntensity={hovered ? 2.5 : 0.4}
                    roughness={light ? 0.2 : 0}
                    metalness={1}
                    transparent
                    opacity={light ? 0.4 : 0.7}
                />
            </mesh>
        </Float>
    );
};

const FragmentsCloud = ({ count = 40, light = false, isVisible = true }) => {
    const fragments = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 22;
            const y = (Math.random() - 0.5) * 22;
            const z = (Math.random() - 0.5) * 12;
            const rX = Math.random() * Math.PI;
            const rY = Math.random() * Math.PI;
            const rZ = Math.random() * Math.PI;
            const s = 0.15 + Math.random() * 0.6;
            temp.push({
                position: [x, y, z] as [number, number, number],
                rotation: [rX, rY, rZ] as [number, number, number],
                scale: [s, s, s] as [number, number, number],
                color: light 
                    ? (i % 2 === 0 ? "#176BDE" : "#176BDE") 
                    : (i % 3 === 0 ? "#176BDE" : i % 3 === 1 ? "#16F3E8" : "#176BDE")
            });
        }
        return temp;
    }, [count, light]);

    return (
        <group>
            {fragments.map((props, i) => (
                <Fragment key={i} {...props} light={light} isVisible={isVisible} />
            ))}
        </group>
    );
};

/**
 * Si WebGL no está disponible o three.js falla, el fondo decorativo desaparece
 * en silencio en vez de llevarse consigo la página (y el formulario de contacto).
 */
class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error: unknown) {
        console.warn("[FloatingCubes] Fondo 3D desactivado:", error instanceof Error ? error.message : error);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

export const FloatingCubes = ({ count = 40, light = false }) => {
    const { containerRef, isVisible, isMobile, dpr } = usePerformanceOptimization({ threshold: 0 });
    
    // Optimize count for mobile
    const optimizedCount = isMobile ? Math.min(count, 15) : count;

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 will-change-transform" style={{ transform: "translateZ(0)" }}>
            <CanvasErrorBoundary>
            <Canvas 
                dpr={dpr} 
                gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
                frameloop={isVisible ? "always" : "never"}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                
                {/* Iluminación Dinámica según el tema */}
                <ambientLight intensity={light ? 0.8 : 0.7} />
                <spotLight position={[15, 15, 10]} angle={0.15} penumbra={1} intensity={light ? 150 : 2} color={light ? "#176BDE" : "#16F3E8"} castShadow />
                <pointLight position={[10, 10, 10]} intensity={light ? 100 : 3} color={light ? "#176BDE" : "#176BDE"} />
                <pointLight position={[-10, -10, -10]} intensity={light ? 50 : 1.5} color="#176BDE" />
                
                <Suspense fallback={null}>
                    <FragmentsCloud count={optimizedCount} light={light} isVisible={isVisible} />
                    {/*
                      Entorno de reflejos generado en la GPU con Lightformers.
                      Antes era `preset="city"`, que descarga un HDR de 1,5 MB desde
                      raw.githack.com: si ese host no respondía (o lo bloqueaba
                      una red corporativa), la excepción tumbaba la página entera
                      con «Application error». Así no hay ninguna descarga externa.
                    */}
                    <Environment resolution={64} frames={1}>
                        <Lightformer intensity={2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                        <Lightformer intensity={1.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.5, 1]} />
                        <Lightformer intensity={1.5} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
                        <Lightformer form="ring" color="#16F3E8" intensity={4} position={[-5, 2, -2]} scale={2} />
                    </Environment>
                    {!light && !isMobile && ( // Further optimize mobile by removing shadows
                        <ContactShadows 
                            resolution={512} 
                            scale={40} 
                            blur={2.5} 
                            opacity={0.3} 
                            far={20} 
                            color="#176BDE" 
                        />
                    )}
                </Suspense>
            </Canvas>
            </CanvasErrorBoundary>
        </div>
    );
};
