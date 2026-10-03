import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { reset_oattached_mids } from "../js/restore.js";
import { record_bones_id, clear_bones_ids } from "../js/bones.js";

// C ref: restore.c reset_oattached_mids `:1510–1530` — ghostly-gated walk
// of the floor chain: omonst m_id/mpeaceful/mtame zeroing (pet's owner
// died), omid remap through the getlev id map, free_omid when unmapped.
// Sole C caller getlev `:1301`; JS tails: getlev_bones (ghostly) + Sy
// restore (non-ghostly no-op walk).
describe("reset_oattached_mids (restore.c:1510-1530)", () => {
  let savedFobj;
  beforeEach(() => {
    savedFobj = game.fobj;
    clear_bones_ids();
  });
  afterEach(() => {
    game.fobj = savedFobj;
    clear_bones_ids();
  });

  it("zeroes omonst m_id/peace/tame when ghostly (C :1517-1521)", () => {
    const omon = { m_id: 7, mpeaceful: 1, mtame: 1 };
    game.fobj = { oextra: { omonst: omon }, nobj: null };
    reset_oattached_mids(true);
    assert.equal(omon.m_id, 0);
    assert.equal(omon.mpeaceful, 0);
    assert.equal(omon.mtame, 0);
  });

  it("remaps mapped omid, frees unmapped omid when ghostly (C :1522-1528)", () => {
    record_bones_id(100, 200);
    const mapped = { oextra: { omid: 100 }, nobj: null };
    const unmapped = { oextra: { omid: 300 }, nobj: null };
    mapped.nobj = unmapped;
    game.fobj = mapped;
    reset_oattached_mids(true);
    assert.equal(mapped.oextra.omid, 200);
    assert.equal(unmapped.oextra.omid, 0);
  });

  it("is a no-op walk when not ghostly (both arms gated)", () => {
    record_bones_id(100, 200);
    const omon = { m_id: 9, mpeaceful: 1, mtame: 1 };
    game.fobj = { oextra: { omonst: omon, omid: 100 }, nobj: null };
    reset_oattached_mids(false);
    assert.equal(omon.m_id, 9);
    assert.equal(omon.mpeaceful, 1);
    assert.equal(omon.mtame, 1);
    assert.equal(game.fobj.oextra.omid, 100);
  });

  it("tolerates an empty floor chain", () => {
    game.fobj = null;
    assert.doesNotThrow(() => reset_oattached_mids(true));
  });
});
