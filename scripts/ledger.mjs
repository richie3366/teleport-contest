#!/usr/bin/env node
/**
 * Port ledger — declared status of every pinned-C function, joined with the
 * measured JS coverage. Source of truth: docs/ledger/<file>.c.jsonl (text,
 * committed). Query cache: .cache/ledger.db (node:sqlite, derived, safe to
 * delete). Loop agents never Read the jsonl; they call this.
 *
 *   node scripts/ledger.mjs show <fn|file.c:fn>…        # status + measured, one line each
 *   node scripts/ledger.mjs file <file.c>                # every function of one C file
 *   node scripts/ledger.mjs rows [N] [--min-c-lines 12] [--partial] [--all] [--write]
 *                                                        # coverage queue rows (--write: LOOP-QUEUE block)
 *   node scripts/ledger.mjs batch [file.c…] [--max 100] [--write]
 *                                                        # one iteration's batch: whole gap of the top C file(s)
 *                                                        # (--write: .cache/batch.json, reconciled by finish)
 *   node scripts/ledger.mjs set <fn> <status> [--js a.js:sym,b.js:sym] [--omit "…"]
 *                               [--d D-NNNN] [--note "…"] [--no-queue]
 *   node scripts/ledger.mjs summary [--by-file] [--top N] [--snapshot]
 *   node scripts/ledger.mjs check [--verbose]            # reconciliation (exit 1 on FAIL)
 *   node scripts/ledger.mjs fmt [--check]                # canonical jsonl
 *   node scripts/ledger.mjs sync                         # rows for new C defs, fix ranges
 *   node scripts/ledger.mjs sql "select …"               # read-only SQL on the cache
 *   node scripts/ledger.mjs seed [--dry-run]             # one-shot history import
 *
 * Statuses: unknown absent scaffold partial ported parity split by-design frozen.
 * Ledger bullet / set also take `audited` (live row re-read whole vs C:
 * status kept, note stamped, batches skip it).
 * Stale queue row: `set <fn> ported --note "stale: <where the body lives>"`.
 * An iteration's handoff is the D-entry `- **Ledger:**` bullet, applied by
 * finish-iteration.mjs through applySets() below.
 */
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { measure, jsFiles, ROOT, TTY_FILES, SKIP_FILES, QUEUE_SKIP_FILES } from './lib/coverage.mjs';
import {
  LEDGER_DIR, STATUSES, LIVE_STATUSES, OPEN_STATUSES, readLedger, writeLedgerFiles,
  resolveKey, mergeD, clipOmit, parseLedgerText, serialize,
} from './lib/ledger-io.mjs';

const CACHE_DIR = join(ROOT, '.cache');
const DB_PATH = join(CACHE_DIR, 'ledger.db');
const QUEUE_PATH = join(ROOT, 'docs/LOOP-QUEUE.md');
const INDEX_PATH = join(ROOT, 'docs/DIVERGENCE-INDEX.md');
const SNAP_PATH = join(LEDGER_DIR, 'SNAPSHOTS.tsv');
const C_DIRS = ['nethack-c/upstream/src', 'nethack-c/upstream/win/tty'].map((d) => join(ROOT, d));
export const BLOCK_BEGIN = '<!-- coverage:begin -->';
export const BLOCK_END = '<!-- coverage:end -->';
export const QUEUE_TARGET = 12;
const DEFAULT_MIN_C = 8;

/* ---------------- cache ---------------- */
function treeKey() {
  const h = createHash('sha1');
  const add = (abs) => { const s = statSync(abs); h.update(`${abs}\0${s.size}\0${s.mtimeMs}\n`); };
  for (const d of C_DIRS) for (const f of readdirSync(d).filter((x) => x.endsWith('.c')).sort()) add(join(d, f));
  for (const f of jsFiles()) add(f);
  if (existsSync(LEDGER_DIR)) for (const f of readdirSync(LEDGER_DIR).filter((x) => x.endsWith('.jsonl')).sort()) add(join(LEDGER_DIR, f));
  h.update('v1');
  return h.digest('hex');
}

async function openDb() {
  const { DatabaseSync } = await import('node:sqlite');
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  return new DatabaseSync(DB_PATH);
}

const SCHEMA = `
DROP VIEW IF EXISTS fn; DROP TABLE IF EXISTS m; DROP TABLE IF EXISTS ledger;
DROP TABLE IF EXISTS jsdef; DROP TABLE IF EXISTS edge; DROP TABLE IF EXISTS meta;
CREATE TABLE meta(k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE m(file TEXT, fn TEXT, start INT, "end" INT, alts TEXT, c_raw INT, c_code INT,
  js_code INT, ratio REAL, cover TEXT, js_where TEXT, rng INT, out INT, map INT, calls INT,
  files INT, hops INT, mentions INT, dead TEXT, score REAL, PRIMARY KEY(file, fn));
CREATE TABLE ledger(file TEXT, fn TEXT, status TEXT, c TEXT, js TEXT, omit TEXT, d TEXT,
  at TEXT, note TEXT, seeded INT, PRIMARY KEY(file, fn));
CREATE TABLE jsdef(name TEXT, file TEXT, line INT, end_line INT, code INT, exported INT);
CREATE TABLE edge(caller TEXT, callee TEXT);
CREATE INDEX edge_callee ON edge(callee);
CREATE VIEW fn AS SELECT m.*, ledger.status, ledger.js, ledger.omit, ledger.d, ledger.at,
  ledger.note, ledger.seeded FROM m LEFT JOIN ledger USING(file, fn);
`;

function writeDb(db, key, meas, ledger) {
  db.exec(SCHEMA);
  db.exec('BEGIN');
  const im = db.prepare('INSERT INTO m VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
  for (const r of meas.rows) {
    im.run(r.file, r.fn, r.start, r.end, r.alts.join(' '), r.cRaw, r.cCode, r.jsCode, r.ratio, r.cover,
      r.jsWhere.join(' '), r.rng, r.out, r.map, r.calls, r.files, r.hops, r.mentions, r.dead.join(' '), r.score);
  }
  const il = db.prepare('INSERT OR REPLACE INTO ledger VALUES (?,?,?,?,?,?,?,?,?,?)');
  for (const l of ledger.values()) {
    il.run(l.file, l.fn, l.status, l.c || '', (l.js || []).join(' '), l.omit || '', (l.d || []).join(' '),
      l.at || '', l.note || '', String(l.at || '').startsWith('seed@') ? 1 : 0);
  }
  const ij = db.prepare('INSERT INTO jsdef VALUES (?,?,?,?,?,?)');
  for (const d of meas.jsDefs) ij.run(d.name, d.file, d.line, d.endLine, d.code, d.exported ? 1 : 0);
  const ie = db.prepare('INSERT INTO edge VALUES (?,?)');
  for (const [a, b] of meas.edges) ie.run(a, b);
  db.prepare('INSERT INTO meta VALUES (?,?)').run('key', key);
  db.prepare('INSERT INTO meta VALUES (?,?)').run('built_at', new Date().toISOString());
  db.prepare('INSERT INTO meta VALUES (?,?)').run('head', head());
  db.exec('COMMIT');
}

function readDb(db) {
  const rows = db.prepare('SELECT * FROM m').all().map((r) => ({
    key: `${r.file}:${r.fn}`, file: r.file, fn: r.fn, start: r.start, end: r.end,
    alts: r.alts ? r.alts.split(' ') : [], cRaw: r.c_raw, cCode: r.c_code, jsCode: r.js_code,
    ratio: r.ratio, cover: r.cover, jsWhere: r.js_where ? r.js_where.split(' ') : [],
    rng: r.rng, out: r.out, map: r.map, calls: r.calls, files: r.files, hops: r.hops,
    mentions: r.mentions, dead: r.dead ? r.dead.split(' ') : [], score: r.score,
  }));
  const jsDefs = db.prepare('SELECT * FROM jsdef').all().map((d) => ({
    name: d.name, file: d.file, line: d.line, endLine: d.end_line, code: d.code, exported: !!d.exported,
  }));
  return { rows, jsDefs, edges: null };
}

let loaded = null;
/** Measured rows + jsDefs + ledger; rebuilds .cache/ledger.db when the tree changed. */
export async function load({ force = false } = {}) {
  if (loaded && !force) return loaded;
  const ledger = readLedger();
  const key = treeKey();
  let db = null;
  try { db = await openDb(); } catch { db = null; }
  let meas = null;
  if (db && !force) {
    try {
      const hit = db.prepare("SELECT v FROM meta WHERE k='key'").get();
      if (hit && hit.v === key) meas = readDb(db);
    } catch { meas = null; }
  }
  if (!meas) {
    meas = measure(ledger);
    if (db) { try { writeDb(db, key, meas, ledger); } catch (e) { console.error(`ledger cache not written: ${e.message}`); } }
  }
  if (db) db.close();
  const byKey = new Map(meas.rows.map((r) => [r.key, r]));
  loaded = { ...meas, ledger, byKey };
  return loaded;
}
function invalidate() { loaded = null; }

let headCache = null;
export function head() {
  if (headCache) return headCache;
  try { headCache = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { headCache = 'HEAD'; }
  return headCache;
}
const today = () => new Date().toISOString().slice(0, 10);

/* ---------------- set ---------------- */
/**
 * Apply declarations. entries: [{spec, status, js?:[], omit?, d?:[], note?}].
 * Returns {ok:[key…], errors:[msg…]}; writes nothing when any entry errors.
 */
export async function applySets(entries, { at, dryRun = false } = {}) {
  const L = await load();
  const keys = new Set(L.byKey.keys());
  const jsSet = new Set(L.jsDefs.map((d) => `${d.file}:${d.name}`));
  const errors = [];
  const staged = [];
  for (const e0 of entries) {
    const r = resolveKey(e0.spec, keys);
    if (r.error) { errors.push(r.error); continue; }
    const m = L.byKey.get(r.key);
    const prev = L.ledger.get(r.key) || { file: m.file, fn: m.fn };
    let e = e0;
    /* `audited`: a batch re-read the live body against C and found it whole;
       the status stays, the note records the audit so batches skip it. */
    if (e.status === 'audited') {
      if (!LIVE_STATUSES.has(prev.status)) { errors.push(`${e.spec}: audited needs a live status (is ${prev.status || 'unknown'}) — declare ported/partial instead`); continue; }
      e = { ...e, status: prev.status, omit: e.omit || prev.omit || '', note: e.note ?? `audited ${(e.d || [])[0] || today()}: ${prev.status === 'partial' ? 'remaining omit cannot ship' : 'whole vs C'}` };
    }
    if (!STATUSES.includes(e.status)) { errors.push(`${e.spec}: unknown status "${e.status}" (${STATUSES.join(' ')} | audited)`); continue; }
    let js = e.js && e.js.length ? e.js : null;
    if (js) {
      const bad = js.filter((j) => !jsSet.has(j));
      if (bad.length) { errors.push(`${e.spec}: no js/ function ${bad.join(', ')} (form js/file.js:name)`); continue; }
    } else if (LIVE_STATUSES.has(e.status)) {
      const same = L.jsDefs.filter((d) => d.name === m.fn);
      const files = [...new Set(same.map((d) => d.file))];
      if (files.length === 1) js = [`${files[0]}:${m.fn}`];
      else if (prev.js && prev.js.length) js = prev.js;
      else { errors.push(`${e.spec}: ${e.status} needs --js (${files.length ? `same name in ${files.join(', ')}` : 'no same-named js/ function'})`); continue; }
    }
    const row = {
      ...prev, file: m.file, fn: m.fn, c: `${m.start}-${m.end}`, status: e.status,
      js: LIVE_STATUSES.has(e.status) ? js : (js || []),
      omit: e.omit != null ? clipOmit(e.omit) : (e.status === 'ported' || e.status === 'parity' ? '' : prev.omit || ''),
      d: mergeD(prev.d, e.d || []),
      at: at || `${today()}@${head()}`,
      note: e.note != null ? clipOmit(e.note) : prev.note || '',
    };
    staged.push([r.key, row]);
  }
  if (errors.length) return { ok: [], errors };
  if (dryRun) return { ok: staged.map(([k]) => k), rows: staged.map(([, r]) => r), errors: [] };
  const files = new Set();
  for (const [k, row] of staged) { L.ledger.set(k, row); files.add(row.file); }
  writeLedgerFiles(L.ledger, files);
  invalidate();
  return { ok: staged.map(([k]) => k), rows: staged.map(([, r]) => r), errors: [] };
}

/**
 * Parse a D-entry `- **Ledger:**` bullet:
 *   "set_corn ported; foo.c:bar partial js=mklev.js:bar+mklev.js:bar_core"
 * → [{spec, status, js}] or {error}.
 */
export function parseLedgerBullet(text) {
  const out = [];
  for (const part of String(text || '').replace(/`/g, '').split(';').map((s) => s.trim()).filter(Boolean)) {
    const toks = part.split(/\s+/);
    const [spec, status, ...more] = toks;
    if (!spec || !status) return { error: `Ledger bullet item "${part}" needs "<fn> <status>"` };
    let js = null;
    for (const t of more) {
      const m = /^js=(.+)$/.exec(t);
      if (!m) return { error: `Ledger bullet item "${part}": unexpected "${t}" (only js=file.js:sym+…)` };
      js = m[1].split('+').map((s) => (s.startsWith('js/') ? s : `js/${s}`));
    }
    out.push({ spec, status: status.replace(/[.,]$/, ''), js });
  }
  if (!out.length) return { error: 'empty Ledger bullet' };
  return out;
}

/* ---------------- queue block ---------------- */
const pairRx = /`([\w.-]+\.c)`\s+`?([A-Za-z_]\w*)`?/g;
function queueKnowledge(text) {
  const live = new Set();
  const parked = new Set();
  const block = [];
  const blockLines = new Map();
  let sec = '';
  let inBlock = false;
  for (const line of text.split('\n')) {
    if (line.includes(BLOCK_BEGIN)) { inBlock = true; continue; }
    if (line.includes(BLOCK_END)) { inBlock = false; continue; }
    if (/^## /.test(line)) { sec = /^## (Must-fix|Open)/.test(line) ? 'live' : /^## Parked/.test(line) ? 'parked' : ''; continue; }
    if (inBlock) {
      if (/^- \[ \]/.test(line)) {
        const m = /`([\w.-]+\.c)`\s+`?([A-Za-z_]\w*)`?/.exec(line);
        if (m) { block.push(`${m[1]}:${m[2]}`); blockLines.set(`${m[1]}:${m[2]}`, line); }
      }
      continue;
    }
    if (sec === 'live' && /^- \[ \]/.test(line)) for (const m of line.matchAll(pairRx)) live.add(m[2]);
    if (sec === 'parked' && /^- /.test(line)) for (const m of line.matchAll(pairRx)) parked.add(m[2]);
  }
  return { live, parked, block, blockLines };
}

function rowLine(r, led, sha) {
  const js = r.jsWhere.length ? `${r.jsCode} code L in ${r.jsWhere[0].split(':')[0]}` : 'no symbol';
  const dead = r.dead.length ? `; dead callees: ${r.dead.slice(0, 6).join(', ')}${r.dead.length > 6 ? ', …' : ''}` : '';
  const split = r.cover === 'MISSING' && r.mentions > 20 ? `; split? cited ${r.mentions}× in js/ — brief first` : '';
  const part = led && led.status === 'partial' ? `; declared partial: ${String(led.omit || '').slice(0, 140)}` : '';
  return `- [ ] \`${r.file}\` ${r.fn} — coverage ${r.cover} (C ${r.cCode} code L \`${r.file}:${r.start}–${r.end}\` / JS ${js}; `
    + `hops ${r.hops === 9 ? '—' : r.hops}, callers ${r.calls}, RNG ${r.rng}, msg ${r.out}${dead}${split}${part}) @${sha}`;
}

/** Ranked eligible rows. `stableKeys` (existing block order) are kept first while still eligible. */
/**
 * Primary pool: status absent/scaffold, or unknown with no D-history.
 * Secondary pool (fills only when the primary is short, or with --partial):
 * `partial` rows not marked `blocked:`, and `unknown` rows an earlier
 * D-entry already touched (the "done/parked history" refills skipped by hand).
 * win/tty, no-analogue files and save/restore/files plumbing are skipped
 * unless declared absent/scaffold, or with --all.
 */
export async function eligibleRows({ n = QUEUE_TARGET, minC = DEFAULT_MIN_C, partial = false, all = false, queueText = null, stable = false } = {}) {
  const L = await load();
  const text = queueText ?? (existsSync(QUEUE_PATH) ? readFileSync(QUEUE_PATH, 'utf8') : '');
  const { live, parked, block, blockLines } = queueKnowledge(text);
  const led = (r) => L.ledger.get(r.key) || { status: 'unknown' };
  const base = (r) => {
    if (r.cover === 'ok' || live.has(r.fn) || parked.has(r.fn)) return false;
    const s = led(r).status;
    return all || s === 'absent' || s === 'scaffold'
      || !(TTY_FILES.has(r.file) || SKIP_FILES.has(r.file) || QUEUE_SKIP_FILES.has(r.file));
  };
  const big = (r) => r.cCode >= minC || r.dead.length > 0;
  const primary = (r) => {
    const l = led(r);
    return base(r) && big(r) && (l.status === 'absent' || l.status === 'scaffold' || (l.status === 'unknown' && !(l.d || []).length));
  };
  const partialOk = (r) => {
    const l = led(r);
    if (!base(r) || !big(r)) return false;
    if (l.status === 'partial') return !String(l.omit || '').startsWith('blocked:');
    return l.status === 'unknown' && (l.d || []).length > 0;
  };
  const out = [];
  const seen = new Set();
  const push = (r) => { if (!seen.has(r.key) && out.length < n) { seen.add(r.key); out.push(r); } };
  if (stable) for (const k of block) { const r = L.byKey.get(k); if (r && (primary(r) || partialOk(r))) push(r); }
  const ranked = L.rows.slice().sort((a, b) => b.score - a.score);
  if (!partial) for (const r of ranked) if (primary(r)) push(r);
  for (const r of ranked) if (partialOk(r)) push(r);
  /* A kept row keeps its enqueue-time line (measured @sha) verbatim: no churn. */
  return out.map((r) => ({ r, line: (stable && blockLines.get(r.key)) || rowLine(r, L.ledger.get(r.key), head()) }));
}

/** Regenerate the LOOP-QUEUE coverage block in place. Returns {changed, count} or {error}. */
export async function writeQueueBlock({ n = QUEUE_TARGET, minC = DEFAULT_MIN_C, dryRun = false } = {}) {
  if (!existsSync(QUEUE_PATH)) return { error: 'docs/LOOP-QUEUE.md missing' };
  const text = readFileSync(QUEUE_PATH, 'utf8');
  const a = text.indexOf(BLOCK_BEGIN), b = text.indexOf(BLOCK_END);
  if (a < 0 || b < a) return { error: `no ${BLOCK_BEGIN} … ${BLOCK_END} markers in docs/LOOP-QUEUE.md` };
  const rows = await eligibleRows({ n, minC, queueText: text, stable: true });
  const body = rows.map((x) => x.line).join('\n');
  const next = `${text.slice(0, a + BLOCK_BEGIN.length)}\n${body}${body ? '\n' : ''}${text.slice(b)}`;
  const changed = next !== text;
  if (changed && !dryRun) writeFileSync(QUEUE_PATH, next);
  return { changed, count: rows.length };
}

/* ---------------- batch (2026-10-03) ---------------- */
/**
 * One port iteration = one batch: the whole remaining gap of the C file
 * with the highest summed reach × loudness, then the next files, until the
 * batch holds BATCH_MIN functions or BATCH_GAP_LINES estimated C lines of
 * work, never more than BATCH_MAX functions. A function is in the gap when
 *   open    — unknown/absent/scaffold and not measured ok,
 *   partial — declared partial (omit not `blocked:`, never audited: an
 *             `audited` partial names only omissions that cannot ship),
 *   recheck — ported/split but measured THIN/PARTIAL, never audited or
 *             stale-retired (finish `audited`, `stale:` notes).
 * Parked functions, win/tty, no-analogue and binary-save files are skipped
 * unless their file is named on the command line.
 */
export const BATCH_MAX = 100;
const BATCH_MIN = 40;
const BATCH_GAP_LINES = 1500;
export const BATCH_PATH = join(CACHE_DIR, 'batch.json');

function gapKind(r, l) {
  const s = l ? l.status : 'unknown';
  if (OPEN_STATUSES.has(s)) return r.cover === 'ok' ? 'recheck' : 'open';
  if (s === 'partial') return String(l.omit || '').startsWith('blocked:') || /^audited/.test(String(l.note || '')) ? null : 'partial';
  if ((s === 'ported' || s === 'split') && (r.cover === 'THIN' || r.cover === 'PARTIAL')) {
    return /^(audited|stale)/.test(String(l.note || '')) ? null : 'recheck';
  }
  return null;
}
const gapLines = (r, kind) => (kind === 'open' ? r.cCode : kind === 'partial' ? Math.ceil(r.cCode * 0.4) : Math.max(0, r.cCode - r.jsCode));

export async function pickBatch({ files = [], max = BATCH_MAX } = {}) {
  const L = await load();
  const text = existsSync(QUEUE_PATH) ? readFileSync(QUEUE_PATH, 'utf8') : '';
  const { parked } = queueKnowledge(text);
  const named = new Set(files);
  const byFile = new Map();
  for (const r of L.rows) {
    if (parked.has(r.fn)) continue;
    if (!named.size && (TTY_FILES.has(r.file) || SKIP_FILES.has(r.file) || QUEUE_SKIP_FILES.has(r.file))) continue;
    if (named.size && !named.has(r.file)) continue;
    const kind = gapKind(r, L.ledger.get(r.key));
    if (!kind) continue;
    const e = byFile.get(r.file) || { file: r.file, score: 0, lines: 0, fns: [] };
    e.score += r.score; e.lines += gapLines(r, kind);
    e.fns.push({ key: r.key, file: r.file, fn: r.fn, kind, c: `${r.start}-${r.end}`, cCode: r.cCode, jsCode: r.jsCode,
      cover: r.cover, status: (L.ledger.get(r.key) || {}).status || 'unknown', omit: (L.ledger.get(r.key) || {}).omit || '' });
    byFile.set(r.file, e);
  }
  const order = named.size ? files.map((f) => byFile.get(f)).filter(Boolean)
    : [...byFile.values()].sort((a, b) => b.score - a.score || b.fns.length - a.fns.length);
  const out = [];
  let lines = 0;
  for (const e of order) {
    if (out.length >= max) break;
    if (!named.size && out.length >= BATCH_MIN && lines >= BATCH_GAP_LINES) break;
    for (const f of e.fns.sort((a, b) => parseInt(a.c, 10) - parseInt(b.c, 10))) {
      if (out.length >= max) break;
      out.push(f); lines += gapLines({ cCode: f.cCode, jsCode: f.jsCode }, f.kind);
    }
  }
  return { at: new Date().toISOString(), head: head(), files: [...new Set(out.map((f) => f.file))], gapLines: lines, fns: out };
}

/** The batch manifest finish-iteration reconciles against, or null. */
export function readBatch() {
  if (!existsSync(BATCH_PATH)) return null;
  try { return JSON.parse(readFileSync(BATCH_PATH, 'utf8')); } catch { return null; }
}

/* ---------------- check ---------------- */
export async function runCheck({ verbose = false } = {}) {
  const L = await load();
  const fails = [];
  const warns = [];
  const jsSet = new Set(L.jsDefs.map((d) => `${d.file}:${d.name}`));
  const dIds = existsSync(INDEX_PATH)
    ? new Set([...readFileSync(INDEX_PATH, 'utf8').matchAll(/^\| (D-\d{4}) \|/gm)].map((m) => m[1])) : new Set();
  if (existsSync(LEDGER_DIR)) {
    for (const name of readdirSync(LEDGER_DIR).filter((f) => f.endsWith('.jsonl'))) {
      const text = readFileSync(join(LEDGER_DIR, name), 'utf8');
      let rows;
      try { rows = parseLedgerText(text, name); } catch (e) { fails.push(e.message); continue; }
      const fns = new Set();
      for (const r of rows) { if (fns.has(r.fn)) fails.push(`${name}: duplicate ${r.fn}`); fns.add(r.fn); }
      if (serialize(rows) !== text) fails.push(`${name}: not canonical (node scripts/ledger.mjs fmt)`);
    }
  }
  const lowRatio = [];
  const noJs = [];
  for (const [k, l] of L.ledger) {
    const m = L.byKey.get(k);
    if (!m) { fails.push(`${k}: no such pinned-C definition`); continue; }
    if (!STATUSES.includes(l.status)) fails.push(`${k}: invalid status ${l.status}`);
    const seeded = String(l.at || '').startsWith('seed@');
    for (const j of l.js || []) if (!jsSet.has(j)) fails.push(`${k}: js ${j} does not exist`);
    if (LIVE_STATUSES.has(l.status) && !(l.js || []).length) {
      if (seeded) noJs.push(k); else fails.push(`${k}: ${l.status} without js location`);
    }
    for (const d of l.d || []) if (!dIds.has(d)) fails.push(`${k}: ${d} not in DIVERGENCE-INDEX.md`);
    if (l.c && l.c !== `${m.start}-${m.end}`) fails.push(`${k}: c ${l.c} ≠ pinned ${m.start}-${m.end} (node scripts/ledger.mjs sync)`);
    if ((l.status === 'ported' || l.status === 'parity') && m.cCode >= 8 && m.ratio < 0.3) lowRatio.push(`${k} ${m.jsCode}/${m.cCode}`);
  }
  const missing = [...L.byKey.keys()].filter((k) => !L.ledger.has(k));
  if (missing.length) fails.push(`${missing.length} C definition(s) without a ledger row, e.g. ${missing.slice(0, 3).join(', ')} (node scripts/ledger.mjs sync)`);
  if (noJs.length) warns.push(`${noJs.length} seeded live row(s) without js location${verbose ? `: ${noJs.join(', ')}` : ` — e.g. ${noJs.slice(0, 3).join(', ')}`}`);
  if (lowRatio.length) warns.push(`${lowRatio.length} ported row(s) with code ratio < 0.3 (audit reading list)${verbose ? `: ${lowRatio.join('; ')}` : ` — e.g. ${lowRatio.slice(0, 5).join('; ')}`}`);
  return { fails, warns };
}

/* ---------------- summary ---------------- */
export async function summaryCounts() {
  const L = await load();
  const st = {};
  const cv = {};
  let seeded = 0;
  for (const r of L.rows) {
    const l = L.ledger.get(r.key);
    const s = l ? l.status : 'unknown';
    st[s] = (st[s] || 0) + 1;
    cv[r.cover] = (cv[r.cover] || 0) + 1;
    if (l && String(l.at || '').startsWith('seed@') && s !== 'unknown') seeded++;
  }
  return { total: L.rows.length, st, cv, seeded };
}
export async function summaryLine() {
  const { total, st, cv, seeded } = await summaryCounts();
  const s = (k) => st[k] || 0;
  return `Ledger @${head()}: ${total} pinned-C functions — ported ${s('ported') + s('parity')} · partial ${s('partial')} · split ${s('split')} · `
    + `by-design ${s('by-design') + s('frozen')} · open ${s('unknown') + s('absent') + s('scaffold')} (${seeded} declared by seed). `
    + `Measured: ok ${cv.ok || 0}, partial ${cv.PARTIAL || 0}, thin ${cv.THIN || 0}, missing ${cv.MISSING || 0}. `
    + '`node scripts/ledger.mjs summary`.';
}

/* ---------------- CLI ---------------- */
function fmtShow(r, l) {
  const st = l ? l.status : 'unknown';
  const js = (l && l.js && l.js.length ? l.js : r.jsWhere).join(' ') || '—';
  const d = l && l.d && l.d.length ? ` ${l.d.slice(0, 3).join(',')}` : '';
  const om = l && l.omit ? `  omit: ${l.omit.slice(0, 160)}` : '';
  const nt = l && l.note ? `  note: ${l.note.slice(0, 100)}` : '';
  return `${`${r.file}:${r.fn}`.padEnd(34)} ${st.padEnd(9)} ${js.padEnd(38)} C ${r.cCode}/JS ${r.jsCode} ${r.cover}${d}${om}${nt}`;
}

function opt(argv, k, d) { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] != null ? argv[i + 1] : d; }
const flag = (argv, k) => argv.includes(k);

async function main(argv) {
  const cmd = argv[0];
  const rest = argv.slice(1);
  const pos = [];
  for (let i = 0; i < rest.length; i++) {
    if (rest[i].startsWith('--')) { if (['--js', '--omit', '--d', '--note', '--min-c-lines', '--top', '--max'].includes(rest[i])) i++; continue; }
    pos.push(rest[i]);
  }
  switch (cmd) {
    case 'build': {
      const t = Date.now();
      await load({ force: true });
      console.log(`built ${relative(ROOT, DB_PATH)} in ${Date.now() - t} ms`);
      return 0;
    }
    case 'show': {
      const L = await load();
      const keys = new Set(L.byKey.keys());
      let rc = 0;
      for (const spec of pos) {
        const r = resolveKey(spec, keys);
        if (r.error) {
          const multi = [...keys].filter((k) => k.endsWith(`:${spec}`));
          if (multi.length > 1) { for (const k of multi) console.log(fmtShow(L.byKey.get(k), L.ledger.get(k))); continue; }
          console.log(`${spec.padEnd(34)} (${r.error})`); rc = 1; continue;
        }
        console.log(fmtShow(L.byKey.get(r.key), L.ledger.get(r.key)));
      }
      return rc;
    }
    case 'file': {
      const L = await load();
      const f = pos[0];
      const rows = L.rows.filter((r) => r.file === f).sort((a, b) => a.start - b.start);
      if (!rows.length) { console.log(`${f}: no pinned-C functions`); return 1; }
      const c = {};
      for (const r of rows) { const s = (L.ledger.get(r.key) || { status: 'unknown' }).status; c[s] = (c[s] || 0) + 1; }
      console.log(`${f}: ${rows.length} functions — ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
      for (const r of rows) console.log(`  :${String(r.start).padEnd(5)} ${fmtShow(r, L.ledger.get(r.key))}`);
      return 0;
    }
    case 'rows': {
      const n = parseInt(pos[0] || String(QUEUE_TARGET), 10);
      const minC = parseInt(opt(rest, '--min-c-lines', String(DEFAULT_MIN_C)), 10);
      if (flag(rest, '--write')) {
        const r = await writeQueueBlock({ n, minC });
        if (r.error) { console.error(r.error); return 1; }
        console.log(`coverage block: ${r.count} row(s)${r.changed ? ' (rewritten)' : ' (unchanged)'}`);
        return 0;
      }
      const rows = await eligibleRows({ n, minC, partial: flag(rest, '--partial'), all: flag(rest, '--all') });
      for (const x of rows) console.log(x.line);
      console.error(`${rows.length} row(s); status unknown/absent/scaffold${flag(rest, '--partial') ? ' + partial' : ''}, measured gap, C ≥ ${minC} code lines or dead callees.`);
      return 0;
    }
    case 'batch': {
      const max = parseInt(opt(rest, '--max', String(BATCH_MAX)), 10);
      const b = await pickBatch({ files: pos, max });
      if (!b.fns.length) { console.log(`batch: no gap left${pos.length ? ` in ${pos.join(' ')}` : ''} (open/partial/recheck)`); return 1; }
      const n = (k) => b.fns.filter((f) => f.kind === k).length;
      console.log(`batch @${b.head}: ${b.fns.length} function(s) in ${b.files.join(', ')} — open ${n('open')} · partial ${n('partial')} · recheck ${n('recheck')} · ~${b.gapLines} C lines of gap`);
      for (const f of b.fns) {
        const om = f.omit ? `  omit: ${f.omit.slice(0, 120)}` : '';
        console.log(`  ${f.kind.padEnd(7)} ${`${f.file}:${f.fn}`.padEnd(40)} C ${f.c.padEnd(11)} C ${f.cCode}/JS ${f.jsCode} ${f.cover.padEnd(7)} ${f.status}${om}`);
      }
      if (flag(rest, '--write')) {
        writeFileSync(BATCH_PATH, JSON.stringify(b, null, 1) + '\n');
        console.log(`\nmanifest: ${relative(ROOT, BATCH_PATH)} — finish-iteration requires each function in the D-entry \`Ledger:\` bullet (ported | partial | split | by-design | audited) or in \`Left open:\` with a reason.`);
      }
      console.log(`verify: node scripts/verify.mjs --fn ${b.fns.map((f) => f.fn).join(',')}`);
      return 0;
    }
    case 'set': {
      const [spec, status] = pos;
      if (!spec || !status) { console.error('usage: ledger.mjs set <fn|file.c:fn> <status> [--js …] [--omit …] [--d D-NNNN] [--note …]'); return 2; }
      const js = opt(rest, '--js', null);
      const d = opt(rest, '--d', null);
      const res = await applySets([{
        spec, status, js: js ? js.split(',').map((s) => s.trim()).filter(Boolean) : null,
        omit: opt(rest, '--omit', null), d: d ? d.split(',').map((s) => s.trim()) : [], note: opt(rest, '--note', null),
      }]);
      if (res.errors.length) { for (const e of res.errors) console.error(`error: ${e}`); return 1; }
      const L = await load();
      for (const k of res.ok) console.log(fmtShow(L.byKey.get(k), L.ledger.get(k)));
      if (!flag(rest, '--no-queue') && existsSync(QUEUE_PATH) && readFileSync(QUEUE_PATH, 'utf8').includes(BLOCK_BEGIN)) {
        const q = await writeQueueBlock();
        if (!q.error) console.log(`coverage block: ${q.count} row(s)${q.changed ? ' (rewritten)' : ''}`);
      }
      return 0;
    }
    case 'summary': {
      const L = await load();
      console.log(await summaryLine());
      const { st, cv } = await summaryCounts();
      const covers = ['ok', 'PARTIAL', 'THIN', 'MISSING'];
      console.log(`\n${'status'.padEnd(10)} ${covers.map((c) => c.padStart(8)).join('')}   total`);
      for (const s of STATUSES) {
        if (!st[s]) continue;
        const n = (c) => L.rows.filter((r) => (L.ledger.get(r.key) || { status: 'unknown' }).status === s && r.cover === c).length;
        console.log(`${s.padEnd(10)} ${covers.map((c) => String(n(c)).padStart(8)).join('')}   ${st[s]}`);
      }
      console.log(`${'measured'.padEnd(10)} ${covers.map((c) => String(cv[c] || 0).padStart(8)).join('')}   ${L.rows.length}`);
      if (flag(rest, '--by-file')) {
        const byFile = new Map();
        for (const r of L.rows) {
          const s = (L.ledger.get(r.key) || { status: 'unknown' }).status;
          const e = byFile.get(r.file) || { n: 0, done: 0, open: 0, ok: 0 };
          e.n++;
          if (['ported', 'parity', 'split', 'by-design', 'frozen'].includes(s)) e.done++;
          if (OPEN_STATUSES.has(s)) e.open++;
          if (r.cover === 'ok') e.ok++;
          byFile.set(r.file, e);
        }
        console.log(`\n${'file'.padEnd(18)}    fns declared-done   open  measured-ok`);
        for (const [f, e] of [...byFile].sort((a, b) => b[1].open - a[1].open)) {
          console.log(`${f.padEnd(18)} ${String(e.n).padStart(6)} ${String(e.done).padStart(8)} (${String(Math.round((100 * e.done) / e.n)).padStart(3)}%) ${String(e.open).padStart(6)} ${String(e.ok).padStart(8)}`);
        }
      }
      const top = parseInt(opt(rest, '--top', '0'), 10);
      if (top) {
        const rows = await eligibleRows({ n: top, minC: 0 });
        console.log(`\n| # | C function | C file:line | C code | JS | hops | callers | RNG | msg | score |\n|--:|---|---|--:|---|--:|--:|--:|--:|--:|`);
        rows.forEach(({ r }, i) => console.log(`| ${i + 1} | \`${r.fn}\` | \`${r.file}:${r.start}\` | ${r.cCode} | ${r.cover}${r.jsCode ? ` ${r.jsCode}L` : ''} | ${r.hops === 9 ? '—' : r.hops} | ${r.calls} | ${r.rng} | ${r.out} | ${r.score.toFixed(1)} |`));
      }
      if (flag(rest, '--snapshot')) {
        const s = (k) => st[k] || 0;
        if (!existsSync(SNAP_PATH)) writeFileSync(SNAP_PATH, 'date\tsha\ttotal\tported\tpartial\tsplit\tby_design\topen\tmeasured_ok\tpartial_m\tthin\tmissing\n');
        appendFileSync(SNAP_PATH, [today(), head(), L.rows.length, s('ported') + s('parity'), s('partial'), s('split'),
          s('by-design') + s('frozen'), s('unknown') + s('absent') + s('scaffold'), cv.ok || 0, cv.PARTIAL || 0, cv.THIN || 0, cv.MISSING || 0].join('\t') + '\n');
        console.log(`\nsnapshot appended to ${relative(ROOT, SNAP_PATH)}`);
      }
      return 0;
    }
    case 'check': {
      const { fails, warns } = await runCheck({ verbose: flag(rest, '--verbose') });
      for (const f of fails.slice(0, 40)) console.log(`FAIL ${f}`);
      if (fails.length > 40) console.log(`FAIL … ${fails.length - 40} more`);
      for (const w of warns) console.log(`warn ${w}`);
      console.log(fails.length ? `ledger check: ${fails.length} FAIL` : 'ledger check: ok');
      return fails.length ? 1 : 0;
    }
    case 'fmt': {
      let bad = 0;
      for (const name of existsSync(LEDGER_DIR) ? readdirSync(LEDGER_DIR).filter((f) => f.endsWith('.jsonl')) : []) {
        const p = join(LEDGER_DIR, name);
        const text = readFileSync(p, 'utf8');
        const out = serialize(parseLedgerText(text, name));
        if (out !== text) { bad++; if (!flag(rest, '--check')) writeFileSync(p, out); console.log(`${flag(rest, '--check') ? 'not canonical' : 'formatted'}: ${name}`); }
      }
      return flag(rest, '--check') && bad ? 1 : 0;
    }
    case 'sync': {
      const L = await load();
      const files = new Set();
      let added = 0, fixed = 0;
      for (const r of L.rows) {
        const l = L.ledger.get(r.key);
        const c = `${r.start}-${r.end}`;
        const alt = r.alts.length ? `alt ${r.alts.join(' ')}` : '';
        if (!l) {
          L.ledger.set(r.key, { file: r.file, fn: r.fn, c, status: 'unknown', note: alt });
          files.add(r.file); added++;
        } else if (l.c !== c) { l.c = c; files.add(r.file); fixed++; }
      }
      const orphans = [...L.ledger.keys()].filter((k) => !L.byKey.has(k));
      if (files.size) writeLedgerFiles(L.ledger, files);
      console.log(`sync: ${added} row(s) added, ${fixed} range(s) fixed, ${orphans.length} orphan row(s)${orphans.length ? `: ${orphans.slice(0, 5).join(', ')}` : ''}`);
      return orphans.length ? 1 : 0;
    }
    case 'sql': {
      await load();
      const db = await openDb();
      try {
        const q = pos.join(' ');
        if (!/^\s*(select|with|pragma table_info)\b/i.test(q)) { console.error('sql: read-only (SELECT/WITH) only'); return 2; }
        const rows = db.prepare(q).all();
        if (rows.length) console.log(Object.keys(rows[0]).join('\t'));
        for (const r of rows) console.log(Object.values(r).join('\t'));
        console.error(`${rows.length} row(s). Tables: m (measured), ledger, jsdef, edge; view fn = m ⋈ ledger.`);
      } finally { db.close(); }
      return 0;
    }
    case 'seed': {
      const { seed } = await import('./lib/ledger-seed.mjs');
      return seed({ dryRun: flag(rest, '--dry-run'), load, head });
    }
    default:
      {
        const src = readFileSync(new URL(import.meta.url), 'utf8').split('\n');
        console.log(src.slice(2, src.indexOf(' */')).map((l) => l.replace(/^ \*\/?\s?/, '')).join('\n'));
      }
      return cmd ? 2 : 0;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then((rc) => process.exit(rc || 0), (e) => { console.error(e.stack || e.message); process.exit(1); });
}
