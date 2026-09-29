import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extcmd_run_by_txt } from "../js/getline.js";

// C ref: cmd.c extcmdlist "vision" `:1928–1929`
// (IFBURIED|AUTOCOMPLETE|WIZMODECMD → wiz_show_vision, unconditional)
// and "wizmondiff" `:1985–1986` (same flags → wiz_mon_diff; #if
// DEVEL||DEBUG, live because patchlevel.h:35–37 defines DEBUG). D-3085
// ported the bodies (js/wizcmds.js) but left no EXT_CMDS runners, so
// typed #vision/#wizmondiff resolved to null (review 2045). Pins the
// runners present.
describe("vision/wizmondiff extcmd runners (cmd.c)", () => {
  it("resolves #vision to a runnable body", () => {
    const run = extcmd_run_by_txt("vision");
    assert.equal(typeof run, "function");
  });
  it("resolves #wizmondiff to a runnable body", () => {
    const run = extcmd_run_by_txt("wizmondiff");
    assert.equal(typeof run, "function");
  });
  it("still resolves sibling wizard runners", () => {
    assert.equal(typeof extcmd_run_by_txt("wizseenv"), "function");
    assert.equal(typeof extcmd_run_by_txt("stats"), "function");
  });
});
