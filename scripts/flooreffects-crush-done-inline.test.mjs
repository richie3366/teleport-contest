import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do.c flooreffects `:231–234` — a boulder falling into the hero's
// pit runs losehp(…, "squished under a boulder"), and a fatal losehp
// calls done() inline, so final disclosure runs before deletedwithboulder
// `:257–261` reset_utrap(FALSE) and lists «You were trapped in a pit
// {6}.». JS deferred done to drop_boulder_on_player's drain after
// flooreffects returned, by which time utrap was 0
// (scen-sokoban-Ranger-50351023 s158, D-4092). Single prefix per file
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

describe("boulder pit-crush death runs done before reset_utrap (do.c)", () => {
  it("50351023 step 158 disclosure still shows the pit", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sokoban-Ranger-50351023", 159);
    const rows = String(screens[158]).split("\n");
    assert.ok(rows.some((r) => r.includes("You were trapped in a pit {6}.")), JSON.stringify(rows.slice(4, 8)));
  });
});
