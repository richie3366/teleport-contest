import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mfndpos, ALLOW_M, ALLOW_TM } from "../js/mon.js";
import { ALLOW_MDISP, ROOM } from "../js/const.js";
import { M3_DISPLACES } from "../js/monsters.js";
import { game } from "../js/gstate.js";

// C ref: mon.c mfndpos `:2299–2317` + mm_aggression `:2428` /
// mm_2way_aggression `:2387` / mm_displacement `:2451` (queue row:
// scen-poly-Caveman-92202 step 103 — C cnt 5 vs JS 4, C extra (21,5)/ALLOW_M
// = kobold-zombie occupant dropped at the raw-flag gate).
// Pins the MON_AT arm through the exported mfndpos envelope:
// zombie-pair aggression grants ALLOW_M with no flag, displacer barging
// grants ALLOW_MDISP, tame defenders still need ALLOW_TM.
describe("mfndpos MON_AT mm_aggression/mm_displacement (mon.c:2299-2317)", () => {
  let savedU, savedLevel, savedFmon, savedSteed;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
    savedFmon = game.fmon;
    savedSteed = game.u?.usteed;
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 } };
    game.level = {
      at: () => ({ typ: ROOM, doormask: 0, roomno: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
    game.fmon = [];
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
    game.fmon = savedFmon;
    if (game.u) game.u.usteed = savedSteed;
  });

  const permonst = (mlet, mndx, extra = {}) => ({
    mlet, mndx, msize: 1, mflags3: 0, geno: 0, ...extra,
  });
  const monAt = (mx, my, data, extra = {}) => ({
    mx, my, mux: 0, muy: 0, mcansee: 0, mconf: 0,
    m_lev: 1, mgenmklev: 0, mtame: 0, mtrapped: 0, wormno: 0,
    data, ...extra,
  });
  const infoFor = (data, x, y) => {
    for (let i = 0; i < (data.cnt | 0); i++) {
      if (data.poss[i]?.x === x && data.poss[i]?.y === y) return data.info[i] | 0;
    }
    return null;
  };

  it("zombie pair grants ALLOW_M with a bare flag (kobold-zombie occupant)", () => {
    // C: mm_2way_aggression(defender=maker, mon=zombifiable) both directions.
    const mon = monAt(10, 10, permonst("S_KOBOLD", 10));
    const defender = monAt(10, 11, permonst("S_ZOMBIE", 11), { mhp: 10, mstate: 0 });
    game.fmon = [defender];
    const data = { poss: [], info: [] };
    mfndpos(mon, data, 0);
    assert.equal(infoFor(data, 10, 11) & ALLOW_M, ALLOW_M);
  });

  it("plain pair drops the occupied cell with a bare flag", () => {
    const mon = monAt(10, 10, permonst("S_KOBOLD", 10));
    const defender = monAt(10, 11, permonst("S_KOBOLD", 12), { mhp: 10, mstate: 0 });
    game.fmon = [defender];
    const data = { poss: [], info: [] };
    mfndpos(mon, data, 0);
    assert.equal(infoFor(data, 10, 11), null);
  });

  it("displacer barges: ALLOW_MDISP with no ALLOW_M in flag", () => {
    const mon = monAt(10, 10,
      permonst("S_BEAST", 13, { mflags3: M3_DISPLACES, msize: 3 }), { m_lev: 5 });
    const defender = monAt(10, 11, permonst("S_KOBOLD", 10), { mhp: 10, mstate: 0 });
    game.fmon = [defender];
    const data = { poss: [], info: [] };
    mfndpos(mon, data, ALLOW_MDISP);
    const info = infoFor(data, 10, 11);
    assert.ok(info !== null);
    assert.equal(info & ALLOW_MDISP, ALLOW_MDISP);
    assert.equal(info & ALLOW_M, 0);
  });

  it("tame defender needs ALLOW_TM even when ALLOW_M is flagged", () => {
    const mon = monAt(10, 10, permonst("S_KOBOLD", 10));
    const defender = monAt(10, 11, permonst("S_KOBOLD", 12),
      { mhp: 10, mstate: 0, mtame: 1 });
    game.fmon = [defender];
    const dropped = { poss: [], info: [] };
    mfndpos(mon, dropped, ALLOW_M);
    assert.equal(infoFor(dropped, 10, 11), null);
    const kept = { poss: [], info: [] };
    mfndpos(mon, kept, ALLOW_M | ALLOW_TM);
    assert.equal(infoFor(kept, 10, 11) & ALLOW_TM, ALLOW_TM);
  });
});
