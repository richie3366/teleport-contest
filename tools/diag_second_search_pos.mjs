#!/usr/bin/env node
/** Hero/pet at second `#search` post (seed0077). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const rngMod = await import(join(ROOT, 'js/rng.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(sessionData).segments[0];
const storage = new Map();
const origRn2 = rngMod.rn2;
let n = 0;
rngMod.rn2 = (x) => {
    const v = origRn2(x);
    if (n >= 3224 && n <= 3232) {
        console.log('rng', n, `rn2(${x})=${v}`);
    }
    n++;
    return v;
};

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
const edog = pet?.mextra?.edog;
console.log('end moves', g.moves, 'hero', g.u?.ux, g.u?.uy);
console.log('pet', pet?.mx, pet?.my, 'apport', edog?.apport);
function dist2(x0, y0, x1, y1) {
    const dx = (x0 | 0) - (x1 | 0);
    const dy = (y0 | 0) - (y1 | 0);
    return dx * dx + dy * dy;
}
if (pet && g.u) {
    console.log('dist2', dist2(pet.mx, pet.my, g.u.ux, g.u.uy));
}
