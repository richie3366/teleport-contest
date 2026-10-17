import { describe, it } from "node:test";
import assert from "node:assert/strict";

// C ref: pickup.c do_loot_cont `:2150–2160` Bag-of-Tricks arm — losehp runs
// maybe_wail inline (hack.c:4289–4291); JS defers via _needs_maybe_wail and
// every losehp caller must drain it (D-3105; dothrow/eat/dig/pray/… shape).
// do_loot_cont never drained: the flag set by the carnivorous-bag bite
// survived, so C's «Elf is about to die.» never printed
// (scen-sweep-Priest-50456019 s500: C bite+wail vs JS bite only).

const gstate = await import("../js/gstate.js");
const { initRng } = await import("../js/rng.js");
const { do_loot_cont } = await import("../js/pickup.js");
const { ECMD_TIME } = await import("../js/const.js");
const { PM_ELF } = await import("../js/generated/monsters_data.js");
const { objectNames } = await import("../js/generated/objects_data.js");

const BAG_OF_TRICKS = objectNames.indexOf("BAG_OF_TRICKS");
assert.ok(BAG_OF_TRICKS > 0, "BAG_OF_TRICKS in objectNames");

function elfWorld() {
    gstate.resetGame();
    initRng(50456019);
    const g = gstate.game;
    // Post-bite HP lands in [1,10] for any rnd(10): survives, and
    // uhp*10 < uhpmax always, so C's losehp always calls maybe_wail.
    g.u = { uhp: 11, uhpmax: 120, ux: 5, uy: 5 };
    g.urace = { mnum: PM_ELF };
    g.moves = 1000;
    g.wailmsg = 0;
    return g;
}

describe("do_loot_cont drains the deferred wail (pickup.c:2156 losehp)", () => {
    it("bag bite at low HP: ECMD_TIME + abort, wail fired, flag drained", async () => {
        const g = elfWorld();
        const bag = { otyp: BAG_OF_TRICKS, olocked: 0, quan: 1, ox: 5, oy: 5 };
        const r = await do_loot_cont(bag, 1, 1);
        assert.equal(r, ECMD_TIME, "bag arm returns ECMD_TIME (C :2159)");
        assert.equal(g.abort_looting, true, "C :2158 abort set");
        assert.ok(!g._needs_maybe_wail, "wail flag drained (was: leaked)");
        assert.equal(g.wailmsg, 1000, "maybe_wail ran (wailmsg advanced)");
        assert.ok((g.u.uhp | 0) >= 1, "survived the bite");
    });

    it("control: full-HP bite sets no wail flag", async () => {
        const g = elfWorld();
        g.u.uhp = 120;
        g.u.uhpmax = 120;
        const bag = { otyp: BAG_OF_TRICKS, olocked: 0, quan: 1, ox: 5, oy: 5 };
        await do_loot_cont(bag, 1, 1);
        assert.ok(!g._needs_maybe_wail, "no flag when C would not wail");
        assert.equal(g.wailmsg, 0, "maybe_wail not run");
    });
});
