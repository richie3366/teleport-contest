import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: uhitm.c mhitm_ad_elec mhitu arm `:2704–2723` — after hitmsg +
// "get zapped!", `if (Shock_resistance)` (youprop.h:44 —
// uprops[SHOCK_RES].intrinsic || .extrinsic) prints "The zap doesn't
// shock you!". Worn gear writes uprops only (confer_oc_oprop, no E*
// mirror for resists), so the flats-only read missed a worn ring of
// shock resistance and JS fell through to the next attacker's message
// (scen-sweep-Samurai-49956004 step 521, D-4012). Single prefix per
// file (multi-prefix runSegment leaks module state).
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
  return { screens: handle.getScreens?.() || [], game };
}

describe("mhitm_ad_elec mhitu arm reads worn-ring shock extrinsic (uhitm.c:2704-2723)", () => {
  it("49956004 step 521 prints the resist message, not the next attack", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Samurai-49956004", 521);
    assert.ok(screens.length > 521, `expected 522+ screens, got ${screens.length}`);
    const top521 = String(screens[521]).split("\n")[0];
    assert.equal(top521, "The gecko touches you!  You get zapped!  The zap doesn't shock you!--More--",
      `step 521 topline: ${JSON.stringify(top521.slice(0, 110))}`);
    // Mechanism: ring worn left, extrinsic in uprops only (flats unset).
    const { objectNames } = await import("../js/generated/objects_data.js");
    assert.equal(objectNames[game.u.uleft?.otyp], "RIN_SHOCK_RESISTANCE", "shock ring worn left");
    assert.ok((game.u.uprops?.[5]?.extrinsic | 0) !== 0, "uprops[SHOCK_RES].extrinsic set");
  });
});
