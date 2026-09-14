import { AnimatePresence, motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ACTS, useStage } from "../lib/stage";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * Nova, the guide.
 *
 * She was a floating button with a static greeting. She is now tied to the
 * stage: she walks down the margin as the page scrolls, leans into the
 * direction of travel, hops when an act boundary crosses the middle of the
 * screen, breathes while idle, follows the cursor with her eyes, and dozes off
 * when the page goes quiet. She offers one curated line per act instead of a
 * single generic hello, and the tour walks the five acts in order.
 *
 * All of that movement is driven by the shared stage rather than by timers of
 * her own, so she is reacting to what the visitor is doing.
 *
 * Three things matter more than the character work:
 *
 *   1. She can be dismissed, and the choice sticks. A recruiter who finds a
 *      cartoon on a resume site distracting must be able to get rid of it.
 *   2. Escape closes her, and focus returns to the button that opened her.
 *   3. Under reduced motion she does not walk, lean, hop, breathe or doze —
 *      she is a plain button with a plain panel, and every feature still works.
 */

const STORAGE_KEY = "nova-hidden";

/** One line per act. Written to be worth reading, not to fill a bubble. */
const ACT_LINES = [
  "Recruiter in a hurry? I'll take you straight to the strongest proof.",
  "Five projects. The three without a live link have a replayable diagram instead.",
  "Six roles, one thread — customer-facing systems that had to actually work.",
  "Every tool here came out of a project above, not off a course list.",
  "Résumé, email, or a call — whichever is least effort for you.",
];

/** Milliseconds of stillness before she dozes off. */
const IDLE_MS = 8000;

const themes = [
  { id: "coral", label: "Coral", color: "#ff8f70" },
  { id: "mint", label: "Mint", color: "#9ff2d0" },
  { id: "sky", label: "Sky", color: "#8be9f5" },
  { id: "lavender", label: "Lavender", color: "#d9c5ff" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

export default function GuidePet() {
  const { pageProgress, actIndex, pointerX, pointerY, velocity, burst } = useStage();
  const reduced = usePrefersReducedMotion();

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const [spoken, setSpoken] = useState<number | null>(null);
  const [theme, setTheme] = useState<ThemeId>("coral");
  const [touring, setTouring] = useState(false);
  /** Touch-only: Nova has an unread line waiting in the panel. */
  const [hasTip, setHasTip] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tourTimer = useRef(0);

  // --- Persisted dismissal ----------------------------------------------
  useEffect(() => {
    try {
      setHidden(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Private mode or storage disabled — she just stays visible.
    }
  }, []);

  const setHiddenPersisted = useCallback((value: boolean) => {
    setHidden(value);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      // Non-fatal; the choice simply will not survive a reload.
    }
  }, []);

  // --- She walks the page ------------------------------------------------
  // Vertical position tracks scroll progress on a slack spring, so she drifts
  // down the margin as you read and settles a beat after you stop — the lag is
  // what makes her feel like a companion keeping pace rather than a fixed
  // widget. The band is kept clear of the nav and the footer CTAs.
  // The band is measured from her resting spot at the bottom-right, so both
  // ends have to stay negative — a positive offset would walk her off the
  // bottom of the viewport entirely.
  const walk = useSpring(pageProgress, { stiffness: 42, damping: 20, mass: 0.9 });
  const walkY = useTransform(walk, [0, 1], ["-34vh", "-2vh"]);

  // She leans into the direction of travel, and straightens when the page stops.
  const lean = useSpring(useTransform(velocity, [0, 1], [0, 9]), {
    stiffness: 130,
    damping: 18,
  });

  // A small hop each time an act boundary crosses the middle of the screen —
  // the same signal that bursts the particle field, so she reacts to the page
  // rather than to a timer of her own.
  const hop = useSpring(useTransform(burst, [0, 1], [0, -16]), {
    stiffness: 260,
    damping: 14,
  });

  // --- Eyes follow the cursor -------------------------------------------
  const pupilX = useSpring(useTransform(pointerX, [-1, 1], [-2.2, 2.2]), { stiffness: 220, damping: 20 });
  const pupilY = useSpring(useTransform(pointerY, [-1, 1], [1.7, -1.7]), { stiffness: 220, damping: 20 });

  // --- Dozing off --------------------------------------------------------
  useEffect(() => {
    if (reduced || hidden) return;
    let timer = window.setTimeout(() => setAsleep(true), IDLE_MS);
    const wake = () => {
      setAsleep(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setAsleep(true), IDLE_MS);
    };
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [reduced, hidden]);

  // --- One line per act, auto-dismissed ----------------------------------
  // Only on pointer devices. On a phone the bubble is a large share of the
  // screen and lands on top of whatever the visitor came to read; there she
  // gets a quiet indicator dot and the line waits inside the panel.
  useEffect(() => {
    if (hidden || open) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHasTip(true);
      return;
    }
    setSpoken(actIndex);
    const timer = window.setTimeout(() => setSpoken(null), 7000);
    return () => window.clearTimeout(timer);
  }, [actIndex, hidden, open]);

  // --- Escape closes, and focus goes back to the button ------------------
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the panel so a keyboard user is not left behind it.
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // --- Guided tour -------------------------------------------------------
  const goTo = useCallback(
    (anchor: string) => {
      document.getElementById(anchor)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced],
  );

  const startTour = useCallback(() => {
    setOpen(false);
    setTouring(true);
    let step = 0;
    const advance = () => {
      if (step >= ACTS.length) {
        setTouring(false);
        return;
      }
      goTo(ACTS[step].anchor);
      step += 1;
      tourTimer.current = window.setTimeout(advance, reduced ? 400 : 2600);
    };
    advance();
  }, [goTo, reduced]);

  useEffect(() => () => window.clearTimeout(tourTimer.current), []);

  if (hidden) {
    return (
      <button
        type="button"
        onClick={() => setHiddenPersisted(false)}
        className="fixed bottom-4 right-4 z-[60] rounded-full border border-white/16 bg-black/60 px-3 py-2 text-[11px] font-semibold text-white/72 backdrop-blur-xl transition hover:text-white"
      >
        Show guide
      </button>
    );
  }

  const line = ACT_LINES[actIndex] ?? ACT_LINES[0];

  return (
    // The column is anchored to the bottom-right; `walkY` then lifts it up the
    // margin as the page scrolls. Anchoring to the bottom rather than the top
    // means the panel and speech bubble always open upward into free space.
    <motion.div
      className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6"
      style={reduced ? undefined : { y: walkY }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label="Nova, the portfolio guide"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 310, damping: 26 }}
            className="w-[min(22rem,calc(100vw-3rem))] overflow-hidden rounded-[1.7rem] border border-white/16 bg-[#111018]/96 text-white shadow-[0_28px_90px_-28px_rgba(0,0,0,.95)] outline-none backdrop-blur-2xl"
          >
            <div
              className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5"
              style={{
                background:
                  "linear-gradient(100deg, color-mix(in srgb,var(--theme-primary) 88%,#17131e), color-mix(in srgb,var(--theme-secondary) 70%,#17131e))",
              }}
            >
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-black/62">
                  Nova · portfolio guide
                </p>
                <p className="mt-0.5 text-sm font-black text-[#17131e]">
                  Act {String(actIndex + 1).padStart(2, "0")} · {ACTS[actIndex]?.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/20 text-sm font-black text-[#17131e]"
                aria-label="Close the portfolio guide"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <p className="text-xs leading-5 text-white/76">{line}</p>

              <button
                type="button"
                onClick={startTour}
                className="theme-primary mt-4 w-full rounded-xl px-3 py-2.5 text-xs font-black transition hover:brightness-110"
              >
                {touring ? "Touring…" : "Take the 60-second tour"}
              </button>

              <ol className="mt-3 grid gap-1.5">
                {ACTS.map((act, index) => (
                  <li key={act.anchor}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        goTo(act.anchor);
                      }}
                      className={`flex min-h-11 w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-[11px] font-bold transition hover:-translate-y-0.5 ${
                        actIndex === index
                          ? "border-white/40 bg-white/12 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/76"
                      }`}
                    >
                      <span className="font-mono tabular-nums opacity-70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {act.label}
                    </button>
                  </li>
                ))}
              </ol>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[.04] p-3">
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-white/62">
                  Change atmosphere
                </p>
                <div className="mt-2 flex gap-2">
                  {themes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Use the ${item.label} theme`}
                      aria-pressed={theme === item.id}
                      onClick={() => {
                        document.documentElement.dataset.portfolioTheme = item.id;
                        setTheme(item.id);
                      }}
                      className={`h-9 flex-1 rounded-lg border transition hover:-translate-y-0.5 ${
                        theme === item.id ? "border-white ring-1 ring-white/40" : "border-white/10"
                      }`}
                      style={{ background: item.color }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHiddenPersisted(true)}
                className="mt-3 w-full rounded-xl border border-white/10 px-3 py-2 text-[11px] font-semibold text-white/62 transition hover:text-white"
              >
                Hide Nova
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {spoken !== null && !open && (
          <motion.button
            type="button"
            onClick={() => {
              setSpoken(null);
              setOpen(true);
            }}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="max-w-[15rem] rounded-2xl border border-white/16 bg-[#111018]/94 px-4 py-3 text-left shadow-2xl backdrop-blur-xl"
          >
            <span className="block text-[9px] font-black uppercase tracking-[.2em] text-[var(--theme-secondary)]">
              Nova
            </span>
            <span className="mt-1 block text-xs font-semibold leading-5 text-white/86">{line}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        aria-label="Open Nova, the interactive portfolio guide"
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          setSpoken(null);
          setHasTip(false);
        }}
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full p-[3px] shadow-[0_18px_55px_-18px_rgba(0,0,0,.9)] focus-visible:ring-2 focus-visible:ring-[var(--theme-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060509]"
        style={{
          background:
            "conic-gradient(var(--theme-primary) 0 var(--nova-progress,0%), rgba(255,255,255,.16) var(--nova-progress,0%) 100%)",
          // Lean into the scroll, hop on an act boundary. Both are driven by the
          // stage, so she is reacting to the page rather than looping on a timer.
          ...(reduced ? {} : { rotate: lean, y: hop }),
        }}
      >
        <NovaRing progress={pageProgress} />
        {hasTip && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#060509] bg-[var(--theme-secondary)]"
          />
        )}
        {/* Idle breathing lives on the inner disc, because the button's own
            transform is already carrying the lean and the hop. */}
        <motion.span
          className="grid h-full w-full place-items-center rounded-full border border-white/35"
          style={{ background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))" }}
          animate={reduced ? undefined : { scale: asleep ? [1, 1.015, 1] : [1, 1.045, 1] }}
          transition={{ duration: asleep ? 4.6 : 3.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 72 72" className="h-12 w-12 overflow-visible" aria-hidden="true">
            <path d="M20 26 15 11l15 9M52 26l5-15-15 9" fill="var(--theme-tertiary)" stroke="#15382c" strokeWidth="2" strokeLinejoin="round" />
            <path d="M18 27c2-12 34-12 36 0v17c0 12-8 19-18 19S18 56 18 44V27Z" fill="#fff6df" stroke="#24140f" strokeWidth="2.4" />
            <path d="M22 28c4-7 24-7 28 0" stroke="var(--theme-primary)" strokeWidth="5" strokeLinecap="round" opacity=".9" />

            {asleep ? (
              <>
                {/* Closed eyes and a couple of z's while she dozes. */}
                <path d="M24 39c2 2.5 8 2.5 10 0M38 39c2 2.5 8 2.5 10 0" stroke="#24140f" strokeWidth="2.4" strokeLinecap="round" />
                <text x="55" y="20" className="fill-white text-[13px] font-bold">z</text>
                <text x="63" y="10" className="fill-white/72 text-[10px] font-bold">z</text>
              </>
            ) : (
              <>
                <g className="pet-eye">
                  <ellipse cx="29" cy="39" rx="5" ry="6" fill="#24140f" />
                  <motion.circle cx="29" cy="39" r="1.8" fill="var(--theme-sky)" style={reduced ? undefined : { x: pupilX, y: pupilY }} />
                </g>
                <g className="pet-eye" style={{ animationDelay: "120ms" }}>
                  <ellipse cx="43" cy="39" rx="5" ry="6" fill="#24140f" />
                  <motion.circle cx="43" cy="39" r="1.8" fill="var(--theme-sky)" style={reduced ? undefined : { x: pupilX, y: pupilY }} />
                </g>
              </>
            )}

            <path d="M33 49c2 2 4 2 6 0" stroke="#24140f" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M36 24v-8" stroke="#24140f" strokeWidth="2" strokeLinecap="round" />
            <path d="m36 8 2.3 4.5 5 .7-3.6 3.5.9 5-4.6-2.4-4.5 2.4.8-5-3.6-3.5 5-.7L36 8Z" fill="var(--theme-sky)" stroke="#153744" strokeWidth="1.4" />
          </svg>
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

/**
 * Writes scroll progress into a CSS variable for the conic-gradient ring.
 *
 * A conic-gradient colour stop cannot be driven by a MotionValue directly, and
 * re-rendering the button on every scroll frame just to update it would be
 * wasteful — so the value is written straight to the element's style.
 */
function NovaRing({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const write = (value: number) => {
      ref.current?.parentElement?.style.setProperty("--nova-progress", `${Math.round(value * 100)}%`);
    };
    write(progress.get());
    return progress.on("change", write);
  }, [progress]);

  return <span ref={ref} className="hidden" aria-hidden="true" />;
}
