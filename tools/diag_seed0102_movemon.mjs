#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { movemon } = await import(join(ROOT, 'js/monmove.js'));

const TARGET = 4456;
const events = [];

const origMovemon = movemon;
// Patch via wrapper in monmove - hook at global level
const monmoveMod = await import(join(ROOT, 'js/monmove.js'));
const orig = monmoveMod.movemon;
let movemonN = 0;
monmoveMod.movemon = async (stepNum) => {
    movemonN++;
    const idx = getRngLog().length;
    const g = (await import(join(ROOT, 'js/gstate.js'))).game;
    const pet = g.level?.monsters?.find((m) => m.mtame);
    events.push({
        idx,
        movemonN,
        stepNum,
        somebody: g.context?._somebodyCanMoveLikeC,
        petMov: pet?.movement,
        umov: g.u?.umovement,
        moves: g.moves,
    });
    const r = await orig(stepNum);
    events.push({
        idx: getRngLog().length,
        movemonN,
        stepNum,
        ret: r,
        somebody: g.context?._somebodyCanMoveLikeC,
        petMov: pet?.movement,
        label: 'after',
    });
    return r;
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0102-ranger-name-cancel.session.json'), 'utf8'),
);
const norm = normalizeSession(session);
const seg = norm.segments[0];
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

await runSegment({
    ...seg,
    moves: seg.moves.slice(0, 23),
    steps: (seg.steps || []).slice(0, 23),
    storage: h,
});

console.log('movemon calls', movemonN);
for (const e of events.filter((x) => x.idx >= TARGET - 15 && x.idx <= TARGET + 5)) {
    console.log(JSON.stringify(e));
}
