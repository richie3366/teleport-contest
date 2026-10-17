import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: read.c litroom `:2605–2609` runs vision_recalc(2), whose main
// update loop (vision.c:741–836) newsyms prior IN_SIGHT/COULD_SEE cells
// while !cansee — under Hallucination, warned monsters burn
// display_warning rn2(5)s there, ahead of the delayed full recalc's
// fresh substitutions. JS vision_recalc skips that loop for control 2
// (D-0852: unflushed-tty goto/docrt screens), so litroom must run the
// same newsym set via vision_off_newsym_gbuf({ useLiveViz: true })
// (D-3863/D-3658 gulpmu/movebubbles precedent). Without it the two
// warns never burn and every later substitution in the turn shifts:
// scen-sweep-Wizard-587219 step 363 paints `/` where C paints `)`
// (D-4070). Single prefix per file (multi-prefix runSegment leaks
// module state).
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return { screens: handle.getScreens?.() || [] };
}

// Expand cursor-forward codes to spaces and strip SGR so a map row
// compares as plain text.
function plainRow(s) {
  return String(s)
    .replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(Number(n)))
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\x0e/g, "")
    .replace(/\x0f/g, "");
}

describe("litroom runs recalc(2) warn burns (vision.c:741-836 loop)", () => {
  it("587219 step 363 paints C's warned-shift substitution, not resynced one", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Wizard-587219", 363);
    assert.ok(screens.length > 363, `expected 364+ screens, got ${screens.length}`);
    const rows = String(screens[363]).split("\n");
    assert.equal(rows[0], "As you read the scroll, it disappears.  A lit field surrounds you!--More--",
      `step 363 topline: ${JSON.stringify(rows[0])}`);
    const row15 = plainRow(rows[15]);
    assert.equal(row15[4], ")",
      `step 363 (5,14) keeps C's glyph, got: ${JSON.stringify(row15.slice(0, 20))}`);
  });
});
