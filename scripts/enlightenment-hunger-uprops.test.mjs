import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: insight.c status_enlightenment `:1190–1193` — `if (Hunger)`,
// youprop.h:145–147 Hunger ≡ uprops[HUNGER].intrinsic || .extrinsic. A
// worn ring of hunger sets only the uprops extrinsic; JS tested the
// u.HHunger/u.EHunger flats, so disclosure dropped «You hungered rapidly
// because of your ring of hunger.» (scen-wish-Valkyrie-50152027 s153,
// D-4090). Single prefix per file (multi-prefix runSegment leaks module
// state).
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

describe("enlightenment Hunger reads the uprops store (insight.c)", () => {
  it("50152027 step 153 lists the ring of hunger", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-wish-Valkyrie-50152027", 154);
    const rows = String(screens[153]).split("\n");
    assert.ok(rows.some((r) => r.includes("You hungered rapidly because of your ring of hunger.")), JSON.stringify(rows.slice(3, 8)));
  });
});
