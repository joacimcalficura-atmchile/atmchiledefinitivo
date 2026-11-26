"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { m as motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send } from "lucide-react";

// ============================================================================
// TIPOS
// ============================================================================

// ============================================================================
// COMPONENTE: ModernMessage
// Diseño moderno con Glassmorphism y sombras suaves
// ============================================================================
interface MessagePart {
  type: string;
  text?: string;
  content?: string;
}

interface MessageContent {
  role: string;
  content?: string | MessagePart[];
  parts?: MessagePart[];
}

const ModernMessage = ({ msg, isLoading }: { msg?: MessageContent; isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex justify-start animate-in fade-in duration-500">
        <div className="bg-[#3F3D44]/50 text-[#E8E8E8] px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-2 border-l-2 border-[#16F3E8]">
          <span className="sr-only">El asistente está escribiendo…</span>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 bg-[#16F3E8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-[#16F3E8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-[#16F3E8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  if (!msg) return null;
  
  const isUser = msg.role === 'user';
  
  // Extraer contenido del mensaje - maneja diferentes formatos del AI SDK v6
  let content = '';
  if (typeof msg.content === 'string') {
    content = msg.content;
  } else if (Array.isArray(msg.parts)) {
    content = msg.parts.map((part) => part.text || '').join('');
  } else if (Array.isArray(msg.content)) {
    content = msg.content.map((part) => part.text || part.content || '').join('');
  }
  
  if (!content) return null;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-lg text-[0.9375rem] leading-relaxed ${
        isUser 
          ? 'bg-gradient-to-br from-[#176BDE] to-[#1259BC] text-white rounded-tr-sm'
          : 'bg-[#3F3D44]/50 text-[#F5F5F5] rounded-tl-sm border-l-2 border-[#16F3E8]'
      }`}>
        <p><span className="sr-only">{isUser ? "Tú: " : "Asistente: "}</span>{content}</p>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL: FloatingChatWidget (Modern & Empático)
// ============================================================================
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { trackConversion } from "@/lib/analytics";
import { BrandPattern } from "@/components/ui/BrandPattern";

const CHAT_SUGERENCIAS = [
  "Quiero cotizar un software a medida",
  "¿Cómo funciona el leasing de software?",
  "Necesito un ERP para mi rubro",
] as const;

// ... (ModernMessage se mantiene igual)

export const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  
  // AI SDK v6: status puede ser 'submitted' | 'streaming' | 'ready' | 'error'
  const isLoading = status === "submitted" || status === "streaming";
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  // Al abrir, el foco va al campo de mensaje; al cerrar, vuelve al botón.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      wasOpen.current = true;
      return () => window.clearTimeout(t);
    }
    if (wasOpen.current) launcherRef.current?.focus();
  }, [isOpen]);

  // Escape cierra el asistente.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Auto-scroll logic
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [reduceMotion]);

  useEffect(() => {
    // Sin mensajes se muestra la bienvenida desde arriba.
    if (isOpen && (messages.length > 0 || isLoading)) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  const enviar = (texto: string) => {
    if (!texto.trim() || isLoading) return;
    if (messages.length === 0) trackConversion({ name: "chat_start" });
    sendMessage({ text: texto });
    setInput("");
    inputRef.current?.focus();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enviar(input);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none font-sans">
      
      {/* Ventana de Chat: identidad ATM (Onyx + Sapphire Sky + Neon Ice, patrón andino-circuito) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            id="asistente-atm"
            role="dialog"
            aria-labelledby="asistente-atm-titulo"
            // Ventana no modal: la página sigue usable, pero la rueda y el táctil
            // dentro del chat mueven la conversación y no la página de fondo.
            data-scroll-lock-allow=""
            className="w-[calc(100vw-2rem)] sm:w-[400px] h-[75dvh] sm:h-[600px] max-h-[800px] mb-4 sm:mb-6 pointer-events-auto origin-bottom-right rounded-[2rem] p-[1.5px] bg-gradient-to-br from-[#176BDE] via-[#176BDE]/40 to-[#16F3E8] shadow-[0_25px_80px_-15px_rgba(23,107,222,0.55)]"
          >
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#0F1215]">

            {/* Cabecera de marca */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#176BDE] via-[#1259BC] to-[#0F1215] px-5 pt-5 pb-4">
              <BrandPattern tone="onDark" opacity={0.12} size={260} className="-z-10" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-[#16F3E8]/25 blur-3xl" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#16F3E8]/30 blur-md" aria-hidden="true" />
                    <div className="relative z-10 h-12 w-12 overflow-hidden rounded-full border-2 border-[#16F3E8]/70 bg-[#0F1215]">
                      <Image src="/images/asistente-futurista.jpg" alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 z-20 h-3.5 w-3.5 rounded-full border-2 border-[#0F1215] bg-[#16F3E8]" aria-hidden="true" />
                  </div>
                  <div>
                    <Image src="/logos/ATM_logo_white.png" alt="ATM Chile" width={1036} height={417} className="h-6 w-auto" />
                    <h2 id="asistente-atm-titulo" className="mt-1 text-[0.9375rem] font-black tracking-tight text-white">
                      Asistente IA
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F1215]/40 text-white transition-all hover:bg-[#0F1215]/70 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16F3E8]"
                  aria-label="Cerrar asistente"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#16F3E8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16F3E8] motion-safe:animate-pulse" aria-hidden="true" />
                  En línea
                </p>
                {/* Eslogan gráfico: borde en degradado, centro transparente */}
                <span className="rounded-full bg-gradient-to-r from-white/80 to-[#16F3E8] p-px">
                  <span className="block whitespace-nowrap rounded-full bg-[#0F1215]/60 px-3 py-1 font-slab text-[0.75rem] font-medium text-white">
                    A tu medida
                  </span>
                </span>
              </div>
            </div>

            {/* Área de Mensajes */}
            <div role="log" aria-live="polite" aria-label="Conversación con el asistente" tabIndex={0} className="relative flex-1 overflow-y-auto overscroll-contain p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.length === 0 && !isLoading && (
                <div className="space-y-4">
                  <div className="rounded-2xl border-l-4 border-[#16F3E8] bg-[#3F3D44]/40 px-4 py-4">
                    <p className="text-[0.9375rem] font-medium text-white">¡Hola! Soy el asistente de ATM.</p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-[#E8E8E8]">
                      Te ayudo a evaluar tu idea, cotizar software a medida o entender cómo funciona el leasing de software.
                    </p>
                  </div>
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#A09DA0]">Puedes empezar con</p>
                  <ul className="flex flex-col gap-2">
                    {CHAT_SUGERENCIAS.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => enviar(s)}
                          className="w-full rounded-xl border border-[#176BDE]/50 bg-[#176BDE]/10 px-4 py-3 text-left text-[0.875rem] font-medium text-white transition-colors hover:border-[#16F3E8] hover:bg-[#176BDE]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#16F3E8]"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {messages.map((msg, idx) => (
                <ModernMessage key={idx} msg={msg} />
              ))}
              {isLoading && <ModernMessage isLoading={true} />}
              <div ref={messagesEndRef} />
            </div>

            {/* Banner de Error */}
            {error && (
              <div role="alert" className="mx-5 mt-3 px-4 py-3 bg-red-900/60 border border-red-700/50 rounded-xl">
                <p className="text-red-200 text-sm">Error de conexión: {error.message}</p>
              </div>
            )}

            {/* Campo de mensaje */}
            <form onSubmit={(e) => onFormSubmit(e)} className="flex gap-3 border-t border-white/10 bg-[#0F1215] px-4 pt-4 pb-3">
              <input
                ref={inputRef}
                type="text"
                aria-label="Escribe tu mensaje al asistente"
                autoComplete="off"
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-2xl border border-white/15 bg-[#3F3D44]/40 px-5 py-3 text-sm text-white transition-all placeholder:text-[#A09DA0] focus:border-[#16F3E8] focus:outline-none focus:ring-2 focus:ring-[#16F3E8]/50"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#176BDE] to-[#16F3E8] text-[#0F1215] shadow-lg shadow-[#176BDE]/30 transition-all active:scale-90 disabled:opacity-40"
                aria-label="Enviar mensaje"
              >
                <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
            {/* Deber de información (Ley 21.719): quien escribe sabe que habla con una IA y dónde está la política. */}
            <p className="bg-[#0F1215] px-5 pb-4 text-center text-[0.75rem] leading-relaxed text-[#A09DA0]">
              Conversas con un asistente de inteligencia artificial. Al escribir, aceptas nuestra{" "}
              <a href="/privacidad" className="text-[#6AA5F5] underline underline-offset-2 hover:text-white">
                Política de Privacidad
              </a>
              .
            </p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante con Motor de Capas 3D Realista */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "asistente-atm" : undefined}
        whileHover="hover"
        whileTap="tap"
        initial="rest"
        className="relative w-24 h-24 flex items-center justify-center pointer-events-auto group"
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual de ATM"}
      >
        {/* Capa 0: Sombra Proyectada (Simula altura) */}
        <motion.div 
          variants={{
            rest: { scale: 0.8, opacity: 0.3, y: 10, filter: "blur(8px)" },
            hover: { scale: 1, opacity: 0.5, y: 15, filter: "blur(12px)" }
          }}
          className="absolute w-16 h-4 bg-black rounded-[100%] z-0"
        />

        {/* Capa 1: Resplandor Neon Atmosférico */}
        {!reduceMotion && <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-20 h-20 bg-[#176BDE]/30 rounded-full blur-2xl z-10"
        />}

        {/* Capa 2: Nucleo Principal (Texturizado) */}
        <motion.div
           variants={{
            rest: { y: 0, rotateZ: 0 },
            hover: { y: -8, rotateZ: 5 }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-16 h-16 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden border-2 border-[#16F3E8]/60 bg-[#0F1215] z-20"
        >
          <Image 
            src="/images/asistente-futurista.jpg" 
            alt="" 
            fill
            sizes="64px"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback SVG */}
          <div className="hidden w-full h-full flex items-center justify-center bg-slate-800 text-cyan-400">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          
          {/* Brillo de Superficie (Simula cristal) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
        </motion.div>

        {/* Capa 3: Anillo Orbital Exterior (Paralaje) */}
        <motion.div
           variants={{
            rest: { scale: 0.9, opacity: 0.2, rotate: 0 },
            hover: { scale: 1.1, opacity: 0.6, rotate: 180 }
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute inset-2 border-2 border-dashed border-[#16F3E8]/40 rounded-full z-30"
        />

        {/* Efecto de Pulso (Solo cuando está cerrado) */}
        {!isOpen && !reduceMotion && (
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-16 h-16 rounded-full border-2 border-[#176BDE] z-10"
          />
        )}
      </motion.button>
    </div>
  );
};
