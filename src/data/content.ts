export const profile = {
  name: "Vineet Singh",
  location: "Galesburg, Illinois",
  email: "vineet.singh14204@gmail.com",
  role: "AI Automation & Product Operations",
  roleSecondary:
    "Customer-facing workflows, internal tools, and revenue operations.",
  summary: "I build AI workflows and digital products for customer acquisition, service, and follow-up.",
};

export const links = {
  email: "vineet.singh14204@gmail.com",
  linkedin: "https://linkedin.com/in/vsingh14204",
  github: "https://github.com/VineetSingh142004",
};

/**
 * The résumé PDF in /public.
 *
 * It has shipped with every build but was linked from nowhere on the site,
 * which meant a recruiter on a resume portfolio had no way to download the
 * resume. Referenced here so the nav, hero and contact block all point at one
 * definition.
 */
export const RESUME_HREF = "https://linkedin.com/in/vsingh14204";

/**
 * Keep every email entry point on the standard mailto protocol. This works
 * with a visitor's configured mail app and does not depend on Gmail being
 * signed in or available in the current browser.
 */
export const CONTACT_EMAIL_HREF = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

export const externalLinks = [
  { label: "NextRole", href: "https://next-role-web-nine.vercel.app/" },
  { label: "Recover", href: "https://recoverrevenue.company/" },
].filter((l) => l.href);

export const stats = [
  { value: "4", label: "Production & client projects" },
  { value: "1,000+", label: "Prospect records organized" },
  { value: "6", label: "Client & independent engagements" },
];

export const education = [
  {
    school: "Knox College, Galesburg, IL",
    detail: "B.S. Computer Science · B.A. Business (Accounting & Finance)",
    period: "Graduating Winter 2026",
  },
];

export const experience = [
  {
    role: "Bank Teller", org: "F&M Bank", period: "Sep 2023 – Sep 2024",
    tags: ["Highlighted", "Financial operations", "Compliance"],
    flow: ["Transaction received", "Identity verified", "Transaction processed", "Compliance checked"],
    points: [
      "Processed $3–4M+ in financial transactions with zero compliance errors",
      "Identified cross-selling opportunities while maintaining high accuracy and risk awareness",
    ],
  },
  {
    role: "AI Product & Automation Assistant", org: "Verbal.AI / Suissio Holdings", period: "",
    tags: ["AI agents", "Lead engagement", "APIs", "CRM"],
    flow: ["Prospect research", "Message generated", "CRM updated", "Follow-up scheduled"],
    points: [
      "Developed AI-powered outbound messaging and lead-engagement systems for prospect research, personalized communication, follow-up, and CRM activity.",
      "Built product workflows combining AI, backend logic, APIs, databases, and user-facing interfaces.",
      "Translated business requirements into structured workflows with defined inputs, actions, approvals, and outcomes.",
      "Improved reliability through error handling, logging, retry logic, validation, and user-visible failure states.",
    ],
  },
  {
    role: "AI Automation & Customer Operations Assistant", org: "Your Glow", period: "6-month engagement",
    tags: ["Voice AI", "AI + UGC content", "Booking", "Re-engagement"],
    flow: ["Waveform", "Transcript", "Service selected", "Appointment booked", "Follow-up text"],
    points: [
      "Built and managed an AI phone workflow that answered real customer calls, explained services, booked appointments, and sent follow-up texts.",
      "Monitored live conversations, corrected failures, refined prompts and routing, and escalated cases needing a human.",
      "Created automated email, appointment-reminder, auto-reply, and re-engagement workflows.",
      "Produced AI-assisted UGC posts, promotional content, and customer-facing messages that fed the same funnel the AI booked from.",
    ],
  },
  {
    role: "AI Automation & Workflow Assistant", org: "Clearwork", period: "",
    tags: ["Calling agents", "Prompt design", "Routing"],
    flow: ["Lead captured", "Qualified", "Routed to sales/support/human"],
    points: [
      "Built calling-agent and automated-email workflows for a company developing AI agents and business automation products.",
      "Designed lead-capture, message-generation, follow-up, routing, and escalation logic across customer and sales workflows.",
      "Tested agent behavior, refined prompts and handoffs, and documented failures before deployment.",
    ],
  },
  {
    role: "Ecommerce Store Manager & Growth Operations", org: "ForYouHub", period: "Completed June 2026",
    tags: ["Shopify", "TikTok ads", "UGC creative", "Analytics"],
    flow: ["Product added", "UGC approved", "Campaign launched", "Order appears", "Analytics update"],
    points: [
      "Built and ran a U.S. Shopify store end-to-end for a client selling comfort and wellness products.",
      "Ran TikTok advertising and produced UGC-style creative; tracked performance in Shopify analytics, Google Analytics, and Search Console.",
      "Owned storefront setup, listings, collections, pricing, descriptions, and order support.",
      "Supported real customers and real orders through the end of the engagement.",
    ],
  },
  {
    role: "Website Developer & Digital Experience Manager", org: "Marlin Hotel", period: "2025",
    tags: ["Web build", "AI-assisted", "Booking flows"],
    flow: ["Room page", "Amenities", "Dates", "Booking form", "Map"],
    points: [
      "Built and managed multiple versions of the hotel website — an original ground-up build plus AI-assisted iterations.",
      "Created room/amenity sections, booking and contact forms, map integration, and an interactive walkthrough.",
    ],
  },
  {
    role: "Customer Service Representative", org: "Hassnain Services", period: "",
    tags: ["Inbound support", "Triage", "Routing"],
    flow: ["Incoming request", "Service type", "Urgency", "Location", "Technician routing"],
    points: [
      "Handled inbound plumbing, HVAC, and home-service inquiries.",
      "Collected service details, documented requests, and routed urgent or specialized cases.",
    ],
  },
];

export const projects = [
  {
    name: "NextRole", tagline: "AI-Powered Job Search & Resume Platform", status: "In development",
    url: "https://next-role-web-nine.vercel.app/", repo: "", slug: "nextrole",
    stack: ["Next.js", "TypeScript", "Python", "Supabase", "AI APIs"],
    summary: "A job-search workspace: discovery, resume management, job-specific tailoring, cover letters, and application tracking.",
    owned: "Owned product structure, frontend workflows, the resume data model, and integration planning across Vercel, Railway, and Supabase.",
    points: [
      "Structured resume editor with templates, section reordering, version history, live preview, and PDF output.",
      "Approved-facts workflow: AI content can't be finalized until the user approves the underlying resume facts.",
      "Job-specific tailoring, keyword matching, ATS analysis, and missing-skill identification.",
      "Multi-user auth and per-user data separation via Supabase and PostgreSQL.",
    ],
  },
  {
    name: "Recover Operator OS", tagline: "Revenue Operations for Service Businesses", status: "Live operator workspace",
    url: "https://recoverrevenue.company/", repo: "", slug: "recoverhvac",
    stack: ["Next.js", "Python", "Supabase", "AI agents"],
    summary: "A private operator workspace for requests, acquisition, follow-up, provider readiness, customers, and revenue operations.",
    owned: "Designed the operating model, command workspace, approval boundaries, system-status views, and the connected service workflows.",
    points: [
      "Workflows structured as connected stages with approvals, retries, logs, and visible execution status.",
      "Unified customer timelines, missed-call recovery, estimate follow-up, and review requests.",
      "Human-confirmation gates before sensitive external actions; monitoring and audit trails planned.",
    ],
  },
  {
    name: "Lead Intelligence & Outreach System", tagline: "Independent Automation Project", status: "Independent project", url: null, repo: "", visual: "leadintel",
    stack: ["Automation", "Web scraping", "Outreach"],
    summary: "Automated website audits and staged outreach across 1,000+ organized prospect records.",
    owned: "Built the data collection, evidence-based audit logic, and the personalized outreach + follow-up sequencing.",
    points: [
      "Collected business names, emails, phone numbers, websites, and website-audit signals.",
      "Ran evidence-based audits, personalized outreach, and staged follow-up with pipeline tracking.",
      "Organized 1,000+ prospect records for website, marketing, and digital-service outreach.",
    ],
  },
  {
    name: "AI Import/Export Voice Operations Agent", tagline: "Gardezi Farms · used with real callers", status: "Used with real callers", url: null, repo: "", visual: "callagent",
    stack: ["Voice agent", "Calling workflows", "Conversation design", "Information capture", "Escalation", "Human approval", "Operations"],
    summary: "Voice agent for importer and exporter inquiries, information capture, follow-up, escalation, and owner approval queues.",
    owned: "Designed real-caller handling, information capture, escalation, and nightly approval lists for owner review.",
    points: [
      "Handled real-caller inquiries with structured capture and multi-step operational follow-up.",
      "Built approval queues and nightly task lists so the owner could review, approve, or reject pending work.",
    ],
  },
  {
    name: "ForYouHub Commerce & Growth Operations", tagline: "Client ecommerce engagement", status: "Completed June 2026", url: null, repo: "", visual: "foryouhub",
    stack: ["Shopify", "UGC", "TikTok Ads", "SEO", "Google Analytics", "Search Console", "Customer Operations"],
    summary: "Built and operated a U.S. Shopify store for comfort and wellness products, including storefront setup, UGC creative, TikTok advertising, SEO, analytics, and customer operations.",
    owned: "Owned storefront setup, listings, collections, and pricing; produced UGC-style creative and ran TikTok advertising; supported real customers and order operations through the end of the engagement.",
    points: [
      "Set up and ran a U.S. Shopify storefront end-to-end for a client selling comfort and wellness products.",
      "Produced UGC-style creative and ran TikTok advertising, tracked in Shopify analytics, Google Analytics, and Search Console.",
      "Owned order support and customer operations for the length of the engagement.",
    ],
  },
];

export const skills = {
  "AI & Automation": ["n8n", "AI agents", "Voice agents", "Calling workflows", "OpenAI APIs", "Prompt and conversation design", "Lead qualification", "Human-in-the-loop approval", "Email automation", "SMS automation", "Appointment booking", "Follow-up and re-engagement", "CRM routing", "Failure handling", "Retry logic", "Escalation workflows"],
  "Product & Engineering": ["Next.js", "React", "TypeScript", "Python", "Supabase", "PostgreSQL", "REST APIs", "Authentication", "Per-user data separation", "Background jobs", "Queues", "Vercel", "Railway", "GitHub", "Product testing", "Debugging", "Responsive frontend development", "Form and workflow design"],
  "Ecommerce & Growth": ["Shopify", "TikTok Ads Manager", "UGC creative", "Product listings", "Collections and pricing", "Store operations", "Google Analytics", "Google Search Console", "SEO audits", "Website optimization", "Lead generation", "Personalized outreach", "Customer support", "Order operations"],
};

export const leadership = [
  { role: "Volunteer Mentor, Scholarship Advisor & Art Instructor", org: "Umeed Foundation — India & Pakistan communities", points: ["Guided students through scholarship searches, university applications, and academic planning.", "Taught drawing and creative expression to children with disabilities, adapting for different learning needs.", "Supported women's-rights awareness around education, legal rights, and available resources."] },
  { role: "Tutor & Academic Mentor", org: "", points: ["Tutored school-age students in core subjects, study habits, and organization.", "Provided individualized explanations and confidence-building support."] },
  { role: "STEM Awareness & Student Leadership", org: "STELLAR Pakistan", points: ["Supported STEM-awareness, educational-access, and student-leadership activities."] },
];

export const communityChips = ["Umeed Foundation", "Scholarship Advising", "Art Instruction", "Women's-Rights Awareness", "STEM Outreach", "Tutoring"];
export const conceptChips = ["Finnova — financial-product UX study", "Cold-chain logistics — operations case study"];

export type CaseStudy = {
  name: string; tagline: string; status: string; url: string | null; image: "nextrole" | "recoverhvac";
  overview: string; problem: string; flow: string[]; build: string[]; role: string[]; statusNote: string; stack: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  nextrole: {
    name: "NextRole", tagline: "AI-Powered Job Search & Resume Platform", status: "In development", url: "https://next-role-web-nine.vercel.app/", image: "nextrole",
    overview: "A full-stack workspace that connects job discovery, approved resume facts, tailoring, and application tracking.",
    problem: "Job seekers manage discovery, résumé versions, per-job tailoring, cover letters, and application status across disconnected tools. NextRole brings those steps into one controlled workflow.",
    flow: ["Job found", "Facts approved", "Résumé tailored", "ATS checked", "Application tracked"],
    build: ["Structured résumé editor: summaries, experience, education, projects, and skills with section reordering, templates, version history, live preview, and PDF export.", "An approved-facts workflow — AI-generated content cannot be finalized until the user provides or approves the underlying résumé facts, so nothing fabricated ships.", "Job-specific tailoring with keyword matching, ATS analysis, missing-skill identification, comparison views, and concrete improvement suggestions.", "Scheduled job searches backed by queued tasks, retries, cancellation, idempotency, and quotas so background work is durable, not fire-and-forget."],
    role: ["Owned the product structure and the frontend workflows end to end.", "Designed the résumé data model and the approved-facts guardrail that keeps AI output honest.", "Separated frontend, API, database, and background-worker responsibilities across Vercel, Railway, and Supabase.", "Built multi-user auth and per-user data separation, plus privacy controls: data export, account deletion, and password reset."],
    statusNote: "Live and in active development. The editor, tailoring, authentication, and tracking foundations are in place while integrations continue to expand.",
    stack: ["Next.js", "TypeScript", "Python", "Supabase", "PostgreSQL", "AI APIs", "Railway", "Vercel"],
  },
  recoverhvac: {
    name: "Recover Operator OS", tagline: "Revenue Operations for Service Businesses", status: "Live operator workspace", url: "https://recoverrevenue.company/", image: "recoverhvac",
    overview: "A private operator workspace for managing incoming requests, follow-up, provider readiness, customer activity, and service operations.",
    problem: "Service requests, follow-up, provider health, and customer operations often live in separate tools. Recover brings them into one private command center with visible status and controlled handoffs.",
    flow: ["Lead found", "Evidence audit", "Outreach drafted", "Human approval", "Sent", "Revenue tracked"],
    build: ["A multi-stage pipeline for lead discovery, evidence-backed audits, personalized outreach, follow-up, appointment workflows, and revenue tracking.", "Workflows modeled as connected stages with approvals, retries, logs, and visible execution status — you can see exactly where each customer is.", "Unified customer timelines with missed-call recovery, estimate follow-up, and review requests.", "Human-confirmation gates before any sensitive external action, with monitoring, quotas, and audit trails designed into the model."],
    role: ["Designed the workflow model and the stage-approval system.", "Built and shipped the frontend and the execution-status views.", "Specified safe integration patterns for AI communication, calling, CRM updates, email, and calendar scheduling.", "Backend automations are still being wired in — the label reflects that honestly rather than claiming a finished production system."],
    statusNote: "The private operator workspace is live. Provider connections and operational health remain visible in the system-status view.",
    stack: ["Next.js", "Python", "APIs", "Supabase", "Workflow automation", "AI agents"],
  },
};
