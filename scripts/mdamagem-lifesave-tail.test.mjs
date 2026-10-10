import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mattackm } from '../js/mhitm.js';
import { ROOM, M_AP_NOTHING, M_ATTK_DEF_DIED, W_AMUL } from '../js/const.js';
import { objectNames } from '../js/objects.js';
import { clear_nhwindow_message, reset_display_messages } from '../js/display.js';

// C ref: mhitm.c mdamagem `:1088–1094` — after monkilled, a revived
// defender (amulet lifesave or vamprises rise) returns hitflags with no
// DEF_DIED and no grow_up; C's mattackm loop then runs passivemm.
// JS split C's single kill tail into per-adtyp copies; 15 carry the gate
// but the shared fall-through tail (AD_PHYS/PLYS/SLOW/DRST/DRDX/DRCO) and
// the AD_POLY arm call grow_up unconditionally — scen-worldtour-Monk-95223
// step 625 draws rnd(19)@grow_up where C draws rn2(3)@passivemm.
// mdamagem is module-local, so this drives the exported mattackm: a dog
// with a lethal AD_PHYS claw kills an amulet-wearing dog (the :1091 gate
// covers lifesave and vamprises identically); the defender must revive
// with no DEF_DIED and the attacker must gain no HP (no grow_up).
// mattackm is module-shaped like mhitm-dgst-deaf-gate.test.mjs.

const AT_CLAW = 1;
const AD_PHYS = 0; /* monattk.h, mhitm.js:329 */
const AMULET_OF_LIFE_SAVING = objectNames.indexOf('AMULET_OF_LIFE_SAVING');

function setup() {
    reset_display_messages();
    clear_nhwindow_message();
    initRng(1);
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
    };
    game.youmonst = { mx: 30, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 0, flags: 0, glyph: 0, roomno: 0 }),
        flags: {}, traps: [], rooms: [],
    };
    game.viz_array = undefined;
    game.fmon = [];
    game.moves = 100;
    game.multi = 0;
    game.flags = { verbose: true };
    game.far_noise = false;
    game.noisetime = 0;
    const mkdog = (mx, my, m_lev, damn, damd, mhp) => ({
        mx, my, mux: 30, muy: 10, mhp, mhpmax: mhp, m_lev,
        mcanmove: 1, mcansee: 1, msleeping: 0, mstun: 0, mconf: 0,
        mundetected: 0, m_ap_type: M_AP_NOTHING, mappearance: 0,
        mtame: 0, mpeaceful: 0, mflee: 0, mtrapped: 0, mblinded: 0,
        minvis: 0, mleashed: 0, mcan: 0, minvent: null, mw: null,
        mstrategy: 0, meating: 0, mtrack: [],
        data: {
            mlet: 'S_DOG', mndx: 17, ac: 10, mmove: 12, msize: 2,
            mflags1: 0, mflags2: 0, mflags3: 0, mresists: 0, geno: 0,
            mattk: [{ aatyp: AT_CLAW, adtyp: AD_PHYS, damn, damd }],
        },
    });
    // magr m_lev 30 forces the i=0 swing to hit on any seed
    // (tmp = mac + 30 > rnd(20)); d(2,6) >= 2 always kills mhp 1.
    const magr = mkdog(10, 10, 30, 2, 6, 20);
    const mdef = mkdog(11, 10, 3, 1, 4, 1);
    mdef.minvent = {
        otyp: AMULET_OF_LIFE_SAVING, owornmask: W_AMUL, quan: 1, nobj: null,
    };
    game.fmon = [magr, mdef];
    return { magr, mdef };
}

describe('mdamagem revived-defender tail (mhitm.c:1091-1094)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, youmonst: game.youmonst, level: game.level,
            fmon: game.fmon, moves: game.moves, multi: game.multi,
            flags: game.flags, iflags: game.iflags,
            viz_array: game.viz_array,
            far_noise: game.far_noise, noisetime: game.noisetime,
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
        game.far_noise = saved.far_noise;
        game.noisetime = saved.noisetime;
    });

    it('lifesaved defender: no DEF_DIED, attacker gains nothing (no grow_up)', async () => {
        const { magr, mdef } = setup();
        const hpmaxBefore = magr.mhpmax | 0;
        const res = await mattackm(magr, mdef);
        assert.ok((mdef.mhp | 0) > 0, 'defender revived by the amulet');
        assert.equal(res & M_ATTK_DEF_DIED, 0, 'no DEF_DIED for a revived defender');
        assert.equal(magr.mhpmax | 0, hpmaxBefore, 'no grow_up HP gain without a kill');
    });

    it('unsaved defender: DEF_DIED, attacker grows (control)', async () => {
        const { magr, mdef } = setup();
        mdef.minvent = null;
        const hpmaxBefore = magr.mhpmax | 0;
        const res = await mattackm(magr, mdef);
        assert.ok((mdef.mhp | 0) < 1, 'defender died');
        assert.notEqual(res & M_ATTK_DEF_DIED, 0, 'DEF_DIED set on a real kill');
        assert.ok((magr.mhpmax | 0) > hpmaxBefore, 'grow_up HP gain on a real kill');
    });
});
