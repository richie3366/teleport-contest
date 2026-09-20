import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { fixup_level_locations } from "../js/dungeon.js";

// C ref: dungeon.c fixup_level_locations `:1122–1182` — resolve every
// level_map[] name against the live special-level chain, stamp the quest
// protos with the role filecode, float the Knox entrance, pin the five
// topology dnums, and shift depth_start for the dummy surface level.
// Static in C; exported here as the test pin (seffect_destroy_armor
// precedent, D-2416). Display/save plumbing is covered by corpus verify
// (`--fn fixup_level_locations`), not here.
const LEVEL_FIELDS = [
  "air_level", "asmodeus_level", "astral_level", "baalzebub_level",
  "bigroom_level", "stronghold_level", "earth_level", "portal_level",
  "fire_level", "juiblex_level", "knox_level", "medusa_level",
  "oracle_level", "orcus_level", "rogue_level", "sanctum_level",
  "valley_level", "water_level", "wiz1_level", "wiz2_level",
  "wiz3_level", "mineend_level", "sokoend_level", "qstart_level",
  "qlocate_level", "nemesis_level",
  "quest_dnum", "sokoban_dnum", "mines_dnum", "tower_dnum",
  "tutorial_dnum",
  "sp_levchn", "branches", "n_dgns", "dungeons", "urole",
];

const saved = {};
for (const k of LEVEL_FIELDS) saved[k] = game[k];

function useTable() {
  game.dungeons = [
    { dname: "The Dungeons of Doom", num_dunlevs: 10, depth_start: 1 },
    { dname: "The Quest", num_dunlevs: 6, depth_start: 1 },
    { dname: "Sokoban", num_dunlevs: 4, depth_start: 1 },
    { dname: "The Gnomish Mines", num_dunlevs: 8, depth_start: 1 },
    { dname: "Vlad's Tower", num_dunlevs: 3, depth_start: 1 },
    { dname: "The Tutorial", num_dunlevs: 1, depth_start: 1 },
    { dname: "Fort Ludios", num_dunlevs: 1, depth_start: 1 },
  ];
  game.n_dgns = 7;
  game.urole = { filecode: "Val" };
  game.sp_levchn = [
    { proto: "knox", dlevel: { dnum: 6, dlevel: 1 } },
    { proto: "x-strt", dlevel: { dnum: 1, dlevel: 1 } },
    { proto: "x-loca", dlevel: { dnum: 1, dlevel: 2 } },
    { proto: "x-goal", dlevel: { dnum: 1, dlevel: 5 } },
    { proto: "dummy", dlevel: { dnum: 0, dlevel: 1 } },
  ];
  game.branches = [
    {
      next: null,
      id: 0,
      type: 0,
      end1: { dnum: 0, dlevel: 5 },
      end2: { dnum: 6, dlevel: 1 },
      end1_up: true,
    },
  ];
  for (const k of LEVEL_FIELDS) {
    if (!(k in game)) continue;
    if (
      k === "sp_levchn" || k === "branches" || k === "n_dgns"
      || k === "dungeons" || k === "urole"
    ) continue;
    delete game[k];
  }
}

afterEach(() => {
  for (const k of LEVEL_FIELDS) game[k] = saved[k];
});

describe("fixup_level_locations (dungeon.c:1122-1182)", () => {
  it("resolves level_map names onto game fields (C :1132-1135)", () => {
    useTable();
    fixup_level_locations();
    assert.deepEqual(game.knox_level, { dnum: 6, dlevel: 1 });
    assert.deepEqual(game.qstart_level, { dnum: 1, dlevel: 1 });
    assert.deepEqual(game.qlocate_level, { dnum: 1, dlevel: 2 });
    assert.deepEqual(game.nemesis_level, { dnum: 1, dlevel: 5 });
  });

  it("stamps quest protos with the role filecode (C :1136-1141)", () => {
    useTable();
    fixup_level_locations();
    const byProto = (p) =>
      game.sp_levchn.find((s) => s.proto === p);
    assert.ok(byProto("Val-strt"));
    assert.ok(byProto("Val-loca"));
    assert.ok(byProto("Val-goal"));
    assert.equal(byProto("Val-strt").dlevel.dnum, 1);
  });

  it("floats the Knox entrance to n_dgns and re-sorts (C :1142-1158)", () => {
    useTable();
    fixup_level_locations();
    assert.equal(game.branches.length, 1);
    assert.equal(game.branches[0].end1.dnum, 7);
    assert.deepEqual(game.branches[0].end2, { dnum: 6, dlevel: 1 });
  });

  it("pins the five hardwired topology dnums (C :1164-1168)", () => {
    useTable();
    fixup_level_locations();
    assert.equal(game.quest_dnum, 1);
    assert.equal(game.sokoban_dnum, 2);
    assert.equal(game.mines_dnum, 3);
    assert.equal(game.tower_dnum, 4);
    assert.equal(game.tutorial_dnum, 5);
  });

  it("shifts depth_start for the dummy surface level (C :1171-1178)", () => {
    useTable();
    fixup_level_locations();
    assert.equal(game.dungeons[0].depth_start, 0);
  });

  it("skips level_map names with no live level (C :1134 guard)", () => {
    useTable();
    fixup_level_locations();
    assert.equal(game.oracle_level, undefined);
    assert.equal(game.astral_level, undefined);
  });
});
