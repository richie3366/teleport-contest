#!/usr/bin/env node
/** Trace RNG call sites around indices 2535–2555 (seed0900 `s`). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const rngMod = await import(join(ROOT, 'js/rng.js'));
const origRn2 = rngMod.rn2;
const origRnd = rngMod.rnd;
const trace = [];

function wrap(fn, name) {
    return (...args) => {
        const n = rngMod.getRngLog().length;
        const result = fn(...args);
        if (n >= 2533 && n <= 2556) {
            const err = new Error();
            const line = (err.stack ?? '').split('\n')[2]?.trim() ?? '?';
            trace.push(`${n}: ${name}(${args.join(',')})=${result}  ${line}`);
        }
        return result;
    };
}
rngMod.rn2 = wrap(origRn2, 'rn2');
rngMod.rnd = wrap(origRnd, 'rnd');

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0900-tourist-explore-actions.session.json'), 'utf8'),
);
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i]; },
};

for (const seg of normalizeSession(sessionData).segments) {
    await runSegment({ ...seg, storage: sh });
}

console.log(trace.join('\n'));
