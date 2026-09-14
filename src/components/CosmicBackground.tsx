import { Suspense, lazy } from "react";

const ParticleBackground = lazy(() => import("./ParticleBackground"));

export default function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#010103]" aria-hidden="true">
      {/* FAR CHAMBER */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_34%_at_50%_42%,rgba(25,31,48,.72)_0%,rgba(9,11,18,.64)_34%,rgba(2,2,5,.96)_72%,#010103_100%)]" />
      <div className="absolute left-1/2 top-[42%] h-[28vh] w-[34vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--theme-sky)_13%,transparent),color-mix(in_srgb,var(--theme-primary)_5%,transparent)_42%,transparent_72%)] blur-[75px] opacity-70" />

      {/* DISTANT DUST */}
      <div className="absolute inset-[10%] opacity-[0.075] [background-image:radial-gradient(circle,rgba(255,255,255,.82)_0_.4px,transparent_.7px)] [background-size:29px_29px] [mask-image:radial-gradient(ellipse_at_center,black_0%,black_48%,transparent_82%)]" />
      <div className="absolute inset-[5%] scale-105 opacity-[0.045] [background-image:radial-gradient(circle,rgba(135,205,255,.9)_0_.7px,transparent_1.1px)] [background-size:91px_91px] [background-position:37px_21px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_76%)]" />

      {/* RECEDING RINGS */}
      <div className="absolute left-1/2 top-[43%] h-[34vh] w-[46vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.025] shadow-[0_0_80px_rgba(90,150,255,.025)]" />
      <div className="absolute left-1/2 top-[43%] h-[48vh] w-[64vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.018] shadow-[inset_0_0_110px_rgba(0,0,0,.68)]" />
      <div className="absolute left-1/2 top-[43%] h-[68vh] w-[86vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.014] shadow-[inset_0_0_150px_rgba(0,0,0,.82)]" />

      {/* PERSPECTIVE ARCHITECTURE — extremely faint geometry converges into the chamber.
          This supplies scale without turning the page into a Tron grid. */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="depthLine" x1="0" y1="1" x2="0.5" y2="0.42">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.34" stopColor="white" stopOpacity="0.11" />
            <stop offset="0.72" stopColor="white" stopOpacity="0.045" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="frameStroke" cx="50%" cy="42%" r="58%">
            <stop offset="0" stopColor="white" stopOpacity="0.09" />
            <stop offset="0.72" stopColor="white" stopOpacity="0.025" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[0, 170, 340, 510, 680, 920, 1090, 1260, 1430, 1600].map((x) => (
          <line key={`top-${x}`} x1={x} y1="0" x2="800" y2="420" stroke="url(#depthLine)" strokeWidth="1" />
        ))}
        {[0, 180, 360, 540, 720, 880, 1060, 1240, 1420, 1600].map((x) => (
          <line key={`bottom-${x}`} x1={x} y1="1000" x2="800" y2="420" stroke="url(#depthLine)" strokeWidth="1" />
        ))}
        {[0, 150, 300, 450, 550, 700, 850, 1000].map((y) => (
          <line key={`left-${y}`} x1="0" y1={y} x2="800" y2="420" stroke="url(#depthLine)" strokeWidth="0.8" />
        ))}
        {[0, 150, 300, 450, 550, 700, 850, 1000].map((y) => (
          <line key={`right-${y}`} x1="1600" y1={y} x2="800" y2="420" stroke="url(#depthLine)" strokeWidth="0.8" />
        ))}

        {/* A few distant architectural frames rather than visible boxes. */}
        <rect x="620" y="310" width="360" height="220" rx="22" fill="none" stroke="url(#frameStroke)" strokeWidth="1" />
        <rect x="500" y="235" width="600" height="370" rx="34" fill="none" stroke="url(#frameStroke)" strokeWidth="1" />
        <rect x="330" y="140" width="940" height="560" rx="52" fill="none" stroke="url(#frameStroke)" strokeWidth="1" />
      </svg>

      {/* A low perspective floor gives the eye a near plane. */}
      <div className="absolute inset-x-[-18%] bottom-[-34%] h-[62%] origin-bottom opacity-[0.07] [perspective:900px]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[size:90px_62px] [transform:rotateX(72deg)] [mask-image:linear-gradient(to_top,black_0%,rgba(0,0,0,.6)_34%,transparent_84%)]" />
      </div>

      {/* SIDE WALLS / OCCLUSION */}
      <div className="absolute -left-[24vw] -top-[10vh] h-[120vh] w-[58vw] rounded-[48%] bg-[radial-gradient(ellipse_at_72%_48%,color-mix(in_srgb,var(--theme-secondary)_7%,transparent),rgba(2,2,5,.74)_42%,#010103_76%)] blur-[70px] opacity-95" />
      <div className="absolute -right-[25vw] -top-[8vh] h-[118vh] w-[59vw] rounded-[48%] bg-[radial-gradient(ellipse_at_28%_46%,color-mix(in_srgb,var(--theme-sky)_7%,transparent),rgba(2,2,5,.76)_42%,#010103_77%)] blur-[72px] opacity-95" />
      <div className="absolute -bottom-[35vh] left-[12vw] h-[64vh] w-[76vw] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--theme-primary)_5%,transparent),rgba(1,1,3,.86)_48%,#010103_78%)] blur-[85px]" />

      {/* MID-DEPTH VOLUMES */}
      <div className="absolute left-[9vw] top-[18vh] h-[28vh] w-[30vw] rounded-full bg-[color-mix(in_srgb,var(--theme-secondary)_8%,transparent)] blur-[115px] opacity-45 animate-[pulse_13s_ease-in-out_infinite]" />
      <div className="absolute right-[8vw] top-[52vh] h-[32vh] w-[31vw] rounded-full bg-[color-mix(in_srgb,var(--theme-sky)_8%,transparent)] blur-[125px] opacity-42 animate-[pulse_17s_ease-in-out_infinite]" />

      {/* PARTICLE VOLUME */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* NEAR DUST / HAZE */}
      <div className="absolute inset-[-6%] opacity-[0.075] [background-image:radial-gradient(circle,rgba(255,255,255,.75)_0_1px,rgba(255,255,255,.12)_1.3px,transparent_2.5px)] [background-size:173px_151px] [background-position:23px_47px]" />
      <div className="absolute -left-[16vw] top-[25vh] h-[13vh] w-[60vw] -rotate-6 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--theme-secondary)_7%,transparent),transparent)] blur-[45px] opacity-35" />
      <div className="absolute -right-[18vw] top-[68vh] h-[15vh] w-[62vw] rotate-5 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--theme-sky)_7%,transparent),transparent)] blur-[50px] opacity-32" />

      {/* FOREGROUND LENS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_54%_at_50%_44%,transparent_0%,transparent_42%,rgba(0,0,0,.22)_66%,rgba(0,0,0,.68)_86%,rgba(0,0,0,.94)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.18)_18%,transparent_34%,transparent_66%,rgba(0,0,0,.18)_82%,rgba(0,0,0,.72)_100%)]" />
      <div className="absolute inset-0 opacity-[0.024] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_160_160%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.9%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.7%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
