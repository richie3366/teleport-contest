import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extcmd_run_by_txt } from "../js/getline.js";

// C ref: cmd.c extcmdlist "wmode" `:2002–2003`
// (IFBURIED|AUTOCOMPLETE|WIZMODECMD → wiz_show_wmodes, unconditional)
// and "wizobjprobs" `:1977–1978` (IFBURIED|WIZMODECMD, no AUTOCOMPLETE
// → wiz_objprobs; #if DEVEL||DEBUG, live because patchlevel.h:36
// defines DEBUG). Bodies + runners ship together (unlike D-3085,
// whose missing runners became review-2045 Must-fix D-3092). Pins the
// runners present.
describe("wmode/wizobjprobs extcmd runners (cmd.c)", () => {
  it("resolves #wmode to a runnable body", () => {
    const run = extcmd_run_by_txt("wmode");
    assert.equal(typeof run, "function");
  });
  it("resolves #wizobjprobs to a runnable body", () => {
    const run = extcmd_run_by_txt("wizobjprobs");
    assert.equal(typeof run, "function");
  });
  it("still resolves sibling wizard runners", () => {
    assert.equal(typeof extcmd_run_by_txt("vision"), "function");
    assert.equal(typeof extcmd_run_by_txt("wizmondiff"), "function");
  });
});
