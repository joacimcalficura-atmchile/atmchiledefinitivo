"use client";
import React, { useEffect, useState } from "react";
import { useTransitionContext } from "@/context/TransitionContext";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

export const PageTransition = () => {
    const { isTransitioning } = useTransitionContext();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isTransitioning) return null;

    return (
        <div 
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-500"
        >
            {/* Dark premium background */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl" />
            
            {/* Elegant Loading Animation */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#00AEEF] animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-b-2 border-white/20 animate-[spin_2s_reverse_linear_infinite]"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-white/50 tracking-tighter">ATM</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/90 text-sm font-bold tracking-[0.3em] uppercase">Procesando</span>
                    <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00AEEF] w-1/2 rounded-full animate-pulse blur-[1px]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
