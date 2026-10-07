import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

// C ref: options.c handler_paranoid_confirmation `:5952–6008` +
// wintty.c tty_end_menu `:2680–2690`: a non-null end_menu prompt is
// prepended as two items — the prompt in tty_menu_promptstyle
// (= iflags.menu_headings, default ATR_INVERSE) then a blank
// separator — so the tty menu shows the inverse prompt on row 0, a
// blank row 1, and the first item on row 2. Pins the
// machine-recorded C expectation (scen-options-Barbarian-94251
// step 40 rowDiff: C prompt attr=1, JS attr=0 with items shifted
// one row up) by replaying the committed recipe and scanning for
// the open menu screen.
describe("paranoid_confirmation menu prompt style (options.c:5992, wintty.c:2680-2690)", () => {
  it("paints the end_menu prompt inverse with a blank row after it", async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-options-Barbarian-94251.recipe.json", import.meta.url), "utf8"));
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
      moves: seg.moves, storage,
    });
    const screens = game.getScreens?.() || [];
    assert.ok(screens.length > 0, "expected captured screens");
    const PROMPT = "Actions requiring extra confirmation:";
    let found = null;
    for (const s of screens) {
      const g = decodeScreen(String(s || ""));
      const row0 = g[0].map(renderCell).join("");
      if (row0.includes(PROMPT)) { found = g; break; }
    }
    assert.ok(found, "expected an open paranoia-menu screen");
    const row0 = found[0];
    const start = row0.map(renderCell).join("").indexOf(PROMPT);
    assert.ok(start >= 0, "prompt text on row 0");
    for (let c = start; c < start + PROMPT.length; c++) {
      assert.equal(row0[c].attr & 1, 1,
        `prompt cell col ${c} carries inverse (got attr ${row0[c].attr})`);
    }
    const row1 = found[1].map(renderCell).join("");
    assert.match(row1, /^ *$/, `row 1 is the blank separator (got ${JSON.stringify(row1)})`);
    const row2 = found[2].map(renderCell).join("");
    assert.match(row2, /C - for "yes" confirmations/,
      `first item sits on row 2 (got ${JSON.stringify(row2)})`);
  });
});
