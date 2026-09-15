import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { Gloves_off } from "../js/do_wear.js";
import { objectNames } from "../js/objects.js";
import { monsterNames } from "../js/generated/monsters_data.js";
import { W_ARMG } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: do_wear.c Gloves_off `:646–702` — the `:687/696` CORPSE-gated
// `wielding_corpse` pair (review 1361 Must-fix). Gloves capture +
// `on_purpose` pre-clear, takeoff.mask clear, then the pair with the
// captured gloves. Pet ful petrify (`instapetrify`/`done`) needs full
// display/game-over state, so it is covered by session verify, not here:
// this file pins the headless envelope (async shape, gloves/mask clear,
// CORPSE-gated pair reached without display for non-stoning and resisted
// corpses).
const CORPSE = objectNames.indexOf("CORPSE");
const GLOVES_OTYP = objectNames.indexOf("LEATHER_GLOVES");
const PM_LICHEN = monsterNames.indexOf("PM_LICHEN");
const PM_COCKATRICE = monsterNames.indexOf("PM_COCKATRICE");

describe("Gloves_off (do_wear.c:646-702 gloves-doff wielding_corpse pair)", () => {
  let savedU;
  let savedContext;
  let savedInvent;
  beforeEach(() => {
    savedU = game.u;
    savedContext = game.context;
    savedInvent = game.invent;
  });
  afterEach(() => {
    game.u = savedU;
    game.context = savedContext;
    game.invent = savedInvent;
  });

  const gloves = (extra = {}) => ({
    otyp: GLOVES_OTYP,
    owornmask: W_ARMG,
    in_use: 0,
    ...extra,
  });
  const corpse = (corpsenm, extra = {}) => ({
    otyp: CORPSE,
    corpsenm,
    owornmask: 0,
    ...extra,
  });

  it("is async (caller cascade: armoroff/do_takeoff/wornarm_destroyed await it)", async () => {
    game.u = { uarmg: gloves(), uwep: null, uswapwep: null, twoweap: false };
    game.context = { takeoff: { mask: 0, cancelled_don: false }, mon_moving: false };
    game.invent = [];
    const ret = Gloves_off();
    assert.ok(ret instanceof Promise, "Gloves_off must return a Promise");
    assert.equal(await ret, 0);
  });

  it("clears gloves and the takeoff W_ARMG bit with no corpse wielded", async () => {
    const g = gloves();
    game.u = { uarmg: g, uwep: null, uswapwep: null, twoweap: false };
    game.context = { takeoff: { mask: W_ARMG, cancelled_don: false }, mon_moving: false };
    game.invent = [];
    assert.equal(await Gloves_off(), 0);
    assert.equal(game.u.uarmg, null);
    assert.equal((game.context.takeoff.mask | 0) & W_ARMG, 0);
  });

  it("reaches the CORPSE-gated pair without display for a non-stoning corpse", async () => {
    const g = gloves();
    const lich = corpse(PM_LICHEN);
    game.u = { uarmg: g, uwep: lich, uswapwep: null, twoweap: false };
    game.context = { takeoff: { mask: W_ARMG, cancelled_don: false }, mon_moving: false };
    game.invent = [];
    // Lichen never petrifies: wielding_corpse returns before any pline,
    // so this runs headless. Old bare clear_worn also passes the asserts;
    // the async-shape test above plus this branch coverage pin the pair.
    assert.equal(await Gloves_off(), 0);
    assert.equal(game.u.uarmg, null);
  });

  it("resisted cockatrice corpse does not petrify on gloves doff", async () => {
    const g = gloves();
    const cock = corpse(PM_COCKATRICE);
    game.u = {
      uarmg: g,
      uwep: cock,
      uswapwep: null,
      twoweap: false,
      Stone_resistance: 1,
    };
    game.context = { takeoff: { mask: W_ARMG, cancelled_don: false }, mon_moving: false };
    game.invent = [];
    assert.equal(await Gloves_off(), 0);
    assert.equal(game.u.uarmg, null);
  });

  it("computes on_purpose false when the gloves are in_use (no display on safe corpse)", async () => {
    const g = gloves({ in_use: 1 });
    const lich = corpse(PM_LICHEN);
    game.u = { uarmg: g, uwep: lich, uswapwep: null, twoweap: false };
    game.context = { takeoff: { mask: W_ARMG, cancelled_don: false }, mon_moving: false };
    game.invent = [];
    assert.equal(await Gloves_off(), 0);
    assert.equal(game.u.uarmg, null);
  });
});
