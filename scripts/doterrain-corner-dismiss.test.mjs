import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

// C ref: cmd.c doterrain `:1098–1191` + wintty.c erase_menu_or_text
// `:965–984` corner (offx!=0) arm → docorner (gbuf resend, no
// newsym/display-RNG burns), never full docrt(). Pre-fix JS called
// docrt() on menu dismiss: its vision_recalc(0)+see_monsters repainted
// a visible hallucinated monster twice before the once-per-input Hallu
// arm's third paint (titan H, display draw #23); C paints once (fire
// elemental E, draw #21). Pins the machine-recorded C expectation
// (hidden-corpus/scoreboard.json reveal_terrain rowDiff) via the
// committed recipe prefix through the #terrain pick (moves[134]='c').
describe("doterrain corner-menu dismiss (cmd.c:1098-1191)", () => {
  it("replays scen-trap-Wizard-94001 through the #terrain pick with C's E", async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-trap-Wizard-94001.recipe.json", import.meta.url), "utf8"));
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
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves.slice(0, 135), storage,
    });
    const screens = game.getScreens?.() || [];
    assert.ok(screens.length > 0, "expected captured screens");
    const g = decodeScreen(String(screens[screens.length - 1] || ""));
    const row17 = g[17].map(renderCell).join("");
    assert.match(row17, /│E···\+/, `row 17 shows C's E (got ${JSON.stringify(row17)})`);
  });
});
