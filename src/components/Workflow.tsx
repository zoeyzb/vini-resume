import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";

const systems = [
  {
    name: "NextRole",
    outcome: "A tailored application package ready for review",
    steps: ["Job source", "Match", "Approved facts", "Tailored resume", "User review", "Tracked application"],
    active: "border-[var(--theme-sky)]/40 bg-[var(--theme-sky)]/10 text-[color-mix(in_srgb,var(--theme-sky)_60%,white)]",
    dot: "bg-[var(--theme-sky)]",
    text: "text-[color-mix(in_srgb,var(--theme-sky)_72%,white)]",
    line: "from-[var(--theme-sky)]/80 to-[var(--theme-sky)]/20",
    panel: "from-[var(--theme-sky)]/10 via-transparent to-transparent",
  },
  {
    name: "Recover",
    outcome: "A clear next action from a missed revenue signal",
    steps: ["Lead or missed call", "Evidence captured", "Follow-up prepared", "Human checkpoint", "Booking", "Revenue attribution"],
    active: "border-[var(--theme-secondary)]/45 bg-[var(--theme-secondary)]/10 text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]",
    dot: "bg-[var(--theme-secondary)]",
    text: "text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]",
    line: "from-[var(--theme-secondary)]/80 to-[var(--theme-secondary)]/20",
    panel: "from-[var(--theme-secondary)]/10 via-transparent to-transparent",
  },
  {
    name: "Voice AI",
    outcome: "A resolved inquiry, booking, or clean handoff",
    steps: ["Inbound call", "Intent detected", "Details captured", "Answer or booking", "Escalation", "Follow-up"],
    active: "border-[var(--theme-primary)]/45 bg-[var(--theme-primary)]/10 text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]",
    dot: "bg-[var(--theme-primary)]",
    text: "text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]",
    line: "from-[var(--theme-primary)]/80 to-[var(--theme-primary)]/20",
    panel: "from-[var(--theme-primary)]/10 via-transparent to-transparent",
  },
  {
    name: "Lead intelligence",
    outcome: "Website findings turned into relevant outreach",
    steps: ["Business found", "Website reviewed", "Signals recorded", "Message prepared", "Approval", "Follow-up tracked"],
    active: "border-[var(--theme-tertiary)]/45 bg-[var(--theme-tertiary)]/10 text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]",
    dot: "bg-[var(--theme-tertiary)]",
    text: "text-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]",
    line: "from-[var(--theme-tertiary)]/80 to-[var(--theme-tertiary)]/20",
    panel: "from-[var(--theme-tertiary)]/10 via-transparent to-transparent",
  },
] as const;

const controls = [
  ["Review", "A person checks sensitive external actions"],
  ["Record", "Source signals, logs, and status remain visible"],
  ["Handoff", "A person takes over when judgment is needed"],
] as const;

export default function Workflow() {
  const [active, setActive] = useState(0);
  const system = systems[active];

  return (
    <Section id="workflow" act={2} eyebrow="How the systems move" title="From request to completed task" tone="success">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a workflow">
        {systems.map((item, index) => (
          <button
            key={item.name}
            id={`workflow-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`workflow-panel-${index}`}
            onClick={() => setActive(index)}
            className={`rounded-full border px-4 py-2.5 text-xs font-bold transition ${active === index ? item.active : "border-white/8 bg-white/[0.025] text-white/62 hover:border-white/18 hover:bg-white/[0.05] hover:text-white/76"}`}
          >
            <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${active === index ? item.dot : "bg-white/18"}`} />
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={system.name}
          id={`workflow-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`workflow-tab-${active}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="relative mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d0c13]/84 p-5 shadow-[0_24px_65px_-44px_rgba(0,0,0,.92)] backdrop-blur-xl md:p-7"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${system.panel}`} />
          <div className="relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={`text-[9px] font-bold uppercase tracking-[0.22em] ${system.text}`}>{system.name} workflow</p>
                <h3 className="mt-2 max-w-2xl text-xl font-semibold leading-tight text-white md:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                  {system.outcome}
                </h3>
              </div>
              <p className="hidden max-w-xs text-xs leading-5 text-white/62 sm:block">Select another workflow above to compare how the steps and handoffs change.</p>
            </div>

            <ol className="relative mt-5 grid gap-1.5 sm:mt-7 sm:gap-2 sm:grid-cols-2 lg:grid-cols-6">
              <div className={`pointer-events-none absolute left-[7%] right-[7%] top-5 hidden h-px bg-gradient-to-r lg:block ${system.line}`} aria-hidden="true" />
              {system.steps.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className="relative flex min-h-0 items-center gap-3 rounded-lg border border-white/8 bg-[#09090d]/72 px-3 py-2.5 sm:block sm:rounded-xl sm:p-3.5"
                >
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-[#0d0c13] text-[8px] font-bold sm:h-7 sm:w-7 sm:text-[9px] ${system.text}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden text-[9px] uppercase tracking-[0.14em] text-white/62 sm:inline">Step</span>
                  </div>
                  <p className="m-0 text-[12px] font-semibold leading-5 text-white/72 sm:mt-3 sm:text-[13px]">{step}</p>
                </motion.li>
              ))}
            </ol>

            <div className="mt-4 grid gap-1.5 sm:mt-5 sm:gap-2 md:grid-cols-3">
              {controls.map(([label, text], index) => (
                <div key={label} className="flex items-start gap-3 rounded-lg border border-white/7 bg-white/[0.025] px-3 py-2.5 sm:rounded-xl sm:px-4 sm:py-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${index === 0 ? "bg-[var(--theme-secondary)]" : index === 1 ? "bg-[var(--theme-sky)]" : "bg-[var(--theme-tertiary)]"}`} />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-white/62">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/62">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
