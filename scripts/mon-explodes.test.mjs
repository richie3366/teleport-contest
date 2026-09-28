import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { MON_DETACH } from "../js/const.js";
import { monsterNames } from "../js/generated/monsters_data.js";
import { mon_explodes } from "../js/explode.js";
import { dmonsfree } from "../js/mon.js";

// C ref: explode.c mon_explodes `:1049–1054` + mon.c dmonsfree `:2505–2510`.
// mon_explodes must kill via mondead (m_detach sets MON_DETACH and counts
// purge_monsters), never an inline mhp=0: dmonsfree fires impossible() when
// its unlink count mismatches the purge count, and that third topline
// message raises a --More-- C never shows (tour-Ranger-70021 @44, D-3000).
// AD_ELEC is file-local in js/explode.js (monattk.h: AD_MAGM..AD_SPC2 = 1..10).
const AD_ELEC = 6;
const PM_SHOCKING_SPHERE = monsterNames.indexOf("PM_SHOCKING_SPHERE");

describe("mon_explodes kill arm (explode.c:1049-1054)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      fmon: game.fmon,
      iflags: game.iflags,
      killer: game.killer,
      u: game.u,
      mvitals: game.mvitals,
      context: game.context,
      stealmid: game.stealmid,
    };
    game.fmon = [];
    // debug_prevent_pline keeps the blast-phase plines ("Boom!") from
    // painting or awaiting keys; the kill arm runs before explode().
    game.iflags = { debug_prevent_pline: true, purge_monsters: 0 };
    game.killer = {};
    game.u = { ux: 1, uy: 1, uz: { dnum: 0, dlevel: 1 } };
    game.mvitals = {};
    game.context = {};
    game.stealmid = 0;
    initRng(70021);
  });
  afterEach(() => {
    game.fmon = saved.fmon;
    game.iflags = saved.iflags;
    game.killer = saved.killer;
    game.u = saved.u;
    game.mvitals = saved.mvitals;
    game.context = saved.context;
    game.stealmid = saved.stealmid;
  });

  // Off-map (mx/my 0) so m_detach skips grid/cansee work; the purge
  // count and MON_DETACH flag are the wiring under test.
  const sphere = (over = {}) => ({
    mx: 0, my: 0, mhp: 10, mhpmax: 10, m_id: 7,
    data: {
      mndx: PM_SHOCKING_SPHERE, mlet: "S_EEL", msound: 0, mlevel: 6,
      mmove: 12, name: "shocking sphere",
    },
    minvent: null, cham: -1,
    ...over,
  });
  const mattk = () => ({ damn: 4, damd: 6, adtyp: AD_ELEC });

  it("kills via mondead: MON_DETACH + purge_monsters counted", async () => {
    const mon = sphere();
    game.fmon = [mon];
    // The blast phase needs full level state; the kill arm runs first.
    await mon_explodes(mon, mattk()).catch(() => {});
    assert.equal(mon.mhp, 0);
    assert.notEqual((mon.mstate | 0) & MON_DETACH, 0);
    assert.equal(game.iflags.purge_monsters, 1);
    assert.ok(game.fmon.includes(mon)); // freed by dmonsfree, not mondead
  });

  it("dmonsfree then frees without a count mismatch", async () => {
    const mon = sphere();
    game.fmon = [mon];
    await mon_explodes(mon, mattk()).catch(() => {});
    await dmonsfree();
    assert.equal(game.fmon.length, 0);
    assert.equal(game.iflags.purge_monsters, 0);
  });

  it("skips mondead for an already-dead exploder (:1052 gate)", async () => {
    const mon = sphere({ mhp: 0 });
    game.fmon = [mon];
    await mon_explodes(mon, mattk()).catch(() => {});
    assert.equal(game.iflags.purge_monsters, 0);
  });
});
