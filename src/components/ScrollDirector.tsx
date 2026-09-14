import { motion, useSpring } from "framer-motion";
import { ACTS, useStage } from "../lib/stage";

/**
 * The progress bar and the act rail.
 *
 * Both read the shared stage rather than running their own scroll maths, so the
 * rail's active dot, the particle field's shape, and the camera push all agree
 * about where the reader is.
 */
export default function ScrollDirector() {
  const { pageProgress, actIndex } = useStage();
  const progress = useSpring(pageProgress, { stiffness: 130, damping: 28, mass: 0.35 });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-[var(--theme-sky)] via-[var(--theme-secondary)] to-[var(--theme-primary)]"
        style={{ scaleX: progress }}
      />

      <nav
        aria-label="Portfolio acts"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ol className="surface flex flex-col gap-3 rounded-full px-2 py-3">
          {ACTS.map((act, index) => {
            const selected = actIndex === index;
            return (
              <li key={act.anchor}>
                <a
                  href={`#${act.anchor}`}
                  className="group flex items-center gap-2"
                  aria-current={selected ? "location" : undefined}
                >
                  <span
                    className={`h-2 w-2 rounded-full border transition ${
                      selected
                        ? "scale-125 border-white bg-[var(--theme-secondary)] shadow-[0_0_18px_var(--theme-secondary)]"
                        : "border-white/40 bg-white/15 group-hover:border-white/80"
                    }`}
                  />
                  <span
                    className={`max-w-0 overflow-hidden whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] transition-all duration-300 group-hover:max-w-28 ${
                      selected ? "max-w-28 text-white" : "text-white/62"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} {act.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
