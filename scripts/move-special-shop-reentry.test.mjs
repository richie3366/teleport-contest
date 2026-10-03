import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { move_special, inhishop } from "../js/shk.js";
import { forget_temple_entry } from "../js/priest.js";
import { ROOM } from "../js/const.js";

// C ref: priest.c move_special `:125–126` (D-3394): a shk stepping back
// into his shop re-runs check_special_room(FALSE) after place_monster.
// Pins the wiring through the exported move_special envelope: a shk at
// (10,10) approaching goal (11,10) inside his shop with in_his_shop=false
// refreshes the hero's stale occupancy strings (the headless-observable
// effect of check_special_room(FALSE) with the hero outside every room
// and ushops0 empty, so u_left_shop/u_entered_shop stay skipped),
// while in_his_shop=true leaves them untouched. appr=true makes the
// dist2 pick deterministic (goal square is distance 0).
const SHOPROOM = 3;

describe("move_special shk shop re-entry (priest.c:125-126)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      program_state: game.program_state,
    };
    game.u = {
      ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
      urooms: "STALE", urooms0: "", uentered: "STALE",
      ushops: "", ushops0: "", ushops_entered: "", ushops_left: "",
    };
    game.level = {
      at: (x, y) => ({
        typ: ROOM,
        doormask: 0,
        roomno: (x === 11 && y === 10) ? SHOPROOM : 0,
      }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.program_state = saved.program_state;
  });

  const shkAt = () => ({
    mx: 10, my: 10, mux: 0, muy: 0,
    mnum: 0, mcansee: 1, mconf: 0,
    m_lev: 1, mgenmklev: 0, mtame: 0, mpeaceful: 1, mtrapped: 0, wormno: 0,
    isshk: true, ispriest: false,
    data: {
      mlet: "S_HUMAN", mndx: 0, msize: 2,
      mflags1: 0, mflags2: 0, mflags3: 0, geno: 0,
    },
    mextra: { eshk: { shoproom: SHOPROOM, following: false } },
  });

  it("shk stepping into his shop refreshes occupancy (arm fired)", async () => {
    const shk = shkAt();
    const z = await move_special(shk, false, true, false, false,
      10, 10, 11, 10);
    assert.equal(z, 1);
    assert.equal(shk.mx, 11);
    assert.equal(shk.my, 10);
    assert.ok(inhishop(shk));
    // move_update(FALSE) inside check_special_room copied the stale
    // strings to the *0 slots and recomputed the live ones (hero is
    // outside every room on this stub level).
    assert.equal(game.u.urooms0, "STALE");
    assert.equal(game.u.urooms, "");
    assert.equal(game.u.uentered, "");
  });

  it("in_his_shop=true leaves occupancy untouched (arm skipped)", async () => {
    const shk = shkAt();
    const z = await move_special(shk, true, true, false, false,
      10, 10, 11, 10);
    assert.equal(z, 1);
    assert.equal(shk.mx, 11);
    assert.equal(shk.my, 10);
    assert.equal(game.u.urooms0, "");
    assert.equal(game.u.urooms, "STALE");
    assert.equal(game.u.uentered, "STALE");
  });
});

// C ref: priest.c forget_temple_entry `:545–555` (D-3394): the non-priest
// arm reports impossible() and returns; the priest arm zeroes the four
// shrine timers. Both C callers (mkobj.c:2159, save.c:893) and both JS
// call sites guard with ispriest, so the diagnostic is unreachable by
// construction — the pin is that it returns cleanly and the floating
// impossible() settles without rejecting.
describe("forget_temple_entry disorder arm (priest.c:550)", () => {
  it("zeroes the four shrine timers for a priest", () => {
    const priest = {
      ispriest: true,
      mextra: {
        epri: {
          intone_time: 5, enter_time: 6,
          peaceful_time: 7, hostile_time: 8,
        },
      },
    };
    forget_temple_entry(priest);
    const e = priest.mextra.epri;
    assert.equal(e.intone_time, 0);
    assert.equal(e.enter_time, 0);
    assert.equal(e.peaceful_time, 0);
    assert.equal(e.hostile_time, 0);
  });

  it("non-priest returns without touching the monster", async () => {
    const mon = { ispriest: false, mx: 3, my: 4 };
    forget_temple_entry(mon);
    assert.equal(mon.mx, 3);
    assert.equal(mon.my, 4);
    // Let the floating impossible() settle; an unhandled rejection
    // fails the run, which is the pin that the arm is headless-safe.
    await new Promise((resolve) => setImmediate(resolve));
    await new Promise((resolve) => setImmediate(resolve));
  });
});
