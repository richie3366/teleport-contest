import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  term_for_boolean,
  optfn_roguesymset,
  allopt_idx,
} from "../js/options.js";
import { ROGUESET } from "../js/const.js";
import { game } from "../js/gstate.js";

// C refs: options.c term_for_boolean `:8738–8752` (booleanterms table
// `:8742–8745`, termpref gate `:8749`); optfn_roguesymset `:3545–3586`
// (do_set `:3552–3573`, combined get_val/get_cnf_val `:3574–3581`).
// Req/result literals mirror the file's REQ_/OPTN_ consts (1/2/4/5,
// 1/0). The read_sym_file failure arm (`:3558–3563`) and do_handler
// (`:3582–3584`) are named omissions (optfn_symset precedent) and are
// not pinned here. No RNG is drawn on any pinned arm.
const REQ_DO_INIT = 1, REQ_DO_SET = 2, REQ_GET_VAL = 4, REQ_GET_CNF_VAL = 5;
const OPTN_OK = 1, OPTN_ERR = 0;

describe("term_for_boolean port (options.c)", () => {
  it("Term_False rows read true/false (C :8747 default)", () => {
    const verbose = allopt_idx("verbose");
    assert.ok(verbose >= 0);
    assert.equal(term_for_boolean(verbose, false), "false");
    assert.equal(term_for_boolean(verbose, true), "true");
  });

  it("Term_Off rows read on/off (C :8749–8750)", () => {
    for (const name of ["bgcolors", "idlecheckpoint", "sounds"]) {
      const idx = allopt_idx(name);
      assert.ok(idx >= 0, name);
      assert.equal(term_for_boolean(idx, false), "off");
      assert.equal(term_for_boolean(idx, true), "on");
    }
    assert.equal(term_for_boolean(allopt_idx("perm_invent"), true), "on");
  });

  it("voices reads excluded/included via Term_Excluded (C :8749–8750)", () => {
    const idx = allopt_idx("voices");
    assert.ok(idx >= 0);
    assert.equal(term_for_boolean(idx, false), "excluded from build");
    assert.equal(term_for_boolean(idx, true), "included");
  });

  it("unknown idx falls back to the false/true default (C :8747)", () => {
    assert.equal(term_for_boolean(-1, false), "false");
    assert.equal(term_for_boolean(-1, true), "true");
  });
});

describe("optfn_roguesymset port (options.c)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      go: game.go, flags: game.flags, u: game.u,
      rogue_level: game.rogue_level, gs: game.gs,
      currentgraphics: game.currentgraphics,
      roguesymset: game.roguesymset,
      parsed_rc: game._parsed_rc,
    };
    game.go = {};
    game.flags = {};
    delete game.u;
    delete game.rogue_level;
    delete game.gs;
    delete game.currentgraphics;
    delete game.roguesymset;
    delete game._parsed_rc;
  });
  afterEach(() => {
    game.go = saved.go;
    game.flags = saved.flags;
    game.u = saved.u;
    game.rogue_level = saved.rogue_level;
    game.gs = saved.gs;
    game.currentgraphics = saved.currentgraphics;
    game.roguesymset = saved.roguesymset;
    game._parsed_rc = saved.parsed_rc;
  });

  it("do_init returns optn_ok (C :3549–3551)", () => {
    assert.equal(optfn_roguesymset(146, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("valueless do_set returns optn_err (C :3570–3571)", () => {
    const store = {};
    assert.equal(optfn_roguesymset(146, REQ_DO_SET, false, "roguesymset", "", store, true), OPTN_ERR);
    assert.equal(store.roguesymset, undefined);
  });

  it("do_set stores flat + gs mirror, negated still stores (C :3553–3557)", () => {
    const store = { gs: { symset: { [ROGUESET]: {} } } };
    assert.equal(optfn_roguesymset(146, REQ_DO_SET, false, "roguesymset", "IBM", store, true), OPTN_OK);
    assert.equal(store.roguesymset, "IBM");
    assert.equal(store.gs.symset[ROGUESET].name, "IBM");
    assert.equal(optfn_roguesymset(146, REQ_DO_SET, true, "roguesymset", "DEC", store, true), OPTN_OK);
    assert.equal(store.roguesymset, "DEC");
  });

  it("do_set without optInitial sets the C flags off-rogue-level (C :3567–3568)", () => {
    const store = {};
    assert.equal(optfn_roguesymset(146, REQ_DO_SET, false, "roguesymset", "IBM", store, false), OPTN_OK);
    assert.equal(game.go.opt_need_redraw, true);
    assert.equal(game.go.opt_need_glyph_reset, true);
    assert.equal(game.go.opt_symset_changed, true);
    assert.equal(game.currentgraphics, undefined);
  });

  it("get_val/get_cnf_val default when unset (C :3574–3577)", () => {
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "" };
      assert.equal(optfn_roguesymset(146, req, false, holder, ""), OPTN_OK);
      assert.equal(holder.buf, "default");
    }
  });

  it("get_val shows the stored name, ', active' on ROGUESET (C :3575–3579)", () => {
    const store = { roguesymset: "IBM" };
    const holder = { buf: "" };
    assert.equal(optfn_roguesymset(146, REQ_GET_VAL, false, holder, "", store, true), OPTN_OK);
    assert.equal(holder.buf, "IBM");
    game.currentgraphics = ROGUESET;
    const holder2 = { buf: "" };
    assert.equal(optfn_roguesymset(146, REQ_GET_VAL, false, holder2, "", store, true), OPTN_OK);
    assert.equal(holder2.buf, "IBM, active");
  });
});
