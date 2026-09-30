import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
  l_get_config_errors,
  parse_conf_str,
  parse_config_line,
  heed_all_config_statements,
  disregard_all_config_statements,
  heed_this_config_statement,
  disregard_this_config_statement,
} from "../js/cfgfiles.js";
import {
  get_default_configfile,
  set_ignore_errors_on_unmatched,
  clear_ignore_errors_on_unmatched,
} from "../js/options.js";

// C refs: cfgfiles.c l_get_config_errors `:1514–1539` + config_erradd
// in_lua arm `:1566–1574` + cnf_line_DEBUGFILES `:838–849` +
// cnf_line_BONES_POOLS `:873–885` + heed/disregard_this_config_statement
// `:1996–2007` + get_default_configfile `:148–152`. Pins the config-line
// layer headless: no RNG, no display, no filesystem on any path.
// HACKDIR is row 5 of config_line_stmt order (C `:1312–1317`:
// OPTIONS=0 … HACKDIR=5); the heed/disregard test pins that order.
describe("cfgfiles config lines (cfgfiles.c)", () => {
  let savedIflags, savedSysopt, savedProg;
  beforeEach(() => {
    savedIflags = game.iflags ? { ...game.iflags } : undefined;
    savedSysopt = game.sysopt ? { ...game.sysopt } : undefined;
    savedProg = game.program_state ? { ...game.program_state } : undefined;
    heed_all_config_statements();
  });
  afterEach(() => {
    heed_all_config_statements();
    clear_ignore_errors_on_unmatched();
    if (savedIflags === undefined) delete game.iflags;
    else game.iflags = savedIflags;
    if (savedSysopt === undefined) delete game.sysopt;
    else game.sysopt = savedSysopt;
    if (savedProg === undefined) delete game.program_state;
    else game.program_state = savedProg;
  });

  it("get_default_configfile: UNIX arm (C :128)", () => {
    assert.equal(get_default_configfile(), ".nethackrc");
  });

  it("l_get_config_errors: drains the in_lua list head→tail, then [] (C :1524–1539)", () => {
    if (!game.iflags) game.iflags = {};
    game.iflags.in_lua = true;
    try {
      // Real error path: line 1 misses '=', line 2 matches no statement.
      parse_conf_str("noequalsign\nFOO=bar\n", parse_config_line);
    } finally {
      game.iflags.in_lua = false;
    }
    // C prepends (`:1570`), drain walks head→tail: most recent first.
    assert.deepEqual(l_get_config_errors(), [
      { line: 2, error: "Unknown config statement" },
      { line: 1, error: "Not a config statement, missing '='" },
    ]);
    assert.deepEqual(l_get_config_errors(), []);
  });

  it("BONES_POOLS: atoi + (n<=0)?0:min(n,10) (C :878–880)", () => {
    if (!game.iflags) game.iflags = {};
    game.iflags.parse_config_file_src = 0; // SET_IN_SYSCONF (cfgfiles.js:198)
    assert.equal(parse_config_line("BONES_POOLS=12"), true);
    assert.equal(game.sysopt.bones_pools, 10);
    assert.equal(parse_config_line("BONES_POOLS=7"), true);
    assert.equal(game.sysopt.bones_pools, 7);
    assert.equal(parse_config_line("BONES_POOLS=0"), true);
    assert.equal(game.sysopt.bones_pools, 0);
    assert.equal(parse_config_line("BONES_POOLS=-3"), true);
    assert.equal(game.sysopt.bones_pools, 0);
    assert.equal(parse_config_line("BONES_POOLS=abc"), true);
    assert.equal(game.sysopt.bones_pools, 0);
  });

  it("DEBUGFILES: env_dbgfl gate + store (C :843–846)", () => {
    if (!game.iflags) game.iflags = {};
    game.iflags.parse_config_file_src = 0;
    if (!game.sysopt) game.sysopt = {};
    game.sysopt.env_dbgfl = 0;
    assert.equal(parse_config_line("DEBUGFILES=/tmp/x"), true);
    assert.equal(game.sysopt.debugfiles, "/tmp/x");
    game.sysopt.env_dbgfl = 1; // C :841: getenv value wins over SYSCF
    assert.equal(parse_config_line("DEBUGFILES=/tmp/y"), true);
    assert.equal(game.sysopt.debugfiles, "/tmp/x");
  });

  it("heed/disregard_this: row 5 (HACKDIR) skip + bounds (C :1999–2006)", () => {
    set_ignore_errors_on_unmatched(); // unknown-statement error suppressed
    assert.equal(parse_config_line("HACKDIR=x"), true);
    disregard_this_config_statement(5);
    assert.equal(parse_config_line("HACKDIR=x"), false);
    heed_this_config_statement(5);
    assert.equal(parse_config_line("HACKDIR=x"), true);
    disregard_all_config_statements();
    assert.equal(parse_config_line("HACKDIR=x"), false);
    heed_this_config_statement(5);
    assert.equal(parse_config_line("HACKDIR=x"), true);
    // Out-of-range indices are silent no-ops (C :1999/:2005).
    heed_this_config_statement(-1);
    heed_this_config_statement(9999);
    disregard_this_config_statement(-1);
    disregard_this_config_statement(9999);
  });
});
