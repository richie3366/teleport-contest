import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { drinkfountain } from '../js/fountain.js';
import { reset_display_messages } from '../js/display.js';
import { resetInputState, pushKeys } from '../js/input.js';
import { initRng } from '../js/rng.js';
import { FOUNTAIN, KILLED_BY_AN } from '../js/const.js';

// C ref: fountain.c drinkfountain case 21 (Poisonous) `:301–304` — the
// Poison_resistance arm prints the fruitname(FALSE) farm pline, then
// losehp(rnd(4), "unrefrigerated sip of juice", KILLED_BY_AN)
// (C hack.h:602 `#define KILLED_BY_AN 0`). js/fountain.js:827 read the
// name without importing it: ReferenceError voided
// scen-sweep-Rogue-578205 + scen-worldtour-Healer-578136 at step 0
// (the scorer misattributes throw-voids to the first C draw,
// randomize_gem_colors o_init.c:89). D-3833.
describe('drinkfountain fate-21 Poison_res arm (fountain.c:301-304)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(11); // rnd(30)=21, rnd(4)=1, rn2(3)=1 (dryup early-return)
        game.u = { ux: 5, uy: 5, uhp: 100, uhpmax: 100, Poison_resistance: true };
        game.iflags = { window_inited: true };
        const cell = { typ: FOUNTAIN, blessedftn: 0, looted: 0, flags: 0 };
        game.level = { at: (x, y) => (x === 5 && y === 5 ? cell : undefined) };
    });

    it('KILLED_BY_AN value matches C (hack.h:602)', () => {
        assert.equal(KILLED_BY_AN, 0);
    });

    it('resolves the killer arg: no throw, rnd(4) damage applied', async () => {
        pushKeys('  '); // absorb --More-- acks (harness friction, not C behavior)
        await drinkfountain(); // pre-fix: ReferenceError: KILLED_BY_AN is not defined
        assert.equal(game.u.uhp, 99);
    });
});
