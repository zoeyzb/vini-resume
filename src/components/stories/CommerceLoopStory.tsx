import { motion, type MotionValue } from "framer-motion";
import StoryCanvas from "./StoryCanvas";
import { Label, type Frame } from "./DiagramLabel";
import { useRange, useWindow } from "./timeline";

const FRAME: Frame = { w: 660, h: 300 };
const ACCENT = "#73dcff";
const SUCCESS = "#83e6bd";

const STAGES = [
  { label: "Storefront", meta: "Listing · price · offer", x: 24 },
  { label: "Creative", meta: "UGC · message · hook", x: 180 },
  { label: "Campaign", meta: "Audience · spend · signal", x: 336 },
  { label: "Orders", meta: "Support · fulfilment", x: 492 },
] as const;

function Scene({ progress }: { progress: MotionValue<number> }) {
  const stages = [
    useWindow(progress, 0.03, 0.16),
    useWindow(progress, 0.18, 0.31),
    useWindow(progress, 0.33, 0.46),
    useWindow(progress, 0.48, 0.61),
  ];
  const link1 = useRange(progress, 0.12, 0.22, 168, 178);
  const link2 = useRange(progress, 0.27, 0.37, 324, 334);
  const link3 = useRange(progress, 0.42, 0.52, 480, 490);
  const analytics = useWindow(progress, 0.58, 0.72);
  const trace = useRange(progress, 0.68, 0.92, 0, 1);
  const feedback = useWindow(progress, 0.86, 0.98);

  return (
    <>
      <svg viewBox={`0 0 ${FRAME.w} ${FRAME.h}`} className="absolute inset-0 h-full w-full" fill="none" role="img" aria-label="Commerce operations board connecting storefront, creative, campaigns, orders, support, and analytics.">
        <rect x="14" y="16" width="632" height="270" rx="16" fill="rgba(255,255,255,.018)" stroke="rgba(255,255,255,.1)" />
        <rect x="28" y="28" width="604" height="24" rx="6" fill="rgba(255,255,255,.035)" />
        <circle cx="42" cy="40" r="3" fill={SUCCESS} />
        <circle cx="54" cy="40" r="3" fill="rgba(255,255,255,.22)" />
        <circle cx="66" cy="40" r="3" fill="rgba(255,255,255,.22)" />

        <motion.line x1="168" y1="108" x2={link1} y2="108" stroke={ACCENT} strokeWidth="2" opacity=".75" />
        <motion.line x1="324" y1="108" x2={link2} y2="108" stroke={ACCENT} strokeWidth="2" opacity=".75" />
        <motion.line x1="480" y1="108" x2={link3} y2="108" stroke={ACCENT} strokeWidth="2" opacity=".75" />

        {STAGES.map((stage, index) => (
          <motion.g key={stage.label} style={{ opacity: stages[index] }}>
            <rect x={stage.x} y="68" width="144" height="82" rx="10" fill="rgba(115,220,255,.055)" stroke="rgba(115,220,255,.48)" />
            <rect x={stage.x + 12} y="82" width="24" height="20" rx="5" fill="rgba(115,220,255,.18)" />
            <rect x={stage.x + 12} y="122" width="92" height="5" rx="2.5" fill="rgba(255,255,255,.22)" />
            <rect x={stage.x + 12} y="134" width={58 + index * 12} height="4" rx="2" fill="rgba(255,255,255,.1)" />
          </motion.g>
        ))}

        <motion.g style={{ opacity: analytics }}>
          <rect x="24" y="174" width="612" height="92" rx="11" fill="rgba(255,255,255,.028)" stroke="rgba(255,255,255,.11)" />
          <line x1="190" y1="188" x2="190" y2="252" stroke="rgba(255,255,255,.09)" />
          <line x1="360" y1="188" x2="360" y2="252" stroke="rgba(255,255,255,.09)" />
          <motion.path d="M382 238 C 410 230, 422 242, 448 220 S 492 226, 516 204 S 558 210, 612 188" stroke={SUCCESS} strokeWidth="2.5" strokeLinecap="round" pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: trace }} />
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={392 + i * 42} cy={236 - i * 7} r="2.5" fill={SUCCESS} opacity=".7" />)}
        </motion.g>

        <motion.path d="M612 268 C 510 292, 116 292, 46 270" stroke={SUCCESS} strokeWidth="1.5" strokeDasharray="5 6" opacity={feedback} />
      </svg>

      <Label frame={FRAME} x={82} y={40} align="start" width={260} className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/62 sm:text-[10px]">Commerce operations · live workflow</Label>
      {STAGES.map((stage, index) => (
        <Label key={stage.label} frame={FRAME} x={stage.x + 12} y={95} align="start" opacity={stages[index]} width={120} className="text-[11px] font-semibold text-white sm:text-[12px]">{stage.label}</Label>
      ))}
      {STAGES.map((stage, index) => (
        <Label key={`${stage.label}-meta`} frame={FRAME} x={stage.x + 12} y={112} align="start" opacity={stages[index]} width={122} className="text-[8px] text-white/52 sm:text-[9px]">{stage.meta}</Label>
      ))}
      <Label frame={FRAME} x={42} y={198} align="start" opacity={analytics} width={130} className="text-[10px] font-semibold text-white/78 sm:text-[11px]">Traffic quality</Label>
      <Label frame={FRAME} x={208} y={198} align="start" opacity={analytics} width={130} className="text-[10px] font-semibold text-white/78 sm:text-[11px]">Creative signal</Label>
      <Label frame={FRAME} x={378} y={198} align="start" opacity={analytics} width={170} className="text-[10px] font-semibold text-white/78 sm:text-[11px]">Orders + support trend</Label>
      <Label frame={FRAME} x={42} y={226} align="start" opacity={analytics} width={132} className="text-[9px] text-white/48 sm:text-[10px]">Shopify · Search Console</Label>
      <Label frame={FRAME} x={208} y={226} align="start" opacity={analytics} width={132} className="text-[9px] text-white/48 sm:text-[10px]">TikTok · UGC iteration</Label>
      <Label frame={FRAME} x={42} y={280} align="start" opacity={feedback} width={330} className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#83e6bd] sm:text-[10px]">Analytics feeds the next merchandising decision</Label>
    </>
  );
}

export default function CommerceLoopStory() {
  return (
    <StoryCanvas
      title="Commerce operations board"
      caption="Storefront, creative, campaigns, orders, support, and analytics in one operating loop."
      ratio={`${FRAME.w} / ${FRAME.h}`}
      scene={Scene}
      steps={[
        "Products are listed, priced, and merchandised.",
        "UGC creative is produced around the offer.",
        "Campaign signals show which message is working.",
        "Orders and customer support stay connected to the campaign.",
        "Analytics shape the next merchandising decision.",
      ]}
    />
  );
}
