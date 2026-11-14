# Ishimwe Etienne · EU AI Act

Consulting site for **EU AI Act compliance**, live at
[ishi-eu-ai-act.vercel.app](https://ishi-eu-ai-act.vercel.app). Plain English,
no legal jargon. Two services: **AI literacy training** and a **compliance audit**.

## Pages

| File | Role |
|---|---|
| `index.html` | **Homepage** (static, crawlable). The "Do you like reading the EU AI Act?" hero (rebuilt in code, the "Try us" button starts the flow), who it covers, what the Act is, the four ranks, the two services, FAQ teaser. |
| `check.html` | The **guided flow**. One idea per screen: who is covered, what it is, the deadline + timeline, fines vs GDPR, the four ranks, the two services, then a short industry quiz and a tailored "what you need" list. Restart on top, booking only at the end. |
| `about.html` | **About** Ishi: why I do this, the goal (all-in-one AI governance), why the law matters, LinkedIn. |
| `faq.html` | Redirect to `/#faq`. The FAQ is now an accordion on the homepage (with `FAQPage` structured data on `index.html`). |
| `overview.html` | Redirect to `/` (old URL). |
| `og.png` / `og-source.html` | Social share image (1200x630) and its source (re-render with Playwright). |
| `robots.txt`, `sitemap.xml` | Crawl directives (AI crawlers allowed) + sitemap. |
| `sample-audit.pdf` | Two-page sample deliverable, linked from the services section. **Build output** — rebuild it from `sample-audit-source.html` after any edit (see `KEY-DATES.md`). |
| `funnel-map.html` | Internal planning sketch (not linked). |
| `KEY-DATES.md` | **Single source of truth for every EU AI Act date on this site.** Change a date here first. |
| `tools/check-dates.mjs` | Fails the build on stale AI Act claims. Runs in CI on every push. |

## Before you deploy

```bash
node tools/check-dates.mjs
```

The site kept the old high-risk date for months after Regulation (EU) 2026/1744
moved it. This check exists so that cannot happen quietly again: it scans every page for
known-stale wording, confirms the current high-risk dates are still present, and fails if
`sample-audit-source.html` was edited without rebuilding the PDF. After rebuilding the PDF, run
`node tools/check-dates.mjs --stamp`.

## Brand

- Name: **Ishimwe Etienne** (Ishi). No em dashes anywhere. Plain words.
- Colours: paper `#EEE6D3`, ink `#1A1410`, red `#B83228`. Fonts: Fraunces, Poppins, JetBrains Mono.

## SEO / GEO

- Per-page title, description, canonical, Open Graph + Twitter (with `og.png`).
- JSON-LD: `Person` + `ProfessionalService` (+ service catalog) + `WebSite` on the homepage; `Person` on About; `FAQPage` on the FAQ.
- `robots.txt` allows all crawlers including GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- `sitemap.xml` lists home, FAQ, About, check.

> Base URL is hard-coded as `https://ishi-eu-ai-act.vercel.app`. If you add a
> custom domain, update it in the canonical/OG tags, JSON-LD, robots, and sitemap.

## Config

- Booking: Cal.com `etienne-ishi/20min`. Email: `etienne.ishi@gmail.com`.
- Analytics: PostHog (US) in `check.html`. Events: `flow_start, step_viewed, industry_selected, answer, result_viewed, book_clicked`.

## Re-render the og image

```bash
NODE_PATH=/path/to/global/node_modules node shot.js   # renders og-source.html -> og.png at 1200x630
```

## Run / deploy

```bash
python3 -m http.server 8000
```

Static, deploys as-is on Vercel (production branch: `main`).

## Contact

etienne.ishi@gmail.com · [LinkedIn](https://www.linkedin.com/in/ishimwe-byiringiro-etienne/) · Warsaw
