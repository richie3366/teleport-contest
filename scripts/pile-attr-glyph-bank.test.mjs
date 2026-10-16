import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

// C ref: wintty.c tty_print_glyph `:3930–3936` + display.c reset_glyphmap
// `:2788–2835` — MG_OBJPILE / MG_FEMALE are baked on piletop + statue-bank
// glyph ids at reset; the tty inverse reads the PAINTED id's flags, never
// live floor objects or a side field. JS derived memory-paint attr from
// the live pile / the objpile field instead, so a pile under a remembered
// trap/stone took spurious inverse (Monk-51150047 s86 `^`, Wizard-50255072
// s187 blanks via docrt show_memory_glyph), while a restored piletop id
// without the field lost it (Knight-50450039 s720 `?` via show_map_spot
// `:1410–1413` oldglyph restore after ^F wiz_map). Three prefixes in one
// file (each runSegment resets; outputs match the committed board rows).

function loadSeg(recipeName) {
  for (const d of ["recipes", "recipes-reserve"]) {
    try {
      return JSON.parse(readFileSync(
        new URL(`../hidden-corpus/${d}/${recipeName}.recipe.json`, import.meta.url), "utf8")).segments[0];
    } catch { /* try next dir */ }
  }
  throw new Error(`no recipe ${recipeName}`);
}

async function runPrefix(recipeName, nkeys) {
  const seg = loadSeg(recipeName);
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
    moves: seg.moves.slice(0, nkeys), storage,
  });
  return handle.getScreens?.() || [];
}

function cellAt(screens, step, r, c) {
  assert.ok(screens.length > step, `expected ${step + 1}+ screens, got ${screens.length}`);
  return decodeScreen(screens[step])[r][c];
}

describe("memory paint pile-inverse derives from the glyph bank (tty_print_glyph:3930-3936)", () => {
  it("Knight-50450039 s720 doorway keeps piletop inverse after ^F restore", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Knight-50450039", 720);
    const cell = cellAt(screens, 720, 15, 8);
    assert.equal(cell.ch, "?", `ch: ${JSON.stringify(cell)}`);
    assert.equal(cell.color, 15, `color: ${JSON.stringify(cell)}`);
    assert.ok((cell.attr & 1) === 1, `expected inverse piletop, got ${JSON.stringify(cell)}`);
  });
  it("Monk-51150047 s86 trap over hidden pile paints plain", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Monk-51150047", 86);
    const cell = cellAt(screens, 86, 18, 12);
    assert.equal(cell.ch, "^", `ch: ${JSON.stringify(cell)}`);
    assert.equal(cell.color, 12, `color: ${JSON.stringify(cell)}`);
    assert.ok((cell.attr & 1) === 0, `expected plain trap, got ${JSON.stringify(cell)}`);
  });
  it("Wizard-50255072 s187 blanks over hidden piles paint plain", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Wizard-50255072", 187);
    for (const [r, c] of [[7, 30], [17, 62]]) {
      const cell = cellAt(screens, 187, r, c);
      assert.equal(cell.ch, " ", `ch at r${r}c${c}: ${JSON.stringify(cell)}`);
      assert.ok((cell.attr & 1) === 0, `expected plain blank at r${r}c${c}, got ${JSON.stringify(cell)}`);
    }
  });
  it("Valkyrie-50155041 s133 engraved corridor paints plain under Amiga", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Valkyrie-50155041", 133);
    const cell = cellAt(screens, 133, 7, 55);
    assert.equal(cell.ch, "#", `ch: ${JSON.stringify(cell)}`);
    assert.equal(cell.color, 12, `color: ${JSON.stringify(cell)}`);
    assert.ok((cell.attr & 1) === 0, `expected plain engrcorr, got ${JSON.stringify(cell)}`);
  });
  it("glyph_bank_attr: piletop banks inverse, trap/stone/single plain", async () => {
    const disp = await import("../js/display.js");
    const gs = await import("../js/gstate.js");
    gs.game.iflags = { hilite_pile: true, wc_inverse: true };
    const { ATR_INVERSE } = await import("../js/terminal.js");
    assert.equal(disp.glyph_bank_attr(disp.GLYPH_OBJ_PILETOP_OFF + 336), ATR_INVERSE, "recorded piletop-spbook 8328");
    assert.equal(disp.glyph_bank_attr(4045), 0, "recorded Monk trap id");
    assert.equal(disp.glyph_bank_attr(3929), 0, "recorded Wizard stone id");
    assert.equal(disp.glyph_bank_attr(disp.GLYPH_OBJ_OFF + 336), 0, "single obj");
    gs.game.iflags = {};
  });
});
