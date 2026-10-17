import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: termcap.c nomux_putch (patch 006) — ch < 32 is dropped from the
// capture shadow while the wintty menu loop still advances one column
// per char, so a menu_tab_sep \t paints as one stale (cleared: space)
// cell (scen-options-Samurai-50162003 step 120: C `fruit [slime` vs JS
// `fruit\t[slime`). D-3962 grid rule for menus. Single prefix per
// file (multi-prefix runSegment leaks module state).
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
  return { screens: handle.getScreens?.() || [] };
}

describe("menu paint drops C0 like the capture shadow (nomux_putch)", () => {
  it("50162003 step 120 shows a space where menu_tab_sep emits tab", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-options-Samurai-50162003", 120);
    assert.ok(screens.length > 120, `expected 121+ screens, got ${screens.length}`);
    const rows = String(screens[120]).split("\n");
    assert.ok(!rows[5].includes("\t"),
      `step 120 row 5 has no raw tab: ${JSON.stringify(rows[5])}`);
    assert.ok(rows[5].includes("fruit [slime mold]"),
      `step 120 row 5 matches C spacing: ${JSON.stringify(rows[5])}`);
  });
});
