#!/usr/bin/env node
// rng-diff.mjs — Show first PRNG mismatch between JS port and a recorded session.
//
// Usage:
//   node scripts/rng-diff.mjs [session.json]
//
// Default session: sessions/seed8000-tourist-starter.session.json

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath = process.argv[2]
    || join(ROOT, 'sessions/seed8000-tourist-starter.session.json');

function isRngCall(entry) {
    return typeof entry === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

function normalizeRng(entry) {
    return String(entry).replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();
}

function extractCRng(session) {
    const out = [];
    for (const seg of session.segments || []) {
        for (const step of seg.steps || []) {
            for (const line of step.rng || []) {
                if (isRngCall(line)) out.push(line);
            }
        }
    }
    return out;
}

const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const cRng = extractCRng(session);

const { runSegment } = await import(pathToFileURL(join(ROOT, 'js/jsmain.js')).href);
const seg0 = session.segments[0];
const game = await runSegment({
    seed: seg0.seed,
    datetime: seg0.datetime,
    nethackrc: seg0.nethackrc,
    moves: seg0.moves || '',
});
const jsRng = (game.getRngLog?.() || []).map(normalizeRng);
const cNorm = cRng.map(normalizeRng);

let first = -1;
const n = Math.max(cNorm.length, jsRng.length);
for (let i = 0; i < n; i++) {
    if ((cNorm[i] || '') !== (jsRng[i] || '')) {
        first = i;
        break;
    }
}

const base = sessionPath.split('/').pop();
if (first < 0) {
    console.log(`${base}: RNG OK (${cNorm.length} calls)`);
    process.exit(0);
}

const ctx = 3;
console.log(`${base}: first RNG mismatch at index ${first}`);
console.log(`  matched prefix: ${first}/${cNorm.length} (JS emitted ${jsRng.length})`);
for (let i = Math.max(0, first - ctx); i <= Math.min(n - 1, first + ctx); i++) {
    const mark = i === first ? '>>' : '  ';
    console.log(`${mark} [${i}] C: ${cRng[i] ?? '(missing)'}`);
    console.log(`${mark}      JS: ${jsRng[i] ?? '(missing)'}`);
}
process.exit(1);
