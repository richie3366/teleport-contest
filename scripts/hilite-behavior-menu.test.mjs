import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: botl.c status_hilite_menu_choose_behavior `:3707–3808` — PICK_ONE
// menu of one field's hilite behaviors with C's accelerators, reached via
// status_hilite_menu_add `:3890–4302` when the field has no rules yet
// (`status_hilite_menu_fld `:4369–4376`). scen-options-Tourist-94111 step
// 32: C shows «Select power field hilite behavior:» with a/c/n/p rows;
// JS used to fall back to the «Status hilites:» top menu (menu_add was a
// named omission), forfeiting the rest of the session.
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-options-Tourist-94111.recipe.json", import.meta.url),
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

describe("hilite behavior menu descends via menu_add (botl.c choose_behavior)", () => {
    it("step-32 shows C's power behavior menu with C accelerators", { timeout: 120000 }, async () => {
        const seg = RECIPE.segments[0];
        const g = await runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 32, `expected >32 screens, got ${screens.length}`);
        const rows = String(screens[32]).split("\n");
        assert.equal(rows[0], "\x1b[41C\x1b[7mSelect power field hilite behavior:\x1b[0m");
        assert.equal(rows[2], "\x1b[41Ca - Always highlight power");
        assert.equal(rows[3], "\x1b[41Cc - power value changes");
        assert.equal(rows[4], "\x1b[41Cn - Number threshold");
        assert.equal(rows[5], "\x1b[41Cp - Percentage threshold");
        assert.equal(rows[6], "\x1b[41C(end)");
    });
});
