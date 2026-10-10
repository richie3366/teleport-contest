import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: explode.c explode `:628-631` + `:641-644` — a poly'd hero whose
// form HP hits 0 reverts via rehumanize() instead of dying; C you.h:554
// Upolyd is (umonnum != umonster). JS explode read a never-written
// `u.Upolyd` flat (always falsy), so blast damage landed on uhp and the
// form never reverted: scen-sweep-Wizard-95347 step 824 («You are caught
// in the freezing sphere's explosion!») missed the rehumanize message —
// and its --More-- — plus the post-revert exercise(A_STR) rn2(2).

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

describe("explode: poly hero reverts on fatal blast (explode.c)", () => {
    it("sweep-Wizard step 824 keeps --More-- and rehumanizes the dwarf", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Wizard-95347.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 824),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.equal(screens.length, 825);
        const grid = decodeScreen(screens[824] || "");
        const row = (r) => grid[r].map(renderCell).join("");
        // The rehumanize message is still pending behind this prompt.
        assert.equal(row(0).trimEnd(), "You are caught in the freezing sphere's explosion!--More--");
        // Dwarf form (mh 7) took dam 10: reverted, human HP untouched.
        const u = gstate.game.u;
        assert.equal(u.umonnum, u.umonster);
        assert.equal(u.uhp, 59);
        assert.match(row(23), /HP:59\(98\)/);
    });
});
