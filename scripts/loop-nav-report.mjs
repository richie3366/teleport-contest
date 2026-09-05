#!/usr/bin/env node
/**
 * Navigation-discipline report over `.agent-port-loop-logs/iter-*.raw`.
 * Supplies the trial metrics the density proposal specified but had no
 * tooling for: tool calls / iter, nav share, tokens per call, and counts of
 * the grep classes that a checked-in script already answers.
 *
 *   node scripts/loop-nav-report.mjs            # last 40 iterations
 *   node scripts/loop-nav-report.mjs 120        # last 120
 *   node scripts/loop-nav-report.mjs 40 --json  # machine-readable
 *   node scripts/loop-nav-report.mjs 200 --blocks   # 25-iteration trend blocks
 *
 * Grep classes flagged (each has a deterministic script that answers it in
 * ONE call, so a hit is a discipline miss, not a tooling gap):
 *   symbol   -> scripts/sym.mjs        exported/async/clone-count
 *   cmap     -> scripts/map.mjs        c-js-map section retrieval
 *   csrc     -> scripts/csym.mjs       pinned-C definition + callers
 *   imports  -> scripts/imports.mjs    import edge / cycle / Rule #2
 *   book     -> mechanical bookkeeping (Addressed:/queue/canary sweeps)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseRawText, extractUsageFromRaw } from './loop-raw.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logDir = join(root, '.agent-port-loop-logs');

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const blocks = argv.includes('--blocks');
const gate = argv.includes('--gate');
const rawArg = argv.find((a) => a.endsWith('.raw'));
const N = Number(argv.find((a) => /^\d+$/.test(a)) || 40);

/* Minimum greps of one class, with ZERO calls to the script that answers
 * it, before the gate names that class. Tuned to fire on a substitution
 * failure, not on absolute volume — so it goes quiet as adoption rises. */
const GATE_MIN = Number(process.env.LOOP_NAV_GATE_MIN || 8);

const CLASS = [
  ['symbol', /export\s*\(?\s*async|export\s+function|export\s+const|export\s*\{/i, 'scripts/sym.mjs'],
  ['imports', /from\s*\[?['"\\]+(\.|node:|fs['"])|readFileSync|^import\s/i, 'scripts/imports.mjs'],
  ['book', /Addressed|-\s*\\?\[[ x]\\?\]|agent-tmp|canary/i, 'mechanical script'],
  ['cmap', /c-js-map|\bD-\d{3,4}\b/i, 'scripts/map.mjs'],
  ['csrc', /nethack-c|upstream\/(src|include)|\.[ch]\b/i, 'scripts/csym.mjs'],
];

function classify(pat) {
  for (const [name, re] of CLASS) if (re.test(pat)) return name;
  if (/^[A-Za-z_][\w]*(\s*\|\s*[A-Za-z_][\w]*)*$/.test(pat.trim())) return 'symbol';
  return 'other';
}

const files = rawArg
  ? [{ f: basename(rawArg), n: Number((basename(rawArg).match(/^iter-(\d+)/) || [0, 0])[1]) }]
  : readdirSync(logDir)
      .filter((f) => /^iter-\d+-.*\.raw$/.test(f))
      .map((f) => ({ f, n: Number(f.match(/^iter-(\d+)/)[1]) }))
      .sort((a, b) => a.n - b.n)
      .slice(-N);
const dirFor = (f) => (rawArg ? dirname(resolve(rawArg)) : logDir);

const rows = [];
for (const { f, n } of files) {
  let dur = 0, calls = 0;
  const kind = Object.create(null);
  const cls = Object.create(null);
  const scripts = Object.create(null);
  let cmapReads = 0, cReads = 0;
  const rawText = readFileSync(join(dirFor(f), f), 'utf8');
  const { events } = parseRawText(rawText);
  const { total: tokens } = extractUsageFromRaw(rawText);
  for (const ev of events) {
    if (ev.type === 'result') { dur = ev.duration_ms || 0; }
    if (ev.type !== 'tool_call' || ev.subtype !== 'started') continue;
    for (const [k, v] of Object.entries(ev.tool_call || {})) {
      if (!k.endsWith('ToolCall')) continue;
      const t = k.slice(0, -8);
      kind[t] = (kind[t] || 0) + 1; calls++;
      const a = (v && v.args) || {};
      if (t === 'grep' || t === 'glob') {
        const c = classify(String(a.pattern || a.globPattern || ''));
        cls[c] = (cls[c] || 0) + 1;
      } else if (t === 'read') {
        const p = String(a.path || '');
        if (p.includes('/docs/c-js-map/')) cmapReads++;
        if (p.includes('/nethack-c/')) cReads++;
      } else if (t === 'shell') {
        for (const m of String(a.command || '').matchAll(/scripts\/([\w.-]+\.mjs)/g))
          scripts[m[1]] = (scripts[m[1]] || 0) + 1;
      }
    }
  }
  const nav = (kind.read || 0) + (kind.grep || 0) + (kind.glob || 0);
  rows.push({
    n, calls, tokens, min: +(dur / 60000).toFixed(1),
    nav, navShare: calls ? +(nav / calls).toFixed(2) : 0,
    tokPerCall: calls ? Math.round(tokens / calls) : 0,
    reads: kind.read || 0, greps: (kind.grep || 0) + (kind.glob || 0), edits: kind.edit || 0,
    cmapReads, cReads, cls, scripts,
  });
}

if (gate) {
  /* Which grep classes did this iteration do by hand while never calling
   * the script that answers them in one call? Silence = nothing to say. */
  const OWNER = [
    ['symbol', 'sym.mjs', 'JS export / async / clone-count'],
    ['cmap', 'map.mjs', 'the c-js-map section for a C file'],
    ['csrc', 'csym.mjs', 'a pinned-C definition or its call sites'],
    ['imports', 'imports.mjs', 'an import edge, cycle, or Rule #2 check'],
  ];
  const r = rows[rows.length - 1];
  if (!r) process.exit(0);
  const missed = OWNER.filter(([cls, script]) =>
    (r.cls[cls] || 0) >= GATE_MIN && !(r.scripts[script] > 0));
  if (!missed.length) process.exit(0);
  const cost = missed.reduce((a, [c]) => a + (r.cls[c] || 0), 0) * Math.round(r.tokPerCall / 1000);
  console.log('The supervisor scanned your tool calls. You answered these by hand');
  console.log('with repeated greps, and never called the script that returns the same');
  console.log(`primary evidence in ONE call (~${cost}k tokens spent on navigation):`);
  console.log('');
  for (const [cls, script, what] of missed)
    console.log(`  ${String(r.cls[cls]).padStart(3)} × ${what}\n      -> node scripts/${script}   (0 calls this iteration)`);
  console.log('');
  console.log('This is a navigation note, not a correctness finding: nothing is');
  console.log('reverted and nothing is blocked. Use the script first this iteration.');
  console.log('It returns primary source, not a summary — it is not a shortcut past');
  console.log('re-reading the C function before you patch.');
  process.exit(10);
}

if (asJson) { console.log(JSON.stringify(rows)); process.exit(0); }

const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const col = (k) => rows.map((r) => r[k]);

function summarise(rs, label) {
  const m = (k) => med(rs.map((r) => r[k]));
  const sum = (k) => rs.reduce((a, r) => a + (r.cls[k] || 0), 0) / rs.length;
  const avoidable = ['symbol', 'book', 'imports', 'cmap', 'csrc'].reduce((a, k) => a + sum(k), 0);
  const scr = (k) => rs.reduce((a, r) => a + (r.scripts[k] || 0), 0) / rs.length;
  console.log(
    `${label.padEnd(15)} n=${String(rs.length).padStart(3)}  calls=${String(m('calls')).padStart(4)}` +
    `  tok=${(m('tokens') / 1e6).toFixed(2)}M  min=${String(m('min')).padStart(5)}` +
    `  nav=${(rs.reduce((a, r) => a + r.navShare, 0) / rs.length * 100).toFixed(0)}%` +
    `  cmapRd=${m('cmapReads')}  cRd=${m('cReads')}` +
    `  | avoidable greps/iter: ${avoidable.toFixed(1)}` +
    ` (sym=${sum('symbol').toFixed(1)} book=${sum('book').toFixed(1)} imp=${sum('imports').toFixed(1)} cmap=${sum('cmap').toFixed(1)} csrc=${sum('csrc').toFixed(1)})` +
    `  | sym.mjs=${scr('sym.mjs').toFixed(1)} map.mjs=${scr('map.mjs').toFixed(1)} csym.mjs=${scr('csym.mjs').toFixed(1)} imports.mjs=${scr('imports.mjs').toFixed(1)}`,
  );
}

if (blocks) {
  for (let i = 0; i < rows.length; i += 25) {
    const c = rows.slice(i, i + 25);
    summarise(c, `#${c[0].n}-${c[c.length - 1].n}`);
  }
} else {
  console.log(`iter   calls   tokens   min   nav%  reads greps edits  cmapRd cRd  avoidable-greps`);
  for (const r of rows) {
    const av = Object.entries(r.cls).filter(([k]) => k !== 'other')
      .map(([k, v]) => `${k}:${v}`).join(' ');
    console.log(
      `${String(r.n).padEnd(6)} ${String(r.calls).padStart(5)} ${(r.tokens / 1e6).toFixed(2).padStart(7)}M ${String(r.min).padStart(5)} ` +
      `${String(Math.round(r.navShare * 100)).padStart(5)}% ${String(r.reads).padStart(6)} ${String(r.greps).padStart(5)} ${String(r.edits).padStart(5)} ` +
      `${String(r.cmapReads).padStart(7)} ${String(r.cReads).padStart(3)}  ${av}`,
    );
  }
  console.log('');
  summarise(rows, 'MEDIAN');
  const totalTok = rows.reduce((a, r) => a + r.tokens, 0);
  const perCall = totalTok / rows.reduce((a, r) => a + r.calls, 0);
  console.log(`\nMarginal cost of one tool call: ~${(perCall / 1000).toFixed(0)}k tokens.`);
  console.log(`Every avoidable grep/read above is that price. A checked-in script`);
  console.log(`answers each class in one call — see the header of this file.`);
}
