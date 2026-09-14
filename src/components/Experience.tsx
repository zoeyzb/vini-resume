import { motion } from "framer-motion";
import Section from "./Section";
import { experience } from "../data/content";

const palettes = [
  { bar: "bg-[var(--theme-sky)]", org: "text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]/78", soft: "bg-[var(--theme-sky)]/7" },
  { bar: "bg-[var(--theme-secondary)]", org: "text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]", soft: "bg-[var(--theme-secondary)]/6" },
  { bar: "bg-[var(--theme-primary)]", org: "text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]", soft: "bg-[var(--theme-primary)]/6" },
  { bar: "bg-[var(--theme-tertiary)]", org: "text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]", soft: "bg-[var(--theme-tertiary)]/6" },
];

export default function Experience() {
  return (
    <Section id="experience" act={3} eyebrow="Experience" title="Work across software, automation, commerce, and customer operations" tone="human">
      <p className="mb-7 max-w-2xl text-base leading-7 text-white/58">A compact view of the roles behind the portfolio. Each entry keeps only the strongest evidence; the résumé carries the full detail.</p>
      <div className="border-t border-white/10">
        {experience.map((job, i) => {
          const visible = job.points.slice(0, 2);
          const palette = palettes[i % palettes.length];
          const highlighted = job.tags.includes("Highlighted");
          return (
            <motion.article key={job.role + job.org} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.48, delay: i * 0.04, ease: "easeOut" }} className={`relative grid gap-5 border-b border-white/10 py-8 md:grid-cols-[0.95fr_1.55fr] md:gap-10 ${palette.soft} ${highlighted ? "ring-1 ring-inset ring-[var(--theme-sky)]/35" : ""}`}>
              <span className={`absolute bottom-0 left-0 top-0 w-px ${palette.bar}`} />
              <div className="pl-5">
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: "var(--font-serif)" }} className="text-lg font-semibold text-white/42">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base font-bold leading-6 text-white">{job.role}</h3>
                    <p className={`mt-0.5 text-sm font-semibold ${palette.org}`}>{job.org}</p>
                    {job.period && <p className="mt-1 text-xs text-white/52">{job.period}</p>}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5 pl-9">
                  {job.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-white/9 bg-black/10 px-2.5 py-1 text-[10px] text-white/56">{tag}</span>)}
                </div>
              </div>

              <div className="pl-5 md:pl-0">
                <ul className="space-y-2 text-sm leading-6 text-white/66">
                  {visible.map((point) => <li key={point} className="flex gap-3"><span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${palette.bar}`} /><span>{point}</span></li>)}
                </ul>
                <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-white/34">Workflow: {job.flow.slice(0, 4).join(" → ")}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
