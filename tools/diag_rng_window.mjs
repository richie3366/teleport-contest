#!/usr/bin/env node
/** Print C vs JS RNG around first mismatch for one session. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath = process.argv[2] || join(ROOT, 'sessions/seed0077-rogue-chargen.session.json');
const lo = parseInt(process.argv[3] || '1625', 10);
const hi = parseInt(process.argv[4] || '1650', 10);

function isRngCall(entry) {
    return typeof entry === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}
function extractRngCalls(rngArray) {
    return (rngArray || []).filter(isRngCall);
}
function normalizeRng(entry) {
    return entry.replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const sessionData = JSON.parse(readFileSync(sessionPath, 'utf8'));
const segments = normalizeSession(sessionData).segments;
const cRng = [];
for (const seg of segments) {
    for (const step of seg.steps || []) {
        cRng.push(...extractRngCalls(step.rng));
    }
}

const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) {
        const keys = [...storage.keys()];
        return i >= 0 && i < keys.length ? keys[i] : null;
    },
};
const jAll = [];
for (const seg of segments) {
    const g = await runSegment({ ...seg, storage: storageHandle });
    jAll.push(...(g.getRngLog?.() || []).filter(isRngCall).map(normalizeRng));
}

let first = -1;
for (let i = 0; i < Math.min(cRng.length, jAll.length); i++) {
    if (normalizeRng(cRng[i]) !== jAll[i]) { first = i; break; }
}
console.log('first mismatch:', first, 'cLen', cRng.length, 'jLen', jAll.length);
for (let i = lo; i <= hi && i < cRng.length; i++) {
    const c = normalizeRng(cRng[i]);
    const j = jAll[i] ?? '(missing)';
    const mark = c === j ? ' ' : '*';
    console.log(`${mark} ${i}: C ${c}  |  JS ${j}`);
}
