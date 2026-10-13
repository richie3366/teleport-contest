import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c artitouch `:125-136` (first quest-artifact touch
// qt_pager("gotit")) called from invent.c addinv_core1 `:984-990`
// (is_quest_artifact arm). JS artitouch (quest.js) is wired, but
// QUEST_GOTIT had no Arc body, so the role lookup missed (then
// the D-1662 common retry miss, burning a second nhl_init shuffle)
// and stayed silent: C shows the Arc gotit window behind the wish
// --More--, JS skipped straight to the pickup listing.
// Pins the machine-recorded C expectation: Arc gotit (output=text,
// %o/%l conversions) at scen-worldtour-Archeologist-587315 step 378.
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

describe("quest Archeologist gotit behind the artifact-wish pickup (quest.c artitouch)", () => {
  it("Arc gotit window paints with %o/%l converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Archeologist-587315", 379);
    assert.ok(screens.includes("For what do you wish?"),
      "prefix reached the wish prompt");
    assert.ok(screens.includes("The power of the Orb of Detection flows through your body!  You feel"),
      "Arc gotit head line (%o -> the Orb of Detection, double space after body!)");
    assert.ok(screens.includes("as if you could now take on the Wizard of Yendor himself and win, but"),
      "Arc gotit second line");
    assert.ok(screens.includes("you know you must return the Orb of Detection to Lord Carnarvon."),
      "Arc gotit tail line (%o + %l -> Lord Carnarvon)");
  });
});
