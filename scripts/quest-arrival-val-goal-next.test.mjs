import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_goal `:62-86` (goal revisit qt_pager("goal_next"))
// called from onquest (Is_nemesis arm) <- goto_level (do.c:1891-1892).
// JS on_goal (quest.js) is wired, but QUEST_GOAL_NEXT had Arc/Bar/Pri/Kni/
// Ran only, so the Val role lookup missed (then the common retry miss)
// and stayed silent with TWO nhl_init shuffles where C draws ONE:
// C finds Val goal_next (quest.lua:2732-2734, plain pline, no
// output/synopsis keys) and delivers it — but the ESC that dismissed the
// arrival --More-- set WIN_STOP (win/tty/topl.c more() `:230-235`), so
// update_topl (`:257`) swallows the paint (buffered in gt.toplines, never
// shown). Pins the machine-recorded C expectation at
// scen-worldtour-Valkyrie-587104 step 463: single shuffle pair, no paint.
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
  return game;
}

describe("quest Val goal_next swallowed behind ESC-at-More (quest.c on_goal + WIN_STOP)", () => {
  it("Valkyrie goal revisit draws one shuffle and paints nothing", { timeout: 180000 }, async () => {
    const game = await runPrefix("scen-worldtour-Valkyrie-587104", 463);
    const screens = (game.getScreens?.() || []).join("\n");
    assert.ok(screens.includes("Oops..."),
      "prefix reached the confused level-tele arrival");
    const slices = game.getRngSlices?.() || [];
    assert.equal((slices[463] || []).length, 2,
      `step 463 draws one shuffle pair (Val hit, no common retry), got ${JSON.stringify(slices[463])}`);
    assert.ok(!screens.includes("Once again, you stand in sight of"),
      "WIN_STOP swallows the goal_next paint (C shows map + empty topline)");
  });
});
