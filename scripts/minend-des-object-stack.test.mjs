import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { objects_at } from "../js/mkobj.js";
import { objectNames } from "../js/objects.js";

// C ref: sp_lev.c create_object `:2422-2423` — every non-content des OBJECT
// placement ends with stackobj (merging with the floor pile). The minend-2
// placeObj/placeClass locals (mklev.js load_minend_2) bypassed the canonical
// create_object port and placed without stacking: same-otyp des piles (the
// (70,5)->flipped treasure amethysts, the (10,7) wine-cellar booze) stayed
// split, so a searching monster needed one extra turn per split stack and
// its m_move track-check die shifted the RNG stream (m_move cliff:
// scen-sweep-Tourist-50055019 step 592, scen-sweep-Caveman-49956036 step 505).
// Single prefix per file (multi-prefix runSegment leaks module state).
const AMETHYST = objectNames.indexOf("AMETHYST");

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
  await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return await import("../js/gstate.js");
}

describe("minend des OBJECT stacking (sp_lev.c:2422-2423)", () => {
  it("Tourist minend-2 (4,8) amethysts merge into one quan-3 stack", { timeout: 180000 }, async () => {
    await runPrefix("scen-sweep-Tourist-50055019", 400);
    const stacks = [];
    for (let o = objects_at(4, 8); o; o = o.nexthere) {
      if ((o.otyp | 0) === AMETHYST) stacks.push(o.quan | 0);
    }
    assert.equal(stacks.length, 1,
      `expected one amethyst stack at (4,8), got ${stacks.length} (${stacks.join("+")})`);
    assert.equal(stacks[0], 3, `expected quan 3, got ${stacks[0]}`);
  });
});
