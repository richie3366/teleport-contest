import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: detect.c do_vicinity_map tail `:1563–1576` — the I-replace pass
// skips a spot whose DISPLAYED glyph is a long worm tail
// (`glyph_to_mon(newglyph) != PM_LONG_WORM_TAIL`). Under Hallucination
// map_monst painted a display-RNG monster glyph; when that draw is a worm
// tail the spot falls to see_monsters → newsym (remembered floor), never
// 'I'. JS tested m_at's real monster (a lieutenant) and mapped 'I'
// (scen-sweep-Samurai-49956004 step 830, timed clairvoyance during a
// 20-turn search, D-4062). Single prefix per file (multi-prefix
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
  return handle.getScreens?.() || [];
}

describe("do_vicinity_map I-replace reads the displayed glyph (detect.c tail)", () => {
  it("49956004 step 830 leaves (63,14) as floor, not I", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Samurai-49956004", 831);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[830]));
    const row = (r) => g[r].slice(63, 66).map(renderCell).join("");
    assert.equal(row(13).slice(0, 1), "I", "neighbour (63,13) stays I");
    assert.equal(row(14).slice(0, 1), "·", `cell (63,14): ${JSON.stringify(row(14))}`);
  });
});
