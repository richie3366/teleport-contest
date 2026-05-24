#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagPostGateFobj = (g, mtmp, tag) => {
    const rng = getRngLog().length;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const SQ = 5;
    const minX = Math.max(1, omx - SQ);
    const maxX = Math.min(79, omx + SQ);
    const minY = Math.max(0, omy - SQ);
    const maxY = Math.min(23, omy + SQ);
    const inBox = [];
    for (let o = g.level?.fobj; o; o = o.nobj) {
        const nx = o.ox | 0;
        const ny = o.oy | 0;
        if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
        inBox.push([nx, ny, o.otyp]);
    }
    console.log(tag, 'rng', rng, 'pet', omx, omy, 'hero', g.u?.ux, g.u?.uy, 'inBox', inBox);
};
globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    const rng = getRngLog().length;
    if (rng >= 3200 && rng <= 3230) {
        console.log(
            'dogGoal rng', rng, 'track', track,
            'pet', mtmp.mx, mtmp.my, 'hero', g.u?.ux, g.u?.uy,
            'floorN', floor?.length,
            floor?.map((o) => [o.ox, o.oy, o.otyp]),
        );
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
