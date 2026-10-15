import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { ohitmon } from '../js/mthrowu.js';
import { mons, monsterNames } from '../js/monsters.js';
import { objectNames, ROCK_CLASS } from '../js/objects.js';
import { OBJ_FREE, OBJ_DELETED, POOL, ROOM } from '../js/const.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';
import { pushKeys, resetInputState } from '../js/input.js';

// C ref: mthrowu.c drop_throw `:161–196` — `:180`
// `if (!(broken = flooreffects(obj, x, y, "fall")))`: a missile
// flooreffects consumes (boulder sunk in a pool via
// boulder_hits_pool, do.c:148–151 obfree) reports broken=TRUE, so
// C ohitmon `:494–498` returns TRUE and the launch_obj roll loop
// stops. JS dropped the assignment (`if (!(await
// flooreffects(...)))`), so a rolling boulder that sank kept
// rolling and launch_obj re-placed the obfree'd obj —
// `dobjsfree: obj where=1, not OBJ_DELETED`, voiding
// scen-questtour-Healer-50157014 (the scorer misattributes
// throw-voids to the first C draw, randomize_gem_colors
// o_init.c:89). Range -1 is the rolling-boulder "keep going unless
// gone" case (mthrowu.c:328–330).
const BOULDER = objectNames.indexOf('BOULDER');
const PM_GNOME = monsterNames.indexOf('PM_GNOME');
const PM_HUMAN = monsterNames.indexOf('PM_HUMAN');
assert.ok(BOULDER >= 0 && PM_GNOME >= 0 && PM_HUMAN >= 0);

function setup(typ) {
    resetGame();
    reset_display_messages();
    resetInputState();
    pushKeys(Array(10).fill('\n')); // splash You_hear on the pool arm
    // Seed 5: the gnome is hit (not the :350 miss arm) and the pool
    // chance draw is fills_up=FALSE (cell stays POOL, no bury/newsym).
    initRng(5);
    clear_nhwindow_message();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.flags = { verbose: false };
    game.context = { mon_moving: 1 }; // skip setmangry (:492)
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 }, uinwater: 0 };
    game.youmonst = { data: mons(PM_HUMAN) };
    game.fmon = [];
    game.fobj = null;
    game.moves = 10;
    game.viz_array = []; // unseen: no observe/hit messages
    game.bhitpos = { x: 20, y: 8 };
    const cells = new Map();
    cells.set('20,8', { typ });
    game.level = { at: (x, y) => cells.get(`${x},${y}`) ?? { typ: ROOM }, traps: [] };
    // Target off the landing cell: m_at(20,8) stays null so the
    // fills_up mondied arm and the passive_obj arm cannot fire.
    const mtmp = {
        mx: 25, my: 8, mux: 5, muy: 5,
        data: mons(PM_GNOME), mhp: 500, mhpmax: 500,
        mcansee: 1, mblinded: 0, mcanmove: 1, msleeping: 0,
        mcan: 0, mconf: 0, mstun: 0, m_ap_type: 0, mtame: 0, mpeaceful: 0,
        minvis: 0, mundetected: 0, mtrapped: 0, mlev: 1,
    };
    const boulder = {
        otyp: BOULDER, oclass: ROCK_CLASS, quan: 1, spe: 0,
        where: OBJ_FREE, nobj: null, nexthere: null, ox: 20, oy: 8,
        opoisoned: 0, oartifact: 0, owornmask: 0, unpaid: 0, no_charge: 0,
        timed: 0, lamplit: 0, cursed: 0, blessed: 0, bknown: 0, known: 0,
        o_id: 9001, corpsenm: -1, otrapped: 0, globby: 0,
    };
    return { mtmp, boulder, cells };
}

describe('drop_throw flooreffects-broken', () => {
    it('rolling boulder sunk in a pool reports gone (ohitmon TRUE)', async () => {
        const { mtmp, boulder, cells } = setup(POOL);
        const r = await ohitmon(mtmp, boulder, -1, false);
        assert.equal(r, true);
        assert.equal(boulder.where | 0, OBJ_DELETED);
        assert.equal(cells.get('20,8').typ, POOL); // seed guard: no fill morph
    });

    it('rolling boulder landing on room keeps rolling (ohitmon FALSE)', async () => {
        const { mtmp, boulder } = setup(ROOM);
        const r = await ohitmon(mtmp, boulder, -1, false);
        assert.equal(r, false);
        // C :495–496 special case: placed by drop_throw, re-extracted
        // for motion again.
        assert.equal(boulder.where | 0, OBJ_FREE);
    });
});
