# EU AI Act key dates — the single source of truth for this site

**Every date on this site comes from this file.** If a date changes, change it here first,
then update the pages listed under each row, then run `node tools/check-dates.mjs`.

Law as of: **14 November 2026**
Primary source: Regulation (EU) 2024/1689, as amended by
[Regulation (EU) 2026/1744](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202601744)
(the Digital Omnibus on AI), published 24 July 2026, in force since **27 July 2026**.

## The dates

| Date | What applies | Status | Where it came from |
|---|---|---|---|
| 2 Feb 2025 | Prohibited practices (Art. 5) and the AI literacy duty (Art. 4) | **live** | Art. 113, unchanged |
| 2 Aug 2025 | General-purpose AI model rules, governance, penalties | **live** | Art. 113, unchanged |
| 2 Aug 2026 | Transparency duties: chatbots and AI content must disclose (Art. 50). General application and enforcement powers | **live** | Art. 113, unchanged |
| 2 Dec 2026 | End of the transition for machine-readable marking (Art. 50(2)) for generative systems placed on the market before 2 Aug 2026. Also the date the new Art. 5 prohibitions apply | upcoming | Omnibus point 39(b) and point 40(a) |
| 2 Dec 2027 | High-risk duties for stand-alone Annex III systems (hiring, credit, education, and the rest) | upcoming | Omnibus point 40(b), amending Art. 113 |
| 2 Aug 2028 | High-risk duties for AI in regulated products under Annex I (medical devices and the rest) | upcoming | Omnibus point 40(b), amending Art. 113 |
| 2 Aug 2030 | Legacy high-risk systems used by public authorities | upcoming | Art. 111, unchanged |

**Moved by the Omnibus:** only the two high-risk dates (from 2 Aug 2026 and 2 Aug 2027).
**Not moved:** the prohibitions, AI literacy, the GPAI model rules, and Art. 50.

## Wording that must not come back

| Do not write | Write instead | Why |
|---|---|---|
| "before 2 August 2026", "most rules start 2 August 2026" | "2 December 2027 for Annex III" | The high-risk date moved |
| "2 August 2027 for AI inside products" | "2 August 2028" | The Annex I date moved |
| Art. 4 "must ensure a sufficient level of AI literacy" | "must take measures to support the development of AI literacy" | Art. 4 was replaced in full by Omnibus Art. 1(5). It adds: the obligation "does not require providers or deployers to guarantee any specific level of AI literacy of any individual" |
| "medical devices are leaving the AI Act" | medical devices stay in Annex I **Section A** | The Omnibus moved only the Machinery Regulation (EU) 2023/1230 to Section B (point 41). The MDR/IVDR proposal is a separate, still-open file |

## Other facts the pages rely on

- Fines: up to €35M or 7% of worldwide turnover for prohibited practices; €15M or 3% for most
  other breaches; €7.5M or 1% for misleading information (Art. 99). SMEs pay the **lower** of the two.
- Art. 6(3) exemptions never apply to a system that performs **profiling** of natural persons.
- Deployers keep automatically generated logs for **at least six months** (Art. 26(6)).
- Annex III point 1(a) **excludes** biometric verification whose sole purpose is confirming that a
  person is who they claim to be.
- Since the Omnibus, the simplified quality-management route is open to **all SMEs including
  start-ups** (recital 28, Art. 63).

## Where the dates appear

`index.html` (dates section, sectors section, FAQ, JSON-LD FAQPage) ·
`check.html` (`DEADLINE` constant, timeline, result copy) ·
`insights.html` (all three articles) ·
`sample-audit-source.html` → rebuild `sample-audit.pdf` after any edit.

## Rebuilding the sample audit

```bash
google-chrome --headless --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=8000 --print-to-pdf=sample-audit.pdf \
  "file://$PWD/sample-audit-source.html"
node tools/check-dates.mjs --stamp     # records the new source hash
```

## Next review

Re-read the amended Art. 113 and this file **by 1 February 2027**, and after any new amending
regulation. Nothing on this site should claim a date that is not in the table above.
