import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: zap.c wish_history_menu `:6298` end_menu(win, "Wish what?") —
// wintty.c tty_end_menu `:2685–2689` paints the prompt with
// tty_menu_promptstyle (menu_headings, inverse here). JS's header row had
// no attr, so «Wish what?» drew plain (scen-sweep-Monk-50556001 s644,
// D-4084). Single prefix per file (multi-prefix runSegment leaks module
// state).
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

describe("wish_history_menu prompt uses the menu prompt style (zap.c/wintty.c)", () => {
  it("50556001 step 644 draws «Wish what?» inverse", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Monk-50556001", 645);
    const row0 = String(screens[644]).split("\n")[0];
    assert.ok(row0.includes("\u001b[7mWish what?"), JSON.stringify(row0));
  });
});
