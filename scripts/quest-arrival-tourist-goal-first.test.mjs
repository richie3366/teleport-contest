import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_goal `:62-68` (first goal visit qt_pager("goal_first"))
// called from onquest <- goto_level (do.c:1891-1892). JS on_goal
// (quest.js) is wired, but QUEST_GOAL_FIRST had no Tou, so the role
// lookup missed (then the D-1662 common retry miss) and stayed silent:
// C shows the quest pline behind the arrival --More--, JS showed none.
// Pins the machine-recorded C expectation: Tou goal_first (no
// output/synopsis keys in lua, plain pline, %o conversion) at
// scen-worldtour-Tourist-578104 step 183.
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games (Val-812 before Wiz-572 diverges
// the Wiz run; hidden-proxy scores one process per session, unaffected).
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

describe("quest Tourist goal_first behind the level-tele arrival (quest.c on_goal)", () => {
  it("Tourist goal_first pline paints with %o converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Tourist-578104", 187);
    assert.ok(screens.includes("You materialize on a different level!"),
      "prefix reached the arrival");
    assert.ok(screens.includes("You sense the presence of the Platinum Yendorian Express Card."),
      "Tourist goal_first pline painted with %o converted");
  });
});
