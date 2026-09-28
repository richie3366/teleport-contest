import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { key2txt } from "../js/dokeylist.js";

// C refs: cmd.c key2txt `:3225–3240` (D-3011); hacklib.c visctrl.
// Pins the whole body: four single-key arms in C order, everything else
// via visctrl. In particular C `:3233` maps '\n' only — '\r' falls through
// to visctrl ("^M"), and the js/pager.js clone (which mapped '\r' to
// "<enter>" and dropped the visctrl M-/^? arms) is gone: pager re-exports
// the same function object.
describe("key2txt port (cmd.c)", () => {
  it("maps space/esc/enter/del (C :3229–3236)", () => {
    assert.equal(key2txt(32), "<space>");
    assert.equal(key2txt(27), "<esc>");
    assert.equal(key2txt(10), "<enter>");
    assert.equal(key2txt(127), "<del>");
  });

  it("'\\r' falls through to visctrl ^M (C :3233 maps '\\n' only)", () => {
    assert.equal(key2txt(13), "^M");
  });

  it("passes the rest to visctrl (C :3237)", () => {
    assert.equal(key2txt(0), "^@");
    assert.equal(key2txt(1), "^A");
    assert.equal(key2txt(31), "^_");
    assert.equal(key2txt(65), "A");
    assert.equal(key2txt(128 | 65), "M-A");
    assert.equal(key2txt(255), "M-^?");
  });

  // js/pager.js imports this same export (C pager.c `:2593` + dowhatdoes);
  // a leftover local clone would be a duplicate-binding SyntaxError, so the
  // syntax gate proves the pager call sites use the C-correct arms above.
});
