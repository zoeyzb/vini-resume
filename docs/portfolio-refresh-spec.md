# Portfolio refresh specification

## Objective

Present Sierra's automation, growth, and customer-operations work with concise copy, distinct project visuals, reliable contact actions, and a shorter recruiter path while preserving the cinematic WebGL and scroll-motion system.

## Commands

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Dev: `npm run dev`

## Boundaries

- Preserve the particle background, scroll depth, chapter transitions, reveal motion, hover motion, and replayable project timelines.
- Preserve factual project status, contact information, resume, and external product URLs.
- Do not add fabricated metrics, integrations, or outcomes.
- Do not make unrelated dependency or infrastructure changes.

## Acceptance criteria

- No visitor-facing explanation of missing project links or project/link counts.
- No defensive copy about proving work, private evidence, or presentation-only demos.
- Marketing and side-work duplication removed from the primary page flow.
- Recruiter pet removed.
- Project timelines complete in approximately three seconds and retain reduced-motion support.
- Primary email action works through Gmail; copy and mailto remain available.
- Social image path resolves.
- Build, lint, tests, desktop, and mobile checks pass.
