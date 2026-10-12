import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: zap.c zappable `:2514–2522` — the spe==0 wrest arm prints
// You("wrest one last charge from the worn-out wand.") before consuming the
// charge, ahead of dozap's getdir `:2653` (D-3901). JS dropped the message
// ("deferred until needed"), so scen-sweep-Barbarian-585441 step 352 showed
// the direction prompt where C shows wrest+More. Single prefix per file
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
  return { screens: handle.getScreens?.() || [] };
}

describe("zappable wrest arm prints before the direction prompt (zap.c:2514-2522)", () => {
  it("585441 step 352 topline is the C-recorded wrest message", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Barbarian-585441", 353);
    assert.ok(screens.length > 352, `expected 353+ screens, got ${screens.length}`);
    const top352 = String(screens[352]).split("\n")[0];
    assert.equal(top352, "You wrest one last charge from the worn-out wand.--More--",
      `step 352 topline: ${JSON.stringify(top352.slice(0, 80))}`);
  });
});
