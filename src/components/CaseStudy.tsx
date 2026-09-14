import { useEffect } from "react";
import { motion } from "framer-motion";
import BrowserFrame from "./BrowserFrame";
import FlowSteps from "./FlowSteps";
import { caseStudies } from "../data/content";
import nextroleImg from "../assets/projects/nextrole.jpg";
import recoverhvacImg from "../assets/projects/recoverhvac.jpg";

const images = { nextrole: nextroleImg, recoverhvac: recoverhvacImg };

function domainOf(url?: string | null) {
  if (!url) return "internal build";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/10 py-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--theme-primary)_82%,white)]">{label}</p>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[15px] leading-relaxed text-white/72">
      {items.map((p) => (
        <li key={p} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--theme-primary)]" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudy({ slug }: { slug: string }) {
  const cs = caseStudies[slug];
  const isNextRole = slug === "nextrole";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cs) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-6">
        <p className="text-white/72">Case study not found.</p>
        <a href="#/" className="text-[var(--theme-primary)] hover:underline">← Back to portfolio</a>
      </div>
    );
  }

  const titleStatus = isNextRole ? "Active build · In development" : cs.status;
  const titleTagline = isNextRole ? "AI-assisted job search & résumé workflow" : cs.tagline;
  const overview = isNextRole
    ? "A job-search workspace that connects discovery, résumé tailoring, ATS checks, authentication, and application tracking while application automation continues to be developed."
    : cs.overview;

  return (
    <main className="relative min-h-screen bg-ink">
      <div className="pointer-events-none absolute left-1/4 top-24 h-96 w-96 rounded-full blur-[90px] opacity-50 bg-[color-mix(in_srgb,var(--theme-primary)_20%,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
        <a href="#/" className="inline-flex items-center gap-2 text-sm text-white/72 transition hover:text-[var(--theme-primary)]">← Back to portfolio</a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mt-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/72">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" />
            {titleStatus}
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)" }} className="mt-3 text-4xl italic text-white md:text-5xl">{cs.name}</h1>
          <p className="mt-2 text-[color-mix(in_srgb,var(--theme-primary)_82%,white)]">{titleTagline}</p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">{overview}</p>

          {isNextRole && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--theme-tertiary)]">Working now</p>
                <p className="mt-2 text-sm leading-6 text-white/66">Résumé editor, tailoring, authentication, ATS checks, and application tracking.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--theme-secondary)]">In progress</p>
                <p className="mt-2 text-sm leading-6 text-white/66">Application automation, employer-site integrations, and reliability improvements.</p>
              </div>
            </div>
          )}

          {cs.url && (
            <a href={cs.url} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full theme-primary px-5 py-2.5 text-xs font-bold transition hover:brightness-110">
              {isNextRole ? "View current build ↗" : "View live product ↗"}
            </a>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} className="mt-10">
          <BrowserFrame url={domainOf(cs.url)} href={cs.url}>
            <img src={images[cs.image]} alt={`${cs.name} screenshot`} className="aspect-[16/10] w-full object-cover object-top" />
          </BrowserFrame>
        </motion.div>

        <div className="mt-10">
          <Block label="The problem"><p className="max-w-2xl text-[15px] leading-relaxed text-white/72">{cs.problem}</p></Block>
          <Block label="How it flows"><FlowSteps steps={cs.flow} intervalMs={1500} /></Block>
          <Block label={isNextRole ? "Implemented so far" : "What I built"}><Bullets items={cs.build} /></Block>
          <Block label="My role"><Bullets items={cs.role} /></Block>
          <Block label="Status">
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/72">
              {isNextRole ? "Active development. The core résumé, tailoring, authentication, ATS, and tracking workflows are in place. Application automation and employer-site integrations are still being refined and are not presented as finished." : cs.statusNote}
            </p>
          </Block>
          <Block label="Stack"><div className="flex flex-wrap gap-1.5">{cs.stack.map((s) => <span key={s} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/68">{s}</span>)}</div></Block>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
          {cs.url && <a href={cs.url} target="_blank" rel="noreferrer" className="rounded-full theme-primary px-6 py-3 text-sm font-bold transition hover:brightness-110">{isNextRole ? "View current build ↗" : "View live product ↗"}</a>}
          <a href="#/" className="surface rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-[color-mix(in_srgb,var(--theme-primary)_60%,transparent)]">← All work</a>
        </div>
      </div>
    </main>
  );
}
