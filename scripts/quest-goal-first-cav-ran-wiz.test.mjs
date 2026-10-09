import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_goal `:62-86` (first goal visit qt_pager("goal_first"))
// called from onquest (Is_nemesis arm) <- goto_level (do.c:1891-1892).
// JS on_goal (quest.js) is wired, but QUEST_GOAL_FIRST carried only
// Arc/Bar/Pri/Kni/Sam, so Cav/Ran/Wiz arrivals missed (role miss, then
// the D-1662 common retry miss) and stayed silent: C shows the quest
// text behind the arrival --More--, JS showed none. Pins the
// machine-recorded C expectations: Cav goal_first (output=text,
// %nC/%nh conversions) at scen-worldtour-Caveman-95234 step 357,
// Ran goal_first (output=text) at scen-worldtour-Ranger-95231 step 116,
// Wiz goal_first (plain pline, no output/synopsis in lua) at
// scen-worldtour-Wizard-95228 step 235.
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

describe("quest goal_first texts behind the level-tele arrival (quest.c on_goal)", () => {
  it("Caveman goal_first window paints with %nC/%nh converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Caveman-95234", 359);
    assert.ok(screens.includes("You find yourself in a large cavern, with neatly polished walls, that"),
      "Cav goal_first window painted");
    assert.ok(screens.includes("The Chromatic Dragon is clearly visible, but she seems to be asleep."),
      "Cav %nC/%nh converted");
  });
  it("Ranger goal_first window paints", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Ranger-95231", 118);
    assert.ok(screens.includes("You descend into a weird place, in which roughly cut cave-like walls"),
      "Ran goal_first window painted");
    assert.ok(screens.includes("hooves on rock."),
      "Ran goal_first tail painted");
  });
  it("Wizard goal_first pline paints with %o converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Wizard-95228", 237);
    assert.ok(screens.includes("You feel your mentor's presence; perhaps the Eye of the Aethiopica is nearby."),
      "Wiz goal_first pline painted with %o converted");
  });
});
