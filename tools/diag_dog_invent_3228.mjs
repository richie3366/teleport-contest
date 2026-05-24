#!/usr/bin/env node
/** Log pet/hero/dist at second-search `dog_invent` (seed0077 ~3228). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));
const { EDOG } = await import(join(ROOT, 'js/const.js'));

globalThis.__diagDogInventLikeC = (g, mtmp, udist) => {
    const n = getRngLog().length | 0;
    if (n < 3218 || n > 3230) return;
    const u = g.u;
    const ed = EDOG(mtmp);
    const d2 = u ? dist2(mtmp.mx | 0, mtmp.my | 0, u.ux | 0, u.uy | 0) : -1;
    console.log(
        `invent@${n}`,
        `pet=(${mtmp.mx},${mtmp.my})`,
        `hero=(${u?.ux},${u?.uy})`,
        `udist=${udist}`,
        `dist2=${d2}`,
        `apport=${ed?.apport}`,
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
