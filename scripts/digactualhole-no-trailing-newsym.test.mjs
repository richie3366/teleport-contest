import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dig.c digactualhole `:640–828` — the body has no trailing
// newsym(x, y); maketrap's unearth, seetrap and vision_recalc repaint the
// spot. JS's extra newsym re-drew a hallucinated statue (random_monster +
// gender + remembered random_object on the display RNG), so every later
// hallucinated glyph shifted by three draws (scen-sweep-Monk-50255213
// step 992 dig down: C `!`/`)` vs JS `)`/`(` on map row 6, D-4064).
// Single prefix per file (multi-prefix runSegment leaks module state).
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

describe("digactualhole has no trailing newsym (dig.c:828)", () => {
  it("50255213 step 992 hallucinated objects match C", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Monk-50255213", 993);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[992]));
    assert.equal(renderCell(g[6][42]), "!", "cell (42,6)");
    assert.equal(renderCell(g[6][45]), ")", "cell (45,6)");
  });
});
