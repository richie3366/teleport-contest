import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  optfn_mouse_support,
  optfn_IBMgraphics,
  optfn_o_status_cond,
  count_cond,
  allopt_idx,
  get_option_value,
  parseNethackrc,
} from "../js/options.js";
import { CONDITION_COUNT, ROGUESET, NUM_GRAPHICS } from "../js/const.js";
import { condtests } from "../js/botl.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_mouse_support `:2395–2453`, optfn_IBMgraphics
// `:1905–1960` (BACKWARD_COMPAT on, optlist.h `:15`), optfn_o_status_cond
// `:8413–8442`, count_cond `:9179–9188`. Req/result literals mirror the
// file's REQ_/OPTN_ consts (1/2/4/5, 1/0). The IBMgraphics read_sym_file
// failure arm (`:1932–1936`), clear_symsetentry (`:1934`) and
// switch_symbols (`:1943`) are named omissions (Rule #2 / by-design,
// optfn_symset precedent) and are not pinned here. No RNG on any arm.
const REQ_DO_INIT = 1, REQ_DO_SET = 2, REQ_GET_VAL = 4, REQ_GET_CNF_VAL = 5;
const OPTN_OK = 1, OPTN_ERR = 0;

describe("count_cond port (options.c)", () => {
  let savedEnabled;
  beforeEach(() => {
    savedEnabled = condtests.map((ct) => ct.enabled);
  });
  afterEach(() => {
    condtests.forEach((ct, i) => {
      ct.enabled = savedEnabled[i];
    });
  });

  it("counts enabled entries over CONDITION_COUNT (C :9181–9187)", () => {
    assert.equal(condtests.length, CONDITION_COUNT);
    assert.equal(count_cond(), 16); // condopt defaults: 16 on, 14 off
    condtests[0].enabled = true; // opt_in barehanded, default off
    assert.equal(count_cond(), 17);
    condtests[1].enabled = false; // opt_out blind, default on
    assert.equal(count_cond(), 16);
  });
});

describe("optfn_o_status_cond port (options.c)", () => {
  let savedEnabled;
  beforeEach(() => {
    savedEnabled = condtests.map((ct) => ct.enabled);
  });
  afterEach(() => {
    condtests.forEach((ct, i) => {
      ct.enabled = savedEnabled[i];
    });
  });

  it("do_init/do_set/get_cnf_val are no-op ok (C :8421–8426, :8433–8435)", () => {
    assert.equal(optfn_o_status_cond(173, REQ_DO_INIT, false, "", ""), OPTN_OK);
    assert.equal(optfn_o_status_cond(173, REQ_DO_SET, false, "status condition fields", ""), OPTN_OK);
    const holder = { buf: "kept" };
    assert.equal(optfn_o_status_cond(173, REQ_GET_CNF_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "kept");
  });

  it("get_val is n_currently_set(count_cond()) (C :8427–8431)", () => {
    const holder = { buf: "" };
    assert.equal(optfn_o_status_cond(173, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "(16 currently set)");
    condtests[0].enabled = true;
    const holder2 = { buf: "" };
    assert.equal(optfn_o_status_cond(173, REQ_GET_VAL, false, holder2, ""), OPTN_OK);
    assert.equal(holder2.buf, "(17 currently set)");
  });

  it("get_val with null opts is optn_err (C :8428–8429)", () => {
    assert.equal(optfn_o_status_cond(173, REQ_GET_VAL, false, null, ""), OPTN_ERR);
    assert.equal(optfn_o_status_cond(173, REQ_GET_VAL, false, undefined, ""), OPTN_ERR);
  });

  it("allopt row wires the optfn (optlist.h :720)", () => {
    assert.equal(allopt_idx("status condition fields"), 173);
  });
});

describe("optfn_mouse_support port (options.c)", () => {
  let savedIflags, savedGo;
  beforeEach(() => {
    savedIflags = game.iflags;
    savedGo = game.go;
    game.iflags = {};
    game.go = {};
  });
  afterEach(() => {
    game.iflags = savedIflags;
    game.go = savedGo;
  });

  it("do_init returns optn_ok (C :2402–2404)", () => {
    assert.equal(optfn_mouse_support(116, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set stores 0..2, rejects out-of-range and non-numeric (C :2414–2422)", () => {
    const bag = {};
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:2", "2", bag, true), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 2);
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:0", "0", bag, true), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 0);
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:5", "5", bag, true), OPTN_ERR);
    assert.equal(bag.wc_mouse_support, 0); // unchanged on error
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:abc", "abc", bag, true), OPTN_ERR);
    assert.equal(bag.wc_mouse_support, 0);
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:0x", "0x", bag, true), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 0); // C `:2417` atoi 0 with *op '0' passes
  });

  it("bare name is mouse_support:1 via compat (C :2406–2412)", () => {
    const bag = {};
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support", "", bag, true), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 1);
  });

  it("negated bare name stores 0 (C :2412 !negated)", () => {
    const bag = {};
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, true, "mouse_support", "", bag, true), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 0);
  });

  it("empty non-compat value in game stores nothing, still ok (C :2408–2409)", () => {
    const bag = { wc_mouse_support: 2 };
    assert.equal(optfn_mouse_support(116, REQ_DO_SET, false, "mouse_support:", "", bag, false), OPTN_OK);
    assert.equal(bag.wc_mouse_support, 2);
  });

  it("get_val is the mousemodes table, unix fixes (C :2427–2446)", () => {
    for (const [mode, want] of [[0, "0=off"], [1, "1=on, O/S adjusted"], [2, "2=on, O/S unchanged"]]) {
      const holder = { buf: "" };
      assert.equal(optfn_mouse_support(116, REQ_GET_VAL, false, holder, "", { wc_mouse_support: mode }), OPTN_OK);
      assert.equal(holder.buf, want);
    }
    const holder = { buf: "" }; // C `:2444` out of range prints nothing
    assert.equal(optfn_mouse_support(116, REQ_GET_VAL, false, holder, "", { wc_mouse_support: 7 }), OPTN_OK);
    assert.equal(holder.buf, "");
  });

  it("get_cnf_val is %i (C :2448–2450)", () => {
    const holder = { buf: "" };
    assert.equal(optfn_mouse_support(116, REQ_GET_CNF_VAL, false, holder, "", { wc_mouse_support: 2 }), OPTN_OK);
    assert.equal(holder.buf, "2");
  });

  it("rc parse + dump paths reach the live optfn (allopt idx 116)", () => {
    assert.equal(allopt_idx("mouse_support"), 116);
    const rc = parseNethackrc("OPTIONS=mouse_support:2");
    assert.equal(rc.iflags.wc_mouse_support, 2);
    const bare = parseNethackrc("OPTIONS=mouse_support");
    assert.equal(bare.iflags.wc_mouse_support, 1);
    const neg = parseNethackrc("OPTIONS=!mouse_support");
    assert.equal(neg.iflags.wc_mouse_support, undefined); // C `:626` negateok-No
    game.iflags.wc_mouse_support = 2;
    assert.equal(get_option_value("mouse_support", false), "2=on, O/S unchanged");
    assert.equal(get_option_value("mouse_support", true), "2");
  });
});

describe("optfn_IBMgraphics port (options.c)", () => {
  let savedGs, savedGo, savedU;
  beforeEach(() => {
    savedGs = game.gs;
    savedGo = game.go;
    savedU = game.u;
    delete game.gs;
    game.go = {};
    delete game.u;
  });
  afterEach(() => {
    game.gs = savedGs;
    game.go = savedGo;
    game.u = savedU;
  });

  const freshSymset = () => (game.gs = { symset: [{ name: null }, { name: null }] });

  it("do_init returns optn_ok (C :1916–1918)", () => {
    assert.equal(optfn_IBMgraphics(78, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set names both sets, RogueIBM for ROGUESET (C :1924–1931)", () => {
    assert.equal(NUM_GRAPHICS, 2);
    freshSymset();
    assert.equal(optfn_IBMgraphics(78, REQ_DO_SET, false, "IBMgraphics", "", true), OPTN_OK);
    assert.equal(game.gs.symset[0].name, "IBMgraphics");
    assert.equal(game.gs.symset[ROGUESET].name, "RogueIBM");
  });

  it("do_set without gs slots still returns ok (mirror-write-only)", () => {
    assert.equal(optfn_IBMgraphics(78, REQ_DO_SET, false, "IBMgraphics", "", true), OPTN_OK);
    assert.equal(game.gs, undefined);
  });

  it("preset symset name is badflag err (C :1926–1927, :1939–1941)", () => {
    freshSymset();
    game.gs.symset[0].name = "DECgraphics";
    assert.equal(optfn_IBMgraphics(78, REQ_DO_SET, false, "IBMgraphics", "", true), OPTN_ERR);
    assert.equal(game.gs.symset[0].name, "DECgraphics"); // C `:1926` keeps the old name
    assert.equal(game.gs.symset[ROGUESET].name, "RogueIBM"); // later slot still named
  });

  it("negated do_set skips the loop, returns ok (C :1924)", () => {
    freshSymset();
    assert.equal(optfn_IBMgraphics(78, REQ_DO_SET, true, "IBMgraphics", "", true), OPTN_OK);
    assert.equal(game.gs.symset[0].name, null);
    assert.equal(game.gs.symset[ROGUESET].name, null);
  });

  it("get_val/get_cnf_val clear the buffer (C :1955–1957)", () => {
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "x" };
      assert.equal(optfn_IBMgraphics(78, req, false, holder, ""), OPTN_OK);
      assert.equal(holder.buf, "");
    }
  });

  it("rc parse reaches the live optfn (allopt idx 78)", () => {
    assert.equal(allopt_idx("IBMgraphics"), 78);
    freshSymset();
    parseNethackrc("OPTIONS=IBMgraphics");
    assert.equal(game.gs.symset[0].name, "IBMgraphics");
    assert.equal(get_option_value("IBMgraphics", false), null); // empty get_val → null
  });
});
