#!/usr/bin/env node
/** Log pet/towel at RNG indices 3224–3230 (seed0077 colon invent). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { floorObjKey } = await import(join(ROOT, 'js/floorobj.js'));
const rngMod = await import(join(ROOT, 'js/rng.js'));
const { game: g } = await import(join(ROOT, 'js/gstate.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(sessionData).segments[0];
const storage = new Map();
let draw = 0;
const origRn2 = rngMod.rn2;
rngMod.rn2 = (n) => {
    const v = origRn2(n);
    if (draw >= 3224 && draw <= 3232) {
        const pet = (g.level?.monsters ?? []).find((m) => (m.mtame | 0) !== 0);
        const px = pet?.mx | 0;
        const py = pet?.my | 0;
        const head = g.level?.floorObjHeads?.get(floorObjKey(px, py));
        console.log(
            draw,
            `rn2(${n})=${v}`,
            'pet',
            px,
            py,
            'head',
            head ? `otyp${head.otyp}` : 'none',
            'saved',
            g.context?._searchApportTowelXYLikeC,
        );
    }
    draw++;
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
