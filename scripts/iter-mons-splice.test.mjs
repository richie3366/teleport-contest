import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { MON_FLOOR } from "../js/const.js";
import { iter_mons, mongone } from "../js/mon.js";

// C ref: mon.c iter_mons `:4526–4538` caches `mtmp2 = mtmp->nmon` before
// each callback, so a callback that unlinks the current monster (savebones'
// remove_mon_from_bones → mongone, which splices game.fmon) cannot skip
// the next monster. The JS fmon array shifts on splice, so iter_mons
// walks a snapshot — C's mtmp2 chain (review 2162, D-3202 follow-up).
describe("iter_mons splice-safety (mon.c:4526-4538)", () => {
  let saved;
  beforeEach(() => {
    saved = { fmon: game.fmon, u: game.u };
    game.u = {};
  });
  afterEach(() => {
    game.fmon = saved.fmon;
    game.u = saved.u;
  });

  const mkmon = (id) => ({
    m_id: id,
    mhp: 10,
    mstate: MON_FLOOR,
    minvent: null,
    mx: 0,
    my: 0,
  });

  it("visits a qualifying mon immediately following a mongone'd one", async () => {
    const a = mkmon(1);
    const b = mkmon(2);
    const c = mkmon(3);
    game.fmon = [a, b, c];
    const seen = [];
    await iter_mons(async (mtmp) => {
      seen.push(mtmp.m_id);
      if (mtmp.m_id <= 2) await mongone(mtmp);
    });
    // Live-array iteration would skip b (splice shifts it into the
    // consumed index) and wrongly leave it on the level.
    assert.deepEqual(seen, [1, 2, 3]);
    assert.deepEqual(game.fmon, [c]);
    assert.equal(b.mhp, 0);
  });

  it("still skips dead and off-map mons at visit time", async () => {
    const live = mkmon(1);
    const dead = mkmon(2);
    dead.mhp = 0;
    const away = mkmon(3);
    away.mstate = MON_FLOOR | 0x01;
    game.fmon = [live, dead, away];
    const seen = [];
    await iter_mons(async (mtmp) => {
      seen.push(mtmp.m_id);
    });
    assert.deepEqual(seen, [1]);
  });
});
