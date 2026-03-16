"use client";

import React, { useRef } from "react";
import { m } from "framer-motion";
import { Home, Zap, Shield, Users, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Inicio",    href: "/",          icon: <Home     size={18} /> },
    { name: "Servicios", href: "/servicios", icon: <Zap      size={18} /> },
    { name: "Seguridad", href: "/seguridad", icon: <Shield   size={18} /> },
    { name: "Talento",   href: "/talento",   icon: <Users    size={18} /> },
    { name: "Contacto",  href: "/contacto",  icon: <Mail     size={18} /> },
];

export const Navbar = () => {
    const pathname  = usePathname();
    const navRef    = useRef<HTMLDivElement>(null);

    // Determinar índice activo real basado en la ruta actual
    const activeIndex = (() => {
        // Club 100 es un hash de inicio, lo marcamos activo solo si la ruta es exactamente "/"
        // con el hash correspondiente (el hash no llega al servidor, así que lo manejamos
        // marcando Inicio como fallback si la ruta es "/")
        const match = navItems.findIndex((item) => {
            if (item.href === "/") return pathname === "/";
            return pathname.startsWith(item.href);
        });
        return match === -1 ? 0 : match;
    })();

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
            <div
                ref={navRef}
                className="relative flex items-center gap-1 p-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]"
            >


                {navItems.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                                ${isActive
                                    ? "text-brand-cobalt"
                                    : "text-slate-500 hover:text-slate-900"
                                }
                            `}
                        >
                            {/* Píldora activa individual — técnica layout animation */}
                            {isActive && (
                                <m.span
                                    layoutId="nav-active-bg"
                                    className="absolute inset-0 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/20"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10">{item.icon}</span>
                            <span className="hidden md:block relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
