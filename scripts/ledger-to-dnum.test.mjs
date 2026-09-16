import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { MIGR_RANDOM } from "../js/const.js";
import { migrate_to_level } from "../js/teleport.js";

// C ref: dungeon.c ledger_to_dnum `:1403–1414` —
//   find i such that ledger_start < ledgerno <= ledger_start + num_dunlevs
// (ledger_no `:1376–1378` is dlevel + ledger_start, so valid ledgers run
// start+1 .. start+num). js/teleport.js keeps a local clone of this decode
// for migrate_to_level (C dog.c:887); it drifted to
// `start <= tolev < start + n`, which spills the LAST level of every
// dungeon into the next one with dlevel 0. The stolen_booty ORC_LEADER
// always migrates to the mines bottom (mkmaze.c migrate_orc), so the
// captain decoded to mux=3,muy=0 instead of C's 2:8 and losedogs never
// delivered him (scen-tour-Healer-92042 step 73: C rnd(79)@rloc vs JS
// rn2(12)@mcalcmove). This file pins the boundary headless.
const saved = {
  dungeons: game.dungeons,
  n_dgns: game.n_dgns,
  u: game.u,
  moves: game.moves,
  fmon: game.fmon,
  migrating_mons: game.migrating_mons,
};

function useTable() {
  // Contiguous ledger assignment like C init_dungeons builds.
  game.dungeons = [
    { ledger_start: 0, num_dunlevs: 3, depth_start: 8 }, // dnum 0
    { ledger_start: 3, num_dunlevs: 8, depth_start: 1 }, // dnum 1, ledgers 4..11
    { ledger_start: 11, num_dunlevs: 5, depth_start: 5 }, // dnum 2, ledgers 12..16
  ];
  game.n_dgns = 3;
  game.u = { uz: { dnum: 1, dlevel: 3 } };
  game.moves = 100;
  game.fmon = [];
  game.migrating_mons = [];
}

afterEach(() => {
  game.dungeons = saved.dungeons;
  game.n_dgns = saved.n_dgns;
  game.u = saved.u;
  game.moves = saved.moves;
  game.fmon = saved.fmon;
  game.migrating_mons = saved.migrating_mons;
});

const mockMon = (over = {}) => ({
  mx: 5,
  my: 5,
  mux: -1,
  muy: -1,
  mstate: 0,
  wormno: 0,
  mlstmv: 0,
  mtrack: null,
  nmon: null,
  ...over,
});

describe("migrate_to_level ledger decode (dungeon.c ledger_to_dnum)", () => {
  it("decodes a dungeon's last ledger to its own bottom level", () => {
    useTable();
    const mon = mockMon();
    game.fmon.push(mon);
    migrate_to_level(mon, 11, MIGR_RANDOM, null); // bottom of dnum 1
    assert.equal(mon.mux, 1);
    assert.equal(mon.muy, 8);
  });

  it("still decodes an interior ledger to its own level", () => {
    useTable();
    const mon = mockMon();
    game.fmon.push(mon);
    migrate_to_level(mon, 5, MIGR_RANDOM, null); // dnum 1, dlevel 2
    assert.equal(mon.mux, 1);
    assert.equal(mon.muy, 2);
  });

  it("still decodes the first ledger of the next dungeon past the boundary", () => {
    useTable();
    const mon = mockMon();
    game.fmon.push(mon);
    migrate_to_level(mon, 12, MIGR_RANDOM, null); // dnum 2, dlevel 1
    assert.equal(mon.mux, 2);
    assert.equal(mon.muy, 1);
  });
});
