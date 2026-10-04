import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { m_canseeu } from "../js/mondata.js";
import { COULD_SEE } from "../js/const.js";

// C ref: include/vision.h m_canseeu `:50–53` — (!Invis || perceives) &&
// !Underwater && couldsee. Underwater ≡ u.uinwater (youprop.h:279); the
// `u.Underwater` flat is never written port-wide, so gating on it is a
// dead gate (review 2358, Must-fix). JS must test the live `u.uinwater`.
describe("m_canseeu Underwater gate (vision.h:50-53)", () => {
  let savedU, savedViz;
  const mon = () => ({ data: { mflags1: 0 }, mx: 10, my: 10 });
  beforeEach(() => {
    savedU = game.u;
    savedViz = game.viz_array;
    game.u = { ux: 8, uy: 8, uz: { dnum: 0, dlevel: 1 } };
    game.viz_array = [];
    game.viz_array[10] = [];
    game.viz_array[10][10] = COULD_SEE;
  });
  afterEach(() => {
    game.u = savedU;
    game.viz_array = savedViz;
  });

  it("returns false when u.uinwater is set (live field)", () => {
    game.u.uinwater = 1;
    assert.equal(m_canseeu(mon()), false);
  });

  it("ignores the never-written u.Underwater alias (sees via couldsee)", () => {
    game.u.uinwater = 0;
    game.u.Underwater = 1;
    assert.equal(m_canseeu(mon()), true);
  });

  it("sees when neither field is set and the square is visible", () => {
    assert.equal(m_canseeu(mon()), true);
  });

  it("defers to couldsee when neither field is set and it is not", () => {
    game.viz_array[10][10] = 0;
    assert.equal(m_canseeu(mon()), false);
  });
});
