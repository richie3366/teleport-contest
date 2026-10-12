import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

// C ref: mhitu.c gulpmu `:1376` vision_recalc(2) — the main update loop
// (vision.c:741-836) runs unconditionally at the swallow: TEMP-C measured
// it newsyming (71,4) (old IN_SIGHT, Wizard present, mon_warning) through
// display_warning -> show_mon_or_warn -> unmap_object, rewriting the
// search-mapped 'I' (glyph 1532) to S_stone (glyph 3929) BEFORE uswallow=1.
// JS gated the extracted loop (vision_off_newsym_gbuf) on Hallu at the
// engulf site, so non-Hallu swallows kept the 'I' and the post-release
// redraw at step 241 painted it where C paints blank (D-3863).
// Single prefix per file (multi-prefix runSegment leaks module state).
describe("gulpmu swallow runs the vision shutdown loop (mhitu.c:1376)", () => {
  it("scen-sweep-Monk-578214 step 241: (71,4) blank, memory stone", { timeout: 240000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Monk-578214.recipe.json", import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    const g = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 241), storage,
    });
    const screens = g.getScreens?.() || [];
    assert.ok(screens.length > 241, `expected 242+ screens, got ${screens.length}`);
    // C screen 241 row 5: blank where JS painted the stale 'I' (rowDiff col 70).
    const grid = decodeScreen(screens[241]);
    assert.equal(grid[5][70].ch, " ",
      `step 241 screen(70,5): want C blank, got ${JSON.stringify(grid[5][70].ch)}`);
    // Mechanism: hero memory at map (71,4) is stone, not the 'I'.
    const { game } = await import("../js/gstate.js");
    const mem = game.level.locations[71][4].remembered_glyph;
    assert.ok(!mem || mem.ch === " ",
      `step 241 map(71,4) memory: want blank stone, got ${JSON.stringify(mem && mem.ch)}`);
  });
});
