import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { Displaced, set_apparxy } from '../js/monmove.js';
import { DISPLACED, W_ARMC } from '../js/const.js';
import { CLOAK_OF_DISPLACEMENT } from '../js/objects.js';

// C ref: youprop.h `:202–204` — Displaced ≡ HDisplaced || EDisplaced,
// stored u.uprops[DISPLACED] bits only. C never reads the worn cloak
// live. nhl_gamestate save runs setnotworn over invent (clearing worn
// extrinsic bits) BEFORE snapshotting u, and restore re-wears via
// setworn BEFORE memcpy'ing the snapshot back (nhlua.c `:1878–1912`),
// so after a lua levelchange the cloak is worn with EDisplaced == 0
// (temp-C measured on scen-sweep-Ranger-95303: uarmc=149, EDis 2 → 0
// across the "Resetting time" restore, never re-conferred). The JS
// clones used to OR in a live `uarmc.otyp === CLOAK_OF_DISPLACEMENT`
// fallback, forking set_apparxy into the gotu rn2(4) arm where C takes
// displ == 0 (distfleeck cliff @237, C 25× rn2(5) vs JS rn2(4)).

function setupPostGamestate() {
    initRng(95303);
    enableRngLog();
    game.u = {
        ux: 34, uy: 11, ustuck: null, uinwater: 0,
        // Cloak worn (setworn re-ran at restore) but the snapshot
        // memcpy zeroed the extrinsic bit (C nhlua.c restore order).
        uarmc: { otyp: CLOAK_OF_DISPLACEMENT, owornmask: W_ARMC },
        uprops: { [DISPLACED]: { intrinsic: 0, extrinsic: 0, blocked: 0 } },
    };
    game.invent = [];
    game.viz_array = [];
}

function seeingSpider() {
    return {
        m_id: 612, mx: 26, my: 6, mux: 0, muy: 0,
        mtame: 0, mcansee: 1, mpeaceful: 0,
        data: { mndx: -1, mflags1: 0 }, // neither xorn nor displacer beast
    };
}

describe('Displaced reads stored H||E bits (youprop.h:202-204)', () => {
    let saved;
    beforeEach(() => {
        saved = {
            u: game.u, invent: game.invent, viz: game.viz_array,
            seed: game.currentSeed,
        };
    });
    afterEach(() => {
        game.u = saved.u;
        game.invent = saved.invent;
        game.viz_array = saved.viz;
    });

    it('post-gamestate cloak with zeroed extrinsic bit is NOT displaced', () => {
        setupPostGamestate();
        assert.equal(Displaced(), false);
    });

    it('worn cloak with conferred extrinsic bit IS displaced', () => {
        setupPostGamestate();
        game.u.uprops[DISPLACED].extrinsic = W_ARMC; // C setworn confer
        assert.equal(Displaced(), true);
    });

    it('timed intrinsic with no cloak IS displaced', () => {
        setupPostGamestate();
        game.u.uarmc = null;
        game.u.HDisplaced = 1; // C HDisplaced (timed, from corpse)
        assert.equal(Displaced(), true);
    });

    it('no cloak and no bits is NOT displaced', () => {
        setupPostGamestate();
        game.u.uarmc = null;
        assert.equal(Displaced(), false);
    });

    it('set_apparxy snaps to hero with zero draws when desynced', () => {
        setupPostGamestate();
        const mtmp = seeingSpider();
        const before = getRngLog().length;
        set_apparxy(mtmp); // C displ == 0 arm, no gotu draw
        assert.equal(mtmp.mux, 34);
        assert.equal(mtmp.muy, 11);
        assert.equal(getRngLog().length, before);
    });
});
