import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { maketrap } from "../js/trap.js";
import {
  TT_NONE,
  TT_BEARTRAP,
  TT_PIT,
  TT_WEB,
  PIT,
  HOLE,
  BEAR_TRAP,
  WEB,
  ROOM,
} from "../js/const.js";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";

// C ref: trap.c maketrap `:466–473` — replacing the trap under a trapped
// hero frees them when the new type can't hold that trap kind
// (scen-dig-Archeologist-94215 step 32 / -94135 step 41: the self-dug
// pit becomes a HOLE mid-digactualhole; C reset_utrap(FALSE)s, restores
// vision via the pline-time recalc, and paints the mold/dog — JS kept
// u.utrap and painted background). Pins the headless envelope: the
// four oldplace disjunction arms + keep-cases. PIT->PIT keeps (is_pit);
// LAVA needs wet terrain and stays corpus-covered.
describe("maketrap oldplace untrap (trap.c:466-473)", () => {
  let saved;
  beforeEach(() => {
    saved = { u: game.u, level: game.level };
    initRng(466);
    game.u = { ux: 10, uy: 10, utrap: 0, utraptype: TT_NONE };
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

  const setup = (utraptype, oldtyp, { utrap = 2 } = {}) => {
    game.u.utrap = utrap;
    game.u.utraptype = utraptype;
    game.level.traps = [{ tx: 10, ty: 10, ttyp: oldtyp, tseen: true }];
  };

  it("PIT->HOLE under a pit-trapped hero frees silently", () => {
    setup(TT_PIT, PIT);
    const t = maketrap(10, 10, HOLE);
    assert.ok(t);
    assert.equal(game.u.utrap, 0);
    assert.equal(game.u.utraptype, TT_NONE);
  });

  it("PIT->PIT keeps the pit trap", () => {
    setup(TT_PIT, PIT);
    maketrap(10, 10, PIT);
    assert.equal(game.u.utrap, 2);
    assert.equal(game.u.utraptype, TT_PIT);
  });

  it("BEAR_TRAP->PIT frees, BEAR_TRAP->BEAR_TRAP keeps", () => {
    setup(TT_BEARTRAP, BEAR_TRAP);
    maketrap(10, 10, PIT);
    assert.equal(game.u.utrap, 0);
    assert.equal(game.u.utraptype, TT_NONE);
    setup(TT_BEARTRAP, BEAR_TRAP);
    maketrap(10, 10, BEAR_TRAP);
    assert.equal(game.u.utrap, 2);
    assert.equal(game.u.utraptype, TT_BEARTRAP);
  });

  it("WEB->PIT frees, WEB->WEB keeps", () => {
    setup(TT_WEB, WEB);
    maketrap(10, 10, PIT);
    assert.equal(game.u.utrap, 0);
    assert.equal(game.u.utraptype, TT_NONE);
    setup(TT_WEB, WEB);
    maketrap(10, 10, WEB);
    assert.equal(game.u.utrap, 2);
    assert.equal(game.u.utraptype, TT_WEB);
  });

  it("untrapped hero and foreign squares are unaffected", () => {
    game.u.utrap = 0;
    game.u.utraptype = TT_NONE;
    game.level.traps = [{ tx: 10, ty: 10, ttyp: PIT, tseen: true }];
    maketrap(10, 10, HOLE);
    assert.equal(game.u.utrap, 0);
    setup(TT_PIT, PIT);
    game.level.traps = [{ tx: 12, ty: 12, ttyp: PIT, tseen: true }];
    game.u.ux = 10;
    game.u.uy = 10;
    maketrap(10, 10, HOLE);
    assert.equal(game.u.utrap, 2);
    assert.equal(game.u.utraptype, TT_PIT);
  });
});
