import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  norm_ptrs_any,
  norm_ptrs_align,
  norm_ptrs_arti_info,
  norm_ptrs_attribs,
} from "../js/sfbase.js";

// C ref: sfbase.c norm_ptrs_any `:748–750`, norm_ptrs_align `:752–754`,
// norm_ptrs_arti_info `:757–759`, norm_ptrs_attribs `:762–764` — empty
// no-op bodies (save-format pointer normalization; scored JS saves
// JSON, so no dispatch table calls them). Pins the C-home module:
// all four import as plain ESM, accept the UNUSED slot, return
// undefined, and never throw.
describe("sfbase norm_ptrs_* stubs (sfbase.c:748-764)", () => {
  it("all four stubs are callable no-ops", () => {
    assert.equal(norm_ptrs_any({}), undefined);
    assert.equal(norm_ptrs_align({}), undefined);
    assert.equal(norm_ptrs_arti_info({}), undefined);
    assert.equal(norm_ptrs_attribs({}), undefined);
  });

  it("stubs tolerate null/undefined (UNUSED slots)", () => {
    assert.equal(norm_ptrs_any(null), undefined);
    assert.equal(norm_ptrs_align(undefined), undefined);
    assert.equal(norm_ptrs_arti_info(null), undefined);
    assert.equal(norm_ptrs_attribs(undefined), undefined);
  });
});
