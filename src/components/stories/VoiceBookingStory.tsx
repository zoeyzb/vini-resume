import { motion, type MotionValue } from "framer-motion";
import StoryCanvas from "./StoryCanvas";
import { Label, type Frame } from "./DiagramLabel";
import { ROLE, useRange, useWindow } from "./timeline";

/**
 * Voice agent → booked appointment.
 *
 * A live call becomes a structured record, becomes a confirmed booking — with
 * a visible branch to a human for anything unclear or sensitive. The branch is
 * the point of the diagram: it is the part that makes the system trustworthy,
 * so it gets equal visual weight rather than being a footnote.
 *
 * Shapes live in the SVG; every label is HTML positioned over it, so text stays
 * at a readable size instead of shrinking with the card. See `DiagramLabel`.
 */

const FRAME: Frame = { w: 660, h: 268 };

const WAVE_BARS = [14, 26, 18, 34, 22, 40, 28, 46, 30, 42, 20, 36, 24, 30, 16, 22];

function Scene({ progress }: { progress: MotionValue<number> }) {
  // One playhead, sliced into windows. Each stage overlaps the next slightly so
  // the sequence flows instead of stepping.
  const live = useWindow(progress, 0.02, 0.16);
  const liveFade = useRange(progress, 0.3, 0.46, 1, 0.45);
  const link1 = useRange(progress, 0.16, 0.3, 196, 232);
  const card = useWindow(progress, 0.24, 0.38);
  const link2 = useRange(progress, 0.38, 0.52, 372, 430);
  const calendar = useWindow(progress, 0.46, 0.6);
  const check = useWindow(progress, 0.6, 0.72);
  // The branch drops from the card's left edge rather than its centre, so it
  // clears the "Details captured" label sitting directly underneath.
  const branchDown = useRange(progress, 0.72, 0.8, 150, 208);
  const branchAcross = useRange(progress, 0.8, 0.88, 244, 430);
  const person = useWindow(progress, 0.86, 0.97);

  const cardShift = useRange(progress, 0.24, 0.38, 10, 0);
  const calendarShift = useRange(progress, 0.46, 0.6, 10, 0);
  const checkScale = useRange(progress, 0.6, 0.72, 0.4, 1);
  const consolePanel = useWindow(progress, 0.08, 0.22);

  return (
    <>
      <svg
        viewBox={`0 0 ${FRAME.w} ${FRAME.h}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        role="img"
        aria-label="A live call is captured as a structured record, which either books an appointment or escalates to a person."
      >
        <motion.rect x="18" y="28" width="624" height="220" rx="14" fill="rgba(255,255,255,.022)" stroke="rgba(255,255,255,.11)" style={{ opacity: consolePanel }} />
        <motion.rect x="32" y="42" width="596" height="26" rx="7" fill="rgba(255,255,255,.035)" style={{ opacity: consolePanel }} />
        <motion.circle cx="47" cy="55" r="4" fill={ROLE.success} style={{ opacity: consolePanel }} />
        {/* --- Live call ------------------------------------------------- */}
        <motion.g style={{ opacity: liveFade }}>
          {WAVE_BARS.map((height, index) => (
            <motion.rect
              key={index}
              x={34 + index * 10}
              y={104 - height / 2}
              width="4"
              height={height}
              rx="2"
              fill={ROLE.incoming}
              style={{ opacity: live, transformOrigin: `${36 + index * 10}px 104px` }}
              animate={{ scaleY: [1, 0.42, 1] }}
              transition={{
                duration: 0.6 + (index % 4) * 0.14,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.045,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>

        {/* --- Call to record -------------------------------------------- */}
        <motion.line
          x1="196"
          y1="104"
          x2={link1}
          y2="104"
          stroke={ROLE.incoming}
          strokeWidth="1.6"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* --- Details captured ------------------------------------------ */}
        <motion.g style={{ opacity: card, y: cardShift }}>
          <rect x="240" y="66" width="128" height="76" rx="12" fill="rgba(255,255,255,.04)" stroke={ROLE.incoming} strokeWidth="1.4" />
          <rect x="260" y="88" width="88" height="7" rx="3.5" fill="rgba(255,255,255,.42)" />
          <rect x="260" y="104" width="72" height="7" rx="3.5" fill="rgba(255,255,255,.28)" />
          <rect x="260" y="120" width="54" height="7" rx="3.5" fill="rgba(255,255,255,.2)" />
        </motion.g>

        {/* --- Record to booking ----------------------------------------- */}
        <motion.line
          x1="372"
          y1="104"
          x2={link2}
          y2="104"
          stroke={ROLE.action}
          strokeWidth="1.6"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* --- Appointment booked ---------------------------------------- */}
        <motion.g style={{ opacity: calendar, y: calendarShift }}>
          <rect
            x="438"
            y="66"
            width="150"
            height="76"
            rx="10"
            fill="color-mix(in srgb, var(--theme-primary) 8%, transparent)"
            stroke={ROLE.action}
            strokeWidth="1.4"
          />
          {[0, 1, 2, 3].map((column) =>
            [0, 1].map((row) => {
              const booked = column === 1 && row === 1;
              return (
                <rect
                  key={`${column}-${row}`}
                  x={456 + column * 31}
                  y={86 + row * 30}
                  width="22"
                  height="20"
                  rx="4"
                  fill={booked ? ROLE.action : "rgba(255,255,255,.13)"}
                />
              );
            }),
          )}
        </motion.g>

        {/* Confirmation badge, popped on a spring after the booking lands. */}
        <motion.g style={{ opacity: check, scale: checkScale, transformOrigin: "588px 66px" }}>
          <circle cx="588" cy="66" r="15" fill={ROLE.success} />
          <path d="M581 66l5 5 10-11" stroke="#08130f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* --- Escalation branch ------------------------------------------ */}
        <motion.line
          x1="244"
          y1="150"
          x2="244"
          y2={branchDown}
          stroke={ROLE.human}
          strokeWidth="1.6"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <motion.line
          x1="244"
          y1="208"
          x2={branchAcross}
          y2="208"
          stroke={ROLE.human}
          strokeWidth="1.6"
          strokeDasharray="5 5"
          strokeLinecap="round"
          opacity="0.8"
        />

        <motion.rect
          x="438"
          y="186"
          width="150"
          height="44"
          rx="22"
          fill="color-mix(in srgb, var(--theme-secondary) 10%, transparent)"
          stroke={ROLE.human}
          strokeWidth="1.4"
          style={{ opacity: person }}
        />
      </svg>

      <Label frame={FRAME} x={112} y={152} opacity={live} className="text-[11px] text-white/72 sm:text-[12px]">
        Live call
      </Label>
      <Label frame={FRAME} x={62} y={55} align="start" opacity={consolePanel} width={210} className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/62 sm:text-[10px]">
        Operator console · session active
      </Label>
      <Label frame={FRAME} x={304} y={166} opacity={card} width={150} className="text-[11px] text-white/72 sm:text-[12px]">
        Intent + caller record
      </Label>
      <Label frame={FRAME} x={513} y={166} opacity={calendar} width={170} className="text-[11px] text-white/72 sm:text-[12px]">
        Appointment booked
      </Label>
      <Label frame={FRAME} x={513} y={208} opacity={person} className="text-[12px] font-semibold text-white sm:text-[13px]">
        To a person
      </Label>
      <Label
        frame={FRAME}
        x={244}
        y={244}
        align="start"
        opacity={person}
        width={200}
        className="text-[10px] text-white/62 sm:text-[11px]"
      >
        Unclear or sensitive → escalate
      </Label>
    </>
  );
}

export default function VoiceBookingStory() {
  return (
    <StoryCanvas
      title="Voice agent → booked appointment"
      caption="How a live call becomes a confirmed appointment, and where a person takes over."
      ratio={`${FRAME.w} / ${FRAME.h}`}
      scene={Scene}
      steps={[
        "A caller rings in and the agent answers.",
        "Speech becomes a structured record: who called, what they need.",
        "The agent checks the calendar and offers a real slot.",
        "The appointment is confirmed and a follow-up text goes out.",
        "Anything unusual breaks off to a person instead of guessing.",
      ]}
    />
  );
}
