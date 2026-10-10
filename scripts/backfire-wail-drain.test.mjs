import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: zap.c backfire `:2605–2614` — losehp runs maybe_wail inline
// (hack.c:4289–4291); JS defers via _needs_maybe_wail and every losehp
// caller must drain it (zhitu :2322 / read.js explode_losehp shape).
// backfire never drained: the flag set at 95343 step 988 (wand blast,
// HP 6→0...5 transient, gate-closed at moves=50 so C prints nothing)
// survived to step 999's zhitu drain, printing a stale wail behind the
// More; the extra More page ate step 1000's key, shifting the run one
// turn (C «blast of tornadoes» vs JS «howling of the CwnAnnwn»).
// Pins the machine-recorded C toplines at steps 999–1000.
// Single prefix per file (multi-prefix runSegment leaks module state).
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
  return game.getScreens?.() || [];
}

describe("backfire drains the deferred wail (zap.c:2612 losehp)", () => {
  it("95343 steps 999-1000 match C, no stale CwnAnnwn wail", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Caveman-95343", 1001);
    assert.ok(screens.length > 1000, `expected 1001+ screens, got ${screens.length}`);
    const row0 = (i) => String(screens[i]).split("\n")[0];
    assert.ok(row0(999).includes("The blast of rock music hits you!"),
      `step 999 topline: ${JSON.stringify(row0(999))}`);
    assert.ok(row0(1000).includes("The blast of tornadoes hits it!"),
      `step 1000 topline: ${JSON.stringify(row0(1000))}`);
    assert.ok(!row0(999).includes("CwnAnnwn") && !row0(1000).includes("CwnAnnwn"),
      "no stale wail at steps 999-1000");
  });
});
