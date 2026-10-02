import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { STONE, ROOM, POOL } from "../js/const.js";
import { monsterNames, mons } from "../js/monsters.js";
import { mondied } from "../js/mhitm.js";
import { objects_at } from "../js/mkobj.js";
import { objects_globals_init } from "../js/objects.js";

// C ref: mon.c mondied `:3252–3263` — mondead, lifesaved return, then
// corpse_chance && (accessible || is_pool) gates make_corpse.
// JS ran make_corpse on every corpse_chance hit (self-named omit:
// "floor tiles always attempt"). Lizard keeps corpse_chance
// deterministic (PM_LIZARD arm, no rn2) so the gate is the only branch.
const LIZARD = monsterNames.indexOf("PM_LIZARD");

describe("mondied corpse gate (mon.c:3258-3260)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      iflags: game.iflags,
      fmon: game.fmon,
      level: game.level,
      mvitals: game.mvitals,
      context: game.context,
      stealmid: game.stealmid,
      objects: game._objects_at,
      otable: game.objects,
      bases: game.bases,
      probtotals: game.oclass_prob_totals,
    };
    initRng(3258);
    objects_globals_init();
    game.u = { ux: 0, uy: 0 };
    game.iflags = { debug_prevent_pline: true, purge_monsters: 0 };
    game.fmon = [];
    game.mvitals = {};
    game.context = {};
    game.stealmid = 0;
    game._objects_at = new Map();
    // Fresh loc per call (newsym mutates); deathdrops keeps
    // LEVEL_SPECIFIC_NOCORPSE false so the lizard draws its corpse.
    game.level = {
      flags: { deathdrops: true },
      at: (x, y) => ({ typ: x === 65 ? STONE : x === 67 ? POOL : ROOM }),
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.iflags = saved.iflags;
    game.fmon = saved.fmon;
    game.level = saved.level;
    game.mvitals = saved.mvitals;
    game.context = saved.context;
    game.stealmid = saved.stealmid;
    game._objects_at = saved.objects;
    game.objects = saved.otable;
    game.bases = saved.bases;
    game.oclass_prob_totals = saved.probtotals;
  });

  const mockLizard = (x, over = {}) => ({
    mhp: 0,
    mhpmax: 8,
    mx: x,
    my: 14,
    mux: 0,
    muy: 0,
    m_id: 4242,
    mtame: 0,
    mpeaceful: 0,
    mcansee: 1,
    mstate: 0,
    mleashed: 0,
    isgd: 0,
    isshk: 0,
    iswiz: 0,
    wormno: 0,
    mtrapped: 0,
    msleeping: 0,
    minvent: null,
    cham: -1,
    data: mons(LIZARD),
    ...over,
  });

  it("leaves no corpse on inaccessible non-pool ground", async () => {
    const mon = mockLizard(65);
    game.fmon.push(mon);
    await mondied(mon);
    assert.equal(mon.mhp | 0, 0);
    assert.equal(objects_at(65, 14), null);
  });

  it("still leaves a corpse on accessible ground", async () => {
    const mon = mockLizard(66);
    game.fmon.push(mon);
    await mondied(mon);
    assert.equal(mon.mhp | 0, 0);
    assert.ok(objects_at(66, 14));
  });

  it("leaves a corpse on pool (is_pool exception)", async () => {
    const mon = mockLizard(67);
    game.fmon.push(mon);
    await mondied(mon);
    assert.equal(mon.mhp | 0, 0);
    assert.ok(objects_at(67, 14));
  });
});
