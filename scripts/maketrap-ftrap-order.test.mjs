import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { maketrap, t_at } from "../js/trap.js";
import {
  ARROW_TRAP,
  DART_TRAP,
  BEAR_TRAP,
  ROOM,
} from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: trap.c maketrap `:577–579` — new traps head-insert
// (`ttmp->ntrap = gf.ftrap; gf.ftrap = ttmp`), so every gf.ftrap walk
// (display_trap_map sense_trap fakes, set_wportal, dogmove portal gate)
// sees newest-first. JS appended (oldest-first): under hallucination the
// display-RNG fake appearances landed on swapped cells
// (scen-sweep-Knight-95311 step 440: (74,3) C `%` vs JS `?` while
// (8,15) C `?` vs JS `%` — the outer two of three floor-trap fakes
// exchanged, the middle one fixed: exact reversal signature).
describe("maketrap ftrap order (trap.c:577-579)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, level: game.level };
    initRng(95311);
    game.u = { ux: 10, uy: 10, utrap: 0, utraptype: 0, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      traps: [],
      rooms: [],
      at: () => ({ typ: ROOM }),
    };
  });
  afterEach(() => {
    game.u = saved.u;
    game.level = saved.level;
  });

  it("newest trap is first (C gf.ftrap head-insert)", () => {
    const t1 = maketrap(8, 15, ARROW_TRAP);
    const t2 = maketrap(25, 14, DART_TRAP);
    const t3 = maketrap(74, 3, BEAR_TRAP);
    assert.ok(t1 && t2 && t3);
    assert.deepEqual(game.level.traps, [t3, t2, t1]);
  });

  it("t_at finds every trap regardless of order", () => {
    maketrap(8, 15, ARROW_TRAP);
    maketrap(25, 14, DART_TRAP);
    assert.equal(t_at(8, 15)?.ttyp, ARROW_TRAP);
    assert.equal(t_at(25, 14)?.ttyp, DART_TRAP);
    assert.equal(t_at(9, 15), null);
  });

  it("oldplace overwrite keeps list position (C does not re-link)", () => {
    maketrap(8, 15, ARROW_TRAP);
    maketrap(25, 14, DART_TRAP);
    maketrap(8, 15, BEAR_TRAP);
    assert.equal(game.level.traps.length, 2);
    assert.equal(game.level.traps[1].ttyp, BEAR_TRAP);
    assert.equal(game.level.traps[0].tx, 25);
  });
});
