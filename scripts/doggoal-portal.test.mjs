import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dog_goal } from "../js/dogmove.js";
import { MAGIC_PORTAL, ROOM, COULD_SEE } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: dogmove.c dog_goal `:591–603` — with appr still 0 (close,
// not fleeing, no stairs, no carried dog food), a magic portal within
// distu <= 2 of the hero makes the pet approach (appr 1).
// JS split C's gf.ftrap chain: maketrap pushes the live level.traps
// array and leaves game.ftrap null on fresh levels, but dog_goal
// walked only game.ftrap — blind to wished portals (scen-trap
// Valkyrie-94361/Caveman-94281: C appr 1 via the portal at the hero's
// old square, JS appr 0, first divergence in dog_move selection).
// Pins the doidtrap-union fix (D-3411 sibling): gf-shaped store
// first, then level.traps, deduped; first portal decides.
describe("dog_goal magic-portal arm (live trap store)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      fobj: game.fobj,
      invent: game.invent,
      ftrap: game.ftrap,
      viz: game.viz_array,
      moves: game.moves,
    };
    game.u = { ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      at: () => ({ typ: ROOM }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
    game.fobj = null;
    game.invent = [];
    game.ftrap = null;
    game.viz_array = [];
    game.moves = 100;
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.fobj = saved.fobj;
    game.invent = saved.invent;
    game.ftrap = saved.ftrap;
    game.viz_array = saved.viz;
    game.moves = saved.moves;
  });

  // Pet adjacent to hero (udist 1: skips the rn2(4) gate, no RNG),
  // in the master's sight (skips the gettrack branch).
  const petAt = (mx, my) => {
    game.viz_array[my] = game.viz_array[my] || [];
    game.viz_array[my][mx] = COULD_SEE;
    return {
      mx, my, mconf: 0, mflee: 0, mleashed: 0, mtame: 1, isminion: 0,
      mcansee: 1, m_lev: 3, mhp: 10, mhpmax: 10, mw: null, minvent: null,
      data: { mlet: "S_DOG", mflags1: 0, mflags2: 0, mflags3: 0 },
    };
  };
  const edog = () => ({
    apport: 10, hungrytime: 2000, whistletime: 0, mhpmax_penalty: 0,
    ogoal: { x: 0, y: 0 },
  });
  const portalAt = (tx, ty) => ({
    ttyp: MAGIC_PORTAL, tx, ty, tseen: 0, ntrap: null,
  });

  it("portal in level.traps within 2 approaches (appr 1)", async () => {
    game.level.traps = [portalAt(11, 10)]; // dist 1, game.ftrap null
    const appr = await dog_goal(petAt(10, 9), edog(), 0, 1, 0);
    assert.equal(appr, 1);
  });

  it("portal in level.traps beyond 2 stays put (appr 0)", async () => {
    game.level.traps = [portalAt(14, 10)]; // dist 16
    const appr = await dog_goal(petAt(10, 9), edog(), 0, 1, 0);
    assert.equal(appr, 0);
  });

  it("portal on the ftrap chain still counts (restore shape)", async () => {
    game.ftrap = portalAt(10, 11); // dist 1, level.traps empty
    const appr = await dog_goal(petAt(10, 9), edog(), 0, 1, 0);
    assert.equal(appr, 1);
  });

  it("no portal anywhere stays put (appr 0)", async () => {
    const appr = await dog_goal(petAt(10, 9), edog(), 0, 1, 0);
    assert.equal(appr, 0);
  });
});
