import { motion } from "framer-motion";
import Section from "./Section";
import { skills } from "../data/content";

const palettes = [
  { card: "border-[var(--theme-sky)]/25 bg-gradient-to-br from-[var(--theme-sky)]/12 to-transparent", title: "text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]", dot: "bg-[var(--theme-sky)]", chip: "border-[var(--theme-sky)]/12 bg-[var(--theme-sky)]/6" },
  { card: "border-[var(--theme-secondary)]/25 bg-gradient-to-br from-[var(--theme-secondary)]/11 to-transparent", title: "text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]", dot: "bg-[var(--theme-secondary)]", chip: "border-[var(--theme-secondary)]/14 bg-[var(--theme-secondary)]/6" },
  { card: "border-[var(--theme-primary)]/25 bg-gradient-to-br from-[var(--theme-primary)]/11 to-transparent", title: "text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]", dot: "bg-[var(--theme-primary)]", chip: "border-[var(--theme-primary)]/14 bg-[var(--theme-primary)]/6" },
];

export default function Skills() {
  return (
    <Section id="skills" act={4} eyebrow="Capabilities" title="Tools I use repeatedly in the work" tone="success">
      <p className="mb-8 max-w-2xl text-base leading-7 text-white/62">
        A focused set of technologies and operating skills that show up across the projects above — not an exhaustive keyword list.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], index) => {
          const palette = palettes[index % palettes.length];
          const primary = items.slice(0, 6);
          return (
            <motion.article key={category} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: index * 0.08 }} whileHover={{ y: -5 }} className={`rounded-[1.7rem] border p-5 shadow-[0_24px_60px_-46px_rgba(0,0,0,.9)] ${palette.card}`}>
              <h3 className={`mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${palette.title}`}><span className={`h-2 w-2 rounded-full ${palette.dot}`} />{category}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {primary.map((skill) => <li key={skill} className={`rounded-full border px-2.5 py-1.5 text-[10px] leading-none text-white/66 ${palette.chip}`}>{skill}</li>)}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
