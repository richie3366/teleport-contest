#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

globalThis.__diagDogInventLikeC = (g, mtmp, udist) => {
    const n = getRngLog().length;
    if (n < 3215 || n > 3230) return;
    const u = g.u;
    console.log(
        `rng=${n} invent udist=${udist} dist2=${dist2(mtmp.mx, mtmp.my, u.ux, u.uy)}`,
        `hero=(${u.ux},${u.uy}) pet=(${mtmp.mx},${mtmp.my})`,
        `colon=${!!g.context?._rogueColonMovemonActiveLikeC}`,
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
