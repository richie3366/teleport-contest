import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  optfn_DECgraphics,
  optfn_playmode,
  optfn_hilite_status,
  optfn_term_cols,
  optfn_term_rows,
  optfn_o_autocomplete,
  allopt_idx,
  get_option_value,
  parseNethackrc,
} from "../js/options.js";
import { PRIMARYSET, AUTOCOMP_ADJ } from "../js/const.js";
import { EXTCMDLIST } from "../js/generated/extcmdlist_data.js";
import { count_autocompletions } from "../js/cmd.js";
import { count_status_hilites, clear_status_hilites } from "../js/botl.js";
import { game } from "../js/gstate.js";

// C refs: options.c optfn_DECgraphics `:1393–1439`, optfn_playmode
// `:3470–3504`, optfn_hilite_status `:1851–1894` (STATUS_HILITES on,
// config.h `:616`), optfn_term_cols `:4238–4277`, optfn_term_rows
// `:4279–4318` (BACKWARD_COMPAT on, optlist.h `:15`),
// optfn_o_autocomplete `:8345–8365`, cmd.c count_autocompletions
// `:3312–3322`. Req/result literals mirror the file's REQ_/OPTN_ consts
// (1/2/4/5, 1/0). The DECgraphics read_sym_file failure arm (`:1415–
// :1417`) and switch_symbols (`:1418–1419`) are named omissions (Rule #2
// / by-design, IBMgraphics precedent) and are not pinned here. The
// o_autocomplete do_handler (`:8361–8363`) stays inlined at the doset
// dispatch (async; o_status_cond precedent). No RNG on any arm.
const REQ_DO_INIT = 1, REQ_DO_SET = 2, REQ_GET_VAL = 4, REQ_GET_CNF_VAL = 5;
const OPTN_OK = 1, OPTN_ERR = 0;

describe("optfn_DECgraphics port (options.c)", () => {
  let savedGs;
  beforeEach(() => {
    savedGs = game.gs;
    delete game.gs;
  });
  afterEach(() => {
    game.gs = savedGs;
  });

  const freshSymset = () => (game.gs = { symset: [{ name: null }, { name: null }] });

  it("do_init returns optn_ok (C :1402–1404)", () => {
    assert.equal(optfn_DECgraphics(41, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set names PRIMARYSET only, no rogue arm (C :1409–1414)", () => {
    freshSymset();
    assert.equal(optfn_DECgraphics(41, REQ_DO_SET, false, "DECgraphics", ""), OPTN_OK);
    assert.equal(game.gs.symset[PRIMARYSET].name, "DECgraphics");
    assert.equal(game.gs.symset[1].name, null); // C `:1410` no rogue set
  });

  it("do_set without gs slots still returns ok (mirror-write-only)", () => {
    assert.equal(optfn_DECgraphics(41, REQ_DO_SET, false, "DECgraphics", ""), OPTN_OK);
    assert.equal(game.gs, undefined);
  });

  it("preset symset name is badflag err (C :1411–1412, :1421–1424)", () => {
    freshSymset();
    game.gs.symset[PRIMARYSET].name = "IBMgraphics";
    assert.equal(optfn_DECgraphics(41, REQ_DO_SET, false, "DECgraphics", ""), OPTN_ERR);
    assert.equal(game.gs.symset[PRIMARYSET].name, "IBMgraphics"); // C `:1411` keeps it
  });

  it("negated do_set skips the load, returns ok (C :1409)", () => {
    freshSymset();
    assert.equal(optfn_DECgraphics(41, REQ_DO_SET, true, "DECgraphics", ""), OPTN_OK);
    assert.equal(game.gs.symset[PRIMARYSET].name, null);
  });

  it("get_val/get_cnf_val clear the buffer (C :1434–1436)", () => {
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "x" };
      assert.equal(optfn_DECgraphics(41, req, false, holder, ""), OPTN_OK);
      assert.equal(holder.buf, "");
    }
  });

  it("rc parse reaches the live optfn (allopt idx 41)", () => {
    assert.equal(allopt_idx("DECgraphics"), 41);
    freshSymset();
    const rc = parseNethackrc("OPTIONS=DECgraphics");
    assert.equal(game.gs.symset[PRIMARYSET].name, "DECgraphics");
    assert.equal(rc.flags.decgraphics, true);
    assert.equal(get_option_value("DECgraphics", false), null); // empty get_val → null
  });

  it("rc valued + negated forms (key site, flags mirror)", () => {
    freshSymset();
    const rc = parseNethackrc("OPTIONS=decgraphics:x");
    assert.equal(game.gs.symset[PRIMARYSET].name, "DECgraphics");
    assert.equal(rc.flags.decgraphics, true);
    freshSymset();
    const neg = parseNethackrc("OPTIONS=!decgraphics");
    assert.equal(game.gs.symset[PRIMARYSET].name, null);
    assert.equal(neg.flags.decgraphics, false);
  });
});

describe("optfn_playmode port (options.c)", () => {
  let savedWizard, savedDiscover;
  beforeEach(() => {
    savedWizard = game.wizard;
    savedDiscover = game.discover;
    game.wizard = game.discover = false;
  });
  afterEach(() => {
    game.wizard = savedWizard;
    game.discover = savedDiscover;
  });

  it("do_init returns optn_ok (C :3475–3477)", () => {
    assert.equal(optfn_playmode(1, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set stores each mode family (C :3485–3491)", () => {
    for (const v of ["normal", "NORMAL", "play", "Play"]) {
      game.wizard = game.discover = true;
      assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", v), OPTN_OK);
      assert.equal(game.wizard, false);
      assert.equal(game.discover, false);
    }
    for (const v of ["explore", "Exploration", "discovery", "DISCOVER"]) {
      assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", v), OPTN_OK);
      assert.equal(game.wizard, false);
      assert.equal(game.discover, true);
    }
    for (const v of ["debug", "DEBUG dlg", "wizard", "Wizardry"]) {
      assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", v), OPTN_OK);
      assert.equal(game.wizard, true);
      assert.equal(game.discover, false);
    }
  });

  it("do_set gates: negated, empty, invalid (C :3481–3484, :3492–3495)", () => {
    assert.equal(optfn_playmode(1, REQ_DO_SET, true, "", "debug"), OPTN_ERR);
    assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", ""), OPTN_ERR);
    assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", "xyzzy"), OPTN_ERR);
    assert.equal(optfn_playmode(1, REQ_DO_SET, false, "", "plays"), OPTN_ERR); // strcmpi, not prefix
    assert.equal(game.wizard, false);
    assert.equal(game.discover, false);
  });

  it("get_val reports wizard/discover/normal (C :3499–3501)", () => {
    const holder = { buf: "" };
    assert.equal(optfn_playmode(1, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "normal");
    game.discover = true;
    assert.equal(optfn_playmode(1, REQ_GET_CNF_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "explore");
    game.wizard = true;
    game.discover = false;
    assert.equal(optfn_playmode(1, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "debug");
  });

  it("rc parse reaches the live optfn (allopt idx 1)", () => {
    assert.equal(allopt_idx("playmode"), 1);
    const rc = parseNethackrc("OPTIONS=playmode:debug");
    assert.equal(game.wizard, true);
    assert.equal(game.discover, false);
    assert.equal(rc.flags.debug, true); // set_playmode() consumer stays fed
    assert.equal(get_option_value("playmode", false), "debug");
  });
});

describe("optfn_hilite_status port (options.c)", () => {
  beforeEach(() => {
    clear_status_hilites();
  });
  afterEach(() => {
    clear_status_hilites();
  });

  it("do_init returns optn_ok (C :1859–1861)", () => {
    assert.equal(optfn_hilite_status(75, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set parses a rule, clears on negated+value (C :1865–1875)", () => {
    assert.equal(
      optfn_hilite_status(75, REQ_DO_SET, false, "hilite_status:HD/yellow", ""), OPTN_OK,
    );
    assert.equal(count_status_hilites(), 1);
    assert.equal(
      optfn_hilite_status(75, REQ_DO_SET, true, "hilite_status:HD/yellow", ""), OPTN_OK,
    );
    assert.equal(count_status_hilites(), 0); // C `:1866–1868` clear arm
  });

  it("do_set without a value is err (C :1869–1871)", () => {
    assert.equal(optfn_hilite_status(75, REQ_DO_SET, false, "hilite_status", ""), OPTN_ERR);
    assert.equal(count_status_hilites(), 0);
  });

  it("get_val names the rules page, get_cnf_val stays empty (C :1883–1891)", () => {
    assert.equal(allopt_idx("hilite_status"), 75);
    const holder = { buf: "x" };
    assert.equal(optfn_hilite_status(75, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "(none)");
    assert.equal(
      optfn_hilite_status(75, REQ_DO_SET, false, "hilite_status:HD/yellow", ""), OPTN_OK,
    );
    assert.equal(optfn_hilite_status(75, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, '(see "status highlight rules" below)');
    assert.equal(optfn_hilite_status(75, REQ_GET_CNF_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "");
  });
});

describe("optfn_term_cols/rows port (options.c)", () => {
  let savedCols, savedRows;
  beforeEach(() => {
    savedCols = game.iflags?.wc2_term_cols;
    savedRows = game.iflags?.wc2_term_rows;
    if (game.iflags) {
      delete game.iflags.wc2_term_cols;
      delete game.iflags.wc2_term_rows;
    }
  });
  afterEach(() => {
    if (savedCols === undefined) delete game.iflags?.wc2_term_cols;
    else game.iflags.wc2_term_cols = savedCols;
    if (savedRows === undefined) delete game.iflags?.wc2_term_rows;
    else game.iflags.wc2_term_rows = savedRows;
  });

  it("do_init returns optn_ok (C :4246–4248, :4287–4289)", () => {
    assert.equal(optfn_term_cols(179, REQ_DO_INIT, false, "", ""), OPTN_OK);
    assert.equal(optfn_term_rows(180, REQ_DO_INIT, false, "", ""), OPTN_OK);
  });

  it("do_set stores sane values (C :4253–4265)", () => {
    assert.equal(allopt_idx("term_cols"), 179);
    assert.equal(allopt_idx("term_rows"), 180);
    assert.equal(optfn_term_cols(179, REQ_DO_SET, false, "term_cols:100", ""), OPTN_OK);
    assert.equal(game.iflags.wc2_term_cols, 100);
    assert.equal(optfn_term_rows(180, REQ_DO_SET, false, "term_rows:40", ""), OPTN_OK);
    assert.equal(game.iflags.wc2_term_rows, 40);
  });

  it("do_set rejects non-positive and huge values (C :4257–4260)", () => {
    for (const v of ["0", "-5", "32767", "99999", "abc"]) {
      assert.equal(optfn_term_cols(179, REQ_DO_SET, false, `term_cols:${v}`, ""), OPTN_ERR);
      assert.equal(optfn_term_rows(180, REQ_DO_SET, false, `term_rows:${v}`, ""), OPTN_ERR);
    }
    assert.equal(game.iflags?.wc2_term_cols, undefined);
    assert.equal(game.iflags?.wc2_term_rows, undefined);
  });

  it("do_set without a value is a no-op ok (C :4253)", () => {
    assert.equal(optfn_term_cols(179, REQ_DO_SET, false, "term_cols", ""), OPTN_OK);
    assert.equal(optfn_term_rows(180, REQ_DO_SET, true, "term_rows", ""), OPTN_OK);
    assert.equal(game.iflags?.wc2_term_cols, undefined);
    assert.equal(game.iflags?.wc2_term_rows, undefined);
  });

  it("get arms: digits when set, default/empty when not (C :4267–4274)", () => {
    const holder = { buf: "" };
    assert.equal(optfn_term_cols(179, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "default"); // C `:4273` defopt[]
    assert.equal(optfn_term_cols(179, REQ_GET_CNF_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "");
    assert.equal(optfn_term_cols(179, REQ_DO_SET, false, "term_cols:100", ""), OPTN_OK);
    assert.equal(optfn_term_cols(179, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, "100");
    assert.equal(get_option_value("term_cols", false), "100");
    assert.equal(get_option_value("term_rows", false), "default");
    assert.equal(get_option_value("term_rows", true), null); // empty cnf → null
  });
});

describe("optfn_o_autocomplete + count_autocompletions (options.c, cmd.c)", () => {
  let savedFlags;
  beforeEach(() => {
    savedFlags = EXTCMDLIST.map((e) => e.flags);
  });
  afterEach(() => {
    EXTCMDLIST.forEach((e, i) => {
      e.flags = savedFlags[i];
    });
  });

  it("count_autocompletions counts AUTOCOMP_ADJ rows (C :3312–3322)", () => {
    const base = count_autocompletions();
    EXTCMDLIST[0].flags |= AUTOCOMP_ADJ;
    EXTCMDLIST[1].flags |= AUTOCOMP_ADJ;
    assert.equal(count_autocompletions(), base + 2);
  });

  it("do_init ok, do_set no-op ok (C :8350–8354)", () => {
    assert.equal(allopt_idx("autocompletions"), 15);
    assert.equal(optfn_o_autocomplete(15, REQ_DO_INIT, false, "", ""), OPTN_OK);
    assert.equal(optfn_o_autocomplete(15, REQ_DO_SET, false, "autocompletions", ""), OPTN_OK);
  });

  it("get arms report n_currently_set, null opts is err (C :8355–8360)", () => {
    assert.equal(optfn_o_autocomplete(15, REQ_GET_VAL, false, null, ""), OPTN_ERR);
    for (const req of [REQ_GET_VAL, REQ_GET_CNF_VAL]) {
      const holder = { buf: "" };
      assert.equal(optfn_o_autocomplete(15, req, false, holder, ""), OPTN_OK);
      assert.equal(holder.buf, `(${count_autocompletions()} currently set)`);
    }
    EXTCMDLIST[0].flags |= AUTOCOMP_ADJ;
    const holder = { buf: "" };
    assert.equal(optfn_o_autocomplete(15, REQ_GET_VAL, false, holder, ""), OPTN_OK);
    assert.equal(holder.buf, `(${count_autocompletions()} currently set)`);
    assert.match(holder.buf, /\([1-9][0-9]* currently set\)/);
  });
});
