#!/usr/bin/env node
/**
 * verify.mjs — every verification a port iteration owes, in ONE call.
 *
 *   node scripts/verify.mjs [--fn <C function>] [--base <git-rev>] [--full] [--no-cohort]
 *
 * Runs, in order, and prints one line each:
 *   1. syntax    node --check on every js/ file changed in the tree
 *   2. rule2     no fs/path/url/node: imports, no DIAG/FORCE, no seed names
 *                in the js/ diff
 *   3. hidden    hidden-proxy verify <fn> against the COMMITTED scoreboard
 *                (HEAD, or --base <rev>): every session blocked on that C fn
 *                is re-run on every call. Nothing blocked → `note`, not PASS.
 *   4. green     seed8000 + seed0900 RNG/screen + strict lengths (per session)
 *   5. cohort    seed1500/1800/0012/0004/0007/2200/0383
 *   6. full      all 44 public sessions (--full, or automatically when a
 *                shared file changed: rng/display/allmain/hack/monmove/vision)
 * On a cohort / full FAIL every failing session's first divergence (step,
 * row, owner, C vs JS row text) is printed in the same call — triage them
 * together before editing. Exit 1 on any FAIL; the failing tool's own
 * output follows the line.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (k) => args.includes(`--${k}`);
const val = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const fn = val('fn', null);

function sh(cmd, a, opts = {}) {
    const r = spawnSync(cmd, a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
    return { code: r.status ?? 1, out: (r.stdout || '') + (r.stderr || '') };
}
let failed = false;
function line(name, ok, detail, dump) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(8)} ${detail || ''}`);
    if (!ok) { failed = true; if (dump) console.log(dump.trim().split('\n').slice(-30).join('\n')); }
}

/* 1. syntax */
const changed = sh('git', ['diff', '--name-only', 'HEAD', '--', 'js/']).out.split('\n').filter((f) => f.endsWith('.js'));
const untracked = sh('git', ['ls-files', '--others', '--exclude-standard', 'js/']).out.split('\n').filter((f) => f.endsWith('.js'));
const files = [...new Set([...changed, ...untracked])];
let synOk = true, synOut = '';
for (const f of files) { const r = sh(process.execPath, ['--check', f]); if (r.code) { synOk = false; synOut += r.out; } }
line('syntax', synOk, `${files.length} changed js file(s)${files.length ? ': ' + files.join(' ') : ''}`, synOut);
if (untracked.some((f) => /_probe|probe_|DIAG|tmp/i.test(f))) line('leftover', false, `untracked probe/DIAG file in js/: ${untracked.join(' ')}`);

/* 2. rule2 + bans on the diff */
const diff = sh('git', ['diff', 'HEAD', '--', 'js/']).out;
const bad = diff.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'))
    .filter((l) => /from '(fs|path|url|node:[\w/]+)'|require\(|readFileSync|\bDIAG\b|\bFORCE\b|seed\d{4}|getRngLog\(\)\.length/.test(l));
line('rule2', bad.length === 0, bad.length ? `${bad.length} banned line(s)` : 'no fs/path/url/node: imports, no DIAG/FORCE/seed gates', bad.join('\n'));

/* 3. hidden-proxy verify — baseline is the committed scoreboard (HEAD, or
      --base <rev>), so a second verify in one iteration re-runs the same
      sessions. A vacuous verify (nothing blocked) prints `note`, never PASS. */
if (fn) {
    const base = val('base', null);
    const r = sh(process.execPath, ['scripts/hidden-proxy.mjs', 'verify', fn, ...(base ? ['--base', base] : [])]);
    const lines = r.out.trim().split('\n');
    const last = lines[lines.length - 1] || '';
    if (/no corpus session is blocked/.test(r.out)) {
        console.log(`note  hidden   ${last}`);
        console.log('               (not a corpus PASS; if the queue row cited N corpus blocks: node scripts/verify.mjs --fn <fn> --base <sha the row was queued at>)');
    } else {
        const ok = r.code === 0 && !/NO MOVEMENT/.test(last);
        line('hidden', ok, last, r.out);
        if (ok) for (const l of lines) if (/^  \S/.test(l)) console.log('     ' + l);
    }
} else {
    console.log('skip  hidden   (no --fn; pass the C function you ported to check the corpus sessions blocked on it)');
}

/* First divergence of every failing public session, in this same call, so
   the failures can be grouped by cause before any edit (D-1831 fixed them
   one at a time across four verify rounds). */
function explainFails(out) {
    const files = [...new Set([...out.matchAll(/FAIL: (\S+\.session\.json)/g)].map((m) => m[1]))].slice(0, 12);
    for (const f of files) {
        const w = sh(process.execPath, ['scripts/lib/hidden-worker.mjs', `sessions/${f}`]);
        let j = null;
        try { j = JSON.parse(w.out.trim().split('\n').pop()); } catch { /* worker crashed */ }
        if (!j) { console.log(`      ${f}: (worker failed) ${w.out.trim().split('\n').pop()}`); continue; }
        const rd = j.rowDiff;
        const where = rd
            ? ` row ${rd.row} (${rd.region}) C«${(rd.c || '').slice(0, 60)}» J«${(rd.js || '').slice(0, 60)}»`
            : j.kind === 'rng' ? ` C«${j.cEntry}» J«${j.jsEntry}»` : j.error ? ` throw: ${String(j.error).slice(0, 100)}` : '';
        console.log(`      ${f}: ${j.kind || 'error'}@${j.step}/${j.steps} owner=${j.owner || '?'}${where}`);
    }
    if (files.length) console.log('      → group by (row/region, owner), fix each cause once, then re-run verify. Detail: node scripts/lib/hidden-worker.mjs sessions/<file>');
}

/* 4. green gate */
const green = ['sessions/seed8000-tourist-starter.session.json', 'sessions/seed0900-tourist-explore-actions.session.json'];
{
    const r = sh(process.execPath, ['frozen/ps_test_runner.mjs', ...green]);
    const ok = /\b2\/2 passing/.test(r.out);
    line('green', ok, (r.out.match(/\d+\/\d+ passing/) || [''])[0], r.out);
    for (const s of green) {
        const st = sh(process.execPath, ['scripts/strict-output-check.mjs', s]);
        const okS = /^PASS/m.test(st.out) && !/^FAIL/m.test(st.out);
        line('strict', okS, path.basename(s), st.out);
    }
}

/* 5. cohort */
if (!flag('no-cohort')) {
    const cohort = ['seed1500', 'seed1800', 'seed0012', 'seed0004', 'seed0007', 'seed2200', 'seed0383']
        .map((p) => sh('sh', ['-c', `ls sessions/${p}*.session.json`]).out.trim()).filter(Boolean);
    const r = sh(process.execPath, ['frozen/ps_test_runner.mjs', ...cohort]);
    const m = r.out.match(/(\d+)\/(\d+) passing/);
    const ok = !!m && m[1] === m[2];
    line('cohort', ok, m ? m[0] : 'no result', r.out);
    if (!ok) explainFails(r.out);
}

/* 6. full suite when shared files changed or --full */
const shared = files.some((f) => /js\/(rng|display|allmain|hack|monmove|vision|jsmain|gstate|do|mklev|makemon|options)\.js$/.test(f));
if (flag('full') || shared) {
    const r = sh(process.execPath, ['frozen/ps_test_runner.mjs', 'sessions']);
    const m = r.out.match(/(\d+)\/(\d+) passing/);
    const ok = !!m && m[1] === m[2];
    line('full', ok, `${m ? m[0] : 'no result'}${shared && !flag('full') ? ' (auto: shared file changed)' : ''}`, r.out.split('\n').filter((l) => /FAIL/.test(l)).join('\n'));
    if (!ok) explainFails(r.out);
} else {
    console.log('skip  full     (no shared file changed; pass --full to force)');
}

console.log(failed ? '\nVERIFY: FAIL' : '\nVERIFY: PASS');
process.exit(failed ? 1 : 0);
