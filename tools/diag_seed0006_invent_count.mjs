#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));

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

let snap = null;
const inventItems = [];
let inventFloor = null;
globalThis.__diagDogInventFloor = (g, m, obj) => {
    const len = getRngLog().length;
    if (len >= 2530 && len <= 2546) inventFloor = obj;
};
globalThis.__diagDogGoalInventItem = (o) => {
    const len = getRngLog().length;
    if (len >= 2530 && len <= 2546) {
        inventItems.push({
            otyp: o.otyp | 0,
            oclass: o.oclass | 0,
            rngBefore: len,
            poisoned: !!o.opoisoned,
            oartifact: o.oartifact | 0,
        });
    }
};
globalThis.__diagDogGoalInventItemAfter = (o) => {
    const len = getRngLog().length;
    if (len < 2530 || len > 2546) return;
    const last = inventItems[inventItems.length - 1];
    if (last && (last.otyp | 0) === (o.otyp | 0)) last.rngAfter = len;
};
globalThis.__diagDogMoveLikeC = (g, mtmp) => {
    const len = getRngLog().length;
    if (len >= 2530 && len <= 2546 && !snap) {
        const items = [];
        for (let o = g.invent; o; o = o.nobj) {
            items.push({ otyp: o.otyp | 0, oclass: o.oclass | 0, cursed: !!o.cursed });
        }
        snap = {
            rng: len,
            hero: [g.u?.ux, g.u?.uy],
            pet: [mtmp.mx, mtmp.my],
            inventLen: items.length,
            items,
        };
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
const allFobj = [];
for (let o = g.level?.fobj; o; o = o.nobj) {
    allFobj.push({ otyp: o.otyp | 0, x: o.ox | 0, y: o.oy | 0 });
}
const atPet = allFobj.filter((o) => o.x === omx && o.y === omy);
console.log('inventFloor', inventFloor);
console.log('inventScan', inventItems.length, inventItems);
console.log('snap', snap);
console.log('allFobj', allFobj);
console.log('atPet', atPet);
console.log('final rng', getRngLog().length);
