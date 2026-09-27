/**
 * One-shot history import for the port ledger (`ledger.mjs seed`).
 * Precision over recall: a status is only claimed from a recorded
 * whole-function port (breadth-phase DONE row, full-range D-entry) or a
 * Stale park line; a line ratio never promotes a row. Everything else stays
 * `unknown`. Every row seeded here carries `at: seed@<sha>` so audits can
 * sample them apart from iteration-confirmed rows. Idempotent; never
 * overwrites a row an iteration declared (non-seed `at`).
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKIP_FILES, SKIP_FN } from './coverage.mjs';
import { writeLedgerFiles, mergeD, clipOmit, LIVE_STATUSES } from './ledger-io.mjs';

const rd = (rel) => (existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : '');

/* Former port-coverage.mjs BY_DESIGN set: save-file plumbing, dumplog,
   fuzzer, tty status-hilite menus (Constitution §1.5 Rule #2 / §1.6). */
const BY_DESIGN = [
  'getlev', 'savelev', 'dosave0', 'dorecover', 'restlevelfile', 'savestateinlock',
  'savegamestate', 'restgamestate', 'getlev_core', 'save_dungeon', 'restore_dungeon',
  'dump_everything', 'dump_plines', 'dump_redirect', 'dump_start_screendump',
  'fuzzer_savelife', 'do_fuzzer_savelife',
  'status_hilite_menu_add', 'status_hilite_menu_choose_behavior',
  'status_hilite_menu_fld', 'status_hilites_viewall', 'parse_status_hl1',
];
/* Skipped by hand in every 2026-09-19..27 refill: CURRENT.md "Do not" list
   (glyphmap reset, save-freeing, lua reset, DUMPLOG D-1776, filesystem
   compress/paniclog) and C runtime helpers. */
const DO_NOT = {
  NH_abort: 'C runtime', alloc: 'C runtime (GC)', dumplogmsg: 'DUMPLOG retired (D-1776)',
  dump_fmtstr: 'filesystem (CURRENT.md Do not)', relink_timers: 'save/restore file infra',
  currentlevel_rewrite: 'save file infra', writeentry: 'record file infra', freedynamicdata: 'save-freeing (CURRENT.md Do not)',
  docompress_file: 'external compressor (Rule #2)', reset_glyphmap: 'CURRENT.md Do not (fortress guard)',
  lspo_reset_level: 'CURRENT.md Do not (lua reset)', paniclog: 'filesystem (CURRENT.md Do not)',
  submit_web_report: 'network crash report (Rule #2)',
};
const BLOCKED = { notice_all_mons: 'blocked: CURRENT.md Do not (fortress guard; newgame arm live D-1200)' };
const SANITY_RX = /(^|_)sanity(_check)?$|^sanity_check|^insane_|_sanity_check$/;
const RNG_WRAPPERS = ['rn2', 'rnd', 'rn1', 'rne', 'rnz', 'rnl', 'rn2_on_display_rng'];

function statusClass(word) {
  const w = String(word || '').toLowerCase();
  if (/^(fixed|shipped)$/.test(w)) return 'ported';
  if (/partial/.test(w)) return 'partial';
  if (/stale/.test(w)) return 'stale';
  return null; // rejected / open / measured / parked / superseded / closed
}

/** D-log → Map id -> {status, js, named} (one streaming pass over the log). */
function parseDLog() {
  const text = rd('docs/DIVERGENCE-LOG.md');
  const out = new Map();
  const heads = [...text.matchAll(/^## (D-\d{4}) — /gm)];
  for (let i = 0; i < heads.length; i++) {
    const id = heads[i][1];
    if (out.has(id)) continue;
    const body = text.slice(heads[i].index, i + 1 < heads.length ? heads[i + 1].index : undefined);
    const bullet = (name) => {
      const m = new RegExp(`^- \\*\\*${name}:\\*\\*\\s*([\\s\\S]*?)(?=^- \\*\\*|\\n\\n|$)`, 'm').exec(body);
      return m ? m[1].replace(/\s*\n\s*/g, ' ').trim() : '';
    };
    const status = bullet('Status');
    out.set(id, {
      status: statusClass((/^([A-Za-z-]+)/.exec(status) || [])[1]),
      js: bullet('JS'),
      named: bullet('Named omissions'),
    });
  }
  return out;
}

export function firstSentence(t) {
  return String(t || '').split(/(?<=[.!?])\s+(?=[A-Z`*(])/)[0] || '';
}
/** "No arm of X is omitted." / "None …" → nothing named for this function. */
export function namesNoOmission(named) {
  const s = firstSentence(named).trim();
  if (!s || /^No\b[^.]*\bomitted\b/i.test(s) || /^None\b/i.test(s)) return true;
  /* Not missing C behaviour: a defensive guard where C would crash, a
     compiled-out arm, platform/file plumbing, or GC-for-free. */
  return /C would (dereference|crash|divide)|\bNONNULL|compiled out|`?#if(def|ndef)? |\bplatform\b|\bGC\b|allocation, not semantics|FILE-streaming|is not awaited/i.test(s)
    && !/\bstub\b|unported|not ported|stays unwired|still (missing|absent)/i.test(s);
}

export async function seed({ dryRun = false, load, head }) {
  const L = await load();
  const at = `seed@${head()}`;
  const jsByName = new Map();
  const jsSet = new Set();
  const jsByFile = new Map();
  for (const d of L.jsDefs) {
    jsSet.add(`${d.file}:${d.name}`);
    if (!jsByName.has(d.name)) jsByName.set(d.name, new Set());
    jsByName.get(d.name).add(d.file);
    if (!jsByFile.has(d.file)) jsByFile.set(d.file, []);
    jsByFile.get(d.file).push(d);
  }
  const indexIds = new Set([...rd('docs/DIVERGENCE-INDEX.md').matchAll(/^\| (D-\d{4}) \|/gm)].map((m) => m[1]));

  /** Best js location for fn: a named pair in the text, else a unique same-named def. */
  function locate(fn, text = '') {
    const pairs = [...String(text).matchAll(/`(js\/[\w/.-]+\.js)`\s+`?([A-Za-z_$][\w$]*)`?/g)];
    for (const [, f, s] of pairs) if (s === fn && jsSet.has(`${f}:${s}`)) return [`${f}:${s}`];
    const same = [...(jsByName.get(fn) || [])];
    if (same.length === 1) return [`${same[0]}:${fn}`];
    const mentioned = new Set(pairs.map((p) => p[1]).concat([...String(text).matchAll(/`?(js\/[\w/.-]+\.js)/g)].map((m) => m[1])));
    const inMentioned = same.filter((f) => mentioned.has(f));
    if (inMentioned.length === 1) return [`${inMentioned[0]}:${fn}`];
    if (same.length > 1) {
      const best = L.jsDefs.filter((d) => d.name === fn).reduce((a, b) => (b.code > a.code ? b : a));
      return [`${best.file}:${fn}`];
    }
    return [];
  }
  /** Function enclosing js/file.js:line (same name preferred). */
  function enclosing(fn, file, line) {
    if (jsSet.has(`${file}:${fn}`)) return [`${file}:${fn}`];
    const hit = (jsByFile.get(file) || []).filter((d) => d.line <= line && line <= d.endLine)
      .sort((a, b) => b.line - a.line)[0];
    return hit ? [`${file}:${hit.name}`] : locate(fn);
  }

  /* events: key -> {dEvents:[{n, status, js, omit}], stale:{js, note}, ds:Set} */
  const ev = new Map();
  const E = (key) => { if (!ev.has(key)) ev.set(key, { dEvents: [], stale: null, ds: new Set() }); return ev.get(key); };
  const dlog = parseDLog();
  const fromD = (key, id) => {
    const m = L.byKey.get(key);
    const e = dlog.get(id);
    if (!m || !e || !e.status) return;
    const cls = e.status === 'stale' ? 'ported' : e.status;
    const partial = cls === 'partial' || !namesNoOmission(e.named);
    E(key).dEvents.push({
      n: parseInt(id.slice(2), 10), status: partial ? 'partial' : 'ported',
      js: locate(m.fn, e.js), omit: partial ? clipOmit(firstSentence(e.named)) : '',
    });
  };

  /* 1. breadth-phase DONE coverage rows (whole-function mandate) + narrow rows (d only) */
  let nDone = 0;
  for (const line of rd('docs/archive/LOOP-QUEUE-DONE.md').split('\n')) {
    const m = /^- \[x\] `([\w.-]+\.c)` `?([A-Za-z_]\w*)`?(.*)$/.exec(line);
    if (!m) continue;
    const key = `${m[1]}:${m[2]}`;
    if (!L.byKey.has(key)) continue;
    const id = (/\*\*Addressed:\*\* (D-\d{4})/.exec(m[3]) || [])[1];
    if (!id) continue;
    E(key).ds.add(id);
    if (/^ — coverage (MISSING|THIN|PARTIAL)/.test(m[3])) { fromD(key, id); nDone++; }
  }

  /* 2. DIVERGENCE-INDEX rows citing a pinned range: full range = whole port, else d only */
  let nFull = 0;
  for (const line of rd('docs/DIVERGENCE-INDEX.md').split('\n')) {
    const id = (/^\| (D-\d{4}) \|/.exec(line) || [])[1];
    if (!id) continue;
    for (const m of line.matchAll(/upstream\/(?:src|win\/tty)\/([\w.-]+\.c):(\d+)[–-](\d+)\s+`?([A-Za-z_]\w*)/g)) {
      const key = `${m[1]}:${m[4]}`;
      const c = L.byKey.get(key);
      if (!c) continue;
      E(key).ds.add(id);
      const a = +m[2], b = +m[3];
      if (b === c.end && a >= c.start - 2 && a <= c.start + 1) { fromD(key, id); nFull++; }
    }
  }

  /* 3. Stale park lines (live index + archive): whole body already live */
  let nStale = 0;
  const staleText = [rd('docs/LOOP-QUEUE.md').split(/^## Parked/m)[1] || '', rd('docs/archive/LOOP-QUEUE-PARKED.md'),
    rd('docs/archive/LOOP-QUEUE-STALE.md')].join('\n');
  for (const line of staleText.split('\n')) {
    let m = /^- `([\w.-]+\.c)` `?([A-Za-z_]\w*)`? — STALE\b(.*)$/.exec(line);
    if (m) {
      const key = `${m[1]}:${m[2]}`;
      if (!L.byKey.has(key)) continue;
      const loc = /live `(js\/[\w/.-]+\.js):(\d+)/.exec(m[3]);
      const date = (/(\d{4}-\d{2}-\d{2})/.exec(m[3]) || [])[1] || '';
      E(key).stale = { js: loc ? enclosing(m[2], loc[1], +loc[2]) : locate(m[2], m[3]), note: `stale ${date}`.trim() };
      nStale++;
      continue;
    }
    m = /^- `([\w.-]+\.c)`:\s*(.+)$/.exec(line);
    if (!m) continue;
    for (const part of m[2].split(';')) {
      const names = part.trim().split('/');
      if (!names.every((s) => /^[A-Za-z_]\w*$/.test(s))) continue; // arm-qualified: not whole-function evidence
      for (const fn of names) {
        const key = `${m[1]}:${fn}`;
        if (!L.byKey.has(key) || E(key).stale) continue;
        E(key).stale = { js: locate(fn), note: 'stale (grouped)' };
        nStale++;
      }
    }
  }

  /* 4. resolve */
  const files = new Set();
  const counts = {};
  for (const r of L.rows) {
    const prev = L.ledger.get(r.key);
    if (prev && prev.status !== 'unknown' && !String(prev.at || '').startsWith('seed@')) { counts.kept = (counts.kept || 0) + 1; continue; }
    const row = { file: r.file, fn: r.fn, c: `${r.start}-${r.end}`, status: 'unknown', note: r.alts.length ? `alt ${r.alts.join(' ')}` : '' };
    const e = ev.get(r.key);
    const hasJs = jsByName.has(r.fn);
    if (e && (e.dEvents.length || e.stale)) {
      const newest = e.dEvents.sort((a, b) => b.n - a.n)[0];
      if (newest) {
        row.status = newest.status;
        row.js = newest.js.length ? newest.js : (e.stale ? e.stale.js : []);
        row.omit = newest.omit;
      } else {
        row.status = 'ported';
        row.js = e.stale.js;
        row.note = [row.note, e.stale.note].filter(Boolean).join('; ');
      }
    } else if (BLOCKED[r.fn] && hasJs) {
      row.status = 'partial'; row.js = locate(r.fn); row.omit = BLOCKED[r.fn];
    } else if (DO_NOT[r.fn] || BLOCKED[r.fn]) {
      row.status = 'by-design'; row.note = `seed: ${DO_NOT[r.fn] || BLOCKED[r.fn]}`;
    } else if (SKIP_FN.has(r.fn)) {
      row.status = 'by-design'; row.note = 'seed: C runtime/debug path (former SKIP_FN)';
    } else if (SANITY_RX.test(r.fn) && r.cover !== 'ok') {
      row.status = 'by-design'; row.note = 'seed: wizard sanity check (debug build path)';
    } else if (r.fn === 'makelevel' && jsSet.has('js/mklev.js:makelevel_ordinary')) {
      row.status = 'split'; row.js = ['js/mklev.js:makelevel', 'js/mklev.js:makelevel_ordinary'];
      row.note = 'seed: makelevel + makelevel_ordinary (former BY_DESIGN)';
    } else if (r.fn === 'vision_recalc' && hasJs) {
      row.status = 'ported'; row.js = locate(r.fn); row.note = 'seed: full C-order port (former BY_DESIGN)';
    } else if (RNG_WRAPPERS.includes(r.fn) && hasJs) {
      row.status = 'ported'; row.js = locate(r.fn); row.note = 'seed: RNG wrapper (former BY_DESIGN)';
    } else if (!hasJs && (SKIP_FILES.has(r.file) || SKIP_FN.has(r.fn) || BY_DESIGN.includes(r.fn) || RNG_WRAPPERS.includes(r.fn))) {
      row.status = 'by-design';
      row.note = [row.note, SKIP_FILES.has(r.file) ? 'seed: no scored analogue (file)' : 'seed: former BY_DESIGN/SKIP_FN'].filter(Boolean).join('; ');
    }
    if (e) row.d = mergeD([], [...e.ds].filter((d) => indexIds.has(d)));
    if (LIVE_STATUSES.has(row.status) && !(row.js || []).length) row.note = [row.note, 'seed: js location unresolved'].filter(Boolean).join('; ');
    if (row.status !== 'unknown' || (row.d && row.d.length)) row.at = at;
    counts[row.status] = (counts[row.status] || 0) + 1;
    L.ledger.set(r.key, row);
    files.add(r.file);
  }
  console.log(`seed: evidence — ${nDone} DONE coverage rows, ${nFull} full-range index citations, ${nStale} stale lines`);
  console.log(`seed: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
  if (dryRun) { console.log('seed: --dry-run, nothing written'); return 0; }
  writeLedgerFiles(L.ledger, files);
  console.log(`seed: wrote ${files.size} file(s) under docs/ledger/`);
  return 0;
}
