import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");

// C ref: getpos.c gather_locs_interesting GLOC_DOOR `:466-470` —
// glyph_is_cmap(glyph_at) && (is_cmap_door || is_cmap_drawbridge ||
// S_ndoor): the 'd' cycle reads the DISPLAYED map, not live terrain.
// scen-town-Healer-94322: the 4th 'd' lands on the displayed-closed
// door at map (30,8) (terminal [29,9]); the typ-based approximation
// skipped it (live doormask D_ISOPEN) and jumped to (43,13) [42,14].
describe("getpos door cycle reads displayed door glyphs", () => {
  it("cycles 114-117 to the C-recorded doors (Healer-94322)", async () => {
    const recipe = JSON.parse(readFileSync(
      join(ROOT, "hidden-corpus/recipes/scen-town-Healer-94322.recipe.json"), "utf8"));
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
      moves: seg.moves.slice(0, 117),
      timezone: seg.timezone,
      storage,
    });
    const cursors = g.getCursors();
    assert.ok(cursors.length > 117, `expected >117 cursors, got ${cursors.length}`);
    assert.deepEqual(cursors[114], [32, 17, 1]);
    assert.deepEqual(cursors[115], [34, 17, 1]);
    assert.deepEqual(cursors[116], [25, 9, 1]);
    assert.deepEqual(cursors[117], [29, 9, 1]);
  });
});
