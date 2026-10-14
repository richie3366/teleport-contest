import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c:1073-1103 per-cell feature checks — glyph_at, memory
// glyph, vibrating square, seenv back_to_glyph, all cmap-vs-matching[].
// C never consults the rendered char. Under OPTIONS=symset:RogueIBM the
// S_brcorn carrier 0xBC captures as '<', so a disp_ch-based '<' shortcut
// jumps to a wall corner instead of the upstairs (scen-symset
// Healer-50155002 s6: C cursor on the hero "human healer called wizard",
// JS was "wall (no travel path)").
async function replayTo(id, step) {
  const recipe = JSON.parse(readFileSync(
    join(ROOT, `hidden-corpus/recipes/${id}.recipe.json`), "utf8"));
  const seg = recipe.segments[0];
  const mem = new Map();
  const storage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    get length() { return mem.size; },
    key: (i) => [...mem.keys()][i] ?? null,
  };
  const g = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, step),
    storage,
  });
  return g;
}

describe("getpos '<' skips wall corners under symset:RogueIBM", () => {
  it("lands on the hero upstairs like C (Healer-50155002 s6)", async () => {
    const g = await replayTo("scen-symset-Healer-50155002", 6);
    const screens = g.getScreens();
    const cursors = g.getCursors();
    assert.ok(screens.length > 6, `expected >6 screens, got ${screens.length}`);
    const row0 = String(screens[6]).split("\n")[0];
    assert.equal(row0, "human healer called wizard");
    assert.deepEqual(cursors[6], [34, 15, 1]);
  });
});
