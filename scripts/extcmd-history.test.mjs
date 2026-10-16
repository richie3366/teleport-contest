import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extcmd_run_by_txt, extcmds_match, extcmds_getentry } from "../js/getline.js";
import { EXTCMDLIST } from "../js/generated/extcmdlist_data.js";
import { ECM_NOFLAGS, ECM_IGNOREAC, ECM_EXACTMATCH } from "../js/const.js";

// C ref: cmd.c extcmdlist "history" `:1738–1739`
// (IFBURIED|AUTOCOMPLETE|GENERALCMD → dohistory, pager.c:2960–2965,
// live js/pager.js:dohistory since the help-menu wiring). Typed #history
// must resolve through a live EXT_CMDS runner: 83 scen-extcmd sessions
// diverged with «#history: unknown extended command.» because EXT_CMDS
// had no row, so get_ext_cmd fell to the idx<0 arm (D-4039).
describe("extcmd history runner (cmd.c:1738)", () => {
  it("EXT_CMDS carries a history runner", () => {
    assert.equal(typeof extcmd_run_by_txt("history"), "function");
  });
  it("typed #history exact-matches the generated row (get_ext_cmd path)", () => {
    const m = extcmds_match("history", ECM_IGNOREAC | ECM_EXACTMATCH);
    assert.equal(m.length, 1);
    assert.equal(extcmds_getentry(m[0]).txt, "history");
  });
  it("history autocompletes (AUTOCOMPLETE in C)", () => {
    const m = extcmds_match("histor", ECM_NOFLAGS);
    assert.ok(m.some((i) => EXTCMDLIST[i].txt === "history"));
  });
});
