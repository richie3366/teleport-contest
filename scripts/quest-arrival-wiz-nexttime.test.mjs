import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c on_start `:24-36` (home revisit qt_pager("nexttime"))
// called from onquest <- goto_level (do.c:1891-1892). JS on_start
// (quest.js) is wired, but QUEST_NEXTTIME had Arc/Bar/Pri only, so the
// Wiz role lookup missed (then the D-1662 common retry miss) and stayed
// silent: C shows the quest text behind the arrival --More--, JS showed
// none (and printed the later heat-smoke line on the materialize row).
// Pins the machine-recorded C expectation: Wiz nexttime (plain pline,
// no output/synopsis in lua) at scen-sweep-Wizard-95334 step 570.
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

describe("quest Wiz nexttime behind the level-tele arrival (quest.c on_start)", () => {
  it("Wizard nexttime pline paints with %H converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Wizard-95334", 572);
    assert.ok(screens.includes("Once again, you are back at the Lonely Tower."),
      "Wiz nexttime pline painted with %H converted");
  });
});
