import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c dotravel_target — sets travel/run/multi and calls domove()
// with NO distance gate; TEST_TRAV paths through closed doors (travel sets
// context.run, which skips autoopen, so arrival bumps print "That door is
// closed."). A Chebyshev-worsening first step toward a door-route detour is
// C's own path and must step (D-3563); the JS-only after<=before gate
// rested instead, forking scen-town-Tourist-94242 step 72 (C hero (29,5)
// vs JS (30,6), C distfleeck vs JS choose_monster_spell).
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-town-Tourist-94242.recipe.json", import.meta.url),
));

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

async function boot(nchars) {
    const seg = RECIPE.segments[0];
    await runSegment({
        seed: seg.seed,
        datetime: seg.datetime,
        timezone: seg.timezone,
        nethackrc: seg.nethackrc,
        moves: seg.moves.slice(0, nchars),
        storage: freshStorage(),
    });
    return { ux: game.u.ux, uy: game.u.uy };
}

describe("dotravel detour first step (cmd.c dotravel_target, D-3563)", () => {
    it("pre-confirm (71 chars): hero at (30,6) like C", { timeout: 60000 }, async () => {
        const s = await boot(71);
        assert.equal(s.ux, 30);
        assert.equal(s.uy, 6);
    });

    it("',' confirms travel: hero steps NW to (29,5) like C, not rest", { timeout: 60000 }, async () => {
        const s = await boot(72);
        assert.equal(s.ux, 29);
        assert.equal(s.uy, 5);
    });
});
