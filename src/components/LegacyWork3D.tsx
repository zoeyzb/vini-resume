import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import Section from "./Section";

const projects = [
  {
    id: "01",
    kicker: "Game engineering",
    title: "3D First-Person Zombie Survival Game",
    stack: ["Godot", "Blender", "GDScript", "AI behavior"],
    description: "Designed a 3D survival game with enemy AI, physics systems, and optimized rendering.",
    accent: "var(--theme-secondary)",
    visual: "game",
  },
  {
    id: "02",
    kicker: "Scientific computing",
    title: "Telescope Scheduling System",
    stack: ["Astroplan", "Python", "PyTest", "100+ tests"],
    description: "Built a scheduling engine for astronomical observation planning and authored 100+ automated tests.",
    accent: "var(--theme-sky)",
    visual: "orbit",
  },
  {
    id: "03",
    kicker: "Data science",
    title: "Aluminum Price Forecasting Web App",
    stack: ["Python", "Prophet", "Flask", "Pandas"],
    description: "Modeled aluminum-price time series from 2008–2024 and deployed a predictive web interface.",
    accent: "var(--theme-tertiary)",
    visual: "forecast",
  },
] as const;

type SceneMotion = {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  xFar: ReturnType<typeof useSpring>;
  yFar: ReturnType<typeof useSpring>;
};

function HudCorners({ accent }: { accent: string }) {
  return (
    <>
      <span className="absolute left-4 top-4 h-5 w-5 border-l border-t opacity-45" style={{ borderColor: accent }} />
      <span className="absolute right-4 top-4 h-5 w-5 border-r border-t opacity-45" style={{ borderColor: accent }} />
      <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l opacity-45" style={{ borderColor: accent }} />
      <span className="absolute bottom-4 right-4 h-5 w-5 border-b border-r opacity-45" style={{ borderColor: accent }} />
    </>
  );
}

function GameScene({ accent, scene }: { accent: string; scene: SceneMotion }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(to_bottom,#090807,#050505)]">
      <motion.div className="absolute inset-0" style={{ x: scene.xFar, y: scene.yFar }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,137,70,.17),transparent_30%),radial-gradient(circle_at_22%_48%,rgba(255,90,35,.08),transparent_18%),linear-gradient(to_bottom,transparent,rgba(0,0,0,.52))]" />
        {[14, 26, 38, 62, 76, 88].map((x, i) => (
          <motion.span key={x} className="absolute bottom-[34%] w-px bg-white/10" style={{ left: `${x}%`, height: `${18 + (i % 3) * 8}%` }} animate={{ opacity: [.18, .45, .18] }} transition={{ duration: 3 + i * .35, repeat: Infinity }} />
        ))}
      </motion.div>

      <motion.div className="absolute inset-x-[-8%] bottom-[-42%] h-[126%] origin-bottom" style={{ x: scene.x, y: scene.y }} animate={{ y: [0, 10, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.085)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-55 [transform:rotateX(70deg)] [transform-origin:center_bottom] [mask-image:linear-gradient(to_top,black,transparent_86%)]" />
      </motion.div>

      {[{ left: 22, delay: 0, scale: 1 }, { left: 72, delay: .7, scale: .85 }, { left: 46, delay: 1.2, scale: .62 }].map((enemy, i) => (
        <motion.div key={enemy.left} className="absolute top-[34%] h-24 w-11 origin-bottom" style={{ left: `${enemy.left}%` }} animate={{ x: i === 1 ? [0, -14, -6, 0] : [0, 12, 4, 0], y: [0, 8, 2, 0], scale: [enemy.scale, enemy.scale * 1.16, enemy.scale * 1.04, enemy.scale] }} transition={{ duration: 4.8 + i * .55, repeat: Infinity, ease: "easeInOut", delay: enemy.delay }}>
          <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border border-white/18 bg-black/90" />
          <div className="absolute bottom-0 left-1/2 h-[72px] w-[32px] -translate-x-1/2 rounded-[42%_42%_18%_18%] border border-white/12 bg-black/82" />
          <motion.span className="absolute -left-1 top-8 h-9 w-1.5 origin-top rounded-full bg-white/10" animate={{ rotate: [15, -18, 15] }} transition={{ duration: 1.1, repeat: Infinity }} />
          <motion.span className="absolute -right-1 top-8 h-9 w-1.5 origin-top rounded-full bg-white/10" animate={{ rotate: [-15, 18, -15] }} transition={{ duration: 1.1, repeat: Infinity, delay: .12 }} />
          {i === 0 && <motion.span className="absolute left-[39%] top-[14px] h-1 w-1 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} animate={{ opacity: [.2, 1, .2] }} transition={{ duration: 1.2, repeat: Infinity }} />}
        </motion.div>
      ))}

      <motion.div className="absolute left-1/2 top-[49%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/22" animate={{ scale: [1, 1.14, 1], rotate: [0, 4, 0], opacity: [.55, 1, .55] }} transition={{ duration: 1.55, repeat: Infinity }}>
        <span className="absolute left-1/2 top-[-13px] h-5 w-px -translate-x-1/2 bg-white/34" />
        <span className="absolute bottom-[-13px] left-1/2 h-5 w-px -translate-x-1/2 bg-white/34" />
        <span className="absolute left-[-13px] top-1/2 h-px w-5 -translate-y-1/2 bg-white/34" />
        <span className="absolute right-[-13px] top-1/2 h-px w-5 -translate-y-1/2 bg-white/34" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 16px ${accent}` }} />
      </motion.div>

      <motion.div className="absolute bottom-[-18px] right-[5%] h-32 w-48 origin-bottom" style={{ x: scene.x }} animate={{ rotate: [-2, 1.8, -2], y: [0, 4, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
        <div className="absolute bottom-3 right-3 h-20 w-32 -skew-x-6 rounded-lg border border-white/10 bg-black/90" />
        <div className="absolute bottom-[82px] right-9 h-4 w-28 rotate-[-7deg] rounded-sm border border-white/10 bg-black/95" />
      </motion.div>

      <motion.div className="absolute left-4 top-5 h-20 w-20 rounded-full border border-white/12" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        {[0, 90, 180, 270].map((r) => <span key={r} className="absolute left-1/2 top-1/2 h-1 w-6 origin-left bg-white/10" style={{ transform: `rotate(${r}deg)` }} />)}
        <motion.span className="absolute left-[58%] top-[26%] h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} animate={{ scale: [.8, 1.5, .8] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
      <motion.div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ top: ["8%", "94%"], opacity: [.08, .5, .08] }} transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }} />
      <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.16em] text-white/30">WAVE 07 · AI NAV ACTIVE</div>
      <div className="absolute bottom-4 right-4 font-mono text-[8px] tracking-[0.16em] text-white/30">FPS 60</div>
      <HudCorners accent={accent} />
    </div>
  );
}

function OrbitScene({ accent, scene }: { accent: string; scene: SceneMotion }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(to_bottom,#061017,#03070b)]">
      <motion.div className="absolute inset-0" style={{ x: scene.xFar, y: scene.yFar }}>
        {[12, 24, 42, 57, 73, 88].map((x, i) => <motion.span key={x} className="absolute h-1 w-1 rounded-full bg-white/60" style={{ left: `${x}%`, top: `${18 + (i % 3) * 18}%` }} animate={{ opacity: [.2, .9, .2], scale: [.8, 1.5, .8] }} transition={{ duration: 2.2 + i * .4, repeat: Infinity }} />)}
      </motion.div>
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(66,212,255,.14),transparent_40%)]" animate={{ opacity: [.45, 1, .45] }} transition={{ duration: 4.5, repeat: Infinity }} />

      <motion.div className="absolute bottom-[4%] left-1/2 h-20 w-32 -translate-x-1/2" style={{ x: scene.x }}>
        <div className="absolute bottom-0 left-1/2 h-11 w-28 -translate-x-1/2 rounded-t-full border border-white/12 bg-black/78" />
        <div className="absolute bottom-8 left-1/2 h-14 w-16 -translate-x-1/2 rounded-t-[50%] border border-white/14 bg-black/80" />
        <div className="absolute bottom-[49px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white" style={{ boxShadow: `0 0 26px ${accent}` }} />
      </motion.div>

      <motion.div className="absolute left-1/2 top-[43%] h-[72%] w-[94%] -translate-x-1/2 -translate-y-1/2" style={{ x: scene.x, y: scene.y }}>
        {[0, 1, 2, 3].map((ring) => (
          <motion.div key={ring} className="absolute left-1/2 top-1/2 rounded-[50%] border border-white/14" style={{ width: `${48 + ring * 14}%`, height: `${24 + ring * 10}%`, transform: `translate(-50%,-50%) rotate(${14 + ring * 18}deg)` }} animate={{ rotate: ring % 2 ? -360 : 360, scale: [1, 1.035, 1] }} transition={{ rotate: { duration: 12 + ring * 5, repeat: Infinity, ease: "linear" }, scale: { duration: 3.6 + ring, repeat: Infinity } }}>
            <motion.span className="absolute -top-1 left-[18%] h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 18px ${accent}` }} animate={{ scale: [.7, 1.6, .7], opacity: [.45, 1, .45] }} transition={{ duration: 1.6 + ring * .4, repeat: Infinity }} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="absolute inset-y-[12%] w-px bg-gradient-to-b from-transparent via-white/22 to-transparent" animate={{ left: ["9%", "91%"] }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute left-[17%] top-[15%] rounded-lg border border-white/10 bg-black/28 px-2 py-1 font-mono text-[8px] tracking-[0.14em] text-white/34" animate={{ opacity: [.35, .9, .35], x: [0, 4, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>OBSERVATION WINDOW 04:20–05:48</motion.div>
      <div className="absolute bottom-4 left-5 right-5 h-1 rounded-full bg-white/6"><motion.div className="h-full rounded-full" style={{ background: accent }} animate={{ width: ["18%", "82%", "36%", "18%"] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }} /></div>
      <HudCorners accent={accent} />
    </div>
  );
}

function ForecastScene({ accent, scene }: { accent: string; scene: SceneMotion }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(to_bottom,#07100d,#030806)]">
      <motion.div className="absolute inset-0" style={{ x: scene.xFar, y: scene.yFar }}>
        {[24, 42, 60, 78].map((y) => <div key={y} className="absolute left-[7%] right-[6%] h-px bg-white/[0.05]" style={{ top: `${y}%` }} />)}
        {[18, 36, 54, 72, 90].map((x) => <div key={x} className="absolute bottom-[10%] top-[14%] w-px bg-white/[0.04]" style={{ left: `${x}%` }} />)}
      </motion.div>

      <motion.svg className="absolute inset-[7%] h-[82%] w-[86%] overflow-visible" viewBox="0 0 300 150" fill="none" aria-hidden="true" style={{ x: scene.x, y: scene.y }}>
        <defs><linearGradient id="forecastMain" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="white" stopOpacity=".2" /><stop offset=".55" stopColor={accent} /><stop offset="1" stopColor="white" stopOpacity=".95" /></linearGradient></defs>
        <motion.path d="M4 128 C27 119 40 113 61 118 C81 123 95 96 113 102 C132 108 143 80 160 85 C179 91 192 63 210 68 C228 74 241 44 258 50 C276 56 284 28 296 18" stroke="url(#forecastMain)" strokeWidth="2.8" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }} />
        <motion.path d="M210 68 C232 58 250 44 268 33 C280 26 289 19 296 13" stroke={accent} strokeWidth="2.1" strokeDasharray="4 5" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: .85 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .9 }} />
        <motion.path d="M210 56 C238 39 267 18 296 5 L296 29 C266 42 239 60 210 81 Z" fill={accent} animate={{ opacity: [.035, .12, .035] }} transition={{ duration: 3.5, repeat: Infinity }} />
        <motion.circle r="4" fill={accent} animate={{ cx: [56, 105, 156, 208, 254, 292], cy: [117, 103, 85, 68, 51, 18] }} transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }} style={{ filter: `drop-shadow(0 0 7px ${accent})` }} />
      </motion.svg>

      <motion.div className="absolute top-[13%] h-[72%] w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" animate={{ left: ["10%", "90%"], opacity: [.12, .65, .12] }} transition={{ duration: 4.9, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md" style={{ x: scene.x }} animate={{ y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity }}>
        <div className="font-mono text-[8px] tracking-[0.14em] text-white/30">NEXT 90 DAYS</div>
        <div className="mt-1 text-sm font-bold text-white/86">$2,684</div>
        <div className="mt-0.5 text-[9px]" style={{ color: accent }}>↑ 4.7%</div>
      </motion.div>
      <HudCorners accent={accent} />
    </div>
  );
}

function ProjectScene({ type, accent, scene }: { type: string; accent: string; scene: SceneMotion }) {
  if (type === "game") return <GameScene accent={accent} scene={scene} />;
  if (type === "orbit") return <OrbitScene accent={accent} scene={scene} />;
  return <ForecastScene accent={accent} scene={scene} />;
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const px = useMotionValue(.5);
  const py = useMotionValue(.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 145, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 145, damping: 22 });
  const sceneX = useSpring(useTransform(px, [0, 1], [-18, 18]), { stiffness: 110, damping: 21 });
  const sceneY = useSpring(useTransform(py, [0, 1], [-12, 12]), { stiffness: 110, damping: 21 });
  const farX = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 95, damping: 23 });
  const farY = useSpring(useTransform(py, [0, 1], [-5, 5]), { stiffness: 95, damping: 23 });
  const contentX = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 135, damping: 24 });
  const contentY = useSpring(useTransform(py, [0, 1], [-3, 3]), { stiffness: 135, damping: 24 });
  const glowX = useTransform(px, [0, 1], [0, 100]);
  const glowY = useTransform(py, [0, 1], [0, 100]);
  const glow = useMotionTemplate`radial-gradient(460px circle at ${glowX}% ${glowY}%, color-mix(in srgb, ${project.accent} 28%, transparent), transparent 62%)`;

  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const reset = () => { px.set(.5); py.set(.5); };

  return (
    <div className="relative pb-16 [perspective:1600px]">
      <motion.div className="pointer-events-none absolute bottom-4 left-[8%] right-[8%] h-16 rounded-[50%] border" style={{ borderColor: `color-mix(in srgb, ${project.accent} 42%, transparent)`, boxShadow: `0 0 46px color-mix(in srgb, ${project.accent} 32%, transparent), inset 0 0 26px color-mix(in srgb, ${project.accent} 13%, transparent)` }} animate={{ scaleX: [.82, 1.12, .82], scaleY: [.9, 1.06, .9], opacity: [.32, .88, .32] }} transition={{ duration: 3.5 + index * .35, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-8 left-[23%] right-[23%] h-4 rounded-full blur-xl" style={{ background: project.accent }} animate={{ opacity: [.15, .52, .15], scaleX: [.75, 1.18, .75] }} transition={{ duration: 3.2, repeat: Infinity }} />

      <motion.article initial={{ opacity: 0, y: 74, scale: .93, rotateX: 10, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .18 }} transition={{ duration: .95, delay: index * .13, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -16, scale: 1.018 }} onMouseMove={move} onMouseLeave={reset} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="group relative min-h-[540px] overflow-hidden rounded-[32px] border border-white/10 bg-black/38 shadow-[0_55px_130px_rgba(0,0,0,.52)] backdrop-blur-xl">
        <motion.div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: glow }} />
        <motion.div className="pointer-events-none absolute inset-0 rounded-[32px]" animate={{ boxShadow: [`inset 0 0 0 1px color-mix(in srgb, ${project.accent} 12%, transparent)`, `inset 0 0 0 1px color-mix(in srgb, ${project.accent} 48%, transparent)`, `inset 0 0 0 1px color-mix(in srgb, ${project.accent} 12%, transparent)`] }} transition={{ duration: 3.6, repeat: Infinity }} />

        <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden border-b border-white/8" style={{ transform: "translateZ(30px)" }}>
          <ProjectScene type={project.visual} accent={project.accent} scene={{ x: sceneX, y: sceneY, xFar: farX, yFar: farY }} />
          <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] backdrop-blur-md" style={{ color: project.accent }}>{project.kicker}</div>
          <div className="absolute right-5 top-5 font-mono text-xs text-white/34">{project.id}</div>
        </div>

        <motion.div className="absolute inset-x-0 bottom-0 top-[58%] flex flex-col p-6 md:p-7" style={{ x: contentX, y: contentY, transform: "translateZ(54px)" }}>
          <div className="mt-auto">
            <h3 className="max-w-[22ch] text-[clamp(1.45rem,2.1vw,2rem)] font-black leading-[1.03] tracking-[-0.035em] text-white">{project.title}</h3>
            <p className="mt-4 max-w-[44ch] text-sm leading-6 text-white/60">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item, i) => <motion.span key={item} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .35 + index * .08 + i * .05 }} className="rounded-full border border-white/9 bg-white/[0.035] px-2.5 py-1 text-[10px] text-white/56">{item}</motion.span>)}
            </div>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export default function LegacyWork3D() {
  return (
    <Section id="earlier-work" act={3} eyebrow="Selected builds" title="Games, scientific tools, and predictive software" tone="data">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .75 }} className="mb-7 flex items-end justify-between gap-5">
        <p className="max-w-xl text-sm leading-6 text-white/48">Three technical builds shown as interactive scenes. Move the cursor across a card to shift the foreground, interface, and background at different depths.</p>
        <motion.span className="hidden font-mono text-[10px] tracking-[0.18em] text-white/28 md:block" animate={{ opacity: [.25, .7, .25] }} transition={{ duration: 2.2, repeat: Infinity }}>MOVE CURSOR · EXPLORE DEPTH</motion.span>
      </motion.div>
      <div className="grid gap-5 lg:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
    </Section>
  );
}
