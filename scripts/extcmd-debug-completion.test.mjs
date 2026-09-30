import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import { extcmds_match, extcmds_getentry } from "../js/getline.js";
import { EXTCMDLIST } from "../js/generated/extcmdlist_data.js";
import { ECM_NOFLAGS } from "../js/const.js";

// C ref: cmd.c extcmdlist DEBUG-gated rows — "wizbury" `:1944–1948`
// (#ifdef DEBUG), "wizdispmacros" `:1955–1958`, "wizobjprobs"
// `:1975–1978`, "wizmondiff" `:1984–1987` (#if DEVEL||DEBUG). All live:
// patchlevel.h:35–37 defines DEBUG unconditionally (no -UDEBUG in the
// recorder build), and seed4500's C side expands "#wizm" to
// "wizmondiff". D-3149 rewired per-keystroke completion through
// extcmds_match, which reads the generated table — the table must
// carry these rows or the fortress regresses (seed4500 1802/1814).
// "travel" (`:1909–1910`, CMD_M_PREFIX only) pins the other side:
// no AUTOCOMPLETE in any build, so it must not complete.
describe("extcmd DEBUG-row completion (cmd.c)", () => {
  it("generated table carries the DEBUG-gated rows", () => {
    for (const txt of ["wizbury", "wizdispmacros", "wizobjprobs", "wizmondiff"]) {
      assert.ok(
        EXTCMDLIST.some((e) => e.txt === txt),
        `missing EXTCMDLIST row: ${txt}`,
      );
    }
  });
  it("completes #wizm to wizmondiff like C's hook (seed4500)", () => {
    game.flags = { ...game.flags, debug: true };
    try {
      const m = extcmds_match("wizm", ECM_NOFLAGS);
      assert.equal(m.length, 1);
      assert.equal(extcmds_getentry(m[0]).txt, "wizmondiff");
    } finally {
      game.flags = { ...game.flags, debug: false };
    }
  });
  it("does not complete travel (no AUTOCOMPLETE in C)", () => {
    const m = extcmds_match("travel", ECM_NOFLAGS);
    assert.ok(!m.some((i) => EXTCMDLIST[i].txt === "travel"));
  });
  it("extcmds_getentry rejects out-of-range indices", () => {
    assert.equal(extcmds_getentry(-1), null);
    assert.equal(extcmds_getentry(EXTCMDLIST.length), null);
    assert.equal(extcmds_getentry(0).txt, EXTCMDLIST[0].txt);
  });
});
