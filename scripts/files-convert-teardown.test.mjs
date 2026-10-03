import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  make_converted_name,
  delete_convertedfile,
  free_convert_filenames,
} from "../js/files.js";

// C ref: files.c free_convert_filenames `:2168–2175` — drop both
// converter names (C frees the arenas; JS drops the refs) and reset
// cvtinit to FALSE. The names only ever feed C unlink/alloc (Rule #2
// omits in scored JS) and cvtinit has no reader in src/ or include/,
// so the port is observationally a state reset: pins the null-guard
// arms (`:2170`, `:2172`), idempotence, and that the converter family
// still builds names after a free.
describe("free_convert_filenames (files.c:2168-2175)", () => {
  it("frees on empty state (both null guards) without throwing", () => {
    assert.equal(free_convert_filenames(), undefined);
    assert.equal(free_convert_filenames(), undefined);
  });

  it("clears built names; family rebuilds afterwards", () => {
    assert.equal(make_converted_name("bones.x"), true);
    assert.equal(free_convert_filenames(), undefined);
    // Rebuild path still live after the free (lazy make `:2159–2160`).
    assert.equal(make_converted_name("other"), true);
    assert.equal(delete_convertedfile("other"), 0);
    assert.equal(free_convert_filenames(), undefined);
  });

  it("rejects a null filename like C `:2097–2098`", () => {
    assert.equal(make_converted_name(null), false);
    assert.equal(free_convert_filenames(), undefined);
  });
});
