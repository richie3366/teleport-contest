import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: teleport.c teleds `:527` — a single newsym(u.ux0, u.uy0) paints the
// origin cell; the destination hero is painted later by vision_recalc's
// unconditional skip-label newsym(u.ux, u.uy) (vision.c:850). JS teleds
// painted the destination hero directly as well, burning one extra
// newsym_rn2 (display-stream) draw per teleport: under Hallucination the
// arrival frame's random_monster word shifted by one (Caveman-50055067
// step 939 showed `D` where C shows `&`), and every later hallu frame
// stayed shifted. Pins the machine-recorded C expectation: `&`/green at
// the arrival --More-- (D-4035).
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games (see quest-arrival-val-firsttime).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const { decodeScreen } = await import("../frozen/screen-decode.mjs");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const screens = game.getScreens?.() || [];
  return decodeScreen(String(screens[screens.length - 1]));
}

describe("teleds paints the origin cell only (teleport.c:527)", () => {
  it("hallu arrival frame shows C's random_monster word (&, green)", { timeout: 180000 }, async () => {
    const grid = await runPrefix("scen-sweep-Caveman-50055067", 939);
    assert.equal(grid[4][34].ch, "&");
    assert.equal(grid[4][34].color, 2);
  });
});
