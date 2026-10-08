// optfn_fruit do_set returns the "Fruit is now" pline promise (cliff
// scen-options-Knight-94331 step 135).
// C options.c optfn_fruit `:1759–1761`: fruitadd, then the give_opt_msg
// pline. Full doset never clears give_opt_msg (only doset_simple `:8722`
// does), so the message paints as its own screen before the next pick's
// "Set ... to what?" prompt. JS fired it with `void pline` and returned
// OPTN_OK, so the doset loop drew the next prompt in the same step and
// the fruit screen was lost. The optfn now returns the pline promise
// chained to OPTN_OK (optfn_boulder `:1201` precedent) and the doset arm
// awaits it.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { optfn_fruit, allopt_idx } from '../js/options.js';
import { reset_display_messages } from '../js/display.js';
import { resetInputState } from '../js/input.js';
import { initRng } from '../js/rng.js';

// Private enum values (options.c `:83–88`; cond-menu.test.mjs precedent).
const REQ_DO_SET = 2, OPTN_OK = 1;

describe('optfn_fruit do_set pline promise', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(7);
        game.iflags = { window_inited: true };
        game.u = { ux: 0, uy: 0 };
    });

    it('full-doset shape: do_set returns the paint promise resolving OPTN_OK', async () => {
        // Full doset never clears give_opt_msg (C doset has no write to
        // it) — undefined reads as TRUE via the `!== false` gate.
        const r = optfn_fruit(allopt_idx('fruit'), REQ_DO_SET, false,
            'fruit:lychee', 'lychee', false);
        assert.ok(r && typeof r.then === 'function',
            'do_set returns the pline promise (optfn_boulder `:1201` precedent)');
        assert.equal(await r, OPTN_OK, 'shared return resolves OPTN_OK');
        assert.equal(game.pl_fruit, 'lychee');
        assert.match(game._pending_message ?? '', /Fruit is now "lychee"\./,
            'C `:1761` message painted');
    });

    it('doset_simple shape: give_opt_msg false stays sync with no paint', () => {
        game.give_opt_msg = false; // C doset_simple `:8722`
        const before = game._pending_message ?? '';
        const r = optfn_fruit(allopt_idx('fruit'), REQ_DO_SET, false,
            'fruit:mango', 'mango', false);
        assert.equal(r, OPTN_OK, 'suppressed path stays sync');
        assert.equal(game.pl_fruit, 'mango');
        assert.equal(game._pending_message ?? '', before, 'no paint when suppressed');
    });

    it('rc shape: opt_initial stays sync with no paint', () => {
        const before = game._pending_message ?? '';
        const r = optfn_fruit(allopt_idx('fruit'), REQ_DO_SET, false,
            'fruit:apple', 'apple', true);
        assert.equal(r, OPTN_OK);
        assert.equal(game.pl_fruit, 'apple');
        assert.equal(game._pending_message ?? '', before, 'no paint at opt_initial');
    });
});
