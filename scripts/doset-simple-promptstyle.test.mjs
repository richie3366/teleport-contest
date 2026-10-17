import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: options.c doset_simple_menu — the "Options" prompt paints with
// the relayed tty_menu_promptstyle (C windows.c adjust_menu_promptstyle
// `:1769–1778` snapshots iflags.menu_headings; wintty.c `:2685–2689`
// paints it) and headings with live iflags.menu_headings (C windows.c
// add_menu_heading `:1815–1828`), not hardcoded inverse
// (scen-options-Barbarian-50355007 step 30: C inverse+green vs JS
// inverse-only). Single prefix per file (multi-prefix runSegment
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
  return { screens: handle.getScreens?.() || [] };
}

describe("doset_simple_menu prompt/heading use menu_headings style", () => {
  it("50355007 step 30 paints the green prompt and heading", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-options-Barbarian-50355007", 30);
    assert.ok(screens.length > 30, `expected 31+ screens, got ${screens.length}`);
    const rows = String(screens[30]).split("\n");
    // SGR form varies (JS combines 7;32, C emits 7 then 32) — compare
    // the visual sequence, like the corpus visual comparator.
    const norm = rows[0].replace(/\x1b\[(\d+);(\d+)m/g, "\x1b[$1m\x1b[$2m");
    assert.equal(norm, " \x1b[7m\x1b[32mOptions\x1b[0m",
      `step 30 prompt row: ${JSON.stringify(rows[0])}`);
    assert.ok(/\x1b\[[\d;]*32m/.test(rows[4]),
      `step 30 heading row carries green: ${JSON.stringify(rows[4])}`);
  });
});
