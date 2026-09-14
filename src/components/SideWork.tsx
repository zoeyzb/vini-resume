import { motion } from "framer-motion";

const activities = [
  {
    number: "01",
    title: "Scholarship guidance",
    org: "Umeed Foundation",
    description: "Helped students navigate scholarship searches, university applications, academic planning, and international education opportunities.",
    className: "bg-[var(--theme-secondary)] text-[#241804] md:col-span-2",
    accent: "bg-[#241804]",
    tilt: -1.2,
  },
  {
    number: "02",
    title: "Accessible art instruction",
    org: "Children with disabilities",
    description: "Taught drawing and creative expression while adapting activities for different learning needs.",
    className: "bg-[var(--theme-primary)] text-[#2a0f0b]",
    accent: "bg-[#2a0f0b]",
    tilt: 1.1,
  },
  {
    number: "03",
    title: "Tutoring & academic mentoring",
    org: "School-age students",
    description: "Supported core subjects, homework, study habits, organization, and confidence through individualized explanations.",
    className: "bg-[var(--theme-sky)] text-[#071018]",
    accent: "bg-[#071018]",
    tilt: -0.8,
  },
  {
    number: "04",
    title: "STEM access & student leadership",
    org: "STELLAR Pakistan",
    description: "Helped make STEM pathways and educational opportunities easier for students to understand, while encouraging participation, peer leadership, and confidence in collaborative learning.",
    className: "bg-[var(--theme-tertiary)] text-[#092119] md:col-span-2",
    accent: "bg-[#092119]",
    tilt: 0.9,
  },
  {
    number: "05",
    title: "Community service",
    org: "Service Club · Gardening Club · GSA",
    description: "Contributed to neighborhood cleanups, school gardening, and a more inclusive student environment.",
    className: "bg-[var(--theme-sky)] text-[#1b112c]",
    accent: "bg-[#1b112c]",
    tilt: -1,
  },
  {
    number: "06",
    title: "Independent studies",
    org: "Finnova · Logistics & perishables",
    description: "Explored financial inclusion, vendor finance, delivery risk, capacity, deadlines, and revenue exposure through clearly labeled case work.",
    className: "bg-[#fff6df] text-[#20170e]",
    accent: "bg-[#20170e]",
    tilt: 0.7,
  },
];

function Doodle({ index }: { index: number }) {
  const variants = [
    <path key="a" d="M9 30c9-18 18 18 28 0s18 16 26-3" />,
    <path key="b" d="m9 29 12-17 12 13 12-9 16 18" />,
    <path key="c" d="M12 13h42v28H12zM22 22h22M22 30h14" />,
    <path key="d" d="M12 36c8-20 18-20 26 0 7-17 14-17 22 0" />,
  ];
  return (
    <svg viewBox="0 0 72 52" className="h-9 w-12 opacity-45 md:h-12 md:w-16 md:opacity-55" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {variants[index % variants.length]}
      </g>
    </svg>
  );
}

function RecognitionMark() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none" aria-hidden="true">
      <path d="M20 18h40v39H20z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M28 30c6-4 11-4 16 0v17c-5-4-10-4-16 0V30Zm24 0c-6-4-11-4-16 0v17c5-4 10-4 16 0V30Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M31 62 40 68l9-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4" fill="currentColor" opacity=".55" />
      <circle cx="62" cy="18" r="4" fill="currentColor" opacity=".55" />
    </svg>
  );
}

export default function SideWork() {
  return (
    <section id="range" className="relative my-10 scroll-mt-24 overflow-hidden border-y border-white/8 bg-[#141017]/92 text-white backdrop-blur-sm md:my-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full bg-[var(--theme-primary)]/35 blur-[90px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[var(--theme-sky)]/30 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/62">Beyond the product screens</p>
            <h2 className="mt-4 max-w-3xl text-[2.2rem] font-semibold leading-[1.02] sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
              Side activities are part of the story, not footer material.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/72 lg:justify-self-end">
            Vineet&apos;s work also includes mentoring, tutoring, art instruction, education access, STEM outreach, and community service. These experiences show how Vineet communicates, adapts, and follows through with people—not just products.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#0d0a11] p-6 text-white shadow-[0_30px_80px_-45px_rgba(0,0,0,.8)] md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,color-mix(in_srgb,var(--theme-secondary)_25%,transparent),transparent_25%),radial-gradient(circle_at_65%_92%,color-mix(in_srgb,var(--theme-sky)_15%,transparent),transparent_32%)]" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--theme-secondary)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#241804]">Recognition</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">Go Pakistan Summit</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[color-mix(in_srgb,var(--theme-secondary)_65%,white)]">Government of Pakistan</p>
              <h3 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
                Community impact recognition for education and women&apos;s-rights awareness
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62">
                Recognized at the Go Pakistan Summit for work focused on helping children access education and supporting awareness around women&apos;s education, legal rights, and available resources.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Children's education", "Women's-rights awareness", "Community support"].map((item) => (
                  <span key={item} className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold text-white/62">{item}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-[1.5rem] border border-[var(--theme-secondary)]/24 bg-[var(--theme-secondary)]/7 p-5 lg:justify-self-end">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-[var(--theme-secondary)] text-[#241804]">
                <RecognitionMark />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--theme-secondary)]">Focus</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-white">Education access<br />Community advocacy<br />Student support</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {activities.map((activity, index) => (
            <motion.article
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: index * 0.05 }}
              whileHover={{ y: -7, rotate: activity.tilt }}
              className={`group relative min-h-[11.5rem] overflow-hidden rounded-[1.25rem] border border-black/10 p-5 shadow-[0_20px_55px_-42px_rgba(0,0,0,.75)] md:min-h-64 md:rounded-[1.7rem] md:p-6 ${activity.className}`}
            >
              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-current/15" />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-current/10" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] font-bold tracking-[0.22em] opacity-45">{activity.number}</span>
                  <Doodle index={index} />
                </div>
                <div className="mt-auto pt-3 md:pt-8">
                  <span className={`mb-3 block h-1 w-8 rounded-full md:mb-4 md:w-9 ${activity.accent}`} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-55">{activity.org}</p>
                  <h3 className="mt-1.5 text-xl font-semibold leading-tight md:mt-2 md:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>{activity.title}</h3>
                  <p className="mt-2 text-[13px] leading-5 opacity-70 md:mt-3 md:text-sm md:leading-6">{activity.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
