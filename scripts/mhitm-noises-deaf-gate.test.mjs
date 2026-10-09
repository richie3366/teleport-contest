import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { mattackm } from '../js/mhitm.js';
import { ROOM, M_ATTK_MISS, M_AP_NOTHING } from '../js/const.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: mhitm.c noises `:27–38` — out-of-sight m-vs-m combat feedback.
// The `:31` gate `if (!Deaf && ...)` uses the youprop.h:125 macro
// (HDeaf || EDeaf || uroleplay.deaf). The raw `game.u?.Deaf` read let a
// macro-deaf hero near far combat take far_noise/noisetime updates plus
// the You_hear, where C skips the arm. Live reader: hero_Deaf
// (js/monmove.js, D-3572 pattern; its extra `|| u.Deaf` is dead code —
// zero writers — so the gate is exactly the C macro).
// noises is module-local (C staticfn), so this drives the exported
// mattackm: two dogs fighting at (10,10)/(11,11) while the hero stands at
// (30,10) with no viz_array (cansee false → _mm_vis false → missmm →
// noises). magr m_lev -30 forces the i=0 claw swing to miss on any seed
// (tmp = 10 - 30 < rnd(20)); slots 1..5 are NO_ATTK (default arm).

const AT_CLAW = 1;
const AD_PHYS = 0;

function setup(hero = {}, multi = 0) {
    reset_display_messages();
    clear_nhwindow_message();
    initRng(7);
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 },
        HDeaf: 0, EDeaf: 0, uroleplay: {}, Deaf: 0,
        ...hero,
    };
    game.youmonst = { mx: 30, my: 10, data: { mlet: 'S_HUMAN' } };
    game.level = {
        at: () => ({ typ: ROOM, lit: 0, flags: 0, glyph: 0, roomno: 0 }),
        flags: {}, traps: [], rooms: [],
    };
    game.viz_array = undefined;
    game.fmon = [];
    game.moves = 100;
    game.multi = multi;
    game.flags = { verbose: true };
    game.far_noise = false;
    game.noisetime = 0;
    const mkdog = (mx, my, m_lev) => ({
        mx, my, mux: 30, muy: 10, mhp: 20, mhpmax: 20, m_lev,
        mcanmove: 1, mcansee: 1, msleeping: 0, mstun: 0, mconf: 0,
        mundetected: 0, m_ap_type: M_AP_NOTHING, mappearance: 0,
        mtame: 0, mpeaceful: 0, mflee: 0, mtrapped: 0, mblinded: 0,
        minvis: 0, mleashed: 0, mcan: 0, minvent: null, mw: null,
        mstrategy: 0, meating: 0, mtrack: [],
        data: {
            mlet: 'S_DOG', mndx: 17, ac: 10, mmove: 12, msize: 2,
            mflags1: 0, mflags2: 0, mflags3: 0, mresists: 0, geno: 0,
            mattk: [{ aatyp: AT_CLAW, adtyp: AD_PHYS, damn: 1, damd: 4 }],
        },
    });
    const magr = mkdog(10, 10, -30);
    const mdef = mkdog(11, 10, 3);
    game.fmon = [magr, mdef];
    return { magr, mdef };
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('noises reads the Deaf macro (mhitm.c:31)', () => {
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

    it('non-deaf control: miss is heard in the distance + state updates', async () => {
        const { magr, mdef } = setup();
        const ret = await mattackm(magr, mdef);
        assert.equal(ret, M_ATTK_MISS);
        assert.deepEqual(messages(), ['You hear some noises in the distance.']);
        assert.equal(game.far_noise, true);
        assert.equal(game.noisetime, 100);
    });

    it('EDeaf + Unaware: silent, state untouched (C skips the arm)', async () => {
        const { magr, mdef } = setup({ EDeaf: 1, usleep: 1 }, -1);
        await mattackm(magr, mdef);
        assert.deepEqual(messages(), []);
        assert.equal(game.far_noise, false);
        assert.equal(game.noisetime, 0);
    });

    it('uroleplay.deaf + Unaware: silent, state untouched (C skips the arm)', async () => {
        const { magr, mdef } = setup({ uroleplay: { deaf: 1 }, usleep: 1 }, -1);
        await mattackm(magr, mdef);
        assert.deepEqual(messages(), []);
        assert.equal(game.far_noise, false);
        assert.equal(game.noisetime, 0);
    });

    it('HDeaf + Unaware control: silent (old gate already covered)', async () => {
        const { magr, mdef } = setup({ HDeaf: 1, usleep: 1 }, -1);
        await mattackm(magr, mdef);
        assert.deepEqual(messages(), []);
        assert.equal(game.far_noise, false);
        assert.equal(game.noisetime, 0);
    });

    it('EDeaf aware: silent via You_hear inner gate (no delta)', async () => {
        const { magr, mdef } = setup({ EDeaf: 1 });
        await mattackm(magr, mdef);
        assert.deepEqual(messages(), []);
    });
});
