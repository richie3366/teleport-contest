import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c artitouch `:125-136` (first quest-artifact touch
// qt_pager("gotit")) called from invent.c addinv_core1 questart arm.
// JS artitouch (quest.js) is wired, but QUEST_GOTIT had no Bar body,
// so the role lookup missed (then the D-1662 common retry miss,
// burning a second nhl_init shuffle) and stayed silent: C shows the
// Bar gotit window at the wish-grant step, JS skipped straight to
// the pickup listing.
// Pins the machine-recorded C expectation: Bar gotit (output=text,
// %o conversion) at scen-worldtour-Barbarian-587116 step 118.
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

describe("quest Barbarian gotit behind the artifact-wish pickup (quest.c artitouch)", () => {
  it("Bar gotit window paints with %o converted", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Barbarian-587116", 119);
    assert.ok(screens.includes("For what do you wish?"),
      "prefix reached the wish prompt");
    assert.ok(screens.includes("As you pick up the Heart of Ahriman, you feel the power of it"),
      "Bar gotit head line (%o -> the Heart of Ahriman)");
    assert.ok(screens.includes("flowing through your hands.  It seems to be in two or more places"),
      "Bar gotit second line (double space after hands.)");
    assert.ok(screens.includes("at once, even though you are holding it."),
      "Bar gotit tail line");
  });
});
