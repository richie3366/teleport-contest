import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { show_map_spot } from "../js/detect.js";
import {
  glyph_is_trap,
  GLYPH_TRAP_OFF,
  NO_GLYPH,
} from "../js/display.js";
import { ROOM, SCORR, CORR } from "../js/const.js";

// C ref: detect.c show_map_spot `:1371–1419` — during mapping, furniture
// takes precedence over traps, which take precedence over objects,
// opposite to normal vision (`:1389–1395`). When the cell showed a
// trap or object glyph and neither a seen trap nor an engraving claims
// it, C repaints the old glyph and stores it as hero memory
// (`:1410–1413`). JS used to drop the arm ("restore deferred"), so a
// mapped trap/object cell kept whatever newsym painted (floor).
describe("show_map_spot oldglyph trap/object restore (detect.c:1410-1413)", () => {
  let savedU, savedLevel, savedViz, savedFtraps, savedEngr;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
    savedViz = game.viz_array;
    savedFtraps = game.ftrap;
    savedEngr = game.head_engr;
    game.u = { ux: 10, uy: 10 };
    game.viz_array = [];
    game.ftrap = [];
    game.head_engr = null;
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
    game.viz_array = savedViz;
    game.ftrap = savedFtraps;
    game.head_engr = savedEngr;
  });

  const X = 12, Y = 10;
  const mklevel = (loc, hero_memory = true) => {
    game.level = { at: () => loc, flags: { hero_memory } };
  };
  // A room cell whose gbuf shows a trap glyph, with no trap struct
  // (tseen arm cannot fire) and no engraving.
  const trapShownLoc = () => ({
    typ: ROOM, seenv: 0, roomno: 0, lit: 1, waslit: 1,
    disp_glyph: GLYPH_TRAP_OFF, disp_ch: "^", disp_color: 1,
    disp_decgfx: false,
  });

  it("repaints the shown trap glyph and stores it as memory", () => {
    assert.equal(glyph_is_trap(GLYPH_TRAP_OFF), true);
    const loc = trapShownLoc();
    mklevel(loc);
    show_map_spot(X, Y, false);
    assert.equal(loc.seenv & 0xff, loc.seenv); // SVALL store is numeric
    assert.equal(loc.disp_glyph, GLYPH_TRAP_OFF);
    assert.equal(loc.disp_ch, "^");
    assert.ok(loc.remembered_glyph);
    assert.equal(loc.remembered_glyph.glyph, GLYPH_TRAP_OFF);
  });

  it("repaints without storing memory when hero_memory is off", () => {
    const loc = trapShownLoc();
    mklevel(loc, false);
    show_map_spot(X, Y, false);
    assert.equal(loc.disp_glyph, GLYPH_TRAP_OFF);
    assert.equal(loc.remembered_glyph, undefined);
  });

  it("uncovers secret corridors via unblock_point", () => {
    const loc = {
      typ: SCORR, seenv: 0, roomno: 0, lit: 0, waslit: 0,
      disp_glyph: NO_GLYPH,
    };
    mklevel(loc);
    show_map_spot(X, Y, false);
    assert.equal(loc.typ, CORR);
  });
});
