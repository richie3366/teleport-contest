#!/usr/bin/env node
// fuzz-oracle.mjs — C3 differential session oracle (operator/audit tooling).
// Never writes sessions/. Not a loop work-picker and not a second scorer.
//
//   node scripts/fuzz-oracle.mjs preflight
//   node scripts/fuzz-oracle.mjs batch --mode explore|random|independent|all
//   node scripts/fuzz-oracle.mjs batch --first-batch
//   node scripts/fuzz-oracle.mjs minimize <recipe-or-session>
//   node scripts/fuzz-oracle.mjs corpus
//   node scripts/fuzz-oracle.mjs triage
//   node scripts/fuzz-oracle.mjs compare --self-test

import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
    existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync,
    statSync, rmSync, cpSync,
} from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    scoreSession, firstDiff, metricsShape,
} from './lib/fuzz-compare.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const RECORD = path.join(SCRIPT_DIR, 'record-session.mjs');
const VERIFY = path.join(SCRIPT_DIR, 'verify-rerecord.mjs');
const COMPARE = path.join(SCRIPT_DIR, 'lib', 'fuzz-compare.mjs');
const DATA = path.join(SCRIPT_DIR, 'data');
const CACHE = path.join(ROOT, '.cache', 'fuzz');
const PRIVATE = path.join(ROOT, 'private-sessions');
const DEFAULT_INSTALL = path.join(
    ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const DEFAULT_BINARY = path.join(DEFAULT_INSTALL, 'nethack');
const DEFAULT_SEED = 20260828;
const WORKER_ROOT = '/tmp/nhfz';
const PIN_DATETIME = '20000110090000';
const PIN_TZ = 'America/New_York';

function usage() {
    console.error(`Usage:
  node scripts/fuzz-oracle.mjs preflight
  node scripts/fuzz-oracle.mjs batch [--mode explore|random|independent|all]
       [--n N] [--n-explore N] [--n-random N] [--n-independent N]
       [--tail N] [--tail-explore N] [--tail-random N] [--tail-independent N]
       [--jobs N] [--seed N] [--wizard-keys] [--first-batch]
  node scripts/fuzz-oracle.mjs minimize <recipe.json|session.json|batch-id>
  node scripts/fuzz-oracle.mjs corpus [--check]
  node scripts/fuzz-oracle.mjs triage
  node scripts/fuzz-oracle.mjs compare --self-test`);
}

function argFlag(args, name) {
    return args.includes(`--${name}`);
}

function argVal(args, name, fallback) {
    const i = args.indexOf(`--${name}`);
    if (i < 0) return fallback;
    return args[i + 1] ?? fallback;
}

function shuffleCopy(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a;
}

function drawN(list, n, rng) {
    if (!list.length || n <= 0) return [];
    const out = [];
    let bag = [];
    while (out.length < n) {
        if (!bag.length) bag = shuffleCopy(list, rng);
        out.push(bag.pop());
    }
    return out;
}

function countFor(args, mode, firstBatch) {
    const named = argVal(args, `n-${mode}`, null);
    if (named != null) return Number(named);
    if (firstBatch) {
        return { explore: 8, random: 8, independent: 4 }[mode];
    }
    const n = argVal(args, 'n', null);
    if (n != null) return Number(n);
    return { explore: 8, random: 8, independent: 4 }[mode];
}

function tailFor(args, mode, firstBatch) {
    const named = argVal(args, `tail-${mode}`, null);
    if (named != null) return Number(named);
    if (firstBatch) {
        return { explore: 80, random: 25, independent: 80 }[mode];
    }
    const t = argVal(args, 'tail', null);
    if (t != null) return Number(t);
    return { explore: 80, random: 25, independent: 80 }[mode];
}

function gitHead() {
    const out = spawnSync('git', ['rev-parse', 'HEAD'], {
        cwd: ROOT, encoding: 'utf8',
    });
    return (out.stdout || '').trim();
}

function synthesizeNethackrc(role) {
    return [
        `OPTIONS=name:${role.name},role:${role.role},race:${role.race},gender:${role.gender},align:${role.align}`,
        'OPTIONS=!legacy,!splash_screen,!tutorial',
        'OPTIONS=suppress_alert:3.4.3',
        'OPTIONS=symset:DECgraphics',
        '',
    ].join('\n');
}

function sameHit(scored, row, rngFirst) {
    if (rngFirst) {
        if (scored.firstRng == null) return false;
        if (typeof row.firstRng === 'number') return scored.firstRng === row.firstRng;
        return true;
    }
    if (!row.cTopline && !row.jsTopline) return true;
    return normTopline(scored.cTopline) === normTopline(row.cTopline)
        && normTopline(scored.jsTopline) === normTopline(row.jsTopline);
}

function lastSegMoveCount(session) {
    const segs = session.segments || [];
    return ((segs[segs.length - 1] || {}).moves || '').length;
}

function mulberry32(a) {
    let t = a >>> 0;
    return function rng() {
        t += 0x6D2B79F5;
        let x = t;
        x = Math.imul(x ^ (x >>> 15), x | 1);
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}

function sampleKeys(rng, alphabet, n) {
    let total = 0;
    for (const row of alphabet) total += row.weight;
    let out = '';
    for (let i = 0; i < n; i++) {
        let x = rng() * total;
        let ch = alphabet[alphabet.length - 1].ch;
        for (const row of alphabet) {
            x -= row.weight;
            if (x <= 0) { ch = row.ch; break; }
        }
        out += ch;
    }
    return out;
}

function loadJson(p) {
    return JSON.parse(readFileSync(p, 'utf8'));
}

function loadOmitPatterns() {
    const rows = loadJson(path.join(DATA, 'fuzz-omit-patterns.json'));
    for (const row of rows) {
        const file = path.join(ROOT, row.citeFile);
        const text = readFileSync(file, 'utf8');
        if (!text.includes(row.citePattern)) {
            throw new Error(
                `omit ${row.id}: citePattern ${JSON.stringify(row.citePattern)} not found in ${row.citeFile}`,
            );
        }
        row._re = new RegExp(row.hitRe || row.jsRe);
    }
    return rows;
}

function loadAlphabets() {
    return loadJson(path.join(DATA, 'fuzz-alphabets.json'));
}

function loadBases() {
    return loadJson(path.join(DATA, 'fuzz-bases.json'));
}

function isCoverageText(s) {
    if (!s) return false;
    return /Unknown command/i.test(s)
        || /Unknown direction/i.test(s)
        || /unknown extended command/i.test(s)
        || /role not ported/i.test(s)
        || /not yet ported/i.test(s);
}

function normTopline(s) {
    return String(s || '')
        .replace(/--More--/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function classify({ result, diff, omitPatterns }) {
    const err = result?.error || diff?.jsError || null;
    const cLine = diff?.cTopline || '';
    const jsLine = diff?.jsTopline || '';
    if (err) {
        if (isCoverageText(err)) {
            return { bucket: 'coverage', omitId: null, reason: err };
        }
        return { bucket: 'error', omitId: null, reason: err };
    }
    if (isCoverageText(jsLine)) {
        return { bucket: 'coverage', omitId: null, reason: jsLine };
    }
    const hit = `${cLine}\n${jsLine}`;
    for (const row of omitPatterns) {
        if (row._re.test(cLine) || row._re.test(jsLine) || row._re.test(hit)) {
            return { bucket: 'named-omit', omitId: row.id, reason: row.id };
        }
    }
    return { bucket: 'fidelity', omitId: null, reason: `${cLine} | ${jsLine}` };
}

function collectProvenance() {
    const run = (cmd, fallback = '') => {
        try {
            return spawnSync(cmd, { shell: true, encoding: 'utf8', cwd: ROOT }).stdout.trim();
        } catch {
            return fallback;
        }
    };
    const patches = {};
    const patchDir = path.join(ROOT, 'nethack-c', 'patches');
    if (existsSync(patchDir)) {
        for (const name of readdirSync(patchDir).filter((n) => n.endsWith('.patch')).sort()) {
            const out = run(`shasum -a 256 ${JSON.stringify(path.join(patchDir, name))}`);
            patches[name] = (out.split(/\s+/)[0] || '').trim();
        }
    }
    let bin = { path: DEFAULT_BINARY, mtimeMs: 0, size: 0 };
    try {
        const st = statSync(DEFAULT_BINARY);
        bin = { path: DEFAULT_BINARY, mtimeMs: st.mtimeMs, size: st.size };
    } catch {}
    return {
        upstreamSha: run('git -C nethack-c/upstream rev-parse HEAD'),
        patches,
        clang: (run('clang --version').split('\n')[0] || '').trim(),
        binary: bin,
        datetime: PIN_DATETIME,
        timezone: PIN_TZ,
        capturedAt: new Date().toISOString(),
    };
}

function sessionStem(file) {
    return path.basename(file).replace(/\.session\.json$/, '');
}

function isWizardBase(nethackrc) {
    return /playmode\s*:\s*debug/i.test(nethackrc || '')
        || /playmode\s*:\s*wizard/i.test(nethackrc || '');
}

function alphabetFor(mode, alphabets, { wizardKeys, nethackrc }) {
    const rows = [...(alphabets[mode] || alphabets.explore)];
    if (wizardKeys && isWizardBase(nethackrc) && alphabets.wizardKeys) {
        rows.push(...alphabets.wizardKeys);
    }
    return rows;
}

function expectedMinSteps(session, lastPrefixMoves) {
    let n = lastPrefixMoves.length + 1;
    const segs = session.segments || [];
    for (let i = 0; i < segs.length - 1; i++) {
        const st = segs[i].steps;
        n += Array.isArray(st) && st.length
            ? st.length
            : ((segs[i].moves || '').length + 1);
    }
    return n;
}

function buildTailMutant(baseSession, baseMeta, suffix, { timezone }) {
    const segs = JSON.parse(JSON.stringify(baseSession.segments));
    const last = segs[segs.length - 1];
    const trim = Number(baseMeta.trimTail ?? 12);
    const raw = last.moves || '';
    const cut = Math.min(trim, Math.max(0, raw.length - 1));
    const prefixMoves = raw.slice(0, raw.length - cut);
    last.moves = prefixMoves + suffix;
    last.timezone = last.timezone || timezone;
    last.datetime = last.datetime || PIN_DATETIME;
    delete last.steps;
    return {
        recipe: {
            version: 5,
            timezone,
            fuzz: {
                mode: 'tail',
                base: baseMeta.file,
                trimTail: cut,
                prefixMoves,
                suffix,
            },
            segments: segs,
        },
        prefixMoves,
        minSteps: expectedMinSteps(baseSession, prefixMoves),
    };
}

function buildIndependent({ nethackrc, chargenMoves, suffix, seed, timezone, meta }) {
    const prefixMoves = chargenMoves || '';
    const moves = prefixMoves + suffix;
    return {
        recipe: {
            version: 5,
            timezone,
            fuzz: {
                mode: 'independent',
                ...meta,
                prefixMoves,
                suffix,
            },
            segments: [{
                seed,
                datetime: PIN_DATETIME,
                timezone,
                nethackrc,
                moves,
            }],
        },
        prefixMoves,
        minSteps: Math.max(3, prefixMoves.length + 1),
        nethackrc,
    };
}

async function recordRecipe(recipePath, sessionPath, { installDir, binary, minSteps, timezone }) {
    await fs.mkdir(path.dirname(sessionPath), { recursive: true });
    return await new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [RECORD, recipePath, sessionPath], {
            env: {
                ...process.env,
                NETHACK_INSTALL: installDir,
                NETHACK_BINARY: binary,
                RECORD_MIN_STEPS: String(minSteps),
                RERECORD_TZ: timezone,
            },
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        let stderr = '';
        child.stderr.on('data', (b) => { stderr += b.toString('utf8'); });
        child.on('error', reject);
        child.on('close', (code) => {
            if (code === 0) resolve({ ok: true, stderr });
            else resolve({ ok: false, stderr, code });
        });
    });
}

async function poolMap(items, jobs, fn) {
    const out = new Array(items.length);
    let next = 0;
    async function worker(wid) {
        for (;;) {
            const i = next++;
            if (i >= items.length) return;
            out[i] = await fn(items[i], i, wid);
        }
    }
    const n = Math.max(1, Math.min(jobs, items.length));
    await Promise.all(Array.from({ length: n }, (_, w) => worker(w)));
    return out;
}

function prepareWorkerInstalls(jobs) {
    rmSync(WORKER_ROOT, { recursive: true, force: true });
    mkdirSync(WORKER_ROOT, { recursive: true });
    const installs = [];
    for (let i = 0; i < jobs; i++) {
        const dest = path.join(WORKER_ROOT, `w${i}`);
        cpSync(DEFAULT_INSTALL, dest, { recursive: true });
        if (dest.length > 128) {
            throw new Error(`worker HACKDIR ${dest} is ${dest.length} chars (>128)`);
        }
        installs.push({
            installDir: dest,
            binary: path.join(dest, 'nethack'),
        });
    }
    return installs;
}

function hashSuffix(s) {
    return createHash('sha1').update(s).digest('hex').slice(0, 8);
}

function printDashboard(rows) {
    const bySeverity = [...rows].sort((a, b) => {
        const da = (a.rngT - a.rngM) - (b.rngT - b.rngM);
        if (da !== 0) return -da;
        return (b.scrT - b.scrM) - (a.scrT - a.scrM);
    });
    const byQueue = [...rows].sort((a, b) => {
        const aClean = a.rngM === a.rngT ? 0 : 1;
        const bClean = b.rngM === b.rngT ? 0 : 1;
        if (aClean !== bClean) return aClean - bClean;
        const ds = (a.scrT - a.scrM) - (b.scrT - b.scrM);
        if (ds !== 0) return ds;
        const sl = (a.suffix || '').length - (b.suffix || '').length;
        if (sl !== 0) return sl;
        const ao = a.bucket === 'named-omit' ? 1 : 0;
        const bo = b.bucket === 'named-omit' ? 1 : 0;
        return ao - bo;
    });

    const counts = {};
    for (const r of rows) counts[r.bucket] = (counts[r.bucket] || 0) + 1;
    console.log('\n=== dashboard (severity: RNG delta desc) ===');
    console.log(`n=${rows.length} buckets=${JSON.stringify(counts)}`);
    for (const r of bySeverity) {
        const tag = r.passed ? 'PASS' : r.bucket;
        console.log(
            `  [${tag}] rng ${r.rngM}/${r.rngT} scr ${r.scrM}/${r.scrT}`
            + ` ${r.mode} ${r.id}\n    C: ${r.cTopline}\n    J: ${r.jsTopline}`,
        );
    }
    console.log('\n=== queue sort (actionability) ===');
    for (const r of byQueue) {
        const eligible = r.bucket === 'fidelity' && !r.passed;
        const label = eligible
            ? 'queue-eligible after minimize + C locus'
            : (r.bucket === 'coverage' || r.bucket === 'named-omit'
                ? 'coverage / named omit'
                : r.bucket);
        console.log(`  ${label}: ${r.id} (${r.bucket})`);
    }
}

async function scoreAndDiff(sessionPath, omitPatterns) {
    const result = scoreSession(sessionPath) || {
        session: path.basename(sessionPath),
        passed: false,
        metrics: { rngCalls: { matched: 0, total: 0 }, screens: { matched: 0, total: 0 } },
        error: 'scoreSession returned empty result',
    };
    const m = metricsShape(result);
    let diff = {
        firstScreen: null,
        firstRng: null,
        firstAny: null,
        cTopline: '',
        jsTopline: '',
        jsError: result.error || null,
    };
    if (!result.passed) {
        try {
            diff = await firstDiff(sessionPath);
        } catch (e) {
            diff.jsError = e.message;
        }
    }
    const cls = result.passed
        ? { bucket: 'pass', omitId: null, reason: 'PASS' }
        : classify({ result, diff, omitPatterns });
    return { result, ...m, ...diff, ...cls, passed: !!result.passed, error: result.error || null };
}

async function cmdPreflight() {
    const child = spawnSync(process.execPath, [VERIFY], {
        cwd: ROOT,
        stdio: 'inherit',
    });
    process.exit(child.status ?? 1);
}

async function cmdCompareSelfTest() {
    const child = spawnSync(process.execPath, [COMPARE, '--self-test'], {
        cwd: ROOT,
        stdio: 'inherit',
    });
    process.exit(child.status ?? 1);
}

function usableTailBases(sessionBases, defaults) {
    const minPrefix = defaults.minPrefixAfterTrim ?? 16;
    const out = [];
    for (const spec of sessionBases) {
        if (spec.restore) {
            out.push(spec);
            continue;
        }
        const session = loadJson(path.join(ROOT, spec.file));
        const lastMoves = lastSegMoveCount(session);
        const trim = Number(spec.trimTail ?? defaults.trimTail ?? 12);
        const cut = Math.min(trim, Math.max(0, lastMoves - 1));
        const remain = lastMoves - cut;
        const floor = spec.minPrefixAfterTrim ?? minPrefix;
        if (remain < floor) {
            console.error(`skip base ${spec.file}: prefix after trim ${remain} < ${floor}`);
            continue;
        }
        out.push(spec);
    }
    return out;
}

function planMutants(args) {
    const firstBatch = argFlag(args, 'first-batch');
    const modeArg = argVal(args, 'mode', firstBatch ? 'all' : 'explore');
    const jobs = Number(argVal(args, 'jobs', 4));
    const seed = Number(argVal(args, 'seed', DEFAULT_SEED));
    const wizardKeys = argFlag(args, 'wizard-keys');
    const bases = loadBases();
    const alphabets = loadAlphabets();
    const rng = mulberry32(seed);

    const modes = modeArg === 'all'
        ? ['explore', 'random', 'independent']
        : [modeArg];
    const defaults = bases.defaults || {};
    const sessionBases = usableTailBases(bases.sessions || [], defaults);
    const roleRoster = bases.independentRoles
        || bases.independent
        || [];

    const planned = [];
    for (const mode of modes) {
        const n = countFor(args, mode, firstBatch);
        const tail = tailFor(args, mode, firstBatch);
        if (mode === 'independent') {
            const picks = drawN(roleRoster, n, rng);
            for (const spec of picks) {
                let nethackrc;
                let chargen = spec.chargenMoves || '';
                let meta;
                if (spec.nethackrcFrom) {
                    const src = loadJson(path.join(ROOT, spec.nethackrcFrom));
                    nethackrc = src.segments[0].nethackrc || '';
                    meta = { nethackrcFrom: spec.nethackrcFrom };
                } else {
                    nethackrc = synthesizeNethackrc(spec);
                    meta = { role: spec.role, name: spec.name };
                }
                const alphabet = alphabetFor('explore', alphabets, { wizardKeys, nethackrc });
                const suffix = sampleKeys(rng, alphabet, tail);
                const gameSeed = (Math.floor(rng() * 0x7fffffff) % 999_999_937) + 1;
                const built = buildIndependent({
                    nethackrc, chargenMoves: chargen, suffix, seed: gameSeed,
                    timezone: PIN_TZ, meta,
                });
                planned.push({
                    id: `ind-${spec.role || gameSeed}-${gameSeed}-${hashSuffix(suffix)}`,
                    mode,
                    suffix,
                    ...built,
                });
            }
            continue;
        }
        const picks = drawN(sessionBases, n, rng);
        for (const spec of picks) {
            const session = loadJson(path.join(ROOT, spec.file));
            const rc = session.segments[0].nethackrc || '';
            const alphabet = alphabetFor(mode, alphabets, { wizardKeys, nethackrc: rc });
            const suffix = sampleKeys(rng, alphabet, tail);
            const built = buildTailMutant(session, spec, suffix, { timezone: PIN_TZ });
            built.recipe.fuzz.mode = mode;
            planned.push({
                id: `${mode}-${sessionStem(spec.file)}-${hashSuffix(suffix)}`,
                mode,
                base: spec.file,
                suffix,
                ...built,
            });
        }
    }
    return { planned, jobs, seed, wizardKeys, firstBatch };
}

async function cmdBatch(args) {
    const omitPatterns = loadOmitPatterns();
    const { planned, jobs, seed, firstBatch } = planMutants(args);
    mkdirSync(CACHE, { recursive: true });
    const batchDir = path.join(CACHE, `batch-${Date.now()}`);
    mkdirSync(batchDir, { recursive: true });

    console.error(`batch n=${planned.length} jobs=${jobs} seed=${seed} install copies → ${WORKER_ROOT}`);
    const installs = prepareWorkerInstalls(jobs);
    const recorded = [];
    try {
        const recs = await poolMap(planned, jobs, async (mut, _i, wid) => {
            const recipePath = path.join(batchDir, `${mut.id}.recipe.json`);
            const sessionPath = path.join(batchDir, `${mut.id}.session.json`);
            writeFileSync(recipePath, JSON.stringify(mut.recipe, null, 2));
            const inst = installs[wid];
            const rec = await recordRecipe(recipePath, sessionPath, {
                installDir: inst.installDir,
                binary: inst.binary,
                minSteps: mut.minSteps,
                timezone: PIN_TZ,
            });
            return { mut, recipePath, sessionPath, rec };
        });
        for (const row of recs) {
            if (!row.rec.ok) {
                recorded.push({
                    id: row.mut.id,
                    mode: row.mut.mode,
                    base: row.mut.base || null,
                    suffix: row.mut.suffix,
                    prefixMoves: row.mut.prefixMoves,
                    recipePath: row.recipePath,
                    sessionPath: row.sessionPath,
                    passed: false,
                    bucket: 'error',
                    omitId: null,
                    error: `record failed: ${(row.rec.stderr || '').split('\n').pop()}`,
                    rngM: 0, rngT: 0, scrM: 0, scrT: 0,
                    cTopline: '', jsTopline: '',
                    firstScreen: null, firstRng: null,
                    hitCount: 1,
                });
                continue;
            }
            const scored = await scoreAndDiff(row.sessionPath, omitPatterns);
            recorded.push({
                id: row.mut.id,
                mode: row.mut.mode,
                base: row.mut.base || null,
                suffix: row.mut.suffix,
                prefixMoves: row.mut.prefixMoves,
                recipePath: row.recipePath,
                sessionPath: row.sessionPath,
                hitCount: 1,
                ...scored,
            });
        }
    } finally {
        rmSync(WORKER_ROOT, { recursive: true, force: true });
    }

    // Dedup on (normalized C topline, normalized JS topline) before either sort.
    const deduped = [];
    const seen = new Map();
    for (const row of recorded) {
        if (row.passed) {
            deduped.push(row);
            continue;
        }
        const key = `${normTopline(row.cTopline)}||${normTopline(row.jsTopline || row.error || '')}`;
        if (seen.has(key)) {
            const keep = seen.get(key);
            keep.hitCount += 1;
            keep.merged = keep.merged || [];
            keep.merged.push({
                id: row.id,
                recipePath: row.recipePath,
                sessionPath: row.sessionPath,
            });
            continue;
        }
        seen.set(key, row);
        deduped.push(row);
    }

    const provenance = collectProvenance();
    const batchDoc = {
        provenance,
        seed,
        n: recorded.length,
        mutants: deduped,
        raw: recorded.map((r) => r.id),
    };
    const lastPath = path.join(CACHE, 'last-batch.json');
    writeFileSync(lastPath, JSON.stringify(batchDoc, null, 2));
    writeFileSync(path.join(batchDir, 'batch.json'), JSON.stringify(batchDoc, null, 2));
    printDashboard(deduped);
    console.error(`\nwrote ${lastPath}`);

    if (firstBatch || argFlag(args, 'emit-corpus')) {
        await emitCorpusFromBatch(deduped, omitPatterns);
        await cmdCorpus([]);
    }
}

function coverageSkip(row) {
    return row.bucket === 'coverage';
}

async function emitCorpusFromBatch(rows, omitPatterns) {
    const fidelity = rows.filter((r) => !r.passed && r.bucket === 'fidelity');
    const omits = rows.filter((r) => !r.passed && r.bucket === 'named-omit');
    const fidCap = fidelity.slice(0, 6);
    const omitCap = omits.slice(0, 3);
    const chosen = [...fidCap, ...omitCap];
    mkdirSync(PRIVATE, { recursive: true });
    const installs = prepareWorkerInstalls(1);
    try {
        for (const row of chosen) {
            if (coverageSkip(row)) continue;
            if (isCoverageText(row.jsTopline) || isCoverageText(row.error)) continue;
            const min = await minimizeRow(row, installs[0], omitPatterns);
            if (!min) continue;
            if (min.bucket === 'coverage' || isCoverageText(min.jsTopline)) {
                console.error(`skip corpus (coverage): ${row.id}`);
                continue;
            }
            const name = min.id;
            writeFileSync(path.join(PRIVATE, `${name}.recipe.json`), JSON.stringify(min.recipe, null, 2));
            writeFileSync(path.join(PRIVATE, `${name}.session.json`), readFileSync(min.sessionPath));
            writeFileSync(path.join(PRIVATE, `${name}.note.json`), JSON.stringify({
                locus: '',
                omitId: min.omitId || null,
                bucket: min.bucket,
                cTopline: min.cTopline,
                jsTopline: min.jsTopline,
                from: row.id,
                drifted: !!min.drifted,
                originalCTopline: min.drifted ? row.cTopline : undefined,
                originalJsTopline: min.drifted ? row.jsTopline : undefined,
            }, null, 2));
            console.error(`corpus + ${name} (${min.bucket}) suffix=${min.suffix.length}`);
        }
    } finally {
        rmSync(WORKER_ROOT, { recursive: true, force: true });
    }
}

async function divergesWith(recipe, minSteps, install, omitPatterns, rngFirst) {
    const tmp = path.join(CACHE, 'min');
    mkdirSync(tmp, { recursive: true });
    const id = hashSuffix(JSON.stringify(recipe.fuzz));
    const recipePath = path.join(tmp, `${id}.recipe.json`);
    const sessionPath = path.join(tmp, `${id}.session.json`);
    writeFileSync(recipePath, JSON.stringify(recipe));
    const rec = await recordRecipe(recipePath, sessionPath, {
        installDir: install.installDir,
        binary: install.binary,
        minSteps,
        timezone: PIN_TZ,
    });
    if (!rec.ok) return { ok: false, diverges: false, rec };
    const scored = await scoreAndDiff(sessionPath, omitPatterns);
    let diverges = !scored.passed;
    if (rngFirst) diverges = scored.firstRng !== null;
    return { ok: true, diverges, scored, recipePath, sessionPath, recipe };
}

async function minimizeRow(row, install, omitPatterns) {
    const recipe = loadJson(row.recipePath);
    const suffix = recipe.fuzz?.suffix;
    const prefixMoves = recipe.fuzz?.prefixMoves ?? '';
    if (!suffix) {
        console.error(`minimize skip ${row.id}: no fuzz.suffix on recipe`);
        return null;
    }
    const rngFirst = row.firstRng !== null && row.firstRng !== undefined;
    const minSteps = recipe.fuzz?.mode === 'independent'
        ? Math.max(3, prefixMoves.length + 1)
        : expectedMinSteps(recipe, prefixMoves);

    let lo = 0;
    let hi = suffix.length;
    const full = await divergesWith(recipe, minSteps, install, omitPatterns, rngFirst);
    if (!full.ok || !full.diverges) {
        console.error(`minimize ${row.id}: full suffix no longer diverges`);
        return null;
    }
    while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const tryRec = JSON.parse(JSON.stringify(recipe));
        const next = suffix.slice(0, mid);
        tryRec.fuzz.suffix = next;
        const last = tryRec.segments[tryRec.segments.length - 1];
        last.moves = prefixMoves + next;
        const d = await divergesWith(tryRec, minSteps, install, omitPatterns, rngFirst);
        if (d.ok && d.diverges && sameHit(d.scored, row, rngFirst)) hi = mid;
        else lo = mid;
    }
    const kept = suffix.slice(0, hi);
    const finalRec = JSON.parse(JSON.stringify(recipe));
    finalRec.fuzz.suffix = kept;
    const last = finalRec.segments[finalRec.segments.length - 1];
    last.moves = prefixMoves + kept;
    const done = await divergesWith(finalRec, minSteps, install, omitPatterns, rngFirst);
    if (!done.ok || !done.diverges) {
        console.error(`minimize ${row.id}: shortest suffix failed to re-record`);
        return null;
    }
    const drifted = !sameHit(done.scored, row, rngFirst)
        && !!(row.cTopline || row.jsTopline);
    if (drifted) {
        console.error(
            `minimize ${row.id}: drifted`
            + ` C ${JSON.stringify(normTopline(row.cTopline))} → ${JSON.stringify(normTopline(done.scored.cTopline))}`
            + ` JS ${JSON.stringify(normTopline(row.jsTopline))} → ${JSON.stringify(normTopline(done.scored.jsTopline))}`,
        );
    }
    return {
        id: row.id,
        recipe: finalRec,
        sessionPath: done.sessionPath,
        suffix: kept,
        bucket: done.scored.bucket,
        omitId: done.scored.omitId,
        cTopline: done.scored.cTopline,
        jsTopline: done.scored.jsTopline,
        firstRng: done.scored.firstRng,
        firstScreen: done.scored.firstScreen,
        drifted,
    };
}

async function cmdMinimize(args) {
    const target = args.find((a) => !a.startsWith('--'));
    if (!target) {
        usage();
        process.exit(2);
    }
    const omitPatterns = loadOmitPatterns();
    let row = null;
    const lastPath = path.join(CACHE, 'last-batch.json');
    if (existsSync(lastPath)) {
        const batch = loadJson(lastPath);
        row = (batch.mutants || []).find((m) => m.id === target
            || m.sessionPath === path.resolve(target)
            || m.recipePath === path.resolve(target)
            || (m.sessionPath && path.basename(m.sessionPath) === path.basename(target)));
        if (!row) {
            for (const m of batch.mutants || []) {
                const hit = (m.merged || []).find((x) => x.id === target
                    || x.sessionPath === path.resolve(target)
                    || x.recipePath === path.resolve(target)
                    || (x.sessionPath && path.basename(x.sessionPath) === path.basename(target)));
                if (hit) {
                    row = { ...m, ...hit };
                    break;
                }
            }
        }
    }
    if (!row) {
        const p = path.resolve(target);
        if (!existsSync(p)) {
            console.error(`not found: ${target}`);
            process.exit(1);
        }
        const doc = loadJson(p);
        const recipePath = p.endsWith('.recipe.json') ? p
            : p.replace(/\.session\.json$/, '.recipe.json');
        row = {
            id: path.basename(p).replace(/\.session\.json$|\.recipe\.json$/, ''),
            recipePath: existsSync(recipePath) ? recipePath : p,
            mode: doc.fuzz?.mode || 'explore',
            firstRng: null,
            prefixMoves: doc.fuzz?.prefixMoves || '',
        };
        if (p.endsWith('.session.json')) {
            const scored = await scoreAndDiff(p, omitPatterns);
            row.firstRng = scored.firstRng;
            row.cTopline = scored.cTopline;
            row.jsTopline = scored.jsTopline;
        }
    }
    const installs = prepareWorkerInstalls(1);
    try {
        const min = await minimizeRow(row, installs[0], omitPatterns);
        if (!min) process.exit(1);
        mkdirSync(PRIVATE, { recursive: true });
        writeFileSync(path.join(PRIVATE, `${min.id}.recipe.json`), JSON.stringify(min.recipe, null, 2));
        writeFileSync(path.join(PRIVATE, `${min.id}.session.json`), readFileSync(min.sessionPath));
        writeFileSync(path.join(PRIVATE, `${min.id}.note.json`), JSON.stringify({
            locus: '',
            omitId: min.omitId || null,
            bucket: min.bucket,
            cTopline: min.cTopline,
            jsTopline: min.jsTopline,
            drifted: !!min.drifted,
        }, null, 2));
        console.log(`minimized → private-sessions/${min.id}.session.json suffix=${min.suffix.length}`);
    } finally {
        rmSync(WORKER_ROOT, { recursive: true, force: true });
    }
}

async function cmdCorpus(args) {
    const checkOnly = argFlag(args, 'check');
    mkdirSync(PRIVATE, { recursive: true });
    const files = readdirSync(PRIVATE)
        .filter((n) => n.endsWith('.session.json'))
        .sort();
    const baselinePath = path.join(PRIVATE, 'corpus-baseline.json');
    const prev = existsSync(baselinePath) ? loadJson(baselinePath) : {};
    const commit = gitHead();
    const next = {};
    const transitions = [];
    for (const name of files) {
        const full = path.join(PRIVATE, name);
        const result = scoreSession(full) || {
            passed: false,
            metrics: { rngCalls: { matched: 0, total: 0 }, screens: { matched: 0, total: 0 } },
            error: 'scoreSession returned empty result',
        };
        const m = metricsShape(result);
        const notePath = full.replace(/\.session\.json$/, '.note.json');
        let note = '';
        let omitId = null;
        if (existsSync(notePath)) {
            try {
                const n = loadJson(notePath);
                note = n.locus || n.omitId || n.cTopline || '';
                omitId = n.omitId || null;
            } catch {}
        }
        const passed = !!result.passed;
        const old = prev[name];
        const sameAudit = !!(old && old.commit && old.commit === commit);
        const audit = sameAudit ? (old.audit | 0) : (old?.audit | 0) + 1;
        const failStreak = passed
            ? 0
            : (sameAudit ? (old.failStreak | 0) : (old?.failStreak | 0) + 1);
        next[name] = {
            rngM: m.rngM, rngT: m.rngT, scrM: m.scrM, scrT: m.scrT,
            passed, audit, failStreak, note, omitId,
            error: result.error || null,
            commit,
        };
        if (!old) {
            transitions.push(`NEW ${name} ${passed ? 'PASS' : 'non-PASS'} rng ${m.rngM}/${m.rngT} scr ${m.scrM}/${m.scrT}`);
            continue;
        }
        if (!old.passed && passed) {
            transitions.push(`non-PASS→PASS ${name}`);
        } else if (old.passed && !passed) {
            transitions.push(`PASS→non-PASS ${name}`);
        } else if (!passed && m.scrM < (old.scrM | 0)) {
            transitions.push(`worse-but-still-failing ${name} scr ${old.scrM}→${m.scrM}`);
        }
    }
    if (!checkOnly) {
        writeFileSync(baselinePath, JSON.stringify(next, null, 2) + '\n');
    } else {
        console.log('(corpus --check: not writing corpus-baseline.json)');
    }
    if (transitions.length) {
        console.log('corpus transitions:');
        for (const t of transitions) console.log('  ' + t);
    } else {
        console.log('corpus transitions: (none; unchanged silent)');
    }
    const debt = Object.entries(next)
        .filter(([, v]) => !v.passed && v.failStreak >= 2);
    if (debt.length) {
        console.log('derived debt (non-PASS for N consecutive audits):');
        for (const [name, v] of debt) {
            console.log(`  ${name} failStreak=${v.failStreak} ${v.note || ''}`);
        }
    }
}

async function cmdTriage() {
    const lastPath = path.join(CACHE, 'last-batch.json');
    if (!existsSync(lastPath)) {
        console.error('no .cache/fuzz/last-batch.json — run batch first');
        process.exit(1);
    }
    const batch = loadJson(lastPath);
    printDashboard(batch.mutants || []);
}

async function main() {
    const args = process.argv.slice(2);
    const cmd = args[0];
    if (!cmd || cmd === '-h' || cmd === '--help') {
        usage();
        process.exit(cmd ? 0 : 2);
    }
    if (cmd === 'preflight') return cmdPreflight();
    if (cmd === 'compare') return cmdCompareSelfTest();
    if (cmd === 'batch') return cmdBatch(args.slice(1));
    if (cmd === 'minimize') return cmdMinimize(args.slice(1));
    if (cmd === 'corpus') return cmdCorpus(args.slice(1));
    if (cmd === 'triage') return cmdTriage();
    usage();
    process.exit(2);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
