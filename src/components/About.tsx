import Section from "./Section";
import { education } from "../data/content";

const strengths = [
  "Privacy awareness",
  "Calm customer communication",
  "Accurate information capture",
  "Human escalation",
  "Accessibility-minded service",
];

export default function About() {
  return (
    <Section id="about" act={5} eyebrow="About Vineet" title="Computer science, business, and practical operations" tone="data">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[1.8rem] border border-[var(--theme-sky)]/18 bg-gradient-to-br from-[var(--theme-sky)]/9 via-transparent to-transparent p-6 md:p-7">
          <p className="max-w-2xl text-base leading-7 text-white/66">
            Vineet is completing a Bachelor of Science in Computer Science and a Bachelor of Arts in Business (Accounting & Finance) at Knox College. His work spans customer-facing AI, ecommerce, websites, product operations, tutoring, and community education.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62">
            His computer-science, business, and customer-operations background shapes how he handles privacy, clear communication, accurate information capture, and the moment when technology should hand a situation to a person.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {strengths.map((strength, index) => (
              <span
                key={strength}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                  index % 3 === 0
                    ? "border-[var(--theme-sky)]/22 bg-[var(--theme-sky)]/7 text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]"
                    : index % 3 === 1
                      ? "border-[var(--theme-tertiary)]/22 bg-[var(--theme-tertiary)]/7 text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]"
                      : "border-[var(--theme-secondary)]/22 bg-[var(--theme-secondary)]/7 text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]"
                }`}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.8rem] border border-[var(--theme-secondary)]/22 bg-[#211a0d]">
          <div className="bg-[var(--theme-secondary)] px-6 py-4 text-[#241804]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-60">Education</p>
            <p className="mt-1 text-lg font-bold">Current path</p>
          </div>
          <div className="divide-y divide-white/8 px-6">
            {education.map((item) => (
              <div key={item.school} className="py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--theme-sky)_65%,white)]">{item.period}</p>
                <p className="mt-1 font-bold text-white">{item.school}</p>
                <p className="mt-1 text-sm text-white/62">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
