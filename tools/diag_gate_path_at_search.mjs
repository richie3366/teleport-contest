#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const {
    findFirstSearchRogMidMklevHostileLikeC,
    firstSearchNearMklevHostileLikeC,
    eastMklevFirstLAfterBLikeC,
} = await import(join(ROOT, 'js/mfndpos_mon.js'));
const { isFirstSearchMovemonPassLikeC } = await import(join(ROOT, 'js/monmove_search.js'));

globalThis.__diagGateMove = (label, mtmp, g, extra = {}) => {
    if ((mtmp?.mnum | 0) !== 120) return;
    const ctx = g.context || {};
    console.log(
        `rng ${getRngLog().length} ${label}`,
        JSON.stringify({
            pass11: isFirstSearchMovemonPassLikeC(g),
            nearMon: !!ctx._searchPass1NearMonLikeC,
            gateCnt: ctx._searchRogGateCountLikeC | 0,
            firstNear: firstSearchNearMklevHostileLikeC(g, mtmp),
            eastL: eastMklevFirstLAfterBLikeC(g, mtmp),
            rogHostile: mtmp === findFirstSearchRogMidMklevHostileLikeC(g),
            stepNum: ctx.movemonStepNum,
            ...extra,
        }),
    );
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
