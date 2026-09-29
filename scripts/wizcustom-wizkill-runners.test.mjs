import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extcmd_run_by_txt } from "../js/getline.js";

// C ref: cmd.c extcmdlist "wizcustom" `:1951–1952`
// (IFBURIED|WIZMODECMD|NOFUZZERCMD → wiz_custom) and "wizkill"
// `:1967–1969` (+AUTOCOMPLETE|CMD_M_PREFIX → wiz_kill), both
// unconditional. D-3089 ported the bodies (js/wizcmds.js) but left no
// EXT_CMDS runners, so typed #wizcustom/#wizkill resolved to null
// (review 2049). Pins the runners present.
describe("wizcustom/wizkill extcmd runners (cmd.c)", () => {
  it("resolves #wizcustom to a runnable body", () => {
    const run = extcmd_run_by_txt("wizcustom");
    assert.equal(typeof run, "function");
  });
  it("resolves #wizkill to a runnable body", () => {
    const run = extcmd_run_by_txt("wizkill");
    assert.equal(typeof run, "function");
  });
  it("still resolves sibling wizard runners", () => {
    assert.equal(typeof extcmd_run_by_txt("wizwhere"), "function");
    assert.equal(typeof extcmd_run_by_txt("wizseenv"), "function");
  });
});
