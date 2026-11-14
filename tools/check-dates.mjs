#!/usr/bin/env node
// Guards the site against stale EU AI Act claims.
// Run: node tools/check-dates.mjs        (check, exits 1 on failure)
//      node tools/check-dates.mjs --stamp (re-record the sample-audit source hash)
//
// Why this exists: on 27 July 2026 Regulation (EU) 2026/1744 moved the high-risk
// dates. The site kept claiming 2 August 2026 for months. See KEY-DATES.md.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STAMP = join(ROOT, 'sample-audit.stamp');
const AUDIT_SRC = join(ROOT, 'sample-audit-source.html');
const REVIEW_BY = '2027-02-01';

// Patterns that must never appear. Each is a claim the 2026 Omnibus made false.
const BANNED = [
  { re: /\b(before|by|until|ahead of|prior to)\s+2\s*(?:August|Aug\.?)\s*,?\s*2026\b/i,
    why: 'Stale deadline. High-risk duties moved to 2 December 2027.' },
  { re: /\b(?:vor dem|bis zum)\s+2\.?\s*August\s*2026\b/i,
    why: 'Stale deadline (DE). High-risk duties moved to 2 December 2027.' },
  { re: /\b(?:antes del|hasta el)\s+2\s+de\s+agosto\s+de\s+2026\b/i,
    why: 'Stale deadline (ES). High-risk duties moved to 2 December 2027.' },
  { re: /\bmost (?:rules|obligations)\b[^.<]{0,70}2\s*(?:August|Aug\.?)\s*2026/i,
    why: 'Stale. Only Art. 50 and general application start 2 August 2026.' },
  { re: /2\s*(?:August|Aug\.?)\s*2026[^.<]{0,70}\bmost (?:rules|obligations)\b/i,
    why: 'Stale. Only Art. 50 and general application start 2 August 2026.' },
  { re: /Annex\s*III[^.<]{0,90}2\s*(?:August|Aug\.?)\s*2026/i,
    why: 'Annex III high-risk duties start 2 December 2027, not August 2026.' },
  { re: /2\s*(?:August|Aug\.?)\s*2027[^.<]{0,90}(?:regulated products|inside products|embedded|medical device)/i,
    why: 'Annex I high-risk duties start 2 August 2028, not August 2027.' },
  { re: /(?:regulated products|AI inside products|AI built into)[^.<]{0,70}2\s*(?:August|Aug\.?)\s*2027/i,
    why: 'Annex I high-risk duties start 2 August 2028, not August 2027.' },
  { re: /2\.?\s*August\s*2027[^.<]{0,90}(?:Produkt|Medizinprodukt)/i,
    why: 'Annex I high-risk duties start 2 August 2028 (DE).' },
  { re: /\bensure[^.<]{0,70}sufficient level of AI literacy\b/i,
    why: 'Art. 4 was replaced in July 2026: take measures to support, no level guaranteed.' },
  { re: /AI literacy[^.<]{0,50}\b(?:must ensure|guarantee[sd]? a (?:sufficient|certain) level)\b/i,
    why: 'Art. 4 no longer requires guaranteeing a level for any individual.' },
  { re: /medical devices?[^.<]{0,60}(?:leave|leaving|removed from|out of) the AI Act/i,
    why: 'Only the Machinery Regulation moved to Annex I Section B. MDR/IVDR stayed in Section A.' },
];

// Dates that should still be findable somewhere, so a bad find-and-replace is caught.
// Short forms are allowed: a timeline label reads "Dec 2027", not "2 December 2027".
const EXPECTED = [
  { re: /(?:2\s*)?(?:December|Dec\.?|Dez(?:ember)?\.?|diciembre|dicembre)\s*,?\s*2027/i,
    what: 'the Annex III high-risk date, December 2027' },
  { re: /(?:2\s*)?(?:August|Aug\.?|agosto|agost)\w*\s*,?\s*2028/i,
    what: 'the Annex I high-risk date, August 2028' },
];

const SCAN_EXT = /\.(html?|md|txt|json|xml)$/i;
const SKIP_DIR = /^(\.git|node_modules|tools)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIR.test(name)) walk(p, out); }
    else if (SCAN_EXT.test(name)) out.push(p);
  }
  return out;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
const rel = (p) => p.slice(ROOT.length + 1);

// Some pages quote the old wording on purpose, to explain what changed.
// Put `check-dates-ok` on that line (in an HTML comment, say) to exempt it.
const ALLOW = /check-dates-ok/;
const exempt = (text, idx) => ALLOW.test(text.split('\n')[lineOf(text, idx) - 1] ?? '');

function stampSource() {
  const h = createHash('sha256').update(readFileSync(AUDIT_SRC)).digest('hex');
  writeFileSync(STAMP, h + '\n');
  console.log('sample-audit.stamp written:', h.slice(0, 16) + '...');
}

function check() {
  const problems = [];
  const files = walk(ROOT).filter((p) => rel(p) !== 'KEY-DATES.md');

  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const { re, why } of BANNED) {
      for (const m of text.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) {
        if (exempt(text, m.index)) continue;
        problems.push(`${rel(file)}:${lineOf(text, m.index)}  "${m[0].trim().slice(0, 70)}"\n    ${why}`);
      }
    }
  }

  // The pages a visitor actually reads must still carry the current high-risk dates.
  for (const page of ['index.html', 'check.html', 'insights.html']) {
    const p = join(ROOT, page);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, 'utf8');
    for (const { re, what } of EXPECTED) {
      if (!re.test(text)) problems.push(`${page}  is missing ${what}.\n    Every page that discusses high-risk timing must state the current date.`);
    }
  }

  // sample-audit.pdf is a build output. If its source changed and nobody re-rendered,
  // the PDF a prospect downloads is out of date. That is exactly what went wrong before.
  if (existsSync(AUDIT_SRC)) {
    const now = createHash('sha256').update(readFileSync(AUDIT_SRC)).digest('hex');
    const was = existsSync(STAMP) ? readFileSync(STAMP, 'utf8').trim() : null;
    if (was !== now) {
      problems.push('sample-audit-source.html changed but sample-audit.pdf was not rebuilt.\n'
        + '    Rebuild it (see KEY-DATES.md), then: node tools/check-dates.mjs --stamp');
    }
  }

  // A gentle nudge, not a failure.
  const stale = new Date() > new Date(REVIEW_BY);
  if (stale) console.warn(`\nNote: KEY-DATES.md was due for review on ${REVIEW_BY}. Re-read Art. 113 and the amending regulation.`);

  if (problems.length) {
    console.error('\nStale EU AI Act claims found:\n');
    for (const p of problems) console.error('  ' + p + '\n');
    console.error(`${problems.length} problem(s). The dates live in KEY-DATES.md; fix them there first.\n`);
    process.exit(1);
  }
  console.log(`Checked ${files.length} files. No stale AI Act claims. Law as of KEY-DATES.md.`);
}

process.argv.includes('--stamp') ? stampSource() : check();
