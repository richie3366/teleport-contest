import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: read.c litroom `:2605–2613` — `if (!Blind) vision_recalc(2);`.
// vision.c vision_recalc's update loop then newsyms every prior IN_SIGHT
// spot while !cansee; under Hallucination a warned-of monster's
// display_warning (display.c:640) draws rn2_on_display_rng(WARNCOUNT - 1).
// JS vision_recalc(2) skips that loop, so the two rn2(5) display draws
// went missing and every later hallucinated glyph shifted
// (scen-sweep-Wizard-587219 step 363 scroll of light, D-4065). Single
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
  return handle.getScreens?.() || [];
}

describe("litroom vision_recalc(2) burns Hallu warning draws (read.c / vision.c)", () => {
  it("587219 step 363 hallucinated glyphs beside the hero match C", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Wizard-587219", 364);
    const top = String(screens[363]).split("\n")[0];
    assert.ok(top.includes("A lit field surrounds you!"), JSON.stringify(top.slice(0, 80)));
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[363]));
    assert.equal(renderCell(g[15][4]), ")", `cell (4,15): ${JSON.stringify(g[15].slice(3, 7).map(renderCell).join(""))}`);
  });
});
