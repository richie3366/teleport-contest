import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { OBJ_FREE, OBJ_FLOOR, OBJ_INVENT } from "../js/const.js";
import { done_object_cleanup } from "../js/end.js";

// C ref: end.c done_object_cleanup `:850–903` — in-use invent item used
// up (`:854`), limbo thrown/kicked missiles onto the map (`:878–885`),
// limbo ball&chain lifted (`:886–890`), perm_invent window dropped
// (`:894–897`). Display/menu plumbing is covered by corpus verify
// (`--fn done_object_cleanup`), not here.
describe("done_object_cleanup arms (end.c:850-903)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      invent: game.invent,
      iflags: game.iflags,
      level: game.level,
      fobj: game.fobj,
      _thrownobj: game._thrownobj,
      _kickedobj: game._kickedobj,
      _objects_at: game._objects_at,
      gi: game.gi,
      gp: game.gp,
      gc: game.gc,
      program_state: game.program_state,
    };
    game.u = { ux: 10, uy: 10, dx: 1, dy: 0 };
    game.invent = [];
    game.iflags = {};
    // Target square (11,10) reports blocked so the C `:873–877`
    // fallback (hero square) is what the missile arms place onto.
    game.level = { at: () => null };
    game.fobj = null;
    game._objects_at = new Map();
    game._thrownobj = null;
    game._kickedobj = null;
  });
  afterEach(() => {
    game.u = saved.u;
    game.invent = saved.invent;
    game.iflags = saved.iflags;
    game.level = saved.level;
    game.fobj = saved.fobj;
    game._thrownobj = saved._thrownobj;
    game._kickedobj = saved._kickedobj;
    game._objects_at = saved._objects_at;
    game.gi = saved.gi;
    game.gp = saved.gp;
    game.gc = saved.gc;
    game.program_state = saved.program_state;
  });

  const mkobj = (over) => ({
    o_id: 4242,
    otyp: 1,
    quan: 1,
    owt: 10,
    owornmask: 0,
    where: OBJ_FREE,
    blessed: false,
    cursed: false,
    oartifact: 0,
    in_use: false,
    ...over,
  });

  it("uses up the in-use item, places limbo missiles, lifts chain, drops perm_invent", async () => {
    const used = mkobj({ o_id: 1001, where: OBJ_INVENT, in_use: true });
    game.invent = [used];
    game._thrownobj = mkobj({ o_id: 1002 });
    game._kickedobj = mkobj({ o_id: 1003 });
    // Ball carried, chain in limbo (C `:886–890` guard).
    game.u.uball = mkobj({ o_id: 1004, where: OBJ_INVENT });
    game.u.uchain = mkobj({ o_id: 1005 });
    game.iflags.perm_invent = 1;

    await done_object_cleanup();

    // C `:854` — disposable in use is gone from invent.
    assert.ok(!game.invent.includes(used), "in-use item must be used up");
    // C `:878–885` — limbo missiles placed at the fallback hero square.
    assert.equal(game._thrownobj, null, "thrown slot cleared");
    assert.equal(game._kickedobj, null, "kicked slot cleared");
    for (const [key, pile] of game._objects_at) {
      assert.equal(key, "10,10", "missiles land on the hero square");
      for (let o = pile; o; o = o.nexthere) {
        assert.equal(o.where, OBJ_FLOOR);
      }
    }
    assert.ok(game._objects_at.has("10,10"), "pile exists at hero square");
    // C `:886–890` — limbo chain back on the floor under the hero.
    assert.equal(game.u.uchain.where, OBJ_FLOOR, "chain placed");
    assert.equal(game.u.uchain.ox, 10);
    assert.equal(game.u.uchain.oy, 10);
    assert.equal(game.bcrestriction | 0, 0, "restriction tail cleared");
    // C `:894–897` — persistent window dropped, interface notified
    // (negated arm clears the perminvent lists).
    assert.equal(game.iflags.perm_invent, false);
    assert.deepEqual(game.gi?.perminvent_entries, []);
  });

  it("leaves placed chain, kept missiles and clear invent alone", async () => {
    const kept = mkobj({ o_id: 2001, where: OBJ_INVENT });
    game.invent = [kept];
    // Chain already on the floor: C `:887` guard skips the lift, so the
    // denied-impossible arm inside lift_covet_and_placebc never fires.
    game.u.uball = mkobj({ o_id: 2002, where: OBJ_INVENT });
    game.u.uchain = mkobj({ o_id: 2003, where: OBJ_FLOOR, ox: 3, oy: 3 });

    await done_object_cleanup();

    assert.ok(game.invent.includes(kept), "unflagged item must stay");
    assert.equal(game.u.uchain.ox, 3, "placed chain untouched");
    assert.equal(game.u.uchain.where, OBJ_FLOOR);
    assert.equal(game._thrownobj, null);
    assert.equal(game._kickedobj, null);
  });
});
