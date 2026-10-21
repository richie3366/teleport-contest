/**
 * Re-read pass (Constitution §10.22, branch `experimental`, 2026-10-21).
 * One iteration re-reads every not-yet-audited function of one C file
 * against C, in C order, about REREAD_LINES C code lines at a time; files
 * go in reach × loudness order. ledger.mjs wires the CLI:
 *
 *   node scripts/ledger.mjs batch --reread [file.c…] [--lines N] [--write]
 *   node scripts/ledger.mjs reread [--top N]        # pass progress, next files, census
 *   node scripts/ledger.mjs defer                    # JS-only deferral flags, every site
 *
 * Read-only. `L` is ledger.mjs load() (rows, jsDefs, edges, ledger, byKey).
 *
 * The margin notes printed per function are reading aids, never verdicts:
 *   marks    comment lines in the JS body or its doc block that admit a gap
 *            (named omit, deferred, stub, TODO, simplified, hard-coded…);
 *   defer    JS-only deferral flags: work C does inline that JS postpones
 *            to a later drain (losehp done/rehumanize/wail, the group-appear
 *            queue, the deferred botl, maybe-async isThenable bridges);
 *   callees  pinned-C callees of the C body whose name never occurs in the
 *            JS body, comments and strings stripped: a missing call, a
 *            renamed helper, or inlined code — read which;
 *   copies   calls to a name this JS file defines while another js/ file
 *            defines it too (clone drift: Blind, body_part, Role_if…);
 *   dups     other js/ files that define this function's own name;
 *   floating statement-level calls to an async-only function with no
 *            await/return (its effects can land after C's order).
 * 2026-10-21 retrospective over the fixes since 10-14: the callee note alone
 * named 18 of 114 measurable fixes and fires on 37 % of functions, so every
 * function is read whole; the notes only say where to look first.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT, jsFiles } from './coverage.mjs';
import { OPEN_STATUSES } from './ledger-io.mjs';

export const REREAD_LINES = 1000;
const CALLHEAT_PATH = join(ROOT, '.cache/callheat/functions.json');
const SKIP_STATUSES = new Set(['by-design', 'frozen']);

/* JS-only deferral mechanisms (2026-10-21 census, docs/REREAD-PASS.md §5).
   Each postpones work that C runs inline to a drain some caller must reach. */
export const DEFER_FLAGS = [
  ['_losehp_needs_done', 'hack.c losehp runs done(DIED) inline; JS sets the flag and finish_losehp_done drains it'],
  ['_losehp_gameover', 'losehp bail marker: gameover set early so callers unwind, dropped again before done()'],
  ['_losehp_needs_rehumanize', 'hack.c losehp runs rehumanize() inline for a polymorphed hero; JS drains it later'],
  ['_needs_maybe_wail', 'hack.c losehp runs maybe_wail() inline; JS drains it in finish_losehp_rehumanize'],
  ['_grpAppearPending', 'makemon.c prints a group member\'s appearance inside makemon; JS queues it'],
  ['_pending_botl', 'a bot() flush postponed to the next pline (D-4173); C flushes at its own point'],
  ['isThenable', 'mklev.js maybe-async bridge: a sync loader forwards a promise instead of awaiting C\'s inline call'],
];
const DEFER_RX = new RegExp(`(?<![\\w$])(${DEFER_FLAGS.map(([f]) => f).join('|')})(?![\\w$])`, 'g');
const MARK_RX = /named omit|\bomit(?:s|ted)?\b|\bdefer(?:s|red)?\b|\bstub(?:s|bed)?\b|\bTODO\b|\bFIXME\b|\bXXX\b|not ported|unported|simplif|approximat|hard-?cod|for now\b/i;
const CALL_RX = /(?<![\w$.])([A-Za-z_$][\w$]*)\s*\(/g;
/* A call that starts a statement: after ; { } ) else, or after a `case x:`
   line break — not an argument, an operand or an await/return. */
const STMT_CALL_RX = /(?:[;{})]|\belse|:[ \t]*\n)\s*([A-Za-z_$][\w$]*)\s*\(/g;
const KEYWORDS = new Set(['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'typeof', 'await', 'new', 'yield', 'void', 'delete', 'super']);
/* Message wrappers: JS words these calls differently (pline with the text),
   so their absence is not a lead; the message text is read anyway. */
const MSG_WRAPPERS = new Set(['You', 'Your', 'You_feel', 'You_hear', 'You_see', 'You_cant', 'pline', 'pline_The',
  'pline_mon', 'pline_xy', 'The', 'the', 'Norep', 'verbalize', 'There', 'custompline', 'urgent_pline']);

/** Blank comments and string/template text; newlines and `${}` code are kept. */
export function stripJs(src) {
  const out = [];
  const tpl = []; // brace depth inside each open `${`
  const n = src.length;
  const blank = (a, b) => out.push(src.slice(a, b).replace(/[^\n]/g, ' '));
  for (let i = 0; i < n;) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { const j = src.indexOf('\n', i); const e = j < 0 ? n : j; blank(i, e); i = e; continue; }
    if (c === '/' && d === '*') { const j = src.indexOf('*/', i + 2); const e = j < 0 ? n : j + 2; blank(i, e); i = e; continue; }
    if (c === '\'' || c === '"') {
      let j = i + 1;
      while (j < n && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1;
      const closed = j < n && src[j] === c;
      out.push(c); blank(i + 1, Math.min(j, n)); if (closed) out.push(c);
      i = closed ? j + 1 : j; continue;
    }
    if (c === '`' || (c === '}' && tpl.length && tpl[tpl.length - 1] === 0)) {
      if (c === '}') tpl.pop();
      let j = i + 1;
      while (j < n && src[j] !== '`' && !(src[j] === '$' && src[j + 1] === '{')) j += src[j] === '\\' ? 2 : 1;
      out.push(c); blank(i + 1, Math.min(j, n));
      if (j < n && src[j] === '$') { out.push('${'); tpl.push(0); i = j + 2; } else { if (j < n) out.push('`'); i = j + 1; }
      continue;
    }
    if (tpl.length) { if (c === '{') tpl[tpl.length - 1]++; else if (c === '}') tpl[tpl.length - 1]--; }
    out.push(c); i++;
  }
  return out.join('');
}

/** What stripJs removed on one line (its comment and string text). */
const removedText = (raw, clean) => [...raw].map((ch, j) => (clean[j] === ch ? ' ' : ch)).join('');

function fileText(cache, rel) {
  if (!cache.has(rel)) {
    const abs = join(ROOT, rel);
    const raw = existsSync(abs) ? readFileSync(abs, 'utf8') : '';
    cache.set(rel, { raw: raw.split('\n'), clean: stripJs(raw).split('\n') });
  }
  return cache.get(rel);
}

function readHeat() {
  const heat = new Map();
  if (!existsSync(CALLHEAT_PATH)) return { heat, total: 0, at: null };
  try {
    const d = JSON.parse(readFileSync(CALLHEAT_PATH, 'utf8'));
    for (const r of d.rows || []) heat.set(`${r.file}:${r.fn}`, +r.sessions || 0);
    return { heat, total: +d.sessions || 0, at: String(d.generatedAt || '').slice(0, 10) };
  } catch { return { heat, total: 0, at: null }; }
}

/** Names whose every js/ definition is async (statement calls to them float). */
function asyncOnlyNames(cache) {
  const asy = new Set(), syn = new Set();
  for (const abs of jsFiles()) {
    const clean = fileText(cache, relative(ROOT, abs)).clean.join('\n');
    for (const m of clean.matchAll(/\basync\s+function\s*\*?\s*([A-Za-z_$][\w$]*)/g)) asy.add(m[1]);
    for (const m of clean.matchAll(/(?<![\w$.])([A-Za-z_$][\w$]*)\s*[:=]\s*async\b/g)) asy.add(m[1]);
    for (const m of clean.matchAll(/^\s*(?:static\s+)?async\s+([A-Za-z_$][\w$]*)\s*\(/gm)) asy.add(m[1]);
    for (const m of clean.matchAll(/(?<!\basync\s{1,4})\bfunction\s*\*?\s*([A-Za-z_$][\w$]*)/g)) syn.add(m[1]);
  }
  return new Set([...asy].filter((x) => !syn.has(x)));
}

function context(L) {
  const cache = new Map();
  const defsByFileSym = new Map();
  const defsByName = new Map(); // name → Map(file → exported)
  for (const d of L.jsDefs) {
    const k = `${d.file}:${d.name}`;
    const cur = defsByFileSym.get(k);
    if (!cur || d.code > cur.code) defsByFileSym.set(k, d);
    if (!defsByName.has(d.name)) defsByName.set(d.name, new Map());
    const m = defsByName.get(d.name);
    m.set(d.file, m.get(d.file) || d.exported);
  }
  const pinned = new Set(L.rows.map((r) => r.fn));
  const callees = new Map();
  for (const [a, b] of L.edges || []) {
    if (!pinned.has(b)) continue;
    if (!callees.has(a)) callees.set(a, new Set());
    callees.get(a).add(b);
  }
  const { heat, total, at } = readHeat();
  return { cache, defsByFileSym, defsByName, callees, heat, heatTotal: total, heatAt: at, asyncOnly: null };
}

/**
 * Reach × loudness × size; reach is the callheat session share when
 * measured. Messages and map calls weigh double RNG calls: on 2026-10-21
 * held-out RNG read 99.5 % and screens 98.3 %, and its last +230 points
 * came from display-only fixes.
 */
function weight(r, ctx) {
  const h = ctx.heat.get(r.key) || 0;
  const reach = h && ctx.heatTotal ? Math.log2(1 + h) / Math.log2(1 + ctx.heatTotal) : 0.2 / (1 + r.hops);
  const loud = Math.log2(1 + r.rng) + Math.log2(1 + r.out * 2) + Math.log2(1 + r.map * 2);
  return reach * (1 + loud) * Math.log2(4 + r.cCode);
}

/** done = stamped audited; open/declare = never declared; partial; reread = live. */
function kindOf(r, l) {
  const s = l ? l.status : 'unknown';
  if (SKIP_STATUSES.has(s)) return null;
  if (/^audited/.test(String((l && l.note) || ''))) return 'done';
  if (OPEN_STATUSES.has(s)) return r.cover === 'ok' ? 'declare' : 'open';
  return s === 'partial' ? 'partial' : 'reread';
}

/** JS bodies of one row (declared `js`, else measured jsWhere) plus the doc block above each. */
function spans(L, r, ctx) {
  const l = L.ledger.get(r.key) || {};
  const refs = l.js && l.js.length ? l.js : r.jsWhere;
  const out = [];
  for (const ref of refs || []) {
    const d = ctx.defsByFileSym.get(ref);
    if (!d) continue;
    const t = fileText(ctx.cache, d.file);
    let k = d.line - 2;
    while (k >= 0 && d.line - 2 - k < 80 && /^\s*(\/\/|\/\*|\*)/.test(t.raw[k])) k--;
    out.push({ ref, file: d.file, name: d.name, line: d.line, endLine: d.endLine, docLine: k + 2 });
  }
  return out;
}

function notesFor(r, sp, ctx) {
  if (!ctx.asyncOnly) ctx.asyncOnly = asyncOnlyNames(ctx.cache);
  const marks = [], floating = [];
  const defer = new Map(), copies = new Map(), dups = new Set();
  let body = '';
  for (const s of sp) {
    const t = fileText(ctx.cache, s.file);
    for (const f of (ctx.defsByName.get(s.name) || new Map()).keys()) if (f !== s.file) dups.add(f);
    for (let i = s.docLine - 1; i < s.endLine; i++) {
      const raw = t.raw[i] || '', clean = t.clean[i] || '';
      if (raw !== clean && MARK_RX.test(removedText(raw, clean))) {
        marks.push(`${s.file}:${i + 1}  ${raw.trim().replace(/^(\/\/+|\/\*+|\*+)\s*/, '').slice(0, 150)}`);
      }
      if (i < s.line - 1) continue; // the doc block is not code
      body += `${clean}\n`;
      for (const m of clean.matchAll(DEFER_RX)) {
        const e = defer.get(m[1]) || { n: 0, at: `${s.file}:${i + 1}` };
        e.n++; defer.set(m[1], e);
      }
      for (const m of clean.matchAll(CALL_RX)) {
        const files = ctx.defsByName.get(m[1]);
        if (!files || files.size < 2 || !files.has(s.file) || m[1] === s.name || KEYWORDS.has(m[1])) continue;
        copies.set(m[1], { local: s.file, exported: [...files].filter(([f, ex]) => ex && f !== s.file).map(([f]) => f), others: files.size - 1 });
      }
    }
    const text = t.clean.slice(s.line - 1, s.endLine).join('\n');
    for (const m of text.matchAll(STMT_CALL_RX)) {
      if (!ctx.asyncOnly.has(m[1]) || KEYWORDS.has(m[1])) continue;
      const line = s.line + text.slice(0, m.index + m[0].length).split('\n').length - 1;
      floating.push(`${m[1]} (${s.file}:${line})`);
    }
  }
  const absent = [...(ctx.callees.get(r.fn) || [])]
    .filter((c) => !MSG_WRAPPERS.has(c) && !new RegExp(`(?<![\\w$])${c}(?![\\w$])`).test(body)).sort();
  return {
    marks, defer: [...defer].map(([f, e]) => [f, e.n, e.at]), callees: absent,
    copies: [...copies].map(([name, c]) => ({ name, ...c })), dups: [...dups], floating,
  };
}

/** Per-file state of the pass, files in reach × loudness order. */
function fileTable(L, ctx) {
  const byFile = new Map();
  for (const r of L.rows) {
    const kind = kindOf(r, L.ledger.get(r.key));
    if (!kind) continue;
    const e = byFile.get(r.file) || { file: r.file, weight: 0, todo: [], done: 0, doneLines: 0, total: 0, totalLines: 0 };
    e.weight += weight(r, ctx);
    e.total++; e.totalLines += r.cCode;
    if (kind === 'done') { e.done++; e.doneLines += r.cCode; } else e.todo.push({ r, kind });
    byFile.set(r.file, e);
  }
  for (const e of byFile.values()) e.todo.sort((a, b) => a.r.start - b.r.start);
  return [...byFile.values()].sort((a, b) => b.weight - a.weight || a.file.localeCompare(b.file));
}

const passTotals = (files) => files.reduce((t, e) => ({
  files: t.files + 1, filesDone: t.filesDone + (e.todo.length ? 0 : 1), total: t.total + e.total,
  done: t.done + e.done, totalLines: t.totalLines + e.totalLines, doneLines: t.doneLines + e.doneLines,
}), { files: 0, filesDone: 0, total: 0, done: 0, totalLines: 0, doneLines: 0 });

/**
 * The next slice: the first file (in pass order, or the named files) with
 * functions left, in C order, until `lines` C code lines (one function at
 * least; the last may run the slice to 1.5 × lines). Manifest shape is
 * ledger.mjs pickBatch's plus `mode: 'reread'` and per-function notes.
 */
export function pickReread(L, { files = [], lines = REREAD_LINES, head = 'HEAD' } = {}) {
  const ctx = context(L);
  const table = fileTable(L, ctx);
  const named = new Set(files);
  const pick = named.size ? table.filter((e) => named.has(e.file) && e.todo.length) : table.filter((e) => e.todo.length).slice(0, 1);
  const fns = [];
  let sum = 0;
  outer: for (const e of pick) {
    for (const { r, kind } of e.todo) {
      if (fns.length && (sum >= lines || sum + r.cCode > lines * 1.5)) break outer;
      const l = L.ledger.get(r.key) || {};
      const sp = spans(L, r, ctx);
      fns.push({
        key: r.key, file: r.file, fn: r.fn, kind, c: `${r.start}-${r.end}`, cCode: r.cCode, jsCode: r.jsCode,
        cover: r.cover, status: l.status || 'unknown', omit: l.omit || '', js: sp.map((s) => `${s.ref} ${s.line}–${s.endLine}`),
        heat: ctx.heat.get(r.key) || 0, notes: notesFor(r, sp, ctx),
      });
      sum += r.cCode;
    }
  }
  const f = pick[0];
  return {
    mode: 'reread', at: new Date().toISOString(), head, files: [...new Set(fns.map((x) => x.file))], gapLines: sum, budget: lines,
    file: f ? { file: f.file, total: f.total, done: f.done, totalLines: f.totalLines, doneLines: f.doneLines, left: f.todo.length } : null,
    pass: passTotals(table), heat: { at: ctx.heatAt, sessions: ctx.heatTotal }, fns,
  };
}

const list = (a, n) => (a.length > n ? `${a.slice(0, n).join(', ')}, +${a.length - n} more` : a.join(', '));

/** Human/agent-readable manifest. */
export function formatBatch(b) {
  const p = b.pass, f = b.file;
  const rows = [`re-read batch @${b.head}: ${b.files.join(', ')} :${b.fns[0].c.split('-')[0]}–${b.fns[b.fns.length - 1].c.split('-')[1]} — ${b.fns.length} function(s), ${b.gapLines} C code lines`
    + (f ? ` (file ${f.done}/${f.total} audited, ${f.left} left; pass ${p.done}/${p.total} functions, ${p.filesDone}/${p.files} files)` : '')];
  if (b.heat.at) rows.push(`heat = sessions executing the C function (callheat ${b.heat.at}, ${b.heat.sessions} sessions; 0 = none of them)`);
  /* Local copies are a per-file fix (import the live export), so they are
     listed once for the slice, with the functions that call them. */
  const copies = new Map();
  for (const x of b.fns) {
    for (const c of x.notes.copies) {
      const e = copies.get(`${c.local}:${c.name}`) || { ...c, by: [] };
      e.by.push(x.fn); copies.set(`${c.local}:${c.name}`, e);
    }
  }
  for (const c of copies.values()) {
    rows.push(`copies  ${c.local} defines its own ${c.name} (${c.others} other js/ definition(s)${c.exported.length ? `, exported from ${list(c.exported, 2)}` : ', none exported'}) — called by ${list(c.by, 5)}`);
  }
  for (const x of b.fns) {
    rows.push(`  ${x.kind.padEnd(7)} ${`${x.file}:${x.fn}`.padEnd(36)} C ${x.c.padEnd(11)} ${String(x.cCode).padStart(4)} L  ${x.status.padEnd(8)} heat ${x.heat}  JS ${x.js.join('; ') || '— (no JS body found)'}`);
    if (x.omit) rows.push(`          omit    ${x.omit.slice(0, 160)}`);
    const n = x.notes;
    for (const m of n.marks.slice(0, 6)) rows.push(`          mark    ${m}`);
    if (n.marks.length > 6) rows.push(`          mark    +${n.marks.length - 6} more`);
    if (n.defer.length) rows.push(`          defer   ${n.defer.map(([g, k, at]) => `${g} ×${k} (${at})`).join(', ')}`);
    if (n.callees.length) rows.push(`          callees ${list(n.callees, 12)} — not in the JS body: wired elsewhere, renamed, or missing?`);
    if (n.dups.length) rows.push(`          dups    ${x.fn} is also defined in ${list(n.dups, 4)}`);
    if (n.floating.length) rows.push(`          float   ${list(n.floating, 6)}`);
  }
  return rows.join('\n');
}

/** Whole-js/ census: named-omit comments and deferral-flag occurrences. */
function census(cache) {
  let omits = 0;
  const flags = new Map(DEFER_FLAGS.map(([g]) => [g, { n: 0, files: new Set(), sites: [] }]));
  for (const abs of jsFiles()) {
    const rel = relative(ROOT, abs);
    const t = fileText(cache, rel);
    t.raw.forEach((raw, i) => {
      const clean = t.clean[i];
      if (raw !== clean && /named omit/i.test(removedText(raw, clean))) omits++;
      for (const m of clean.matchAll(DEFER_RX)) {
        const e = flags.get(m[1]);
        e.n++; e.files.add(rel); e.sites.push([rel, i + 1]);
      }
    });
  }
  return { omits, flags };
}

/** Pass progress, the next files, and the omit/deferral census. */
export function rereadStatus(L, { top = 12 } = {}) {
  const ctx = context(L);
  const table = fileTable(L, ctx);
  const p = passTotals(table);
  const c = census(ctx.cache);
  const pct = (a, b) => `${Math.round((100 * a) / Math.max(1, b))} %`;
  const rows = [
    `re-read pass: ${p.done}/${p.total} functions audited (${pct(p.done, p.total)}), ${p.doneLines}/${p.totalLines} C code lines (${pct(p.doneLines, p.totalLines)}), ${p.filesDone}/${p.files} files done`,
    `census: ${c.omits} \`named omit\` comments in js/; deferral flags ${DEFER_FLAGS.map(([g]) => `${g} ${c.flags.get(g).n}`).join(' · ')}`,
    `\n  # file               weight  fns done/total  C lines left`,
  ];
  table.filter((e) => e.todo.length).slice(0, top).forEach((e, i) => {
    const left = e.todo.reduce((s, x) => s + x.r.cCode, 0);
    rows.push(`${String(i + 1).padStart(3)} ${e.file.padEnd(18)} ${e.weight.toFixed(0).padStart(7)}  ${`${e.done}/${e.total}`.padStart(14)}  ${String(left).padStart(12)}`);
  });
  return rows.join('\n');
}

/** Every site of every JS-only deferral flag, by enclosing js/ function. */
export function deferCensus(L) {
  const ctx = context(L);
  const c = census(ctx.cache);
  const byFile = new Map();
  for (const d of L.jsDefs) { if (!byFile.has(d.file)) byFile.set(d.file, []); byFile.get(d.file).push(d); }
  const owner = (file, line) => {
    let best = null;
    for (const d of byFile.get(file) || []) if (d.line <= line && line <= d.endLine && (!best || d.endLine - d.line < best.endLine - best.line)) best = d;
    return best ? best.name : '(top level)';
  };
  const rows = [];
  for (const [g, why] of DEFER_FLAGS) {
    const e = c.flags.get(g);
    rows.push(`${g} — ${e.n} occurrence(s) in ${e.files.size} file(s): ${why}`);
    const fns = new Map();
    for (const [file, line] of e.sites) { const k = `${file}:${owner(file, line)}`; fns.set(k, [...(fns.get(k) || []), line]); }
    for (const [k, lines] of fns) rows.push(`    ${k}  :${lines.join(',')}`);
  }
  return rows.join('\n');
}
