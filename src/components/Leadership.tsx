import { motion } from "framer-motion";
import Section from "./Section";
import { leadership, communityChips, conceptChips } from "../data/content";

const palettes = [
  {
    shell: "border-[var(--theme-secondary)]/28 bg-[linear-gradient(155deg,color-mix(in_srgb,var(--theme-secondary)_12%,transparent),color-mix(in_srgb,var(--theme-secondary)_4%,transparent)_48%,rgba(255,255,255,.018))] hover:border-[var(--theme-secondary)]/48",
    icon: "bg-[var(--theme-secondary)] text-[#241804] shadow-[0_16px_38px_-20px_color-mix(in_srgb,var(--theme-secondary)_90%,transparent)]",
    org: "text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]",
    line: "from-[var(--theme-secondary)] via-[var(--theme-primary)] to-transparent",
    dot: "bg-[var(--theme-secondary)]",
  },
  {
    shell: "border-[var(--theme-sky)]/28 bg-[linear-gradient(155deg,color-mix(in_srgb,var(--theme-sky)_12%,transparent),color-mix(in_srgb,var(--theme-sky)_4%,transparent)_48%,rgba(255,255,255,.018))] hover:border-[var(--theme-sky)]/48",
    icon: "bg-[var(--theme-sky)] text-[#071018] shadow-[0_16px_38px_-20px_color-mix(in_srgb,var(--theme-sky)_90%,transparent)]",
    org: "text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]",
    line: "from-[var(--theme-sky)] via-[var(--theme-sky)] to-transparent",
    dot: "bg-[var(--theme-sky)]",
  },
  {
    shell: "border-[var(--theme-tertiary)]/28 bg-[linear-gradient(155deg,color-mix(in_srgb,var(--theme-tertiary)_12%,transparent),color-mix(in_srgb,var(--theme-tertiary)_4%,transparent)_48%,rgba(255,255,255,.018))] hover:border-[var(--theme-tertiary)]/48",
    icon: "bg-[var(--theme-tertiary)] text-[#092119] shadow-[0_16px_38px_-20px_color-mix(in_srgb,var(--theme-tertiary)_90%,transparent)]",
    org: "text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]",
    line: "from-[var(--theme-tertiary)] via-[var(--theme-sky)] to-transparent",
    dot: "bg-[var(--theme-tertiary)]",
  },
];

const labels = ["Education access", "Academic support", "STEM leadership"];

const stemPoints = [
  "Supported STEM-awareness activities that introduced students to technical fields and learning pathways.",
  "Helped make educational opportunities and resources easier for students to understand and access.",
  "Encouraged participation, peer leadership, and confidence through collaborative student activities.",
];

function StoryIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M7.5 15c5-2.8 10.5-2.2 16.5 2v20c-6-4.1-11.5-4.5-16.5-2V15Z" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M40.5 15c-5-2.8-10.5-2.2-16.5 2v20c6-4.1 11.5-4.5 16.5-2V15Z" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="m24 6 1.7 3.4 3.8.6-2.8 2.7.7 3.8-3.4-1.8-3.4 1.8.7-3.8-2.8-2.7 3.8-.6L24 6Z" fill="currentColor" />
        <path d="M12 21.5c3.2-.8 6.2-.2 9 1.7M27 23.2c2.8-1.9 5.8-2.5 9-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".72" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M8 10h24a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H20l-8 6v-6H8a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M13 18h14M13 24h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m29 34 8-8 4 4-8 8-5 1 1-5Z" fill="currentColor" opacity=".9" />
        <path d="m35.5 27.5 4 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity=".72" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
      <ellipse cx="23" cy="24" rx="16" ry="6.5" transform="rotate(28 23 24)" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="23" cy="24" rx="16" ry="6.5" transform="rotate(-28 23 24)" stroke="currentColor" strokeWidth="2" />
      <circle cx="23" cy="24" r="3.6" fill="currentColor" />
      <circle cx="9.5" cy="17" r="2.3" fill="currentColor" />
      <circle cx="35" cy="16" r="2.3" fill="currentColor" />
      <circle cx="28" cy="38" r="2.3" fill="currentColor" />
      <path d="M31 34.5 40 25.5M34.5 25.5H40v5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Leadership() {
  return (
    <Section id="leadership" act={4} eyebrow="Leadership & community" title="Mentoring, teaching, and opening access" tone="signal">
      <div className="grid gap-5 lg:grid-cols-3">
        {leadership.map((item, index) => {
          const palette = palettes[index % palettes.length];
          const points = index === 2 ? stemPoints : item.points;
          return (
            <motion.article
              key={item.role}
              initial={{ opacity: 0, y: 22, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
              whileHover={{ y: -8, rotate: index === 0 ? -0.35 : index === 2 ? 0.35 : 0 }}
              className={`group relative h-full overflow-hidden rounded-[1.8rem] border p-6 transition duration-500 ${palette.shell}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${palette.line}`} />
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/7 transition duration-700 group-hover:scale-125 group-hover:border-white/12" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-dashed border-white/8 transition duration-700 group-hover:rotate-45" />

              <div className="relative flex items-start justify-between gap-4">
                <motion.div
                  whileHover={{ rotate: index === 1 ? 5 : -5, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`grid h-14 w-14 place-items-center rounded-[1.15rem] border border-white/30 ${palette.icon}`}
                >
                  <StoryIcon index={index} />
                </motion.div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/62">{String(index + 1).padStart(2, "0")}</p>
                  <p className={`mt-2 text-[9px] font-bold uppercase tracking-[0.16em] ${palette.org}`}>{labels[index]}</p>
                </div>
              </div>

              <h3 className="relative mt-6 max-w-sm text-xl font-bold leading-7 text-white">{item.role}</h3>
              {item.org && <p className={`relative mt-1.5 text-xs font-semibold ${palette.org}`}>{item.org}</p>}

              <ul className="relative mt-6 space-y-3.5 text-sm leading-6 text-white/62">
                {points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${palette.dot}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.6rem] border border-white/9 bg-white/[0.025] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/62">Community & service</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {communityChips.map((chip, index) => (
              <span
                key={chip}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                  index % 4 === 0
                    ? "border-[var(--theme-secondary)]/25 bg-[var(--theme-secondary)]/7 text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]"
                    : index % 4 === 1
                      ? "border-[var(--theme-sky)]/25 bg-[var(--theme-sky)]/7 text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]"
                      : index % 4 === 2
                        ? "border-[var(--theme-primary)]/25 bg-[var(--theme-primary)]/7 text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]"
                        : "border-[var(--theme-tertiary)]/25 bg-[var(--theme-tertiary)]/7 text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-[var(--theme-sky)]/22 bg-[var(--theme-sky)]/7 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--theme-tertiary)_82%,white)]">Independent studies</p>
          <p className="mt-2 text-xs leading-5 text-white/62">Exploratory case work, separate from client engagements and shipped products.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {conceptChips.map((chip) => (
              <span key={chip} className="rounded-full border border-[color-mix(in_srgb,var(--theme-tertiary)_20%,transparent)] bg-black/10 px-3 py-1.5 text-[11px] text-white/72">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
