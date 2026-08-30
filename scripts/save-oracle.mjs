#!/usr/bin/env node
// save-oracle.mjs — Operator tooling for save-prefixed C/JS oracles.
// Not imported from scored js/. Never writes sessions/manifest.json.
//
//   node scripts/save-oracle.mjs snapshot --prefix <recipe.json> [--id ID] [--restore-seed N]
//   node scripts/save-oracle.mjs replay --snapshot <id> --moves "< "
//   node scripts/save-oracle.mjs fork --snapshot <id> --n 8 --seed N
//   node scripts/save-oracle.mjs minimize --snapshot <id> --moves "<suffix>"
//   node scripts/save-oracle.mjs prefix-gen --mode explore --n 4
//
// C save/ is NHFILE; JS is frozen VFS JSON. Never copy one into the other.
// Snapshot after prefix Sy, before any restore. Fork only from a green prefix.

import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
    existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync,
    rmSync, cpSync, statSync,
} from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
    scoreSession, scoreWithStorage, firstDiff, metricsShape, makeStorageHandle,
} from './lib/fuzz-compare.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const RECORD = path.join(SCRIPT_DIR, 'record-session.mjs');
const CACHE = path.join(ROOT, '.cache', 'save-oracle');
const DEFAULT_INSTALL = path.join(
    ROOT, 'nethack-c', 'recorder', 'install', 'games', 'lib', 'nethackdir');
const WORKER_ROOT = '/tmp/nhso';
const PIN_TZ = 'America/New_York';
const HACKDIR_MAX = 128;
const TIMER_OBJECT = 3;
const DATA = path.join(SCRIPT_DIR, 'data');
const PRIVATE = path.join(ROOT, 'private-sessions');
const OMIT_PATTERNS = path.join(DATA, 'fuzz-omit-patterns.json');
const ALPHABETS = path.join(DATA, 'fuzz-alphabets.json');
const BASES = path.join(DATA, 'fuzz-bases.json');
const PREFIX_LIB = path.join(DATA, 'save-oracle-prefixes.json');
const MIN_AUTOGEN_PREFIX = 80;

function usage() {
    console.error(`Usage:
  node scripts/save-oracle.mjs snapshot --prefix <recipe.json> [--id ID] [--restore-seed N]
  node scripts/save-oracle.mjs replay --snapshot <id> --moves "<moves>"
  node scripts/save-oracle.mjs fork --snapshot <id> --n 8 --seed N [--tail 6] [--emit-private]
  node scripts/save-oracle.mjs minimize --snapshot <id> --moves "<suffix>" [--emit-private]
  node scripts/save-oracle.mjs prefix-gen --mode explore --n 4 [--seed N] [--tail 80]`);
}

function argFlag(args, name) {
    return args.includes(`--${name}`);
}

function argVal(args, name, fallback) {
    const i = args.indexOf(`--${name}`);
    if (i < 0) return fallback;
    return args[i + 1] ?? fallback;
}

function loadJson(p) {
    return JSON.parse(readFileSync(p, 'utf8'));
}

function dumpJson(p, obj) {
    mkdirSync(path.dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function extractPrefixRecipe(recipe) {
    const seg0 = (recipe.segments || [])[0];
    if (!seg0) throw new Error('recipe has no segments');
    return {
        version: recipe.version || 5,
        timezone: recipe.timezone || seg0.timezone || PIN_TZ,
        segments: [{
            seed: seg0.seed,
            datetime: seg0.datetime,
            nethackrc: seg0.nethackrc,
            moves: seg0.moves || '',
            timezone: seg0.timezone || recipe.timezone || PIN_TZ,
        }],
    };
}

function restoreSeedFrom(recipe, explicit) {
    if (explicit != null && explicit !== '') return Number(explicit);
    const segs = recipe.segments || [];
    if (segs.length >= 2 && segs[1].seed != null) return Number(segs[1].seed);
    return null;
}

function prepareWorker(wid = 0) {
    mkdirSync(WORKER_ROOT, { recursive: true });
    const dest = path.join(WORKER_ROOT, `w${wid}`);
    rmSync(dest, { recursive: true, force: true });
    cpSync(DEFAULT_INSTALL, dest, { recursive: true });
    if (dest.length > HACKDIR_MAX) {
        throw new Error(`worker HACKDIR ${dest} is ${dest.length} chars (>${HACKDIR_MAX})`);
    }
    return {
        installDir: dest,
        binary: path.join(dest, 'nethack'),
    };
}

function listSaveFiles(saveDir) {
    if (!existsSync(saveDir)) return [];
    return readdirSync(saveDir).filter((n) => {
        const st = statSync(path.join(saveDir, n));
        return st.isFile();
    });
}

async function recordRecipe(recipePath, sessionPath, {
    installDir, binary, minSteps, timezone, wipeSave,
}) {
    await fs.mkdir(path.dirname(sessionPath), { recursive: true });
    const env = {
        ...process.env,
        NETHACK_INSTALL: installDir,
        NETHACK_BINARY: binary,
        RECORD_MIN_STEPS: String(minSteps),
        RERECORD_TZ: timezone || PIN_TZ,
    };
    if (wipeSave === false) env.RECORD_WIPE_SAVE = '0';
    if (wipeSave === true) env.RECORD_WIPE_SAVE = '1';
    return await new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [RECORD, recipePath, sessionPath], {
            env,
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        let stderr = '';
        child.stderr.on('data', (b) => { stderr += b.toString('utf8'); });
        child.on('error', reject);
        child.on('close', (code) => {
            resolve({ ok: code === 0, stderr, code });
        });
    });
}

function snapshotDir(id) {
    return path.join(CACHE, id);
}

function loadSnapshot(id) {
    const dir = snapshotDir(id);
    const metaPath = path.join(dir, 'meta.json');
    if (!existsSync(metaPath)) {
        throw new Error(`snapshot not found: ${id} (${metaPath})`);
    }
    return { dir, meta: loadJson(metaPath) };
}

function fmtMetrics(result) {
    const m = metricsShape(result);
    const tag = result.passed ? 'PASS' : 'FAIL';
    return `${tag} rng ${m.rngM}/${m.rngT} screens ${m.scrM}/${m.scrT}`;
}

function hrefJs(rel) {
    return pathToFileURL(path.join(ROOT, rel)).href;
}

async function dumpJsVfs(seg) {
    const { runSegment } = await import(hrefJs('js/jsmain.js'));
    const map = new Map();
    const storage = makeStorageHandle(map);
    await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        nethackrc: seg.nethackrc,
        moves: seg.moves || '',
        storage,
    });
    return [...map.entries()];
}

async function sampleM2() {
    const { game } = await import(hrefJs('js/gstate.js'));
    let off = 0;
    let totalObj = 0;
    let usedLocal = false;
    try {
        const { timer_is_local } = await import(hrefJs('js/mkobj.js'));
        usedLocal = true;
        for (let t = game._timer_base; t; t = t.next) {
            if ((t.kind | 0) !== TIMER_OBJECT) continue;
            totalObj++;
            if (!timer_is_local(t)) off++;
        }
    } catch {
        for (let t = game._timer_base; t; t = t.next) {
            if ((t.kind | 0) !== TIMER_OBJECT) continue;
            totalObj++;
            const where = t.obj ? (t.obj.where | 0) : -1;
            // OBJ_FREE=0, OBJ_MIGRATING=3 — not on the current floor.
            if (where === 0 || where === 3 || where < 0) off++;
        }
    }
    return { offLevelObjectTimers: off, objectTimers: totalObj, usedLocal };
}

async function cmdSnapshot(args) {
    const prefixPath = argVal(args, 'prefix');
    if (!prefixPath) {
        usage();
        process.exit(2);
    }
    const absPrefix = path.resolve(prefixPath);
    if (!existsSync(absPrefix)) {
        console.error(`prefix not found: ${absPrefix}`);
        process.exit(1);
    }
    const raw = loadJson(absPrefix);
    const prefixRecipe = extractPrefixRecipe(raw);
    const moves = prefixRecipe.segments[0].moves || '';
    if (!/S/.test(moves)) {
        console.error('prefix must include S (save); expected a recipe ending Sy');
        process.exit(1);
    }
    const id = argVal(args, 'id')
        || `${path.basename(absPrefix).replace(/\.recipe\.json$|\.session\.json$/, '')}-prefix`;
    const restoreSeed = restoreSeedFrom(raw, argVal(args, 'restore-seed', ''));
    if (restoreSeed == null || Number.isNaN(restoreSeed)) {
        console.error('pass --restore-seed N (do not silently reuse the prefix seed)');
        process.exit(1);
    }
    const seg0 = prefixRecipe.segments[0];
    const outDir = snapshotDir(id);
    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });
    const recipePath = path.join(outDir, 'prefix.recipe.json');
    dumpJson(recipePath, prefixRecipe);

    const worker = prepareWorker(0);
    const sessionPath = path.join(outDir, 'prefix.session.json');
    const minSteps = moves.length + 1;
    console.error(`snapshot ${id}: record prefix moves=${moves.length} minSteps=${minSteps} restoreSeed=${restoreSeed}`);
    const rec = await recordRecipe(recipePath, sessionPath, {
        installDir: worker.installDir,
        binary: worker.binary,
        minSteps,
        timezone: seg0.timezone || PIN_TZ,
        wipeSave: true,
    });
    if (!rec.ok) {
        console.error(`record failed (exit ${rec.code})\n${rec.stderr}`);
        process.exit(1);
    }

    const cSaveSrc = path.join(worker.installDir, 'save');
    const saveFiles = listSaveFiles(cSaveSrc);
    if (!saveFiles.length) {
        console.error(`no files in ${cSaveSrc} after prefix Sy — snapshot aborted`);
        process.exit(1);
    }
    const cSaveDir = path.join(outDir, 'c-save');
    cpSync(cSaveSrc, cSaveDir, { recursive: true });

    const scored = scoreSession(sessionPath);
    const vfsEntries = await dumpJsVfs(seg0);
    dumpJson(path.join(outDir, 'vfs.json'), vfsEntries);

    const meta = {
        prefixId: id,
        sourceRecipe: absPrefix,
        datetime: seg0.datetime,
        nethackrc: seg0.nethackrc,
        restoreSeed,
        prefixSeed: seg0.seed,
        prefixMoves: moves,
        cSaveDir: path.relative(ROOT, cSaveDir),
        vfsEntries: path.relative(ROOT, path.join(outDir, 'vfs.json')),
        prefixSession: path.relative(ROOT, sessionPath),
        prefixPass: !!scored.passed,
        prefixMetrics: metricsShape(scored),
        saveFiles,
        recordedAt: new Date().toISOString(),
    };
    dumpJson(path.join(outDir, 'meta.json'), meta);
    console.log(`snapshot ${id}: prefix ${fmtMetrics(scored)} saveFiles=${saveFiles.length} vfsKeys=${vfsEntries.length} restoreSeed=${restoreSeed}`);
    if (!scored.passed) {
        console.error('prefix is red — do not fork; this measures prefix debt');
        process.exit(1);
    }
}

function plantCSave(worker, cSaveDir) {
    const destSave = path.join(worker.installDir, 'save');
    rmSync(destSave, { recursive: true, force: true });
    cpSync(cSaveDir, destSave, { recursive: true });
}

async function runRestoreSegment({ meta, moves, worker, outDir, restoreSeed, datetime }) {
    const cSaveDir = path.join(ROOT, meta.cSaveDir);
    const vfsEntries = loadJson(path.join(ROOT, meta.vfsEntries));
    const seed = restoreSeed != null ? restoreSeed : meta.restoreSeed;
    const dt = datetime || meta.datetime;
    const recipe = {
        version: 5,
        timezone: PIN_TZ,
        segments: [{
            seed,
            datetime: dt,
            nethackrc: meta.nethackrc,
            moves,
            timezone: PIN_TZ,
        }],
    };
    plantCSave(worker, cSaveDir);
    mkdirSync(outDir, { recursive: true });
    const recipePath = path.join(outDir, 'restore.recipe.json');
    const sessionPath = path.join(outDir, 'restore.session.json');
    dumpJson(recipePath, recipe);
    const minSteps = moves.length + 1;
    const rec = await recordRecipe(recipePath, sessionPath, {
        installDir: worker.installDir,
        binary: worker.binary,
        minSteps,
        timezone: PIN_TZ,
        wipeSave: false,
    });
    if (!rec.ok) {
        return { ok: false, rec, minSteps, sessionPath, recipePath };
    }
    const recorded = loadJson(sessionPath);
    const stepCount = (recorded.segments?.[0]?.steps || []).length;
    if (stepCount < minSteps) {
        return {
            ok: false, rec, minSteps, stepCount, sessionPath, recipePath,
            vacuous: true,
        };
    }
    const scored = await scoreWithStorage(sessionPath, { storageEntries: vfsEntries });
    const diff = await firstDiff(sessionPath, { storageEntries: vfsEntries });
    let m2;
    try {
        m2 = await sampleM2();
    } catch (e) {
        m2 = { offLevelObjectTimers: -1, error: e.message || String(e) };
    }
    return {
        ok: true, rec, minSteps, stepCount, sessionPath, recipePath,
        scored, diff, m2, vfsEntries, restoreSeed: seed,
    };
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

function hashSuffix(s) {
    return createHash('sha1').update(s).digest('hex').slice(0, 8);
}

function isCoverageText(s) {
    if (!s) return false;
    return /Unknown command/i.test(s)
        || /Unknown direction/i.test(s)
        || /unknown extended command/i.test(s)
        || /role not ported/i.test(s)
        || /not yet ported/i.test(s);
}

function loadOmitPatterns() {
    const rows = loadJson(OMIT_PATTERNS);
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

function printDashboard(rows) {
    const bySeverity = [...rows].sort((a, b) => {
        const da = (a.rngT - a.rngM) - (b.rngT - b.rngM);
        if (da !== 0) return -da;
        return (b.scrT - b.scrM) - (a.scrT - a.scrM);
    });
    const counts = {};
    for (const r of rows) counts[r.bucket] = (counts[r.bucket] || 0) + 1;
    console.log('\n=== save-oracle fork dashboard (not a work picker) ===');
    console.log(`n=${rows.length} buckets=${JSON.stringify(counts)}`);
    for (const r of bySeverity) {
        const tag = r.passed ? 'PASS' : r.bucket;
        console.log(
            `  [${tag}] rng ${r.rngM}/${r.rngT} scr ${r.scrM}/${r.scrT}`
            + ` ${r.id}\n    C: ${r.cTopline}\n    J: ${r.jsTopline}`,
        );
    }
    console.log('\nDo not copy this dashboard into LOOP-QUEUE.md. Human/audit may');
    console.log('promote a minimized fidelity hit + pinned C locus to Must-fix.');
}

function twoSegmentRecipe(meta, suffix) {
    const prefix = loadJson(path.join(snapshotDir(meta.prefixId), 'prefix.recipe.json'));
    const prefixSeg = prefix.segments[0];
    return {
        version: 5,
        timezone: PIN_TZ,
        fuzz: {
            mode: 'fork',
            prefixMoves: '',
            suffix,
            snapshot: meta.prefixId,
        },
        segments: [
            { ...prefixSeg },
            {
                seed: meta.restoreSeed,
                datetime: meta.datetime,
                nethackrc: meta.nethackrc,
                moves: suffix,
                timezone: PIN_TZ,
            },
        ],
    };
}

function rowFromRun(id, suffix, run, omitPatterns) {
    const m = metricsShape(run.scored || {});
    const cls = classify({ result: run.scored, diff: run.diff, omitPatterns });
    return {
        id,
        suffix,
        passed: !!run.scored?.passed,
        bucket: run.scored?.passed ? 'pass' : cls.bucket,
        omitId: cls.omitId,
        reason: cls.reason,
        rngM: m.rngM,
        rngT: m.rngT,
        scrM: m.scrM,
        scrT: m.scrT,
        cTopline: run.diff?.cTopline || '',
        jsTopline: run.diff?.jsTopline || run.scored?.error || '',
        firstRng: run.diff?.firstRng ?? null,
        firstScreen: run.diff?.firstScreen ?? null,
        sessionPath: run.sessionPath,
        recipePath: run.recipePath,
        m2: run.m2,
        stepCount: run.stepCount,
    };
}

async function emitPrivate(meta, suffix, row) {
    if (row.bucket === 'coverage' || isCoverageText(row.jsTopline)) {
        console.error(`skip private-sessions (coverage): ${row.id}`);
        return null;
    }
    mkdirSync(PRIVATE, { recursive: true });
    const recipe = twoSegmentRecipe(meta, suffix);
    const recipePath = path.join(PRIVATE, `${row.id}.recipe.json`);
    dumpJson(recipePath, recipe);
    const worker = prepareWorker(9);
    const sessionPath = path.join(PRIVATE, `${row.id}.session.json`);
    const prefixMoves = recipe.segments[0].moves || '';
    const minSteps = prefixMoves.length + 1 + suffix.length + 1;
    const rec = await recordRecipe(recipePath, sessionPath, {
        installDir: worker.installDir,
        binary: worker.binary,
        minSteps,
        timezone: PIN_TZ,
        wipeSave: true,
    });
    if (!rec.ok) {
        console.error(`private re-record failed: ${rec.stderr}`);
        return null;
    }
    dumpJson(path.join(PRIVATE, `${row.id}.note.json`), {
        locus: '',
        omitId: row.omitId || null,
        bucket: row.bucket,
        cTopline: row.cTopline,
        jsTopline: row.jsTopline,
        from: row.id,
        snapshot: meta.prefixId,
    });
    console.error(`private-sessions + ${row.id} (${row.bucket}) suffix=${suffix.length}`);
    return sessionPath;
}

async function cmdReplay(args) {
    const id = argVal(args, 'snapshot');
    const moves = argVal(args, 'moves');
    if (!id || moves == null) {
        usage();
        process.exit(2);
    }
    const { dir, meta } = loadSnapshot(id);
    if (!meta.prefixPass) {
        console.error(`snapshot ${id} prefix was not PASS — refusing replay`);
        process.exit(1);
    }
    const restoreSeed = Number(argVal(args, 'restore-seed', String(meta.restoreSeed)));
    const datetime = argVal(args, 'datetime', meta.datetime);
    const worker = prepareWorker(1);
    const replayDir = path.join(dir, 'replay');
    const minSteps = moves.length + 1;
    console.error(`replay ${id}: moves=${JSON.stringify(moves)} minSteps=${minSteps} restoreSeed=${restoreSeed}`);
    const run = await runRestoreSegment({
        meta, moves, worker, outDir: replayDir, restoreSeed, datetime,
    });
    if (!run.ok) {
        if (run.vacuous) {
            console.error(`vacuous recording: steps=${run.stepCount} < minSteps=${run.minSteps}`);
        } else {
            console.error(`record failed (exit ${run.rec.code})\n${run.rec.stderr}`);
        }
        process.exit(1);
    }
    console.log(`replay ${id}: ${fmtMetrics(run.scored)} steps=${run.stepCount} restoreSeed=${restoreSeed}`);
    if (run.diff.firstAny != null) {
        console.log(`  firstDiff step=${run.diff.firstAny} screen=${run.diff.firstScreen} rng=${run.diff.firstRng}`);
        console.log(`  C: ${run.diff.cTopline}`);
        console.log(`  JS: ${run.diff.jsTopline}`);
    }
    const m2 = run.m2;
    if ((m2.offLevelObjectTimers | 0) > 0) {
        console.error(`  M2 FAIL: ${m2.offLevelObjectTimers} off-level TIMER_OBJECT still on _timer_base`);
    } else if (m2.error) {
        console.error(`  M2: ${m2.error}`);
    } else {
        console.log(`  M2: off-level TIMER_OBJECT on _timer_base = 0 (${m2.objectTimers} object timers)`);
    }
    dumpJson(path.join(replayDir, 'score.json'), {
        passed: run.scored.passed,
        metrics: run.scored.metrics,
        error: run.scored.error || null,
        firstDiff: {
            firstAny: run.diff.firstAny,
            firstScreen: run.diff.firstScreen,
            firstRng: run.diff.firstRng,
            cTopline: run.diff.cTopline,
            jsTopline: run.diff.jsTopline,
        },
        m2,
    });
    if (!run.scored.passed) process.exit(1);
}

async function cmdFork(args) {
    const id = argVal(args, 'snapshot');
    if (!id) {
        usage();
        process.exit(2);
    }
    const n = Number(argVal(args, 'n', '8'));
    const seed = Number(argVal(args, 'seed', '20260830'));
    const tail = Number(argVal(args, 'tail', '6'));
    const emitPrivate = argFlag(args, 'emit-private');
    const { dir, meta } = loadSnapshot(id);
    if (!meta.prefixPass) {
        console.error(`snapshot ${id} prefix was not PASS — refusing fork`);
        process.exit(1);
    }
    const alphabets = loadJson(ALPHABETS);
    const forkAlpha = alphabets.fork;
    if (!forkAlpha?.length) {
        console.error('scripts/data/fuzz-alphabets.json missing fork alphabet');
        process.exit(1);
    }
    if (forkAlpha.some((r) => r.ch === '#')) {
        console.error('fork alphabet must not include wizard # (omit-is-wizmode only)');
        process.exit(1);
    }
    const omitPatterns = loadOmitPatterns();
    const rng = mulberry32(seed);
    const forkDir = path.join(dir, 'forks');
    mkdirSync(forkDir, { recursive: true });
    const rows = [];
    console.error(`fork ${id}: n=${n} seed=${seed} tail=${tail} restoreSeed=${meta.restoreSeed}`);
    for (let i = 0; i < n; i++) {
        const suffix = sampleKeys(rng, forkAlpha, tail);
        const mid = `fork-${id}-${seed}-${hashSuffix(suffix)}`;
        const worker = prepareWorker(i % 4);
        const outDir = path.join(forkDir, mid);
        const run = await runRestoreSegment({
            meta, moves: suffix, worker, outDir,
            restoreSeed: meta.restoreSeed, datetime: meta.datetime,
        });
        if (!run.ok) {
            rows.push({
                id: mid,
                suffix,
                passed: false,
                bucket: 'error',
                omitId: null,
                reason: run.vacuous ? 'vacuous recording' : (run.rec?.stderr || 'record failed'),
                rngM: 0, rngT: 0, scrM: 0, scrT: 0,
                cTopline: '',
                jsTopline: run.vacuous ? 'vacuous' : (run.rec?.stderr || ''),
                firstRng: null,
                firstScreen: null,
                sessionPath: run.sessionPath,
                recipePath: run.recipePath,
            });
            continue;
        }
        const row = rowFromRun(mid, suffix, run, omitPatterns);
        dumpJson(path.join(outDir, 'row.json'), row);
        dumpJson(path.join(outDir, 'two-segment.recipe.json'), twoSegmentRecipe(meta, suffix));
        rows.push(row);
    }
    const keep = rows.filter((r) => r.bucket !== 'coverage');
    const dropped = rows.length - keep.length;
    printDashboard(keep);
    if (dropped) console.log(`dropped ${dropped} mechanical-coverage mutant(s)`);
    const lastPath = path.join(CACHE, 'last-fork.json');
    dumpJson(lastPath, {
        snapshot: id,
        seed,
        n: rows.length,
        droppedCoverage: dropped,
        mutants: keep,
        raw: rows.map((r) => r.id),
    });
    console.error(`wrote ${lastPath}`);
    if (emitPrivate) {
        const hits = keep.filter((r) => !r.passed && r.bucket === 'fidelity');
        for (const row of hits.slice(0, 3)) {
            await emitPrivate(meta, row.suffix, row);
        }
    }
}

async function cmdMinimize(args) {
    const id = argVal(args, 'snapshot');
    const moves = argVal(args, 'moves');
    if (!id || moves == null) {
        usage();
        process.exit(2);
    }
    const emitPrivateFlag = argFlag(args, 'emit-private');
    const { dir, meta } = loadSnapshot(id);
    if (!meta.prefixPass) {
        console.error(`snapshot ${id} prefix was not PASS — refusing minimize`);
        process.exit(1);
    }
    const omitPatterns = loadOmitPatterns();
    const worker = prepareWorker(8);
    const minDir = path.join(dir, 'minimize');
    const full = await runRestoreSegment({
        meta, moves, worker, outDir: path.join(minDir, 'full'),
        restoreSeed: meta.restoreSeed, datetime: meta.datetime,
    });
    if (!full.ok || full.scored.passed) {
        console.error('full suffix does not diverge');
        process.exit(1);
    }
    let lo = 0;
    let hi = moves.length;
    while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) / 2);
        const next = moves.slice(0, mid);
        const d = await runRestoreSegment({
            meta, moves: next, worker, outDir: path.join(minDir, `try-${mid}`),
            restoreSeed: meta.restoreSeed, datetime: meta.datetime,
        });
        if (d.ok && d.scored && !d.scored.passed) hi = mid;
        else lo = mid;
    }
    const kept = moves.slice(0, hi);
    const done = await runRestoreSegment({
        meta, moves: kept, worker, outDir: path.join(minDir, 'kept'),
        restoreSeed: meta.restoreSeed, datetime: meta.datetime,
    });
    if (!done.ok || done.scored.passed) {
        console.error('shortest suffix failed to re-diverge');
        process.exit(1);
    }
    const row = rowFromRun(`min-${id}-${hashSuffix(kept)}`, kept, done, omitPatterns);
    console.log(`minimized suffix=${JSON.stringify(kept)} len=${kept.length} ${row.bucket} ${fmtMetrics(done.scored)}`);
    dumpJson(path.join(minDir, 'result.json'), { suffix: kept, row });
    if (emitPrivateFlag) await emitPrivate(meta, kept, row);
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

async function cmdPrefixGen(args) {
    const mode = argVal(args, 'mode', 'explore');
    if (mode !== 'explore') {
        console.error('prefix-gen --mode explore is the only supported mode (explore has > but no S)');
        process.exit(2);
    }
    const n = Number(argVal(args, 'n', '4'));
    const seed = Number(argVal(args, 'seed', '20260830'));
    const tail = Number(argVal(args, 'tail', String(MIN_AUTOGEN_PREFIX)));
    const alphabets = loadJson(ALPHABETS);
    const explore = alphabets.explore;
    if (!explore?.length) {
        console.error('missing explore alphabet');
        process.exit(1);
    }
    if (explore.some((r) => r.ch === 'S')) {
        console.error('explore alphabet must not include S; prefix-gen appends Sy');
        process.exit(1);
    }
    const bases = loadJson(BASES);
    const roles = bases.independentRoles || [];
    const rng = mulberry32(seed);
    const genDir = path.join(CACHE, 'prefix-gen');
    mkdirSync(genDir, { recursive: true });
    console.error(`prefix-gen mode=${mode} n=${n} seed=${seed} tail=${tail} (append Sy)`);
    const results = [];
    for (let i = 0; i < n; i++) {
        const spec = roles[i % Math.max(1, roles.length)] || {
            name: 'Hero', role: 'Tourist', race: 'human', gender: 'male', align: 'neutral',
        };
        const walk = sampleKeys(rng, explore, tail);
        const moves = `${walk} Sy`;
        const gameSeed = (Math.floor(rng() * 0x7fffffff) % 999_999_937) + 1;
        const restoreSeed = 99999;
        const recipe = {
            version: 5,
            timezone: PIN_TZ,
            segments: [{
                seed: gameSeed,
                datetime: '20000110090000',
                nethackrc: synthesizeNethackrc(spec),
                moves,
                timezone: PIN_TZ,
            }],
        };
        const id = `pgen-${spec.role || 'role'}-${gameSeed}-${hashSuffix(moves)}`;
        const outDir = path.join(genDir, id);
        mkdirSync(outDir, { recursive: true });
        const recipePath = path.join(outDir, 'prefix.recipe.json');
        dumpJson(recipePath, recipe);
        if (moves.length < MIN_AUTOGEN_PREFIX) {
            console.error(`${id}: skip snapshot, moves.length=${moves.length} < ${MIN_AUTOGEN_PREFIX} (use a two-segment hand recipe)`);
            results.push({ id, skip: 'short-prefix', moves: moves.length });
            continue;
        }
        const worker = prepareWorker(i % 4);
        const sessionPath = path.join(outDir, 'prefix.session.json');
        const rec = await recordRecipe(recipePath, sessionPath, {
            installDir: worker.installDir,
            binary: worker.binary,
            minSteps: moves.length + 1,
            timezone: PIN_TZ,
            wipeSave: true,
        });
        if (!rec.ok) {
            console.error(`${id}: record failed — prefix-debt\n${rec.stderr}`);
            results.push({ id, skip: 'record-failed', error: rec.stderr });
            continue;
        }
        const scored = scoreSession(sessionPath);
        const row = {
            id,
            passed: !!scored.passed,
            metrics: metricsShape(scored),
            recipePath,
            sessionPath,
            restoreSeed,
        };
        dumpJson(path.join(outDir, 'score.json'), row);
        console.log(`prefix-gen ${id}: ${fmtMetrics(scored)} role=${spec.role}`);
        if (!scored.passed) {
            console.error(`${id}: prefix-debt (JS does not PASS) — not snapshotting, not forking`);
            results.push({ ...row, skip: 'prefix-debt' });
            continue;
        }
        const saveFiles = listSaveFiles(path.join(worker.installDir, 'save'));
        if (!saveFiles.length) {
            console.error(`${id}: PASS but no C save/ — not a real Sy prefix, skip snapshot`);
            results.push({ ...row, skip: 'no-save' });
            continue;
        }
        const snapArgs = [
            '--prefix', recipePath, '--id', id, '--restore-seed', String(restoreSeed),
        ];
        try {
            await cmdSnapshot(snapArgs);
            results.push({ ...row, snapshot: id });
        } catch (e) {
            console.error(`${id}: snapshot failed ${e.message || e}`);
            results.push({ ...row, skip: 'snapshot-failed' });
        }
    }
    dumpJson(path.join(CACHE, 'last-prefix-gen.json'), { seed, n, results });
}

async function main() {
    const argv = process.argv.slice(2);
    const cmd = argv[0];
    const rest = argv.slice(1);
    if (!cmd || cmd === '-h' || cmd === '--help') {
        usage();
        process.exit(cmd ? 0 : 2);
    }
    if (cmd === 'snapshot') await cmdSnapshot(rest);
    else if (cmd === 'replay') await cmdReplay(rest);
    else if (cmd === 'fork') await cmdFork(rest);
    else if (cmd === 'minimize') await cmdMinimize(rest);
    else if (cmd === 'prefix-gen') await cmdPrefixGen(rest);
    else {
        usage();
        process.exit(2);
    }
}

await main();
