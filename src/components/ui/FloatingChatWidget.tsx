"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { m as motion, AnimatePresence } from "framer-motion";
import { X, Send, Activity } from "lucide-react";

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
        <div className="bg-slate-800/60 backdrop-blur-sm text-slate-300 px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 border border-slate-700/30">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
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
      <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-lg text-[15px] leading-relaxed ${
        isUser 
          ? 'bg-gradient-to-br from-cyan-600 to-cyan-500 text-white rounded-tr-sm' 
          : 'bg-slate-800/80 backdrop-blur-md text-slate-100 rounded-tl-sm border border-slate-700/50'
      }`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL: FloatingChatWidget (Modern & Empático)
// ============================================================================
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

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

  // Auto-scroll logic
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none font-sans">
      
      {/* Ventana de Chat - Glassmorphism Moderno */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[340px] sm:w-[400px] h-[580px] bg-slate-900/85 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] shadow-2xl mb-6 overflow-hidden flex flex-col pointer-events-auto origin-bottom-right"
          >
            
            {/* Header Limpio y Amigable */}
            <div className="bg-slate-800/40 px-6 py-5 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 relative group/header flex-shrink-0">
                  {/* Capa de Sombra/Brillo 3D */}
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md group-hover/header:blur-lg transition-all duration-500"></div>
                  
                  {/* Capa de Textura Principal */}
                  <div className="absolute inset-0 rounded-full border border-cyan-500/40 overflow-hidden shadow-inner z-10 bg-slate-900">
                    <Image 
                      src="/images/asistente-futurista.jpg" 
                      alt="ATM AI Assistant" 
                      fill
                      sizes="48px"
                      className="object-cover rounded-full group-hover/header:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center bg-slate-800 text-cyan-400">
                      <Activity size={18} />
                    </div>
                  </div>

                  {/* Anillo de Luz Orbital */}
                  <div className="absolute -inset-1 border border-cyan-400/20 rounded-full animate-[spin_10s_linear_infinite] opacity-50"></div>
                </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-slate-100 font-bold text-[15px] tracking-tight">Asistente ATMCHILE</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <p className="text-cyan-400 text-[11px] font-bold uppercase tracking-wider">En línea</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-transparent to-cyan-500/5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <ModernMessage key={idx} msg={msg} />
              ))}
              {isLoading && <ModernMessage isLoading={true} />}
              <div ref={messagesEndRef} />
            </div>

            {/* Banner de Error */}
            {error && (
              <div className="mx-5 mt-3 px-4 py-3 bg-red-900/60 border border-red-700/50 rounded-xl">
                <p className="text-red-200 text-sm">Error de conexión: {error.message}</p>
              </div>
            )}

            {/* Input Panel Moderno */}
            <form onSubmit={(e) => onFormSubmit(e)} className="p-5 bg-slate-800/40 border-t border-slate-700/50 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-slate-900/60 text-slate-100 border border-slate-600/40 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder-slate-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input?.trim()} 
                className="bg-cyan-500 hover:bg-cyan-400 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-30 disabled:hover:bg-cyan-500 shadow-xl shadow-cyan-900/20 group"
                aria-label="Enviar mensaje"
              >
                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante con Motor de Capas 3D Realista */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover="hover"
        whileTap="tap"
        initial="rest"
        className="relative w-24 h-24 flex items-center justify-center pointer-events-auto group"
        aria-label="Abrir Asistente"
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
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl z-10"
        />

        {/* Capa 2: Nucleo Principal (Texturizado) */}
        <motion.div
           variants={{
            rest: { y: 0, rotateZ: 0 },
            hover: { y: -8, rotateZ: 5 }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-16 h-16 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden border-2 border-cyan-500/40 bg-slate-950 z-20"
        >
          <Image 
            src="/images/asistente-futurista.jpg" 
            alt="Avatar ATM 3D" 
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
          className="absolute inset-2 border-2 border-dashed border-cyan-400/30 rounded-full z-30"
        />

        {/* Efecto de Pulso (Solo cuando está cerrado) */}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-16 h-16 rounded-full border-2 border-cyan-400 z-10"
          />
        )}
      </motion.button>
    </div>
  );
};
