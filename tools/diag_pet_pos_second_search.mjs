#!/usr/bin/env node
/** Pet mx/my and dist2(hero) at each dog_move when RNG index in [3220,3240]. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

globalThis.__diagDogMoveLikeC = (g, mtmp) => {
    const n = getRngLog().length;
    if (n < 3220 || n > 3245) return;
    const u = g.u;
    const d = dist2(mtmp.mx | 0, mtmp.my | 0, u.ux | 0, u.uy | 0);
    console.log(
        `rng ${n} pass ${g.context?._searchStep11Passes | 0} pet (${mtmp.mx},${mtmp.my}) hero (${u.ux},${u.uy}) dist2=${d}`,
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
