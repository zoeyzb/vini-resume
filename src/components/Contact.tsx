import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Section from "./Section";
import { CONTACT_EMAIL_HREF, profile, externalLinks, RESUME_HREF } from "../data/content";

const secondary = externalLinks;
const phoneDisplay = "(872) 242-0771";
const phoneHref = "+18722420771";

const contactTones = [
  "bg-[var(--theme-sky)] text-[#071018] hover:bg-[color-mix(in_srgb,var(--theme-sky)_65%,white)]",
  "bg-[var(--theme-secondary)] text-[#241804] hover:bg-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]",
  "bg-[var(--theme-primary)] text-[#2a0f0b] hover:bg-[color-mix(in_srgb,var(--theme-primary)_65%,white)]",
  "bg-[var(--theme-tertiary)] text-[#092119] hover:bg-[color-mix(in_srgb,var(--theme-tertiary)_65%,white)]",
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.prompt("Copy Vineet's email address:", profile.email);
    }
  }

  return (
    <Section id="contact" act={5} eyebrow="Contact" title="Open to internships, product work, and practical collaborations" tone="signal">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#111014] p-6 shadow-[0_34px_100px_-55px_color-mix(in_srgb,var(--theme-primary)_65%,transparent)] md:p-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--theme-primary)]/18 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 left-[25%] h-72 w-72 rounded-full bg-[var(--theme-sky)]/12 blur-[100px]" />

        <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="max-w-lg text-lg font-semibold leading-7 text-white/82">
              AI and automation work, ecommerce and growth operations, websites, customer experience roles, internships, and collaborations.
            </p>
            <p className="mt-4 text-sm text-white/62">{profile.location}</p>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--theme-tertiary)] shadow-[0_0_14px_color-mix(in_srgb,var(--theme-tertiary)_70%,transparent)]" />
              <span className="text-xs font-medium text-white/62">Available for conversations</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={CONTACT_EMAIL_HREF}
              aria-label={profile.email}
              className={`rounded-2xl p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${contactTones[0]}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Email</span>
              <span className="mt-2 block break-all text-sm font-bold">{profile.email}</span>
              <span className="mt-1 block text-xs opacity-70">Open email <FiArrowUpRight className="ml-1 inline-block h-3.5 w-3.5" aria-hidden="true" /></span>
            </a>

            <button type="button" onClick={copyEmail} className={`rounded-2xl p-4 text-left transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${contactTones[1]}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Copy</span>
              <span className="mt-2 block text-sm font-bold">{copied ? "Copied ✓" : "Copy email address"}</span>
              <span className="mt-1 block text-xs opacity-70">Ready to paste anywhere</span>
            </button>

            <a href={`tel:${phoneHref}`} className={`rounded-2xl p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${contactTones[2]}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Call</span>
              <span className="mt-2 block text-sm font-bold">{phoneDisplay}</span>
              <span className="mt-1 block text-xs opacity-55">Tap to call</span>
            </a>

            <a href={`sms:${phoneHref}`} className={`rounded-2xl p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${contactTones[3]}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Text</span>
              <span className="mt-2 block text-sm font-bold">{phoneDisplay}</span>
              <span className="mt-1 block text-xs opacity-55">Open a message</span>
            </a>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
          <a
            href={RESUME_HREF}
            download
            className="theme-primary rounded-full px-5 py-2.5 text-xs font-bold transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Download résumé (PDF)
          </a>
        </div>

        {secondary.length > 0 && (
          <div className="relative mt-5 flex flex-wrap gap-2">
            {secondary.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${index % 2 === 0 ? "border-[var(--theme-sky)]/25 bg-[var(--theme-sky)]/7 text-[color-mix(in_srgb,var(--theme-sky)_72%,white)] hover:border-[var(--theme-sky)]/50" : "border-[var(--theme-secondary)]/25 bg-[var(--theme-secondary)]/7 text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)] hover:border-[var(--theme-secondary)]/50"}`}
              >
                {link.label} <FiArrowUpRight className="ml-1 inline-block h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-xs text-white/62">Vineet Singh · Galesburg, Illinois</footer>
    </Section>
  );
}
