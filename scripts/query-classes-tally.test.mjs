import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { tally_BUCX } from "../js/invent.js";
import { COIN_CLASS, WEAPON_CLASS } from "../js/generated/objects_data.js";
import { PM_CLERIC } from "../js/generated/monsters_data.js";
import { game } from "../js/gstate.js";

// C ref: invent.c tally_BUCX `:3580–3616` — priests always know the
// bless/curse state (`:3593–3595` forces bknown, coins excepted), coins
// count X only under goldX, `pickup_prev` counts j. pickup.c
// query_classes `:181` (D-2388) calls this canonical tally; the retired
// local clone dropped the priest arm, so a priest's TRADITIONAL prompt
// lost the B/U/C ilets. Pure counting — no display/input, runs headless.
describe("tally_BUCX priest bknown force (query_classes :181)", () => {
  let savedRole;
  beforeEach(() => {
    savedRole = game.urole;
  });
  afterEach(() => {
    game.urole = savedRole;
  });

  const mk = (oclass, extra = {}) => ({
    oclass,
    bknown: 0,
    blessed: 0,
    cursed: 0,
    pickup_prev: 0,
    ...extra,
  });

  it("leaves unknowns as X and mutates nothing for non-priests", () => {
    game.urole = { mnum: -999 };
    const w = mk(WEAPON_CLASS);
    const t = tally_BUCX([w, mk(COIN_CLASS)], false);
    assert.equal(t.x, 1);
    assert.equal(t.u, 1);
    assert.equal(w.bknown, 0);
  });

  it("forces bknown on non-coins for instantly-known priests", () => {
    game.urole = { mnum: PM_CLERIC };
    const w = mk(WEAPON_CLASS);
    const b = mk(WEAPON_CLASS, { blessed: 1 });
    const c = mk(COIN_CLASS);
    const t = tally_BUCX([w, b, c], false);
    assert.equal(t.u, 2);
    assert.equal(t.b, 1);
    assert.equal(t.x, 0);
    assert.equal(w.bknown, 1);
    assert.equal(c.bknown, 0);
  });

  it("walks the nexthere chain when by_nexthere (floor pile)", () => {
    game.urole = { mnum: -999 };
    const head = mk(WEAPON_CLASS, { cursed: 1 });
    head.nexthere = mk(WEAPON_CLASS);
    const t = tally_BUCX(head, true);
    assert.equal(t.x, 2);
  });
});
