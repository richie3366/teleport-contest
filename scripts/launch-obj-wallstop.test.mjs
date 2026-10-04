import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { launch_obj } from "../js/trap.js";
import { objects_at } from "../js/mkobj.js";
import { objects_globals_init } from "../js/objects.js";
import { objectNames } from "../js/generated/objects_data.js";
import {
  ROOM,
  SDOOR,
  SCORR,
  VWALL,
  OBJ_FLOOR,
  D_NODOOR,
} from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: trap.c launch_obj `:3556` + `:3568–3572` (review 2372 Must-fix
// 2): the lookahead wall-stop fires on STWALL/TREE only — boulders roll
// through SDOOR/SCORR — and the rest tail places without stackobj.
// JS stopped at every IS_OBSTRUCTED typ (typ < POOL: SDOOR/SCORR
// included) and stacked the rest pile. This file pins the headless
// envelope: SDOOR + SCORR roll-through, STWALL still stops, and a
// launched rock rests unmerged on an occupied square (rocks merge —
// ROCK BITS mrg=1 — so the tail stackobj was observable there;
// boulders never merge, oc_merge=0, in both).
const BOULDER = objectNames.indexOf("BOULDER");
const ROCK = objectNames.indexOf("ROCK");

describe("launch_obj wall-stop + rest (trap.c:3556,3568-3572)", () => {
  let saved;
  let nextId;
  beforeEach(() => {
    saved = {
      u: game.u,
      fmon: game.fmon,
      level: game.level,
      objectsAt: game._objects_at,
      fobj: game.fobj,
      objects: game.objects,
      bases: game.bases,
      totals: game.oclass_prob_totals,
      bhitpos: game.bhitpos,
      launchplace: game.launchplace,
      viz: game.viz_array,
    };
    nextId = 1;
    initRng(2372);
    objects_globals_init();
    game.u = { ux: 0, uy: 0 };
    game.fmon = [];
    game.viz_array = undefined;
    game.bhitpos = {};
    game.launchplace = null;
    game._objects_at = new Map();
    game.fobj = null;
  });
  afterEach(() => {
    game.u = saved.u;
    game.fmon = saved.fmon;
    game.level = saved.level;
    game._objects_at = saved.objectsAt;
    game.fobj = saved.fobj;
    game.objects = saved.objects;
    game.bases = saved.bases;
    game.oclass_prob_totals = saved.totals;
    game.bhitpos = saved.bhitpos;
    game.launchplace = saved.launchplace;
    game.viz_array = saved.viz;
  });

  const setupLevel = (cells) => {
    game.level = {
      traps: [],
      flags: {},
      at: (x, y) =>
        cells.get(`${x},${y}`) || { typ: ROOM, doormask: D_NODOOR },
    };
  };
  const place = (otyp, x, y) => {
    const o = {
      otyp,
      quan: 1,
      ox: x,
      oy: y,
      where: OBJ_FLOOR,
      nexthere: null,
      nobj: game.fobj,
      otrapped: 0,
      spe: 0,
      o_id: nextId++,
      oclass: 2,
      cursed: 0,
      blessed: 0,
    };
    game.fobj = o;
    const key = `${x},${y}`;
    o.nexthere = game._objects_at.get(key) || null;
    game._objects_at.set(key, o);
    return o;
  };
  const pileAt = (x, y) => {
    const out = [];
    for (let o = objects_at(x, y); o; o = o.nexthere) out.push(o);
    return out;
  };

  it("boulder rolls through SDOOR to its target", async () => {
    setupLevel(new Map([["13,10", { typ: SDOOR, doormask: D_NODOOR }]]));
    const b = place(BOULDER, 10, 10);
    const ret = await launch_obj(BOULDER, 10, 10, 14, 10, 0);
    assert.equal(ret, 1);
    assert.equal(b.ox, 14);
    assert.equal(b.oy, 10);
  });

  it("boulder rolls through SCORR to its target", async () => {
    setupLevel(new Map([["13,10", { typ: SCORR, doormask: D_NODOOR }]]));
    const b = place(BOULDER, 10, 10);
    const ret = await launch_obj(BOULDER, 10, 10, 14, 10, 0);
    assert.equal(ret, 1);
    assert.equal(b.ox, 14);
    assert.equal(b.oy, 10);
  });

  it("boulder still stops before STWALL", async () => {
    setupLevel(new Map([["13,10", { typ: VWALL, doormask: D_NODOOR }]]));
    const b = place(BOULDER, 10, 10);
    const ret = await launch_obj(BOULDER, 10, 10, 14, 10, 0);
    assert.equal(ret, 1);
    assert.equal(b.ox, 12);
    assert.equal(b.oy, 10);
  });

  it("launched rock rests unmerged on an occupied square", async () => {
    setupLevel(new Map());
    place(ROCK, 14, 10);
    const flying = place(ROCK, 10, 10);
    const ret = await launch_obj(ROCK, 10, 10, 14, 10, 0);
    assert.equal(ret, 1);
    assert.equal(flying.ox, 14);
    assert.equal(flying.oy, 10);
    const pile = pileAt(14, 10);
    assert.equal(pile.length, 2);
    assert.ok(pile.every((o) => (o.quan | 0) === 1));
  });
});
