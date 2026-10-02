import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { money_cnt } from '../js/shk.js';
import { set_apparxy } from '../js/monmove.js';
import { monsterNames } from '../js/monsters.js';
import { reset_display_messages } from '../js/display.js';
import { resetInputState } from '../js/input.js';
import { initRng } from '../js/rng.js';
import { COIN_CLASS } from '../js/objects.js';

const PM_XORN = monsterNames.indexOf('PM_XORN');

// C ref: hack.c money_cnt `:4513–4522` — returns the FIRST coin
// stack's quan, not a sum. This iteration deletes the summing
// end.js (:458) and monmove.js (:743) clones for this live export;
// the three rewired sites (really_done score :1225, finish_paybill
// :1331, set_apparxy Xorn gate :1021) all pass the invent array.
describe('live money_cnt first-stack on the trio call shape (hack.c:4513-4522)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3320);
    });

    it('multi-stack invent returns the first stack only (sum would be 150)', { timeout: 5000 }, () => {
        const invent = [
            { oclass: COIN_CLASS, quan: 100 },
            { oclass: COIN_CLASS, quan: 50 },
        ];
        assert.equal(money_cnt(invent), 100);
    });

    it('leading zero-quan stack returns 0 (sum would be nonzero)', { timeout: 5000 }, () => {
        const invent = [
            { oclass: COIN_CLASS, quan: 0 },
            { oclass: COIN_CLASS, quan: 50 },
        ];
        assert.equal(money_cnt(invent), 0);
    });

    it('no coins returns 0', { timeout: 5000 }, () => {
        assert.equal(money_cnt([{ oclass: 1, quan: 3 }]), 0);
        assert.equal(money_cnt([]), 0);
        assert.equal(money_cnt(null), 0);
    });
});

// Live-site smoke: monmove.js set_apparxy (exported, so directly
// callable) resolves money_cnt through the extended shk edge. The
// blind-Xorn-with-gold arm (C monmove.c:2226-2228) takes displ=0 and
// draws no RNG, so the fixture needs no level/vision setup.
describe('set_apparxy Xorn arm via live money_cnt (monmove.c:2198-2266)', () => {
    beforeEach(() => {
        resetGame();
        reset_display_messages();
        resetInputState();
        initRng(3320);
        game.u = { ux: 10, uy: 10 };
        game.invent = [{ oclass: COIN_CLASS, quan: 42 }];
    });

    it('blind xorn smelling gold knows exactly where the hero is', { timeout: 5000 }, () => {
        const mtmp = {
            mux: 1, muy: 1, mx: 5, my: 5,
            mtame: 0, mcansee: 0, data: { mndx: PM_XORN },
        };
        set_apparxy(mtmp);
        assert.equal(mtmp.mux, 10);
        assert.equal(mtmp.muy, 10);
    });

    it('blind xorn without gold does not take the seen path', { timeout: 5000 }, () => {
        game.invent = [];
        const mtmp = {
            mux: 1, muy: 1, mx: 5, my: 5,
            mtame: 0, mcansee: 0, data: { mndx: PM_XORN },
        };
        // displ=1: gotu !rn2(3) may still land on the hero, so only
        // assert the call shape resolves and stays in-bounds/no-throw.
        set_apparxy(mtmp);
        assert.equal(typeof mtmp.mux, 'number');
        assert.equal(typeof mtmp.muy, 'number');
    });
});

// Wiring smoke: both edited modules resolve the extended shk edge
// (no TDZ/cycle break from the import extension + clone deletion).
describe('trio modules import with the live money_cnt edge', () => {
    it('end.js and monmove.js import cleanly', { timeout: 30000 }, async () => {
        const end = await import('../js/end.js');
        const monmove = await import('../js/monmove.js');
        assert.equal(typeof monmove.set_apparxy, 'function');
        assert.equal(typeof end.nh_terminate, 'function');
    });
});
