import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: insight.c status_enlightenment `:1067–1068` — `if (wizard &&
// (HBlinded == BlindedTimeout && !Blindfolded))` appends « (%ld)», and
// youprop.h:96 Blindfolded ≡ EBlinded (lenses never set it). JS tested
// `!u.ublindf`, so worn lenses dropped the timeout from final disclosure's
// «You were temporarily blind (44).» (scen-sweep-Healer-50950065 s1295,
// D-4088). Single prefix per file (multi-prefix runSegment leaks module
// state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes-reserve/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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

describe("enlightenment blind timeout ignores lenses (insight.c)", () => {
  it("50950065 step 1295 shows the blindness timeout", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Healer-50950065", 1296);
    const rows = String(screens[1295]).split("\n");
    assert.ok(rows.some((r) => r.includes("You were temporarily blind (44).")), JSON.stringify(rows[4]));
  });
});
