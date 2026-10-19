import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: detect.c reveal_terrain_getglyph `:2208` glyph = glyph_at(x, y):
// display.c newsym `:993–998` overlays a region only on ACCESSIBLE (or
// pool/lava) spots, but the `_map_location(x, y, 1)` fallback ends with
// `if (show && !Blind && visible_region_at) show_region()` `:470–471`
// whatever the terrain, so a poison cloud over a tree is the displayed
// glyph. JS's terrain view only modelled the ACCESSIBLE overlay and drew
// the tree (scen-sweep-Monk-49950093 s1279, D-4094). Single prefix per
// file (multi-prefix runSegment leaks module state).
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
  return handle.getScreens?.() || [];
}

describe("reveal_terrain keeps a region shown via _map_location (detect.c/display.c)", () => {
  it("49950093 step 1279 shows the poison cloud over the tree", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Monk-49950093", 1280);
    const row = String(screens[1279]).split("\n")[11];
    assert.ok(row.includes("\u001b[92m#"), JSON.stringify(row));
  });
});
