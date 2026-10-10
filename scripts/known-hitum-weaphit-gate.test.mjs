import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { do_attack } from '../js/uhitm.js';
import { objectNames, objects_globals_init, WEAPON_CLASS, TOOL_CLASS } from '../js/objects.js';
import { ROOM, M_AP_NOTHING, ROWNO, COLNO, IN_SIGHT, COULD_SEE } from '../js/const.js';
import { reset_display_messages, clear_nhwindow_message } from '../js/display.js';

// C ref: uhitm.c known_hitum `:615–617` — the weaphit conduct increment
// fires only for `WEAPON_CLASS || is_weptool` (obj.h:249: TOOL_CLASS
// with oc_skill != P_NONE). The `oc_skill != null` proxy counted every
// wielded object with a table row — e.g. a brass lantern (TOOL,
// P_NONE) — as a weapon hit (scen-sweep-Rogue-95312: conduct showed
// 18 vs C's 17 after one lantern melee).
// known_hitum is module-local, so this drives the exported do_attack:
// the hero (level 30, always hits) melees a hostile grid bug next door
// with a wielded dagger (control: weaphit +1) vs a wielded brass
// lantern (regression: weaphit +0). Both must deal damage, so a
// Vorpal-converted-miss restore (`:636–640`) cannot mask the gate.
const DAGGER = objectNames.indexOf('DAGGER');
const BRASS_LANTERN = objectNames.indexOf('BRASS_LANTERN');

function setup(uwep) {
    reset_display_messages();
    clear_nhwindow_message();
    initRng(7);
    objects_globals_init();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 }, dx: 1, dy: 0,
        uwep, uswapwep: null,
        uconduct: { weaphit: 0 },
        ulevel: 30, uhitinc: 0, uluck: 0, moreluck: 0,
        umonnum: 0, umonster: 0, umortality: 0,
        twoweap: false, uswallow: 0, ustuck: null,
        Punished: 0, uhunger: 1000, uhs: 1, // NOT_HUNGRY: newuhs no-op, no bot()
        ualign: { record: 0, type: 0 },
        abon: { a: [] }, atemp: { a: [] }, acurr: { a: [] },
        uarm: null, uarms: null, uarmg: null,
    };
    game.youmonst = { mx: 10, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 0 }),
        flags: {}, traps: [], rooms: [], objects: [],
    };
    game.viz_array = Array.from({ length: ROWNO },
        () => new Array(COLNO).fill(IN_SIGHT | COULD_SEE));
    const mon = {
        mx: 11, my: 10, mux: 10, muy: 10, mhp: 100, mhpmax: 100,
        m_lev: 1, mcanmove: 1, mcansee: 1, msleeping: 0, mstun: 0,
        mconf: 0, mundetected: 0, m_ap_type: M_AP_NOTHING,
        mappearance: 0, mtame: 0, mpeaceful: 0, mflee: 0,
        mtrapped: 0, mblinded: 0, minvis: 0, mleashed: 0,
        mcan: 0, minvent: null, mw: null, mstrategy: 0,
        meating: 0, mtrack: [], mfrozen: 0, m_id: 4242,
        data: {
            mlet: 'S_ANT', mndx: 3, ac: 10, mmove: 12, msize: 1,
            mlevel: 1, mflags1: 0, mflags2: 0, mflags3: 0,
            mresists: 0, geno: 0, cwt: 10, cnutrit: 10,
            msound: 0, mconveys: 0,
            mattk: [{ aatyp: 1, adtyp: 1, damn: 1, damd: 2 }],
        },
    };
    game.fmon = [mon];
    game.moves = 100;
    game.multi = 0;
    game.flags = { verbose: false };
    game.invent = [];
    return mon;
}

const dagger = () => ({
    otyp: DAGGER, oclass: WEAPON_CLASS, spe: 0, quan: 1,
    blessed: 0, cursed: 0, oartifact: 0, owt: 10, where: 1,
    invlet: 'a', oeroded: 0, oeroded2: 0, known: 1,
});
const lantern = () => ({
    otyp: BRASS_LANTERN, oclass: TOOL_CLASS, spe: 0, quan: 1,
    blessed: 0, cursed: 0, oartifact: 0, owt: 30, where: 1,
    invlet: 'b', oeroded: 0, oeroded2: 0, known: 1, lamplit: 0,
});

describe('known_hitum weaphit gate (uhitm.c:616)', () => {
    let saved;
    beforeEach(() => {
        assert.ok(DAGGER > 0 && BRASS_LANTERN > 0, 'otyps must exist');
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves, multi: game.multi,
            flags: game.flags, iflags: game.iflags,
            viz_array: game.viz_array, invent: game.invent,
            objects: game.objects,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.youmonst = saved.youmonst;
        game.level = saved.level;
        game.fmon = saved.fmon;
        game.moves = saved.moves;
        game.multi = saved.multi;
        game.flags = saved.flags;
        game.iflags = saved.iflags;
        game.viz_array = saved.viz_array;
        game.invent = saved.invent;
        game.objects = saved.objects;
    });

    it('wielded dagger hit: damage + weaphit 1 (control)', async () => {
        const mon = setup(dagger());
        await do_attack(mon);
        assert.ok(mon.mhp < 100, `dagger must wound (mhp ${mon.mhp})`);
        assert.equal(game.u.uconduct.weaphit, 1);
    });

    it('wielded brass lantern hit: damage but weaphit stays 0', async () => {
        const mon = setup(lantern());
        await do_attack(mon);
        assert.ok(mon.mhp < 100, `lantern must wound (mhp ${mon.mhp})`);
        assert.equal(game.u.uconduct.weaphit, 0);
    });
});
