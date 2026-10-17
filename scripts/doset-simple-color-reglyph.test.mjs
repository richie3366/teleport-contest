import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: options.c doset_simple_menu `:8654–8656` — a bool pick runs
// parseoptions("!name"|"name", FALSE, FALSE) → optfn_boolean do_set,
// whose color arm (`:5407–5410`) marks opt_need_redraw +
// opt_need_glyph_reset so the doset_simple `:8727`
// reset_needed_visuals runs reglyph_darkroom. The old JS
// simple_bool_toggle stand-in skipped the after-change arms: a
// simple-menu color-off toggle left S_darkroom hero memory in place
// and the live darkroom arm rendered X_nothing (scen-symset-Rogue-
// 50750039 step 162: C `zzzzzzz` vs JS spaces at row 15, RNG fully
// matched). Single prefix per file (multi-prefix runSegment leaks
// module state).
async function runPrefix(recipeDir, recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/${recipeDir}/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
  return { screens: handle.getScreens?.() || [] };
}

// Expand cursor-forward codes to spaces and strip SGR so a map row
// compares as plain text.
function plainRow(s) {
  return String(s)
    .replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(Number(n)))
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\x0e/g, "")
    .replace(/\x0f/g, "");
}

describe("doset_simple_menu bool routes via optfn_boolean do_set (options.c:8654-8656)", () => {
  it("50750039 step 162 repaints RogueIBM room memory after color-off", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("recipes-reserve", "scen-symset-Rogue-50750039", 162);
    assert.ok(screens.length > 162, `expected 163+ screens, got ${screens.length}`);
    const rows = String(screens[162]).split("\n");
    const row15 = plainRow(rows[15]);
    assert.ok(row15.includes("zzzzzzz"),
      `step 162 row 15 keeps C's room memory, got: ${JSON.stringify(row15.slice(0, 30))}`);
  });
});
