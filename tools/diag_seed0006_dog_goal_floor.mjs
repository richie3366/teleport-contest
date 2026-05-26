#!/usr/bin/env node
/** fobj near pet after step 41 bump kill (RNG ~2531). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    const len = getRngLog().length;
    if (len >= 2530 && len <= 2535) {
        const omx = mtmp?.mx | 0;
        const omy = mtmp?.my | 0;
        const minX = Math.max(1, omx - 5);
        const maxX = Math.min(79, omx + 5);
        const minY = Math.max(0, omy - 5);
        const maxY = Math.min(23, omy + 5);
        let heads = 0;
        const pile = [];
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const k = `${x},${y}`;
                const h = g.level?.floorObjHeads?.get(k);
                if (!h) continue;
                for (let o = h; o; o = o.nexthere) {
                    heads++;
                    pile.push({ otyp: o.otyp | 0, x, y });
                }
            }
        }
        let fcnt = 0;
        for (let o = g.level?.fobj; o; o = o.nobj) fcnt++;
        console.log(
            'rng',
            len,
            'hero',
            g.u?.ux,
            g.u?.uy,
            'pet',
            omx,
            omy,
            'fobjWalk',
            floor.length,
            'pileInBox',
            heads,
            'totalFobj',
            fcnt,
            pile,
        );
    }
};

await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, 42),
    storage: storageHandle,
});

const g = game;
const u = g.u;
const pet = (g.level?.monsters ?? []).find((m) => (m.mtame | 0));
const omx = pet?.mx | 0;
const omy = pet?.my | 0;
const minX = Math.max(1, omx - 5);
const maxX = Math.min(79, omx + 5);
const minY = Math.max(0, omy - 5);
const maxY = Math.min(23, omy + 5);
const inBox = [];
for (let o = g.level?.fobj; o; o = o.nobj) {
    const nx = o.ox | 0;
    const ny = o.oy | 0;
    if (nx >= minX && nx <= maxX && ny >= minY && ny <= maxY) {
        inBox.push({ otyp: o.otyp | 0, x: nx, y: ny, oclass: o.oclass | 0 });
    }
}
let total = 0;
for (let o = g.level?.fobj; o; o = o.nobj) total++;

console.log('rng', getRngLog().length, 'hero', u?.ux, u?.uy, 'pet', omx, omy);
console.log('fobj total', total, 'in dog_goal box', inBox.length);
for (const o of inBox) console.log(' ', o);
