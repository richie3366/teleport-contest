import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { abuse_dog } from '../js/dog.js';
import { AGGRAVATE_MONSTER, W_RINGL } from '../js/const.js';

// C ref: dog.c abuse_dog `:1366–1370` — `if (Aggravate_monster ||
// Conflict) mtame /= 2; else mtame--;`, where youprop.h:214
// Aggravate_monster ≡ H||E over uprops (worn.c:124–125 confers the
// extrinsic bit on wear). JS splits the store (flats + uprops) and the
// E flat is never mirrored, so the gate must read the union (D-3775
// Poison house shape). scen-sweep-Ranger-95308 step 318: hero wears
// RIN_AGGRAVATE_MONSTER (uprops[43].extrinsic = W_RINGL, flats 0);
// C halved Sirius 12→6 (rn2(6)), JS decremented 12→11 (rn2(11)).
// mx=0 (mid-leaving) skips the unchanged sound/newsym tail; the gate
// and abuse++ run identically, and no RNG fires, so no display or
// monster-data stubs are needed.
function setup(extrinsic) {
    initRng(7);
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = {
        HAggravate_monster: 0, EAggravate_monster: 0,
        HConflict: 0, EConflict: 0,
        uprops: extrinsic
            ? { [AGGRAVATE_MONSTER]: { intrinsic: 0, extrinsic, blocked: 0 } }
            : {},
    };
    return {
        mtame: 12, mx: 0, my: 0, isminion: 0, mleashed: 0,
        edog: { abuse: 0 },
    };
}

describe('abuse_dog Aggravate_monster halve gate reads uprops extrinsic', () => {
    it('worn aggravate ring (uprops extrinsic, flats clear) halves 12→6', async () => {
        const dog = setup(W_RINGL);
        await abuse_dog(dog);
        assert.equal(dog.mtame, 6);
        assert.equal(dog.edog.abuse, 1);
    });

    it('no aggravate source (control) decrements 12→11', async () => {
        const dog = setup(0);
        await abuse_dog(dog);
        assert.equal(dog.mtame, 11);
        assert.equal(dog.edog.abuse, 1);
    });
});
