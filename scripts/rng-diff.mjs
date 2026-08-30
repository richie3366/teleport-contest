#!/usr/bin/env node
// rng-diff.mjs — Show first PRNG mismatch between JS port and a recorded session.
//
// Usage:
//   node scripts/rng-diff.mjs [session.json]
//   node scripts/rng-diff.mjs --all-segments [session.json]
//
// Default: replay and compare segment 0 only.
// --all-segments: share VFS across segments (like ps_test_runner) and
// compare concatenated RNG; print owning segment + local index.
//
// Default session: sessions/seed8000-tourist-starter.session.json

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function isRngCall(entry) {
    return typeof entry === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();
}

function extractCRngFromSeg(seg) {
    const out = [];
    for (const step of seg.steps || []) {
        for (const line of step.rng || []) {
            if (isRngCall(line)) out.push(line);
        }
    }
    return out;
}

function makeStorageHandle() {
    const storage = new Map();
    return {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) {
            let n = 0;
            for (const k of storage.keys()) { if (n === i) return k; n++; }
            return null;
        },
    };
}

function parseArgs(argv) {
    const flags = new Set();
    let sessionPath = join(ROOT, 'sessions/seed8000-tourist-starter.session.json');
    for (const a of argv) {
        if (a.startsWith('--')) flags.add(a);
        else sessionPath = a;
    }
    return { allSegments: flags.has('--all-segments'), sessionPath };
}

function printMiss({ base, first, cAll, jsAll, cBySeg, jsBySeg, allSegments }) {
    const ctx = 3;
    const n = Math.max(cAll.length, jsAll.length);
    if (first < 0) {
        console.log(`${base}: RNG OK (${cAll.length} calls)`);
        return 0;
    }
    let segNote = '';
    if (allSegments) {
        let acc = 0;
        for (let s = 0; s < cBySeg.length; s++) {
            if (first < acc + cBySeg[s].length) {
                segNote = ` (C seg${s} local ${first - acc})`;
                break;
            }
            acc += cBySeg[s].length;
        }
        acc = 0;
        for (let s = 0; s < jsBySeg.length; s++) {
            if (first < acc + jsBySeg[s].length) {
                segNote += ` (JS seg${s} local ${first - acc})`;
                break;
            }
            acc += jsBySeg[s].length;
        }
    }
    console.log(`${base}: first RNG mismatch at index ${first}${segNote}`);
    console.log(`  matched prefix: ${first}/${cAll.length} (JS emitted ${jsAll.length})`);
    for (let i = Math.max(0, first - ctx); i <= Math.min(n - 1, first + ctx); i++) {
        const mark = i === first ? '>>' : '  ';
        console.log(`${mark} [${i}] C: ${cAll[i] ?? '(missing)'}`);
        console.log(`${mark}      JS: ${jsAll[i] ?? '(missing)'}`);
    }
    return 1;
}

const { allSegments, sessionPath } = parseArgs(process.argv.slice(2));
const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const segments = session.segments || [];
if (!segments.length) {
    console.error('no segments');
    process.exit(2);
}

const { runSegment } = await import(pathToFileURL(join(ROOT, 'js/jsmain.js')).href);
const storage = makeStorageHandle();
const segsToRun = allSegments ? segments : [segments[0]];

const cBySeg = [];
const jsBySeg = [];
const cAll = [];
const jsAll = [];
for (const [si, seg] of segsToRun.entries()) {
    const cSeg = extractCRngFromSeg(seg);
    cBySeg.push(cSeg);
    cAll.push(...cSeg);
    const game = await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        nethackrc: seg.nethackrc,
        moves: seg.moves || '',
        storage: allSegments ? storage : makeStorageHandle(),
    });
    const jsSeg = (game.getRngLog?.() || []).map((e) => (
        typeof e === 'string' ? e.replace(/^\d+\s+/, '') : String(e)
    )).filter(isRngCall);
    jsBySeg.push(jsSeg);
    jsAll.push(...jsSeg);
    void si;
}

let first = -1;
for (let i = 0; i < Math.max(cAll.length, jsAll.length); i++) {
    if (normalizeRng(cAll[i] || '') !== normalizeRng(jsAll[i] || '')) {
        first = i;
        break;
    }
}

const base = sessionPath.split('/').pop();
const code = printMiss({
    base, first, cAll, jsAll, cBySeg, jsBySeg, allSegments,
});
process.exit(code);
