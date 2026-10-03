import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { restlevchn } from "../js/restore.js";
import { savelevchn } from "../js/save.js";

// C ref: restore.c restlevchn `:130–150` — reset svs.sp_levchn, read the
// lev_count, alloc + Sfi_s_level per node, append at tail with next = 0.
// JSON analogue: savelevchn's array is the wire (length is the count);
// array order is chain order (dungeon.js add_level/dumpit precedent).
// Sole C caller restgamestate `:703`; JS site try_restore_save.
describe("restlevchn (restore.c:130-150)", () => {
  let saved;
  beforeEach(() => {
    saved = game.sp_levchn;
  });
  afterEach(() => {
    game.sp_levchn = saved;
  });

  it("round-trips the live chain through savelevchn (order, fields, numeric boneid)", () => {
    game.sp_levchn = [
      {
        proto: "tower", boneid: 84, dlevel: { dnum: 1, dlevel: 5 },
        flags: { town: false, hellish: true, maze_like: false, rogue_like: false, align: 1 },
        rndlevs: 3, next: null,
      },
      {
        proto: "oracle", boneid: 0, dlevel: { dnum: 0, dlevel: 4 },
        flags: { town: true, hellish: false, maze_like: true, rogue_like: true, align: 0 },
        rndlevs: 0, next: null,
      },
    ];
    const blobs = savelevchn();
    game.sp_levchn = [{ junk: true }]; // stale chain must not survive
    restlevchn(blobs);
    assert.deepEqual(game.sp_levchn, [
      {
        dlevel: { dnum: 1, dlevel: 5 }, proto: "tower", boneid: 84, rndlevs: 3,
        flags: { town: false, hellish: true, maze_like: false, rogue_like: false, align: 1 },
        next: null,
      },
      {
        dlevel: { dnum: 0, dlevel: 4 }, proto: "oracle", boneid: 0, rndlevs: 0,
        flags: { town: true, hellish: false, maze_like: true, rogue_like: true, align: 0 },
        next: null,
      },
    ]);
  });

  it("maps wire boneid '' to 0 and passes numerics through (C char boneid)", () => {
    restlevchn([
      { dlevel: { dnum: 0, dlevel: 1 }, proto: "a", boneid: "", rndlevs: 0, flags: {} },
      { dlevel: { dnum: 0, dlevel: 2 }, proto: "b", boneid: 66, rndlevs: 0, flags: {} },
    ]);
    assert.equal(game.sp_levchn[0].boneid, 0);
    assert.equal(game.sp_levchn[1].boneid, 66);
  });

  it("resets unconditionally; a missing key restores an empty chain (C :136)", () => {
    game.sp_levchn = [{ proto: "stale" }];
    restlevchn(undefined);
    assert.deepEqual(game.sp_levchn, []);
    game.sp_levchn = [{ proto: "stale" }];
    restlevchn(null);
    assert.deepEqual(game.sp_levchn, []);
  });
});
