"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransitionContext } from "@/context/TransitionContext";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  "aria-label"?: string;
  "aria-current"?: React.AriaAttributes["aria-current"];
}

export const TransitionLink = ({
  href,
  children,
  className,
  target,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: TransitionLinkProps) => {
  const router = useRouter();
  const { setIsTransitioning } = useTransitionContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Skip interception for external links
    if (target === "_blank" || href.startsWith("http")) return;
    // Ctrl/Cmd/Shift + clic o clic medio: que el navegador abra la pestaña nueva.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();

    // Antes se esperaban 800 ms fijos (pensados para una animación de Spline
    // que ya no existe) antes de navegar, más 400 ms de overlay: 1,2 s de
    // espera en cada clic del menú. Ahora se navega de inmediato y el overlay
    // solo cubre el cambio de página.
    setIsTransitioning(true);
    router.push(href);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
};
