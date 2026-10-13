import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_start `:26-37` (first home visit qt_pager("firsttime"))
// called from onquest <- goto_level (do.c:1891-1892). JS on_start
// (quest.js) is wired, but QUEST_FIRSTTIME had no Cav, so the role
// lookup missed (then the D-1662 common retry miss) and stayed silent:
// C shows the quest text behind the arrival --More--, JS showed none.
// Pins the machine-recorded C expectation: Cav firsttime (output=text,
// %l/%H conversion) at scen-sweep-Caveman-587113 rec#616.
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

describe("quest Caveman firsttime behind the level-tele arrival (quest.c on_start)", () => {
  it("Cav firsttime text paints with %l/%H converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Caveman-587113", 625);
    assert.ok(screens.includes("You materialize on a different level!"),
      "prefix reached the arrival");
    assert.ok(screens.includes("You descend through a barely familiar stairwell that you remember"),
      "Cav firsttime stairwell line painted");
    assert.ok(screens.includes("Shaman Karnov showing you when you embarked upon your vision quest."),
      "Cav firsttime %l converted");
    assert.ok(screens.includes("You arrive back at the Caves of the Ancestors, but something seems"),
      "Cav firsttime %H converted");
  });
});
