import { motion } from "framer-motion";
import Section from "./Section";

const channels = [
  { label: "SEO", note: "Website audits, search visibility, and content structure", tone: "bg-[var(--theme-sky)] text-[#071018]" },
  { label: "Paid social", note: "TikTok creative and campaign operations", tone: "bg-[var(--theme-primary)] text-[#2a0f0b]" },
  { label: "Ecommerce", note: "Shopify merchandising, conversion, and support", tone: "bg-[var(--theme-secondary)] text-[#241804]" },
  { label: "Outreach", note: "1,000+ organized prospects and staged follow-up", tone: "bg-[var(--theme-tertiary)] text-[#092119]" },
];

export default function MarketingSpotlight() {
  return (
    <Section id="marketing" act={2} eyebrow="Marketing & growth" title="Growth work connected to the customer journey" tone="signal">
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] border border-[var(--theme-primary)]/25 bg-gradient-to-br from-[#4a211b] via-[#28191a] to-[#111014] p-7 md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--theme-primary)]/18 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-64 bg-gradient-to-tr from-[var(--theme-secondary)]/10 to-transparent blur-2xl" />
          <div className="relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--theme-primary)_65%,white)]">Acquisition + operations</p>
            <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-[2.5rem]" style={{ fontFamily: "var(--font-serif)" }}>
              Traffic, storefronts, follow-up, and support handled as one connected path.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
              Vineet's growth work spans search, paid social, ecommerce operations, creative, analytics, and customer follow-up. The portfolio shows the actual channels and operating responsibilities instead of wrapping them in a generic marketing label.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {channels.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -4, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                  className={`rounded-2xl p-4 shadow-[0_18px_40px_-32px_rgba(0,0,0,.8)] ${item.tone}`}
                >
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 opacity-68">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.article>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] border border-[var(--theme-tertiary)]/30 bg-[#dffced] p-7 text-[#092119]"
        >
          <div className="pointer-events-none absolute -bottom-14 -right-12 h-48 w-48 rounded-full border-[28px] border-[var(--theme-sky)]/30" />
          <p className="relative text-[10px] font-bold uppercase tracking-[0.24em] opacity-55">Evidence snapshot</p>
          <div className="relative mt-6 space-y-6">
            <div>
              <p className="text-4xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>1,000+</p>
              <p className="mt-1 text-xs leading-5 opacity-62">prospect records organized for website-audit and outreach work</p>
            </div>
            <div className="h-px bg-[#092119]/14" />
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>Shopify</p>
              <p className="mt-1 text-xs leading-5 opacity-62">storefront setup, merchandising, analytics, order support, and customer operations</p>
            </div>
            <div className="h-px bg-[#092119]/14" />
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>TikTok + SEO</p>
              <p className="mt-1 text-xs leading-5 opacity-62">campaign creative, search visibility, and website optimization</p>
            </div>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
}
