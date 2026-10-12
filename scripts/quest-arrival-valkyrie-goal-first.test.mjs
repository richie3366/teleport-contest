import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_goal (first visit qt_pager("goal_first"))
// called from onquest <- goto_level (do.c:1891-1892). JS on_goal
// (quest.js) is wired, but QUEST_GOAL_FIRST had Arc/Bar/Cav/Pri/Kni/
// Ran/Sam/Tou/Wiz only, so the Val role lookup missed (then the D-1662
// common retry miss) and stayed silent: C shows the quest text behind
// the arrival --More--, JS showed none. Pins the machine-recorded C
// expectation: Val goal_first (output=text + synopsis in lua,
// quest.lua:2725-2730, %x/%l/%n converted) at
// scen-worldtour-Valkyrie-582628 step 305.
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games (see quest-arrival-val-firsttime).
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
  return (game.getScreens?.() || []).join("\n");
}

describe("quest Valkyrie goal_first behind the level-tele arrival (quest.c on_goal)", () => {
  it("Val goal_first paints with %x/%l/%n converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Valkyrie-582628", 310);
    assert.ok(screens.includes("You materialize on a different level!"),
      "prefix reached the arrival");
    assert.ok(screens.includes("Through clouds of sulphurous gasses, you see a rock palisade"),
      "Val goal_first line 1 with %x converted");
    assert.ok(screens.includes("surrounded with a moat of bubbling lava.  You remember the description"),
      "Val goal_first line 2 (double space)");
    assert.ok(screens.includes("from something that the Norn said.  This is the lair of Lord Surtur."),
      "Val goal_first line 3 with %l/%n converted (double space)");
  });
});
