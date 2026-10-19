import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: pager.c object_from_map `:346–349` — a remembered corpse/statue
// glyph with no matching object there gets a fake whose corpsenm comes
// from the glyph (glyph_to_body_corpsenm / glyph_to_statue_corpsenm).
// JS skipped that arm ("no integer glyphs"), so the fake kept mksobj's
// random corpsenm: getpos autodescribe named «an iguana corpse» where C
// said «a watchman corpse» (scen-shop-Monk-50550061 s689, D-4079).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes-reserve/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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

describe("object_from_map takes corpsenm from the glyph (pager.c)", () => {
  it("50550061 step 689 names the remembered watchman corpse", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-shop-Monk-50550061", 690);
    const top = String(screens[689]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("a watchman corpse"), JSON.stringify(top.slice(0, 80)));
  });
});
