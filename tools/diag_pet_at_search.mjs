#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { raceptr, nohandsPermonstLikeC } = await import(join(ROOT, 'js/mondata.js'));
const { nohandsPermonstLikeC: nh } = await import(join(ROOT, 'js/hero_hands.js'));

globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    if (!track) return;
    const n = getRngLog().length;
    if (n < 3203 || n > 3210) return;
    const ptr = raceptr(mtmp);
    console.log('\n=== rng', n, 'pet', mtmp.mx, mtmp.my, 'mnum', ptr?.mnum, 'nohands', nohandsPermonstLikeC(ptr), '===');
    for (const o of floor) {
        console.log('  fobj', o.ox, o.oy, 'otyp', o.otyp, 'quan', o.quan, 'owt', o.owt, 'oclass', o.oclass);
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

// Re-add hook in dogmove via global only — patch run by importing after hook set
const { dogGoalScanSearchPostGateLikeC } = await import(join(ROOT, 'js/dogmove_mon.js'));

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}
