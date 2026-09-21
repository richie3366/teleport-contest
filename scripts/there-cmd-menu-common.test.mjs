import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { there_cmd_menu_common } from "../js/cmd.js";
import { game } from "../js/gstate.js";
import { CLICK_1, CLICK_2, MALE } from "../js/const.js";
import { monnum_to_glyph, NO_GLYPH } from "../js/display.js";

// C ref: cmd.c there_cmd_menu_common `:4638–4654` — shared "Look at map
// symbol" entry on CLICK_1/CLICK_2 when `!u_at || Upolyd ||
// glyph_at != hero_glyph`. The glyph arm (self shown as non-hero, e.g.
// invisible w/o see-invisible) was the missing disjunct; these pins hold
// all three C disjuncts plus the mod gate headless.
describe("there_cmd_menu_common (cmd.c:4638-4654)", () => {
  let saved;
  let dispGlyph;
  beforeEach(() => {
    saved = {
      u: game.u,
      flags: game.flags,
      urace: game.urace,
      level: game.level,
    };
    dispGlyph = NO_GLYPH;
    game.flags = { showrace: true, female: false };
    game.urace = { mnum: 7 };
    game.level = { at: () => ({ disp_glyph: dispGlyph }) };
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
    game.urace = saved.urace;
    game.level = saved.level;
  });

  const heroGlyph = () => monnum_to_glyph(7, MALE).glyph;

  it("adds nothing when mod is neither CLICK_1 nor CLICK_2", () => {
    game.u = { ux: 5, uy: 5, umonnum: 7, umonster: 7 };
    assert.deepEqual(there_cmd_menu_common(9, 9, 0), []);
  });

  it("adds the entry for a non-self cell (!u_at arm)", () => {
    game.u = { ux: 5, uy: 5, umonnum: 7, umonster: 7 };
    const items = there_cmd_menu_common(9, 9, CLICK_1);
    assert.equal(items.length, 1);
    assert.equal(items[0].text, "Look at map symbol");
  });

  it("adds the entry when self and polymorphed (Upolyd arm)", () => {
    game.u = { ux: 5, uy: 5, umonnum: 3, umonster: 7 };
    const items = there_cmd_menu_common(5, 5, CLICK_2);
    assert.equal(items.length, 1);
    assert.equal(items[0].text, "Look at map symbol");
  });

  it("adds nothing when self, unpolyed, glyph is the hero glyph", () => {
    game.u = { ux: 5, uy: 5, umonnum: 7, umonster: 7 };
    dispGlyph = heroGlyph();
    assert.deepEqual(there_cmd_menu_common(5, 5, CLICK_1), []);
  });

  it("adds the entry when self, unpolyed, glyph differs (glyph arm)", () => {
    game.u = { ux: 5, uy: 5, umonnum: 7, umonster: 7 };
    dispGlyph = NO_GLYPH;
    assert.notEqual(NO_GLYPH, heroGlyph());
    const items = there_cmd_menu_common(5, 5, CLICK_1);
    assert.equal(items.length, 1);
    assert.equal(items[0].text, "Look at map symbol");
  });
});
