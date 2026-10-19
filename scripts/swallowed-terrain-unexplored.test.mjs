import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// C ref: detect.c reveal_terrain_getglyph `:2202–2210` — a swallowed
// hero's #terrain view shows levl[x][y].glyph, which for a spot never
// remembered is clear_level_structures' zerorm GLYPH_UNEXPLORED
// (mklev.c:852); getpos autodescribe there reads «unexplored area»
// (pager.c:736). JS substituted the stone glyph, so lookat took the
// S_stone !seenv arm and printed «unexplored» (scen-worldtour-
// Archeologist-50950008 s314, engulfed, #terrain b then ^J; D-4099).
// Single prefix per file (multi-prefix runSegment leaks module state).
function recipePath(name) {
  for (const d of ["recipes", "recipes-reserve", "recipes-archive"]) {
    const u = new URL(`../hidden-corpus/${d}/${name}.recipe.json`, import.meta.url);
    if (existsSync(u)) return u;
  }
  throw new Error(`no recipe ${name}`);
}
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(recipePath(recipeName), "utf8"));
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

describe("swallowed #terrain keeps unexplored memory (detect.c/mklev.c)", () => {
  it("50950008 step 314 describes 'unexplored area'", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Archeologist-50950008", 315);
    const row = String(screens[314]).split("\n")[0];
    assert.ok(row.includes("unexplored area"), JSON.stringify(row));
  });
});
