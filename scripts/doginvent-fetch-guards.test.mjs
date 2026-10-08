import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dog_move } from "../js/dogmove.js";
import { MMOVE_NOTHING, ROOM } from "../js/const.js";
import { SCROLL_CLASS, objectNames } from "../js/objects.js";
import { MZ_SMALL } from "../js/monsters.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: dogmove.c dog_invent `:427–434` — the underfoot-fetch gate:
// nofetch classes (BALL/CHAIN/ROCK) + MAIL_STRUCTURES SCR_MAIL skip
// (`:429–431`; global.h:430 unconditional) + mines/soko prize
// exclusion (`:432–434`). D-3697 wires the last two (D-2417 named
// omits; dog_invent partial → ported).
//
// Drives the exported dog_move headless with after=true at udist 2:
// dog_invent runs first (dogmove.c:1032), then dog_goal returns -2
// (after && udist<=4 at the hero goal) so dog_move returns
// MMOVE_NOTHING before the movement body — the test observes only
// the invent step. RNG is seeded; apport 18 makes the rn2(20) gate
// deterministic (rn2(20) < 21 always).
const SCR_MAIL = objectNames.indexOf("SCR_MAIL");
const SCR_IDENTIFY = objectNames.indexOf("SCR_IDENTIFY");

describe("dog_invent fetch guards (dogmove.c:427-434)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      fobj: game.fobj,
      invent: game.invent,
      ftrap: game.ftrap,
      viz: game.viz_array,
      moves: game.moves,
      objects: game._objects_at,
      flags: game.flags,
      context: game.context,
    };
    game.u = { ux: 10, uy: 10, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      at: () => ({ typ: ROOM }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
    game.fobj = null;
    game.invent = [];
    game.ftrap = null;
    game.viz_array = [];
    game.moves = 100;
    game._objects_at = new Map();
    game.flags = { ...(saved.flags || {}), verbose: false };
    game.context = { achieveo: {} };
    assert.ok(SCR_MAIL >= 0, "SCR_MAIL otyp exists");
    assert.ok(SCR_IDENTIFY >= 0, "SCR_IDENTIFY otyp exists");
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.fobj = saved.fobj;
    game.invent = saved.invent;
    game.ftrap = saved.ftrap;
    game.viz_array = saved.viz;
    game.moves = saved.moves;
    game._objects_at = saved.objects;
    game.flags = saved.flags;
    game.context = saved.context;
  });

  // Pet diagonal-adjacent to the hero (udist 2: nonzero so dog_move
  // proceeds, <=4 so dog_goal returns -2 under after=true).
  const petAt = (mx, my) => {
    const edog = {
      apport: 18, hungrytime: 100000, whistletime: 0,
      mhpmax_penalty: 0, dropdist: 0, droptime: 0,
    };
    const pet = {
      mx, my, mux: 10, muy: 10, mconf: 0, mflee: 0, mleashed: 0,
      mtame: 1, isminion: 0, mcansee: 1, m_lev: 3, mhp: 10, mhpmax: 10,
      mw: null, minvent: null, msleeping: 0, mfrozen: 0, meating: 0,
      minvis: 0, mcanmove: 1,
      data: { mlet: "S_DOG", mflags1: 0, mflags2: 0, mflags3: 0, mattk: [], msize: MZ_SMALL },
      edog,
    };
    return pet;
  };
  const scrollAt = (otyp, o_id) => ({
    otyp, oclass: SCROLL_CLASS, ox: 11, oy: 11, quan: 1, owt: 5,
    cursed: false, o_id, nexthere: null, nobj: null, oartifact: 0,
    opoisoned: 0, otrapped: 0, bknown: 0,
  });

  it("control: pet picks up an ordinary scroll underfoot", async () => {
    initRng(7);
    const pet = petAt(11, 11);
    const scroll = scrollAt(SCR_IDENTIFY, 102);
    game._objects_at.set("11,11", scroll);
    const r = await dog_move(pet, true);
    assert.equal(r, MMOVE_NOTHING, "invent step then dog_goal -2 early return");
    assert.notEqual(
      game._objects_at.get("11,11"), scroll,
      "ordinary scroll leaves the floor (pickup path live)",
    );
    assert.ok(pet.minvent, "ordinary scroll lands in the pet inventory");
  });

  it("pet leaves a scroll of mail underfoot (MAIL_STRUCTURES :429-431)", async () => {
    initRng(7);
    const pet = petAt(11, 11);
    const mail = scrollAt(SCR_MAIL, 101);
    game._objects_at.set("11,11", mail);
    const r = await dog_move(pet, true);
    assert.equal(r, MMOVE_NOTHING, "invent step then dog_goal -2 early return");
    assert.equal(
      game._objects_at.get("11,11"), mail,
      "mail stays on the floor like C",
    );
    assert.equal(pet.minvent, null, "mail never enters the pet inventory");
  });

  it("pet leaves the mines prize underfoot (:432-434)", async () => {
    initRng(7);
    game.context = { achieveo: { mines_prize_oid: 777, soko_prize_oid: 0 } };
    const pet = petAt(11, 11);
    const prize = scrollAt(SCR_IDENTIFY, 777);
    game._objects_at.set("11,11", prize);
    const r = await dog_move(pet, true);
    assert.equal(r, MMOVE_NOTHING, "invent step then dog_goal -2 early return");
    assert.equal(
      game._objects_at.get("11,11"), prize,
      "mines prize stays on the floor like C",
    );
    assert.equal(pet.minvent, null, "prize never enters the pet inventory");
  });

  it("pet leaves the soko prize underfoot (:432-434)", async () => {
    initRng(7);
    game.context = { achieveo: { mines_prize_oid: 0, soko_prize_oid: 778 } };
    const pet = petAt(11, 11);
    const prize = scrollAt(SCR_IDENTIFY, 778);
    game._objects_at.set("11,11", prize);
    const r = await dog_move(pet, true);
    assert.equal(r, MMOVE_NOTHING, "invent step then dog_goal -2 early return");
    assert.equal(
      game._objects_at.get("11,11"), prize,
      "soko prize stays on the floor like C",
    );
    assert.equal(pet.minvent, null, "prize never enters the pet inventory");
  });
});
