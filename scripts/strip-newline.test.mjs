import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { strip_newline } from "../js/pager.js";

// C refs: hacklib.c strip_newline `:179–190` (review 1517 QUALITY-RISK).
// C truncates at the LAST '\n' (`*p = '\0'`, tail dropped), swallowing a
// preceding '\r'. Pins the truncate (not splice) semantics: interior
// newlines drop the tail.
describe("strip_newline port (hacklib.c)", () => {
  it("no newline returns the string unchanged (C p == NULL)", () => {
    assert.equal(strip_newline("abc"), "abc");
    assert.equal(strip_newline(""), "");
  });

  it("trailing newline is cut (C *p = '\\0')", () => {
    assert.equal(strip_newline("abc\n"), "abc");
  });

  it("trailing CRLF swallows the CR (C --p arm)", () => {
    assert.equal(strip_newline("abc\r\n"), "abc");
  });

  it("interior newline drops the tail (C truncates, not splices)", () => {
    assert.equal(strip_newline("a\nb"), "a");
  });

  it("truncates at the LAST newline (C strrchr)", () => {
    assert.equal(strip_newline("a\nb\n"), "a\nb");
    assert.equal(strip_newline("a\nb\nc"), "a\nb");
  });

  it("lone newline and CRLF empty the string", () => {
    assert.equal(strip_newline("\n"), "");
    assert.equal(strip_newline("\r\n"), "");
  });
});
