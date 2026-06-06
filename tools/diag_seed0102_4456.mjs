#!/usr/bin/env node
/** Trace dog_move / mfndpos around global RNG index 4456 (seed0102 second `s`). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const TARGET = 4456;
const marks = [];
const events = [];
let dogMoveN = 0;
let mfndposN = 0;

function snapshotFlags(g) {
    const c = g.context || {};
    return {
        searchPass: c._searchStep11Passes | 0,
        touristFourth: !!c._touristD1LPostFourthMovemonLikeC,
        touristPeel: !!c._touristD1LPostMovemonPeelMfndposLikeC,
        postRestPeel: !!c._touristD1PostRestSecondMovemonPeelLikeC,
        stepNum: c.movemonStepNum,
        moves: g.moves,
    };
}

function mark(label, extra = {}) {
    marks.push({ idx: getRngLog().length, label, ...extra });
}

globalThis.__diagDogMoveLikeC = (g, mtmp) => {
    dogMoveN++;
    mark(`dogMove#${dogMoveN}`, { mx: mtmp.mx, my: mtmp.my, flags: snapshotFlags(g) });
};
globalThis.__diagDogMoveMfndpos = (g, mtmp) => {
    mfndposN++;
    mark(`mfndpos#${mfndposN}`, { mx: mtmp.mx, my: mtmp.my, flags: snapshotFlags(g) });
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0102-ranger-name-cancel.session.json'), 'utf8'),
);
const norm = normalizeSession(session);
const seg = norm.segments[0];
const moves = seg.moves || '';
const step22End = 23;

const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

const { game } = await import(join(ROOT, 'js/gstate.js'));
const origMovemon = (await import(join(ROOT, 'js/monmove.js'))).movemon;
// Can't patch - log via global hook on movemon return path
globalThis.__diagMovemonStartLikeC = (g, stepNum) => {
    const pet = g.level?.monsters?.find((m) => m.mtame);
    events.push({
        idx: getRngLog().length,
        movemonStart: true,
        stepNum,
        moves: g.moves,
        petMov: pet?.movement,
        umov: g.u?.umovement,
    });
};
globalThis.__diagMovemonRetLikeC = (g, stepNum, ret) => {
    const pet = g.level?.monsters?.find((m) => m.mtame);
    events.push({
        idx: getRngLog().length,
        movemonRet: ret,
        stepNum,
        moves: g.moves,
        petMov: pet?.movement,
        somebody: g.context?._somebodyCanMoveLikeC,
        umov: g.u?.umovement,
    });
};

await runSegment({
    ...seg,
    moves: moves.slice(0, step22End),
    steps: (seg.steps || []).slice(0, step22End),
    storage: h,
});

const pet = game.level?.monsters?.find((m) => m.mtame);
console.log('final pet mov', pet?.movement, 'moves', game.moves, 'umov', game.u?.umovement);

const log = getRngLog();
console.log('total rng', log.length);
console.log('dogMove', dogMoveN, 'mfndpos', mfndposN);
console.log('all movemon returns:', events.length);
for (const e of events) console.log(JSON.stringify(e));
console.log('marks idx', TARGET - 8, 'to', TARGET + 4);
for (const m of marks.filter((x) => x.idx >= TARGET - 8 && x.idx <= TARGET + 4)) {
    console.log(JSON.stringify(m));
}
for (let i = TARGET - 6; i <= TARGET + 4 && i < log.length; i++) {
    console.log(`  ${i}: ${log[i]}`);
}
