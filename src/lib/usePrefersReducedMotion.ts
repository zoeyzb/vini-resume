import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor has asked for reduced motion.
 *
 * The initial value is read synchronously rather than filled in by an effect.
 * Starting at `false` and correcting after mount meant every consumer rendered
 * one frame as though motion were allowed — harmless for components that fall
 * back to plain markup, but the story diagrams create their animation playhead
 * on that first render and were left frozen at zero, so the diagram never drew
 * at all for exactly the people who most needed the static version.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
