import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { CONFUSION, TIMEOUT } from "../js/const.js";
import { make_confused } from "../js/potion.js";
import { nh_timeout } from "../js/timeout.js";

// C: HConfusion ≡ u.uprops[CONFUSION].intrinsic (youprop.h:83) — one field.
// JS keeps the flat beside the slot; every writer must keep them ≡ or
// #wizintrinsic's oldtimeout read shows a stale [N] (scen-sweep-Barbarian-95305
// step 1153: C `g - confused` vs JS `g - confused [5]`; 95319/95327 `[30]`).
// Same disease as the D-1817 DEAF leftover (flat-only writes left uprops
// TIMEOUT stuck); BLINDED arm carries the mirror shape (timeout.js D-0928).

describe("confusion flat ≡ uprops[CONFUSION] (youprop.h:83, timeout.c:730)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u, flags: game.flags, level: game.level, disp: game.disp,
      youmonst: game.youmonst, context: game.context,
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.flags = saved.flags;
    game.level = saved.level;
    game.disp = saved.disp;
    game.youmonst = saved.youmonst;
    game.context = saved.context;
  });

  const setup = () => {
    initRng(4242);
    game.flags = {};
    game.level = { monsters: [] };
    game.context = {};
    game.u = { uprops: {}, ux: 5, uy: 5 };
  };
  const slot = () => (game.u.uprops?.[CONFUSION]?.intrinsic | 0) & TIMEOUT;
  const flat = () => (game.u.HConfusion | 0) & TIMEOUT;

  it("make_confused onset writes flat and slot", async () => {
    setup();
    await make_confused(8, false);
    assert.equal(flat(), 8);
    assert.equal(slot(), 8);
  });

  it("make_confused(0) cure clears flat and slot", async () => {
    setup();
    await make_confused(8, false);
    // production state: sync_timeout_flats copied the onset flat to the slot
    game.u.uprops[CONFUSION] = { intrinsic: 8, extrinsic: 0, blocked: 0 };
    await make_confused(0, false);
    assert.equal(flat(), 0);
    assert.equal(slot(), 0);
  });

  it("nh_timeout decrements flat and slot in lockstep", async () => {
    setup();
    // production state after sync_timeout_flats copied the onset flat
    game.u.HConfusion = 3;
    game.u.Confusion = 3;
    game.u.uprops[CONFUSION] = { intrinsic: 3, extrinsic: 0, blocked: 0 };
    await nh_timeout();
    assert.equal(flat(), 2);
    assert.equal(slot(), 2);
  });
});
