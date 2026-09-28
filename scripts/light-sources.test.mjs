import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { maybe_write_ls, obj_move_light_source, wiz_light_sources_lines } from "../js/light.js";
import {
  LS_OBJECT, LS_MONSTER, OBJ_FLOOR, OBJ_INVENT,
  RANGE_LEVEL, RANGE_GLOBAL,
} from "../js/const.js";
import { game } from "../js/gstate.js";

// C ref: light.c maybe_write_ls `:571–603` (range-selected count/write
// walk; light.c `:373` mx>0 macro for LS_MONSTER, timeout.c
// obj_is_local for LS_OBJECT), obj_move_light_source `:706–715`
// (retarget + lamplit move), wiz_light_sources `:935–975` putstr body
// (header, column heads, per-entry `%2d`/`0x%04x` rows, `<none>`).
// Headless notes: the impossible arms (`:577`/`:589–590`) fire
// --More--capable async plines, so the pinned maybe_write_ls cases use
// valid ids/types only (selection, count, callback order); the arms
// themselves are C-ordered `void impossible` + continue/fallthrough.
// The async wiz_light_sources envelope (wiz gate + show_nhw_menu_text)
// needs display plumbing and is not pinned here — it mirrors
// wiz_timeout_queue line for line; no corpus session reaches these
// wizard/save-walk paths, so `verify --fn` covers them via the public
// gates instead. No RNG is drawn on any pinned arm.

describe("light.c maybe_write_ls / obj_move_light_source / wiz_light_sources_lines", () => {
  let saved;
  beforeEach(() => {
    saved = {
      u: game.u,
      youmonst: game.youmonst,
      light_base: game.light_base,
      flags: game.flags,
    };
    game.u = { ux: 5, uy: 12 };
    game.youmonst = { m_id: 1, mx: 0 };
    game.light_base = [];
    game.flags = {};
  });
  afterEach(() => {
    game.u = saved.u;
    game.youmonst = saved.youmonst;
    game.light_base = saved.light_base;
    game.flags = saved.flags;
  });

  const mkobj = (o_id, where) => ({ o_id, where, lamplit: 1 });
  const mkmon = (m_id, mx) => ({ m_id, mx });
  const mkls = (over = {}) => ({
    x: 5, y: 12, range: 3, type: LS_OBJECT, id: null, flags: 0, ...over,
  });

  it("maybe_write_ls RANGE_LEVEL counts locals only, in chain order", () => {
    const floorLamp = mkls({ id: mkobj(11, OBJ_FLOOR) });
    const packLamp = mkls({ id: mkobj(12, OBJ_INVENT) });
    const localMon = mkls({ type: LS_MONSTER, id: mkmon(21, 5) });
    const migMon = mkls({ type: LS_MONSTER, id: mkmon(22, 0) });
    game.light_base = [floorLamp, packLamp, localMon, migMon];
    assert.equal(maybe_write_ls(RANGE_LEVEL), 2);
    const written = [];
    assert.equal(maybe_write_ls(RANGE_LEVEL, (ls) => written.push(ls)), 2);
    assert.deepEqual(written, [floorLamp, localMon]);
  });

  it("maybe_write_ls RANGE_GLOBAL counts non-locals only", () => {
    const floorLamp = mkls({ id: mkobj(11, OBJ_FLOOR) });
    const packLamp = mkls({ id: mkobj(12, OBJ_INVENT) });
    const localMon = mkls({ type: LS_MONSTER, id: mkmon(21, 5) });
    const migMon = mkls({ type: LS_MONSTER, id: mkmon(22, 0) });
    game.light_base = [floorLamp, packLamp, localMon, migMon];
    assert.equal(maybe_write_ls(RANGE_GLOBAL), 2);
    const written = [];
    assert.equal(maybe_write_ls(RANGE_GLOBAL, (ls) => written.push(ls)), 2);
    assert.deepEqual(written, [packLamp, migMon]);
  });

  it("maybe_write_ls empty base counts 0 and writes nothing", () => {
    let n = 0;
    assert.equal(maybe_write_ls(RANGE_LEVEL, () => { n++; }), 0);
    assert.equal(n, 0);
  });

  it("obj_move_light_source retargets src entries and moves lamplit", () => {
    const src = mkobj(31, OBJ_FLOOR);
    const dest = mkobj(32, OBJ_FLOOR);
    dest.lamplit = 0;
    const other = mkobj(33, OBJ_FLOOR);
    const a = mkls({ id: src });
    const b = mkls({ id: src, range: 2 });
    const c = mkls({ id: other });
    const d = mkls({ type: LS_MONSTER, id: mkmon(41, 5) });
    game.light_base = [a, b, c, d];
    obj_move_light_source(src, dest);
    assert.equal(a.id, dest);
    assert.equal(b.id, dest);
    assert.equal(c.id, other);
    assert.equal(d.id.m_id, 41);
    assert.equal(src.lamplit, 0);
    assert.equal(dest.lamplit, 1);
  });

  it("wiz_light_sources_lines renders <none> on an empty base", () => {
    assert.deepEqual(wiz_light_sources_lines(), [
      "Mobile light sources: hero @ ( 5,12)",
      "",
      "<none>",
    ]);
  });

  it("wiz_light_sources_lines renders header, heads and obj/mon rows", () => {
    game.light_base = [
      mkls({ x: 5, y: 12, range: 3, flags: 0, id: mkobj(7, OBJ_FLOOR) }),
      mkls({ x: 40, y: 9, range: 1, flags: 1, type: LS_MONSTER, id: mkmon(9, 5) }),
    ];
    assert.deepEqual(wiz_light_sources_lines(), [
      "Mobile light sources: hero @ ( 5,12)",
      "",
      "location range flags  type    id",
      "-------- ----- ------ ----  -------",
      "   5,12    3   0x0000  obj  0x7",
      "  40, 9    1   0x0001  mon  0x9",
    ]);
  });

  it("wiz_light_sources_lines renders you/<m>/??? and zero-padded flags", () => {
    game.light_base = [
      mkls({ x: 1, y: 2, range: 2, flags: 0x1a2, type: LS_MONSTER, id: game.youmonst }),
      mkls({ x: 3, y: 4, range: 2, flags: 0, type: LS_MONSTER, id: mkmon(51, 0) }),
      mkls({ x: 6, y: 7, range: 2, flags: 0, type: 99, id: {} }),
    ];
    assert.deepEqual(wiz_light_sources_lines().slice(4), [
      "   1, 2    2   0x01a2  you  0x1",
      "   3, 4    2   0x0000  <m>  0x33",
      "   6, 7    2   0x0000  ???  0x0",
    ]);
  });
});
