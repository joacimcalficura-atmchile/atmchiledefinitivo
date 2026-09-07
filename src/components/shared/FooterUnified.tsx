"use client";

import React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Instagram, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers
} from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/atm-future-solution-spa/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/atm_chile/", label: "Instagram" },
];

const footerLinks = [
  {
    title: "Soluciones",
    links: [
      { name: "Talento Senior", href: "/talento" },
      { name: "IA & Automatización", href: "/servicios" },
      { name: "Ciberseguridad", href: "/seguridad" },
      { name: "Arquitectura Cloud", href: "/servicios" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { name: "Sobre ATM", href: "/#ecosistema" },
      { name: "Club 100", href: "/#club100" },
      { name: "Casos de Éxito", href: "/servicios#casos" },
      { name: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "/privacidad" },
      { name: "Términos", href: "/terminos" },
      { name: "Compliance", href: "/privacidad#compliance" },
    ],
  },
];

export const FooterUnified = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-200 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-cobalt/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-brand-cyan/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Columna Marca */}
          <div className="space-y-6">
            <m.div className="mb-4">
              <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                ATM Chile
              </h2>
            </m.div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Partner Tecnológico Estratégico 360. Transformamos la visión empresarial en realidades digitales escalables y seguras.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-cobalt hover:border-brand-cobalt/30 hover:bg-brand-cobalt/5 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-slate-600 hover:text-brand-cobalt text-sm transition-colors"
                    >
                      <ArrowRight size={14} className="mr-0 opacity-0 -translate-x-2 group-hover:mr-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sección de Contacto Rápido / Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-slate-100 mb-12">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-cobalt border border-slate-200">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Corporativo</p>
              <p className="text-sm font-bold text-slate-900">alberto.castillo@atmchile.cl</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-cobalt border border-slate-200">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ubicación Central</p>
              <p className="text-sm font-bold text-slate-900">Santa Magdalena 75, Providencia</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-cobalt border border-slate-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certificación</p>
              <p className="text-sm font-bold text-slate-900">Audit-Ready Solutions</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:row gap-6 justify-between items-center bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm transition-all duration-300">
          <div className="text-slate-500 text-xs">
            © {currentYear} ATM CHILE. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
               <Globe size={14} className="text-brand-cobalt" />
               <span className="text-[10px] font-black tracking-widest uppercase">Global Reach</span>
             </div>
             <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
               <Layers size={14} className="text-brand-cyan" />
               <span className="text-[10px] font-black tracking-widest uppercase">360 View</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
