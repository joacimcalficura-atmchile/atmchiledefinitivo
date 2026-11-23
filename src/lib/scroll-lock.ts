/**
 * Bloqueo de scroll de la página mientras hay una ventana emergente abierta.
 *
 * Por qué hace falta algo propio: el sitio usa Lenis (scroll suave) en la
 * raíz. Lenis escucha la rueda en toda la página y mueve el documento con
 * `window.scrollTo`, que ignora `overflow: hidden`. Por eso, con un modal
 * abierto, la rueda bajaba la página de atrás y el contenido del modal solo
 * se podía mover arrastrando la barra.
 *
 * Esta utilidad:
 * - detiene Lenis mientras haya al menos una ventana abierta (contador, para
 *   que dos ventanas encimadas no se pisen al cerrar);
 * - fija `overflow: hidden` en <html> y compensa el ancho de la barra de
 *   desplazamiento con padding, así el diseño no salta hacia la derecha;
 * - en táctil (iOS Safari incluido) bloquea el arrastre fuera de las zonas
 *   que realmente pueden desplazarse dentro de la ventana;
 * - conserva la posición: al cerrar, la página queda exactamente donde estaba.
 *
 * Las zonas con scroll dentro de la ventana siguen funcionando con rueda,
 * trackpad, táctil y teclado (Lenis deja pasar los eventos que ocurren dentro
 * de `[aria-modal="true"]` o `[data-scroll-lock-allow]`; ver Providers).
 */

type LenisLike = { stop: () => void; start: () => void };

let lenis: LenisLike | null = null;
let locks = 0;
let savedScrollY = 0;

/** Selector de las zonas donde el scroll propio sigue permitido. */
export const SCROLL_ALLOW_SELECTOR = '[aria-modal="true"], [data-scroll-lock-allow]';

/** Providers registra aquí la instancia de Lenis cuando existe. */
export function registerLenis(instance: LenisLike | null) {
    lenis = instance;
    if (instance && locks > 0) instance.stop();
}

export function isScrollLocked() {
    return locks > 0;
}

function canScroll(el: HTMLElement, dx: number, dy: number): boolean {
    const style = window.getComputedStyle(el);
    const vertical = Math.abs(dy) >= Math.abs(dx);
    if (vertical) {
        if (!/(auto|scroll|overlay)/.test(style.overflowY)) return false;
        if (el.scrollHeight <= el.clientHeight) return false;
        // dy > 0: el dedo baja, el contenido sube hacia arriba (scroll negativo).
        if (dy > 0) return el.scrollTop > 0;
        return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    }
    if (!/(auto|scroll|overlay)/.test(style.overflowX)) return false;
    if (el.scrollWidth <= el.clientWidth) return false;
    if (dx > 0) return el.scrollLeft > 0;
    return el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
}

let touchX = 0;
let touchY = 0;
const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
};

/**
 * Safari en iOS puede desplazar el documento aunque tenga overflow: hidden
 * cuando el arrastre empieza sobre el fondo o cuando una zona interna llega a
 * su tope (encadenamiento). Solo se deja pasar el arrastre si hay, dentro de
 * la ventana, un elemento que todavía puede desplazarse en esa dirección.
 */
const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1 || !e.cancelable) return;
    const dx = e.touches[0].clientX - touchX;
    const dy = e.touches[0].clientY - touchY;
    let node = e.target instanceof Element ? e.target : null;
    const root = node?.closest(SCROLL_ALLOW_SELECTOR);
    if (root) {
        while (node && node !== document.body) {
            if (node instanceof HTMLElement && canScroll(node, dx, dy)) return;
            if (node === root) break;
            node = node.parentElement;
        }
    }
    e.preventDefault();
};

/** Bloquea el scroll de la página. Devuelve la función que lo libera. */
export function lockScroll(): () => void {
    if (typeof document === "undefined") return () => {};
    locks += 1;
    if (locks === 1) {
        savedScrollY = window.scrollY;
        // Ancho de la barra de desplazamiento, medido antes de que Lenis la oculte.
        // (0 en teléfonos y en macOS con barras superpuestas.)
        const gap = window.innerWidth - document.documentElement.clientWidth;
        lenis?.stop();
        document.documentElement.classList.add("scroll-locked");
        if (gap > 0) document.body.style.paddingRight = `${gap}px`;
        document.addEventListener("touchstart", onTouchStart, { passive: true });
        document.addEventListener("touchmove", onTouchMove, { passive: false });
    }
    let released = false;
    return () => {
        if (released) return;
        released = true;
        locks = Math.max(0, locks - 1);
        if (locks > 0) return;
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
        document.documentElement.classList.remove("scroll-locked");
        document.body.style.paddingRight = "";
        // Si algo movió el documento mientras estaba bloqueado, vuelve a su sitio.
        if (Math.abs(window.scrollY - savedScrollY) > 1) {
            window.scrollTo({ top: savedScrollY, behavior: "instant" });
        }
        lenis?.start();
    };
}
