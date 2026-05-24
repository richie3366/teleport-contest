#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { canReachLocationDogmoveLikeC } = await import(join(ROOT, 'js/dogmove_reach.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
const g = await (async () => {
    for (const seg of segments) await runSegment({ ...seg, storage: h });
    return (await import(join(ROOT, 'js/gstate.js'))).game;
})();

const pet = g.level.monsters.find((m) => m.mtame);
const omx = pet.mx | 0;
const omy = pet.my | 0;
console.log('pet', omx, omy);
for (const [x, y] of [[34, 13], [35, 13], [35, 8], [35, 2]]) {
  console.log(
    x, y,
    'canReach',
    canReachLocationDogmoveLikeC(g, pet, omx, omy, x, y),
  );
}
