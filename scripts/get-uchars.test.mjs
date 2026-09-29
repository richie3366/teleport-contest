import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { SYM_BOULDER } from "../js/const.js";
import { game } from "../js/gstate.js";
import { SYM_MAX, SYM_OFF_X } from "../js/display.js";
import { parse_config_line } from "../js/cfgfiles.js";

// C refs: cfgfiles.c get_uchars `:380–437` via cnf_line_WARNINGS `:1180–1188`
// and cnf_line_BOULDER `:1154–1161` (D-3081, review 2041 Must-fix). Pins the
// gi_error arm headless: raw_printf + return count, no wait_synch (named
// omission — the config parser stays sync, parseautocomplete precedent).
// get_uchars itself is file-local, so the tests drive it through the
// exported parse_config_line dispatch. No RNG, no display, no filesystem.
describe("get_uchars error arm (cfgfiles.c:427-435)", () => {
  let savedGw, savedGo, savedOvPrimary;
  beforeEach(() => {
    savedGw = game.gw ? { ...game.gw, warnsyms: game.gw.warnsyms?.slice() } : undefined;
    savedGo = game.go ? { ...game.go } : undefined;
    savedOvPrimary = game.go?.ov_primary_syms?.slice();
    delete game.gw;
  });
  afterEach(() => {
    if (savedGw === undefined) delete game.gw;
    else game.gw = savedGw;
    if (savedGo === undefined) delete game.go;
    else {
      game.go = savedGo;
      if (savedOvPrimary) game.go.ov_primary_syms = savedOvPrimary;
      else delete game.go.ov_primary_syms;
    }
  });

  it("WARNINGS partial parse keeps parsed bytes, error arm returns count (C :1185)", () => {
    const r = parse_config_line("WARNINGS=65 66 x");
    assert.equal(r, true); // sync boolean, not a Promise — parser stays sync
    assert.equal(game.gw.warnsyms[0], 65);
    assert.equal(game.gw.warnsyms[1], 66);
    // Tail still the seeded defaults: capture them from a fresh all-bad line.
    delete game.gw;
    assert.equal(parse_config_line("WARNINGS=xyz"), true);
    const defaults = game.gw.warnsyms.slice();
    delete game.gw;
    assert.equal(parse_config_line("WARNINGS=65 66 x"), true);
    assert.deepEqual(game.gw.warnsyms.slice(2), defaults.slice(2));
  });

  it("WARNINGS all-bad seeds defaults and changes nothing (C :432-434)", () => {
    assert.equal(parse_config_line("WARNINGS=xyz"), true);
    const defaults = game.gw.warnsyms.slice();
    assert.equal(game.gw.warnsyms.length, defaults.length);
    // A second all-bad line is a fixed point (error arm count 0, zeros skipped).
    assert.equal(parse_config_line("WARNINGS=!"), true);
    assert.deepEqual(game.gw.warnsyms, defaults);
  });

  it("BOULDER error arm keeps the old override via modlist seed (C :1158)", () => {
    const idx = SYM_BOULDER + SYM_OFF_X;
    game.go = { ...(game.go ?? {}), ov_primary_syms: new Array(SYM_MAX).fill(0) };
    game.go.ov_primary_syms[idx] = "A";
    assert.equal(parse_config_line("BOULDER=x"), true);
    assert.equal(game.go.ov_primary_syms[idx], "A");
    // A valid value still overrides (the non-error arm is untouched).
    assert.equal(parse_config_line("BOULDER=66"), true);
    assert.equal(game.go.ov_primary_syms[idx], "B");
  });
});
