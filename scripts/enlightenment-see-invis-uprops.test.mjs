import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: insight.c attributes_enlightenment `:1571–1573` — `if
// (See_invisible)`, youprop.h:152 See_invisible ≡ uprops[SEE_INVIS] H || E.
// A worn ring of see invisible sets only the uprops extrinsic; JS gated on
// the u.HSee_invisible/u.ESee_invisible flats and dropped «You saw
// invisible because of your ring of see invisible.»
// (scen-sweep-Wizard-51150073 s1178, D-4091). Single prefix per file
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
  return handle.getScreens?.() || [];
}

describe("enlightenment See_invisible reads the uprops store (insight.c)", () => {
  it("51150073 step 1178 lists see invisible from the ring", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Wizard-51150073", 1179);
    const rows = String(screens[1178]).split("\n");
    assert.ok(rows.some((r) => r.includes("You saw invisible because of your ring of see invisible.")), JSON.stringify(rows.slice(13, 18)));
  });
});
