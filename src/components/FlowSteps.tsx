import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * Compact animated step sequence — reused for per-role workflow chips in
 * Experience and workflow/architecture diagrams in case studies. A literal
 * "Waveform" step renders as a mini animated waveform instead of a text chip.
 */

const waveBars = [5, 9, 6, 11, 7];

function MiniWaveform({ live }: { live: boolean }) {
  return (
    <span className="flex h-2.5 items-center gap-[2px]">
      {waveBars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-current"
          style={{
            height: live ? undefined : `${Math.max(2, h * 0.35)}px`,
            transformOrigin: "center",
            animation: live ? `rise ${0.5 + (i % 3) * 0.12}s ease-in-out ${i * 0.04}s infinite alternate` : undefined,
            opacity: live ? 1 : 0.45,
          }}
        />
      ))}
    </span>
  );
}

export default function FlowSteps({
  steps,
  intervalMs = 1400,
}: {
  steps: string[];
  intervalMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(reduced ? steps.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const iv = setInterval(() => {
      setActive((i) => (i + 1 >= steps.length ? 0 : i + 1));
    }, intervalMs);
    return () => clearInterval(iv);
  }, [reduced, intervalMs, steps.length]);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {steps.map((step, i) => {
        const status = i < active ? "done" : i === active ? "active" : "queued";
        const isWave = step === "Waveform";
        return (
          <span key={step} className="flex items-center gap-1">
            <span
              // Status was previously carried by colour alone. The marks below
              // repeat it as a shape, so it survives greyscale and colour
              // blindness, and `sr-only` text states it outright.
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10.5px] leading-none transition-colors duration-300 ${
                status === "queued"
                  ? "border-white/10 bg-white/[0.02] text-white/62"
                  : status === "active"
                    ? "border-[color-mix(in_srgb,var(--theme-primary)_55%,transparent)] bg-[color-mix(in_srgb,var(--theme-primary)_12%,transparent)] text-[var(--theme-primary)]"
                    : "border-white/12 bg-white/[0.05] text-white/72"
              }`}
            >
              <span aria-hidden="true" className="text-[9px] leading-none">
                {status === "done" ? "✓" : status === "active" ? "▸" : "·"}
              </span>
              {isWave ? <MiniWaveform live={status === "active" && !reduced} /> : <span>{step}</span>}
              <span className="sr-only">
                {" "}
                — {status === "done" ? "complete" : status === "active" ? "in progress" : "queued"}
              </span>
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                data-connector=""
                className={`h-px w-3 shrink-0 transition-colors duration-300 ${
                  status === "done"
                    ? "bg-[color-mix(in_srgb,var(--theme-primary)_55%,transparent)]"
                    : "bg-white/12"
                }`}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
