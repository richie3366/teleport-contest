#!/usr/bin/env node
/** Log pet/hero when RNG index hits colon invent (seed0077 ~3227). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

const WATCH = new Set([3225, 3226, 3227, 3228, 3229]);

globalThis.__diagDogInventLikeC = (g, mtmp, udist) => {
    const n = getRngLog().length;
    if (!WATCH.has(n) && !WATCH.has(n + 1)) return;
    const u = g.u;
    const d = dist2(mtmp.mx | 0, mtmp.my | 0, u.ux | 0, u.uy | 0);
    console.log(
        `rng=${n} invent udist_arg=${udist} dist2=${d} hero=(${u.ux},${u.uy}) pet=(${mtmp.mx},${mtmp.my}) colon=${!!g.context?._rogueColonMovemonActiveLikeC} pass=${g.context?._searchStep11Passes | 0}`,
    );
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}
