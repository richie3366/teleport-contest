import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { dogfood } from "../js/dogmove.js";
import { POISON, APPORT } from "../js/const.js";
import { TOOL_CLASS, objectNames } from "../js/objects.js";
import { mons, monsterNames } from "../js/monsters.js";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";

// C ref: obj.h:139 `#define opoisoned otrapped` — one bit, two names.
// A trapped CHEST/LARGE_BOX (mkobj.c:1012-1014 `otrapped = !(rn2(10))`)
// reads opoisoned in C, so dogfood (dog.c) returns POISON without
// drawing its obj_resists die. JS keeps the fields separate, so dogfood
// must read both (cliffs-head dog_goal: scen-container-Barbarian-94326
// step 69 drew rn2(8)@dog_goal:554 in C vs rn2(100)@obj_resists in JS).
const LARGE_BOX = objectNames.indexOf("LARGE_BOX");
const PM_LITTLE_DOG = monsterNames.indexOf("PM_LITTLE_DOG");

describe("dogfood trapped container (obj.h:139 alias)", () => {
  let saved;
  beforeEach(() => {
    saved = { urole: game.urole, moves: game.moves };
    game.urole = { questarti: 22 };
    game.moves = 5;
    initRng(94326);
    enableRngLog();
  });
  afterEach(() => {
    game.urole = saved.urole;
    game.moves = saved.moves;
  });

  const littleDog = () => ({
    mnum: PM_LITTLE_DOG,
    data: { ...(mons(PM_LITTLE_DOG) || {}), mndx: PM_LITTLE_DOG },
    mx: 74, my: 4, mtame: 10, mcansee: 1,
    edog: { apport: 3, hungrytime: 1000, mhpmax_penalty: 0 },
  });
  const box = (otrapped) => ({
    otyp: LARGE_BOX, oclass: TOOL_CLASS, quan: 1,
    ox: 74, oy: 3, oartifact: 0, opoisoned: 0, otrapped,
    cursed: false, blessed: false,
  });

  it("trapped box is POISON with no draw (C opoisoned bit set)", () => {
    const before = getRngLog().length;
    assert.equal(dogfood(littleDog(), box(1)), POISON);
    assert.equal(getRngLog().length, before);
  });

  it("untrapped box draws obj_resists and apport-classifies", () => {
    const before = getRngLog().length;
    assert.equal(dogfood(littleDog(), box(0)), APPORT);
    assert.equal(getRngLog().length, before + 1);
  });
});
