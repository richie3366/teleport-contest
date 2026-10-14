import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do_wear.c Helmet_on `:434–515` — helm switch + known tail only.
// C never calls find_ac there (D-0810 class: uac refreshes at the allmain
// once-per-player-input find_ac), so when a delayed donning completes
// mid-turn inside a --More-- sequence (here an elven leather helm while
// an energy vortex zaps the hero), the status line keeps painting the
// stale AC until the turn ends (scen-sweep-Healer-49956027 step 486,
// D-3948). JS ran a house find_ac() at the end of Helmet_on and painted
// AC:7 four steps early. Single prefix per file (multi-prefix runSegment
// leaks module state).
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

describe("Helmet_on runs no find_ac (do_wear.c:434-515)", () => {
  it("49956027 step 486 paints stale AC:8; AC:7 lands at 490", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Healer-49956027", 491);
    assert.ok(screens.length > 490, `expected 491+ screens, got ${screens.length}`);
    const top486 = String(screens[486]).split("\n")[0];
    assert.equal(top486, "You finish your dressing maneuver.--More--",
      `step 486 topline: ${JSON.stringify(top486.slice(0, 100))}`);
    const row486 = String(screens[486]).split("\n")[23];
    assert.equal(row486, "Dlvl:1 $:1095 HP:72(136) Pw:0(115) AC:8 Xp:20 Burdened",
      `step 486 row23 (stale AC until turn end): ${JSON.stringify(row486)}`);
    // Mechanism: helm worn since the W answer, uac still stale at 486.
    assert.ok(game.u.uarmh, "elven leather helm worn by step 490");
    const top490 = String(screens[490]).split("\n")[0];
    assert.equal(top490, "You get zapped!  The energy vortex misses!",
      `step 490 topline: ${JSON.stringify(top490.slice(0, 100))}`);
    const row490 = String(screens[490]).split("\n")[23];
    assert.equal(row490, "Dlvl:1 $:1095 HP:63(136) Pw:0(111) AC:7 Xp:20 Burdened",
      `step 490 row23 (turn-end find_ac): ${JSON.stringify(row490)}`);
    assert.equal(game.u.uac, 7, "uac recomputed by the turn-end find_ac");
  });
});
