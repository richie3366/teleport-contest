import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

// C ref: wintty.c tty_print_glyph — a detected/tame rogue ghost paints its
// ' ' mlet cell with ATR_INVERSE, and the tty row emission keeps trailing
// attr-carrying spaces (C bytes `\x1b[7m \x1b[0m` at row end). JS
// serialize_for_scoring stopped lastCol at the last non-space glyph, so a
// trailing inverse ghost cell never reached the scored screen (level_tele
// arrival, Detect_monsters active). firstCol already keeps attr-spaces
// (D-0129/D-0932); lastCol must mirror it.
// Single prefix per file (multi-prefix runSegment leaks module state).
describe("serialize_for_scoring keeps trailing attr spaces", () => {
  it("scen-sweep-Caveman-50350081 step 471: inverse ghost space at row 19", { timeout: 240000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Caveman-50350081.recipe.json", import.meta.url), "utf8"));
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
    // Steps 0..471 consume 471 moves chars (recorded step keys concatenated).
    const g = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 471), storage,
    });
    const screens = g.getScreens?.() || [];
    assert.ok(screens.length > 471, `expected 472+ screens, got ${screens.length}`);
    // C screen 471 row 19: `\x1b[34C.@. \x1b[7m \x1b[0m` — the rogue ghost
    // (map 39,18) under Detect_monsters paints inverse ' ' past the last
    // floor glyph. Byte-identical to the C recording.
    const row19 = (screens[471] || "").split("\n")[19];
    assert.equal(row19, "\x1b[34C.@. \x1b[7m \x1b[0m",
      `step 471 row 19: want C bytes, got ${JSON.stringify(row19)}`);
    const grid = decodeScreen(screens[471]);
    assert.equal(grid[19][38].ch, " ");
    assert.equal(grid[19][38].attr & 1, 1,
      `step 471 screen(38,19): want inverse, got ${JSON.stringify(grid[19][38])}`);
  });
});
