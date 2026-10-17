import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: zap.c wish_history_menu `:6298` end_menu prompt "Wish what?" —
// C tty_end_menu `:2685–2689` paints it with the relayed
// tty_menu_promptstyle (= menu_headings, default inverse), not plain
// (scen-sweep-Wizard-620057 step 635: C inverse prompt row vs JS plain,
// 1 missed screen, RNG 100%). Single prefix per file (multi-prefix
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
  return { screens: handle.getScreens?.() || [] };
}

describe("wish_history_menu prompt uses menu_headings style", () => {
  it("620057 step 635 paints the inverse Wish what? prompt", { timeout: 180000 }, async () => {
    const { screens } = await runPrefix("scen-sweep-Wizard-620057", 635);
    assert.ok(screens.length > 635, `expected 636+ screens, got ${screens.length}`);
    const rows = String(screens[635]).split("\n");
    assert.ok(rows[0].includes("Wish what?"),
      `step 635 row 0 holds the wish prompt: ${JSON.stringify(rows[0])}`);
    assert.ok(/\x1b\[[\d;]*7m/.test(rows[0]),
      `step 635 prompt row carries inverse: ${JSON.stringify(rows[0])}`);
  });
});
