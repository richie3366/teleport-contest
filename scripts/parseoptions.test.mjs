import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { PRIMARYSET } from "../js/const.js";
import { game } from "../js/gstate.js";
import {
  savedsym_free,
  match_optname,
  parseoptions,
  reset_duplicate_opt_detection,
  config_unmatched_ignored,
  set_ignore_errors_on_unmatched,
  clear_ignore_errors_on_unmatched,
} from "../js/options.js";

// C refs: options.c parseoptions `:489–691` (D-parseoptions) + match_optname
// `:6760–6771` + determine_ambiguities `:6703–6737` + duplicate_opt_detection
// `:6782–6788` + cfgfiles.c config_unmatched_ignored `:2020–2026`. Pins the
// option-line matcher headless: no RNG, no display, no filesystem on any
// path. The optfn dispatch arm is dormant (every JS allopt optfn is null),
// so only the S_ → parsesymbols fallback returns TRUE; every other path
// returns FALSE through its C-order gate. Module state touched per test —
// game.go opt flags, program_state.in_parseoptions, per-row dupdetected and
// minmatch (one-way C-init equivalent), symbol overrides — snapshotted and
// restored below.
describe("parseoptions port (options.c:489-691)", () => {
  let savedGo, savedProg, savedOvPrimary, savedOvRogue;
  beforeEach(() => {
    savedGo = game.go ? { ...game.go } : undefined;
    savedOvPrimary = game.go?.ov_primary_syms?.slice();
    savedOvRogue = game.go?.ov_rogue_syms?.slice();
    savedProg = game.program_state ? { ...game.program_state } : undefined;
    savedsym_free();
  });
  afterEach(() => {
    savedsym_free();
    reset_duplicate_opt_detection();
    clear_ignore_errors_on_unmatched();
    if (savedGo === undefined) delete game.go;
    else {
      game.go = savedGo;
      if (savedOvPrimary) game.go.ov_primary_syms = savedOvPrimary;
      else delete game.go.ov_primary_syms;
      if (savedOvRogue) game.go.ov_rogue_syms = savedOvRogue;
      else delete game.go.ov_rogue_syms;
    }
    if (savedProg === undefined) delete game.program_state;
    else game.program_state = savedProg;
  });

  it("match_optname: exact, prefix, minmatch floor, case-fold (C :6764-6771)", () => {
    assert.equal(match_optname("color", "color", 3, true), true);
    assert.equal(match_optname("col", "color", 3, true), true);
    assert.equal(match_optname("co", "color", 3, true), false);
    assert.equal(match_optname("COLOR", "color", 3, true), true);
    assert.equal(match_optname("colour", "color", 3, true), false);
  });

  it("match_optname: value tails stripped when allowed (C length_without_val)", () => {
    assert.equal(match_optname("color:red", "color", 3, true), true);
    assert.equal(match_optname("color=red", "color", 3, true), true);
    assert.equal(match_optname("color = red", "color", 3, true), true);
    // Same input with valAllowed FALSE sees the whole tail (C :6766).
    assert.equal(match_optname("color:red", "color", 9, false), false);
  });

  it("minmatch from determine_ambiguities: confirm needs 4 (C :6703-6737)", () => {
    // Oracle recomputed from optlist.h names: confirm/conduct share "con".
    assert.equal(match_optname("con", "confirm", 4, true), false);
    assert.equal(match_optname("conf", "confirm", 4, true), true);
    assert.equal(match_optname("col", "color", 3, true), true);
  });

  it("unknown/empty/overlong lines return FALSE (C :522-537, :689-690)", () => {
    assert.equal(parseoptions("bogus_option_xyz", true, true), false);
    assert.equal(parseoptions("", true, true), false);
    assert.equal(parseoptions("   ", true, true), false);
    assert.equal(parseoptions("x".repeat(200), true, true), false);
  });

  it("negation folding: ! and no/no- prefixes (C :539-543)", () => {
    // optfn dispatch is dormant, so all of these are FALSE — via different
    // C gates — but none throws and go flags record the call.
    assert.equal(parseoptions("!acoustics", true, true), false);
    assert.equal(parseoptions("noacoustics", true, true), false);
    assert.equal(parseoptions("no-acoustics", true, true), false);
    assert.equal(parseoptions("!noacoustics", true, true), false);
    assert.equal(game.go.opt_initial, true);
    assert.equal(game.go.opt_from_file, true);
  });

  it("bad negation returns optn_err and skips the in_parseoptions decrement (C :626-628)", () => {
    const before = game.program_state?.in_parseoptions ?? 0;
    assert.equal(parseoptions("!windowtype", true, true), false);
    // C returns before `:644`, so the counter stays elevated by exactly one.
    assert.equal(game.program_state.in_parseoptions, before + 1);
  });

  it("bad negation covers travel_debug non-DEBUG negateok-No (optlist.h:794-796, C :626-628)", () => {
    const before = game.program_state?.in_parseoptions ?? 0;
    assert.equal(parseoptions("!travel_debug", true, true), false);
    // Same C :626-628 early return: no `:644` decrement, counter leaks by one.
    assert.equal(game.program_state.in_parseoptions, before + 1);
  });

  it("alias loop resolves colour->color with no throw (C :602-613)", () => {
    assert.equal(parseoptions("colour", true, true), false);
    assert.equal(parseoptions("male", true, true), false);
  });

  it("S_ fallback runs live parsesymbols and returns retval TRUE (C :662-666)", () => {
    assert.equal(parseoptions("S_boulder:1", true, true), true);
  });

  it("comma lines recurse right-to-left, retval ANDs (C :513-521, :685-686)", () => {
    // Tail S_ ok but head unknown -> FALSE; reversed likewise.
    assert.equal(parseoptions("bogus_opt,S_boulder:1", true, true), false);
    assert.equal(parseoptions("S_boulder:1,bogus_opt", true, true), false);
    // No comma split when tinitial is FALSE (C :513).
    assert.equal(parseoptions("bogus_opt,S_boulder:1", false, false), false);
  });

  it("pfx rows fall into the suffix-variation gate (C :674-681)", () => {
    assert.equal(parseoptions("cond_blind", true, true), false);
    assert.equal(parseoptions("font", true, true), false);
  });

  it("duplicate detection counts only initial from-file parses (C :6782-6788)", () => {
    reset_duplicate_opt_detection();
    assert.equal(parseoptions("acoustics", true, true), false);
    assert.equal(parseoptions("acoustics", true, true), false);
    // Same option outside initial file parsing never counts.
    assert.equal(parseoptions("acoustics", false, false), false);
    assert.equal(parseoptions("acoustics", true, false), false);
  });

  it("config_unmatched_ignored trio defaults FALSE (cfgfiles.c :2014-2026)", () => {
    assert.equal(config_unmatched_ignored(), false);
    set_ignore_errors_on_unmatched();
    assert.equal(config_unmatched_ignored(), true);
    // Unmatched stays FALSE either way; the flag only selects the gate.
    assert.equal(parseoptions("bogus_option_xyz", true, true), false);
    clear_ignore_errors_on_unmatched();
    assert.equal(config_unmatched_ignored(), false);
  });

  it("PRIMARYSET import is live for the S_ arm (C :663)", () => {
    assert.equal(PRIMARYSET, 0);
  });
});
