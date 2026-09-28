import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { objects_globals_init, NUM_OBJECTS, MAXOCLASSES } from "../js/objects.js";
import { savenames, restnames } from "../js/o_init.js";

// C ref: o_init.c savenames `:375-407` + restnames `:411-437`.
// savenames snapshots bases/disco/objclass-mutables plus oc_uname where
// present (JSON analogue of the names-bases/names-disco/names-objclass /
// names-oc_uname walks); restnames overlays them back in C order, setting
// oc_uname only where the save has one (the `:429-435` marker arm).
// Wired at the savegamestate/restgamestate analogues: dosave0 and
// try_restore_save (save.js).
describe("savenames / restnames (o_init.c:375-407, 411-437)", () => {
  let savedObjects, savedBases, savedDisco;
  beforeEach(() => {
    savedObjects = game.objects;
    savedBases = game.bases;
    savedDisco = game.disco;
    objects_globals_init();
  });
  afterEach(() => {
    game.objects = savedObjects;
    game.bases = savedBases;
    game.disco = savedDisco;
  });

  const seedTables = () => {
    game.bases = new Array(MAXOCLASSES + 2).fill(0);
    game.bases[1] = 10;
    game.disco = new Array(NUM_OBJECTS).fill(0);
    game.disco[0] = 42;
    const o = game.objects[42];
    o.oc_name_known = 1;
    o.oc_encountered = 1;
    o.oc_uname = "fred";
    o.oc_prob = 7;
    return o;
  };

  it("snapshot holds bases, disco, objclass mutables and uname", () => {
    seedTables();
    const snap = savenames();
    assert.equal(snap.bases.length, MAXOCLASSES + 2);
    assert.equal(snap.bases[1], 10);
    assert.equal(snap.disco.length, NUM_OBJECTS);
    assert.equal(snap.disco[0], 42);
    assert.equal(snap.objects.length, game.objects.length);
    const entry = snap.objects[42];
    assert.equal(entry.oc_name_known, 1);
    assert.equal(entry.oc_encountered, 1);
    assert.equal(entry.oc_uname, "fred");
    assert.equal(entry.oc_prob, 7);
    assert.equal(snap.objects[43].oc_uname, null);
  });

  it("snapshot is a copy: later live edits do not leak into it", () => {
    seedTables();
    const snap = savenames();
    game.bases[1] = 99;
    game.disco[0] = 0;
    game.objects[42].oc_uname = "changed";
    assert.equal(snap.bases[1], 10);
    assert.equal(snap.disco[0], 42);
    assert.equal(snap.objects[42].oc_uname, "fred");
  });

  it("snapshot → wipe → restore round-trips exactly (JSON-safe)", () => {
    seedTables();
    const snap = savenames();
    const wire = JSON.parse(JSON.stringify(snap)); // save files are JSON
    objects_globals_init();
    game.disco = [];
    assert.equal(game.objects[42].oc_uname, undefined);
    restnames(wire);
    assert.deepEqual(game.bases, snap.bases);
    assert.deepEqual(game.disco, snap.disco);
    const o = game.objects[42];
    assert.equal(o.oc_name_known, 1);
    assert.equal(o.oc_encountered, 1);
    assert.equal(o.oc_uname, "fred");
    assert.equal(o.oc_prob, 7);
    // marker arm: entries without a saved uname stay null
    assert.equal(game.objects[43].oc_uname, undefined);
  });

  it("restore with no uname key leaves the fresh null alone", () => {
    seedTables();
    const snap = savenames();
    delete snap.objects[42].oc_uname;
    objects_globals_init();
    restnames(snap);
    assert.equal(game.objects[42].oc_uname, undefined);
    assert.equal(game.objects[42].oc_name_known, 1);
  });
});
