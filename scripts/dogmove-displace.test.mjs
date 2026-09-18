import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { should_displace, undesirable_disp } from "../js/monmove.js";
import { ALLOW_M, ALLOW_MDISP } from "../js/const.js";
import { ROOM } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: monmove.c should_displace `:1070–1104` + undesirable_disp
// `:2277–2312` (queue row `dogmove.c` dog_move — the ALLOW_MDISP displace
// arm and its better_with_displacing gate were absent: pets never swapped
// with blocking monsters even when C does).
// Pins the RNG-free branches headless: displace-only-closest wins, plain
// closer loses, pets refuse cursed piles, plain accessible squares pass.
describe("dog_move displace gate (monmove.c should_displace/undesirable_disp)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      objects: game._objects_at,
      moves: game.moves,
    };
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
    game._objects_at = new Map();
    game.moves = 1000;
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game._objects_at = saved.objects;
    game.moves = saved.moves;
  });

  const petAt = (mx, my) => ({
    mx, my, mux: 5, muy: 5, mcansee: 1, mconf: 0,
    m_lev: 5, mhp: 20, mhpmax: 20, mtame: 1, isminion: 0,
    data: { mlet: "S_DOG", msound: 0, mflags1: 0 },
  });

  it("displace-only closest square wins (should_displace true)", () => {
    const pet = petAt(10, 10);
    const blocker = petAt(10, 11);
    blocker.mtame = 0;
    game.fmon = [blocker];
    // C: MON_AT + MDISP - M + desirable → with-branch; (12,12) empty plain.
    const data = {
      cnt: 2,
      poss: [{ x: 10, y: 11 }, { x: 12, y: 12 }],
      info: [ALLOW_MDISP, 0],
    };
    // goal (10,12): displace dist 1 < plain dist 4.
    assert.equal(should_displace(pet, data, 10, 12), true);
  });

  it("closer plain square keeps displacement off (should_displace false)", () => {
    const pet = petAt(10, 10);
    const blocker = petAt(10, 11);
    blocker.mtame = 0;
    game.fmon = [blocker];
    const data = {
      cnt: 2,
      poss: [{ x: 10, y: 11 }, { x: 12, y: 12 }],
      info: [ALLOW_MDISP, 0],
    };
    // goal (12,13): plain dist 1 < displace dist 8, plain exists.
    assert.equal(should_displace(pet, data, 12, 13), false);
  });

  it("pet refuses a cursed pile (undesirable_disp true, no RNG)", () => {
    const pet = petAt(10, 10);
    game._objects_at.set("10,11", { cursed: true, nexthere: null });
    assert.equal(undesirable_disp(pet, 10, 11), true);
  });

  it("pet accepts a plain accessible square (undesirable_disp false)", () => {
    const pet = petAt(10, 10);
    assert.equal(undesirable_disp(pet, 10, 11), false);
  });
});
