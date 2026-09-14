import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import { CONTACT_EMAIL_HREF, profile, RESUME_HREF } from "../data/content";
import HeroVisual from "./HeroVisual";

const phoneDisplay = "(872) 242-0771";
const phoneHref = "+18722420771";

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [contactOpen]);

  return (
    <section id="top" className="relative min-h-[94svh] overflow-hidden pt-24">
      <div className="mx-auto flex min-h-[calc(94svh-6rem)] w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-8 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/76">{profile.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/62">{profile.location}</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mt-7 text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--theme-secondary)]">
              Software · Automation · Customer operations
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: "var(--font-serif)" }} className="mt-5 max-w-4xl text-[clamp(3.05rem,7vw,6.7rem)] font-medium leading-[0.91] tracking-[-0.055em] text-white">
              I build software for real operational problems.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.2 }} className="mt-7 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Full-stack products, AI workflows, and customer systems — from prototype through deployment, testing, and day-to-day use.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="theme-primary rounded-full px-6 py-3 text-sm font-bold shadow-[0_18px_50px_-24px_color-mix(in_srgb,var(--theme-primary)_90%,transparent)] transition hover:-translate-y-0.5">Selected work</a>
              <a href="#experience" className="rounded-full border border-white/14 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white/78 transition hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.07] hover:text-white">Experience</a>
              <a href={RESUME_HREF} target="_blank" rel="noreferrer" className="rounded-full border border-white/14 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white/82 transition hover:-translate-y-0.5 hover:border-white/28 hover:text-white">Résumé <FiArrowUpRight className="ml-1 inline-block h-4 w-4" aria-hidden="true" /></a>
              <button type="button" onClick={() => setContactOpen(true)} className="rounded-full px-4 py-3 text-sm font-semibold text-white/72 transition hover:text-white">Contact <FiArrowUpRight className="ml-1 inline-block h-4 w-4" aria-hidden="true" /></button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30, scale: 0.985 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.78, delay: 0.18, ease: [0.22, 1, 0.36, 1] }} className="relative lg:pl-3">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--theme-primary)_10%,transparent),transparent_64%)] blur-3xl" aria-hidden="true" />
            <div className="relative"><HeroVisual /></div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {contactOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-black/74 px-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="hero-contact-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setContactOpen(false); }}>
            <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="w-full max-w-md overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#111017] shadow-[0_35px_110px_-38px_rgba(0,0,0,.95)]">
              <div className="h-1 bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary)] to-[var(--theme-tertiary)]" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-5">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/62">Contact</p><h2 id="hero-contact-title" className="mt-2 text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-serif)" }}>Choose how you want to reach Vineet.</h2></div>
                  <button type="button" onClick={() => setContactOpen(false)} aria-label="Close contact options" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white/62 transition hover:border-white/24 hover:text-white">×</button>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a href={CONTACT_EMAIL_HREF} className="rounded-2xl bg-[var(--theme-primary)] p-4 text-[var(--theme-primary-ink)] transition hover:-translate-y-0.5 hover:brightness-105"><span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">Email</span><span className="mt-2 block break-all text-sm font-bold">{profile.email}</span><span className="mt-1 block text-xs opacity-62">Open email <FiArrowDownRight className="ml-1 inline-block h-3.5 w-3.5" aria-hidden="true" /></span></a>
                  <a href={`tel:${phoneHref}`} className="rounded-2xl bg-[var(--theme-tertiary)] p-4 text-[#092119] transition hover:-translate-y-0.5 hover:brightness-105"><span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">Call</span><span className="mt-2 block text-sm font-bold">{phoneDisplay}</span><span className="mt-1 block text-xs opacity-62">Tap to call</span></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
