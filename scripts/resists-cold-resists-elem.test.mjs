import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: monst.h:273 resists_cold → Resists_Elem(mon, COLD_RES)
// (mondata.c:129–197) — hero uprops, wielded-artifact defends, worn
// oc_oprop / carried. The zap/mhitm/explode bit-test clones missed the
// hero arm, so a cold-resistant hero on ice wrongly drew the slippery
// ice rn2(3), took extrinsic Fumbling, and missed the first attack
// (scen-sweep-Valkyrie-585510 step 436: C "You hit the fire giant."
// vs JS "You miss the fire giant."). Single prefix per file
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
  const { game } = await import("../js/gstate.js");
  const { resists_cold } = await import("../js/zap.js");
  return { screens: handle.getScreens?.() || [], game, resists_cold };
}

describe("resists_cold follows Resists_Elem (monst.h:273)", () => {
  it("585510 step 436: cold-resistant skater exempt from ice, first attack hits", { timeout: 180000 }, async () => {
    const { screens, game, resists_cold } = await runPrefix("scen-sweep-Valkyrie-585510", 437);
    assert.ok(screens.length > 436, `expected 437+ screens, got ${screens.length}`);
    // Mechanism: the hack.c:2403 iceskater (usteed else youmonst) resists.
    const iceskater = game.u?.usteed || game.youmonst;
    assert.equal(resists_cold(iceskater), true, "cold-resistant skater resists cold");
    // Session effect: no ice rn2(3), no Fumbling, C's first attack hits.
    const top436 = String(screens[436]).split("\n")[0];
    assert.ok(top436.includes("You hit the fire giant."),
      `step 436 topline hits: ${JSON.stringify(top436.slice(0, 100))}`);
  });
});
