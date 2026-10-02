import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import {
  exercise, A_STR, A_INT, A_WIS, A_DEX, A_CON, A_CHA,
} from "../js/attrib.js";

// C ref: attrib.c exercise `:489–518` — INT/CHA + polymorph guards, then
// |AEXE| < AVAL (50) gates exactly one draw: rn2(19) on the inc arm,
// rn2(2) on the dec arm. Pins the headless draw envelope of the port;
// the two corpus writers it anchors (nh_timeout mtimedone order,
// thitu lifesave fallthrough) run through done()/game-over state, so
// they are covered by session verify (scen-death-Tourist-92095,
// scen-dig-Knight-94015), not here.
describe("exercise guards and AEXE gate (attrib.c:489-518)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u };
    initRng(77031);
    enableRngLog();
    game.u = {
      umonnum: 1,
      umonster: 1,
      acurr: { a: [10, 10, 10, 10, 10, 10] },
      aexe: { a: [0, 0, 0, 0, 0, 0] },
    };
  });
  afterEach(() => {
    game.u = saved.u;
  });

  it("INT/CHA never draw (C :492-493)", () => {
    exercise(A_INT, true);
    exercise(A_CHA, false);
    assert.equal(getRngLog().length, 0);
    assert.deepEqual(game.u.aexe.a, [0, 0, 0, 0, 0, 0]);
  });

  it("inc arm draws exactly rn2(19) with open gate (C :509)", () => {
    exercise(A_STR, true);
    const log = getRngLog();
    assert.equal(log.length, 1);
    assert.match(log[0], /^rn2\(19\)=/);
  });

  it("dec arm draws exactly rn2(2) with open gate (C :509)", () => {
    exercise(A_CON, false);
    const log = getRngLog();
    assert.equal(log.length, 1);
    assert.match(log[0], /^rn2\(2\)=/);
  });

  it("|AEXE| >= AVAL closes the gate draw-free (C :499)", () => {
    game.u.aexe.a[A_DEX] = -50;
    exercise(A_DEX, true);
    game.u.aexe.a[A_DEX] = 50;
    exercise(A_DEX, false);
    assert.equal(getRngLog().length, 0);
  });

  it("poly non-WIS returns draw-free, WIS still draws (C :496)", () => {
    game.u.umonnum = 999; // != umonster -> Upolyd
    exercise(A_STR, true);
    assert.equal(getRngLog().length, 0);
    exercise(A_WIS, true);
    assert.equal(getRngLog().length, 1);
  });
});
