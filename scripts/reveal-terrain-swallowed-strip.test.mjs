import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  reveal_terrain_getglyph,
  back_to_glyph,
  GLYPH_OBJ_OFF,
  GLYPH_TRAP_OFF,
} from "../js/display.js";
import {
  STAIRS, SVALL, TER_MAP, TER_TRP, TER_OBJ,
} from "../js/const.js";

// C ref: detect.c reveal_terrain_getglyph `:2210–2225` — the swallowed
// hero reads memory (`:2210`), but C still classifies that int:
// object/trap/invisible memory takes the `:2219–2224` restore + `:2225+`
// strip arms like the displayed glyph. JS skipped classification in the
// swallowed path, so a remembered weapon leaked through the terrain
// draw unstripped (scen-engulf-Archeologist-94292 step 252: ')' vs '<').
const SUBSET = TER_MAP | TER_TRP; // #terrain menu 'b'
const SUBSET_OBJ = TER_MAP | TER_TRP | TER_OBJ; // #terrain menu 'c'
const DEFAULT = { ch: " ", color: 0, dec: false };
const X = 42, Y = 15;

describe("reveal_terrain_getglyph swallowed strip (detect.c:2210-2225)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, level: game.level, fmon: game.fmon,
      iflags: game.iflags, lastseentyp: game.lastseentyp,
      regions: game.regions,
    };
    game.u = { ux: 1, uy: 0 };
    game.fmon = [];
    game.iflags = {};
    game.regions = [];
    game.lastseentyp = { [X]: { [Y]: STAIRS } };
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.iflags = saved.iflags;
    game.lastseentyp = saved.lastseentyp;
    game.regions = saved.regions;
  });

  const mklevel = (loc, hero_memory = true) => {
    game.level = {
      at: (x, y) => (x === X && y === Y ? loc : null),
      flags: { hero_memory },
      traps: [],
    };
  };
  const stairsLoc = (remembered_glyph) => ({
    typ: STAIRS, seenv: SVALL, ladder: 1, remembered_glyph,
  });

  it("strips a remembered weapon to stairs when swallowed without TER_OBJ", () => {
    mklevel(stairsLoc({ ch: ")", color: 3, dec: false, glyph: GLYPH_OBJ_OFF + 82 }));
    const g = reveal_terrain_getglyph(X, Y, 1, DEFAULT, SUBSET);
    assert.equal(g.ch, "<");
    assert.equal(g.glyph, back_to_glyph(X, Y));
  });

  it("keeps the remembered weapon when swallowed with TER_OBJ", () => {
    mklevel(stairsLoc({ ch: ")", color: 3, dec: false, glyph: GLYPH_OBJ_OFF + 82 }));
    const g = reveal_terrain_getglyph(X, Y, 1, DEFAULT, SUBSET_OBJ);
    assert.equal(g.ch, ")");
  });

  it("keeps remembered trap memory when swallowed with TER_TRP", () => {
    mklevel(stairsLoc({ ch: "^", color: 1, dec: false, glyph: GLYPH_TRAP_OFF + 1 }));
    const g = reveal_terrain_getglyph(X, Y, 1, DEFAULT, SUBSET);
    assert.equal(g.ch, "^");
  });

  it("strips remembered trap memory to stairs when swallowed without TER_TRP", () => {
    mklevel(stairsLoc({ ch: "^", color: 1, dec: false, glyph: GLYPH_TRAP_OFF + 1 }));
    const g = reveal_terrain_getglyph(X, Y, 1, DEFAULT, TER_MAP);
    assert.equal(g.ch, "<");
  });
});
