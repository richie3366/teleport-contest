#!/usr/bin/env node
/**
 * Cap report for loop agents. You run this and read the statuses.
 * Do not count lines, bullets, checkboxes, or review length by hand.
 *
 *   node scripts/check-hot-docs.mjs --fix
 *   node scripts/check-hot-docs.mjs --fix --review 183-187
 *   node scripts/check-hot-docs.mjs --fix 183 184 187
 *   node scripts/check-hot-docs.mjs --docs-only --review 19
 *
 * ok     = at target or within +33% — no edit.
 * ROTATE = journal overflow — re-run with --fix (do not copy crumbs).
 * REFILL = queue below 8 — append Open from the map.
 * FAIL   = beyond +33% — prune/trim that file.
 * missing= review id not found.
 *
 * --fix rotates the journal, then reports.
 * Exit 1 if any ROTATE (without --fix), REFILL, FAIL, or missing.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  JOURNAL_KEEP,
  JOURNAL_MAX_LIVE,
  JOURNAL_REL,
  journalEntryCount,
  rotateJournalIfNeeded,
} from './rotate-journal.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOL = 0.33;
const approxTok = (bytes) => Math.ceil(bytes / 4);

const LINE_CAPS = {
  'docs/CURRENT.md': { target: 150, maxBytes: 8_000 },
  'docs/NOTES.md': { target: 100, maxBytes: 6_000 },
};

const BYTE_CAPS = {
  'docs/GROK-PLAYBOOK.md': 14_000,
  'scripts/agent-port-loop.prompt.md': 8_000,
  'docs/PROGRESS.md': 1_500,
  'docs/C-JS-MAP.md': 3_000,
};

const HOT_SUM_MAX = 40_000;
const QUEUE_MIN = 8;
const QUEUE_TARGET = 12;
const NOTES_SECTION_TARGET = 15;
const REVIEW_JS = { lo: 150, hi: 350 };
const REVIEW_DOCS = { lo: 40, hi: 80 };

function lineCount(text) {
  if (!text.length) return 0;
  const parts = text.split('\n');
  if (parts[parts.length - 1] === '') parts.pop();
  return parts.length;
}

function ceilTol(n) {
  return Math.ceil(n * (1 + TOL));
}

function floorTol(n) {
  return Math.floor(n * (1 - TOL));
}

function fmtBytes(n) {
  if (n < 10_000) return `${n} B`;
  return `${(n / 1000).toFixed(1)}kB`;
}

function bulletsInSection(text, headingRe) {
  const lines = text.split('\n');
  let inSec = false;
  let found = false;
  let n = 0;
  for (const line of lines) {
    if (/^## /.test(line)) {
      inSec = headingRe.test(line);
      if (inSec) found = true;
      continue;
    }
    if (inSec && /^- /.test(line)) n += 1;
  }
  return { found, n };
}

function queueCounts(text) {
  let sec = '';
  let mf = 0;
  let open = 0;
  for (const line of text.split('\n')) {
    if (/^## Must-fix/.test(line)) {
      sec = 'mf';
      continue;
    }
    if (/^## Open/.test(line)) {
      sec = 'op';
      continue;
    }
    if (/^## /.test(line)) {
      sec = '';
      continue;
    }
    if (/^- \[ \]/.test(line)) {
      if (sec === 'mf') mf += 1;
      else if (sec === 'op') open += 1;
    }
  }
  return { mf, open, total: mf + open };
}

function readRel(rel) {
  const path = join(root, rel);
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}

/** Over a max target: ok through +33%, FAIL beyond. Under is always ok. */
function statusMax(n, target) {
  if (n <= ceilTol(target)) return 'ok';
  return 'FAIL';
}

/** Inclusive band with ±33% still ok (no edit). */
function statusBand(n, lo, hi) {
  const failLo = floorTol(lo);
  const failHi = ceilTol(hi);
  if (n >= failLo && n <= failHi) return 'ok';
  return 'FAIL';
}

function parseArgs(argv) {
  const out = { fix: false, docsOnly: false, help: false, reviews: [] };
  for (const a of argv) {
    if (a === '--fix') out.fix = true;
    else if (a === '--docs-only') out.docsOnly = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--review' || a === '--reviews') continue;
    else if (a.startsWith('-')) {
      console.error(`unknown flag: ${a}`);
      process.exit(2);
    } else {
      for (const part of a.split(',')) {
        if (part) out.reviews.push(part);
      }
    }
  }
  return out;
}

function expandSpec(spec) {
  const range = spec.match(/^(\d+)-(\d+)$/);
  if (range) {
    const a = Number(range[1]);
    const b = Number(range[2]);
    if (a >= 1 && b >= a && b - a <= 80) {
      return Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
    }
  }
  return [spec];
}

function catalogReviews() {
  const files = [];
  const reviewsRoot = join(root, 'reviews');
  if (!existsSync(reviewsRoot)) return files;
  for (const dir of readdirSync(reviewsRoot, { withFileTypes: true })) {
    if (!dir.isDirectory() || !dir.name.startsWith('loop')) continue;
    const relDir = join('reviews', dir.name);
    for (const name of readdirSync(join(root, relDir))) {
      if (!name.endsWith('.md') || name === '00-INDEX.md') continue;
      const idm = name.match(/^(\d+)-/);
      const sham = name.match(/-([0-9a-f]{7,40})-/i);
      files.push({
        rel: join(relDir, name),
        name,
        id: idm ? Number(idm[1]) : null,
        sha: sham ? sham[1].toLowerCase() : null,
        prefer: dir.name === 'loop-unattended' ? 0 : 1,
      });
    }
  }
  files.sort((a, b) => a.prefer - b.prefer || String(a.id).localeCompare(String(b.id), 'en'));
  return files;
}

function resolveReviewToken(token, cat) {
  const asPath = isAbsolute(token) ? token : join(root, token);
  if (existsSync(asPath) && asPath.endsWith('.md')) {
    return { rel: relative(root, asPath), label: token };
  }
  const byName = cat.find((f) => f.name === token || f.rel === token);
  if (byName) return { rel: byName.rel, label: `review ${byName.id ?? token}` };

  if (/^\d+$/.test(token)) {
    const id = Number(token);
    const hit = cat.find((f) => f.id === id);
    if (hit) return { rel: hit.rel, label: `review ${id}` };
    return {
      missing: true,
      label: `review ${id}`,
      hint: `not found (expected reviews/loop-unattended/${id}-*.md)`,
    };
  }

  if (/^[0-9a-f]{7,40}$/i.test(token)) {
    const sha = token.toLowerCase();
    const hit = cat.find((f) => f.sha && (f.sha === sha || f.sha.startsWith(sha) || sha.startsWith(f.sha)));
    if (hit) return { rel: hit.rel, label: `review ${hit.id ?? sha.slice(0, 8)}` };
    return { missing: true, label: `review ${sha.slice(0, 8)}`, hint: 'not found' };
  }

  return { missing: true, label: token, hint: 'not found' };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`Usage: node scripts/check-hot-docs.mjs [--fix] [--docs-only] [--review] ID…

Run this yourself and read the statuses. Do not wc/count.

  --fix         rotate journal if over cap, then report
  --docs-only   review band 40–80 (default 150–350)
  IDs           187 | 183-187 | 183,184 | path | SHA

ok = in target or within +33% — no edit required.
FAIL / ROTATE / REFILL / missing = do that action only.`);
    process.exit(0);
  }

  if (args.fix) {
    const rotated = rotateJournalIfNeeded(root);
    if (rotated.action === 'rotated') {
      console.log(`${rotated.message}\n`);
    }
  }

  const rows = [];
  const actions = [];
  let worst = 'ok';
  const bump = (status) => {
    const rank = { ok: 0, ROTATE: 1, REFILL: 1, FAIL: 2, missing: 2 };
    if ((rank[status] ?? 0) > (rank[worst] ?? 0)) worst = status;
  };
  const add = (status, label, detail, hint, action) => {
    bump(status);
    rows.push({ status, label, detail, hint: hint || '' });
    if (action) actions.push(action);
  };

  let hotSum = 0;
  for (const [rel, cap] of Object.entries(LINE_CAPS)) {
    const text = readRel(rel);
    if (text == null) {
      add('FAIL', rel, 'missing', '', `create ${rel}`);
      continue;
    }
    const bytes = Buffer.byteLength(text);
    const lines = lineCount(text);
    hotSum += bytes;
    const failAt = ceilTol(cap.target);
    let status = statusMax(lines, cap.target);
    const hints = [];
    if (status === 'FAIL') {
      hints.push(`prune to ≤${cap.target} L (FAIL >${failAt})`);
    }
    const byteFail = ceilTol(cap.maxBytes);
    if (bytes > byteFail) {
      status = 'FAIL';
      hints.push(`${fmtBytes(bytes)} > ${fmtBytes(byteFail)}`);
    }
    add(
      status,
      rel,
      `${lines} / ${cap.target} L  ${fmtBytes(bytes)}  ~${approxTok(bytes)} tok`,
      hints.join('; '),
      status === 'FAIL' ? `${rel}: prune stale until this is ok` : '',
    );
  }

  const notes = readRel('docs/NOTES.md') || '';
  for (const [label, re] of [
    ["NOTES don't-recheck", /don't re-check/i],
    ['NOTES landmarks', /^## Landmarks\b/i],
  ]) {
    const { found, n } = bulletsInSection(notes, re);
    if (!found) {
      add('ok', label, 'section missing', '', '');
      continue;
    }
    add('ok', label, `${n} / ${NOTES_SECTION_TARGET} items`, '', '');
  }

  const journal = readRel(JOURNAL_REL);
  if (journal == null) {
    add('FAIL', 'journal entries', 'missing', JOURNAL_REL, `create ${JOURNAL_REL}`);
  } else {
    const n = journalEntryCount(journal);
    if (n > JOURNAL_MAX_LIVE) {
      add(
        'ROTATE',
        'journal entries',
        `${n} / ${JOURNAL_MAX_LIVE}  (keep ${JOURNAL_KEEP})`,
        '',
        'journal: node scripts/check-hot-docs.mjs --fix',
      );
    } else {
      add(
        'ok',
        'journal entries',
        `${n} / ${JOURNAL_MAX_LIVE}  (rotate when >${JOURNAL_MAX_LIVE})`,
        '',
        '',
      );
    }
  }

  const queue = readRel('docs/LOOP-QUEUE.md');
  if (queue == null) {
    add('FAIL', 'LOOP-QUEUE', 'missing', '', 'create docs/LOOP-QUEUE.md');
  } else {
    const { mf, open, total } = queueCounts(queue);
    if (total < QUEUE_MIN) {
      add(
        'REFILL',
        'LOOP-QUEUE',
        `mf=${mf} open=${open} total=${total}  (band ${QUEUE_MIN}–${QUEUE_TARGET})`,
        '',
        `LOOP-QUEUE: append Open to ~${QUEUE_TARGET} from c-js-map`,
      );
    } else {
      add(
        'ok',
        'LOOP-QUEUE',
        `mf=${mf} open=${open} total=${total}  (band ${QUEUE_MIN}–${QUEUE_TARGET})`,
        '',
        '',
      );
    }
  }

  for (const [rel, maxBytes] of Object.entries(BYTE_CAPS)) {
    const text = readRel(rel);
    if (text == null) {
      add('FAIL', rel, 'missing', '', '');
      continue;
    }
    const bytes = Buffer.byteLength(text);
    hotSum += bytes;
    const status = bytes > maxBytes ? 'FAIL' : 'ok';
    add(
      status,
      rel,
      `${fmtBytes(bytes)} / ${fmtBytes(maxBytes)}  ~${approxTok(bytes)} tok`,
      status === 'FAIL' ? `${bytes} B > ${maxBytes} B` : '',
      status === 'FAIL' ? `${rel}: over hard cap (authority file)` : '',
    );
  }

  const sumStatus = hotSum > HOT_SUM_MAX ? 'FAIL' : 'ok';
  add(
    sumStatus,
    'hot sum',
    `${fmtBytes(hotSum)} / ${fmtBytes(HOT_SUM_MAX)}  ~${approxTok(hotSum)} tok`,
    '',
    sumStatus === 'FAIL' ? 'hot sum over budget' : '',
  );

  const reviewSpecs = args.reviews.flatMap(expandSpec);
  if (reviewSpecs.length) {
    const cat = catalogReviews();
    const band = args.docsOnly ? REVIEW_DOCS : REVIEW_JS;
    const failLo = floorTol(band.lo);
    const failHi = ceilTol(band.hi);
    for (const spec of reviewSpecs) {
      const hit = resolveReviewToken(spec, cat);
      if (hit.missing) {
        add('missing', hit.label, '—', hit.hint, `${hit.label}: ${hit.hint}`);
        continue;
      }
      const text = readRel(hit.rel);
      if (text == null) {
        add('missing', hit.label, hit.rel, 'unreadable', `${hit.label}: unreadable`);
        continue;
      }
      const n = lineCount(text);
      const status = statusBand(n, band.lo, band.hi);
      const hint =
        status === 'FAIL'
          ? n < failLo
            ? `below ${failLo} L (band ${band.lo}–${band.hi})`
            : `above ${failHi} L (band ${band.lo}–${band.hi})`
          : '';
      add(
        status,
        hit.label,
        `${n} / ${band.lo}–${band.hi} L  ${hit.rel}`,
        hint,
        status === 'FAIL'
          ? n < failLo
            ? `${hit.label}: expand (too short)`
            : `${hit.label}: trim (too long; no full-diff paste)`
          : '',
      );
    }
  }

  console.log(`Cap check — you run this and read it. Do not count by hand.
ok = at target or within +33% (no edit). FAIL / ROTATE / REFILL / missing = act.
`);
  const labelW = Math.max(...rows.map((r) => r.label.length), 8);
  for (const r of rows) {
    const extra = r.hint ? `  ${r.hint}` : '';
    console.log(
      `${r.status.padEnd(7)} ${r.label.padEnd(labelW)}  ${r.detail}${extra}`,
    );
  }

  console.log('');
  if (!actions.length) {
    console.log('All ok. No cap edits required.');
  } else {
    console.log('Action required (only these):');
    for (const a of actions) console.log(`  - ${a}`);
  }

  const exitNeed =
    worst === 'FAIL' ||
    worst === 'missing' ||
    worst === 'REFILL' ||
    (worst === 'ROTATE' && !args.fix)
      ? 1
      : 0;
  process.exit(exitNeed);
}

main();
