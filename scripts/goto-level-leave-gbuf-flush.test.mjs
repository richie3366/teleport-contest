import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do.c goto_level `:1631` vision_recalc(2) newsyms every seen spot
// as !cansee (monsters → memory) in the level-independent gbuf; the
// «goto_level: returning to discarded level?» impossible `:1696` then
// plines, and pline's flush_screen (pline.c:277) prints those cells.
// JS flush_screen painted only topline/status while game.level was
// detached, so the leave level's seen bats stayed on the screen
// (scen-worldtour-Wizard-50056058 step 346, wizard ^V back into the
// tutorial, D-4073). Single prefix per file (multi-prefix runSegment
// leaks module state).
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

describe("mid-goto_level pline flushes the leave-level gbuf (pline.c:277)", () => {
  it("50056058 step 346 seen monsters are gone behind the impossible", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Wizard-50056058", 347);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[346]));
    assert.ok(g[0].map(renderCell).join("").startsWith("goto_level: returning to discarded level?"));
    assert.equal(renderCell(g[12][67]), "·");
    assert.equal(g[14].slice(69, 72).map(renderCell).join(""), "#··");
  });
});
