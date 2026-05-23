#!/usr/bin/env node
/** Count floor objects pet could reach for dog_goal (C could_reach subset). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const {
    IS_DOOR, POOL, LAVAPOOL, CORR, ROOM, DOOR,
} = await import(join(ROOT, 'js/const.js'));

function couldReachItemLikeC(g, nx, ny) {
    const loc = g.level?.at(nx, ny);
    if (!loc) return false;
    const typ = loc.typ | 0;
    if (typ === POOL || typ === LAVAPOOL) return false;
    return true;
}

function isObstructed(g, typ) {
    return typ < DOOR && typ !== CORR && typ !== ROOM;
}

function canReachLocationLikeC(g, mx, my, fx, fy) {
    if (mx === fx && my === fy) return true;
    const dist = (mx - fx) * (mx - fx) + (my - fy) * (my - fy);
    for (let i = mx - 1; i <= mx + 1; i++) {
        for (let j = my - 1; j <= my + 1; j++) {
            if (i < 0 || i > 79 || j < 0 || j > 23) continue;
            const d2 = (i - fx) * (i - fx) + (j - fy) * (j - fy);
            if (d2 >= dist) continue;
            const typ = g.level?.at(i, j)?.typ | 0;
            if (isObstructed(g, typ)) continue;
            if (IS_DOOR(typ) && (g.level.at(i, j).doormask & 3)) continue;
            if (!couldReachItemLikeC(g, i, j)) continue;
            if (canReachLocationLikeC(g, i, j, fx, fy)) return true;
        }
    }
    return false;
}

globalThis.__diagDogGoalAtSearch = (g, mtmp, second) => {
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const label = second ? 'second' : 'first';
    const SQ = 5;
    const minX = Math.max(1, omx - SQ);
    const maxX = Math.min(79, omx + SQ);
    const minY = Math.max(0, omy - SQ);
    const maxY = Math.min(23, omy + SQ);
    const reachable = [];
    for (const o of g.level?.objects ?? []) {
        if (!o) continue;
        const nx = o.ox | 0;
        const ny = o.oy | 0;
        if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
        if (
            couldReachItemLikeC(g, nx, ny)
            && canReachLocationLikeC(g, omx, omy, nx, ny)
        ) {
            reachable.push({ ox: nx, oy: ny, otyp: o.otyp });
        }
    }
    console.log('rng', getRngLog().length, label, 'reachableInBox', reachable.length, reachable);
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
