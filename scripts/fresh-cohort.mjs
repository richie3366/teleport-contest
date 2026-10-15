#!/usr/bin/env node
/**
 * fresh-cohort.mjs — the local generalization measurement (Constitution
 * §10.20). Authors a cohort of sessions on seeds the corpus has never
 * seen, scores it with the frozen runner **before** any port touches it,
 * and prints PASS / RNG / screens next to nothing else. The committed
 * corpus cannot measure generalization: every session in it is worked
 * until it passes (1408/1449 on 2026-10-13), while the judge's held-out
 * read 22/44, RNG 51.8 %. A fresh cohort scored on arrival is the only
 * local number that estimates the judge; the gap between the two is the
 * generator's calibration error.
 *
 *   node scripts/fresh-cohort.mjs --seed 620000 [--n 160] [--jobs 8]
 *        [--mix marathon:96,broad:32,mixed:32] [--fold] [--keep]
 *
 * --fold   copy the recipes into hidden-corpus/recipes (a grow); the next
 *          `hidden-proxy score` attributes their owners.
 * --keep   keep the temp recipe dir (printed) instead of deleting it.
 *
 * Writes .cache/hidden/fresh/<seed>.json (per-session metrics + summary).
 * Exit 3 when the C recorder is missing (same contract as
 * `hidden-proxy record`). Tooling only — never imported by js/.
 */
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, copyFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SESSIONS = path.join(ROOT, '.cache', 'hidden', 'sessions');
const OUT_DIR = path.join(ROOT, '.cache', 'hidden', 'fresh');
const RECIPES = path.join(ROOT, 'hidden-corpus', 'recipes');
const RECORDER = path.join(ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir', 'nethack');

const args = process.argv.slice(2);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 && args[i + 1] != null ? args[i + 1] : d; };
const flag = (k) => args.includes(`--${k}`);

const seed = Number(val('seed', NaN));
if (!Number.isFinite(seed)) { console.error('fresh-cohort: --seed <base> is required (pick a range no recipe uses)'); process.exit(2); }
const jobs = Number(val('jobs', 8));
const n = Number(val('n', 160));
const mix = val('mix', `marathon:${Math.round(n * 0.6)},broad:${Math.round(n * 0.2)},mixed:${n - Math.round(n * 0.6) - Math.round(n * 0.2)}`)
    .split(',').map((p) => p.split(':')).map(([f, k]) => [f, Number(k)]).filter(([, k]) => k > 0);

if (!existsSync(RECORDER)) { console.error('fresh-cohort: no C recorder (bash nethack-c/build-recorder.sh)'); process.exit(3); }

const tmp = mkdtempSync(path.join(os.tmpdir(), 'nh-fresh-'));
const recipeDir = path.join(tmp, 'recipes');
mkdirSync(recipeDir, { recursive: true });

/* 1. author: one scenario-gen run per family part, seeds base+k*1000 (parts < 1000) */
mix.forEach(([family, count], k) => {
    const base = seed + k * 1000;
    const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'scenario-gen.mjs'),
        '--family', family, '--n', String(count), '--seed', String(base), '--jobs', String(jobs), '--out', recipeDir],
    { cwd: ROOT, encoding: 'utf8' });
    const line = (r.stdout || '').split('\n').find((l) => l.startsWith('scenario-gen:')) || (r.stderr || '').trim().split('\n').pop();
    console.log(`author ${family} ×${count} @${base}: ${line}`);
});
const ids = readdirSync(recipeDir).filter((f) => f.endsWith('.recipe.json')).map((f) => f.replace(/\.recipe\.json$/, ''));
const clash = ids.filter((id) => existsSync(path.join(RECIPES, `${id}.recipe.json`))
    || existsSync(path.join(ROOT, 'hidden-corpus', 'recipes-archive', `${id}.recipe.json`)));
if (clash.length) console.log(`warning: ${clash.length} id(s) already in the corpus (not fresh): ${clash.slice(0, 3).join(', ')}…`);

/* 2. score with the frozen runner, `jobs` processes */
const sessions = ids.map((id) => path.join(SESSIONS, `${id}.session.json`)).filter((p) => existsSync(p));
const chunks = Array.from({ length: Math.min(jobs, sessions.length) }, (_, i) => sessions.filter((_, j) => j % jobs === i));
const runChunk = (list) => new Promise((resolve) => {
    let out = '';
    const p = spawn(process.execPath, [path.join(ROOT, 'frozen', 'ps_test_runner.mjs'), ...list], { cwd: ROOT });
    p.stdout.on('data', (d) => { out += d; });
    p.on('close', () => {
        const at = out.indexOf('__RESULTS_JSON__');
        try { resolve(at >= 0 ? JSON.parse(out.slice(at + 16)).results : []); } catch { resolve([]); }
    });
});
const results = (await Promise.all(chunks.map(runChunk))).flat();

/* 3. summary */
const fam = (s) => s.replace(/^scen-/, '').split('-')[0];
const agg = (rows) => rows.reduce((a, r) => ({
    n: a.n + 1, pass: a.pass + (r.passed ? 1 : 0),
    rm: a.rm + r.metrics.rngCalls.matched, rt: a.rt + r.metrics.rngCalls.total,
    sm: a.sm + r.metrics.screens.matched, st: a.st + r.metrics.screens.total,
}), { n: 0, pass: 0, rm: 0, rt: 0, sm: 0, st: 0 });
const pct = (a, b) => (b ? (100 * a / b).toFixed(1) : '-');
const line = (a) => `PASS ${a.pass}/${a.n} (${pct(a.pass, a.n)} %), RNG ${pct(a.rm, a.rt)} %, screens ${pct(a.sm, a.st)} %`;
const head = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).stdout.trim();
const total = agg(results);
console.log(`\nfresh cohort @${head} seeds ${seed}+ (${results.length} scored of ${ids.length} authored): ${line(total)}`);
const families = {};
for (const r of results) (families[fam(r.session)] ||= []).push(r);
for (const [f, rows] of Object.entries(families).sort()) console.log(`  ${f.padEnd(12)} ${line(agg(rows))}`);
console.log('compare: node scripts/leaderboard.mjs (held-out). The gap is the generator\'s calibration error.');

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(path.join(OUT_DIR, `${seed}.json`), JSON.stringify({
    at: new Date().toISOString(), commit: head, seed, mix, summary: total,
    families: Object.fromEntries(Object.entries(families).map(([f, rows]) => [f, agg(rows)])),
    sessions: results.map((r) => ({ id: r.session.replace(/\.session\.json$/, ''), passed: r.passed, rng: r.metrics.rngCalls, screens: r.metrics.screens, error: r.error })),
}, null, 1) + '\n');

if (flag('fold')) {
    let k = 0;
    for (const id of ids) {
        const dst = path.join(RECIPES, `${id}.recipe.json`);
        if (!existsSync(dst)) { copyFileSync(path.join(recipeDir, `${id}.recipe.json`), dst); k++; }
    }
    console.log(`folded ${k} recipe(s) into hidden-corpus/recipes — next: node scripts/hidden-proxy.mjs score --jobs ${jobs} (full)`);
}
if (flag('keep')) console.log(`recipes kept in ${recipeDir}`);
else rmSync(tmp, { recursive: true, force: true });
