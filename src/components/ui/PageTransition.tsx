"use client";
import React, { useEffect, useState } from "react";
import { useTransitionContext } from "@/context/TransitionContext";

export const PageTransition = () => {
    const { isTransitioning } = useTransitionContext();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Our own solid premium background */}
            <div className="absolute inset-0 bg-[#010912]" />
            
            {/* The Blend-Mode Container: Makes black pixels transparent */}
            <div className="absolute inset-0 flex items-center justify-center z-10 mix-blend-screen">
                <div className="w-full h-full max-w-3xl max-h-[80vh] relative">
                    <spline-viewer 
                        url="https://prod.spline.design/ms-LBcsqYsg04mgw/scene.splinecode"
                        background="none"
                        className="w-full h-full block"
                    />
                    
                    {/* The Surgical Watermark Cover-Up (Adjusted frame, same high-level logic) */}
                    <div className="absolute bottom-0 right-0 w-52 h-14 bg-[#000000] z-50 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};
