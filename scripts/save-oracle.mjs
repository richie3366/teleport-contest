#!/usr/bin/env node
// save-oracle.mjs — Operator tooling for save-prefixed C/JS oracles.
// Not imported from scored js/. Never writes sessions/manifest.json.
//
//   node scripts/save-oracle.mjs snapshot --prefix <recipe.json> [--id ID] [--restore-seed N]
//   node scripts/save-oracle.mjs replay --snapshot <id> --moves "< "
//
// C save/ is NHFILE; JS is frozen VFS JSON. Never copy one into the other.
// Snapshot after prefix Sy, before any restore. Fork only from a green prefix.

import { spawn } from 'node:child_process';
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

function usage() {
    console.error(`Usage:
  node scripts/save-oracle.mjs snapshot --prefix <recipe.json> [--id ID] [--restore-seed N]
  node scripts/save-oracle.mjs replay --snapshot <id> --moves "<moves>"`);
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
    const cSaveDir = path.join(ROOT, meta.cSaveDir);
    const vfsEntries = loadJson(path.join(ROOT, meta.vfsEntries));
    const restoreSeed = Number(argVal(args, 'restore-seed', String(meta.restoreSeed)));
    const datetime = argVal(args, 'datetime', meta.datetime);

    const replayRecipe = {
        version: 5,
        timezone: PIN_TZ,
        segments: [{
            seed: restoreSeed,
            datetime,
            nethackrc: meta.nethackrc,
            moves,
            timezone: PIN_TZ,
        }],
    };
    const worker = prepareWorker(1);
    const destSave = path.join(worker.installDir, 'save');
    rmSync(destSave, { recursive: true, force: true });
    cpSync(cSaveDir, destSave, { recursive: true });

    const replayDir = path.join(dir, 'replay');
    mkdirSync(replayDir, { recursive: true });
    const recipePath = path.join(replayDir, 'restore.recipe.json');
    const sessionPath = path.join(replayDir, 'restore.session.json');
    dumpJson(recipePath, replayRecipe);
    const minSteps = moves.length + 1;
    console.error(`replay ${id}: moves=${JSON.stringify(moves)} minSteps=${minSteps} restoreSeed=${restoreSeed}`);
    const rec = await recordRecipe(recipePath, sessionPath, {
        installDir: worker.installDir,
        binary: worker.binary,
        minSteps,
        timezone: PIN_TZ,
        wipeSave: false,
    });
    if (!rec.ok) {
        console.error(`record failed (exit ${rec.code})\n${rec.stderr}`);
        process.exit(1);
    }

    const recorded = loadJson(sessionPath);
    const stepCount = (recorded.segments?.[0]?.steps || []).length;
    if (stepCount < minSteps) {
        console.error(`vacuous recording: steps=${stepCount} < minSteps=${minSteps}`);
        process.exit(1);
    }

    const scored = await scoreWithStorage(sessionPath, { storageEntries: vfsEntries });
    const diff = await firstDiff(sessionPath, { storageEntries: vfsEntries });
    let m2;
    try {
        m2 = await sampleM2();
    } catch (e) {
        m2 = { offLevelObjectTimers: -1, error: e.message || String(e) };
    }
    console.log(`replay ${id}: ${fmtMetrics(scored)} steps=${stepCount} restoreSeed=${restoreSeed}`);
    if (diff.firstAny != null) {
        console.log(`  firstDiff step=${diff.firstAny} screen=${diff.firstScreen} rng=${diff.firstRng}`);
        console.log(`  C: ${diff.cTopline}`);
        console.log(`  JS: ${diff.jsTopline}`);
    }
    if ((m2.offLevelObjectTimers | 0) > 0) {
        console.error(`  M2 FAIL: ${m2.offLevelObjectTimers} off-level TIMER_OBJECT still on _timer_base`);
    } else if (m2.error) {
        console.error(`  M2: ${m2.error}`);
    } else {
        console.log(`  M2: off-level TIMER_OBJECT on _timer_base = 0 (${m2.objectTimers} object timers)`);
    }
    dumpJson(path.join(replayDir, 'score.json'), {
        passed: scored.passed,
        metrics: scored.metrics,
        error: scored.error || null,
        firstDiff: {
            firstAny: diff.firstAny,
            firstScreen: diff.firstScreen,
            firstRng: diff.firstRng,
            cTopline: diff.cTopline,
            jsTopline: diff.jsTopline,
        },
        m2,
    });
    if (!scored.passed) process.exit(1);
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
    else {
        usage();
        process.exit(2);
    }
}

await main();
