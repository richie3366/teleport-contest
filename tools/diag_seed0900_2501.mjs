#!/usr/bin/env node
/** Trace which code runs at RNG index ~2501 on seed0900 H peel. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const hooks = [];
globalThis.__diagDistfleeckMonsterApply = (g, mtmp) => {
    const n = getRngLog().length;
    if (n >= 2490 && n <= 2520) {
        hooks.push(
            `distfleeck pre-rng=${n} mon=(${mtmp?.mx},${mtmp?.my}) tame=${mtmp?.mtame | 0}`,
        );
    }
};
globalThis.__diagTouristD1RunAfterRestPet = (g, phase, mtmp) => {
    const n = getRngLog().length;
    if (n >= 2490 && n <= 2520) {
        hooks.push(
            `touristRestPet ${phase} rng=${n} pending=${!!g.context?._touristD1PostSwapNearRestMmoveTailPendingLikeC} restDone=${!!g.context?._touristD1PostSwapRestDochugDoneLikeC} pet=(${mtmp?.mx},${mtmp?.my})`,
        );
    }
};
globalThis.__diagTouristStub = (g, n) => {
    if (n >= 2490 && n <= 2520) {
        hooks.push(`touristStub rng=${n} pending=${!!g.context?._touristD1PostSwapNearRestMmoveTailPendingLikeC}`);
    }
};

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
console.log('\n2498-2510:\n' + log.slice(2498, 2511).map((v, i) => `${2498 + i}:${v}`).join('\n'));
