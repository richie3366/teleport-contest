import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { relobj_on_death } from "../js/mkobj.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import { LAVAPOOL, ROOM, OBJ_MINVENT } from "../js/const.js";
import { POTION_CLASS, objectNames } from "../js/objects.js";

// C ref: steal.c relobj `:874–898` → mdrop_obj `:813–846` — every dropped
// obj runs flooreffects(obj, omx, omy, "fall") (`:840–843`) before
// place_object + stackobj (queue row: scen-tour-Samurai-92032 step 59 and
// scen-tour-Wizard-92219 step 115, nymph/orc death-drops onto lava whose
// potions C burns via lava_damage → obj_resists rn2(100) draws while JS
// silently placed them). This file pins the death-drop envelope headless:
// a soft potion dropped on lava is destroyed, the same drop on plain floor
// is placed. The hard-material fire_damage arm and the burn messages live
// in unexported lava_damage and are covered by corpus verify
// (`--fn obj_resists`), not here.
const POT_HEALING = objectNames.indexOf("POT_HEALING");

describe("relobj_on_death (steal.c:874-898 via mdrop_obj:840-843)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      level: game.level,
      fobj: game.fobj,
      objectsAt: game._objects_at,
      bhitpos: game._bhitpos,
      viz: game.viz_array,
    };
    initRng(1234);
    game.fobj = null;
    game._objects_at = new Map();
    game.viz_array = undefined; // cansee false: no pline, burn still runs
  });
  afterEach(() => {
    game.level = saved.level;
    game.fobj = saved.fobj;
    game._objects_at = saved.objectsAt;
    game._bhitpos = saved.bhitpos;
    game.viz_array = saved.viz;
  });

  const dropOn = async (typ) => {
    game.level = { at: () => ({ typ }), traps: [] };
    const mon = { mx: 5, my: 5, minvent: null, mw: null };
    const pot = {
      otyp: POT_HEALING,
      oclass: POTION_CLASS,
      where: OBJ_MINVENT,
      nobj: null,
      nexthere: null,
      cobj: null,
      ox: 0,
      oy: 0,
      quan: 1,
      ocarry: mon,
      owornmask: 0,
      oartifact: 0,
      blessed: 0,
      cursed: 0,
      bknown: 0,
      dknown: 0,
      unpaid: 0,
      no_charge: 0,
      oerodeproof: 0,
      oeroded: 0,
      oeroded2: 0,
      greased: 0,
      lamplit: 0,
    };
    mon.minvent = pot;
    await relobj_on_death(mon);
    let onFloor = false;
    for (let o = game.fobj; o; o = o.nobj) {
      if (o === pot) onFloor = true;
    }
    return { drained: mon.minvent === null, onFloor };
  };

  it("death-drop onto lava burns the potion (no floor placement)", async () => {
    const { drained, onFloor } = await dropOn(LAVAPOOL);
    assert.equal(drained, true);
    assert.equal(onFloor, false);
  });

  it("death-drop onto plain floor places the potion", async () => {
    const { drained, onFloor } = await dropOn(ROOM);
    assert.equal(drained, true);
    assert.equal(onFloor, true);
  });
});
