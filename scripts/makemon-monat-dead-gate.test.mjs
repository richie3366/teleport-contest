import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { makemon } from '../js/makemon.js';
import { mons, monsterNames } from '../js/monsters.js';
import { initRng } from '../js/rng.js';
import { ROOM } from '../js/const.js';

// C ref: makemon.c `:1193–1199` — the MON_AT(x,y) gate reads the
// live-monsters grid (rm.h:515). Dead mons linger on fmon until
// dmonsfree but are off the grid, so they must not void creation.
// JS scanned raw fmon (no dead/offmap/steed skips), voiding a summon
// makemon + substitute on a mhp=0 husk cell with zero draws (D-3751:
// scen-worldtour-Wizard-95229 step 248, salamander husk at 9,17).
// The gate now uses the live m_at() export (clone_mon precedent).

const EX = 10, EY = 10;
const bugPtr = () => mons(monsterNames.indexOf('PM_GRID_BUG'));

function setup(fmon) {
    initRng(4242);
    game.u = {
        ux: 14, uy: 10, uz: { dnum: 0, dlevel: 1 },
        uinwater: 0, ustuck: null, utrap: 0,
        uhave: {}, ualign: { type: 0, record: 0 },
    };
    game.youmonst = { mx: 14, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1 }),
        traps: [],
        flags: { rndmongen: 1 },
    };
    game.in_mklev = 0;
    game.fmon = fmon;
    game._level_monsters = new Map();
    game.mvitals = [];
    game.migrating_objs = null;
}

describe('makemon MON_AT gate skips dead fmon husks (makemon.c:1193-1199)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            mklev: game.in_mklev, fmon: game.fmon,
            lvlmons: game._level_monsters, mvitals: game.mvitals,
            migobj: game.migrating_objs, coreCtx: game.coreCtx,
            dispCtx: game.dispCtx, seed: game.currentSeed,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.in_mklev = saved.mklev;
        game.fmon = saved.fmon;
        game._level_monsters = saved.lvlmons;
        game.mvitals = saved.mvitals;
        game.migrating_objs = saved.migobj;
        game.coreCtx = saved.coreCtx;
        game.dispCtx = saved.dispCtx;
        game.currentSeed = saved.seed;
    });

    it('dead mon on fmon does not block creation at its cell', () => {
        setup([{ mx: EX, my: EY, mhp: 0, mhpmax: 8, mstate: 0 }]);
        const m = makemon(bugPtr(), EX, EY, 0);
        assert.ok(m, 'makemon voided by a dead husk (C MON_AT is grid-only)');
        assert.equal(m.mx, EX);
        assert.equal(m.my, EY);
    });

    it('live mon on fmon still blocks creation (control)', () => {
        setup([{ mx: EX, my: EY, mhp: 10, mhpmax: 10, mstate: 0 }]);
        const m = makemon(bugPtr(), EX, EY, 0);
        assert.equal(m, null);
    });
});
