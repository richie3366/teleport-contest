import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { dochug } from "../js/monmove.js";
import {
  ROOM, M_AP_NOTHING,
} from "../js/const.js";

// C ref: monmove.c dochug `:802–825` Demonic Blackmail mux-match arm
// (`} else if (demon_talk(mtmp)) return 1;` — scen-sweep-Knight-587109
// step 700: C draws rnd(80)@demon_talk while JS skipped the call and drew
// rn2(3)@dochug want_move). Pins the headless envelope: a peaceful
// MS_BRIBE demon adjacent with mux==hero enters demon_talk; the S_DEMON
// kin arm (noteleport level so tele_restrict holds, no rloc) returns 1
// and dochug returns 1 with the demon still peaceful.
describe("dochug MS_BRIBE mux-match calls demon_talk (monmove.c:823)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, youmonst: game.youmonst, level: game.level,
      fmon: game.fmon, moves: game.moves, objects: game._objects_at,
      mvitals: game.mvitals, invent: game.invent, flags: game.flags,
      multi: game.multi, occupation: game.occupation,
      head_engr: game.head_engr, dungeons: game.dungeons,
      viz_array: game.viz_array,
    };
    initRng(42);
    game.u = { ux: 30, uy: 10, uz: { dnum: 0, dlevel: 1 }, uhp: 20, uhpmax: 20 };
    // S_DEMON hero takes demon_talk's kin arm (no gold/bribe input needed).
    game.youmonst = { mx: 30, my: 10, data: { mlet: "S_DEMON" } };
    game.level = {
      at: () => ({ typ: ROOM, lit: 1, flags: 0, glyph: 0, roomno: 1 }),
      flags: { noteleport: true },
      traps: [],
      rooms: [{ lx: 0, hx: 40, ly: 0, hy: 20 }],
    };
    game.fmon = [];
    game.moves = 1000;
    game._objects_at = new Map();
    game.mvitals = {};
    game.invent = [];
    game.flags = {};
    game.multi = 0;
    game.occupation = null;
    game.head_engr = null;
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.moves = saved.moves;
    game._objects_at = saved.objects;
    game.mvitals = saved.mvitals;
    game.invent = saved.invent;
    game.flags = saved.flags;
    game.multi = saved.multi;
    game.occupation = saved.occupation;
    game.head_engr = saved.head_engr;
    game.dungeons = saved.dungeons;
    game.viz_array = saved.viz_array;
  });

  // MS_BRIBE is 33 (monflag.h; monmove.js local const, not exported);
  // PM_HORNED_DEVIL is 291 (monsterNames).
  const mkDemon = () => ({
    mx: 31, my: 10, mux: 30, muy: 10, mhp: 20, mhpmax: 20, mnum: 291,
    movement: 12, mcanmove: 1, mcansee: 1, msleeping: 0, mundetected: 0,
    m_ap_type: M_AP_NOTHING, mappearance: 0,
    mtame: 0, mpeaceful: 1, mflee: 0, mfleetim: 0, mconf: 0, mstun: 0,
    mstrategy: 0, meating: 0, mtrapped: 0, mblinded: 0, minvis: 0,
    mleashed: 0, mcan: 0, mtrack: [], m_lev: 5, female: 0, wormno: 0,
    iswiz: 0, isgd: 0, isshk: 0, ispriest: 0, mspec_used: 0,
    weapon_check: 0, minvent: [],
    data: {
      mlet: "S_DEMON", msound: 33, mndx: 291, mmove: 9, geno: 0, cwt: 100,
      mflags1: 0, mflags2: 0, mflags3: 0, msize: 3, mresists: 0,
      maligntyp: 0,
      mattk: [{ aatyp: 0, adtyp: 0, damn: 1, damd: 4 }],
    },
  });

  it("mux==hero demon_talk kin arm returns 1, demon stays peaceful", async () => {
    const demon = mkDemon();
    game.fmon = [demon];
    const ret = await dochug(demon);
    assert.equal(ret, 1);
    assert.equal(demon.mpeaceful, 1);
  });
});
