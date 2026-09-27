/**
 * Port-coverage measurement shared by ledger.mjs and port-coverage.mjs.
 * Read-only, deterministic. Not imported from scored js/.
 *
 *   const m = measure(ledgerRows);   // ledgerRows: Map `${file}:${fn}` -> row
 *   m.rows      → one record per pinned-C definition key (file, fn)
 *   m.jsDefs    → every js/ function definition {name,file,line,endLine,code,exported}
 *   m.edges     → [caller, callee] name pairs from C bodies
 *
 * Line counts are *code* lines: comments, `#if 0` arms, preprocessor
 * directives, blank lines and brace-only lines are dropped on both sides,
 * so a C body that is half comment no longer reads THIN against a dense
 * JS body (the "ratio is comments" stale parks).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCIndex } from './c-index.mjs';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const JS_DIR = join(ROOT, 'js');

/* C with no scored JS analogue by design: lua bindings, dlb/save file
   plumbing, windowport glue, symset parsing. Seeded as `by-design`. */
export const SKIP_FILES = new Set([
  'nhlua.c', 'nhlobj.c', 'nhlsel.c', 'lua_bind.c', 'dlb.c', 'sfstruct.c',
  'windows.c', 'sounds_lib.c', 'symbols.c', 'drawing.c',
]);
/* Binary save/file plumbing (CURRENT.md "Do not": binary NHFILE); the VFS
   port lives in its own shape. Ledgered, not queued unless declared open. */
export const QUEUE_SKIP_FILES = new Set(['save.c', 'restore.c', 'files.c']);
/* win/tty/*.c: windowport; ledgered, but not queued unless declared open. */
export const TTY_FILES = new Set(readdirSync(join(ROOT, 'nethack-c/upstream/win/tty')).filter((f) => f.endsWith('.c')));
export const SKIP_FN = new Set([
  'main', 'panic', 'impossible', 'nhassert_failed', 'nh_terminate',
  'error', 'nh_abort', 'l_get_nhsym', 'dump_screen',
]);

export const ROOTS = ['moveloop', 'rhack', 'domove', 'movemon', 'dochug', 'docrt',
  'newsym', 'bot', 'mklev', 'nh_timeout', 'vision_recalc', 'do_look',
  'dopickup', 'dofight', 'domonability', 'makelevel', 'dosearch', 'domoveloop'];

const RNG_RX = /\b(rn2|rnd|rn1|rne|rnz|rnl|d)\s*\(/g;
const OUT_RX = /\b(pline|pline_mon|urgent_pline|You|You_hear|Your|You_feel|You_cant|Norep|verbalize|putstr|custompline|livelog_printf|The|Strcat)\s*\(/g;
const MAP_RX = /\b(newsym|map_location|show_glyph|docrt|feel_location|tmp_at|display_nhwindow|update_inventory|disp\.|flush_screen)\b/g;

const JS_RX = [
  /^export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
  /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function|\()/gm,
  /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
  /^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function|\()/gm,
];

function stripBlockComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ''));
}

/** C body → live code lines (drops comments, `#if 0` arms, directives, braces). */
export function cCodeText(body) {
  const lines = stripBlockComments(body).split('\n');
  const stack = []; // {dead, zero}
  const out = [];
  for (const raw of lines) {
    const t = raw.replace(/(^|\s)\/\/.*$/, '').trim();
    const pp = /^#\s*(if|ifdef|ifndef|elif|else|endif)\b(.*)$/.exec(t);
    if (pp) {
      const [, kw, rest] = pp;
      if (kw === 'if' || kw === 'ifdef' || kw === 'ifndef') {
        const zero = kw === 'if' && /^\s*0\b/.test(rest);
        stack.push({ dead: zero, zero });
      } else if (kw === 'else' || kw === 'elif') {
        const top = stack[stack.length - 1];
        if (top && top.zero) top.dead = !top.dead;
      } else if (kw === 'endif') stack.pop();
      continue;
    }
    if (t.startsWith('#')) continue;
    if (stack.some((s) => s.dead)) continue;
    if (!t || /^[{}]+;?$/.test(t)) continue;
    out.push(t);
  }
  return out;
}

/** JS text → code lines (drops comments, blank and brace/paren-only lines). */
export function jsCodeText(text) {
  const out = [];
  for (const raw of stripBlockComments(text).split('\n')) {
    const t = raw.replace(/(^|[\s;{}])\/\/.*$/, '$1').trim();
    if (!t || /^[{}()\[\];,]+$/.test(t)) continue;
    out.push(t);
  }
  return out;
}

function listJs(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'generated') listJs(p, acc); }
    else if (e.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}
export function jsFiles() { return listJs(JS_DIR).sort(); }

/** Body span of a JS function starting at `idx`: [openIdx, closeIdx]. */
function bodySpan(text, idx, headEnd) {
  const open = text.indexOf('{', headEnd);
  if (open < 0) return null;
  const semi = text.indexOf(';\n', headEnd);
  if (semi >= 0 && semi < open) return [idx, semi]; // expression-bodied arrow
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (!depth) return [open, i]; }
  }
  return null;
}

/** Index every js/ function definition, plus an identifier token count. */
export function indexJs() {
  const defs = [];
  const tokens = new Map();
  for (const abs of jsFiles()) {
    const file = relative(ROOT, abs);
    const text = readFileSync(abs, 'utf8');
    for (const m of text.matchAll(/[A-Za-z_$][\w$]*/g)) tokens.set(m[0], (tokens.get(m[0]) || 0) + 1);
    const lineStarts = [0];
    for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) lineStarts.push(i + 1);
    const lineOf = (idx) => {
      let lo = 0, hi = lineStarts.length - 1;
      while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= idx) lo = mid; else hi = mid - 1; }
      return lo + 1;
    };
    const seen = new Set();
    JS_RX.forEach((rx, k) => {
      rx.lastIndex = 0;
      for (const m of text.matchAll(rx)) {
        if (seen.has(m.index)) continue;
        seen.add(m.index);
        const span = bodySpan(text, m.index, m.index + m[0].length);
        const body = span ? text.slice(span[0], span[1] + 1) : '';
        defs.push({
          name: m[1], file, line: lineOf(m.index), endLine: span ? lineOf(span[1]) : lineOf(m.index),
          code: jsCodeText(body).length, exported: k < 2,
        });
      }
    });
  }
  return { defs, tokens };
}

/**
 * Measure every pinned-C definition against js/.
 * `ledger`: Map `${file}:${fn}` -> row (its `js` list overrides same-name lookup).
 */
export function measure(ledger = new Map()) {
  const idx = loadCIndex();
  const { defs: jsDefs, tokens } = indexJs();
  const jsByName = new Map();
  const jsByFileSym = new Map();
  for (const d of jsDefs) {
    if (!jsByName.has(d.name)) jsByName.set(d.name, []);
    jsByName.get(d.name).push(d);
    const k = `${d.file}:${d.name}`;
    const cur = jsByFileSym.get(k);
    if (!cur || d.code > cur.code) jsByFileSym.set(k, d);
  }

  /* One record per (file, fn); #ifdef alternatives in one file collapse onto the first. */
  const cDefs = new Map();
  for (const d of idx.defs) {
    const key = `${d.file}:${d.name}`;
    const cur = cDefs.get(key);
    if (cur) { cur.alts.push(`${d.start}-${d.end}`); continue; }
    cDefs.set(key, { ...d, key, alts: [] });
  }

  /* Call graph by name (cross-file collisions are 3 tty helpers). */
  const callees = new Map();
  const callerCount = new Map();
  const callerFiles = new Map();
  const edges = [];
  for (const d of cDefs.values()) {
    const set = new Set();
    for (const m of d.body.matchAll(/([A-Za-z_]\w*)\s*\(/g)) {
      const n = m[1];
      if (n === d.name || !idx.fns.has(n) || set.has(n)) continue;
      set.add(n);
      edges.push([d.name, n]);
      callerCount.set(n, (callerCount.get(n) || 0) + 1);
      if (!callerFiles.has(n)) callerFiles.set(n, new Set());
      callerFiles.get(n).add(d.file);
    }
    const prev = callees.get(d.name);
    callees.set(d.name, prev ? new Set([...prev, ...set]) : set);
  }
  const dist = new Map();
  let frontier = ROOTS.filter((r) => idx.fns.has(r));
  frontier.forEach((r) => dist.set(r, 0));
  for (let h = 1; h <= 6 && frontier.length; h++) {
    const next = [];
    for (const n of frontier) for (const c of callees.get(n) || []) if (!dist.has(c)) { dist.set(c, h); next.push(c); }
    frontier = next;
  }

  const rows = [];
  for (const d of cDefs.values()) {
    const led = ledger.get(d.key);
    const code = cCodeText(d.body);
    const cCode = code.length;
    const liveBody = code.join('\n');
    let jsCode = 0;
    let jsWhere = [];
    if (led && led.js && led.js.length) {
      for (const ref of led.js) {
        const hit = jsByFileSym.get(ref);
        if (hit) { jsCode += hit.code; jsWhere.push(ref); }
      }
    }
    if (!jsWhere.length) {
      const same = jsByName.get(d.name) || [];
      if (same.length) {
        const best = same.reduce((a, b) => (b.code > a.code ? b : a));
        jsCode = best.code;
        jsWhere = [`${best.file}:${best.name}`];
      }
    }
    const ratio = jsWhere.length ? jsCode / Math.max(cCode, 1) : 0;
    const cover = !jsWhere.length ? 'MISSING' : ratio < 0.45 ? 'THIN' : ratio < 0.75 ? 'PARTIAL' : 'ok';
    const rng = (liveBody.match(RNG_RX) || []).length;
    const out = (liveBody.match(OUT_RX) || []).length;
    const map = (liveBody.match(MAP_RX) || []).length;
    const calls = callerCount.get(d.name) || 0;
    const files = (callerFiles.get(d.name) || new Set()).size;
    const hops = dist.has(d.name) ? dist.get(d.name) : 9;
    const mentions = tokens.get(d.name) || 0;
    const dead = [...(callees.get(d.name) || [])].filter((c) => {
      if (tokens.get(c)) return false;
      const cf = idx.fns.get(c);
      return cf && cf.lines >= 5;
    });
    let score = 0;
    if (cover !== 'ok') {
      const reach = 1 / (1 + hops);
      const breadth = Math.log2(1 + calls) + Math.log2(1 + files);
      const loud = Math.log2(1 + rng * 2) + Math.log2(1 + out) + Math.log2(1 + map);
      let gap = cover === 'MISSING' ? 1 : cover === 'THIN' ? 0.7 : 0.4;
      gap *= 1 + Math.min(dead.length, 8) / 4;
      if (cover === 'MISSING' && mentions > 20) gap *= 0.55;
      score = reach * (1 + breadth) * (1 + loud) * gap * Math.log2(4 + cCode);
    }
    rows.push({
      key: d.key, file: d.file, fn: d.name, start: d.start, end: d.end, alts: d.alts,
      cRaw: d.lines, cCode, jsCode, ratio, cover, jsWhere, rng, out, map, calls, files, hops,
      mentions, dead, score,
    });
  }
  return { rows, jsDefs, edges };
}
