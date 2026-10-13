import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: eat.c tin_details `:1435` → tin_variety(obj, TRUE) `:1503` —
// naming a random (spe==0) tin draws rn2(TTSZ-1) even on the display
// path. JS tin_variety_display substituted a constant (no draw), so the
// death-disclosure "possessions identified" inventory shifted the whole
// RNG tail while every screen still matched (D-row: tin_variety cliff,
// scen-sweep-Caveman-585509 step 487). Single prefix per file
// (multi-prefix runSegment leaks module state).
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
  return { log: handle.getRngLog?.() || [] };
}

describe("tin display path draws rn2(15) like C (eat.c:1503)", () => {
  it("585509 step 487 JS draw matches C-recorded rn2(15)=8", { timeout: 180000 }, async () => {
    const { log } = await runPrefix("scen-sweep-Caveman-585509", 488);
    assert.ok(log.length > 10013, `expected 10014+ draws, got ${log.length}`);
    assert.equal(log[10013], "rn2(15)=8",
      `step 487 draw: ${JSON.stringify(log[10013])} (C: "rn2(15)=8 @ tin_variety(eat.c:1503)")}`);
  });
});
