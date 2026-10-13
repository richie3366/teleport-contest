import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c artitouch `:125-136` (first quest-artifact touch
// qt_pager("gotit")) called from invent.c addinv `:985-989`
// (is_quest_artifact arm). JS artitouch (quest.js) is wired, but
// QUEST_ROLE_TEXT had no gotit table, so the role lookup missed (then
// the D-1662 common retry miss, burning a second nhl_init shuffle)
// and stayed silent: C shows the Rog gotit window behind the wish
// --More--, JS skipped straight to the pickup listing.
// Pins the machine-recorded C expectation: Rog gotit (output=text,
// %o/%n/%ls conversions) at scen-sweep-Rogue-587201 step 631.
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games (D-3762).
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

describe("quest Rogue gotit behind the artifact-wish pickup (quest.c artitouch)", () => {
  it("Rog gotit window paints with %o/%n/%ls converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Rogue-587201", 632);
    assert.ok(screens.includes("For what do you wish?"),
      "prefix reached the wish prompt");
    assert.ok(screens.includes("As you pick up the Master Key of Thievery, the hairs on the back of your"),
      "Rog gotit head line (%o -> the Master Key of Thievery)");
    assert.ok(screens.includes("neck fall out.  At once you realize why the Master Assassin was"),
      "Rog gotit second line (%n -> the Master Assassin)");
    assert.ok(screens.includes("willing to die to keep it out of the Master of Thieves' hands.  Somehow"),
      "Rog gotit third line (%ls -> the Master of Thieves')");
    assert.ok(screens.includes("you know that you must do likewise."),
      "Rog gotit tail line");
  });
});
