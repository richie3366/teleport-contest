import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { movemon_singlemon } from "../js/mon.js";
import { ROOM, MON_FLOOR, NORMAL_SPEED, M_AP_FURNITURE } from "../js/const.js";

// C ref: mon.c movemon_singlemon `:1254–1265` (movement spend, then
// vision_recalc `:1258`, clear_bypasses + clear_splitobjs `:1261–1264`,
// minliquid `:1265`) and movemon `:1335–1338` (post-loop bypass/split
// reset; any_light_source stays named — no JS counterpart).
// A mimicked furniture-hider pins the reset arms with no RNG: restrap
// short-circuits on M_AP_TYPE before its rn2(3), and the M_AP_FURNITURE
// arm returns FALSE before Conflict/dochugw.
// The `:1258` vision_recalc arm needs a live level (it spins on a bare
// stub — verified by probe, not a product bug: the corpus fortress runs
// it every turn) so these stubs leave vision_full_recalc shut; REACH on
// `verify --fn movemon_singlemon` covers the vision arm through real
// sessions instead.
describe("movemon_singlemon per-monster reset arms (mon.c:1261-1264)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      moves: game.moves,
      objects: game._objects_at,
      vision: game.vision_full_recalc,
      context: game.context,
    };
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      at: () => ({ typ: ROOM, seenv: 0, flags: 0, glyph: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
    game.moves = 1000;
    game._objects_at = new Map();
    game.vision_full_recalc = 0;
    game.context = {
      bypasses: true,
      objsplit: { parent_oid: 7, child_oid: 9 },
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.moves = saved.moves;
    game._objects_at = saved.objects;
    game.vision_full_recalc = saved.vision;
    game.context = saved.context;
  });

  const mimicAt = (mx, my) => ({
    mx, my, mux: 5, muy: 5, mhp: 20, mhpmax: 20,
    mstate: MON_FLOOR, movement: NORMAL_SPEED,
    m_ap_type: M_AP_FURNITURE, mcan: 0, mundetected: 0,
    misc_worn_check: 0, mflee: 0, iswiz: 0,
    data: { mlet: "S_MIMIC", mmove: 1 },
  });

  it("spends movement, clears bypasses and split oids, furniture stops", async () => {
    const mon = mimicAt(10, 10);
    assert.equal(await movemon_singlemon(mon), false);
    assert.equal(mon.movement, 0);
    assert.ok(!game.context?.bypasses);
    assert.equal(game.context?.objsplit?.parent_oid, 0);
    assert.equal(game.context?.objsplit?.child_oid, 0);
  });

  it("leaves clean state alone (no-flags pass stays quiet)", async () => {
    game.context = { objsplit: { parent_oid: 0, child_oid: 0 } };
    const mon = mimicAt(11, 10);
    assert.equal(await movemon_singlemon(mon), false);
    assert.ok(!game.context?.bypasses);
    assert.equal(game.context?.objsplit?.parent_oid, 0);
    assert.equal(game.context?.objsplit?.child_oid, 0);
  });
});
