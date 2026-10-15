import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c sel_set_wall_property `:985-995` — des.non_diggable marks
// stone walls/trees/iron bars ONLY; floors stay diggable. Bar-strt.lua:88
// marks area(00,00,75,19); the JS port looped the area ungated, so every
// floor carried flags&W_NONDIGGABLE and muse.c find_defensive `:671`
// rejected the ogre's digging wand (scen-questtour-Barbarian-50350022
// step 123: C rn2(3)@find_defensive vs JS distfleeck). D-3988.
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
  await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { game };
}

describe("des.non_diggable gates on stone/tree/bars (sp_lev.c:985-995)", () => {
  it("Bar-strt floors diggable; ogre finds digging wand (50350022 step 122)", { timeout: 180000 }, async () => {
    const { game } = await runPrefix("scen-questtour-Barbarian-50350022", 122);
    const { W_NONDIGGABLE } = await import("../js/const.js");
    const loc = game.level.at(32, 5);
    assert.equal((loc.wall_info | 0) & W_NONDIGGABLE, 0, "ogre floor wall_info diggable");
    assert.equal((loc.flags | 0) & W_NONDIGGABLE, 0, "ogre floor flags diggable");
    const ogre = game.fmon.find((mt) => mt.mx === 32 && mt.my === 5);
    assert.ok(ogre, "ogre at (32,5)");
    const { find_defensive } = await import("../js/muse.js");
    assert.equal(find_defensive(ogre, false), true, "find_defensive takes the digging wand");
  });
});
