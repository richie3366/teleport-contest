import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { makemap_remove_mons } from "../js/wizcmds.js";
import { G_EXTINCT, MON_OFFMAP, MON_MIGRATING } from "../js/const.js";
import { G_UNIQ } from "../js/monsters.js";

// C ref: wizcmds.c makemap_unmakemon `:73–105` (staticfn) +
// makemap_remove_mons `:110–150` — #wizmakemap level teardown.
describe("makemap_remove_mons (wizcmds.c:110-150)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      fmon: game.fmon,
      migrating_mons: game.migrating_mons,
      mydogs: game.mydogs,
      mvitals: game.mvitals,
      u: game.u,
      iflags: game.iflags,
    };
    game.u = { ux: 5, uy: 5, uz: { dnum: 1, dlevel: 3 } };
    game.iflags = { purge_monsters: 0 };
    game.mvitals = [];
    game.mydogs = [];
  });
  afterEach(() => {
    game.fmon = saved.fmon;
    game.migrating_mons = saved.migrating_mons;
    game.mydogs = saved.mydogs;
    game.mvitals = saved.mvitals;
    game.u = saved.u;
    game.iflags = saved.iflags;
  });

  const mkmon = (mndx, hp = 10, extra = {}) => ({
    data: { mndx, geno: 0 },
    mhp: hp,
    mx: 0,
    my: 0,
    mstate: 0,
    minvent: null,
    mextra: null,
    ...extra,
  });

  it("unmakes live fmon: unique un-extincted, born--, guard cleared, fmon emptied", async () => {
    game.mvitals[5] = { mvflags: G_EXTINCT, born: 3, died: 0 };
    const uniq = mkmon(5, 10, { data: { mndx: 5, geno: G_UNIQ } });
    const guard = mkmon(7, 10, { isgd: 1 });
    game.fmon = [uniq, guard];
    game.migrating_mons = [];
    await makemap_remove_mons();
    assert.deepEqual(game.fmon, []);
    assert.equal(uniq.mhp, 0);
    assert.equal(guard.mhp, 0);
    assert.equal(guard.isgd, 0); // C `:89` isgd clear before mongone
    assert.equal(game.mvitals[5].mvflags & G_EXTINCT, 0); // C `:81`
    assert.equal(game.mvitals[5].born, 2); // C `:83`
    assert.equal(game.mvitals[7].born, 0); // C `:82` falsy born untouched
  });

  it("skips dead fmon members for dmonsfree (no unmake)", async () => {
    game.mvitals[9] = { mvflags: 0, born: 4, died: 0 };
    const dead = mkmon(9, 0);
    game.fmon = [dead];
    game.migrating_mons = [];
    game.iflags.purge_monsters = 1; // dmonsfree count match, mon.c:2487
    await makemap_remove_mons();
    assert.deepEqual(game.fmon, []);
    assert.equal(game.mvitals[9].born, 4); // skipped at C `:120–121`
    assert.equal(game.iflags.purge_monsters, 0);
  });

  it("unmakes migrating home-level shk/priest/guard; away and mextra-less stay", async () => {
    const home = { dnum: 1, dlevel: 3 };
    const away = { dnum: 2, dlevel: 1 };
    const shkHome = mkmon(11, 10, {
      isshk: 1, mstate: MON_MIGRATING, mextra: { eshk: { shoplevel: home } },
    });
    const priHome = mkmon(12, 10, {
      ispriest: 1, mstate: MON_MIGRATING, mextra: { epri: { shrlevel: home } },
    });
    const grdHome = mkmon(13, 10, {
      isgd: 1, mstate: MON_MIGRATING, mextra: { egd: { gdlevel: home } },
    });
    const shkAway = mkmon(11, 10, {
      isshk: 1, mstate: MON_MIGRATING, mextra: { eshk: { shoplevel: away } },
    });
    const plain = mkmon(14, 10, { mstate: MON_MIGRATING });
    game.fmon = [];
    game.migrating_mons = [shkHome, priHome, grdHome, shkAway, plain];
    await makemap_remove_mons();
    assert.deepEqual(game.migrating_mons, [shkAway, plain]); // C `:132–142`
    assert.deepEqual(game.fmon, []); // migratory re-prepend then mongone
    for (const gone of [shkHome, priHome, grdHome]) {
      assert.equal(gone.mhp, 0);
      assert.notEqual(gone.mstate & MON_OFFMAP, 0); // C `:100`
      assert.equal(gone.mstate & MON_MIGRATING, 0); // C `:101`
    }
    assert.equal(grdHome.isgd, 0);
  });
});
