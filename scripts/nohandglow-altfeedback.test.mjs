import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: uhitm.c nohandglow `:6324` — altfeedback = (Blind || Invisible).
// JS's Invisible_you clone read only the u.Invis/HInvis/EInvis flats, so
// the worn-extrinsic invisible hero got «Your hands no longer glow so
// brightly red.» instead of «The tingling in your hands lessens.»
// (scen-sweep-Rogue-620093 s1115, D-4087). Single prefix per
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

describe("nohandglow altfeedback reads the live Invisible macro (uhitm.c)", () => {
  it("620093 step 1115 the tingling lessens", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Rogue-620093", 1116);
    const top = String(screens[1115]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("The tingling in your hands"), JSON.stringify(top.slice(0, 80)));
  });
});
