import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c display_minventory `:5340–5386` → pickup.c query_objlist
// `:1024–1216` — the PICK_NONE minvent menu ranks by sortloot
// (INVORDER_SORT) and appends the engulfed-hero row (INCLUDE_HERO).
// scen-worldtour-Ranger-585420 step 308 (blind, swallowed by a fire
// vortex, `:` look): C lists `a - 4 uncursed cram rations` then
// `b - an elf corpse` (FOOD subclass 2 < 5, sortloot_cmp) plus the
// `Engulfed Creatures / > - a gnomish ranger called wizard` hero row.
// JS listed chain order (corpse first) with no hero row. Pre-fix: row 3
// `a - an elf corpse`, row 5 `(end)`.
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

function rowText(grid, r) {
    return grid[r].map(renderCell).join("").trim();
}

describe("display_minventory PICK_NONE sorts loot + shows engulfed hero", () => {
    it("worldtour-Ranger-585420 step 308 keeps C's sorted menu + hero row", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-worldtour-Ranger-585420.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 308),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 308, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[308]);
        assert.equal(rowText(grid, 3), "a - 4 uncursed cram rations");
        assert.equal(rowText(grid, 4), "b - an elf corpse");
        assert.equal(rowText(grid, 5), "Engulfed Creatures");
        assert.equal(rowText(grid, 6), "> - a gnomish ranger called wizard");
    });
});
