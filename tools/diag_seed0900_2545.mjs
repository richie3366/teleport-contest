#!/usr/bin/env node
/** Trace fmon + mcalcmove + near mklev dochug around RNG ~2545 (seed0900 `s`). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { raceptr } = await import(join(ROOT, 'js/mondata.js'));

const hooks = [];
const mark = (label) => {
    const n = getRngLog().length;
    if (n >= 2533 && n <= 2550) {
        hooks.push(`${n}: ${label}`);
    }
};

globalThis.__diagDogMoveMfndpos = () => mark('dogMoveMfndpos');

const origMcalc = (await import(join(ROOT, 'js/mcalc_move.js'))).mcalcMoveLikeC;
// Patch via dynamic re-import hack — hook distfleeck in apply
const { distfleeckMonsterApplyLikeC: origDf } = await import(join(ROOT, 'js/distfleeck_mon.js'));

const sessionData = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0900-tourist-explore-actions.session.json'), 'utf8'),
);
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i]; },
};

// Monkey-patch mcalc in moveloop path: wrap at module level not possible without edit.
// Use movemon hook via context flag reads after run.

for (const seg of normalizeSession(sessionData).segments) {
    await runSegment({ ...seg, storage: sh });
}

const log = getRngLog()
    .filter((e) => /^(rn2|rnd)/.test(e))
    .map((e) => e.replace(/ @.*/, ''));
console.log('hooks:\n' + hooks.join('\n'));
console.log('\n2533-2548:\n' + log.slice(2533, 2549).map((v, i) => `${2533 + i}:${v}`).join('\n'));
console.log('\nmonsters at end:', (game.level?.monsters ?? []).map((m) => ({
    mx: m.mx, my: m.my, tame: m.mtame | 0, mklev: m.mgenmklev | 0,
    mnum: raceptr(m)?.mnum, movement: m.movement,
})));
