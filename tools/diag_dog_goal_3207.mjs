#!/usr/bin/env node
/** Trace dog_goal fobj scan at first #search gate (~3204–3208). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { objResists } = await import(join(ROOT, 'js/obj_resists.js'));
const {
    couldReachItemDogmoveLikeC,
    canReachLocationDogmoveLikeC,
    mCanseeDogmoveLikeC,
} = await import(join(ROOT, 'js/dogmove_reach.js'));

const APPORT = 4;
const UNDEF = 6;
const MANFOOD = 3;

function dogfoodRank(obj) {
    if (!obj) return UNDEF;
    if (obj.opoisoned) return 2;
    if (objResists(obj, 0, 95)) return obj.cursed ? 1 : APPORT;
    const oc = obj.oclass | 0;
    if (oc === 18) return 0; // FOOD
    if (oc === 15) return UNDEF; // ROCK
    if (obj.cursed) return 1;
    return APPORT;
}

globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    if (!track) return;
    const n = getRngLog().length;
    if (n < 3203 || n > 3210) return;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    console.log('\n=== rng', n, 'pet', omx, omy, '===');
    let gtyp = UNDEF;
    for (const obj of floor) {
        const nx = obj.ox | 0;
        const ny = obj.oy | 0;
        const otyp = dogfoodRank(obj);
        const reachItem = couldReachItemDogmoveLikeC(g, mtmp, nx, ny);
        const reachLoc = canReachLocationDogmoveLikeC(g, mtmp, omx, omy, nx, ny);
        const msee = mCanseeDogmoveLikeC(g, mtmp, nx, ny);
        const skip = otyp > gtyp || otyp === UNDEF;
        console.log(
            ' ', nx, ny,
            'otypRank', otyp,
            'quan', obj.quan,
            'owt', obj.owt,
            'skip', skip,
            'reach', reachItem && reachLoc,
            'msee', msee,
            'gtypBefore', gtyp,
        );
        if (!skip && reachItem && reachLoc) {
            if (otyp >= MANFOOD && gtyp === UNDEF) {
                console.log('   -> apport candidate');
            }
            if (otyp < MANFOOD) gtyp = otyp;
            else if (gtyp === UNDEF) gtyp = APPORT;
        }
    }
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
