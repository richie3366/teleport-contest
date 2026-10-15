import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { arrive_find_magic_portal } from "../js/dog.js";
import { MAGIC_PORTAL, BEAR_TRAP } from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: dog.c mon_arrive MIGR_PORTAL `:553–557` — first MAGIC_PORTAL on
// the gf.ftrap chain decides the migrant's arrival locale; missing (and
// not qexpelled) prints impossible and falls through to MIGR_RANDOM+rloc.
// JS splits C's chain: maketrap head-inserts the live level.traps array
// and never sets game.ftrap (null on fresh levels), but the arrival scan
// walked only game.ftrap — blind to live portals (scen-sweep Wizard-
// 50250001 s308 / Monk-50055045 s1479: C somexy jitter, JS rloc +
// impossible, first divergence in mon_arrive placement).
// Pins the live-first fix (dog_goal D-3411 / goto_level do.js:2145
// sibling): level.traps (C newest-first order) wins, gf-shaped game.ftrap
// (array or ntrap chain) is the fallback; first portal decides.
describe("mon_arrive MIGR_PORTAL scan (live trap store)", () => {
  let saved;
  beforeEach(() => {
    saved = { level: game.level, ftrap: game.ftrap };
    game.level = { traps: [] };
    game.ftrap = null;
  });
  afterEach(() => {
    game.level = saved.level;
    game.ftrap = saved.ftrap;
  });

  const portalAt = (tx, ty, extra = {}) => ({
    ttyp: MAGIC_PORTAL, tx, ty, tseen: 0, ntrap: null, ...extra,
  });

  it("portal in level.traps found with game.ftrap null (fresh shape)", () => {
    game.level.traps = [portalAt(52, 5)];
    const t = arrive_find_magic_portal();
    assert.ok(t);
    assert.equal(t.tx, 52);
    assert.equal(t.ty, 5);
  });

  it("first (newest) level.traps portal wins", () => {
    const older = portalAt(10, 10);
    const newer = portalAt(52, 5);
    game.level.traps = [newer, older]; // maketrap unshifts: newest first
    assert.equal(arrive_find_magic_portal(), newer);
  });

  it("non-portal traps skipped in level.traps", () => {
    game.level.traps = [
      { ttyp: BEAR_TRAP, tx: 1, ty: 1, ntrap: null },
      portalAt(52, 5),
    ];
    const t = arrive_find_magic_portal();
    assert.ok(t);
    assert.equal(t.tx, 52);
  });

  it("portal on the ftrap chain still counts (legacy shape)", () => {
    game.ftrap = portalAt(20, 10);
    const t = arrive_find_magic_portal();
    assert.ok(t);
    assert.equal(t.tx, 20);
  });

  it("portal in ftrap array still counts (restore shape)", () => {
    game.ftrap = [portalAt(21, 11)];
    const t = arrive_find_magic_portal();
    assert.ok(t);
    assert.equal(t.tx, 21);
  });

  it("no portal anywhere returns null", () => {
    game.level.traps = [{ ttyp: BEAR_TRAP, tx: 1, ty: 1, ntrap: null }];
    assert.equal(arrive_find_magic_portal(), null);
  });
});
