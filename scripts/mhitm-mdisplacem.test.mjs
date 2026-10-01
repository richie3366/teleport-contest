import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { m_move } from "../js/monmove.js";
import { mdisplacem } from "../js/mhitm.js";
import {
  ROOM, MMOVE_MOVED, MMOVE_DONE,
  M_ATTK_HIT, M_ATTK_MISS, M_AP_NOTHING, M_AP_MONSTER,
} from "../js/const.js";

// C ref: mhitm.c mdisplacem `:178–267` + the monmove.c:1945–1946
// better_with_displacing gate (scen-special-Ranger-94277 step 157: C's
// displacer beast moves the red mold out of its way — rn2(7)@mdisplacem —
// while JS never displaced in the wild path because better_with_displacing
// stayed false). Pins the headless envelope: a wild M3_DISPLACES monster
// with a mold on the best square swaps with it (or spends the turn on the
// 1-in-7 miss — never a plain sidestep); mdisplacem itself honors the
// sanity guards, the 1-in-7, and the finish_meating mimic-AP reset.
describe("wild m_move displace gate + mdisplacem body (mhitm.c:178-267)", () => {
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
      at: () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 1 }),
      flags: {}, traps: [], rooms: [{ lx: 0, hx: 40, ly: 0, hy: 20 }],
    };
    game.fmon = [];
    game.moves = 1000;
    game._objects_at = new Map();
    game.mvitals = {};
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.moves = saved.moves;
    game._objects_at = saved.objects;
    game.mvitals = saved.mvitals;
  });

  const mk = (mx, my, mnum, mmove, mlet, mflags3, msize) => ({
    mx, my, mux: 30, muy: 10, mhp: 20, mhpmax: 20, mnum, movement: 12,
    mcanmove: 1, mcansee: 1, msleeping: 0, mundetected: 0,
    m_ap_type: M_AP_NOTHING, mappearance: 0,
    mtame: 0, mpeaceful: 0, mflee: 0, mconf: 0, mstrategy: 0,
    meating: 0, mtrapped: 0, mblinded: 0, minvis: 0, mleashed: 0,
    mcan: 0, mtrack: [], m_lev: 5,
    data: {
      mlet, mndx: mnum, mmove, geno: 0, cwt: 100,
      mflags1: 0, mflags2: 0, mflags3, msize, mresists: 0,
      mattk: [{ aatyp: 0, adtyp: 0, damn: 1, damd: 4 }],
    },
  });
  // Displacer beast (M3_DISPLACES) east of nothing, red mold on the
  // best-approach square between it and the hero.
  const stage = () => {
    const dis = mk(10, 10, 39, 12, "S_DOG", 0x0400, 3);
    const mold = mk(11, 10, 162, 0, "S_FUNGUS", 0, 1);
    game.fmon = [dis, mold];
    return { dis, mold };
  };

  it("wild m_move displaces the mold (never sidesteps to a plain square)", async () => {
    let swapped = 0;
    for (let seed = 1; seed <= 10; seed++) {
      initRng(seed);
      const { dis, mold } = stage();
      const ret = await m_move(dis, false);
      const isSwap = dis.mx === 11 && dis.my === 10
        && mold.mx === 10 && mold.my === 10 && ret === MMOVE_MOVED;
      const isMiss = dis.mx === 10 && dis.my === 10
        && mold.mx === 11 && mold.my === 10 && ret === MMOVE_DONE;
      assert.ok(isSwap || isMiss,
        `seed ${seed}: ret=${ret} dis@${dis.mx},${dis.my} (want swap or 1-in-7 miss)`);
      if (isSwap) swapped++;
    }
    assert.ok(swapped > 0, "expected at least one seed to complete the swap");
  });

  it("mdisplacem swaps on HIT, holds on the 1-in-7 MISS", async () => {
    initRng(1); // rn2(7)=5: HIT
    let { dis, mold } = stage();
    assert.equal(await mdisplacem(dis, mold, false), M_ATTK_HIT);
    assert.deepEqual([dis.mx, dis.my], [11, 10]);
    assert.deepEqual([mold.mx, mold.my], [10, 10]);

    initRng(1234); // rn2(7)=0: MISS
    ({ dis, mold } = stage());
    assert.equal(await mdisplacem(dis, mold, false), M_ATTK_MISS);
    assert.deepEqual([dis.mx, dis.my], [10, 10]);
    assert.deepEqual([mold.mx, mold.my], [11, 10]);
  });

  it("mdisplacem rejects null/self and off-registry pairs without moving", async () => {
    initRng(1);
    const { dis, mold } = stage();
    assert.equal(await mdisplacem(null, mold, false), M_ATTK_MISS);
    assert.equal(await mdisplacem(dis, dis, false), M_ATTK_MISS);
    const stray = mk(12, 10, 39, 12, "S_DOG", 0x0400, 3);
    assert.equal(await mdisplacem(stray, mold, false), M_ATTK_MISS);
    assert.deepEqual([dis.mx, dis.my], [10, 10]);
    assert.deepEqual([mold.mx, mold.my], [11, 10]);
  });

  it("mdisplacem clears the defender meal and resets mimic AP (finish_meating)", async () => {
    initRng(1); // HIT
    const { dis, mold } = stage();
    mold.meating = 5;
    // M_AP_MONSTER on a non-mimic skips the seemimic arm, so only the
    // finish_meating call (dogmove.c:1451–1455) resets the appearance.
    mold.m_ap_type = M_AP_MONSTER;
    mold.mappearance = 99;
    assert.equal(await mdisplacem(dis, mold, false), M_ATTK_HIT);
    assert.equal(mold.meating, 0);
    assert.equal(mold.m_ap_type, M_AP_NOTHING);
    assert.equal(mold.mappearance, 0);
  });
});
