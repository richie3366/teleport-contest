import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { del_engr } from "../js/engrave.js";

// C ref: engrave.c del_engr `:1644–1663` (D-3027) — head-first unlink
// (`:1648–1649`), else walk for the node whose nxt is ep (`:1651–1657`),
// miss prints the `:1659` impossible and returns without freeing.
// C `:1662` dealloc_engr is free() (engrave.h:45) — GC in JS, so unlinking
// is the whole observable effect. Display/message plumbing is covered by
// corpus verify (`--fn del_engr`), not here.
describe("del_engr unlink arms (engrave.c:1644-1663)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      head_engr: game.head_engr,
      iflags: game.iflags,
      program_state: game.program_state,
    };
    game.iflags = { debug_prevent_pline: true };
    game.program_state = {};
  });
  afterEach(() => {
    game.head_engr = saved.head_engr;
    game.iflags = saved.iflags;
    game.program_state = saved.program_state;
  });

  const mknode = (id, nxt = null) => ({ id, nxt_engr: nxt });
  const ids = () => {
    const out = [];
    for (let cur = game.head_engr; cur; cur = cur.nxt_engr) out.push(cur.id);
    return out;
  };

  it("unlinks the head (C :1648-1649)", () => {
    const a = mknode("a");
    const b = mknode("b");
    a.nxt_engr = b;
    game.head_engr = a;
    del_engr(a);
    assert.deepEqual(ids(), ["b"]);
  });

  it("unlinks a middle and tail node (C :1651-1657)", () => {
    const a = mknode("a");
    const b = mknode("b");
    const c = mknode("c");
    a.nxt_engr = b;
    b.nxt_engr = c;
    game.head_engr = a;
    del_engr(b);
    assert.deepEqual(ids(), ["a", "c"]);
    del_engr(c);
    assert.deepEqual(ids(), ["a"]);
  });

  it("miss runs the impossible arm and keeps the list (C :1658-1660)", async () => {
    const a = mknode("a");
    game.head_engr = a;
    del_engr(mknode("ghost"));
    // Let the `void impossible(...)` float settle; debug_prevent_pline
    // keeps it off-screen. in_impossible back to 0 proves the arm ran.
    await new Promise((r) => setImmediate(r));
    assert.deepEqual(ids(), ["a"]);
    assert.equal(game.program_state.in_impossible, 0);
  });

  it("null is a JS-guarded no-op (C NONNULLARG1)", () => {
    const a = mknode("a");
    game.head_engr = a;
    del_engr(null);
    assert.deepEqual(ids(), ["a"]);
  });
});
