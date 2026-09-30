import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  optfn_statushilites,
  optfn_statuslines,
  allopt_idx,
  get_option_value,
  parseNethackrc,
  parseoptions,
  reset_duplicate_opt_detection,
} from "../js/options.js";
import { WC2_STATUSLINES } from "../js/const.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_statushilites `:4012–4064` (STATUS_HILITES on,
// config.h `:616`) and optfn_statuslines `:4066–4107`. Req/result literals
// mirror the file's REQ_/OPTN_ consts (1/2/4/5, 1/0/-1). No RNG on any arm.
// The statuslines get arms read the live wc2 gate: contest tty sets
// WC2_STATUSLINES (wintty.c `:119`) but the JS wincap2 stays minimal by
// design (display.js install_tty_wincap2), so the unsupported arm is
// pinned as 'unknown' and the supported arm via a stubbed windowprocs.
const REQ_DO_INIT = 1, REQ_DO_SET = 2, REQ_GET_VAL = 4, REQ_GET_CNF_VAL = 5;
const OPTN_OK = 1, OPTN_ERR = 0, OPTN_SILENTERR = -1;

describe("optfn_statushilites port (options.c)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      iflags: game.iflags, go: game.go, disp: game.disp,
      flags: game.flags, gu: game.gu, ps: game.program_state,
    };
    game.iflags = {};
    game.go = {};
    delete game.disp;
    delete game.gu;
    game.flags = {};
    game.program_state = {};
    reset_duplicate_opt_detection();
  });
  afterEach(() => {
    game.iflags = saved.iflags;
    game.go = saved.go;
    game.disp = saved.disp;
    game.flags = saved.flags;
    game.gu = saved.gu;
    game.program_state = saved.ps;
  });

  it("do_init returns optn_ok (C :4017–4019)", () => {
    assert.equal(optfn_statushilites(174, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set stores the value, resets when not from file (C :4028–4036)", () => {
    const bag = {};
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, false, "statushilites:5", "5", bag, false),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 5);
    assert.equal(game.disp.botlx, true); // C `:4035` reset ran
    assert.equal(game.flags.botlx, true);
  });

  it("do_set from file skips the reset (C :4034)", () => {
    const bag = {};
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, false, "statushilites:5", "5", bag, true),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 5);
    assert.equal(game.disp, undefined); // no reset, stores untouched
  });

  it("bare name stores the 3-turn default (C :4029–4030)", () => {
    const bag = {};
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, false, "statushilites", "", bag, true),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 3);
  });

  it("negated stores 0 (C :4025–4026)", () => {
    const bag = { hilite_delta: 5 };
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, true, "statushilites:5", "5", bag, true),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 0);
  });

  it("negative clamps to 1, garbage atol is 0 and ok (C :4031–4032)", () => {
    const bag = {};
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, false, "statushilites:-2", "-2", bag, true),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 1);
    assert.equal(
      optfn_statushilites(174, REQ_DO_SET, false, "statushilites:x", "x", bag, true),
      OPTN_OK,
    );
    assert.equal(bag.hilite_delta, 0);
  });

  it("get_val is the off/on sentence (C :4046–4050)", () => {
    const holder = { buf: "" };
    assert.equal(
      optfn_statushilites(174, REQ_GET_VAL, false, holder, "", {}), OPTN_OK,
    );
    assert.equal(holder.buf, "0 (off: don't highlight status fields)");
    const holder2 = { buf: "" };
    assert.equal(
      optfn_statushilites(174, REQ_GET_VAL, false, holder2, "", { hilite_delta: 5 }),
      OPTN_OK,
    );
    assert.equal(holder2.buf, "5 (on: highlight status for 5 turns)");
  });

  it("get_cnf_val is %ld (C :4056–4058)", () => {
    const holder = { buf: "" };
    assert.equal(
      optfn_statushilites(174, REQ_GET_CNF_VAL, false, holder, "", { hilite_delta: 7 }),
      OPTN_OK,
    );
    assert.equal(holder.buf, "7");
  });

  it("rc parse + in-game dispatch + dump reach the live optfn (allopt idx 174)", () => {
    assert.equal(allopt_idx("statushilites"), 174);
    const rc = parseNethackrc("OPTIONS=statushilites:7");
    assert.equal(rc.iflags.hilite_delta, 7);
    const bare = parseNethackrc("OPTIONS=statushilites");
    assert.equal(bare.iflags.hilite_delta, 3);
    const neg = parseNethackrc("OPTIONS=!statushilites");
    assert.equal(neg.iflags.hilite_delta, 0); // negateok Yes passes through
    assert.equal(parseoptions("statushilites:9", false, false), true);
    assert.equal(game.iflags.hilite_delta, 9); // C `:637–638` allopt dispatch
    assert.equal(get_option_value("statushilites", false), "9 (on: highlight status for 9 turns)");
    assert.equal(get_option_value("statushilites", true), "9");
  });
});

describe("optfn_statuslines port (options.c)", () => {
  let saved;
  beforeEach(() => {
    saved = {
      iflags: game.iflags, go: game.go, wp: game.windowprocs,
      ps: game.program_state,
    };
    game.iflags = {};
    game.go = {};
    delete game.windowprocs;
    game.program_state = {};
    reset_duplicate_opt_detection();
  });
  afterEach(() => {
    game.iflags = saved.iflags;
    game.go = saved.go;
    game.windowprocs = saved.wp;
    game.program_state = saved.ps;
  });

  it("do_init returns optn_ok (C :4073–4075)", () => {
    assert.equal(optfn_statuslines(176, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set stores 2|3, flags redraw in game (C :4085–4095)", () => {
    const bag = {};
    assert.equal(
      optfn_statuslines(176, REQ_DO_SET, false, "statuslines:3", "3", bag, false),
      OPTN_OK,
    );
    assert.equal(bag.wc2_statuslines, 3);
    assert.equal(game.go.opt_need_redraw, true); // C `:4094–4095`
    const bag2 = {};
    game.go.opt_need_redraw = false;
    assert.equal(
      optfn_statuslines(176, REQ_DO_SET, false, "statuslines:2", "2", bag2, true),
      OPTN_OK,
    );
    assert.equal(bag2.wc2_statuslines, 2);
    assert.equal(game.go.opt_need_redraw, false); // opt_initial skips it
  });

  it("bare/out-of-range/non-numeric is silenterr, stores nothing (C :4088–4091)", () => {
    for (const opts of ["statuslines", "statuslines:", "statuslines:4", "statuslines:0", "statuslines:x"]) {
      const bag = { wc2_statuslines: 2 };
      assert.equal(
        optfn_statuslines(176, REQ_DO_SET, false, opts, "", bag, true),
        OPTN_SILENTERR,
      );
      assert.equal(bag.wc2_statuslines, 2);
    }
    const bag = {};
    assert.equal(
      optfn_statuslines(176, REQ_DO_SET, false, "statuslines:2x", "2x", bag, true),
      OPTN_OK, // C `:4086` atoi prefix
    );
    assert.equal(bag.wc2_statuslines, 2);
  });

  it("negated arm applies 2 yet returns err — C fall-through (C :4081–4084)", () => {
    const bag = {};
    assert.equal(
      optfn_statuslines(176, REQ_DO_SET, true, "statuslines:3", "3", bag, true),
      OPTN_ERR,
    );
    assert.equal(bag.wc2_statuslines, 2); // `:4083` itmp survives the range check
  });

  it("get arms read the wc2 gate (C :4099–4103)", () => {
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "" };
      assert.equal(
        optfn_statuslines(176, req, false, holder, "", { wc2_statuslines: 3 }),
        OPTN_OK,
      );
      assert.equal(holder.buf, "unknown"); // minimal JS wincap2 by design
    }
    game.windowprocs = { name: "tty", wincap2: WC2_STATUSLINES };
    for (const [lines, want] of [[2, "2"], [3, "3"], [undefined, "2"]]) {
      const holder = { buf: "" };
      assert.equal(
        optfn_statuslines(176, REQ_GET_VAL, false, holder, "", { wc2_statuslines: lines }),
        OPTN_OK,
      );
      assert.equal(holder.buf, want); // C `:4101` supported arm
    }
  });

  it("rc parse + in-game dispatch + dump reach the live optfn (allopt idx 176)", () => {
    assert.equal(allopt_idx("statuslines"), 176);
    const rc = parseNethackrc("OPTIONS=statuslines:3");
    assert.equal(rc.iflags.wc2_statuslines, 3);
    const neg = parseNethackrc("OPTIONS=!statuslines");
    assert.equal(neg.iflags.wc2_statuslines, undefined); // C `:626` negateok-No
    assert.equal(parseoptions("statuslines:3", false, false), true);
    assert.equal(game.iflags.wc2_statuslines, 3); // C `:637–638` allopt dispatch
    assert.equal(game.go.opt_need_redraw, true);
    assert.equal(get_option_value("statuslines", false), "unknown"); // wc2 gate
    assert.equal(get_option_value("statuslines", true), "unknown");
  });
});
