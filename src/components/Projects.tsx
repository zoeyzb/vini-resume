import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Section from "./Section";
import BrowserFrame from "./BrowserFrame";
import ProjectVisual from "./ProjectVisual";
import { Reveal, RevealItem, itemCard, itemChip } from "./Reveal";
import { projects } from "../data/content";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import nextroleImg from "../assets/projects/nextrole.jpg";
import recoverhvacImg from "../assets/projects/recoverhvac.jpg";
import jayNoirSitePreview from "../assets/projects/jaynoir-site-preview.jpg";

const jayNoirProject = {
  name: "Jay Noir",
  tagline: "Artist Digital Experience · Design & Development",
  status: "Live client project",
  url: "https://jay-noir.vercel.app/",
  repo: "",
  stack: ["React", "Interactive Web", "Responsive Design", "Motion", "Music Experience"],
  summary: "A live artist experience built around Jay Noir's identity and music, combining discovery, streaming destinations, audience capture, and release-focused storytelling.",
  owned: "Designed and built the digital experience end to end, including the responsive frontend, editorial visual direction, music-platform pathways, audience signup flow, and interactive motion treatment.",
};

type Project = (typeof projects)[number] | typeof jayNoirProject;

const screenshots: Record<string, string> = {
  NextRole: nextroleImg,
  "Recover Operator OS": recoverhvacImg,
};

const outcomes: Record<string, string> = {
  NextRole: "A job-search workspace combining discovery, résumé tailoring, ATS checks, and application tracking.",
  "Recover Operator OS": "A private workspace for incoming requests, follow-up, provider readiness, customer activity, and operational status.",
  "Lead Intelligence & Outreach System": "Website evidence and outreach workflows organized across 1,000+ prospect records.",
  "Jay Noir": "An immersive artist website built for music discovery, release promotion, streaming pathways, and direct audience growth.",
  "AI Import/Export Voice Operations Agent": "Real-caller intake with structured information capture, escalation, and owner review.",
  "ForYouHub Commerce & Growth Operations": "Storefront, advertising, analytics, customer support, and order operations managed in one engagement.",
};

const contributionLabels: Record<string, string> = {
  NextRole: "Built the product structure, frontend workflows, résumé data model, and integration plan across Vercel, Railway, and Supabase.",
  "Recover Operator OS": "Designed the command workspace, approval boundaries, system-status views, and connected service workflows.",
  "Lead Intelligence & Outreach System": "Built the data collection, website-audit logic, and personalized outreach sequence.",
  "Jay Noir": "Designed and built the artist experience end to end: responsive frontend, editorial visual direction, music-platform pathways, audience capture, and motion behavior.",
  "AI Import/Export Voice Operations Agent": "Designed caller handling, information capture, escalation, and owner approval queues.",
  "ForYouHub Commerce & Growth Operations": "Set up the storefront, managed listings and pricing, ran creative and advertising, and supported customer operations.",
};

const roles = [
  { color: "var(--theme-sky)", ink: "#071018" },
  { color: "var(--theme-secondary)", ink: "#241804" },
  { color: "#d07cff", ink: "#120718" },
  { color: "var(--theme-primary)", ink: "var(--theme-primary-ink)" },
  { color: "var(--theme-tertiary)", ink: "#092119" },
];

const displayProjects: Project[] = [...projects, jayNoirProject].sort((a, b) => {
  const order = [
    "Recover Operator OS",
    "Lead Intelligence & Outreach System",
    "Jay Noir",
    "AI Import/Export Voice Operations Agent",
    "NextRole",
    "ForYouHub Commerce & Growth Operations",
  ];
  return order.indexOf(a.name) - order.indexOf(b.name);
});

function domainOf(url?: string | null) {
  if (!url) return "documented project";
  try { return new URL(url).host; } catch { return url; }
}

function ProjectPreview({ children, color, reversed }: { children: ReactNode; color: string; reversed: boolean }) {
  const reduced = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 190, damping: 24 });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4.5, -4.5]), { stiffness: 190, damping: 24 });
  const lightX = useTransform(pointerX, [-0.5, 0.5], ["10%", "90%"]);
  const lightY = useTransform(pointerY, [-0.5, 0.5], ["10%", "90%"]);

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() { pointerX.set(0); pointerY.set(0); }

  return (
    <motion.div onPointerMove={onMove} onPointerLeave={reset} whileHover={reduced ? undefined : { y: -6, rotateZ: reversed ? 0.35 : -0.35 }} transition={{ type: "spring", stiffness: 220, damping: 22 }} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1100 }} className="group/preview relative">
      <motion.span aria-hidden="true" className="pointer-events-none absolute z-20 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover/preview:opacity-45" style={{ left: lightX, top: lightY, background: color }} />
      {children}
    </motion.div>
  );
}

function JayNoirVisual({ reversed, color }: { reversed: boolean; color: string }) {
  return (
    <ProjectPreview color={color} reversed={reversed}>
      <BrowserFrame url="jay-noir.vercel.app" href="https://jay-noir.vercel.app/">
        <img src={jayNoirSitePreview} alt="Screenshot of the Jay Noir artist website" width={1600} height={1000} className="aspect-[16/10] w-full bg-[#160d1a] object-cover object-center transition duration-700 group-hover/preview:scale-[1.018]" loading="eager" decoding="async" />
      </BrowserFrame>
    </ProjectPreview>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const image = screenshots[project.name];
  const visual = "visual" in project ? (project.visual as string | undefined) : undefined;
  const slug = "slug" in project ? (project.slug as string | undefined) : undefined;
  const number = String(index + 1).padStart(2, "0");
  const role = roles[index % roles.length];
  const inDevelopment = project.name === "NextRole";
  const isJayNoir = project.name === "Jay Noir";

  return (
    <Reveal as="article" amount={0.16} stagger={0.08} className={`relative grid items-center gap-8 py-11 md:grid-cols-2 md:gap-14 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}>
      <RevealItem variants={itemCard} className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl" style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${role.color} 16%, transparent), transparent 68%)` }} />
        <span className="absolute -left-1 -top-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/62">Case {number}</span>
        {isJayNoir ? <JayNoirVisual reversed={reversed} color={role.color} /> : image ? (
          <ProjectPreview color={role.color} reversed={reversed}><BrowserFrame url={domainOf(project.url)} href={project.url}><img src={image} alt={`${project.name} screenshot`} width={1600} height={1000} className={`aspect-[16/10] w-full object-top transition duration-700 group-hover/preview:scale-[1.018] ${image === recoverhvacImg ? "bg-[#eeeae1] object-contain" : "bg-[#070a0a] object-cover"}`} loading="lazy" decoding="async" /></BrowserFrame></ProjectPreview>
        ) : <ProjectVisual variant={visual ?? ""} />}
      </RevealItem>
      <RevealItem>
        <div className="flex flex-wrap items-center gap-2"><p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-medium text-white/72"><span className="h-1.5 w-1.5 rounded-full" style={{ background: role.color }} />{inDevelopment ? "Active build · In development" : project.status}</p></div>
        <h3 style={{ fontFamily: "var(--font-serif)" }} className="mt-4 text-3xl font-semibold leading-[0.96] text-white md:text-[2.75rem]">{project.name}</h3>
        <p className="mt-3 text-sm font-semibold" style={{ color: `color-mix(in srgb, ${role.color} 82%, white)` }}>{inDevelopment ? "AI-assisted job search & résumé workflow" : project.tagline}</p>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/72">{outcomes[project.name] ?? project.summary}</p>
        {inDevelopment && <div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--theme-tertiary)]">Working now</p><p className="mt-1.5 text-xs leading-5 text-white/58">Résumé editor, tailoring, authentication, ATS checks, and application tracking.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--theme-secondary)]">In progress</p><p className="mt-1.5 text-xs leading-5 text-white/58">Application automation, employer-site integrations, and reliability improvements.</p></div></div>}
        <div className="mt-5 flex flex-wrap gap-1.5">{project.stack.slice(0, 5).map((item) => <RevealItem key={item} as="span" variants={itemChip} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/68">{item}</RevealItem>)}</div>
        <details className="surface group mt-5 rounded-2xl px-4 py-3"><summary className="flex min-h-8 cursor-pointer items-center justify-between text-xs font-semibold text-white/76 transition hover:text-white">My role <span className="text-base transition group-open:rotate-45">+</span></summary><div className="mt-4 border-t border-white/8 pt-4"><p className="text-sm leading-6 text-white/72">{contributionLabels[project.name] ?? project.owned}</p></div></details>
        <div className="mt-6 flex flex-wrap gap-3">{project.url && <a href={project.url} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 text-xs font-bold transition hover:-translate-y-1 hover:brightness-110" style={{ background: role.color, color: role.ink }}>{inDevelopment ? "View build" : "Open live project"} <FiArrowUpRight className="ml-1 inline-block h-3.5 w-3.5" aria-hidden="true" /></a>}{slug && <a href={`#/work/${slug}`} className="rounded-full border border-white/14 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/32">{inDevelopment ? "Development case study" : "Read case study"} <FiArrowRight className="ml-1 inline-block h-3.5 w-3.5" aria-hidden="true" /></a>}{project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-full border border-white/14 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:border-white/32">GitHub</a>}</div>
      </RevealItem>
    </Reveal>
  );
}

export default function Projects() {
  return <Section id="projects" act={2} eyebrow="Selected work" title="Products and systems built around real workflows" tone="data"><p className="max-w-2xl text-base leading-7 text-white/72">Live client work, automation systems, creative digital experiences, and active product development — ordered to show both technical depth and range.</p><div className="mt-8 divide-y divide-white/10 border-t border-white/10">{displayProjects.map((project, index) => <ProjectRow key={project.name} project={project} index={index} />)}</div></Section>;
}
