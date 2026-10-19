import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do.c doaltarobj `:380` — There("is %s flash as …",
// an(hcolor(blessed ? NH_AMBER : NH_BLACK))); do_name.c hcolor `:1461`
// draws hcolors[rn2_on_display_rng(SIZE(hcolors))] under Hallucination.
// js/do.js had a local identity hcolor, so a hallucinating hero saw
// «a black flash» and the display RNG skipped a draw
// (scen-sweep-Valkyrie-50156016 step 984, D-4067). Single prefix per file
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

describe("doaltarobj flash colour uses hcolor (do.c:380)", () => {
  it("50156016 step 984 hallucinated altar flash matches C", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Valkyrie-50156016", 985);
    const top = String(screens[984]).split("\n")[0];
    assert.ok(top.includes("There is a bistre flash as"), JSON.stringify(top.slice(0, 90)));
  });
});
