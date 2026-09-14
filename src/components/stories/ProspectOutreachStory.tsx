import { useId } from "react";
import { motion, type MotionValue } from "framer-motion";
import StoryCanvas from "./StoryCanvas";
import { Label, type Frame } from "./DiagramLabel";
import { useRange, useWindow } from "./timeline";

/**
 * Prospect field → staged outreach.
 *
 * A field of businesses, none of them qualified. A few light up because
 * something real and checkable was found on their site. Those — and only those
 * — become outreach, which then moves through a staged follow-up.
 *
 * The dead dots stay on screen for the whole sequence on purpose: the honest
 * story is that most of the list never gets contacted.
 *
 * Shapes live in the SVG; labels are HTML positioned over it, so they stay
 * readable at any card width. See `DiagramLabel`.
 */

const FRAME: Frame = { w: 660, h: 300 };

/**
 * The four follow-up stages, each a step further into the funnel.
 *
 * Colour carries the journey rather than decorating it: the message leaves on
 * the cool "just dispatched" tone, warms as the prospect engages, and lands on
 * the success tone once something is actually booked. Four coral pills said
 * nothing about depth.
 */
const STAGES = [
  { label: "Queued", color: "#71d8ff" },
  { label: "Sent", color: "#71d8ff" },
  { label: "Replied", color: "#71d8ff" },
  { label: "Booked", color: "#82e6bd" },
] as const;

/** Qualified rows, and the follow-up stage each one reaches. */
const QUALIFIED = [
  { y: 62, target: 66 },
  { y: 120, target: 122 },
  { y: 178, target: 178 },
  { y: 236, target: 234 },
];

function Scene({ progress }: { progress: MotionValue<number> }) {
  const clipId = useId();

  // Each qualified row lights slightly after the one above it.
  const lit0 = useWindow(progress, 0.18, 0.26);
  const lit1 = useWindow(progress, 0.21, 0.29);
  const lit2 = useWindow(progress, 0.24, 0.32);
  const lit3 = useWindow(progress, 0.27, 0.35);
  const lit = [lit0, lit1, lit2, lit3];

  // The curves are revealed by an animated clip rect rather than a stroke-dash
  // trick, so the dash pattern stays a fixed size as the line grows.
  const reveal = useRange(progress, 0.34, 0.74, 120, 660);

  const stage0 = useWindow(progress, 0.5, 0.62);
  const stage1 = useWindow(progress, 0.6, 0.72);
  const stage2 = useWindow(progress, 0.7, 0.82);
  const stage3 = useWindow(progress, 0.8, 0.92);
  const stages = [stage0, stage1, stage2, stage3];

  const count = useWindow(progress, 0.1, 0.24);
  const auditPanel = useWindow(progress, 0.06, 0.2);
  const scanLine = useRange(progress, 0.12, 0.36, 42, 252);

  return (
    <>
      <svg
        viewBox={`0 0 ${FRAME.w} ${FRAME.h}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        role="img"
        aria-label="A field of prospect records; the few with a checkable finding light up and move through sent, opened, replied and booked."
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect x="0" y="0" height={FRAME.h} width={reveal} />
          </clipPath>
        </defs>

        <motion.rect x="18" y="22" width="392" height="252" rx="14" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)" style={{ opacity: auditPanel }} />
        <motion.line x1="34" x2="394" y1={scanLine} y2={scanLine} stroke="#71d8ff" strokeWidth="1" opacity=".55" />
        {[0, 1, 2, 3].map((row) => (
          <motion.g key={`audit-row-${row}`} style={{ opacity: lit[row] }}>
            <rect x="40" y={48 + row * 58} width="342" height="42" rx="8" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.08)" />
            <rect x="54" y={60 + row * 58} width={98 + row * 18} height="6" rx="3" fill="rgba(255,255,255,.38)" />
            <rect x="54" y={74 + row * 58} width={152 - row * 12} height="5" rx="2.5" fill="rgba(255,255,255,.16)" />
            <rect x="326" y={57 + row * 58} width="40" height="18" rx="9" fill={`color-mix(in srgb, ${STAGES[row].color} 20%, transparent)`} stroke={STAGES[row].color} />
          </motion.g>
        ))}

        {/* --- Curves to the follow-up stack ------------------------------ */}
        <g clipPath={`url(#${clipId})`}>
          {QUALIFIED.map((row, index) => (
            // Each curve is tinted to the stage it lands on, so the fan reads as
            // four different outcomes rather than one repeated action.
            <path
              key={index}
              d={`M382 ${row.y} C 402 ${row.y}, 410 ${row.target}, 424 ${row.target}`}
              stroke={STAGES[index].color}
              strokeWidth="1.6"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.72"
            />
          ))}
        </g>

        {/* --- Staged follow-up pills -------------------------------------- */}
        {STAGES.map((stage, index) => (
          <motion.g key={stage.label} style={{ opacity: stages[index] }}>
            <rect
              x="432"
              y={46 + index * 56}
              width="200"
              height="40"
              rx="9"
              fill={`color-mix(in srgb, ${stage.color} 10%, transparent)`}
              stroke={stage.color}
              strokeWidth="1.5"
            />
            {/* A leading bar in the stage colour, so the progression is legible
                at a glance and not only in the outline. */}
            <rect x="446" y={58 + index * 56} width="3" height="16" rx="1.5" fill={stage.color} />
          </motion.g>
        ))}
      </svg>

      <Label frame={FRAME} x={40} y={36} align="start" opacity={auditPanel} width={260} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62">
        Audit queue
      </Label>
      <Label frame={FRAME} x={432} y={28} align="start" className="text-[11px] font-semibold text-white/76 sm:text-[12px]">
        Qualified outreach
      </Label>

      {STAGES.map((stage, index) => (
        <Label
          key={stage.label}
          frame={FRAME}
          x={462}
          y={66 + index * 56}
          align="start"
          opacity={stages[index]}
          className="text-[12px] font-semibold text-white sm:text-[13px]"
        >
          {stage.label}
        </Label>
      ))}

      <Label
        frame={FRAME}
        x={26}
        y={286}
        align="start"
        opacity={count}
        className="text-[11px] text-white/62 sm:text-[12px]"
      >
        1,000+ records · evidence required to advance
      </Label>
    </>
  );
}

export default function ProspectOutreachStory() {
  return (
    <StoryCanvas
      title="Prospect field → staged outreach"
      caption="How a list of businesses becomes messages that reference something real."
      ratio={`${FRAME.w} / ${FRAME.h}`}
      scene={Scene}
      steps={[
        "A field of businesses, none of them qualified yet.",
        "Each website is reviewed and concrete findings are recorded.",
        "Businesses with a real, checkable finding light up.",
        "Outreach goes out referencing that specific finding.",
        "Follow-up is staged, and replies come back along the same path.",
      ]}
    />
  );
}
