import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { carrying_stoning_corpse } from "../js/do_wear.js";
import {
  u_safe_from_fatal_corpse,
  st_corpse,
  st_petrifies,
} from "../js/pickup.js";
import { gloves_simple_name, obj_pmname_corpse } from "../js/objnam.js";
import { objectNames } from "../js/objects.js";
import { monsterNames } from "../js/generated/monsters_data.js";
import { game } from "../js/gstate.js";

// C ref: invent.c carrying_stoning_corpse `:1507–1516` + do_wear.c
// better_not_take_that_off `:2989–3010` (D-1602-named residual). The glove
// arm of select_off must prompt before the takeoff mask is set while a
// stoning corpse is carried. Pure invent scan — no display/input, runs
// headless. The paranoid prompt itself needs nhgetch; it is covered by
// session verify, not here.
const CORPSE = objectNames.indexOf("CORPSE");
const PM_COCKATRICE = monsterNames.indexOf("PM_COCKATRICE");
const PM_CHICKATRICE = monsterNames.indexOf("PM_CHICKATRICE");
const PM_LICHEN = monsterNames.indexOf("PM_LICHEN");
const GLOVES = objectNames.indexOf("GLOVES");

describe("carrying_stoning_corpse (better_not_take_that_off guard)", () => {
  let savedInvent;
  beforeEach(() => {
    savedInvent = game.invent;
  });
  afterEach(() => {
    game.invent = savedInvent;
  });

  const corpse = (corpsenm, extra = {}) => ({
    otyp: CORPSE,
    corpsenm,
    spe: 0,
    ...extra,
  });

  it("returns null when the pack is empty or missing", () => {
    game.invent = [];
    assert.equal(carrying_stoning_corpse(), null);
    game.invent = null;
    assert.equal(carrying_stoning_corpse(), null);
  });

  it("skips non-corpses and corpses that do not petrify", () => {
    game.invent = [
      { otyp: GLOVES },
      corpse(PM_LICHEN),
    ];
    assert.equal(carrying_stoning_corpse(), null);
  });

  it("finds a cockatrice corpse and a chickatrice corpse", () => {
    const cock = corpse(PM_COCKATRICE);
    game.invent = [{ otyp: GLOVES }, cock];
    assert.equal(carrying_stoning_corpse(), cock);
    const chick = corpse(PM_CHICKATRICE);
    game.invent = [chick];
    assert.equal(carrying_stoning_corpse(), chick);
  });

  it("returns the first stoning corpse like the C loop", () => {
    const first = corpse(PM_CHICKATRICE);
    const second = corpse(PM_COCKATRICE);
    game.invent = [corpse(PM_LICHEN), first, second];
    assert.equal(carrying_stoning_corpse(), first);
  });

  it("found corpse fails the stoning guard so the prompt fires", () => {
    const cock = corpse(PM_COCKATRICE);
    game.invent = [cock];
    const found = carrying_stoning_corpse();
    // C `:3002` — st_corpse|st_petrifies without st_resists: a real
    // stoning corpse is never "safe", so select_off must ask.
    assert.equal(u_safe_from_fatal_corpse(found, st_corpse | st_petrifies), false);
    // Prompt nouns (C `:3004–3006`): plain gloves + monster pmname.
    assert.equal(gloves_simple_name({ otyp: GLOVES, dknown: 0 }), "gloves");
    assert.equal(obj_pmname_corpse(found), "cockatrice");
  });

  it("non-stoning corpses pass the same guard (no prompt)", () => {
    assert.equal(
      u_safe_from_fatal_corpse(corpse(PM_LICHEN), st_corpse | st_petrifies),
      true,
    );
  });
});
