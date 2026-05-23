#!/usr/bin/env node
/** Log floor objects during second first-#search dog_goal. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { floorObjKey } = await import(join(ROOT, 'js/floorobj.js'));

globalThis.__diagDogGoalAtSearch = (g, mtmp, second) => {
    if (!second) {
        const inv = g.invent ?? [];
        console.log('searchPass entry hero', g.u?.ux, g.u?.uy, 'inv', inv.length);
    }
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const SQ = 5;
    const minX = Math.max(1, omx - SQ);
    const maxX = Math.min(79, omx + SQ);
    const minY = Math.max(0, omy - SQ);
    const maxY = Math.min(23, omy + SQ);
    const inBox = [];
    const allNear = [];
    for (const o of g.level?.objects ?? []) {
        if (!o) continue;
        const nx = o.ox | 0;
        const ny = o.oy | 0;
        if (nx >= minX && nx <= maxX && ny >= minY && ny <= maxY) {
            inBox.push({ ox: nx, oy: ny, otyp: o.otyp, oclass: o.oclass });
        }
        if (Math.abs(nx - omx) <= 8 && Math.abs(ny - omy) <= 8) {
            allNear.push({ ox: nx, oy: ny, otyp: o.otyp });
        }
    }
    const feet = g.level?.floorObjHeads?.get(floorObjKey(omx, omy));
    const ux = g.u?.ux | 0;
    const uy = g.u?.uy | 0;
    const udist = (omx - ux) * (omx - ux) + (omy - uy) * (omy - uy);
    const locU = g.level?.at(ux, uy);
    console.log(
        'rng',
        getRngLog().length,
        second ? 'second' : 'first',
        'pet',
        omx,
        omy,
        'hero',
        ux,
        uy,
        'udist2',
        udist,
        'heroTyp',
        locU?.typ,
        'mconf',
        mtmp.mconf | 0,
        'mflee',
        mtmp.mflee | 0,
        'inBox',
        inBox.length,
        inBox,
        'feetObj',
        feet ? { ox: feet.ox, oy: feet.oy, otyp: feet.otyp } : null,
        'allNear',
        allNear.length,
        allNear,
    );
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
