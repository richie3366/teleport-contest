import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mattacku } from '../js/mhitu.js';
import { objectNames, objects_globals_init, WEAPON_CLASS } from '../js/objects.js';
import { monsterNames } from '../js/generated/monsters_data.js';
import { ROOM, M_AP_NOTHING, ROWNO, COLNO, IN_SIGHT, COULD_SEE } from '../js/const.js';
import { AT_WEAP, AT_CLAW, AT_NONE, AD_PHYS, AD_STON } from '../js/mhitm.js';
import { reset_display_messages, clear_nhwindow_message } from '../js/display.js';
import { pushKey, resetInputState } from '../js/input.js';

// C ref: mhitu.c passiveum AD_STON `:2480–2498` — a monster that hits a
// cockatrice-form hero with a wielded weapon does NOT touch-petrify:
// attk_protection(AT_WEAP) is W_ARMG and MON_WEP counts as gloves, so the
// worn check passes and no stone happens. A bare-handed hit (AT_CLAW, no
// weapon, no gloves) does stone. JS deferred the whole protection gate
// ("resists only"), so the armed Elvenking stoned itself on the
// cockatrice hero at scen-sweep-Healer-95346 step 751 (C rnd(21) hitmu
// vs JS monstone obj_resists).
// passiveum is module-local, so this drives the exported mattacku: an
// adjacent Elvenking-analogue (m_lev 30, always hits) swings at a
// cockatrice-form hero, armed (control: attacker unharmed) vs bare-claw
// (regression: attacker stones).
const DAGGER = objectNames.indexOf('DAGGER');
const PM_COCKATRICE = monsterNames.indexOf('PM_COCKATRICE');

function setup(attack, mw) {
    reset_display_messages();
    clear_nhwindow_message();
    resetInputState();
    for (let i = 0; i < 20; ++i) pushKey(' ');
    initRng(7);
    objects_globals_init();
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1, status_updates: 0 };
    game.u = {
        ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 }, dx: 0, dy: 0,
        umonnum: PM_COCKATRICE, mh: 100, mhmax: 100, uhp: 100, uhpmax: 100,
        ulevel: 1, uhitinc: 0, uluck: 0, moreluck: 0,
        uswallow: 0, ustuck: null, usteed: null, uundetected: 0,
        uinvulnerable: 0, Punished: 0, uhunger: 1000, uhs: 1,
        ualign: { record: 0, type: 0 },
        abon: { a: [] }, atemp: { a: [] }, acurr: { a: [] },
        uwep: null, uswapwep: null, uarm: null, uarms: null, uarmg: null,
        uarmc: null, uarmh: null, uarms2: null,
    };
    game.youmonst = {
        mx: 10, my: 10,
        data: {
            mlet: 'S_COCKATRICE', mndx: PM_COCKATRICE, mlevel: 1,
            mattk: [
                { aatyp: AT_NONE, adtyp: AD_STON, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
            ],
        },
    };
    game.level = {
        at: () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 0 }),
        flags: {}, traps: [], rooms: [], objects: [],
    };
    game.viz_array = Array.from({ length: ROWNO },
        () => new Array(COLNO).fill(IN_SIGHT | COULD_SEE));
    game.bhitpos = { x: 10, y: 10 };
    game.mon_currwep = null;
    const mon = {
        mx: 11, my: 10, mux: 10, muy: 10, mhp: 100, mhpmax: 100,
        m_lev: 30, mcanmove: 1, mcansee: 1, msleeping: 0, mstun: 0,
        mconf: 0, mundetected: 0, m_ap_type: M_AP_NOTHING,
        mappearance: 0, mtame: 0, mpeaceful: 0, mflee: 0,
        mtrapped: 0, mblinded: 0, minvis: 0, mleashed: 0,
        mcan: 0, minvent: null, mw, mstrategy: 0,
        meating: 0, mtrack: [], mfrozen: 0, m_id: 4243,
        misc_worn_check: 0, weapon_check: 99, cham: -1,
        female: 0, mnamelth: 0,
        data: {
            mlet: 'S_HUMAN', mndx: 269, ac: 10, mmove: 12, msize: 2,
            mlevel: 30, mflags1: 0, mflags2: 0, mflags3: 0,
            mresists: 0, geno: 0, cwt: 1450, cnutrit: 400,
            msound: 0, mconveys: 0,
            mattk: [
                attack,
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
                { aatyp: AT_NONE, adtyp: AD_PHYS, damn: 0, damd: 0 },
            ],
        },
    };
    game.fmon = [mon];
    game.moves = 100;
    game.multi = 0;
    game.flags = { verbose: false };
    game.invent = [];
    return mon;
}

const sword = () => ({
    otyp: DAGGER, oclass: WEAPON_CLASS, spe: 0, quan: 1,
    blessed: 0, cursed: 0, oartifact: 0, owt: 10, where: 1,
    invlet: 'a', oeroded: 0, oeroded2: 0, known: 1,
});

describe('passiveum AD_STON attk_protection gate (mhitu.c:2480-2498)', () => {
    let saved;
    beforeEach(() => {
        assert.ok(DAGGER > 0 && PM_COCKATRICE > 0, 'tables must exist');
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves, multi: game.multi,
            flags: game.flags, invent: game.invent, iflags: game.iflags,
            viz_array: game.viz_array, bhitpos: game.bhitpos,
            mon_currwep: game.mon_currwep,
        };
    });
    afterEach(() => {
        Object.assign(game, saved);
        reset_display_messages();
        clear_nhwindow_message();
    });

    it('armed AT_WEAP hit on cockatrice hero does not stone the attacker', async () => {
        const mon = setup({ aatyp: AT_WEAP, adtyp: AD_PHYS, damn: 2, damd: 4 }, sword());
        const ret = await mattacku(mon);
        assert.equal(mon.mhp, 100, 'armed attacker must survive its own swing');
        assert.equal(ret, 0, 'attack continues (no AGR_DIED)');
    });

    it('bare AT_CLAW hit on cockatrice hero stones the attacker', async () => {
        const mon = setup({ aatyp: AT_CLAW, adtyp: AD_PHYS, damn: 1, damd: 4 }, null);
        const ret = await mattacku(mon);
        assert.ok((mon.mhp | 0) < 1, 'bare attacker must turn to stone');
        assert.equal(ret, 1, 'attacker died (AGR_DIED)');
    });
});
