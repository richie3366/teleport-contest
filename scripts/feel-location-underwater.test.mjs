import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { feel_location } from "../js/display.js";
import { ROOM } from "../js/const.js";

// C ref: display.c feel_location `:769–772` — Underwater (youprop.h:279
// ≡ u.uinwater) off the water level: only pool/lava/ice squares are
// felt; anything else returns before set_seenv. JS must test the live
// `u.uinwater` (writer set_uinwater, hack.js) — `u.Underwater` is never
// written port-wide, so gating on it is a dead gate (review 2348).
// Observable: the C `:769` return leaves lev->seenv untouched.
describe("feel_location Underwater gate (display.c:769-772)", () => {
  let saved, loc;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      water_level: game.water_level,
      head_engr: game.head_engr,
    };
    loc = { typ: ROOM, seenv: 0 };
    game.u = { ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      traps: [],
      at: (x, y) => (x === 10 && y === 10 ? loc : null),
    };
    game.water_level = undefined; // off the water level
    game.head_engr = null;
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.water_level = saved.water_level;
    game.head_engr = saved.head_engr;
  });

  it("returns before set_seenv when u.uinwater is set (live field)", () => {
    game.u.uinwater = 1;
    feel_location(10, 10);
    assert.equal(loc.seenv, 0);
  });

  it("ignores the never-written u.Underwater alias (proceeds to set_seenv)", () => {
    game.u.uinwater = 0;
    game.u.Underwater = 1;
    feel_location(10, 10);
    assert.notEqual(loc.seenv, 0);
  });

  it("proceeds when neither field is set", () => {
    feel_location(10, 10);
    assert.notEqual(loc.seenv, 0);
  });
});
