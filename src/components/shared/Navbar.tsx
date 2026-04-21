"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, LayoutGroup } from "framer-motion";
import { Home, Zap, Shield, Users, BookOpen, Mail } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";

const navItems = [
  { name: "Inicio",    href: "/",          icon: <Home     size={18} /> },
  { name: "Servicios", href: "/servicios", icon: <Zap      size={18} /> },
  { name: "Seguridad", href: "/seguridad", icon: <Shield   size={18} /> },
  { name: "Talento",   href: "/talento",   icon: <Users    size={18} /> },
  { name: "Insights",  href: "/insights",  icon: <BookOpen size={18} /> },
  { name: "Contacto",  href: "/contacto",  icon: <Mail     size={18} /> },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const activeIndex = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex gap-1 p-2 bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl">
      <LayoutGroup>
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <TransitionLink
              key={item.name}
              href={item.href}
              className="relative"
            >
              {/* Liquid Active Pill — slides between items via layoutId */}
              {isActive && (
                <m.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <m.div
                layout
                className={`relative z-10 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-[#00AEEF]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {/* Icon — always visible */}
                <span className="shrink-0">{item.icon}</span>

                {/* Label — only shown when active */}
                <AnimatePresence mode="popLayout" initial={false}>
                  {isActive && (
                    <m.span
                      key="label"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-widest"
                    >
                      {item.name}
                    </m.span>
                  )}
                </AnimatePresence>
              </m.div>
            </TransitionLink>
          );
        })}
      </LayoutGroup>
    </nav>
  );
};
