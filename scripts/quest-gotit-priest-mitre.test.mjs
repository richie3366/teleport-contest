import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: quest.c artitouch `:125-136` (first quest-artifact touch
// qt_pager("gotit")) called from invent.c addinv_core1 questart arm.
// JS artitouch (quest.js) is wired, but QUEST_GOTIT had no Pri body,
// so the role lookup missed (then the D-1662 common retry miss,
// burning a second nhl_init shuffle) and stayed silent: C shows the
// Pri gotit window at the wish-grant step, JS skipped straight to
// the pickup listing.
// Pins the machine-recorded C expectation: Pri gotit (output=text,
// %o/%d/%n/%H/%ca/%l conversions) at scen-worldtour-Priest-587309
// step 807.
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

describe("quest Priest gotit behind the artifact-wish pickup (quest.c artitouch)", () => {
  it("Pri gotit window paints with %o/%d/%n/%H/%ca/%l converted", { timeout: 300000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Priest-587309", 808);
    assert.ok(screens.includes("For what do you wish?"),
      "prefix reached the wish prompt");
    assert.ok(screens.includes("As you pick up the Mitre of Holiness, you feel the essence of"),
      "Pri gotit head line (%o -> the Mitre of Holiness)");
    assert.ok(screens.includes("Huan Ti fill your soul.  You know now why Nalzok stole it from"),
      "Pri gotit second line (%d -> Huan Ti, %n -> Nalzok)");
    assert.ok(screens.includes("the Great Temple, for with it, a Priestess of Huan Ti could"),
      "Pri gotit third line (%H, %ca -> a Priestess)");
    assert.ok(screens.includes("You sense a message from Huan Ti.  Though not verbal, you"),
      "Pri gotit post-blank line (double space after Huan Ti.)");
    assert.ok(screens.includes("get the impression that you must return to the Arch Priest as soon"),
      "Pri gotit penultimate line (%l -> the Arch Priest)");
  });
});
