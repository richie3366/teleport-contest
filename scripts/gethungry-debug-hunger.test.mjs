import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { gethungry } from "../js/eat.js";
import { monsterNames } from "../js/generated/monsters_data.js";

// C ref: eat.c gethungry `:3167` — `if (u.uinvulnerable ||
// iflags.debug_hunger) return;` — the wizard "no hunger" option
// (optlist.h:275) suppresses every hunger burn AND every draw (no rn2(10),
// no rn2(20)). JS toggled the live flag (game.iflags.debug_hunger) but
// gethungry never read it, so scen-options-Valkyrie-94311 (debug_hunger on
// at step 8, first turn at step 47) diverged there: C rn2(82)@moveloop_core
// (:360 u_wipe_engr gate) vs JS rn2(20)@gethungry.
const PM_HUMAN = monsterNames.indexOf("PM_HUMAN");

describe("gethungry debug_hunger gate (eat.c:3167)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      flags: game.flags,
      iflags: game.iflags,
      multi: game.multi,
      youmonst: game.youmonst,
    };
  });
  afterEach(() => {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete game[k];
      else game[k] = saved[k];
    }
  });

  const setup = ({ debug_hunger, uinvulnerable } = {}) => {
    initRng(94311);
    enableRngLog();
    game.flags = {};
    game.iflags = debug_hunger === undefined ? {} : { debug_hunger };
    game.multi = 0; // Unaware() false — no rn2(10) on any path here
    game.youmonst = null;
    game.u = { uhunger: 900, uhs: 1, umonnum: PM_HUMAN };
    if (uinvulnerable) game.u.uinvulnerable = true;
  };

  it("draws nothing and burns nothing with debug_hunger set", async () => {
    setup({ debug_hunger: true });
    await gethungry();
    assert.equal(getRngLog().length, 0, "gated gethungry must draw no RNG");
    assert.equal(game.u.uhunger, 900, "gated gethungry must not burn hunger");
  });

  it("draws accessorytime without the flag (control)", async () => {
    setup({ debug_hunger: false });
    await gethungry();
    assert.ok(
      getRngLog().length >= 1,
      "ungated gethungry must draw accessorytime rn2(20)",
    );
  });

  it("draws nothing when uinvulnerable (existing arm)", async () => {
    setup({ uinvulnerable: true });
    await gethungry();
    assert.equal(getRngLog().length, 0, "uinvulnerable must still gate");
    assert.equal(game.u.uhunger, 900, "uinvulnerable must not burn hunger");
  });
});
