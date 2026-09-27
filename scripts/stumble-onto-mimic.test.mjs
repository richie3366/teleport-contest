import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { stumble_onto_mimic } from "../js/uhitm.js";
import { m_next2u } from "../js/mon.js";
import { GLYPH_INVISIBLE } from "../js/display.js";
import { game } from "../js/gstate.js";

// C ref: uhitm.c stumble_onto_mimic `:6282–6297` — reveal, maybe stick,
// wake, map the unseen square. Pins the two arms the thin JS body used to
// defer: the AD_STCK set_ustuck arm (`:6287–6291`, incl. the you.h
// m_next2u adjacency gate — a polearm attack can come from farther away)
// and the blind-hero map_invisible tail (`:6294–6296`).
const AD_STCK = 19; // monattk.h — stick-to (mimic); file-local in js/uhitm.js
const M_AP_FURNITURE = 1; // monst.h

describe("m_next2u canonical export (you.h:560)", () => {
  let savedU;
  beforeEach(() => {
    savedU = game.u;
    game.u = { ux: 10, uy: 10 };
  });
  afterEach(() => {
    game.u = savedU;
  });

  it("holds on top of, orthogonally and diagonally next to the hero", () => {
    assert.equal(m_next2u({ mx: 10, my: 10 }), true);
    assert.equal(m_next2u({ mx: 11, my: 10 }), true);
    assert.equal(m_next2u({ mx: 9, my: 11 }), true);
  });

  it("fails at polearm range (distu squared > 2)", () => {
    assert.equal(m_next2u({ mx: 12, my: 10 }), false);
    assert.equal(m_next2u({ mx: 11, my: 12 }), false);
  });
});

describe("stumble_onto_mimic (uhitm.c:6282-6297)", () => {
  let savedU, savedLevel;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
    game.u = { ux: 10, uy: 10, ustuck: null };
    game.level = {
      at: () => ({ remembered_glyph: { glyph: 0 } }),
      flags: { hero_memory: true },
    };
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
  });

  const stickyMimic = (mx, my, over = {}) => ({
    mx, my, mflee: 0, msleeping: 0, mfrozen: 0, mcansee: 1, mblinded: 0,
    mcanmove: 1, m_ap_type: M_AP_FURNITURE, mappearance: 0, minvis: 0,
    data: {
      mlet: "S_MIMIC",
      mattk: [{ attyp: 0, adtyp: AD_STCK, damn: 1, damd: 4 }],
    },
    ...over,
  });

  it("sticks the hero to an adjacent non-fleeing sticky mimic (:6287-6291)", async () => {
    const mtmp = stickyMimic(11, 10);
    await stumble_onto_mimic(mtmp);
    assert.equal(game.u.ustuck, mtmp);
  });

  it("does not stick a fleeing mimic", async () => {
    const mtmp = stickyMimic(11, 10, { mflee: 1 });
    await stumble_onto_mimic(mtmp);
    assert.equal(game.u.ustuck, null);
  });

  it("does not stick at polearm range", async () => {
    const mtmp = stickyMimic(12, 10);
    await stumble_onto_mimic(mtmp);
    assert.equal(game.u.ustuck, null);
  });

  it("does not overwrite an existing hold", async () => {
    const holder = { mx: 9, my: 10 };
    game.u.ustuck = holder;
    const mtmp = stickyMimic(11, 10);
    await stumble_onto_mimic(mtmp);
    assert.equal(game.u.ustuck, holder);
  });

  it("maps the unseen square for a blind hero (:6294-6296)", async () => {
    game.u.HBlinded = 1;
    const loc = { remembered_glyph: { glyph: 0 } };
    game.level.at = () => loc;
    const mtmp = stickyMimic(11, 10);
    await stumble_onto_mimic(mtmp);
    assert.equal(loc.remembered_glyph.glyph, GLYPH_INVISIBLE);
  });

  it("leaves the map alone when the hero senses the mimic", async () => {
    // canspotmon = canseemon || sensemon; Detect_monsters drives the
    // sensemon disjunct with no vision state, so the `:6294` gate skips
    // the map write (headless has no lit/seen grid for cansee).
    game.u.HDetect_monsters = 1;
    const loc = { remembered_glyph: { glyph: 0 } };
    game.level.at = () => loc;
    const mtmp = stickyMimic(11, 10);
    await stumble_onto_mimic(mtmp);
    assert.equal(loc.remembered_glyph.glyph, 0);
  });
});
