import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { unearth_you, escape_tomb } from "../js/dig.js";
import { STRANGLED } from "../js/const.js";
import { objectNames } from "../js/objects.js";
import { mons, monsterNames, unsolid } from "../js/monsters.js";
import { game } from "../js/gstate.js";

// C ref: dig.c unearth_you `:2229–2238` (uburied clear, under_ground
// limited update, Strangled release unless the strangulation amulet is
// worn, vision_recalc) and escape_tomb `:2240–2270` (teleport arm, then
// the still-buried form gate: ooze/phase/tunnel + surface message,
// dighole for tunnelers, unearth_you).
// Headless notes: vision_recalc spins on a bare stub level (movemon-
// singlemon.test.mjs precedent — not a product bug, the corpus fortress
// runs it every turn), so these tests run with game.level undefined,
// where vision_recalc takes its `:1026` early return and newsym/You/
// surface/t_at stay headless (probed). The tunneler/dighole arm
// (`:2264–2265`) needs a live level and is not pinned here; REACH on
// `verify --fn escape_tomb,unearth_you` covers both exports through
// real sessions instead. No RNG is drawn on any pinned arm.
const AMULET_OF_STRANGULATION = objectNames.indexOf("AMULET_OF_STRANGULATION");
const PM_HUMAN = monsterNames.indexOf("PM_HUMAN");
const PM_GRAY_OOZE = monsterNames.indexOf("PM_GRAY_OOZE");
const PM_WATER_ELEMENTAL = monsterNames.indexOf("PM_WATER_ELEMENTAL");

describe("dig.c unearth_you / escape_tomb (dig.c:2229-2270)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      level: game.level,
      moves: game.moves,
      flags: game.flags,
    };
    game.u = {
      ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 },
      uburied: 0, uluck: 0, moreluck: 0,
      HTeleportation: 0, ETeleportation: 0, Teleportation: 0,
      HTeleport_control: 0, ETeleport_control: 0, Teleport_control: 0,
      HPasses_walls: 0, EPasses_walls: 0,
      uamul: null, uprops: [], Strangled: 0, umonnum: PM_HUMAN,
    };
    game.youmonst = { data: { ...(mons(PM_HUMAN) || {}), mndx: PM_HUMAN } };
    game.level = undefined;
    game.moves = 1000;
    game.flags = {};
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.level = saved.level;
    game.moves = saved.moves;
    game.flags = saved.flags;
  });

  const buryAs = (mndx, over = {}) => {
    game.u.uburied = 1;
    Object.assign(game.u, over);
    game.youmonst = { data: { ...(mons(mndx) || {}), mndx } };
    game.u.umonnum = mndx;
  };

  it("unearth_you clears uburied and both Strangled mirrors without the amulet", async () => {
    game.u.uburied = 1;
    game.u.Strangled = 6;
    game.u.uprops[STRANGLED] = { intrinsic: 6, extrinsic: 0 };
    await unearth_you();
    assert.equal(game.u.uburied, 0); // C `:2233`
    assert.equal(game.u.Strangled, 0); // C `:2236`
    assert.equal(game.u.uprops[STRANGLED].intrinsic, 0);
  });

  it("unearth_you keeps Strangled while the strangulation amulet is worn", async () => {
    game.u.uburied = 1;
    game.u.Strangled = 6;
    game.u.uamul = { otyp: AMULET_OF_STRANGULATION };
    await unearth_you();
    assert.equal(game.u.uburied, 0); // C `:2233` still runs
    assert.equal(game.u.Strangled, 6); // C `:2235` guard
  });

  it("escape_tomb leaves an unburied hero alone", async () => {
    await escape_tomb();
    assert.equal(game.u.uburied, 0);
  });

  it("escape_tomb keeps a buried human buried (no form, no teleport)", async () => {
    buryAs(PM_HUMAN);
    await escape_tomb();
    assert.equal(game.u.uburied, 1); // C `:2251–2255` gate shut
  });

  it("escape_tomb oozes an amorphous form out", async () => {
    buryAs(PM_GRAY_OOZE);
    await escape_tomb();
    assert.equal(game.u.uburied, 0); // C `:2266–2267` via `:2251`
  });

  it("escape_tomb keeps a water elemental buried (unsolid exclusion)", async () => {
    assert.ok(unsolid(mons(PM_WATER_ELEMENTAL))); // premise of C `:2253–2254`
    buryAs(PM_WATER_ELEMENTAL);
    await escape_tomb();
    assert.equal(game.u.uburied, 1);
  });

  it("escape_tomb phases a passes-walls hero out", async () => {
    buryAs(PM_HUMAN, { HPasses_walls: 1 });
    await escape_tomb();
    assert.equal(game.u.uburied, 0); // C `:2251` Passes_walls arm
  });

  it("escape_tomb does not fall through to the form escape when dotele fails", async () => {
    // Gate open (Teleportation + control, no RNG) but dotele fails
    // headless (unknown spell) — C `:2244–2247` is if/else-if, so the
    // `:2248` arm never runs and the human stays buried.
    buryAs(PM_HUMAN, { HTeleportation: 1, HTeleport_control: 1 });
    await escape_tomb();
    assert.equal(game.u.uburied, 1);
  });
});
