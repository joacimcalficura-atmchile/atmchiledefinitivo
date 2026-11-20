"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, LayoutGroup } from "framer-motion";
import { Home, Zap, Wallet, Shield, Users, BookOpen, Mail } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const navItems = [
  { name: "Inicio",    href: "/",          icon: <Home     size={18} /> },
  { name: "Servicios", href: "/servicios", icon: <Zap      size={18} /> },
  { name: "Leasing",   href: "/leasing-de-software", icon: <Wallet size={18} /> },
  { name: "Seguridad", href: "/seguridad", icon: <Shield   size={18} /> },
  { name: "Talento",   href: "/talento",   icon: <Users    size={18} /> },
  { name: "Insights",  href: "/insights",  icon: <BookOpen size={18} /> },
  { name: "Contacto",  href: "/contacto",  icon: <Mail     size={18} /> },
];

export const Navbar = () => {
  const pathname = usePathname();

  // La píldora animada usa layoutId y solo puede correr en cliente, pero la nav
  // en sí se renderiza siempre: si devolvemos null en SSR, Google no ve ni un
  // solo enlace interno del sitio.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeIndex = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <nav
      id="navegacion-principal"
      tabIndex={-1}
      aria-label="Navegación principal"
      className="outline-none fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex gap-0.5 p-1.5 sm:gap-1 sm:p-2 bg-white/90 backdrop-blur-2xl border border-slate-900/10 rounded-full shadow-2xl"
    >
      <LayoutGroup>
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <TransitionLink
              key={item.name}
              href={item.href}
              className="group relative block rounded-full"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Liquid Active Pill — slides between items via layoutId */}
              {isMounted && isActive && (
                <m.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#176BDE]/10 border border-[#176BDE]/20 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <m.div
                layout
                className={`relative z-10 flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2.5 py-2 sm:px-3 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-[#0E4FA5]"
                    : "text-slate-600 hover:text-[#0F1215]"
                }`}
              >
                {/* Icon — always visible */}
                <span className="shrink-0" aria-hidden="true">{item.icon}</span>

                {/* Texto real en el DOM para crawlers y lectores de pantalla,
                    aunque visualmente solo se muestre el ítem activo. */}
                <span className="sr-only">{item.name}</span>

                {/* Label — only shown when active */}
                <AnimatePresence mode="popLayout" initial={false}>
                  {isMounted && isActive && (
                    <m.span
                      key="label"
                      aria-hidden="true"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="hidden overflow-hidden whitespace-nowrap text-[0.75rem] uppercase tracking-widest sm:inline"
                    >
                      {item.name}
                    </m.span>
                  )}
                </AnimatePresence>
              </m.div>

              {/* Etiqueta visible al pasar el mouse o llegar con el teclado,
                  para no depender solo del ícono. */}
              {!isActive && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F1215] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {item.name}
                </span>
              )}
            </TransitionLink>
          );
        })}
      </LayoutGroup>
    </nav>
  );
};
