import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c moverock_core `:358-363` — the Blind arm tests
// `glyph_to_obj(glyph_at(sx, sy)) != BOULDER` (display.h `:902-913`, the
// integer levl.glyph), not live floor. JS read only map_object's
// remembered_glyph.boulder stamp (D-1281), which integer-only writers
// (show_map_spot `:1410-1413` oldglyph restore after ^F wiz_map, via
// remember_shown_glyph) never set — so a blind bump at a magic-mapped
// boulder printed "That feels like a boulder." where C prints "There is
// a boulder in your way." (scen-sweep-Tourist-582711 steps 538/569:
// memory glyph 3923 with no .boulder after the ^F at 535/566).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("moverock Blind arm reads the integer glyph (hack.c:358-363)", () => {
  it("582711 step 538 skips the feel message at a mapped boulder", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Tourist-582711", 538);
    assert.ok(screens.length > 538, `expected 539+ screens, got ${screens.length}`);
    const top538 = String(screens[538]).split("\n")[0]
      .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
    assert.equal(top538,
      "There is a boulder in your way.",
      `step 538 topline: ${JSON.stringify(top538.slice(0, 120))}`);
    // Mechanism: the fixed bump takes the nopick in-way arm (C `:405-412`),
    // whose feel_location repaints the cell, so C `:409-410` spends the
    // move via door_opened — the Blind arm it took before sets no such flag.
    assert.equal(game.context?.door_opened, true,
      `expected door_opened (nopick in-way arm), got ${game.context?.door_opened}`);
  });
});
