# Etienne Byiringiro · EU AI Act funnel

The site behind [ishi-eu-ai-act.vercel.app](https://ishi-eu-ai-act.vercel.app) — an
interactive funnel positioning Etienne Byiringiro as a go-to specialist for
**EU AI Act readiness and AI governance**.

## Pages

- **`index.html` — the funnel.** A tap-through, one-idea-per-screen journey:
  hook → 10-second explainer → live countdown → *"Which one is you?"* →
  a personalized quiz path (4 questions, an insight after every answer) →
  a personal risk snapshot → the offer (free 20-min call, hero) with optional
  email capture for a personally-written report.
  Five persona paths: **HR & People · Software house/agency · Startup/AI builder ·
  Public sector & health · Just curious.**
- **`overview.html`** — the classic one-page version, linked from the funnel for
  readers who prefer everything on one screen.

## Configuration (top of the `<script>` in `index.html`)

| Constant | Purpose |
|---|---|
| `PH_KEY` | PostHog project key (`phc_…`). Empty = analytics off, events log to console. |
| `PH_HOST` | PostHog region host (EU by default). |
| `CAL_LINK` | Cal.com booking slug for the free review. |
| `EMAIL` | Public contact email. |
| `DEADLINE` | 2 Aug 2026 — drives the live countdown everywhere. |

## Analytics (PostHog)

Every step fires events, so the whole journey is measurable as a funnel:

`funnel_start → step_viewed → persona_selected → answer_given → result_viewed →
cta_viewed → book_clicked / lead_captured`

Also: `snapshot_copied`, `email_clicked`, `overview_clicked`, `restart`, `resumed`.
Each event carries `persona`, and results carry `verdict` (red/amber/green),
`score`, and `duration_s`.

**Suggested PostHog funnel:** `persona_selected → result_viewed → book_clicked`,
broken down by `persona` — shows which audience converts and where people drop.

**Leads:** `lead_captured` events carry the visitor's email (also identified as a
person profile). Check these daily and send the promised report within 24h.
Until `PH_KEY` is set, the email-capture button falls back to opening a pre-filled
email to Etienne so no lead is lost.

## Tech

Single self-contained files — no build step, fonts via Google Fonts. Vanilla JS
state machine, browser back/forward support, localStorage resume
("welcome back" bar), keyboard navigation (Enter / 1-5), `prefers-reduced-motion`
respected, `<noscript>` fallback to the overview page.

## Run / deploy

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Static — deploys as-is on Vercel (production branch: `main`).

## Contact

etienne.ishi@gmail.com · [LinkedIn](https://www.linkedin.com/in/ishimwe-byiringiro-etienne/) · Warsaw, Poland
