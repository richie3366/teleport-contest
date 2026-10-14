import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  parseNethackrc, count_menucolors, free_one_menu_coloring,
} from "../js/options.js";

// C refs: cfgfiles.c cnf_line_MENUCOLOR `:1164–1166` + config_line_stmt
// CNFL_N(MENUCOLOR, 9) `:1365` (full name, case-insensitive, bufp = text
// after the first '='). Pins the startup rc reader's MENUCOLOR arm: a
// top-level MENUCOLOR= line must reach the live add_menu_coloring — the
// O-menu "k - menu colors [(N currently set)]" row and the use_menu_color
// flag both derive from the coloring list (scen-symset step 3–5: C 1 vs
// JS 0 when the line was dropped).
const clearColors = () => {
  let n = 0;
  while (count_menucolors() > 0 && n++ < 50) free_one_menu_coloring(0);
};

describe("MENUCOLOR rc parse (cfgfiles.c cnf_line_MENUCOLOR)", () => {
  let savedIflags;
  beforeEach(() => {
    savedIflags = game.iflags;
    game.iflags = { use_menu_color: false };
    clearColors();
  });
  afterEach(() => {
    clearColors();
    game.iflags = savedIflags;
  });

  it("top-level MENUCOLOR line adds one coloring + sets use_menu_color", () => {
    parseNethackrc('MENUCOLOR="cursed"=brown');
    assert.equal(count_menucolors(), 1);
    assert.equal(game.iflags.use_menu_color, true);
  });

  it("malformed MENUCOLOR (no value '=') adds nothing (C :626–628)", () => {
    parseNethackrc("MENUCOLOR=novaluecolorhere");
    assert.equal(count_menucolors(), 0);
    assert.equal(game.iflags.use_menu_color, false);
  });
});
