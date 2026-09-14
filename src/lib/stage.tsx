import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { SECTION_IDS } from "../components/particleFormations";

/**
 * The page's single source of scroll truth.
 *
 * Before this existed, three systems each ran their own scroll maths — the
 * progress rail, the per-section parallax, and the particle field — so nothing
 * ever landed together and the page read as decorated rather than directed.
 * Everything now subscribes here instead.
 *
 * Values are MotionValues rather than React state because the particle field
 * reads them from a raw requestAnimationFrame loop outside React. Only
 * `actIndex` is state, because it changes a handful of times per visit and
 * genuinely needs to re-render the nav.
 */

/**
 * The page in five acts.
 *
 * `anchor` is the section the act opens on. The sections listed after it belong
 * to the same act and deliberately do not get their own camera move — a reader
 * crossing from Projects to Side work in half a second should not trigger the
 * same event as crossing from Work to Experience.
 */
export const ACTS = [
  { anchor: "top", label: "Intro", sections: ["top"] },
  { anchor: "projects", label: "Work", sections: ["projects", "range", "marketing", "workflow"] },
  { anchor: "experience", label: "Experience", sections: ["experience"] },
  { anchor: "skills", label: "Capabilities", sections: ["skills", "leadership"] },
  { anchor: "about", label: "Connect", sections: ["about", "contact"] },
] as const;

export const ACT_COUNT = ACTS.length;

/** The four transition bands that sit between the five acts. */
export const GATE_IDS = ["act-gate-1", "act-gate-2", "act-gate-3", "act-gate-4"] as const;

/**
 * A fast flick, in pixels per millisecond. Scroll speed is normalised against
 * this so the particle field can streak in proportion to how hard the visitor
 * threw the page.
 */
const FAST_SCROLL = 4;

/** How long after the last scroll event we consider the page to be at rest. */
const REST_MS = 120;

type Stage = {
  /** 0 at the top of the document, 1 at the bottom. */
  pageProgress: MotionValue<number>;
  /** 0–1 through the current act. */
  actProgress: MotionValue<number>;
  /**
   * The finer, ten-section grain — only the particle field needs this, to pick
   * which shape to rest in. Measured here rather than in the field itself so
   * there stays exactly one thing on the page reading element offsets.
   */
  sectionIndex: MotionValue<number>;
  sectionProgress: MotionValue<number>;
  /** 0–1, peaks as the viewport centre passes through a transition band. */
  burst: MotionValue<number>;
  /** 0–1 scroll speed. Consumers damp this themselves. */
  velocity: MotionValue<number>;
  /** Pointer in clip space, -1 to 1. Stays at 0 under reduced motion. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** Which act the reader is in. */
  actIndex: number;
};

const StageContext = createContext<Stage | null>(null);

function clamp01(value: number) {
  if (!Number.isFinite(value)) return 0;
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/** Document-space tops for a list of element ids; NaN for anything missing. */
function topsOf(ids: readonly string[]) {
  return ids.map((id) => {
    const element = document.getElementById(id);
    return element ? element.getBoundingClientRect().top + window.scrollY : Number.NaN;
  });
}

/**
 * Which band of `tops` the focus point sits in, and how far through it.
 *
 * Missing elements are skipped rather than treated as position zero, so a
 * section that has not rendered yet cannot drag the index backwards.
 */
function locate(tops: number[], focus: number, documentEnd: number) {
  let index = 0;
  for (let i = 0; i < tops.length; i += 1) {
    if (!Number.isNaN(tops[i]) && focus >= tops[i]) index = i;
  }

  const start = tops[index];
  let end = Number.NaN;
  for (let ahead = index + 1; ahead < tops.length; ahead += 1) {
    if (!Number.isNaN(tops[ahead])) {
      end = tops[ahead];
      break;
    }
  }
  if (Number.isNaN(end)) end = documentEnd;

  const progress = Number.isNaN(start)
    ? 0
    : clamp01((focus - start) / Math.max(1, end - start));

  return { index, progress };
}

export function StageProvider({ children }: { children: ReactNode }) {
  const pageProgress = useMotionValue(0);
  const actProgress = useMotionValue(0);
  const sectionIndex = useMotionValue(0);
  const sectionProgress = useMotionValue(0);
  const burst = useMotionValue(0);
  const velocity = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [actIndex, setActIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let actTops: number[] = [];
    let sectionTops: number[] = [];
    let gates: Array<{ centre: number; half: number }> = [];
    let docMax = 1;
    let frame = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let restTimer = 0;
    let currentAct = -1;

    const measure = () => {
      const doc = document.documentElement;
      docMax = Math.max(1, doc.scrollHeight - window.innerHeight);

      actTops = topsOf(ACTS.map((act) => act.anchor));
      sectionTops = topsOf(SECTION_IDS);

      gates = GATE_IDS.map((id) => {
        const element = document.getElementById(id);
        if (!element) return { centre: Number.NaN, half: 1 };
        const rect = element.getBoundingClientRect();
        return {
          centre: rect.top + window.scrollY + rect.height / 2,
          // A slightly generous half-width so the burst starts building just
          // before the label is legible and is gone just after it leaves.
          half: Math.max(1, rect.height * 0.9),
        };
      });
    };

    const read = () => {
      frame = 0;
      const y = window.scrollY;

      pageProgress.set(clamp01(y / docMax));

      // Read the act from a point 40% down the viewport rather than the very
      // top, so an act becomes "current" when it is actually being looked at.
      const focus = y + window.innerHeight * 0.4;
      const documentEnd = docMax + window.innerHeight;

      const act = locate(actTops, focus, documentEnd);
      actProgress.set(act.progress);

      const section = locate(sectionTops, focus, documentEnd);
      sectionIndex.set(section.index);
      sectionProgress.set(section.progress);

      if (act.index !== currentAct) {
        currentAct = act.index;
        setActIndex(act.index);
      }

      // The burst is a bell centred on each transition band, so the particle
      // field peaks exactly when the handoff label is centred on screen.
      if (!reduced) {
        const centre = y + window.innerHeight / 2;
        let peak = 0;
        for (const gate of gates) {
          if (Number.isNaN(gate.centre)) continue;
          const distance = Math.abs(centre - gate.centre) / gate.half;
          if (distance < 1) peak = Math.max(peak, (1 + Math.cos(distance * Math.PI)) / 2);
        }
        burst.set(peak);

        const now = performance.now();
        const elapsed = now - lastTime;
        if (elapsed > 0) {
          velocity.set(Math.min(1, Math.abs(y - lastY) / elapsed / FAST_SCROLL));
        }
        lastY = y;
        lastTime = now;

        // Scroll events stop firing when the page stops, so speed has to be
        // zeroed on a timer or the field would streak forever.
        window.clearTimeout(restTimer);
        restTimer = window.setTimeout(() => velocity.set(0), REST_MS);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    const onResize = () => {
      measure();
      read();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set(-((event.clientY / window.innerHeight) * 2 - 1));
    };

    measure();
    read();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Section offsets move once fonts and images have landed.
    const settle = window.setTimeout(onResize, 1200);

    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(restTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [
    reduced,
    pageProgress,
    actProgress,
    sectionIndex,
    sectionProgress,
    burst,
    velocity,
    pointerX,
    pointerY,
  ]);

  const value = useMemo(
    () => ({
      pageProgress,
      actProgress,
      sectionIndex,
      sectionProgress,
      burst,
      velocity,
      pointerX,
      pointerY,
      actIndex,
    }),
    [
      pageProgress,
      actProgress,
      sectionIndex,
      sectionProgress,
      burst,
      velocity,
      pointerX,
      pointerY,
      actIndex,
    ],
  );

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
}

export function useStage() {
  const context = useContext(StageContext);
  if (!context) throw new Error("useStage must be used inside a StageProvider");
  return context;
}

/**
 * Read the stage without requiring one.
 *
 * Components that are also rendered on the standalone case-study route — which
 * has no stage — use this so they degrade to "no scroll choreography" instead
 * of throwing.
 */
export function useOptionalStage() {
  return useContext(StageContext);
}

/** Stable ref to the latest stage, for imperative render loops. */
export function useStageRef() {
  const stage = useStage();
  const ref = useRef(stage);
  ref.current = stage;
  return ref;
}
