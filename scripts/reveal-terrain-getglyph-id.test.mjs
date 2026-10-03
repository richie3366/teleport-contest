import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  reveal_terrain_getglyph,
  cmap_to_glyph,
  back_to_glyph,
  GLYPH_UNEXPLORED,
} from "../js/display.js";
import {
  STAIRS, ROOM, SVALL, TER_MAP, TER_TRP, TER_OBJ, S_brupstair,
} from "../js/const.js";

// C ref: detect.c reveal_terrain_getglyph `:2166–2288` — `glyph` starts as
// glyph_at(x, y) and every strip arm re-derives an int, so the returned
// id is gbuf state that lookat reads during browse. JS must carry the
// int id on every unclassified arm: a dropped id paints NO_GLYPH, which
// lookat reports as "unexplored area" (scen-terrain-Tourist-94120 step 97:
// branch staircase up described as unexplored area).
const SUBSET = TER_MAP | TER_TRP | TER_OBJ; // #terrain menu 'c'
const DEFAULT = { ch: " ", color: 0, dec: false };
const X = 42, Y = 15;

describe("reveal_terrain_getglyph id threading (detect.c:2166-2288)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, level: game.level, fmon: game.fmon,
      iflags: game.iflags, lastseentyp: game.lastseentyp,
    };
    game.u = { ux: 1, uy: 0 };
    game.fmon = [];
    game.iflags = {};
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.iflags = saved.iflags;
    game.lastseentyp = saved.lastseentyp;
  });

  const mklevel = (loc, hero_memory = true) => {
    game.level = {
      at: (x, y) => (x === X && y === Y ? loc : null),
      flags: { hero_memory },
      traps: [],
    };
  };

  it("keeps the remembered id for a plain remembered terrain cell", () => {
    const stairsId = cmap_to_glyph(S_brupstair);
    const loc = {
      typ: STAIRS, seenv: SVALL, ladder: 1,
      remembered_glyph: { ch: "<", color: 11, dec: false, glyph: stairsId },
    };
    mklevel(loc);
    const g = reveal_terrain_getglyph(X, Y, 0, DEFAULT, SUBSET);
    assert.equal(g.ch, "<");
    assert.equal(g.glyph, stairsId);
  });

  it("paints GLYPH_UNEXPLORED for a never-seen cell, not the stone default", () => {
    const loc = { typ: 0, seenv: 0 };
    mklevel(loc);
    const g = reveal_terrain_getglyph(X, Y, 0, DEFAULT, SUBSET);
    assert.equal(g.glyph, GLYPH_UNEXPLORED);
  });

  it("attaches back_to_glyph for a seen cell with no memory", () => {
    const loc = { typ: ROOM, seenv: SVALL, lit: 1, waslit: 1, roomno: 1 };
    mklevel(loc);
    const g = reveal_terrain_getglyph(X, Y, 0, DEFAULT, SUBSET);
    assert.equal(g.glyph, back_to_glyph(X, Y));
  });
});
