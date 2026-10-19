import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: o_init.c choose_disco_sort `:623–644` — add_menu marks the
// current flags.discosort entry MENU_ITEMFLAGS_SELECTED (tty paints «o *»)
// and tty end_menu puts the prompt above a blank line. JS drew no blank
// row and no preselection, so every item sat one row high
// (scen-options-Wizard-50162010 s39, D-4081). Single prefix per file
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

describe("choose_disco_sort menu layout (o_init.c)", () => {
  it("50162010 step 39 has a blank row then the preselected «o *» entry", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-options-Wizard-50162010", 40);
    const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");
    const g = decodeScreen(String(screens[39]));
    const row = (r) => g[r].map(renderCell).join("");
    assert.ok(row(0).includes("Ordering of discoveries"), JSON.stringify(row(0)));
    assert.equal(row(1).trim(), "", JSON.stringify(row(1)));
    assert.ok(row(2).includes("o * by order of discovery within each class"), JSON.stringify(row(2)));
  });
});
