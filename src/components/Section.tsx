import type { ReactNode } from "react";
import { Reveal, RevealItem, RevealText, itemLine, itemSoft } from "./Reveal";

/**
 * The standard section header: act number, rule, eyebrow, then the heading.
 *
 * Tones are roles rather than hues — they resolve through the live theme
 * variables, so all four themes drive the whole page instead of the work
 * sections jumping to a fixed violet the way they used to.
 */
export type Tone = "signal" | "data" | "human" | "success";

const tones: Record<Tone, string> = {
  signal: "var(--theme-primary)",
  data: "var(--theme-sky)",
  human: "var(--theme-secondary)",
  success: "var(--theme-tertiary)",
};

export default function Section({
  id,
  act,
  eyebrow,
  title,
  children,
  tone = "signal",
}: {
  id: string;
  /** Which of the five acts this section belongs to, for the 01–05 counter. */
  act: number;
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: Tone;
}) {
  const color = tones[tone];

  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-11 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-12 h-64 w-64 rounded-full blur-[120px]"
        style={{ background: `color-mix(in srgb, ${color} 8%, transparent)` }}
      />

      <Reveal className="relative" amount={0.3}>
        <RevealItem
          as="p"
          variants={itemSoft}
          className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em]"
        >
          <span className="text-white/62">{String(act).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-8" style={{ background: color }} />
          <span style={{ color: `color-mix(in srgb, ${color} 82%, white)` }}>{eyebrow}</span>
        </RevealItem>

        <RevealText
          text={title}
          className="relative mb-6 max-w-4xl text-[2.15rem] font-medium leading-[1.08] text-white md:text-[2.8rem]"
          style={{ fontFamily: "var(--font-serif)" }}
        />

        <RevealItem
          variants={itemLine}
          className="mb-7 h-px w-full max-w-4xl origin-left"
          style={{
            background: `linear-gradient(90deg, color-mix(in srgb, ${color} 55%, transparent), transparent)`,
          }}
        />
      </Reveal>

      <div className="relative">{children}</div>
    </section>
  );
}
