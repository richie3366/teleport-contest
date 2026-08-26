#!/usr/bin/env node
/**
 * C→JS map section retriever. One call replaces paging `c-js-map/*.md`.
 *
 *   node scripts/map.mjs worm.c            # print every map section for worm.c
 *   node scripts/map.mjs detect_wsegs      # match on a function named in a heading
 *   node scripts/map.mjs js/display.js     # sections whose JS: line names that file
 *   node scripts/map.mjs --index           # compact TOC: file -> section -> lines
 *   node scripts/map.mjs --index worm      # TOC filtered
 *   node scripts/map.mjs --heads worm.c    # heading + JS/status line only (no evidence)
 *
 * Sections are `### …` blocks in docs/c-js-map/*.md. Files without `###`
 * (debt/absent/harness/scaffolding/update-rule) are matched whole-file and
 * printed as line-scoped hits so a follow-up read is a single ranged call.
 * Deterministic: no network, no LLM, no cache. Read-only.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mapDir = join(root, 'docs/c-js-map');

const argv = process.argv.slice(2);
const wantIndex = argv.includes('--index');
const headsOnly = argv.includes('--heads');
const terms = argv.filter((a) => !a.startsWith('--'));

if (!terms.length && !wantIndex) {
  console.log('usage: node scripts/map.mjs <c-file|c-function|js-file> …');
  console.log('       node scripts/map.mjs --index [filter]');
  console.log('       node scripts/map.mjs --heads <term>   (headings + JS line only)');
  process.exit(2);
}

/** Split one map file into `### ` sections (plus a preamble pseudo-section). */
function sections(file) {
  const text = readFileSync(join(mapDir, file), 'utf8');
  const lines = text.split('\n');
  const out = [];
  let cur = { head: '(preamble)', start: 1, lines: [] };
  lines.forEach((ln, i) => {
    if (ln.startsWith('### ')) {
      if (cur.lines.length) out.push({ ...cur, end: i });
      cur = { head: ln.slice(4).trim(), start: i + 1, lines: [] };
    }
    cur.lines.push(ln);
  });
  if (cur.lines.length) out.push({ ...cur, end: lines.length });
  return out.map((s) => ({ ...s, file }));
}

const all = readdirSync(mapDir)
  .filter((f) => f.endsWith('.md'))
  .flatMap(sections);

/** Terms a section answers to: backticked names in the heading + JS: paths. */
function keysOf(sec) {
  const k = new Set();
  for (const m of sec.head.matchAll(/`([^`]+)`/g)) {
    const raw = m[1];
    k.add(raw.toLowerCase());
    k.add(basename(raw).toLowerCase());
    for (const part of raw.split(/[\/\s]+/)) if (part) k.add(part.toLowerCase());
  }
  // bare words in the heading (headings are not always backticked)
  for (const w of sec.head.split(/[^\w.\/]+/)) if (w.length > 2) k.add(w.toLowerCase());
  const js = sec.lines.find((l) => l.startsWith('JS:'));
  if (js) for (const m of js.matchAll(/`([^`]+)`/g)) {
    k.add(m[1].toLowerCase());
    k.add(basename(m[1]).toLowerCase());
  }
  return k;
}

function matches(sec, term) {
  const t = term.toLowerCase();
  const keys = keysOf(sec);
  if (keys.has(t) || keys.has(basename(t))) return 'head';
  // function names live inside evidence prose too
  const body = sec.lines.join('\n');
  const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (re.test(sec.head)) return 'head';
  if (re.test(body)) return 'body';
  return null;
}

if (wantIndex) {
  const filter = terms[0]?.toLowerCase();
  let n = 0;
  for (const sec of all) {
    if (sec.head === '(preamble)') continue;
    if (filter && !sec.head.toLowerCase().includes(filter)) continue;
    const js = (sec.lines.find((l) => l.startsWith('JS:')) || '').replace(/^JS:\s*/, '');
    console.log(
      `${sec.file}:${sec.start}-${sec.end}  ${sec.head}${js ? `\n    JS: ${js}` : ''}`,
    );
    n++;
  }
  console.log(`\n${n} section(s). Read a range with one call, e.g. offset=<start> limit=<end-start>.`);
  process.exit(0);
}

let hits = 0;
for (const term of terms) {
  const head = [];
  const body = [];
  for (const sec of all) {
    const m = matches(sec, term);
    if (m === 'head') head.push(sec);
    else if (m === 'body') body.push(sec);
  }
  console.log(`\n=== ${term} — ${head.length} heading hit(s), ${body.length} evidence-only hit(s) ===`);
  for (const sec of head) {
    hits++;
    console.log(`\n--- ${sec.file}:${sec.start}-${sec.end} ---`);
    if (headsOnly) {
      console.log(`### ${sec.head}`);
      const js = sec.lines.find((l) => l.startsWith('JS:'));
      if (js) console.log(js);
    } else {
      console.log(sec.lines.join('\n').replace(/\n{3,}/g, '\n\n').trim());
    }
  }
  if (body.length) {
    console.log(`\nevidence-only (heading does not name it) — read the range if the head hits are wrong:`);
    for (const sec of body) {
      hits++;
      const ln = sec.lines.findIndex((l) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(l));
      console.log(`  ${sec.file}:${sec.start + Math.max(ln, 0)}  in "### ${sec.head}"`);
    }
  }
}
if (!hits) {
  console.log('\nNo map section names that term. It is an unmapped C locus:');
  console.log('add a `### ` row to the right docs/c-js-map/*.md in this commit.');
}
