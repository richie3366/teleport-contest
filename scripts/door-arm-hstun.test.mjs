import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { test_move } from "../js/hack.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { STUNNED, FROMFORM, DOOR, ROOM, D_LOCKED, DO_MOVE } from "../js/const.js";

// C ref: hack.c test_move `:1100–1102` autoopen gate
// (`!Confusion && !Stunned`) + `:1113–1114` Ouch arm (`Stunned`), with
// Stunned ≡ HStun ≡ uprops[STUNNED].intrinsic and Confusion ≡ HConfusion
// (youprop.h:80-84). HStun/HConfusion are the live flats (D-3605
// dual-write); set_uasmon PROPSET grants FROMFORM there without the
// legacy u.Stunned/u.Confusion mirrors (D-3772) —
// scen-sweep-Barbarian-50055006 step 868: a HStun-stunned (FROMFORM)
// stalker bumped a locked-not-closed door, C took the Ouch path while
// JS (mirror-only reads) autoopened into doopen_indir's "This door is
// locked." + trailing confdir (D-4036). Pins (on the exported
// hack.js twin of the split door arms; the live cmd.js domove inline
// carries the identical predicate): HStun-only stun takes Ouch with no
// RNG; legacy flat unchanged; clear-headed autoopen unchanged.
describe("test_move door-arm Stun read (hack.c:1100-1102,1113-1114)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      level: game.level,
      flags: game.flags,
      context: game.context,
      invent: game.invent,
      in_mklev: game.in_mklev,
      a11y: game.a11y,
      lastseentyp: game.lastseentyp,
      multi: game.multi,
      dungeons: game.dungeons,
      n_dgns: game.n_dgns,
      branches: game.branches,
      trace: globalThis.__NH_RNG_TRACE,
    };
    globalThis.__NH_RNG_TRACE = true;
    game.in_mklev = true; // newsym early-return (display.c:928-929 gate)
    // recalc_mapseen (via doopen_indir's update_mapseen_for) resolves
    // 'The Quest' branch: minimal dungeon/branch stubs, hero elsewhere.
    game.dungeons = [{ dname: "Dungeons of Doom" }, { dname: "The Quest" }];
    game.n_dgns = 2;
    game.branches = [{ end1: { dnum: 0, dlevel: 1 }, end2: { dnum: 1, dlevel: 1 } }];
    const cells = new Map();
    cells.set("63,9", { typ: ROOM, doormask: 0, glyph: 0 });
    cells.set("62,9", { typ: DOOR, doormask: D_LOCKED, glyph: 0 });
    game.level = {
      rooms: [],
      at: (x, y) => cells.get(`${x | 0},${y | 0}`) || null,
    };
    game.youmonst = { data: {} };
    game.flags = { autoopen: true };
    game.context = {};
    game.invent = [];
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game.flags = saved.flags;
    game.context = saved.context;
    game.invent = saved.invent;
    game.in_mklev = saved.in_mklev;
    game.a11y = saved.a11y;
    game.lastseentyp = saved.lastseentyp;
    game.multi = saved.multi;
    game.dungeons = saved.dungeons;
    game.n_dgns = saved.n_dgns;
    game.branches = saved.branches;
    globalThis.__NH_RNG_TRACE = saved.trace;
  });

  function baseHero() {
    return {
      ux: 63, uy: 9, umonnum: 1, umonster: 0, // Upolyd (stalker-like)
      acurr: { a: [18, 10, 10, 18, 18, 10] }, // DEX 18: Ouch only via Stun
      uprops: {},
    };
  }

  it("HStun-only stun (FROMFORM, stale mirror) takes the Ouch path", async () => {
    game.u = {
      ...baseHero(),
      HStun: FROMFORM,
      uprops: { [STUNNED]: { intrinsic: FROMFORM, extrinsic: 0, blocked: 0 } },
    };
    initRng(50055006);
    enableRngLog();
    const before = getRngLog().length;
    const ret = await test_move(63, 9, -1, 0, DO_MOVE);
    assert.equal(ret, false);
    // Ouch arm: door_opened = move = TRUE (C :1127), no RNG (exercise
    // early-returns while poly'd; the gate itself draws nothing).
    assert.equal(game.context.door_opened, true);
    assert.equal(game.context.move, 1);
    assert.equal(getRngLog().length - before, 0);
  });

  it("legacy u.Stunned flat still takes the Ouch path", async () => {
    game.u = { ...baseHero(), Stunned: 1 };
    initRng(50055006);
    enableRngLog();
    const before = getRngLog().length;
    const ret = await test_move(63, 9, -1, 0, DO_MOVE);
    assert.equal(ret, false);
    assert.equal(game.context.door_opened, true);
    assert.equal(game.context.move, 1);
    assert.equal(getRngLog().length - before, 0);
  });

  it("clear-headed hero autoopens into doopen_indir", async () => {
    game.u = baseHero();
    initRng(50055006);
    enableRngLog();
    const before = getRngLog().length;
    const ret = await test_move(63, 9, -1, 0, DO_MOVE);
    assert.equal(ret, false);
    // doopen_indir locked branch: nothing opened, hero unmoved.
    assert.equal(game.context.door_opened, false);
    assert.equal(game.context.move, 0);
    assert.equal(getRngLog().length - before, 0);
  });
});
