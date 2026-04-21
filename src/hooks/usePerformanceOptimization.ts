"use client";

import { useState, useEffect, useRef } from "react";

interface PerformanceOptions {
  deferredDelay?: number;
  threshold?: number;
}

export const usePerformanceOptimization = (options: PerformanceOptions = {}) => {
  const { deferredDelay = 1500, threshold = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Detect mobile capability
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 2. Aggressive Lazy Loading (Deferred Initialization)
    const initDeferred = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => {
          setTimeout(() => setShouldLoad(true), deferredDelay);
        });
      } else {
        setTimeout(() => setShouldLoad(true), deferredDelay + 500);
      }
    };

    // Initialize deferred loading after first mount
    initDeferred();

    // 3. Pause Inteligente (Intersection Observer)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, [deferredDelay, threshold]);

  return {
    containerRef,
    isVisible,
    shouldLoad,
    isMobile,
    // Pixel ratio management
    dpr: isMobile ? 1 : 1.5,
  };
};
