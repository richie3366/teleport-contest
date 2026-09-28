import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { initRng } from "../js/rng.js";
import {
  assign_rnd_level,
  save_exclusions,
  load_exclusions,
  rm_mapseen,
  mapseen_temple,
} from "../js/dungeon.js";

// C ref: dungeon.c assign_rnd_level `:1985–1995`, save/load_exclusions
// `:2595–2634`, rm_mapseen `:2664–2692`, mapseen_temple `:3263–3278`.
// (free_proto_dungeon `:1184–1201` is file-local and its effect — null
// releases on init_dungeons' out-of-scope pd — is unobservable by
// design; the session gates execute it on every newgame instead.)
describe("dungeon.c breadth ports (assign_rnd/save+load_excl/rm_mapseen/mapseen_temple)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      dungeons: game.dungeons,
      exclusion_zones: game.exclusion_zones,
      mapseenchn: game.mapseenchn,
      u: game.u,
      valley_level: game.valley_level,
      sanctum_level: game.sanctum_level,
    };
  });
  afterEach(() => {
    game.dungeons = saved.dungeons;
    game.exclusion_zones = saved.exclusion_zones;
    game.mapseenchn = saved.mapseenchn;
    game.u = saved.u;
    game.valley_level = saved.valley_level;
    game.sanctum_level = saved.sanctum_level;
  });

  it("assign_rnd_level copies dnum, jitters dlevel, clamps [1, dunlevs]", () => {
    initRng(7); // bare harness has no seeded keystream (randomkey precedent)
    game.dungeons = [{ num_dunlevs: 5 }];
    // range > 0: dest dlevel in [src, max] (C `:1989` + `:1991–1992`).
    for (let t = 0; t < 50; t++) {
      const dest = { dnum: 9, dlevel: 9 };
      assign_rnd_level(dest, { dnum: 0, dlevel: 3 }, 4);
      assert.equal(dest.dnum, 0);
      assert.ok(dest.dlevel >= 3 && dest.dlevel <= 5,
        `up-jitter in [3,5], got ${dest.dlevel}`);
    }
    // range < 0: mirrored (C `:1989` -rnd(-range) + `:1993–1994`).
    for (let t = 0; t < 50; t++) {
      const dest = { dnum: 9, dlevel: 9 };
      assign_rnd_level(dest, { dnum: 0, dlevel: 3 }, -4);
      assert.equal(dest.dnum, 0);
      assert.ok(dest.dlevel >= 1 && dest.dlevel <= 3,
        `down-jitter in [1,3], got ${dest.dlevel}`);
    }
    // Clamp arms bite on huge ranges.
    const hi = { dnum: 0, dlevel: 1 };
    assign_rnd_level(hi, { dnum: 0, dlevel: 5 }, 100);
    assert.equal(hi.dlevel, 5);
    const lo = { dnum: 0, dlevel: 5 };
    assign_rnd_level(lo, { dnum: 0, dlevel: 1 }, -100);
    assert.equal(lo.dlevel, 1);
  });

  const mkchain = () => {
    const c = { zonetype: 3, lx: 7, ly: 8, hx: 9, hy: 10, next: null };
    const b = { zonetype: 2, lx: 3, ly: 4, hx: 5, hy: 6, next: c };
    const a = { zonetype: 1, lx: 0, ly: 1, hx: 2, hy: 2, next: b };
    game.exclusion_zones = a;
    return [a, b, c];
  };

  it("save_exclusions serializes head→tail; empty list → []", () => {
    mkchain();
    const recs = save_exclusions();
    assert.equal(recs.length, 3); // C `:2601–2602` count ⇔ length
    assert.deepEqual(recs[0], { zonetype: 1, lx: 0, ly: 1, hx: 2, hy: 2 });
    assert.deepEqual(recs[2], { zonetype: 3, lx: 7, ly: 8, hx: 9, hy: 10 });
    assert.ok(!("next" in recs[0])); // links stay live-only
    game.exclusion_zones = null;
    assert.deepEqual(save_exclusions(), []);
  });

  it("load_exclusions prepends (C order) so restore reverses save order", () => {
    const recs = [
      { zonetype: 1, lx: 0, ly: 1, hx: 2, hy: 2 },
      { zonetype: 2, lx: 3, ly: 4, hx: 5, hy: 6 },
      { zonetype: 3, lx: 7, ly: 8, hx: 9, hy: 10 },
    ];
    game.exclusion_zones = null;
    load_exclusions(recs);
    // C `:2631–2632` prepends each read: last record lands on top.
    const order = [];
    for (let ez = game.exclusion_zones; ez; ez = ez.next) order.push(ez.zonetype);
    assert.deepEqual(order, [3, 2, 1]);
    assert.equal(game.exclusion_zones.lx, 7);
    // Missing key (old saves / pre-stash levels) is a silent no-op.
    game.exclusion_zones = null;
    assert.doesNotThrow(() => load_exclusions(null));
    assert.doesNotThrow(() => load_exclusions(undefined));
    assert.doesNotThrow(() => load_exclusions([]));
    assert.equal(game.exclusion_zones, null);
  });

  it("exclusion stash snapshot survives the level-leave detach", () => {
    mkchain();
    // do.js stash ⇔ C save_exclusions Sfo writes: snapshot BEFORE the
    // release_data detach nulls the live list (regions precedent).
    const stashed = save_exclusions();
    game.exclusion_zones = null;
    assert.equal(stashed.length, 3);
    load_exclusions(stashed);
    let n = 0;
    for (let ez = game.exclusion_zones; ez; ez = ez.next) n++;
    assert.equal(n, 3);
  });

  it("rm_mapseen unlinks by ledger, releases custom + cemetery", () => {
    game.dungeons = [{ ledger_start: 0, num_dunlevs: 9 }];
    const mid = {
      lev: { dnum: 0, dlevel: 2 },
      custom: "note",
      custom_lth: 4,
      final_resting_place: { name: "x", next: { name: "y", next: null } },
      flags: {},
    };
    game.mapseenchn = [
      { lev: { dnum: 0, dlevel: 1 }, custom: null, final_resting_place: null, flags: {} },
      mid,
      { lev: { dnum: 0, dlevel: 3 }, custom: null, final_resting_place: null, flags: {} },
    ];
    rm_mapseen(2); // ledger_start(0) + dlevel(2), C `:2670–2673`
    assert.equal(game.mapseenchn.length, 2);
    assert.deepEqual(game.mapseenchn.map((m) => m.lev.dlevel), [1, 3]);
    assert.equal(mid.custom, null); // C `:2677–2678`
    assert.equal(mid.final_resting_place, null); // C `:2680–2684`
    // Miss (C `:2674–2675`) and head removal (C `:2688–2689` else arm).
    rm_mapseen(99);
    assert.equal(game.mapseenchn.length, 2);
    rm_mapseen(1);
    assert.deepEqual(game.mapseenchn.map((m) => m.lev.dlevel), [3]);
  });

  it("mapseen_temple flags valley / msanctum, silent without a node", () => {
    game.valley_level = { dnum: 1, dlevel: 5 };
    game.sanctum_level = { dnum: 1, dlevel: 9 };
    game.u = { uz: { dnum: 1, dlevel: 5 } };
    game.mapseenchn = [{ lev: { dnum: 1, dlevel: 5 }, flags: {} }];
    mapseen_temple(null); // priest UNUSED in C (`:3268`)
    assert.equal(game.mapseenchn[0].flags.valley, 1); // C `:3274–3275`
    assert.equal(game.mapseenchn[0].flags.msanctum, undefined);
    game.u = { uz: { dnum: 1, dlevel: 9 } };
    game.mapseenchn = [{ lev: { dnum: 1, dlevel: 9 }, flags: {} }];
    mapseen_temple(null);
    assert.equal(game.mapseenchn[0].flags.msanctum, 1); // C `:3276–3277`
    // Ordinary level: no flag; missing node: silent (C `:3272–3273`).
    game.u = { uz: { dnum: 0, dlevel: 1 } };
    game.mapseenchn = [{ lev: { dnum: 0, dlevel: 1 }, flags: {} }];
    mapseen_temple(null);
    assert.equal(game.mapseenchn[0].flags.valley, undefined);
    assert.equal(game.mapseenchn[0].flags.msanctum, undefined);
    game.mapseenchn = [];
    assert.doesNotThrow(() => mapseen_temple(null));
  });
});
