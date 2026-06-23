# Etienne Byiringiro · EU AI Act

Consulting site for **EU AI Act readiness & AI governance**, live at
[ishi-eu-ai-act.vercel.app](https://ishi-eu-ai-act.vercel.app).

## Pages

| File | Role |
|---|---|
| `index.html` | **Homepage** — static, server-rendered content (crawlable by search & AI engines). Who I am, what the EU AI Act is, the four risk levels, services, recent-work/trust, FAQ teaser, contact. Primary CTA → the interactive check. |
| `check.html` | The **interactive 3-minute check** (the funnel). Progressive enhancement — full JS app. Has a `<noscript>` fallback to the homepage. |
| `faq.html` | **FAQ** — six question-headed answers (applies-to-me, HR high-risk, edtech high-risk, provider vs deployer, the 2026 deadline, fines) with `FAQPage` structured data. Built to be quotable by AI search. |
| `overview.html` | Redirect stub → `/` (the old one-pager URL; content now lives on the homepage). |
| `funnel-map.html` | Internal planning diagram of the funnel (not linked publicly). |
| `sample-audit.pdf` | **Placeholder** sample deliverable — replace with a real redacted report. |
| `robots.txt`, `sitemap.xml` | Crawl directives (AI crawlers explicitly allowed) + sitemap. |

## Why two layers (content + check)

Search engines and AI engines (ChatGPT, Perplexity, Google AI Overviews) read
the **raw HTML**. The homepage is fully static so its text is in "view source",
not injected by JS. The interactive check is layered on top at `/check.html` as
progressive enhancement — great for humans, never required to read the content.

## SEO / GEO

- Unique `<title>` + meta description per page; canonical URLs; Open Graph + Twitter tags.
- JSON-LD: `Person` + `ProfessionalService` + `WebSite` on the homepage; `FAQPage` on the FAQ.
- `robots.txt` allows all crawlers, including GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
- `sitemap.xml` lists the homepage, FAQ, and check.
- Visible "Last updated" date on content pages.

> Base URL is hard-coded as `https://ishi-eu-ai-act.vercel.app`. If you add a
> custom domain, update it in the canonical/OG tags, JSON-LD, `robots.txt`,
> and `sitemap.xml`.

## Configuration

- **Booking:** Cal.com slug `etienne-ishi/20min` (in each page's small script).
- **Email:** `etienne.ishi@gmail.com`.
- **Analytics:** PostHog (US) is wired in `check.html` (`PH_KEY`). Events:
  `funnel_start, persona_selected, answer_given, result_viewed, book_clicked, email_clicked`.
- **Share image:** add a real `og.png` (1200×630) and uncomment the `og:image` tags in `index.html`.

## To replace (placeholders)

- `sample-audit.pdf` — a real redacted sample report.
- The `CASE STUDY` and `TESTIMONIAL` placeholders in `index.html` (search those comments). Do not invent — fill with genuine work.

## Run / deploy

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Static — deploys as-is on Vercel (production branch: `main`).

## Contact

etienne.ishi@gmail.com · [LinkedIn](https://www.linkedin.com/in/ishimwe-byiringiro-etienne/) · Warsaw, Poland
