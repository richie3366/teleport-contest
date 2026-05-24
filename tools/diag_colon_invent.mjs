#!/usr/bin/env node
/** Pet tile + floor towel at colon `dog_move` (seed0077). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { floorObjKey } = await import(join(ROOT, 'js/floorobj.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(sessionData).segments[0];
const storage = new Map();
await runSegment({
    ...seg,
    storage: {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) { return [...storage.keys()][i]; },
    },
});

const { game: g } = await import(join(ROOT, 'js/gstate.js'));
const pet = (g.level?.monsters ?? []).find((m) => (m.mtame | 0) !== 0);
const towelAt = (x, y) => {
    const h = g.level?.floorObjHeads?.get(floorObjKey(x, y));
    if (!h) return null;
    return { otyp: h.otyp, oclass: h.oclass, cursed: !!h.cursed };
};
function dist2(x0, y0, x1, y1) {
    const dx = (x0 | 0) - (x1 | 0);
    const dy = (y0 | 0) - (y1 | 0);
    return dx * dx + dy * dy;
}
console.log('moves', g.moves, 'hero', g.u?.ux, g.u?.uy);
console.log('pet', pet?.mx, pet?.my, 'udist', pet && g.u ? dist2(pet.mx, pet.my, g.u.ux, g.u.uy) : null);
console.log('towelXY', g.context?._searchApportTowelXYLikeC);
console.log('towel (35,8)', towelAt(35, 8));
console.log('towel at pet', pet ? towelAt(pet.mx | 0, pet.my | 0) : null);
