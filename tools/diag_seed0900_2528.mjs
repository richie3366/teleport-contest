#!/usr/bin/env node
/** Trace second post-rest pet mfndpos @ ~2528 (mtrack vs chcnt). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { distmin, dist2 } = await import(join(ROOT, 'js/hacklib.js'));
const { MTSZ } = await import(join(ROOT, 'js/const.js'));

const traces = [];
let rngBefore = 0;

globalThis.__diagDogMoveMfndpos = (g, mtmp) => {
    const n = getRngLog().length;
    if (
        !g.context?._touristD1PostRestSecondDogMoveLikeC
        || n < 2520
    ) {
        return;
    }
    rngBefore = n;
    const u = g.u;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const heroDist = u ? distmin(omx, omy, u.ux | 0, u.uy | 0) : -1;
    traces.push({
        at: n,
        omx,
        omy,
        ux: u?.ux,
        uy: u?.uy,
        heroDist,
        mtrack: (mtmp.mtrack ?? []).map((t) => `(${t.x},${t.y})`),
        flags: {
            second: !!g.context?._touristD1PostRestSecondDogMoveLikeC,
            secondMfnd: !!g.context?._touristD1PostRestSecondMfndposLikeC,
        },
    });
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
console.log('2525-2532:');
for (let i = 2525; i <= 2532; i++) {
    console.log(`  ${i}: ${log[i] ?? '(missing)'}`);
}
console.log('\nmfndpos hooks:', JSON.stringify(traces, null, 2));
console.log('rng at hook:', rngBefore);
