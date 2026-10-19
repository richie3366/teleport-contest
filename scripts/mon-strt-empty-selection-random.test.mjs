import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: nhlsel.c l_selection_rndcoord `:407–428` — an empty selection
// returns {x=-1, y=-1}; Mon-strt.lua's des.monster("earth elemental",
// spacelocs:rndcoord(1)) then reaches sp_lev.c create_monster, whose
// get_location_coord places the monster at random (rn2(76)/rn2(20)).
// spacelocs holds 2 cells and both dart traps take them, so all 12 siege
// monsters spawn at random. JS skipped them on the null coordinate
// (scen-sweep-Monk-50055015 step 885 level teleport to the quest home,
// D-4061). Single prefix per file (multi-prefix runSegment leaks module
// state).
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
  return { handle, game };
}

describe("Mon-strt siege monsters spawn at random on an empty selection", () => {
  it("50055015 step 885 makes the 8 earth elementals + 4 xorns", { timeout: 180000 }, async () => {
    const { handle, game } = await runPrefix("scen-sweep-Monk-50055015", 886);
    assert.equal(game.u.uz?.dnum, 3, "hero is in the Quest");
    const step = (handle.getRngSlices?.()?.[885] || []).map(String);
    const placed = step.filter((e) => /^rn2\(76\)/.test(e)).length;
    assert.ok(placed >= 12 + 4, `random get_location draws in step 885: ${placed}`);
    const { monsterNames } = await import("../js/generated/monsters_data.js");
    const names = (game.fmon || []).map((mt) => monsterNames[mt.mnum ?? mt.data?.mndx]);
    assert.equal(names.filter((n) => n === "PM_EARTH_ELEMENTAL").length, 8, JSON.stringify(names));
    assert.equal(names.filter((n) => n === "PM_XORN").length, 4, JSON.stringify(names));
  });
});
