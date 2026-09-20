import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { trimspaces } from "../js/hacklib.js";

// C ref: hacklib.c trimspaces `:162–176` (ported for dungeon.c
// query_annotation `:2545`, which applies it to the describe_level
// buffer). Leading ' '/'\t' are skipped via the return value
// ("leading whitespace will remain in the buffer"); trailing ' '/'\t'
// are stripped. Only space and tab count — other whitespace is kept.
describe("trimspaces (hacklib.c:162-176)", () => {
  it("strips leading spaces and tabs", () => {
    assert.equal(trimspaces("   foo"), "foo");
    assert.equal(trimspaces("\t\tfoo"), "foo");
    assert.equal(trimspaces(" \t foo"), "foo");
  });

  it("strips trailing spaces and tabs", () => {
    assert.equal(trimspaces("foo   "), "foo");
    assert.equal(trimspaces("foo\t "), "foo");
  });

  it("strips both ends and leaves inner spacing alone", () => {
    assert.equal(trimspaces("  foo  bar  "), "foo  bar");
    assert.equal(trimspaces("level 3 "), "level 3");
  });

  it("keeps non-space/tab whitespace", () => {
    assert.equal(trimspaces("\nfoo\n"), "\nfoo\n");
    assert.equal(trimspaces(" foo\n"), "foo\n");
  });

  it("all-space input goes empty; empty stays empty", () => {
    assert.equal(trimspaces("   "), "");
    assert.equal(trimspaces(""), "");
    assert.equal(trimspaces(null), "");
  });
});
