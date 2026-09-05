#!/usr/bin/env node
/**
 * brief.mjs — the whole orientation for one port iteration in ONE call.
 *
 *   node scripts/brief.mjs <C function> [--file eat.c] [--no-body]
 *   node scripts/brief.mjs --next            # first unchecked LOOP-QUEUE row
 *
 * Prints, in order: the queue row · the pinned-C body + every C call site
 * (csym) · which of its C callees exist in js/ (sym, clone counts) · the
 * same-named JS function with its file:line and body · the c-js-map
 * section for that C file · DIVERGENCE-INDEX rows naming it · the
 * hidden-proxy sessions currently blocked on it, with C vs JS toplines
 * and the replay command · reviews naming it. After this call the only
 * reads left are the JS neighbours you decide to edit.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCIndex } from './lib/c-index.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (k) => args.includes(`--${k}`);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
let fn = args.find((a) => !a.startsWith('--') && a !== val('file'));

function run(cmd, a) {
    const r = spawnSync(cmd, a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
    return (r.stdout || '') + (r.stderr && r.status ? r.stderr : '');
}
function h(t) { console.log(`\n${'='.repeat(78)}\n${t}\n${'='.repeat(78)}`); }

const queue = readFileSync(path.join(ROOT, 'docs/LOOP-QUEUE.md'), 'utf8');
if (flag('next') || !fn) {
    const row = queue.split('\n').find((l) => l.startsWith('- [ ]'));
    if (!row) { console.log('queue empty'); process.exit(0); }
    const m = /`[\w.]+`\s+([A-Za-z_]\w*)/.exec(row);
    fn = m ? m[1] : null;
    if (!fn) { console.log(row); process.exit(0); }
}

h(`QUEUE ROW for ${fn}`);
console.log(queue.split('\n').filter((l) => l.includes(fn) && l.startsWith('- [')).join('\n') || '(no queue row names it)');

const idx = loadCIndex();
const cfn = idx.fns.get(fn);
h(`PINNED C: ${fn}${cfn ? ` — ${cfn.file}:${cfn.start}–${cfn.end} (${cfn.lines} lines)` : ' (not a src/*.c function)'}`);
if (!flag('no-body')) console.log(run(process.execPath, ['scripts/csym.mjs', fn]));
console.log(run(process.execPath, ['scripts/csym.mjs', '--callers', fn]));

if (cfn) {
    const callees = new Set();
    for (const m of cfn.body.matchAll(/([A-Za-z_]\w*)\s*\(/g)) {
        if (m[1] !== fn && idx.fns.has(m[1]) && idx.fns.get(m[1]).lines >= 4) callees.add(m[1]);
    }
    h(`JS STATUS of ${fn} and its ${callees.size} C callees (sym.mjs)`);
    console.log(run(process.execPath, ['scripts/sym.mjs', fn, ...callees]));
}

h(`JS BODY of ${fn} (same name; helpers may hold the rest)`);
const g = run('grep', ['-rn', '-E', `^(export )?(async )?function ${fn}\\(|^(const|let) ${fn} =`, 'js/']);
const first = g.split('\n').find(Boolean);
if (first) {
    const [file, line] = first.split(':');
    const lines = readFileSync(path.join(ROOT, file), 'utf8').split('\n');
    const start = Math.max(0, +line - 25);
    let depth = 0, end = +line - 1, seen = false;
    for (let i = +line - 1; i < lines.length && i < +line + 400; i++) {
        for (const ch of lines[i]) { if (ch === '{') { depth++; seen = true; } else if (ch === '}') depth--; }
        if (seen && depth <= 0) { end = i; break; }
    }
    console.log(`${file}:${+line} (doc from :${start + 1}, body to :${end + 1})`);
    console.log(lines.slice(start, end + 1).map((l, i) => `${String(start + i + 1).padStart(5)}  ${l}`).join('\n'));
} else console.log('(no same-named JS function — check the map section below for where its arms live)');

if (cfn) {
    h(`C-JS MAP section for ${cfn.file}`);
    const ix = run(process.execPath, ['scripts/map.mjs', cfn.file, '--index']);
    console.log(ix.trim());
    const m = /(\w+\.md):(\d+)-(\d+)/.exec(ix);
    if (m) {
        const mp = path.join(ROOT, 'docs/c-js-map', m[1]);
        const ml = readFileSync(mp, 'utf8').split('\n').slice(+m[2] - 1, +m[3]);
        const hits = ml.filter((l) => l.includes(fn));
        console.log(hits.length ? `lines naming ${fn}:\n${hits.join('\n')}` : `(section does not name ${fn} — add it there when you ship)`);
    }
}

h(`DIVERGENCE-INDEX rows naming ${fn}`);
const dix = readFileSync(path.join(ROOT, 'docs/DIVERGENCE-INDEX.md'), 'utf8').split('\n')
    .filter((l) => l.startsWith('| D-') && l.includes(fn)).slice(0, 8);
console.log(dix.map((l) => l.slice(0, 220)).join('\n') || '(none — no earlier D-entry touched it)');

h(`HIDDEN-PROXY sessions blocked on ${fn}`);
const sp = path.join(ROOT, '.cache/hidden/scores.json');
const sb = path.join(ROOT, 'hidden-corpus/scoreboard.json');
const rows = existsSync(sp) ? Object.values(JSON.parse(readFileSync(sp, 'utf8')).rows)
    : existsSync(sb) ? Object.entries(JSON.parse(readFileSync(sb, 'utf8')).sessions).map(([id, r]) => ({ id, ...r })) : [];
const mine = rows.filter((r) => !r.passed && r.owner === fn);
if (!mine.length) console.log('(none blocked on it — verify with the public gates; `hidden-proxy verify` will say nothing to verify)');
for (const r of mine.slice(0, 6)) {
    console.log(`- ${r.id}  step ${r.step}/${r.steps}  kind=${r.kind}${r.loc || r.ownerFile ? ` at ${r.loc || r.ownerFile + ':' + r.ownerLine}` : ''}`);
    console.log(`    C: ${JSON.stringify(r.cTopline)}\n    J: ${JSON.stringify(r.jsTopline)}`);
    if (r.cEntry) console.log(`    C rng: ${r.cEntry}\n    J rng: ${r.jsEntry || '(none)'}${r.jsOwner ? ' from ' + r.jsOwner : ''}`);
    if (r.rowDiff) console.log(`    row ${r.rowDiff.row}: C ${JSON.stringify(r.rowDiff.c)} | J ${JSON.stringify(r.rowDiff.js)}`);
}
if (mine.length) console.log(`replay one: node frozen/ps_test_runner.mjs .cache/hidden/sessions/${mine[0].id}.session.json\nafter the port: node scripts/hidden-proxy.mjs verify ${fn}`);
const LEVEL_SCANS = new Set(['mineralize', 'bound_digging', 'wallification', 'wall_cleanup', 'fix_wall_spines',
    'place_lregion', 'put_lregion_here', 'makecorridors', 'dig_corridor', 'join', 'make_niches', 'makeniche',
    'wallify_map', 'set_wall_state', 'level_finalize_topology', 'mkinvokearea', 'fixup_special']);
if (mine.length && (LEVEL_SCANS.has(fn) || /^(mklev|mkmaze|mkmap|mkroom|rect|sp_lev)\.c$/.test(cfn?.file || ''))) {
    console.log(`GEOMETRY OWNER: ${fn} is where C *noticed* a level difference, not necessarily the writer.`);
    console.log(`measure C first (one call, ~1 s): node scripts/geom-probe.mjs ${mine[0].id}`);
    console.log('  (forks the recipe at the blocked step, records a wizard ^F map on the C recorder, replays JS, prints every differing map cell');
    console.log('   and the mineralize-eligible diff; RNG counts are location-blind — a JS FORCE that restores a count proves nothing; D-1849)');
}

h(`REVIEWS naming ${fn}`);
console.log(run('grep', ['-rl', `\\b${fn}\\b`, 'reviews/']).trim().split('\n').filter(Boolean).slice(-5).join('\n') || '(none)');
