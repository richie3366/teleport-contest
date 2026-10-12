import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: attrib.c poisoned `:378` (i==0 severe-reaction arm) — losehp runs
// maybe_wail inline (hack.c:4289-4291); JS defers via _needs_maybe_wail and
// every losehp caller must drain it (poisoned `:391` i>5-arm idiom).
// The `:378` arm never drained: the flag set at 578219 step 1075 (poison
// loss 18, HP 25->7 of 121, gate open) dropped the CwnAnnwn wail, so JS
// paused one message late and painted Co:10 where C paints Co:11.
// Pins the machine-recorded C toplines/status at steps 1075-1077.
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
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return game.getScreens?.() || [];
}

describe("poisoned i==0 arm drains the deferred wail (attrib.c:378 losehp)", () => {
  it("578219 steps 1075-1077 match C, wail present, Co:11 at the pause", { timeout: 240000 }, async () => {
    const screens = await runPrefix("scen-sweep-Knight-578219", 1078);
    assert.ok(screens.length > 1077, `expected 1078+ screens, got ${screens.length}`);
    const row0 = (i) => String(screens[i]).split("\n")[0];
    assert.ok(row0(1075).includes("Its bite was poisoned!--More--"),
      `step 1075 topline: ${JSON.stringify(row0(1075))}`);
    assert.ok(String(screens[1075]).includes("Co:11"),
      `step 1075 paints Co:11 (C pause state, pre-drain)`);
    assert.ok(row0(1076).includes("howling of the CwnAnnwn")
      && row0(1076).includes("You feel very sick!"),
      `step 1076 topline: ${JSON.stringify(row0(1076))}`);
    assert.ok(row0(1077).includes("You feel weaker!"),
      `step 1077 topline: ${JSON.stringify(row0(1077))}`);
  });
});
