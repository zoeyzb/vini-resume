import { useEffect, useState } from "react";
import { CONTACT_EMAIL_HREF, RESUME_HREF } from "../data/content";
import { ACTS, useStage } from "../lib/stage";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { actIndex } = useStage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.getElementById("nav-menu-toggle")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openResume = () => {
    window.open(RESUME_HREF, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3">
      <nav
        aria-label="Primary navigation"
        className={`surface mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 text-sm transition-all duration-300 sm:px-5 ${scrolled ? "mt-2 py-2" : "mt-4 py-3"}`}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2 font-bold tracking-wide text-white" onClick={() => setOpen(false)}>
          <span className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-black transition group-hover:rotate-6" style={{ background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))", color: "var(--theme-primary-ink)" }}>SB</span>
          <span className="hidden sm:inline">Vineet Singh</span>
        </a>

        <ul className="hidden gap-1 lg:flex">
          {ACTS.map((act, index) => {
            const selected = actIndex === index;
            return (
              <li key={act.anchor}>
                <a href={`#${act.anchor}`} aria-current={selected ? "location" : undefined} className="relative block rounded-full px-3 py-2 text-xs font-medium transition hover:text-white" style={{ color: selected ? "var(--theme-secondary)" : "rgba(255,255,255,.72)", background: selected ? "color-mix(in srgb, var(--theme-secondary) 9%, transparent)" : undefined }}>
                  {act.label}
                  {selected && <span className="absolute inset-x-3 -bottom-px h-px rounded-full bg-[var(--theme-secondary)]" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={openResume} className="hidden rounded-full border border-white/16 px-3.5 py-2 text-xs font-semibold text-white/82 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white sm:inline-block">Résumé</button>
          <a href={CONTACT_EMAIL_HREF} className="theme-primary rounded-full px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5">Contact</a>
          <button id="nav-menu-toggle" type="button" aria-label="Menu" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/16 lg:hidden">
            <span className={`h-0.5 w-4 bg-white transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-white transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="nav-menu" className="surface mx-auto mt-2 max-w-6xl rounded-[1.4rem] p-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {ACTS.map((act, index) => (
              <li key={act.anchor}>
                <a href={`#${act.anchor}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition hover:bg-white/5 hover:text-white" style={{ color: actIndex === index ? "var(--theme-secondary)" : "rgba(255,255,255,.84)", background: actIndex === index ? "color-mix(in srgb, var(--theme-secondary) 9%, transparent)" : undefined }}>
                  <span className="font-mono text-[11px] tabular-nums opacity-70">{String(index + 1).padStart(2, "0")}</span>
                  {act.label}
                </a>
              </li>
            ))}
            <li><button type="button" onClick={() => { setOpen(false); openResume(); }} className="mt-1 block w-full rounded-xl border border-white/16 px-3 py-3 text-center font-semibold text-white">Open résumé (PDF)</button></li>
            <li><a href={CONTACT_EMAIL_HREF} onClick={() => setOpen(false)} className="mt-1 block w-full rounded-xl bg-[var(--theme-primary)] px-3 py-3 text-center font-semibold text-[var(--theme-primary-ink)]">Contact Vineet</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
