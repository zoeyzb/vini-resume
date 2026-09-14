import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ACTS, ACT_COUNT, GATE_IDS } from "../lib/stage";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * The band between two acts.
 *
 * This used to mount its own R3F canvas, which meant four extra WebGL contexts
 * on top of the background field — enough for mobile Safari to start evicting
 * them. The particle work now happens in the single background field, which
 * reads this band's position from the stage and bursts as it crosses centre.
 * What is left here is the typographic handoff.
 */
export default function ChapterTransition({ gate }: { gate: 1 | 2 | 3 | 4 }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.12, 0.5, 0.88], [0, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -28]);
  const labelOpacity = useTransform(scrollYProgress, [0.12, 0.34, 0.7, 0.88], [0, 1, 1, 0]);

  const from = ACTS[gate - 1];
  const to = ACTS[gate];

  return (
    <div
      ref={ref}
      id={GATE_IDS[gate - 1]}
      className="relative h-[34vh] min-h-[220px] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,.012)_45%,transparent)]" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-px w-[min(70vw,54rem)] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-white/42 to-transparent"
        style={reduced ? undefined : { scaleX: lineScale }}
      />

      <motion.div
        className="absolute inset-0 grid place-items-center px-4"
        style={reduced ? undefined : { y: labelY, opacity: labelOpacity }}
      >
        <div className="surface flex max-w-full items-center gap-3 rounded-full px-4 py-2 sm:gap-4">
          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.24em] text-white/62">
            {String(gate + 1).padStart(2, "0")}
            <span className="text-white/62">/{String(ACT_COUNT).padStart(2, "0")}</span>
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--theme-secondary)]" />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white/76">
            {from.label}
          </span>
          <span className="shrink-0 text-white/62">→</span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            {to.label}
          </span>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050507]" />
    </div>
  );
}
