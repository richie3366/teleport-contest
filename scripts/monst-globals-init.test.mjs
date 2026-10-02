import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  mons,
  monst_globals_init,
  adj_erinys,
  reset_erinys,
  commit_pm_fixup,
} from "../js/monsters.js";
import { monsterNames } from "../js/generated/monsters_data.js";

const PM_ERINYS = monsterNames.indexOf("PM_ERINYS");

// C ref: monst.c monst_globals_init `:71–76` — `memcpy(mons, mons_init,
// sizeof mons)` restores ALL of mons[], including mons[PM_ERINYS] written
// in place by mon.c adj_erinys `:5918–5966` (review 2266: the overlay
// clear alone left the erinys boost in place).
describe("monst_globals_init erinys-reset effect (monst.c:71-76)", () => {
  afterEach(() => {
    reset_erinys();
    game.pm_fixup = Object.create(null);
  });

  it("restores the erinys baseline after adj_erinys(60)", () => {
    assert.ok(PM_ERINYS >= 0);
    const baseline = JSON.stringify(mons(PM_ERINYS));
    adj_erinys(60);
    assert.notEqual(JSON.stringify(mons(PM_ERINYS)), baseline);
    monst_globals_init();
    assert.equal(JSON.stringify(mons(PM_ERINYS)), baseline);
  });

  it("clears the pm_fixup overlay in the same call", () => {
    commit_pm_fixup(PM_ERINYS, { msound: 99 });
    monst_globals_init();
    assert.deepEqual(game.pm_fixup, Object.create(null));
  });
});
