import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: do.c goto_level departure — check_special_room(TRUE) (shop
// robbery messages) runs BEFORE keepdogs(FALSE) (pets leave fmon).
// JS had them swapped, so at the first mid-turn --More-- screen the pets
// were already gone from the map: scen-sweep-Valkyrie-95323 step 772
// («You escaped the shop without paying!--More--») showed «u?» where C
// shows «uu» (tame unicorn still on fmon until keepdogs runs).
// D-3761.

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

describe("goto_level departure: shop messages before keepdogs (do.c)", () => {
    it("sweep-Valkyrie step 772 keeps the pet on the map at the first --More--", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Valkyrie-95323.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 772),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.equal(screens.length, 773);
        const grid = decodeScreen(screens[772] || "");
        const row = (r) => grid[r].map(renderCell).join("");
        assert.equal(row(0).trimEnd(), "You escaped the shop without paying!--More--");
        // Map row 13 (0-based grid row 13), screen cols 69-70: both pets
        // still drawn — the unicorn at col 70 migrates only at keepdogs.
        assert.equal(row(13).charAt(69), "u");
        assert.equal(row(13).charAt(70), "u");
    });
});
