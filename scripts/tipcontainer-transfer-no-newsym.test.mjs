import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: pickup.c tipcontainer `:3780–3805` — the container-to-container
// transfer arm moves no floor glyph and calls no newsym; C repaints the
// spill arm per item via dropy→dropz and the highdrop arm via hitfloor.
// D-2612 added a JS-only trailing newsym(ox, oy) ("Display sync, not in
// C"). Under hallucination that repaint burns one display-RNG draw C
// never makes, shifting every later hallu re-roll: scen-sweep-
// Archeologist-585417 step 451 shows C `)` (draw 45 → HALBERD) where JS
// showed `=` (draw 178 → RIN_POLYMORPH), and all later hallu repaints
// diverged the same way (502 screens). This test pins the recorded C
// paint at the first divergent cell. Pre-fix: `=` at row 19 col 19.
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

describe("tipcontainer transfer arm paints no floor glyph (pickup.c:3780-3805)", () => {
    it("sweep-Archeologist-585417 step 451 keeps C's `)` (no spurious newsym burn)", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Archeologist-585417.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 451),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        assert.ok(screens.length > 451, `only ${screens.length} screens`);
        const grid = decodeScreen(screens[451]);
        const cell = grid[19][19];
        assert.equal(cell.ch, ")",
            "step-451 map cell shows C's hallu `)` (not the shifted `=`)");
        assert.equal(cell.color ?? cell.fg, 6,
            "step-451 map cell color is C's cyan (HALBERD draw, stream aligned)");
    });
});
