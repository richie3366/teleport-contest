#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { fmonListForMovemonLikeC } = await import(join(ROOT, 'js/fmon_iter.js'));
const {
    findFirstSearchRogMidMklevHostileLikeC,
    findDistantMklevMonLikeC,
    findEastKickMonLikeC,
    firstSearchNearMklevHostileLikeC,
} = await import(join(ROOT, 'js/mfndpos_mon.js'));

const orig = fmonListForMovemonLikeC;
let logged = false;

globalThis.__diagFmonAtSearch = (g, stepNum, list, detail) => {
    if (logged || (g.context?._searchStep11Passes | 0) !== 1) return;
    logged = true;
    const mons = g.level?.monsters ?? [];
    console.log('rng', getRngLog().length, 'stepNum', stepNum, 'hero', g.u?.ux, g.u?.uy);
    console.log('all mons:', mons.map((m) => ({
        mnum: m.mnum,
        mx: m.mx,
        my: m.my,
        mgen: m.mgenmklev | 0,
        sleep: m.msleeping | 0,
        tame: m.mtame | 0,
    })));
    console.log('rogGate', findFirstSearchRogMidMklevHostileLikeC(g)?.mx);
    console.log('distant', findDistantMklevMonLikeC(g)?.mx);
    console.log('eastKick', findEastKickMonLikeC(g)?.mx);
    console.log('fmon order:', list.map((m) => ({
        mnum: m.mnum,
        mx: m.mx,
        my: m.my,
        mgen: m.mgenmklev | 0,
        hostile: firstSearchNearMklevHostileLikeC(g, m),
    })));
    if (detail) console.log('peel detail:', JSON.stringify({
        pre: detail.preGatePeel?.length,
        post: detail.postGatePeel?.length,
        mklevTail: detail.mklevTail?.map((m) => [m.mx, m.my]),
        nearH: detail.nearHostile?.length,
        nearR: detail.nearRemainder?.length,
        mid: detail.midRest?.length,
    }));
};

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

for (const seg of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...seg, storage: storageHandle });
}
