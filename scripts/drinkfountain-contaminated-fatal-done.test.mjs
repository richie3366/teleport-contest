import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: fountain.c drinkfountain case 21 `:299–310` — poison_strdmg's
// losehp is fatal → hack.c:4287–4288 urgent_pline("You die...") +
// done(DIED) inside losehp. JS's fatal losehp sets gameover itself with
// `_losehp_needs_done`; the arm returned on gameover before draining it,
// so the game ended with no "You die..." and no further screens
// (scen-shop-Wizard-50057049 step 241, D-4060). Single prefix per file
// (multi-prefix runSegment leaks module state).
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
  return handle.getScreens?.() || [];
}

describe("drinkfountain contaminated arm drains a fatal losehp (fountain.c:299-310)", () => {
  it("50057049 steps 241-242 show the More then You die...", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-shop-Wizard-50057049", 243);
    assert.ok(screens.length > 242, `expected 243+ screens, got ${screens.length}`);
    assert.equal(String(screens[241]).split("\n")[0], "The water is contaminated!--More--");
    assert.equal(String(screens[242]).split("\n")[0], "You die...--More--");
  });
});
