import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen } = await import(pathToFileURL(
  join(ROOT, "frozen", "screen-decode.mjs")).href);

// C ref: mkmaze.c setup_waterlevel (`glyph = cmap_to_glyph(S_water)`,
// `:1834-1835`) + movebubbles water_pos (`cmap_b_to_glyph(S_water)`).
// C stores the integer glyph id; the tty resolves at paint time through
// the live symset — DECgraphics shows S_water as meta-` diamond
// (dat/symbols), ASCII as '}'. JS froze the ASCII '}' with decgfx:false
// in both stores, so the Plane of Water arrival rendered 1645 '}' cells
// where C shows diamonds (scen-tour-Tourist-92100 s132).
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

describe("Plane of Water renders S_water via the live symset", () => {
  it("shows DEC diamonds like C (Tourist-92100 s132)", async () => {
    const g = await replayTo("scen-tour-Tourist-92100", 132);
    const screens = g.getScreens();
    assert.ok(screens.length > 132, `expected >132 screens, got ${screens.length}`);
    const grid = decodeScreen(screens[132]);
    // First map row is open water on both sides (above bubble range).
    // C: \x1b[94m\x0e``…\x0f — bright blue, DEC span, diamond. JS emits
    // the raw diamond letter with no span (the frozen DEC_MAP has no
    // backtick entry, so spanned and raw render identically — the same
    // raw-letter precedent as the LADDER y/z and ALTAR { arms, kept raw
    // by _paint_gbuf_cell's blocklist). Pin ch + color only: decgfx is
    // unobservable for backtick and path-dependent.
    for (let c = 38; c <= 42; c++) {
      const cell = grid[1][c];
      assert.equal(cell.ch, "`", `grid[1][${c}].ch`);
      assert.equal(cell.color, 12, `grid[1][${c}].color (bright blue)`);
    }
  });
});
