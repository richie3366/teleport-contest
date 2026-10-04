// doengrave failure return takes no turn (C engrave.c:964-965 ECMD_FAIL +
// rhack ECMD_TIME bitmask). D-3405 regression: porting the C-exact
// ECMD_FAIL return exposed the `E` dispatcher's truthiness check, which
// consumed a turn on "You can't write on the fountain!" (scen-special-
// Barbarian-94037 step 102 rng). The dispatcher now masks ECMD_TIME like
// the `#` path; this pins the return contract it consumes.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { doengrave } from '../js/engrave.js';
import { ECMD_FAIL, ECMD_TIME, FOUNTAIN, ROOM } from '../js/const.js';
import { reset_display_messages } from '../js/display.js';

function setupOnFountain() {
    resetGame();
    game.u = { ux: 5, uy: 5 };
    game.level = {
        at: (x, y) => ({ typ: (x === 5 && y === 5) ? FOUNTAIN : ROOM }),
    };
}

describe('doengrave failure return (engrave.c:964-965)', () => {
    beforeEach(() => {
        setupOnFountain();
        reset_display_messages();
    });

    it('fountain engrave returns ECMD_FAIL with no TIME bit', { timeout: 5000 }, async () => {
        const ret = await doengrave();
        assert.equal(ret, ECMD_FAIL);
        assert.equal(ret & ECMD_TIME, 0);
    });
});
