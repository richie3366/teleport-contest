import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
import { rest_regions } from '../js/region.js';

// C ref: region.c rest_regions `:876-884` — the monster count restores
// from the record (`Sfi_short(&r->n_monst)`) alongside the mid array,
// and `max_monst = n_monst`. JS restored the array but left `n_monst`
// at its literal 0, so every level revisit dropped the live prefix:
// run_regions never called inside_gas_cloud for the listed monsters
// (no fog sustain, no inside damage), and later adds clobbered slot 0.
// scen-worldtour-Samurai-95203: the (69,6) vapor (fog m733 listed since
// step 341) stopped sustaining at the first revisit, died at step 412,
// and the step-418 fog visit drew an extra cloud ttl (distfleeck cliff).
function storedReg(over = {}) {
    return {
        bounding_box: { lx: 69, ly: 6, hx: 69, hy: 6 },
        nrects: 1, rects: [{ lx: 69, ly: 6, hx: 69, hy: 6 }],
        attach_2_u: false, attach_2_m: 0,
        enter_msg: null, leave_msg: null,
        ttl: 9,
        expire_f: 0, can_enter_f: 0, enter_f: 0,
        can_leave_f: 0, leave_f: 0, inside_f: 0,
        player_flags: 0,
        n_monst: 1, monsters: [733],
        visible: false, glyph: null, arg: 0,
        ...over,
    };
}

describe('rest_regions restores the monster list (region.c:876-884)', () => {
    let saved;
    beforeEach(() => { saved = game.regions; });
    afterEach(() => { game.regions = saved; });

    it('restores n_monst with the mid array', () => {
        rest_regions([storedReg()], 0, false);
        assert.equal(game.regions.length, 1);
        const reg = game.regions[0];
        assert.equal(reg.n_monst, 1);
        assert.deepEqual(reg.monsters.slice(0, reg.n_monst), [733]);
        assert.equal(reg.max_monst, 1);
        assert.equal(reg.ttl, 9);
    });

    it('rebases ttl on elapsed moves, floored at 0 (C :860-864)', () => {
        rest_regions([storedReg({ ttl: 9 })], 6, false);
        assert.equal(game.regions[0].ttl, 3);
    });

    it('drops ttl==0 in the post-pass (C :886-888)', () => {
        rest_regions([storedReg({ ttl: 2 })], 6, false);
        assert.equal(game.regions.length, 0);
    });

    it('ghostly (bones) ignores the timestamp (C :807-811)', () => {
        rest_regions([storedReg({ ttl: 5 })], 99, true);
        assert.equal(game.regions.length, 1);
        assert.equal(game.regions[0].ttl, 5);
    });
});
