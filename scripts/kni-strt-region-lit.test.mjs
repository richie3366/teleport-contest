import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import(pathToFileURL(
  join(ROOT, "frozen", "screen-decode.mjs")).href);

// C ref: sp_lev.c lspo_region string arm `:5618-5637` —
// region(selection, "lit") grows the selection by W_ANY (`:5630-5631`)
// before sel_set_lit, so the lit rect's wall ring is lit too.
// Kni-strt.lua :40 des.region(area(27,06,43,09), "lit") lights the east
// room's walls; after the level flip they are the arrival room's north
// wall at map (21-29,8). C scen-quest-Knight-94336 step 41 shows
// ┌───────┐ there; JS painted blank (raw rect, no grow).
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

// geom-probe mapping: map (x,y) -> grid[y+1][x-1].
function cellAt(grid, x, y) {
  return renderCell(grid[y + 1][x - 1]);
}

describe("Kni-strt string-form region lit grows over walls", () => {
  it("shows the arrival room north wall like C (Knight-94336 s41)", async () => {
    const g = await replayTo("scen-quest-Knight-94336", 41);
    const screens = g.getScreens();
    assert.ok(screens.length > 41, `expected >41 screens, got ${screens.length}`);
    const grid = decodeScreen(screens[41]);
    // C row: ┌───────┐ at map x21-29, y8. Interior span must be ─.
    for (let x = 22; x <= 28; x++) {
      assert.equal(cellAt(grid, x, 8), "─", `map (${x},8)`);
    }
    // Control: x20 stays unseen both sides (outside the grown rect).
    assert.equal(cellAt(grid, 20, 8), " ");
  });
});
