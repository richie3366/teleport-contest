#!/usr/bin/env node
/** Monster distfleeck / gate fields just before bump-`l` turn (RNG ~2529). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { setApparxyMonsterLikeC } = await import(join(ROOT, 'js/set_apparxy_mon.js'));
const { distfleeckMonsterApplyLikeC } = await import(join(ROOT, 'js/distfleeck_mon.js'));
const { monnearMonsterXYLikeC } = await import(join(ROOT, 'js/mon_geom.js'));
const { BOLT_LIM } = await import(join(ROOT, 'js/const.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];

let targetStep = -1;
for (let si = 0; si < seg.steps.length; si++) {
    const rng = seg.steps[si].rng || [];
    if (rng.some((e) => e.includes('corpse_chance') && e.includes('rn2(4)=3'))) {
        targetStep = si;
        break;
    }
}
console.log('step', targetStep, 'key', seg.steps[targetStep]?.key);

const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, targetStep), /* first `targetStep` move keys (step 41 ≈ bump `l`) */
    storage: storageHandle,
});

const { game: g } = await import(join(ROOT, 'js/gstate.js'));
const u = g.u;
console.log('rngLen', getRngLog().length, 'moves', g.moves, 'hero', u?.ux, u?.uy);

for (const m of g.level?.monsters ?? []) {
    setApparxyMonsterLikeC(g, m);
    const mx = m.mx | 0;
    const my = m.my | 0;
    const mux = m.mux | 0;
    const muy = m.muy | 0;
    const inrange = dist2(mx, my, mux, muy) <= BOLT_LIM * BOLT_LIM ? 1 : 0;
    const nearby = inrange && monnearMonsterXYLikeC(m, mux, muy) ? 1 : 0;
    const hn = monnearMonsterXYLikeC(m, u.ux | 0, u.uy | 0) ? 1 : 0;
    console.log({
        mnum: m.mnum,
        at: [mx, my],
        mux,
        muy,
        mgenmklev: m.mgenmklev | 0,
        mpeaceful: m.mpeaceful | 0,
        mcansee: m.mcansee | 0,
        msleeping: m.msleeping | 0,
        movement: m.movement | 0,
        inrange,
        nearby,
        monnearHero: hn,
    });
}
