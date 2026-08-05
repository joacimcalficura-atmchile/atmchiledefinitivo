"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { TransitionProvider } from "@/context/TransitionContext";

// SSR-safe: PageTransition uses web components that cannot run on Node.js
const PageTransition = dynamic(
  () => import("@/components/ui/PageTransition").then((mod) => mod.PageTransition),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <LazyMotion features={domAnimation} strict>
        <TransitionProvider>
          <PageTransition />
          {children}
        </TransitionProvider>
      </LazyMotion>
    </ReactLenis>
  );
}
