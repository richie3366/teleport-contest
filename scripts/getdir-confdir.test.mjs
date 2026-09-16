import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { getdir } from "../js/lock.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";

// C ref: cmd.c getdir `:4115–4116` — `if (!u.dz) confdir(FALSE)` runs in
// getdir itself on every successful prompt (D-2430: scen-intrinsic-
// Samurai-92239 s95 drew `rn2(5) @ u_maybe_impaired` when a confused hero
// gave a use_figurine direction, while JS drew nothing — the tail used to
// live only in per-caller compensations like getdir_zap/doclose, so every
// other prompt missed it).
// Pins the tail headless via a canned CMDQ_KEY: a confused hero draws the
// impaired check, a clear-headed hero draws nothing, a stunned hero skips
// the rn2(5) and rolls direction directly (C short-circuit).
const pushKey = (key) => {
  game._cmdq_canned = [{ typ: "key", key }];
};

describe("getdir trailing confdir (cmd.c:4115-4116)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      canned: game._cmdq_canned,
      repeat: game._cmdq_repeat,
      in_doagain: game.in_doagain,
      trace: globalThis.__NH_RNG_TRACE,
    };
    game._cmdq_canned = [];
    game._cmdq_repeat = [];
    game.in_doagain = 0;
    globalThis.__NH_RNG_TRACE = true;
  });
  afterEach(() => {
    game.u = saved.u;
    game._cmdq_canned = saved.canned;
    game._cmdq_repeat = saved.repeat;
    game.in_doagain = saved.in_doagain;
    globalThis.__NH_RNG_TRACE = saved.trace;
  });

  it("confused hero draws the impaired check on a direction", async () => {
    game.u = { ux: 5, uy: 5, umonnum: 0, HConfusion: 20 };
    initRng(92039);
    enableRngLog();
    pushKey("h");
    const before = getRngLog().length;
    assert.equal(await getdir(null), true);
    const fresh = getRngLog().slice(before);
    assert.ok(
      fresh.length >= 1,
      `expected >=1 draw, got ${fresh.length}`,
    );
    assert.match(
      String(fresh[0]),
      /rn2\(5\)=\d+ @ u_maybe_impaired/,
    );
  });

  it("clear-headed hero draws nothing and keeps the direction", async () => {
    game.u = { ux: 5, uy: 5, umonnum: 0 };
    initRng(92039);
    enableRngLog();
    pushKey("h");
    const before = getRngLog().length;
    assert.equal(await getdir(null), true);
    assert.equal(getRngLog().length - before, 0);
    assert.equal(game.u.dx, -1);
    assert.equal(game.u.dy, 0);
  });

  it("stunned hero skips rn2(5) and rolls direction directly", async () => {
    game.u = { ux: 5, uy: 5, umonnum: 0, Stunned: 1 };
    initRng(92039);
    enableRngLog();
    pushKey("h");
    const before = getRngLog().length;
    assert.equal(await getdir(null), true);
    const fresh = getRngLog().slice(before);
    assert.equal(fresh.length, 1);
    assert.match(String(fresh[0]), /rn2\(8\)=\d+ @ confdir/);
  });
});
