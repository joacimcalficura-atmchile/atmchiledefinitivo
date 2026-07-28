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

    // 1. Prevent instant navigation
    e.preventDefault();

    // 2. Activate cinematic overlay
    setIsTransitioning(true);

    // 3. Wait 800ms for Spline to spin, then push route
    setTimeout(() => {
      router.push(href);

      // 4. Wait 400ms for new page to hydrate, then fade out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 800);
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
