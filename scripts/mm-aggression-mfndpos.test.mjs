import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mfndpos, ALLOW_M, ALLOW_TM } from "../js/mon.js";
import { ALLOW_MDISP, ROOM, DOOR, D_CLOSED, D_LOCKED } from "../js/const.js";
import { M3_DISPLACES, M1_FLY } from "../js/monsters.js";
import { monsterNames } from "../js/generated/monsters_data.js";
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

// C ref: mon.c mfndpos `:2232–2238` door gate
// `!((amorphous(mdat) || can_fog(mon)) && !engulfing_u(mon))` (D-2428
// writer: scen-tour-Valkyrie-92040 step 113 — C cnt 6 vs JS 5, the extra
// C cell a FREE D_CLOSED door; scen-tour-Valkyrie-92162 step 72 — extra
// cell D_LOCKED). Pins the wired `|| can_fog(mon)` disjunct through the
// exported mfndpos envelope: a fog-capable vampshifter (wild
// vampire-bat shape, cham a vampire species) admits the closed/locked
// door neighbour, while a non-shifter flyer on the same geometry does
// not. M1_FLY on both fakes keeps the pool/lava outer gate open so the
// pin isolates the door arm (pool behaviour is not under test).
const PM_VAMPIRE = monsterNames.indexOf("PM_VAMPIRE");
const PM_VAMPIRE_BAT = monsterNames.indexOf("PM_VAMPIRE_BAT");
const PM_GIANT_BAT = monsterNames.indexOf("PM_GIANT_BAT");

describe("mfndpos door can_fog disjunct (mon.c:2232-2238, D-2428)", () => {
  let savedU, savedLevel, savedFmon;
  beforeEach(() => {
    savedU = game.u;
    savedLevel = game.level;
    savedFmon = game.fmon;
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 1 } };
    game.fmon = [];
  });
  afterEach(() => {
    game.u = savedU;
    game.level = savedLevel;
    game.fmon = savedFmon;
  });

  const fogMonAt = (mx, my, data, extra = {}) => ({
    mx, my, mux: 0, muy: 0, mcansee: 0, mconf: 0,
    m_lev: 7, mgenmklev: 0, mtame: 0, mtrapped: 0, wormno: 0,
    data, ...extra,
  });
  const doorLevel = (mask) => {
    game.level = {
      at: (x, y) => (x === 11 && y === 10
        ? { typ: DOOR, doormask: mask }
        : { typ: ROOM, doormask: 0, roomno: 0 }),
      flags: {},
      traps: [],
      rooms: [],
    };
  };
  const fogInfoFor = (data, x, y) => {
    for (let i = 0; i < (data.cnt | 0); i++) {
      if (data.poss[i]?.x === x && data.poss[i]?.y === y) return data.info[i] | 0;
    }
    return null;
  };
  const fogBat = () => fogMonAt(10, 10,
    { mlet: "S_BAT", mndx: PM_VAMPIRE_BAT, msize: 1, mflags1: M1_FLY },
    { cham: PM_VAMPIRE, mnum: PM_VAMPIRE_BAT });
  const plainBat = () => fogMonAt(10, 10,
    { mlet: "S_BAT", mndx: PM_GIANT_BAT, msize: 1, mflags1: M1_FLY },
    { mnum: PM_GIANT_BAT });

  it("fog-form vampshifter admits a D_CLOSED door neighbour", () => {
    doorLevel(D_CLOSED);
    const data = { poss: [], info: [] };
    assert.equal(mfndpos(fogBat(), data, 0), 8);
    assert.equal(fogInfoFor(data, 11, 10), 0);
  });

  it("fog-form vampshifter admits a D_LOCKED door neighbour", () => {
    doorLevel(D_LOCKED);
    const data = { poss: [], info: [] };
    assert.equal(mfndpos(fogBat(), data, 0), 8);
    assert.equal(fogInfoFor(data, 11, 10), 0);
  });

  it("non-shifter flyer drops the closed door on the same geometry", () => {
    doorLevel(D_CLOSED);
    const data = { poss: [], info: [] };
    assert.equal(mfndpos(plainBat(), data, 0), 7);
    assert.equal(fogInfoFor(data, 11, 10), null);
  });
});
