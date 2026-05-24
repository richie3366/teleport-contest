#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

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

let afterMklev = false;
globalThis.__diagRhackChLikeC = (g, ch) => {
    if (ch !== 'i' || (g.moves | 0) !== 1) return;
    const u = g.u;
    const pet = g.level?.monsters?.find((m) => m.mtame);
    const towels = [];
    for (let o = g.level?.fobj; o; o = o.nobj) {
        if ((o.otyp | 0) === 234 || (o.otyp | 0) === 235) {
            towels.push([o.ox, o.oy]);
        }
    }
    for (const [tx, ty] of towels) {
        console.log(`towel (${tx},${ty})`);
    }
    if (u && pet) {
        console.log(`hero (${u.ux},${u.uy}) pet (${pet.mx},${pet.my}) dist2=${dist2(pet.mx, pet.my, u.ux, u.uy)}`);
    }
};

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}
