"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { TransitionProvider } from "@/context/TransitionContext";

// SSR-safe: PageTransition uses web components that cannot run on Node.js
const PageTransition = dynamic(
  () => import("@/components/ui/PageTransition").then((mod) => mod.PageTransition),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  // Quien pide menos movimiento en su sistema recibe el scroll nativo, sin inercia.
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    // Scroll suave con inercia en rueda/trackpad; el táctil (móvil) queda nativo.
    // `anchors` hace que los enlaces #seccion también bajen con la misma suavidad.
    <ReactLenis
      root
      options={{ lerp: 0.085, smoothWheel: !reducedMotion, wheelMultiplier: 1, anchors: !reducedMotion }}
    >
      <LazyMotion features={domAnimation} strict>
        <TransitionProvider>
          <PageTransition />
          {children}
        </TransitionProvider>
      </LazyMotion>
    </ReactLenis>
  );
}
