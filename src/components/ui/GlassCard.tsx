"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`
        bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6
        hover:border-brand-cobalt/30 transition-colors
        ${className}
      `}
        >
            {children}
        </m.div>
    );
};
