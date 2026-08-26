#!/usr/bin/env node
/**
 * js/ import-graph oracle. Answers the "may I import X into Y?" question the
 * hot pack currently answers with a growing hand-written "Do not import"
 * list, and that agents otherwise answer with 2–4 greps.
 *
 *   node scripts/imports.mjs --can mon.js makemon.js   # would edge mon→makemon cycle?
 *   node scripts/imports.mjs --cycles                  # every static cycle in js/
 *   node scripts/imports.mjs --deps display.js         # what display.js imports
 *   node scripts/imports.mjs --who display.js          # what imports display.js
 *   node scripts/imports.mjs --path a.js b.js          # existing import path a→b
 *   node scripts/imports.mjs --rulecheck               # Contest Rule #2 lint over js/
 *   node scripts/imports.mjs --stats
 *
 * Static `import … from './x.js'` only (that is what makes a load-time cycle).
 * Dynamic `import()` and late-bound accessors are reported separately by
 * --deps so a "latebound" answer is visible instead of guessed.
 * Deterministic, read-only, no network.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsDir = join(root, 'js');

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}

const files = walk(jsDir);
const key = (p) => relative(jsDir, p);
const norm = (from, spec) => {
  if (!spec.startsWith('.')) return null;
  return relative(jsDir, join(dirname(from), spec));
};

const STATIC = /^\s*import\s+(?:[\s\S]*?)\s*from\s*['"]([^'"]+)['"]/gm;
const BARE = /^\s*import\s+['"]([^'"]+)['"]/gm;
const DYN = /\bimport\(\s*['"]([^'"]+)['"]\s*\)/g;

const graph = new Map();   // file -> Set(static deps)
const dyn = new Map();     // file -> Set(dynamic deps)
const nodeish = new Map(); // file -> [offending specifier lines]

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const k = key(f);
  const s = new Set(), d = new Set(), bad = [];
  for (const re of [STATIC, BARE]) {
    re.lastIndex = 0;
    for (const m of src.matchAll(re)) {
      const t = norm(f, m[1]);
      if (t) s.add(t);
      else bad.push(m[1]);
    }
  }
  DYN.lastIndex = 0;
  for (const m of src.matchAll(DYN)) {
    const t = norm(f, m[1]);
    if (t) d.add(t); else bad.push(`import(${m[1]})`);
  }
  if (/\breadFileSync\b|\bwriteFileSync\b/.test(src)) bad.push('readFileSync/writeFileSync');
  graph.set(k, s); dyn.set(k, d);
  if (bad.length) nodeish.set(k, bad);
}


/** Exported name -> binding kind for one module (function = hoisted). */
const _exportCache = new Map();
function exportsOf(file) {
  if (_exportCache.has(file)) return _exportCache.get(file);
  const m = new Map();
  const src = readFileSync(join(jsDir, file), 'utf8');
  for (const x of src.matchAll(/^export\s+(async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)/gm)) m.set(x[2], 'function');
  for (const x of src.matchAll(/^export\s+(const|let|var)\s+([A-Za-z_$][\w$]*)/gm))
    m.set(x[2], x[1] === 'var' ? 'var' : x[1]);
  for (const x of src.matchAll(/^export\s+class\s+([A-Za-z_$][\w$]*)/gm)) m.set(x[1], 'class');
  for (const x of src.matchAll(/^export\s*\{([^}]*)\}/gm))
    for (const part of x[1].split(','))
      { const n = part.trim().split(/\s+as\s+/).pop().trim(); if (n) m.set(n, m.get(n) || 're-export'); }
  _exportCache.set(file, m);
  return m;
}

/** Statements that execute when the module is *imported* (outside any fn/class). */
function topLevelUse(file) {
  const src = readFileSync(join(jsDir, file), 'utf8');
  const imported = new Set();
  for (const x of src.matchAll(/^import\s*\{([^}]*)\}/gm))
    for (const part of x[1].split(',')) { const n = part.trim().split(/\s+as\s+/).pop().trim(); if (n) imported.add(n); }
  const lines = src.split('\n');
  let depth = 0, count = 0, firstLine = 0, sample = '';
  const hot = new Set();
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    const wasTop = depth === 0;
    for (const ch of raw) { if (ch === '{' || ch === '(' || ch === '[') depth++; else if (ch === '}' || ch === ')' || ch === ']') depth--; }
    if (!wasTop) continue;
    if (!t || t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) continue;
    if (/^(import|export\s+(async\s+)?function|export\s+class|export\s*\{|function|class|async\s+function)\b/.test(t)) continue;
    if (/^export\s+(const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(async\s*)?(\(|function)/.test(t)) continue; // fn expr
    if (/^(const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*(async\s*)?(\(|function)/.test(t)) continue;
    count++;
    for (const n of imported) if (new RegExp(`\\b${n}\\b`).test(t)) hot.add(`${n} (line ${i + 1})`);
    if (!firstLine) { firstLine = i + 1; sample = t.slice(0, 90); }
  }
  return { count, firstLine, sample, hot: [...hot] };
}

const argv = process.argv.slice(2);
const flag = argv.find((a) => a.startsWith('--')) || '--stats';
const args = argv.filter((a) => !a.startsWith('--')).map((a) => basename(a));

/** All simple paths a→b over the static graph (bounded, first N). */
function findPaths(a, b, limit = 6) {
  const out = [];
  const seen = new Set();
  (function dfs(n, trail) {
    if (out.length >= limit) return;
    if (n === b && trail.length > 1) { out.push([...trail]); return; }
    if (seen.has(n)) return;
    seen.add(n);
    for (const nx of graph.get(n) || []) dfs(nx, [...trail, nx]);
    seen.delete(n);
  })(a, [a]);
  return out;
}

function allCycles() {
  const cycles = [];
  const idx = new Map(), low = new Map(), onstk = new Set(), stk = [];
  let i = 0;
  const strong = (v) => {
    idx.set(v, i); low.set(v, i); i++; stk.push(v); onstk.add(v);
    for (const w of graph.get(v) || []) {
      if (!idx.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
      else if (onstk.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)));
    }
    if (low.get(v) === idx.get(v)) {
      const comp = [];
      let w;
      do { w = stk.pop(); onstk.delete(w); comp.push(w); } while (w !== v);
      if (comp.length > 1) cycles.push(comp);
      else if ((graph.get(v) || new Set()).has(v)) cycles.push(comp);
    }
  };
  for (const v of graph.keys()) if (!idx.has(v)) strong(v);
  return cycles;
}

switch (flag) {
  case '--can': {
    const [importer, target] = args;
    if (!importer || !target) { console.log('usage: --can <importer.js> <target.js> [Name …]'); process.exit(2); }
    if (!graph.has(importer) || !graph.has(target)) {
      console.log(`unknown file(s): ${!graph.has(importer) ? importer : ''} ${!graph.has(target) ? target : ''}`);
      process.exit(2);
    }
    const names = argv.filter((a) => !a.startsWith('--')).slice(2);
    if ((graph.get(importer) || new Set()).has(target)) {
      console.log(`ALREADY: ${importer} already statically imports ${target}. No new edge needed.`);
      break;
    }
    const cyc = allCycles().find((c) => c.includes(importer) && c.includes(target));
    const back = cyc ? [] : findPaths(target, importer, 1);
    const closes = Boolean(cyc) || back.length > 0;

    if (!closes) {
      console.log(`SAFE: ${importer} → ${target} adds no cycle at all.`);
      break;
    }
    console.log(
      cyc
        ? `IN-SCC: ${importer} and ${target} are already in the same ${cyc.length}-module import cycle.`
        : `NEW-CYCLE: ${importer} → ${target} closes a cycle (${back[0].slice(0, 6).join(' → ')}…).`,
    );
    console.log(`A cycle by itself is NOT a defect here: js/ already runs with one`);
    console.log(`${allCycles().reduce((m, c) => Math.max(m, c.length), 0)}-module SCC. What breaks is a top-level (module-evaluation)`);
    console.log(`read of a binding the other module has not initialised yet (TDZ).\n`);

    const picked = names.length ? names : [...exportsOf(target).keys()];
    let hazard = 0;
    for (const n of picked) {
      const kind = exportsOf(target).get(n);
      if (!kind) { console.log(`  ${n.padEnd(24)} NOT EXPORTED by ${target} — check scripts/sym.mjs for the real home`); hazard++; continue; }
      const hoisted = kind === 'function';
      console.log(
        `  ${n.padEnd(24)} ${kind.padEnd(9)} ${hoisted ? 'hoisted — cycle-safe' : 'TDZ-HAZARD if read at top level'}`,
      );
      if (!hoisted) hazard++;
    }
    const tl = topLevelUse(importer);
    console.log(`\n${importer} top-level (import-time) executable statements: ${tl.count}`);
    if (tl.count) console.log(`  first at line ${tl.firstLine}: ${tl.sample}`);
    if (tl.hot.length) console.log(`  READS IMPORTED NAMES AT TOP LEVEL: ${tl.hot.join(', ')}\n  (those are the bindings a new cycle edge could actually break)`);
    console.log(
      hazard === 0
        ? `\nVERDICT: SAFE — every name requested is a hoisted function declaration.\n` +
          `Same shape as the 1866 edges already in js/. Cite this instead of a clone.`
        : `\nVERDICT: CHECK — ${hazard} name(s) are const/let/class bindings. Safe only if\n` +
          `${importer} reads them lazily inside function bodies, never at module top level.`,
    );
    break;
  }
  case '--cycles': {
    const cs = allCycles();
    console.log(`${cs.length} static cycle component(s) in js/:`);
    for (const c of cs.sort((a, b) => b.length - a.length)) {
      console.log(`\n  [${c.length}] ${c.sort().join(', ')}`);
    }
    if (!cs.length) console.log('  none');
    break;
  }
  case '--deps': {
    const f = args[0];
    if (!graph.has(f)) { console.log(`unknown: ${f}`); process.exit(2); }
    console.log(`${f} statically imports (${graph.get(f).size}):`);
    console.log('  ' + [...graph.get(f)].sort().join(' '));
    if (dyn.get(f).size) console.log(`\n  dynamic import() (no load-time edge): ${[...dyn.get(f)].sort().join(' ')}`);
    break;
  }
  case '--who': {
    const f = args[0];
    const who = [...graph].filter(([, s]) => s.has(f)).map(([k]) => k).sort();
    console.log(`${who.length} file(s) statically import ${f}:`);
    console.log('  ' + who.join(' '));
    break;
  }
  case '--path': {
    const [a, b] = args;
    const p = findPaths(a, b);
    if (!p.length) console.log(`no static path ${a} → ${b}`);
    else for (const x of p) console.log('  ' + x.join(' → '));
    break;
  }
  case '--rulecheck': {
    if (!nodeish.size) { console.log('Rule #2 clean: no bare/node specifiers or fs calls in js/.'); break; }
    console.log('Contest Rule #2 VIOLATIONS in scored js/:');
    for (const [f, bad] of nodeish) console.log(`  ${f}: ${bad.join(', ')}`);
    process.exitCode = 1;
    break;
  }
  default: {
    const edges = [...graph.values()].reduce((a, s) => a + s.size, 0);
    const cs = allCycles();
    console.log(`js/: ${graph.size} modules, ${edges} static import edges, ${cs.length} cycle component(s).`);
    console.log(`largest cycle: ${cs.length ? Math.max(...cs.map((c) => c.length)) : 0} modules`);
    const fanin = [...graph.keys()].map((k) => [k, [...graph].filter(([, s]) => s.has(k)).length])
      .sort((a, b) => b[1] - a[1]).slice(0, 8);
    console.log('most-imported: ' + fanin.map(([k, n]) => `${k}(${n})`).join(' '));
  }
}
