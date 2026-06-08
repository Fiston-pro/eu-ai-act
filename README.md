# Etienne Byiringiro · EU AI Act

An interactive, single-page landing experience positioning Etienne Byiringiro as a
go-to specialist for **EU AI Act readiness and AI governance**.

## What it is

A full-screen, "onboarding-story" walk-through — one idea per screen — that guides any
visitor through:

1. **The why** — the mission: keeping AI a tool that serves people, under human control.
2. **The what** — a plain-language, zero-jargon explainer of the EU AI Act and its
   four risk levels.
3. **The stakes** — short, real cautionary cases of AI going wrong.
4. **Where you fit** — an interactive branch that tailors the message to **HR teams,
   software houses, startups/AI builders, public-sector & health**, or the simply
   **curious**.
5. **The offer** — three tiers, led by a free 20-minute review. Pay only if you want
   more after the call.

## Tech

- Single self-contained `index.html` — no build step, no dependencies (fonts via Google
  Fonts CDN).
- Full-screen scroll-snap "stories", live progress bar, animated reveals, an interactive
  persona selector, and a live countdown to 2 August 2026.
- Mobile-first; respects `prefers-reduced-motion`; degrades gracefully without JS.

## Run / deploy

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Static — deploys as-is to GitHub Pages, Netlify, Vercel, or any static host.

## Contact

etienne.ishi@gmail.com · [LinkedIn](https://www.linkedin.com/in/ishimwe-byiringiro-etienne/) · Warsaw, Poland
