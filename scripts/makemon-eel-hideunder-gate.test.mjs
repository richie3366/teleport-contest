import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { makemon } from '../js/makemon.js';
import { mons, monsterNames } from '../js/monsters.js';
import { initRng } from '../js/rng.js';
import { POOL, COULD_SEE } from '../js/const.js';

// C ref: makemon.c `:1322–1326` — case S_EEL: `if (gi.in_mklev)
// (void) hideunder(mtmp);`, whose S_EEL arm hides only in
// `is_pool && !Is_waterlevel && (!Underwater || !couldsee)`
// (mon.c `:4746–4747`, Underwater ≡ u.uinwater youprop.h:279).
// JS inlined the arm with the sticky `u.Underwater` flat (zero writers
// anywhere in js/ — dead false) and dropped the `|| !couldsee` disjunct,
// so a submerged hero with clear LOS watched the newborn eel hide where
// C keeps it detected. D-3716 fixed the mon.js export; this pins the
// in_mklev birth path through the real makemon().

const EX = 10, EY = 10;
const eelPtr = () => mons(monsterNames.indexOf('PM_GIANT_EEL'));

function setup({ uinwater = 0, Underwater = undefined, couldsee = true } = {}) {
    initRng(4242);
    game.u = {
        ux: 14, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater, ustuck: null, utrap: 0,
        uhave: {}, ualign: { type: 0, record: 0 },
        ...(Underwater === undefined ? {} : { Underwater }),
    };
    game.youmonst = { mx: 14, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = { at: () => ({ typ: POOL, lit: 1 }), traps: [] };
    game.viz_array = [];
    game.viz_array[EY] = [];
    game.viz_array[EY][EX] = couldsee ? COULD_SEE : 0;
    game.in_mklev = 1;
    game.water_level = undefined;
    game.fmon = [];
    game._level_monsters = new Map();
    game.mvitals = [];
    game.migrating_objs = null;
}

describe('makemon S_EEL birth hides via hideunder (makemon.c:1322-1326, mon.c:4746-4747)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            viz: game.viz_array, mklev: game.in_mklev,
            water: game.water_level, fmon: game.fmon,
            lvlmons: game._level_monsters, mvitals: game.mvitals,
            migobj: game.migrating_objs, coreCtx: game.coreCtx,
            dispCtx: game.dispCtx, seed: game.currentSeed,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.viz_array = saved.viz;
        game.in_mklev = saved.mklev;
        game.water_level = saved.water;
        game.fmon = saved.fmon;
        game._level_monsters = saved.lvlmons;
        game.mvitals = saved.mvitals;
        game.migrating_objs = saved.migobj;
        game.coreCtx = saved.coreCtx;
        game.dispCtx = saved.dispCtx;
        game.currentSeed = saved.seed;
    });

    it('submerged hero + clear LOS: newborn eel stays visible', () => {
        setup({ uinwater: 1, couldsee: true });
        const m = makemon(eelPtr(), EX, EY, 0);
        assert.ok(m, 'eel birth failed');
        assert.equal(m.mundetected | 0, 0);
    });

    it('surface control: newborn eel in pool hides', () => {
        setup({ uinwater: 0, couldsee: true });
        const m = makemon(eelPtr(), EX, EY, 0);
        assert.ok(m, 'eel birth failed');
        assert.equal(m.mundetected | 0, 1);
    });

    it('dead u.Underwater flat alone does not expose (live bit rules)', () => {
        setup({ uinwater: 0, Underwater: 1, couldsee: true });
        const m = makemon(eelPtr(), EX, EY, 0);
        assert.ok(m, 'eel birth failed');
        assert.equal(m.mundetected | 0, 1);
    });

    it('submerged hero + blocked LOS: newborn eel still hides', () => {
        setup({ uinwater: 1, couldsee: false });
        const m = makemon(eelPtr(), EX, EY, 0);
        assert.ok(m, 'eel birth failed');
        assert.equal(m.mundetected | 0, 1);
    });
});
