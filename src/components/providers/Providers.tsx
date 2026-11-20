"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { TransitionProvider } from "@/context/TransitionContext";
import { A11Y_EVENT, readPrefs, type A11yPrefs } from "@/lib/a11y-prefs";

// SSR-safe: PageTransition uses web components that cannot run on Node.js
const PageTransition = dynamic(
  () => import("@/components/ui/PageTransition").then((mod) => mod.PageTransition),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  // Quien pide menos movimiento en su sistema recibe el scroll nativo, sin inercia.
  // También quien lo activa en el panel de accesibilidad del sitio.
  const [systemReduced, setSystemReduced] = useState(false);
  const [panelReduced, setPanelReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(mq.matches);
    sync();
    // localStorage solo existe en el cliente, después de montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPanelReduced(readPrefs().reduceMotion);
    const onPrefs = (e: Event) => setPanelReduced((e as CustomEvent<A11yPrefs>).detail.reduceMotion);
    mq.addEventListener("change", sync);
    window.addEventListener(A11Y_EVENT, onPrefs);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener(A11Y_EVENT, onPrefs);
    };
  }, []);
  const reducedMotion = systemReduced || panelReduced;

  return (
    // Scroll suave con inercia en rueda/trackpad; el táctil (móvil) queda nativo.
    // `anchors` hace que los enlaces #seccion también bajen con la misma suavidad.
    <ReactLenis
      root
      options={{ lerp: 0.085, smoothWheel: !reducedMotion, wheelMultiplier: 1, anchors: !reducedMotion }}
    >
      <LazyMotion features={domAnimation} strict>
        {/* Con movimiento reducido, framer-motion omite desplazamientos y escalas. */}
        <MotionConfig reducedMotion={panelReduced ? "always" : "user"}>
          <TransitionProvider>
            <PageTransition />
            {children}
          </TransitionProvider>
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
