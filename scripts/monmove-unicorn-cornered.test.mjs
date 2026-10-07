import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { m_move } from "../js/monmove.js";
import {
  ROOM, VWALL, MMOVE_MOVED, MMOVE_NOMOVES,
} from "../js/const.js";
import { M2_JEWELS } from "../js/monsters.js";

// C ref: monmove.c m_move `:1926` + `:2064–2067` (scen-sokoban-Monk-94143
// step 59, scen-sokoban-Samurai-94163 step 46: C draws rn2(2)@m_move:2064
// for a boxed zoo unicorn while JS returns NOMOVES from an extra
// `if (cnt === 0)` gate C does not have). Pins the headless envelope: a
// cornered unicorn (mfndpos cnt 0) falls through to the rn2(2) teleport
// arm — never NOMOVES — and a failed rloc still returns MOVED (C casts
// the result to void).
describe("cornered unicorn falls through to the :2064 arm (monmove.c:1926)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, youmonst: game.youmonst, level: game.level,
      fmon: game.fmon, moves: game.moves, objects: game._objects_at,
      mvitals: game.mvitals,
    };
    game.u = { ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 } };
    game.youmonst = { mx: 30, my: 10, data: { mlet: "S_HUMAN" } };
    game.level = {
      at: (x, y) => ({
        typ: (x === 10 && y === 10) ? ROOM : VWALL,
        lit: 1, flags: 0, glyph: 0, roomno: 1,
      }),
      flags: {}, traps: [], rooms: [{ lx: 0, hx: 40, ly: 0, hy: 20 }],
    };
    game.fmon = [];
    game.moves = 1000;
    game._objects_at = new Map();
    game.mvitals = {};
    globalThis.__NH_RNG_TRACE = true;
    enableRngLog();
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.moves = saved.moves;
    game._objects_at = saved.objects;
    game.mvitals = saved.mvitals;
    globalThis.__NH_RNG_TRACE = false;
  });

  // Gray unicorn (is_unicorn: S_UNICORN + M2_JEWELS), hostile, boxed in
  // solid wall: mfndpos finds no candidate (cnt 0).
  const stage = () => {
    const uni = {
      mx: 10, my: 10, mux: 30, muy: 10, mhp: 20, mhpmax: 20,
      mnum: 101, movement: 12,
      mcanmove: 1, mcansee: 1, msleeping: 0, mundetected: 0,
      m_ap_type: 0, mappearance: 0,
      mtame: 0, mpeaceful: 0, mflee: 0, mconf: 0, mstrategy: 0,
      meating: 0, mtrapped: 0, mblinded: 0, minvis: 0, mleashed: 0,
      mcan: 0, mtrack: [], m_lev: 5,
      data: {
        mlet: "S_UNICORN", mndx: 101, mmove: 24, geno: 0, cwt: 100,
        mflags1: 0, mflags2: M2_JEWELS, mflags3: 0, msize: 3, mresists: 0,
        mattk: [{ aatyp: 0, adtyp: 0, damn: 1, damd: 4 }],
      },
    };
    game.fmon = [uni];
    return uni;
  };

  it("never NOMOVES; draws the m_move rn2(2); failed rloc still MOVED", async () => {
    let moved = 0;
    let sawArmDraw = false;
    for (let seed = 1; seed <= 12; seed++) {
      initRng(seed);
      const uni = stage();
      const before = (getRngLog() || []).length;
      const ret = await m_move(uni, false);
      assert.notEqual(ret, MMOVE_NOMOVES,
        `seed ${seed}: cornered unicorn returned NOMOVES (want the :2064 fall-through)`);
      const fresh = (getRngLog() || []).slice(before);
      if (fresh.some((e) => /rn2\(2\)=\d @ m_move\(monmove\.js:\d+\)/.test(e))) {
        sawArmDraw = true;
      }
      if (ret === MMOVE_MOVED) moved++;
    }
    assert.ok(sawArmDraw, "expected an rn2(2)@m_move draw (the :2064 arm)");
    assert.ok(moved > 0, "expected rn2(2)!=0 seeds to return MOVED (rloc result ignored)");
  });
});
