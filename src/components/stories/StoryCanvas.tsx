import { useEffect, useRef, useState, type ComponentType } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

/**
 * The frame every project story is drawn in.
 *
 * Each story is a short, replayable sequence that explains a system rather than
 * describing it: a diagram on top, and the same sequence written out
 * underneath as numbered steps that highlight in time with it. The written
 * steps are the accessible version of the animation, not a caption for it —
 * with motion disabled you get the finished diagram and the full list, and
 * nothing is lost.
 *
 * Scenes receive a single 0–1 `progress` MotionValue and slice their own
 * windows out of it, so the whole sequence stays one timeline and cannot drift
 * out of sync with the step list.
 */

/** How long a full pass takes, in seconds. */
const DURATION = 3.2;

/**
 * A scene is a component rather than a render function so that the hooks it
 * uses to slice the timeline belong to the scene, not to this frame.
 */
export type StoryScene = ComponentType<{ progress: MotionValue<number> }>;

export default function StoryCanvas({
  title,
  caption,
  steps,
  scene: Scene,
  /** The SVG viewBox aspect the scene was drawn against. */
  ratio = "16 / 7",
}: {
  title: string;
  caption: string;
  steps: string[];
  scene: StoryScene;
  ratio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const progress = useMotionValue(reduced ? 1 : 0);
  const [active, setActive] = useState(reduced ? steps.length - 1 : -1);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    // Reduced motion — including switched on mid-visit — parks the playhead at
    // the end so the diagram shows its finished state rather than an empty
    // frame, and marks every step as reached.
    if (reduced) {
      progress.set(1);
      setActive(steps.length - 1);
      return;
    }
    if (!inView) return;

    progress.set(0);
    const controls = animate(progress, 1, { duration: DURATION, ease: "linear" });
    return () => controls.stop();
  }, [inView, reduced, progress, replayKey, steps.length]);

  // The step list follows the same playhead the diagram does.
  useMotionValueEvent(progress, "change", (value) => {
    if (reduced) return;
    const index = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive(value <= 0 ? -1 : index);
  });

  return (
    // The caption no longer has a visible slot — the numbered steps say the
    // same thing in sequence — so it becomes the region's accessible summary,
    // read out before a screen-reader user reaches the list.
    <section
      ref={ref}
      aria-label={`${title}. ${caption}`}
      className="surface overflow-hidden rounded-[1.6rem]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2.5">
        <p className="min-w-0 truncate text-[12.5px] font-semibold text-white/88">{title}</p>
        <button
          type="button"
          onClick={() => setReplayKey((value) => value + 1)}
          disabled={reduced}
          className="shrink-0 rounded-full border border-white/16 px-3 py-1 text-[11px] font-semibold text-white/72 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Replay
          <span className="sr-only"> the {title} sequence</span>
        </button>
      </div>

      {/* No padding here on purpose: labels are positioned as a percentage of
          this box, so its aspect ratio has to match the scene's viewBox exactly
          or every label drifts. Scenes carry their own margins inside the
          viewBox instead. */}
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <Scene progress={progress} />
      </div>

      {/* The caption used to sit above this list and said, in prose, what the
          five numbered steps say in sequence. Dropping it keeps the card the
          same height as the screenshot cases beside it. */}
      <div className="border-t border-white/8 px-4 py-3.5">
        <ol className="space-y-1">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span
                className="shrink-0 font-mono text-[11px] font-bold tabular-nums transition-colors duration-300"
                // The dimmed "not yet reached" state still has to clear AA —
                // these numbers are how the list is referenced, not decoration.
                style={{
                  color: index <= active ? "var(--theme-primary)" : "rgba(255,255,255,.62)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[12.5px] leading-[1.45] transition-colors duration-300"
                style={{ color: index <= active ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.62)" }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
