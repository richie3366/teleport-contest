import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { u_maybe_impaired, confdir, impaired_movement } from "../js/hack.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { STUNNED, FROMFORM, ROOM } from "../js/const.js";
import { objectNames } from "../js/objects.js";

const BOULDER = objectNames.indexOf("BOULDER");

// C ref: hack.c u_maybe_impaired `:2417–2421` —
// `return (Stunned || (Confusion && !rn2(5)))` with Stunned ≡ HStun ≡
// uprops[STUNNED].intrinsic (youprop.h:80-81). HStun is the live flat
// (D-3605 dual-write); set_uasmon PROPSET grants FROMFORM there without
// the legacy u.Stunned mirror — scen-sweep-Wizard-95347 step 485 drew
// `rn2(8) @ confdir` in C while JS (mirror-only read) walked into a
// wall it then bumped silently (D-3772).
// Pins: HStun-only stun counts (no rn2(5), confdir rolls rn2(8));
// legacy flat, clear-headed, and confused behavior unchanged.
describe("u_maybe_impaired Stun read (hack.c:2417-2421)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      level: game.level,
      objects_at: game._objects_at,
      trace: globalThis.__NH_RNG_TRACE,
    };
    globalThis.__NH_RNG_TRACE = true;
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game._objects_at = saved.objects_at;
    globalThis.__NH_RNG_TRACE = saved.trace;
  });

  it("HStun-only stun (FROMFORM, stale mirror) counts as stunned", () => {
    game.u = {
      ux: 28, uy: 6, umonnum: 0, HStun: FROMFORM,
      uprops: { [STUNNED]: { intrinsic: FROMFORM, extrinsic: 0, blocked: 0 } },
    };
    initRng(95347);
    enableRngLog();
    const before = getRngLog().length;
    assert.equal(u_maybe_impaired(), true);
    assert.equal(getRngLog().length - before, 0);
    confdir(false);
    const fresh = getRngLog().slice(before);
    assert.equal(fresh.length, 1);
    assert.match(String(fresh[0]), /rn2\(8\)=\d+ @ confdir/);
  });

  it("legacy u.Stunned flat still counts as stunned", () => {
    game.u = { ux: 5, uy: 5, umonnum: 0, Stunned: 1 };
    initRng(95347);
    enableRngLog();
    const before = getRngLog().length;
    assert.equal(u_maybe_impaired(), true);
    assert.equal(getRngLog().length - before, 0);
  });

  it("clear-headed hero draws nothing", () => {
    game.u = { ux: 5, uy: 5, umonnum: 0 };
    initRng(95347);
    enableRngLog();
    const before = getRngLog().length;
    assert.equal(u_maybe_impaired(), false);
    confdir(false);
    assert.equal(getRngLog().length - before, 0);
  });

  it("confused hero rolls rn2(5) once", () => {
    game.u = { ux: 5, uy: 5, umonnum: 0, HConfusion: 20 };
    initRng(95347);
    enableRngLog();
    const before = getRngLog().length;
    assert.equal(typeof u_maybe_impaired(), "boolean");
    const fresh = getRngLog().slice(before);
    assert.equal(fresh.length, 1);
    assert.match(String(fresh[0]), /rn2\(5\)=\d+ @ u_maybe_impaired/);
  });

  it("impaired_movement rejects a Sokoban boulder via live bad_rock", () => {
    game.u = {
      ux: 28, uy: 6, umonnum: 0, HStun: FROMFORM,
      uprops: { [STUNNED]: { intrinsic: FROMFORM, extrinsic: 0, blocked: 0 } },
    };
    game.youmonst = { data: {} };
    game.level = { flags: { sokoban_rules: true }, at: () => ({ typ: ROOM }) };
    game._objects_at = new Map([["27,6", { otyp: BOULDER, nexthere: null }]]);
    initRng(95347);
    enableRngLog();
    const before = getRngLog().length;
    assert.equal(impaired_movement(), false);
    const fresh = getRngLog().slice(before);
    // Seed 95347: first rn2(8)=0 → W into the boulder (rejected, C
    // bad_rock Sokoban arm), then =6 → SE accepted.
    assert.equal(fresh.length, 2);
    assert.match(String(fresh[0]), /rn2\(8\)=0 @ confdir/);
    assert.match(String(fresh[1]), /rn2\(8\)=6 @ confdir/);
    assert.equal(game.u.dx, 1);
    assert.equal(game.u.dy, 1);
  });
});
