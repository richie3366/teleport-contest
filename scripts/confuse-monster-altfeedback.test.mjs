import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: read.c seffect_confuse_monster `:1405` — altfeedback = (Blind ||
// Invisible), the youprop.h macros (Invisible ≡ Invis && !See_invisible).
// JS read the phantom u.Invisible flat (never written), so an invisible
// hero got «Your hands begin to glow red.» instead of «Your hands
// tingle.» (scen-sweep-Caveman-50055067 s1272, D-4087). Single prefix per
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

describe("seffect_confuse_monster altfeedback reads live Blind/Invisible (read.c)", () => {
  it("50055067 step 1272 hands tingle", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Caveman-50055067", 1273);
    const top = String(screens[1272]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("Your hands tingle."), JSON.stringify(top.slice(0, 80)));
  });
});
