import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dig.c digactualhole `:640–829` — the whole body issues ZERO
// newsym calls (the pit-cell redraws come from unearth_objs inside
// maketrap (trap.c:563 → dig.c:2086 `del_engr_at` + `newsym`) and from
// seetrap (trap.c, `tseen=1` + `newsym`)). A tail `newsym(x, y)` in the
// JS port burns display-RNG draws C never makes (3 per hero-cell statue
// under Hallucination: random_monster + gender + memory otyp), shifting
// every later hallucinated glyph (scen-sweep-Monk-50255213 step 992:
// C `!··)` vs JS `)·(` at row 6, RNG fully matched; D-4066). Single
// prefix per file (multi-prefix runSegment leaks module state).
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

describe("digactualhole issues no tail newsym (dig.c:640-829 has zero)", () => {
  it("50255213 step 992 paints C's hallucinated pile glyphs, not resynced ones", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Monk-50255213", 992);
    assert.ok(screens.length > 992, `expected 993+ screens, got ${screens.length}`);
    const rows = String(screens[992]).split("\n");
    assert.equal(rows[0], "You start digging downward.  You dig a pit in the floor.",
      `step 992 topline: ${JSON.stringify(rows[0])}`);
    const row6 = plainRow(rows[6]);
    assert.ok(row6.includes("│···!··)·····│"),
      `step 992 row 6 keeps C's glyphs, got: ${JSON.stringify(row6.slice(30, 70))}`);
  });
});
