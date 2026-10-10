import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_goal `:62-86` (goal revisit qt_pager("goal_next"))
// called from onquest (Is_nemesis arm) <- goto_level (do.c:1891-1892).
// JS on_goal (quest.js) is wired, but QUEST_GOAL_NEXT had Arc/Bar/Pri/Kni
// only, so the Ran role lookup missed (then the D-1662 common retry miss)
// and stayed silent: C shows the quest text behind the arrival --More--,
// JS showed none. Pins the machine-recorded C expectation: Ran goal_next
// (plain pline, no output/synopsis in lua) at
// scen-worldtour-Ranger-95231 step 537.
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

describe("quest Ran goal_next behind the level-tele arrival (quest.c on_goal)", () => {
  it("Ranger goal_next pline paints with %n converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Ranger-95231", 539);
    assert.ok(screens.includes("Once again, you enter the distorted castle of Scorpius."),
      "Ran goal_next pline painted with %n converted");
  });
});
