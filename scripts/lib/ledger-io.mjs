/**
 * Declared port-status ledger: docs/ledger/<file>.c.jsonl, one canonical
 * JSON line per pinned-C function definition, keyed by (file, fn), sorted
 * by C start line. Read/write helpers only — no measurement here.
 *
 * Row: {"fn","c":"a-b","status","js":["js/x.js:sym"],"omit","d":["D-NNNN"],"at","note"}
 * (empty keys omitted; key order fixed so diffs stay one line).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './coverage.mjs';

export const LEDGER_DIR = join(ROOT, 'docs/ledger');
export const LEDGER_REL = 'docs/ledger';
export const STATUSES = ['unknown', 'absent', 'scaffold', 'partial', 'ported', 'parity',
  'split', 'by-design', 'frozen'];
/** Statuses that claim the C body lives in js/ (need a `js` location). */
export const LIVE_STATUSES = new Set(['partial', 'ported', 'parity', 'split']);
/** Statuses the coverage queue may emit. */
export const OPEN_STATUSES = new Set(['unknown', 'absent', 'scaffold']);
const KEY_ORDER = ['fn', 'c', 'status', 'js', 'omit', 'd', 'at', 'note'];
export const D_KEEP = 6;
export const OMIT_MAX = 300;

export function fileOfLedger(name) { return name.replace(/\.jsonl$/, ''); }
export function ledgerPath(cfile) { return join(LEDGER_DIR, `${cfile}.jsonl`); }

export function canonical(row) {
  const o = {};
  for (const k of KEY_ORDER) {
    const v = row[k];
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) continue;
    o[k] = v;
  }
  return JSON.stringify(o);
}

const startOf = (row) => parseInt(String(row.c || '0').split('-')[0], 10) || 0;
export function sortRows(rows) {
  return rows.slice().sort((a, b) => startOf(a) - startOf(b) || (a.fn < b.fn ? -1 : a.fn > b.fn ? 1 : 0));
}
export function serialize(rows) {
  return sortRows(rows).map(canonical).join('\n') + '\n';
}

/** Parse one ledger file's text → rows (throws with file:line on bad JSON). */
export function parseLedgerText(text, label = 'ledger') {
  const rows = [];
  text.split('\n').forEach((line, i) => {
    if (!line.trim()) return;
    try { rows.push(JSON.parse(line)); } catch (e) { throw new Error(`${label}:${i + 1}: ${e.message}`); }
  });
  return rows;
}

/** Map `${file}:${fn}` -> row (row.file set). */
export function readLedger(dir = LEDGER_DIR) {
  const out = new Map();
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.jsonl')).sort()) {
    const file = fileOfLedger(name);
    for (const row of parseLedgerText(readFileSync(join(dir, name), 'utf8'), name)) {
      out.set(`${file}:${row.fn}`, { ...row, file });
    }
  }
  return out;
}

/** Rewrite the jsonl files for `files` from the full map (other files untouched). */
export function writeLedgerFiles(ledger, files, dir = LEDGER_DIR) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const byFile = new Map();
  for (const row of ledger.values()) {
    if (!files.has(row.file)) continue;
    if (!byFile.has(row.file)) byFile.set(row.file, []);
    const { file, ...rest } = row;
    byFile.get(file).push(rest);
  }
  for (const f of files) writeFileSync(join(dir, `${f}.jsonl`), serialize(byFile.get(f) || []));
}

/** Resolve `fn` or `file.c:fn` against the ledger / measured keys. */
export function resolveKey(spec, keys) {
  if (spec.includes(':')) return keys.has(spec) ? { key: spec } : { error: `${spec}: no such (file, fn)` };
  const hits = [...keys].filter((k) => k.endsWith(`:${spec}`) && k.slice(0, -spec.length - 1).endsWith('.c'));
  if (hits.length === 1) return { key: hits[0] };
  if (!hits.length) return { error: `${spec}: not a pinned-C function` };
  return { error: `${spec}: ambiguous — use one of ${hits.join(', ')}` };
}

export function mergeD(oldD = [], add = []) {
  const all = [...new Set([...add, ...oldD])];
  all.sort((a, b) => parseInt(b.slice(2), 10) - parseInt(a.slice(2), 10));
  return all.slice(0, D_KEEP);
}

export function clipOmit(s) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > OMIT_MAX ? `${t.slice(0, OMIT_MAX - 1)}…` : t;
}
