import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dog_eat } from "../js/dogmove.js";
import { ROOM } from "../js/const.js";
import { FOOD_CLASS, objectNames } from "../js/objects.js";
import { mons, monsterNames } from "../js/monsters.js";
import { game } from "../js/gstate.js";

// C ref: dogmove.c dog_eat `:300–311` — rust-monster pet eating a
// rustproof item eats the proof, is briefly stunned, and spits the item
// out instead of consuming it (no m_consume_obj/delobj on this arm).
// Pins the headless envelope: derust + stun + return 1, with no RNG
// drawn (the arm returns before dogfood/obj_resists).
const TRIPE = objectNames.indexOf("TRIPE_RATION");
const PM_RUST_MONSTER = monsterNames.indexOf("PM_RUST_MONSTER");

describe("dog_eat rust-monster spit arm (dogmove.c:300-311)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      level: game.level,
      fmon: game.fmon,
      moves: game.moves,
      flags: game.flags,
      iflags: game.iflags,
      viz: game.viz_array,
    };
    game.u = { ux: 5, uy: 5 };
    game.level = {
      at: () => ({ typ: ROOM, doormask: 0, roomno: 0, flags: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
    game.moves = 1000;
    game.flags = {};
    game.iflags = undefined;
    game.viz_array = undefined;
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
    game.fmon = saved.fmon;
    game.moves = saved.moves;
    game.flags = saved.flags;
    game.iflags = saved.iflags;
    game.viz_array = saved.viz;
  });

  const rustPet = () => ({
    mx: 10, my: 10, mhp: 20, mhpmax: 20, mtame: 5, mflee: 0,
    mfleetim: 0, mconf: 0, meating: 0, mstun: 0,
    mnum: PM_RUST_MONSTER,
    data: { ...(mons(PM_RUST_MONSTER) || {}), mndx: PM_RUST_MONSTER },
    edog: { hungrytime: 500, apport: 10, dropdist: 0, droptime: 0, mhpmax_penalty: 0 },
  });
  const proofedSnack = () => ({
    otyp: TRIPE, oclass: FOOD_CLASS, quan: 1, owt: 10,
    unpaid: false, oerodeproof: 1, invlet: 0,
    cursed: false, blessed: false, oeaten: 0,
  });

  it("rust pet derusts, stuns, and returns 1 without consuming", async () => {
    const pet = rustPet();
    const obj = proofedSnack();
    const ret = await dog_eat(pet, obj, pet.mx, pet.my, false);
    assert.equal(ret, 1);
    // C `:305–307` — proof eaten, brief stun; the item is spat out,
    // so it is never consumed (old code fell through to m_consume_obj).
    assert.equal(obj.oerodeproof, 0);
    assert.equal(pet.mstun, 1);
  });
});
