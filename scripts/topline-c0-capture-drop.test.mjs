import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: topl.c redotoplin `:126–137` — home(); putsyms(str); cl_end().
// Each byte goes through topl_putsym → nomux_putch (patch 006), which
// drops `ch < 32`. RogueEpyx (IBM handling) decodes the hero glyph to the
// raw byte 0x01 in a farlook line, so the capture keeps the previous
// topline's col-0 cell ('P' of "Pick a monster…") while the rest of the
// line overwrites in place (scen-symset-Rogue-50059048 step 55, D-4056).
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

describe("topline C0 symbol keeps the prior captured cell (topl.c redotoplin + nomux_putch)", () => {
  it("50059048 step 55 farlook line keeps col-0 'P', no raw \\x01", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Rogue-50059048", 56);
    assert.ok(screens.length > 55, `expected 56+ screens, got ${screens.length}`);
    const prev = String(screens[54]).split("\n")[0];
    const top = String(screens[55]).split("\n")[0];
    assert.ok(prev.startsWith("Pick a monster"), `step 54 topline: ${JSON.stringify(prev.slice(0, 40))}`);
    assert.ok(!top.includes("\x01"), `raw C0 painted: ${JSON.stringify(top.slice(0, 40))}`);
    assert.ok(top.startsWith("P"), `col 0 should keep 'P': ${JSON.stringify(top.slice(0, 40))}`);
    assert.ok(top.includes("a human or elf (human rogue called wizard)"), JSON.stringify(top));
  });
});
