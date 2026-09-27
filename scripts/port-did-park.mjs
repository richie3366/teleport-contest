#!/usr/bin/env node
/**
 * True when an Open/Must-fix `- [ ]` row left the live list and ## Parked
 * gained a line that names the same C file + function. Used so a docs-only
 * park is not an empty-port revert (iter 2278).
 *
 *   node scripts/port-did-park.mjs <before_rev> [queue.md]
 *   exit 0 = park, 1 = not a park
 *
 * `--measure`: true when a `[measure]` Open row left the live list (its
 * deliverable is a C-side measurement + a writer row, no js/ — 2026-09-16
 * process take). Same exit convention.
 *
 * A stale retirement recorded as `ledger.mjs set <fn> ported --note "stale: …"`
 * (queue row gone, docs/ledger row changed with a `stale` note) is a park,
 * and a stale-only park when no non-STALE Parked line was added.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseLedgerText, readLedger } from './lib/ledger-io.mjs';

export const QUEUE_REL = 'docs/LOOP-QUEUE.md';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function liveOpenLines(text) {
  const out = [];
  for (const line of text.split('\n')) {
    if (/^## Parked\b/.test(line)) break;
    if (/^- \[ \]/.test(line)) out.push(line);
  }
  return out;
}

export function parkedLines(text) {
  const out = [];
  let inParked = false;
  for (const line of text.split('\n')) {
    if (/^## Parked\b/.test(line)) {
      inParked = true;
      continue;
    }
    if (inParked && /^## /.test(line)) break;
    if (inParked && /^- /.test(line)) out.push(line);
  }
  return out;
}

export function openRowKey(line) {
  // "- [ ] `mkobj.c` mkbox_cnts …" or "- [ ] `mkobj.c` `mkbox_cnts` …" — the
  // function token may itself be backticked (2026-09-16 #3119: seven stale
  // parks went undetected because the key kept the backticks).
  const m = line.match(/`([^`]+\.[ch])`\s+`?([A-Za-z_][\w.]*)`?/);
  if (!m) return null;
  return { file: m[1], fn: m[2].replace(/[.,;:].*$/, '') };
}

/** New Parked lines this iteration (after minus before). */
function newParkedLines(beforeText, afterText) {
  const beforePark = new Set(parkedLines(beforeText));
  return parkedLines(afterText).filter((l) => !beforePark.has(l));
}

/** True when the park(s) this iteration were all STALE retirements — a
 *  3-call detour per LOOP-QUEUE.md, so the iteration should also have
 *  shipped js/. The supervisor arms a "ship the next row" overlay. */
export function didStaleOnlyPark(beforeText, afterText) {
  if (!didPark(beforeText, afterText)) return false;
  const fresh = newParkedLines(beforeText, afterText);
  return fresh.length > 0 && fresh.every((l) => /\bSTALE\b/i.test(l));
}

export function didPark(beforeText, afterText) {
  const afterOpen = new Set(liveOpenLines(afterText));
  const removed = liveOpenLines(beforeText).filter((l) => !afterOpen.has(l));
  const beforePark = new Set(parkedLines(beforeText));
  const parkNew = parkedLines(afterText).filter((l) => !beforePark.has(l));
  if (!removed.length || !parkNew.length) return false;
  return removed.some((row) => {
    const k = openRowKey(row);
    if (!k) {
      const hint = row.replace(/^- \[ \]\s*/, '').slice(0, 24);
      return parkNew.some((p) => p.includes(hint));
    }
    return parkNew.some((p) => p.includes(k.file) && p.includes(k.fn));
  });
}

/**
 * Ledger-recorded stale retirements (2026-09-27): a live row left the queue
 * and its docs/ledger row changed to a note starting `stale`. `ledgerBefore`
 * / `ledgerAfter`: Map `${file}:${fn}` -> row. Returns the retired keys.
 */
export function ledgerStaleKeys(beforeText, afterText, ledgerBefore, ledgerAfter) {
  const afterOpen = new Set(liveOpenLines(afterText));
  const out = [];
  for (const row of liveOpenLines(beforeText)) {
    if (afterOpen.has(row)) continue;
    const k = openRowKey(row);
    if (!k) continue;
    const key = `${k.file}:${k.fn}`;
    const a = ledgerAfter.get(key);
    const b = ledgerBefore.get(key);
    if (a && /^stale\b/i.test(a.note || '') && JSON.stringify(a) !== JSON.stringify(b)) out.push(key);
  }
  return out;
}

/** New Parked lines are all STALE (or there are none). */
function parksAllStale(beforeText, afterText) {
  return newParkedLines(beforeText, afterText).every((l) => /\bSTALE\b/i.test(l));
}

/** A `[measure]` row was popped (left the live list) — docs-only by design. */
export function didMeasure(beforeText, afterText) {
  const afterOpen = new Set(liveOpenLines(afterText));
  const removed = liveOpenLines(beforeText).filter((l) => !afterOpen.has(l));
  return removed.some((row) => /\[measure\]/.test(row));
}

function gitShowQueue(rev) {
  try {
    return execFileSync('git', ['-C', root, 'show', `${rev}:${QUEUE_REL}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    return null;
  }
}

/** Ledger rows at `rev` for the C files named by the live rows of `queueText`. */
function gitShowLedger(rev, queueText) {
  const out = new Map();
  const files = new Set(liveOpenLines(queueText).map(openRowKey).filter(Boolean).map((k) => k.file));
  for (const f of files) {
    let text = '';
    try {
      text = execFileSync('git', ['-C', root, 'show', `${rev}:docs/ledger/${f}.jsonl`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch { continue; }
    for (const row of parseLedgerText(text, f)) out.set(`${f}:${row.fn}`, { ...row, file: f });
  }
  return out;
}

function main(argv) {
  const args = argv.slice(2);
  const measure = args.includes('--measure');
  const staleOnly = args.includes('--stale-only');
  const rest = args.filter((a) => !a.startsWith('--'));
  const beforeRev = rest[0];
  if (!beforeRev) {
    console.error(`usage: node scripts/port-did-park.mjs [--measure|--stale-only] <before_rev> [${QUEUE_REL}]`);
    process.exit(2);
  }
  const queuePath = rest[1] || join(root, QUEUE_REL);
  const before = gitShowQueue(beforeRev);
  if (before == null || !existsSync(queuePath)) process.exit(1);
  const after = readFileSync(queuePath, 'utf8');
  const stale = measure ? [] : ledgerStaleKeys(before, after, gitShowLedger(beforeRev, before), readLedger());
  const hit = measure ? didMeasure(before, after)
    : staleOnly ? (stale.length ? parksAllStale(before, after) : didStaleOnlyPark(before, after))
      : didPark(before, after) || stale.length > 0;
  process.exit(hit ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv);
}
