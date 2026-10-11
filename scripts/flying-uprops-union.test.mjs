import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { Flying } from '../js/mhitu.js';
import { FLYING, W_AMUL } from '../js/const.js';

// C ref: youprop.h Flying `:253–256` — (HFlying||EFlying||steed is_flyer)
// && !BFlying, all ≡ uprops[FLYING]. confer_oc_oprop writes worn
// AMULET_OF_FLYING extrinsic to the slot and never mirrors EFlying, so a
// flats-only reader drops flying granted by the amulet (D-1085 fixed the
// engrave clone and deferred the other H/E-only clones; this is the
// shared mhitu.js one, caught live by scen-worldtour-Wizard-95212 step
// 296: C status "…T:13 Fly" vs JS "…T:13").
describe('Flying() uprops union (youprop.h)', () => {
    beforeEach(() => {
        resetGame();
        game.u = {
            HFlying: 0, EFlying: 0, BFlying: 0, Flying: 0,
            usteed: null,
            uprops: { [FLYING]: { intrinsic: 0, extrinsic: 0, blocked: 0 } },
        };
    });

    it('amulet extrinsic in the slot flies with flats unset (95212 shape)', () => {
        game.u.uprops[FLYING].extrinsic = W_AMUL;
        assert.equal(Flying(), true);
    });

    it('slot intrinsic flies with flats unset', () => {
        game.u.uprops[FLYING].intrinsic = 5;
        assert.equal(Flying(), true);
    });

    it('either blocked source grounds (slot extrinsic + flat/slot block)', () => {
        game.u.uprops[FLYING].extrinsic = W_AMUL;
        game.u.uprops[FLYING].blocked = 1;
        assert.equal(Flying(), false);
        game.u.uprops[FLYING].blocked = 0;
        game.u.BFlying = 1; // float_vs_flight writes the flat
        assert.equal(Flying(), false);
    });

    it('flats-only and empty states keep their old answers', () => {
        assert.equal(Flying(), false);
        game.u.HFlying = 3;
        assert.equal(Flying(), true);
        game.u.HFlying = 0;
        game.u.EFlying = W_AMUL;
        assert.equal(Flying(), true);
    });
});
