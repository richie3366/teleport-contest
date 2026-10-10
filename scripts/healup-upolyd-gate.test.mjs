import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { healup } from "../js/potion.js";
import { game } from "../js/gstate.js";

// C ref: potion.c healup `:1428–1458` — `if (Upolyd) { u.mh += nhp; ... }
// else { u.uhp += nhp; ... }` (you.h:554 Upolyd ≡ umonnum != umonster).
// JS read the never-written `u.Upolyd` flat (zero writes in js/), so a
// poly'd hero always took the human arm: quaffed booze's healup(1) at
// scen-sweep-Healer-95346 step 448 healed frozen uhp 18→19 instead of
// capped mh 38→38, surfacing at the step-474 revert as HP 19(82) vs
// C's 18(82) (do_statusline2 row-23 diff). Pins: poly'd below max, the
// probe's poly'd-at-full shape, and the human control.
describe("healup Upolyd gate (potion.c:1431-1442)", () => {
    let savedU;
    beforeEach(() => { savedU = game.u; });
    afterEach(() => { game.u = savedU; });

    it("poly'd hero below max heals mh, uhp frozen", async () => {
        game.u = { umonnum: 204, umonster: 334, mh: 37, mhmax: 38, uhp: 18, uhpmax: 82 };
        await healup(1, 0, false, false);
        assert.equal(game.u.mh, 38);
        assert.equal(game.u.uhp, 18);
    });

    it("poly'd hero at full mh (95346 step-448 shape) changes nothing", async () => {
        game.u = { umonnum: 204, umonster: 334, mh: 38, mhmax: 38, uhp: 18, uhpmax: 82 };
        await healup(1, 0, false, false);
        assert.equal(game.u.mh, 38);
        assert.equal(game.u.mhmax, 38);
        assert.equal(game.u.uhp, 18);
    });

    it("human hero heals uhp (control)", async () => {
        game.u = { umonnum: 334, umonster: 334, mh: 0, mhmax: 0, uhp: 18, uhpmax: 82 };
        await healup(1, 0, false, false);
        assert.equal(game.u.uhp, 19);
        assert.equal(game.u.mh, 0);
    });
});
