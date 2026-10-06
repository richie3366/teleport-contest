import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { MON_OFFMAP, MON_BUBBLEMOVE } from "../js/const.js";
import { initRng } from "../js/rng.js";
import { rloc_to } from "../js/teleport.js";
import { m_at } from "../js/mon.js";

// C ref: teleport.c rloc_to_core `:1684` place_monster grids the mon; JS
// occupancy is mx/my + !MON_OFFMAP (D-3577: a bubble-cons elemental kept
// the flagging-remove bit after deposit, stayed m_at-invisible, and the
// mnearto othermon recursion gate wrongly returned TRUE where C's
// grid-occupant check returns FALSE).
describe("rloc_to clears MON_OFFMAP (teleport.c:1684)", () => {
    before(() => { initRng(12345); });
    it("a flagging-removed mon becomes m_at-visible on placement", async () => {
        const save = { fmon: game.fmon, u: game.u, level: game.level };
        try {
            game.fmon = [];
            game.u = { ux: 5, uy: 5 };
            game.level = { at: () => ({ typ: 25, lit: true, seenv: 0 }) };
            const mon = { m_id: 4242, mx: 0, my: 0, mhp: 10,
                mstate: MON_OFFMAP | MON_BUBBLEMOVE,
                data: { mlet: "S_ELEMENTAL" },
                isshk: false, wormno: 0, mtrack: null,
                minvent: null, mstrategy: 0 };
            game.fmon.push(mon);
            assert.equal(m_at(10, 10), null);
            await rloc_to(mon, 10, 10, { defer_shk_angry: true });
            assert.equal(mon.mx, 10);
            assert.equal(mon.my, 10);
            assert.equal(mon.mstate & MON_OFFMAP, 0);
            assert.equal(mon.mstate & MON_BUBBLEMOVE, MON_BUBBLEMOVE);
            assert.equal(m_at(10, 10), mon);
        } finally {
            game.fmon = save.fmon;
            game.u = save.u;
            game.level = save.level;
        }
    });
});
