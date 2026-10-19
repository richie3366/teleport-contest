import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: pager.c add_cmap_descr `:1162–1188` sets EHalluc_resistance = 1
// around waterbody_name, so youprop.h Hallucination reads false and a
// hallucinated farlook of a moat says «moat». JS waterbody_name read
// do_name.js's sticky-first Hallucination (u.Hallucination wins over the
// resistance), so it took the `deep <hliquid>` arm: «A deep water.»
// (scen-sweep-Samurai-49956004 step 1290, D-4068). Single prefix per file
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

describe("add_cmap_descr's EHalluc_resistance reaches waterbody_name (pager.c:1185)", () => {
  it("49956004 step 1290 hallucinated farlook names the moat", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Samurai-49956004", 1291);
    const top = String(screens[1290]).split("\n")[0];
    assert.ok(top.startsWith("A moat."), JSON.stringify(top.slice(0, 90)));
  });
});
