#!/usr/bin/env node
/** Dump floorObjHeads / objects at hero, pet, and adjacent tiles at first #search dog_goal. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { floorObjKey } = await import(join(ROOT, 'js/floorobj.js'));

function objsAt(g, x, y) {
    const out = [];
    for (let o = g.level?.floorObjHeads?.get(floorObjKey(x, y)); o; o = o.nexthere) {
        out.push({ otyp: o.otyp, ox: o.ox, oy: o.oy });
    }
    return out;
}

globalThis.__diagDogGoalAtSearch = (g, mtmp, second) => {
    const label = second ? 'second' : 'first';
    const ux = g.u?.ux | 0;
    const uy = g.u?.uy | 0;
    const px = mtmp.mx | 0;
    const py = mtmp.my | 0;
    console.log('rng', getRngLog().length, label, 'pet', px, py, 'hero', ux, uy);
    const cells = [
        [px, py],
        [ux, uy],
        [px, py - 1],
        [px, py + 1],
        [px - 1, py],
        [px + 1, py],
        [ux, uy - 1],
        [ux, uy + 1],
        [35, 7],
        [36, 7],
        [36, 8],
    ];
    for (const [x, y] of cells) {
        const oa = objsAt(g, x, y);
        if (oa.length) console.log('  cell', x, y, oa);
    }
    let chainLen = 0;
    for (const o of g.level?.objects ?? []) {
        if (!o) continue;
        chainLen++;
    }
    let headLen = 0;
    for (const [, head] of g.level?.floorObjHeads ?? []) {
        for (let o = head; o; o = o.nexthere) headLen++;
    }
    console.log('  level.objects', chainLen, 'floorObjHeads links', headLen);
    for (const [k, head] of g.level?.floorObjHeads ?? []) {
        const stack = [];
        for (let o = head; o; o = o.nexthere) stack.push(o.otyp);
        if (stack.length > 1) console.log('  stack', k, stack);
    }
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
for (const seg of segments) await runSegment({ ...seg, storage: h });
