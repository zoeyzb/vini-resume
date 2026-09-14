import { motion } from "framer-motion";
import VoiceBookingStory from "./stories/VoiceBookingStory";

const ease = [0.22, 1, 0.36, 1] as const;

function LeadIntelligenceVisual() {
  const rows = [
    ["Record 0184", "Conversion gap", "High", "Draft ready"],
    ["Record 0421", "Broken booking path", "High", "Review"],
    ["Record 0736", "Search visibility", "Medium", "Enriching"],
  ];

  return (
    <section aria-label="Animated lead intelligence workspace" className="surface overflow-hidden rounded-[1.6rem] bg-[#090b0d]/95">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">Lead intelligence / control room</p><p className="mt-1 text-sm font-semibold text-white/90">Prospect signal operations</p></div>
        <span className="rounded-full border border-[#78d8e8]/25 bg-[#78d8e8]/8 px-3 py-1 text-[10px] font-semibold text-[#8fe8f4]">1,000+ records</span>
      </div>

      <div className="min-h-[390px] p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[["PIPELINE", "Active"], ["SIGNAL ENGINE", "Scanning"], ["OUTREACH", "Staged"]].map(([label, value], index) => (
            <motion.div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] p-3" initial={{ opacity: 0.35, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: index * 0.12, duration: 0.45, ease }}>
              <p className="text-[8px] font-semibold tracking-[0.14em] text-white/36">{label}</p>
              <div className="mt-2 flex items-center gap-2"><motion.span className="h-1.5 w-1.5 rounded-full bg-[#78d8e8]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, delay: index * 0.25, repeat: Infinity }} /><span className="text-[11px] font-semibold text-white/82">{value}</span></div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_0.72fr]">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.018]">
            <div className="grid grid-cols-[0.8fr_1.15fr_0.55fr_0.75fr] gap-2 border-b border-white/8 px-3 py-2.5 text-[8px] font-semibold uppercase tracking-[0.13em] text-white/32"><span>Prospect</span><span>Signal</span><span>Score</span><span>Next action</span></div>
            {rows.map((row, rowIndex) => (
              <motion.div key={row[0]} className="relative grid grid-cols-[0.8fr_1.15fr_0.55fr_0.75fr] items-center gap-2 overflow-hidden border-b border-white/[0.065] px-3 py-3.5 last:border-0" initial={{ opacity: 0.28, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ delay: 0.18 + rowIndex * 0.17, duration: 0.5, ease }}>
                <motion.span aria-hidden="true" className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#78d8e8]/10 to-transparent" animate={{ x: ["-120%", "720%"] }} transition={{ duration: 3.2, delay: rowIndex * 0.4, repeat: Infinity, repeatDelay: 2.4, ease: "linear" }} />
                <span className="font-mono text-[9px] text-white/46">{row[0]}</span><span className="text-[9px] leading-4 text-white/76">{row[1]}</span><span className={`text-[9px] font-semibold ${row[2] === "High" ? "text-[#8fe8f4]" : "text-[#ffd166]"}`}>{row[2]}</span><span className="rounded-md border border-white/10 bg-white/[0.035] px-2 py-1 text-[8px] font-semibold text-white/64">{row[3]}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col rounded-xl border border-white/10 bg-[#111519] p-4">
            <div className="flex items-center justify-between"><p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/36">Signal volume</p><span className="text-[8px] text-[#8fe8f4]">LIVE</span></div>
            <div className="mt-5 flex h-24 items-end gap-1.5 border-b border-white/8 pb-2">
              {[28, 54, 38, 71, 48, 86, 62, 94].map((height, index) => <motion.span key={index} className="flex-1 rounded-sm bg-[#78d8e8]" initial={{ height: 6, opacity: 0.2 }} whileInView={{ height, opacity: 0.28 + index * 0.07 }} viewport={{ once: false }} transition={{ delay: index * 0.07, duration: 0.65, ease }} />)}
            </div>
            <div className="mt-auto space-y-2 pt-4 text-[9px] text-white/48">{["Signals enriched", "Quality scored", "Drafts staged"].map((item, index) => <motion.div key={item} className="flex items-center justify-between" initial={{ opacity: 0.25 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.45 + index * 0.15 }}><span>{item}</span><span className="font-mono text-[#8fe8f4]">0{index + 1}</span></motion.div>)}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.018] px-4 py-3 text-[9px] text-white/42"><motion.span className="h-1.5 w-1.5 rounded-full bg-[#78d8e8]" animate={{ scale: [0.7, 1.35, 0.7] }} transition={{ duration: 1.8, repeat: Infinity }} /><span>Discovery → enrichment → scoring → personalized draft → review queue</span><span className="ml-auto font-mono text-white/28">SYNC 04:12</span>
        </div>
      </div>
    </section>
  );
}

function CommerceOperationsVisual() {
  const channels = [
    ["01", "Storefront", "Listings · pricing · merchandising"],
    ["02", "Creative", "UGC · product stories · campaign assets"],
    ["03", "Discovery", "SEO · search · paid social"],
    ["04", "Orders", "Customer support · fulfilment signals"],
  ];

  return (
    <section aria-label="Animated commerce and growth operations flow" className="surface overflow-hidden rounded-[1.6rem] bg-[#0a0b0c]/95">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">Commerce operations</p>
          <p className="mt-1 text-sm font-semibold text-white/90">From product page to next decision</p>
        </div>
        <motion.span className="h-2 w-2 rounded-full bg-[#ff8f70]" animate={{ scale: [0.75, 1.25, 0.75], opacity: [0.45, 1, 0.45] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>

      <div className="grid min-h-[380px] gap-5 p-5 sm:grid-cols-[1.15fr_0.85fr] sm:p-6">
        <div className="relative space-y-2.5">
          <div className="absolute bottom-5 left-[1.15rem] top-5 w-px bg-white/10" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[0.92rem] z-10 h-2 w-2 rounded-full bg-[#ff8f70] shadow-[0_0_16px_rgba(255,143,112,.7)]"
            animate={{ top: [20, 250, 20] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {channels.map(([number, title, detail], index) => (
            <motion.div
              key={title}
              className="relative grid grid-cols-[2.3rem_1fr] gap-3 rounded-xl border border-white/9 bg-white/[0.025] px-3 py-3.5"
              initial={{ opacity: 0.42, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ delay: index * 0.15, duration: 0.5, ease }}
            >
              <span className="relative z-20 grid h-6 w-6 place-items-center rounded-full bg-[#0a0b0c] font-mono text-[9px] text-[#ff9d84]">{number}</span>
              <div><p className="text-xs font-semibold text-white/88">{title}</p><p className="mt-1 text-[10px] leading-4 text-white/46">{detail}</p></div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10 bg-[#efeae0] p-5 text-[#171718]">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/42">Performance review</p>
          <div className="mt-5 flex h-28 items-end gap-2 border-b border-black/10 pb-2">
            {[42, 66, 50, 82, 61, 92, 73].map((height, index) => (
              <motion.span
                key={index}
                className="flex-1 rounded-sm bg-[#191a1b]"
                initial={{ height: 8, opacity: 0.25 }}
                whileInView={{ height, opacity: index > 4 ? 0.95 : 0.58 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.7, ease }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-black/48">
            <span>Shopify</span><span>Analytics</span><span>Search</span><span>Campaigns</span>
          </div>
          <p className="mt-auto border-t border-black/10 pt-4 text-sm font-semibold leading-5">Traffic and order signals shape the next listing, creative, and campaign decision.</p>
        </div>
      </div>
    </section>
  );
}

export default function ProjectVisual({ variant }: { variant: string }) {
  if (variant === "callagent") return <VoiceBookingStory />;
  if (variant === "leadintel") return <LeadIntelligenceVisual />;
  if (variant === "foryouhub") return <CommerceOperationsVisual />;
  return null;
}
