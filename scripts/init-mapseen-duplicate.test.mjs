import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dungeon.c init_mapseen `:2834–2871` unconditionally allocs and
// sorted-inserts a mapseen node — no find_mapseen dedupe. mklev.c:1582
// calls it on every level creation, including re-creation: when the hero
// leaves the tutorial, do.c:1654–1660 discards the tutorial level files
// (LFILE_EXISTS cleared, entries kept as notreachable), so a later
// wizard-mode re-entry re-mklevs the level and C's chain holds TWO nodes
// for it. End-of-game disclosure (show_overview why=2) prints every node
// (traverse_mapseenchn:3359 bypasses interest_mapseen), so C's overview
// lists the level twice. JS init_mapseen returned the existing node
// ("C never re-calls init for the same level"), dropping the duplicate
// line (D-4073). Single prefix per file (multi-prefix runSegment leaks
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

// Expand cursor-forward codes to spaces and strip SGR so a menu row
// compares as plain text.
function plainRow(s) {
  return String(s)
    .replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(Number(n)))
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\x0e/g, "")
    .replace(/\x0f/g, "");
}

describe("init_mapseen re-inits a re-created level (dungeon.c:2834-2871, no dedupe)", () => {
  it("49955007 step 502 overview lists tutorial Level 2 twice like C", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-worldtour-Wizard-49955007", 502);
    assert.ok(screens.length > 502, `expected 503+ screens, got ${screens.length}`);
    const rows = String(screens[502]).split("\n").map(plainRow);
    assert.ok(rows[18].includes("Level 2: [tut-2]"),
      `step 502 row 18 keeps first tut-2 line: ${JSON.stringify(rows[18])}`);
    assert.ok(rows[19].includes("Level 2: [tut-2]"),
      `step 502 row 19 repeats tut-2 like C (got: ${JSON.stringify(rows[19])})`);
  });
});
