#!/usr/bin/env node
/** Log hero/pet/dist2 at second-search `dog_invent` (seed0077 ~3228). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

function dist2(x0, y0, x1, y1) {
    const dx = (x0 | 0) - (x1 | 0);
    const dy = (y0 | 0) - (y1 | 0);
    return dx * dx + dy * dy;
}

globalThis.__diagDogInventLikeC = (g, mtmp, udist) => {
    const n = getRngLog().length;
    if (n < 3220 || n > 3235) return;
    const u = g.u;
    const pass = g.context?._searchStep11Passes | 0;
    console.log(
        `dog_invent rng=${n} pass=${pass} moves=${g.moves}`,
        `hero=(${u?.ux},${u?.uy})`,
        `pet=(${mtmp.mx},${mtmp.my})`,
        `udist_arg=${udist}`,
        `dist2=${u ? dist2(mtmp.mx, mtmp.my, u.ux, u.uy) : '?'}`,
        `apport=${mtmp.mextra?.edog?.apport}`,
    );
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
await runSegment({
    ...normalizeSession(session).segments[0],
    storage: {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) { return [...storage.keys()][i]; },
    },
});
