import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  clear_wormdata,
  count_wsegs,
  get_wormno,
  initworm,
  rest_worm,
  save_worm,
} from "../js/worm.js";
import { MAX_NUM_WORMS } from "../js/const.js";

// C ref: worm.c save_worm `:527–568` + rest_worm `:577–603`.
// save_worm snapshots each slot's chain tail-first as plain records
// (list length IS the C count, dummy head seg included); rest_worm
// rebuilds the chains with newseg (first node ⇒ wtails, last ⇒
// wheads) plus the wgrowtime row. Wired at savelev/getlev analogues:
// serLevel/deserLevel (lev_json.js), do.js stash/restore, save.js and
// bones.js installs (review 657 named-omitted worms on the Sy path).
describe("save_worm / rest_worm (worm.c:527-568, 577-603)", () => {
  let savedMonsters;
  beforeEach(() => {
    savedMonsters = game._level_monsters;
    clear_wormdata();
  });
  afterEach(() => {
    clear_wormdata();
    game._level_monsters = savedMonsters;
  });

  const mkWorm = (mx, my, ntail) => {
    const worm = { wormno: get_wormno(), mx, my };
    assert.notEqual(worm.wormno, 0);
    initworm(worm, ntail);
    return worm;
  };

  it("save snapshot holds tail-first chains; count includes the dummy head", () => {
    const a = mkWorm(10, 12, 3);
    const snap = save_worm();
    assert.equal(snap.segs.length, MAX_NUM_WORMS);
    assert.equal(snap.segs[0], null); // C slots start at 1
    assert.equal(snap.segs[a.wormno].length, 4); // 3 tail + dummy head
    const head = snap.segs[a.wormno].at(-1); // last node ⇒ wheads
    assert.deepEqual(head, { wx: 10, wy: 12 });
    assert.equal(count_wsegs(a), 3);
  });

  it("snapshot → clear → restore round-trips exactly (JSON-safe)", () => {
    const a = mkWorm(10, 12, 3);
    const b = mkWorm(40, 7, 1);
    const snap = save_worm();
    const wire = JSON.parse(JSON.stringify(snap)); // save files are JSON
    clear_wormdata();
    assert.equal(count_wsegs(a), 0);
    rest_worm(wire);
    assert.deepEqual(save_worm(), snap);
    assert.equal(count_wsegs(a), 3);
    assert.equal(count_wsegs(b), 1);
  });

  it("wgrowtime row round-trips all slots", () => {
    mkWorm(5, 5, 0);
    const times = Array.from({ length: MAX_NUM_WORMS }, (_, i) => i * 7);
    rest_worm({ segs: [], wgrowtime: times });
    assert.deepEqual(save_worm().wgrowtime, times);
  });

  it("legacy nullish record reads as all-zero counts (clears tables)", () => {
    const a = mkWorm(10, 12, 2);
    assert.equal(count_wsegs(a), 2);
    for (const legacy of [null, undefined, {}, { segs: null }]) {
      rest_worm(legacy);
      const snap = save_worm();
      assert.ok(snap.segs.every((s) => s === null));
      assert.ok(snap.wgrowtime.every((t) => t === 0));
    }
  });
});
