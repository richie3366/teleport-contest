import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: fountain.c drinkfountain case 29 (Scare) `:368–378` — every live
// monster gets the real monflee(mtmp, 0, FALSE, FALSE), whose vrock arm
// (monmove.c:522) draws `mspec_used = 75 + rn2(25)` and makes a gas
// cloud. JS inlined a subset (mflee/mfleetim/track only), so the draw
// went missing and dryup's rn2(3) came early (scen-sweep-Tourist-50150017
// step 320, D-4060). Single prefix per file (multi-prefix runSegment
// leaks module state).
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
  return { handle, game };
}

describe("drinkfountain Scare arm calls the live monflee (fountain.c:368-378)", () => {
  it("50150017 step 320 draws the vrock rn2(25) before dryup", { timeout: 180000 }, async () => {
    const { handle } = await runPrefix("scen-sweep-Tourist-50150017", 321);
    const step = handle.getRngSlices?.()?.[320] || [];
    const s = step.map(String);
    const iFlee = s.findIndex((e) => /^rn2\(25\)/.test(e));
    const iDry = s.findIndex((e) => /^rn2\(3\)/.test(e));
    assert.ok(iFlee >= 0, `no rn2(25) in step 320: ${JSON.stringify(s.slice(0, 12))}`);
    assert.ok(iDry < 0 || iFlee < iDry, "monflee's rn2(25) precedes dryup's rn2(3)");
  });
});
