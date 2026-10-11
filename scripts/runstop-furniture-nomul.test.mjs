import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c domove_core `:2936–2941` — a run stopping on door /
// obstructed / furniture at dest calls nomul(0), which sets disp.botl
// (multi>=0). JS called end_running (no botl), so the post-pickup
// encumbrance never painted: scen-chain-Archeologist-578126 step 621
// showed no Stressed where C shows Stressed (live near_capacity()=2
// both sides; JS status stale). Pins the machine-recorded C screen.
// Chain replay needs shared storage across segments (bones carry over;
// isolated seg5 diverges) — one prefix per file (multi-prefix
// runSegment in one process leaks module state, D-3762).
async function runChainPrefix(recipeName, segIdx, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  let nhGame = null;
  for (let i = 0; i <= segIdx; i++) {
    const seg = raw.segments[i];
    const mv = (i < segIdx) ? seg.moves : seg.moves.slice(0, nmoves);
    nhGame = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: mv, storage,
    });
  }
  return nhGame;
}

describe("domove run-stop on furniture calls nomul (botl), not end_running", () => {
  it("chain-Archeologist seg5 step 621 paints Stressed", { timeout: 300000 }, async () => {
    const nhGame = await runChainPrefix("scen-chain-Archeologist-578126", 5, 159);
    const screens = nhGame.getScreens?.() || [];
    assert.equal(screens.length, 160, "prefix reaches local step 159");
    const rows = screens[screens.length - 1].split("\n");
    assert.ok(
      rows[0].includes("You have trouble lifting f - an elf corpse."),
      `reached the pickup turn (top: ${rows[0].slice(0, 80)})`);
    assert.ok(
      rows[23].includes("Stressed"),
      `status paints live encumbrance (r23: ${rows[23]})`);
  });
});
