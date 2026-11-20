"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = [
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "iframe",
    "[tabindex]:not([tabindex='-1'])",
    "[contenteditable='true']",
].join(",");

function focusables(root: HTMLElement): HTMLElement[] {
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0 && !el.closest("[inert]")
    );
}

/**
 * Comportamiento accesible de un diálogo modal (WAI-ARIA APG):
 * - al abrir, lleva el foco al diálogo (o al elemento indicado);
 * - Tab y Mayús+Tab quedan dentro del diálogo;
 * - Escape lo cierra (si se pasa `onClose`);
 * - el resto de la página queda `inert` (ni foco ni lector de pantalla);
 * - al cerrar, el foco vuelve a quien abrió el diálogo.
 *
 * `inert` se aplica a los hermanos del diálogo y de cada uno de sus
 * ancestros, así que funciona aunque el diálogo viva dentro de <main>.
 */
export function useDialogA11y(
    ref: RefObject<HTMLElement | null>,
    {
        open = true,
        onClose,
        initialFocus,
        lockScroll = true,
    }: {
        open?: boolean;
        onClose?: () => void;
        initialFocus?: RefObject<HTMLElement | null>;
        lockScroll?: boolean;
    } = {}
) {
    // onClose suele ser una función nueva en cada render: se guarda en un ref
    // para no re-ejecutar el efecto (y mover el foco) mientras se escribe.
    const closeRef = useRef(onClose);
    useEffect(() => {
        closeRef.current = onClose;
    });
    const closable = Boolean(onClose);

    useEffect(() => {
        if (!open) return;
        const dialog = ref.current;
        if (!dialog) return;

        const opener = document.activeElement as HTMLElement | null;

        // El resto de la página queda inerte mientras el diálogo está abierto.
        const inerted: HTMLElement[] = [];
        let node: HTMLElement | null = dialog;
        while (node && node !== document.body) {
            const parent: HTMLElement | null = node.parentElement;
            if (!parent) break;
            for (const sibling of Array.from(parent.children) as HTMLElement[]) {
                if (sibling === node || sibling.tagName === "SCRIPT" || sibling.hasAttribute("inert")) continue;
                sibling.setAttribute("inert", "");
                inerted.push(sibling);
            }
            node = parent;
        }

        const previousOverflow = document.body.style.overflow;
        if (lockScroll) document.body.style.overflow = "hidden";

        const focusFirst = () => {
            const target = initialFocus?.current ?? dialog;
            target.focus({ preventScroll: true });
        };
        const frame = requestAnimationFrame(focusFirst);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeRef.current) {
                e.stopPropagation();
                closeRef.current();
                return;
            }
            if (e.key !== "Tab") return;
            const items = focusables(dialog);
            if (items.length === 0) {
                e.preventDefault();
                dialog.focus();
                return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;
            if (e.shiftKey && (active === first || active === dialog)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKeyDown, true);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("keydown", onKeyDown, true);
            for (const el of inerted) el.removeAttribute("inert");
            if (lockScroll) document.body.style.overflow = previousOverflow;
            if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
        };
    }, [open, closable, ref, initialFocus, lockScroll]);
}
