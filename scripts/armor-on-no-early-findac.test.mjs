import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do_wear.c Armor_on `:887–906` — known + dragon_armor_handling +
// gold-DSM arti_light only. C never calls find_ac there (D-0810 class:
// uac refreshes at the allmain once-per-player-input find_ac), so when a
// multi-turn donning completes mid-turn (here via savelife's multi=-1
// cutting the dressing occupation short), the status line keeps painting
// the stale AC until the turn ends (scen-sweep-Priest-582714 step 1376,
// D-3891). JS ran a house find_ac() in Armor_on and painted AC:4 two
// steps early. Single prefix per file (multi-prefix runSegment leaks
// module state).
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

describe("Armor_on runs no find_ac (do_wear.c:887-906)", () => {
  it("582714 step 1376 paints stale AC:10; AC:4 lands at 1378", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Priest-582714", 1379);
    assert.ok(screens.length > 1378, `expected 1379+ screens, got ${screens.length}`);
    const top1376 = String(screens[1376]).split("\n")[0];
    assert.equal(top1376, "The gnome lord hits!  You survived that attempt on your life.--More--",
      `step 1376 topline: ${JSON.stringify(top1376.slice(0, 100))}`);
    const row1376 = String(screens[1376]).split("\n")[23];
    assert.equal(row1376, "Dlvl:5 $:800 HP:58(62) Pw:174(174) AC:10 Xp:12 Stressed",
      `step 1376 row23 (stale AC until turn end): ${JSON.stringify(row1376)}`);
    // Mechanism: suit worn since the 1372 wear answer, uac still stale 10.
    assert.ok(game.u.uarm, "chain mail worn by step 1378");
    const row1378 = String(screens[1378]).split("\n")[23];
    assert.equal(row1378, "Dlvl:5 $:800 HP:54(62) Pw:174(174) AC:4 Xp:12 Stressed",
      `step 1378 row23 (turn-end find_ac): ${JSON.stringify(row1378)}`);
    assert.equal(game.u.uac, 4, "uac recomputed by the turn-end find_ac");
  });
});
