import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mhitu.c getmattk lich arm + youprop.h Cold_resistance `:30-32`.
// The Ranger wears a ring of cold resistance (setworn/confer_oc_oprop sets
// uprops[COLD_RES].extrinsic but never mirrors the ECold_resistance flat),
// so mhitm.js's flat-only Cold_resistance() read false and the lich touch
// stayed (1,10): JS drew d(1,10)=2 where C drew the substituted d(1,6)=6
// (scen-sweep-Ranger-587207 step 822). The reader now OR-reads the slot
// (sit.js shape). Pins C's machine-recorded step 822-823 draws.
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
  return game;
}

describe("getmattk lich cold->PHYS substitution (worn ring cold res)", () => {
  it("587207 steps 822-823 match C draws, d(1,6)=6", { timeout: 180000 }, async () => {
    const game = await runPrefix("scen-sweep-Ranger-587207", 825);
    const slices = game.getRngSlices?.() || [];
    assert.ok(slices.length > 823, `expected 824+ slices, got ${slices.length}`);
    assert.deepEqual(slices[822], [
      "rn2(40)=18", "rn2(5)=3", "rnd(20)=3", "d(1,6)=6",
      "rn2(3)=1", "rn2(6)=3", "rn2(12)=1", "rn2(120)=68",
    ]);
    assert.deepEqual(slices[823], ["d(7,6)=28"]);
  });
});
