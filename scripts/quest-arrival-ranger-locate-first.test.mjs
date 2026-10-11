import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_locate `:40-59` (first locate visit from above
// qt_pager("locate_first")) called from onquest <- goto_level
// (do.c:1891-1892). JS on_locate (quest.js) is wired, but
// QUEST_LOCATE_FIRST had no Ran, so the role lookup missed (then the
// D-1662 common retry miss) and stayed silent: C shows the quest text
// behind the arrival --More--, JS showed none.
// Pins the machine-recorded C expectation: Ran locate_first
// (output=text, %i conversion) at scen-worldtour-Ranger-578310 step 397.
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

describe("quest Ranger locate_first behind the level-tele arrival (quest.c on_locate)", () => {
  it("Ranger locate_first window paints with %i converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Ranger-578310", 401);
    assert.ok(screens.includes("You materialize on a different level!"),
      "prefix reached the arrival");
    assert.ok(screens.includes("This must be the cave of the wumpus."),
      "Ranger locate_first window painted");
    assert.ok(screens.includes("You are in room 9 of the cave.  There are tunnels to rooms"),
      "Ranger room line (double space after cave.)");
    assert.ok(screens.includes("*sniff* (I can smell the evil wumpus nearby!)"),
      "Ranger sniff tail line");
  });
});
