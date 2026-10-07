import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { doturn } from "../js/pray.js";
import { roles } from "../js/roles.js";
import { PM_CLERIC } from "../js/generated/monsters_data.js";
import { A_LAWFUL, ECMD_OK, ECMD_TIME } from "../js/const.js";
import { initRng } from "../js/rng.js";

// C ref: pray.c doturn `:2426` (`if (!u.uconduct.gnostic++)`) + `:2442`
// (`return (u.uconduct.gnostic == 1) ? ECMD_TIME : ECMD_OK`) — the first
// act breaking agnostic conduct costs a move even when #turn itself fails
// (here: Strangled, so can_chant is false). Pins the can_chant-failure arm:
// an unset gnostic counter must become 1 (a number, never NaN) and the
// call must return ECMD_TIME; the second call returns ECMD_OK.
// Corpus: scen-intrinsic-Priest-92096 step 149 (C `--More--` from the
// post-turn jackal attack vs JS bare topline).
describe("doturn first-break gnostic (pray.c:2426,2442)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, urole: game.urole, youmonst: game.youmonst };
    initRng(92096);
    game.urole = roles.find((r) => r.mnum === PM_CLERIC);
    game.u = {
      Strangled: 1,
      uconduct: {},
      ualign: { type: A_LAWFUL, record: 0 },
      ulevel: 1,
      ugangr: 0,
    };
    game.youmonst = { data: { mlet: "S_HUMAN", mndx: 0 } };
  });
  afterEach(() => {
    game.u = saved.u;
    game.urole = saved.urole;
    game.youmonst = saved.youmonst;
  });

  it("first strangled #turn consumes time (ECMD_TIME), gnostic 0->1", async () => {
    const ret = await doturn();
    assert.equal(ret, ECMD_TIME);
    assert.equal(game.u.uconduct.gnostic, 1);
  });

  it("second strangled #turn is free (ECMD_OK), gnostic 1->2", async () => {
    game.u.uconduct.gnostic = 1;
    const ret = await doturn();
    assert.equal(ret, ECMD_OK);
    assert.equal(game.u.uconduct.gnostic, 2);
  });
});
