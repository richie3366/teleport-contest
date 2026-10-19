import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dungeon.c init_mapseen `:2835–2869` — mklev (mklev.c:1582) always
// allocates a mapseen node, with no duplicate check. Leaving the tutorial
// deletes its level files and marks its nodes notreachable (do.c:1652–1661);
// a wizard-mode level teleport back in re-makes tut-2 and adds a second
// node, so final disclosure (why != 0 prints every node) lists «Level 2:
// [tut-2]» twice. JS returned the existing node (scen-worldtour-Wizard-
// 49955007 step 502, D-4070). Single prefix per file (multi-prefix
// runSegment leaks module state).
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
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("init_mapseen adds a node on every mklev (dungeon.c:2835)", () => {
  it("49955007 step 502 final overview lists tut-2 twice", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-worldtour-Wizard-49955007", 503);
    const rows = String(screens[502]).split("\n").filter((r) => r.includes("Level 2: [tut-2]"));
    assert.equal(rows.length, 2, JSON.stringify(rows));
  });
});
