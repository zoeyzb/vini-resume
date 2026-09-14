import { useEffect } from "react";

/**
 * Drives the specular sweep on every `.surface` from one delegated listener.
 *
 * Attaching a pointermove handler to each card would mean dozens of React
 * handlers all firing during a single mouse sweep. This finds the surface under
 * the cursor instead, writes two CSS variables to it, and clears them when the
 * cursor leaves — one listener for the whole page, throttled to a frame.
 */
export function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices have no hover state to light, and the listener would fire
    // on every drag.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let pending: PointerEvent | null = null;
    let lit: HTMLElement | null = null;

    const clear = () => {
      if (!lit) return;
      lit.style.removeProperty("--x");
      lit.style.removeProperty("--y");
      lit = null;
    };

    const apply = () => {
      frame = 0;
      const event = pending;
      if (!event) return;

      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".surface") : null;
      if (!target) {
        clear();
        return;
      }

      if (target !== lit) clear();
      lit = target;

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty("--y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pending = event;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", clear);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", clear);
      clear();
    };
  }, []);
}
