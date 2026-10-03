// `mhitm.c` slept_monst canonical export (C mhitm.c:1249–1257) + dobuzz
// :4946 wiring. The export replaces the same-file slept_slee_mm clone
// (sticks was a named omission, ustuck cleared by hand); music.js and
// potion.js clones remain, queued next.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { slept_monst } from '../js/mhitm.js';
import { initRng } from '../js/rng.js';

const AT_HUGS = 7; // C monattk.h (mondata.js:1160 local)

function grabber(extra = {}) {
    return {
        mx: 6, my: 5, mhp: 4, mhpmax: 4,
        msleeping: 1, mcanmove: 0,
        data: { name: 'trapper' },
        ...extra,
    };
}

function setup(ustuck, youmonstData = { name: 'human' }, uswallow = 0) {
    game.u = { ux: 5, uy: 5, ustuck, uswallow };
    game.youmonst = { data: youmonstData };
}

describe('slept_monst (mhitm.c:1249-1257)', () => {
    beforeEach(() => {
        resetGame();
        initRng(4946);
    });

    it('helpless grabber releases the hero', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, null);
    });

    it('non-stuck monster is a no-op', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(null);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, null);
    });

    it('swallowed hero keeps hold (no release)', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon, { name: 'human' }, 1);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });

    it('sticky youmonst keeps hold', { timeout: 5000 }, async () => {
        const mon = grabber();
        setup(mon, {
            name: 'hugger',
            mattk: [{ aatyp: AT_HUGS, adtyp: 0, damn: 0, damd: 0 }],
        });
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });

    it('unhelpless grabber keeps hold', { timeout: 5000 }, async () => {
        const mon = grabber({ msleeping: 0, mcanmove: 1 });
        setup(mon);
        await slept_monst(mon);
        assert.equal(game.u.ustuck, mon);
    });
});
