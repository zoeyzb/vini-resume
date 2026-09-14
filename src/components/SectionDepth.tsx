import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import type { Tone } from "./Section";

/**
 * A gentle depth cue around a section — a travelling glow, a leading hairline,
 * and a small vertical drift.
 *
 * This used to also scale, rotate and fade the container. That meant headings
 * shrank and greyed out while they were being read, which is the single most
 * common way a "cinematic" portfolio becomes a worse document. The container
 * now only drifts; the actual entrance choreography happens element by element
 * inside `Reveal`.
 */

const tones: Record<Tone, string> = {
  signal: "var(--theme-primary)",
  data: "var(--theme-sky)",
  human: "var(--theme-secondary)",
  success: "var(--theme-tertiary)",
};

/** Maximum vertical drift, in pixels. Deliberately small. */
const DRIFT = 24;

export default function SectionDepth({
  children,
  tone = "data",
  subtle = false,
}: {
  children: ReactNode;
  tone?: Tone;
  subtle?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 96%", "end 4%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 105, damping: 27, mass: 0.42 });

  const travel = subtle ? DRIFT * 0.45 : DRIFT;
  const y = useTransform(progress, [0, 0.18, 0.82, 1], [travel, 0, 0, -travel * 0.6]);
  const glowY = useTransform(progress, [0, 1], [88, -88]);
  const glowOpacity = useTransform(progress, [0, 0.22, 0.78, 1], [0, 0.18, 0.06, 0]);
  const lineScale = useTransform(progress, [0.02, 0.2], [0, 1]);
  const color = tones[tone];

  return (
    <div ref={ref} className="relative overflow-clip">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-0 h-40 blur-[100px]"
        style={
          reduced
            ? { opacity: 0 }
            : {
                y: glowY,
                opacity: glowOpacity,
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 42%, transparent), transparent)`,
              }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(72rem,84vw)] origin-center -translate-x-1/2"
        style={
          reduced
            ? undefined
            : {
                scaleX: lineScale,
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${color} 65%, white), transparent)`,
              }
        }
      />
      <motion.div style={reduced ? undefined : { y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
