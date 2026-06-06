#!/usr/bin/env node
/** Locate JS RNG ~2519 on seed0900 post-rest pet peel. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const hooks = [];
const mark = (label) => {
    const n = getRngLog().length;
    if (n >= 2505 && n <= 2525) hooks.push(`${n}: ${label}`);
};

globalThis.__diagMaybeGen = (stack) => mark(`maybe ${stack}`);
globalThis.__diagDogMoveLikeC = () => mark('dogMoveLikeC');
globalThis.__diagDogMoveMfndpos = () => mark('dogMoveMfndposPick');
globalThis.__diagDogGoalFloor = () => mark('dogGoalFloorScan');

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0900-tourist-explore-actions.session.json'), 'utf8'),
);
const segments = normalizeSession(sessionData).segments;
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i]; },
};
for (const seg of segments) await runSegment({ ...seg, storage: sh });

const log = getRngLog().filter((e) => /^(rn2|rnd)/.test(e)).map((e) => e.replace(/ @.*/, ''));
console.log('hooks:\n' + hooks.join('\n'));
console.log('\n2510-2522:\n' + log.slice(2510, 2523).map((v, i) => `${2510 + i}:${v}`).join('\n'));
