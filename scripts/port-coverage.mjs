#!/usr/bin/env node
/**
 * Port-coverage ranker: which pinned-C functions are missing or thin in
 * `js/`, ranked by how likely a hidden session is to reach them and how
 * loudly they show up (screen output and RNG draws).
 *
 *   node scripts/port-coverage.mjs                # top 40 table
 *   node scripts/port-coverage.mjs --limit 30 --md
 *   node scripts/port-coverage.mjs --name eatfood # explain one function
 *
 * Method (all static, deterministic, read-only):
 *  1. index every function defined in nethack-c/upstream/src/*.c
 *     (csym.mjs's rule: col-0 `name(` whose next non-blank line is `{`);
 *  2. index js/** exports and locals (sym.mjs's regexes) and measure each
 *     JS body by brace balance;
 *  3. build the C call graph from identifier occurrences inside bodies and
 *     BFS from the turn loop (moveloop/rhack/domove/movemon/docrt/mklev/…)
 *     so every function gets a hop distance = "how close to every turn";
 *  4. score = reach x call-site breadth x (screen + RNG loudness), then
 *     subtract what `js/` already covers (missing = 1.0, thin = partial).
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cSrc = join(root, 'nethack-c/upstream/src');
const jsDir = join(root, 'js');

/* Files whose C has no scored JS analogue by design: windowport, save
   file plumbing, lua bindings, build/util. Constitution Rule #2 keeps the
   port off the filesystem, and frozen/ owns the terminal. */
const SKIP_FILES = new Set([
  'nhlua.c', 'nhlobj.c', 'nhlsel.c', 'lua_bind.c', 'dlb.c', 'sfstruct.c',
  'windows.c', 'sounds_lib.c', 'symbols.c', 'drawing.c',
]);
/* Functions that exist only for the C runtime or wizard/debug paths. */
const SKIP_FN = new Set([
  'main', 'panic', 'impossible', 'nhassert_failed', 'nh_terminate',
  'error', 'nh_abort', 'l_get_nhsym', 'dump_screen',
]);

const argv = process.argv.slice(2);
const arg = (k, d) => {
  const i = argv.indexOf(k);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};
const LIMIT = parseInt(arg('--limit', '40'), 10);
const AS_MD = argv.includes('--md');
const ONE = arg('--name', null);

/* ---------- 1. pinned C function index ---------- */
const cFiles = readdirSync(cSrc).filter((f) => f.endsWith('.c'))
  .filter((f) => !SKIP_FILES.has(f)).sort();
const cFns = new Map(); // name -> {file, start, end, body, lines}
const cText = new Map(); // file -> text
for (const f of cFiles) {
  const text = readFileSync(join(cSrc, f), 'utf8');
  cText.set(f, text);
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = /^([A-Za-z_][\w]*)\s*\(/.exec(lines[i]);
    if (!m) continue;
    let j = i;
    while (j < lines.length && !lines[j].includes('{') && j - i < 8) j++;
    if (j >= lines.length || !lines[j].trim().startsWith('{')) continue;
    let end = j;
    for (let k = j + 1; k < lines.length; k++) {
      if (/^\}/.test(lines[k])) { end = k; break; }
    }
    const name = m[1];
    if (SKIP_FN.has(name) || cFns.has(name)) continue;
    cFns.set(name, {
      name, file: f, start: i + 1, end: end + 1,
      body: lines.slice(j, end + 1).join('\n'),
      lines: end - j + 1,
    });
  }
}

/* ---------- 2. js/** symbol index + body size ---------- */
const RX = [
  /^export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
  /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function|\()/gm,
  /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm,
  /^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function|\()/gm,
];
function listJs(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) listJs(p, acc);
    else if (e.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}
function bodyLines(text, idx) {
  const open = text.indexOf('{', idx);
  if (open < 0) return 0;
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (!depth) return text.slice(open, i).split('\n').length; }
  }
  return 0;
}
const jsFns = new Map(); // name -> {files:Set, lines, exported}
const jsAllText = [];
for (const abs of listJs(jsDir)) {
  if (abs.includes('/generated/')) continue;
  const rel = relative(root, abs);
  const text = readFileSync(abs, 'utf8');
  jsAllText.push(text);
  RX.forEach((rx, k) => {
    rx.lastIndex = 0;
    for (const m of text.matchAll(rx)) {
      const name = m[1];
      const len = bodyLines(text, m.index);
      const cur = jsFns.get(name) || { files: new Set(), lines: 0, exported: false };
      cur.files.add(rel);
      cur.lines = Math.max(cur.lines, len);
      if (k < 2) cur.exported = true;
      jsFns.set(name, cur);
    }
  });
}

/* ---------- 3. C call graph + hop distance from the turn loop ---------- */
const names = [...cFns.keys()];
const callees = new Map();
const callerCount = new Map();
const callerFiles = new Map();
for (const fn of cFns.values()) {
  const set = new Set();
  for (const m of fn.body.matchAll(/([A-Za-z_][\w]*)\s*\(/g)) {
    const n = m[1];
    if (n === fn.name || !cFns.has(n)) continue;
    set.add(n);
    callerCount.set(n, (callerCount.get(n) || 0) + 1);
    if (!callerFiles.has(n)) callerFiles.set(n, new Set());
    callerFiles.get(n).add(fn.file);
  }
  callees.set(fn.name, set);
}
const ROOTS = ['moveloop', 'rhack', 'domove', 'movemon', 'dochug', 'docrt',
  'newsym', 'bot', 'mklev', 'nh_timeout', 'vision_recalc', 'do_look',
  'dopickup', 'dofight', 'domonability', 'makelevel', 'dosearch', 'domoveloop'];
const dist = new Map();
let frontier = ROOTS.filter((r) => cFns.has(r));
frontier.forEach((r) => dist.set(r, 0));
for (let d = 1; d <= 6 && frontier.length; d++) {
  const next = [];
  for (const n of frontier) {
    for (const c of callees.get(n) || []) {
      if (!dist.has(c)) { dist.set(c, d); next.push(c); }
    }
  }
  frontier = next;
}

/* ---------- 4. loudness + coverage + score ---------- */
const RNG_RX = /\b(rn2|rnd|rn1|rne|rnz|rnl|d)\s*\(/g;
const OUT_RX = /\b(pline|pline_mon|urgent_pline|You|You_hear|Your|You_feel|You_cant|Norep|verbalize|putstr|custompline|livelog_printf|The|Strcat)\s*\(/g;
const MAP_RX = /\b(newsym|map_location|show_glyph|docrt|feel_location|tmp_at|display_nhwindow|update_inventory|disp\.|flush_screen)\b/g;

const jsAll = jsAllText.join('\n');
const rows = [];
for (const fn of cFns.values()) {
  const js = jsFns.get(fn.name);
  const jsLines = js ? js.lines : 0;
  const ratio = js ? jsLines / Math.max(fn.lines, 1) : 0;
  let cover;
  if (!js) cover = 'MISSING';
  else if (ratio < 0.45) cover = 'THIN';
  else if (ratio < 0.75) cover = 'PARTIAL';
  else cover = 'ok';
  if (cover === 'ok') continue;
  if (fn.lines < 6) continue; // one-liners are not worth a queue row
  const rng = (fn.body.match(RNG_RX) || []).length;
  const out = (fn.body.match(OUT_RX) || []).length;
  const map = (fn.body.match(MAP_RX) || []).length;
  const calls = callerCount.get(fn.name) || 0;
  const files = (callerFiles.get(fn.name) || new Set()).size;
  const d = dist.has(fn.name) ? dist.get(fn.name) : 9;
  const reach = 1 / (1 + d); // 1.0 in the turn loop, 0.11 unreachable
  const breadth = Math.log2(1 + calls) + Math.log2(1 + files);
  const loud = Math.log2(1 + rng * 2) + Math.log2(1 + out) + Math.log2(1 + map);
  const mentions = jsAll.split(fn.name).length - 1;
  /* Behaviour this function cannot perform at all: C callees that have no
     symbol anywhere in js/ and are never even named in a js/ comment. */
  const dead = [...(callees.get(fn.name) || [])].filter((c) => {
    if (jsFns.has(c)) return false;
    if (jsAll.includes(c)) return false;
    const cf = cFns.get(c);
    return cf && cf.lines >= 5;
  });
  let gap = cover === 'MISSING' ? 1 : cover === 'THIN' ? 0.7 : 0.4;
  /* a split port (helpers under other names) shows up THIN but has no dead
     callees — damp it; a function whose callees are absent is a real hole */
  gap *= 1 + Math.min(dead.length, 8) / 4;
  if (cover === 'MISSING' && mentions > 20) gap *= 0.55; // ported piecewise
  const score = reach * (1 + breadth) * (1 + loud) * gap * Math.log2(4 + fn.lines);
  rows.push({ ...fn, cover, jsLines, ratio, rng, out, map, calls, files, d, score,
              mentions, dead,
              jsFiles: js ? [...js.files].join(' ') : '' });
}
rows.sort((a, b) => b.score - a.score);

if (ONE) {
  const r = rows.find((x) => x.name === ONE) || null;
  console.log(r ? JSON.stringify(r, null, 2) : `${ONE}: covered or not a src/*.c function`);
  process.exit(0);
}
const top = rows.slice(0, LIMIT);
if (AS_MD) {
  console.log('| # | C function | C file:line | C ln | JS | hops | callers | RNG | msg | score |');
  console.log('|--:|---|---|--:|---|--:|--:|--:|--:|--:|');
  top.forEach((r, i) => console.log(
    `| ${i + 1} | \`${r.name}\` | \`${r.file}:${r.start}\` | ${r.lines} | ${r.cover}${r.jsLines ? ` ${r.jsLines}L` : ''} | ${r.d === 9 ? '—' : r.d} | ${r.calls} | ${r.rng} | ${r.out} | ${r.score.toFixed(1)} |`));
} else {
  top.forEach((r, i) => console.log(
    `${String(i + 1).padStart(3)}. ${r.name.padEnd(24)} ${r.cover.padEnd(8)}`
    + ` c=${String(r.lines).padStart(4)} js=${String(r.jsLines).padStart(4)}`
    + ` hop=${r.d === 9 ? '-' : r.d} calls=${String(r.calls).padStart(3)}`
    + ` rng=${String(r.rng).padStart(3)} msg=${String(r.out).padStart(3)}`
    + ` cite=${String(r.mentions).padStart(3)} dead=${String(r.dead.length).padStart(2)}`
    + ` ${r.file}:${r.start}  ${r.score.toFixed(1)}`
    + (r.dead.length ? `\n      missing callees: ${r.dead.slice(0, 8).join(', ')}` : '')));
}
console.log(`\n${rows.length} missing/thin functions considered; ${cFns.size} C functions indexed.`);
