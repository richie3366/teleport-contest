import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { def_char_is_furniture } from "../js/drawing.js";
import { DEFSYMS } from "../js/generated/defsyms_data.js";
import { S_upstair, S_brupstair, S_fountain } from "../js/const.js";

// C ref: drawing.c def_char_is_furniture `:119–142` over
// include/defsym.h PCHAR explanations. `furniture` flips at the first
// explanation with a 5-char "stair" prefix (S_upstair = 25,
// "staircase up"); the scan returns the first defsyms[] index whose
// sym matches, stopping past S_fountain = 37 ("fountain").
describe("def_char_is_furniture (drawing.c:119-142)", () => {
  it("returns the defsyms[] index for furniture chars", () => {
    assert.equal(def_char_is_furniture("<"), S_upstair); // 25, first '<'
    assert.equal(def_char_is_furniture(">"), 26); // S_dnstair
    assert.equal(def_char_is_furniture("_"), 33); // S_altar
    assert.equal(def_char_is_furniture("|"), 34); // S_grave
    assert.equal(def_char_is_furniture("\\"), 35); // S_throne
    assert.equal(def_char_is_furniture("{"), 36); // S_sink (before fountain)
  });

  it("returns -1 outside the furniture block", () => {
    for (const ch of [".", "^", "#", " ", "}", '"', "~", "q", "$", "0"]) {
      assert.equal(def_char_is_furniture(ch), -1, JSON.stringify(ch));
    }
    assert.equal(def_char_is_furniture(""), -1);
  });

  it("pins the generated table anchors the scan depends on", () => {
    assert.equal(DEFSYMS.length, 105); // MAXPCHARS; fencepost omitted
    assert.deepEqual(DEFSYMS[S_upstair], ["<", "S_upstair", "staircase up"]);
    assert.deepEqual(DEFSYMS[S_brupstair], ["<", "S_brupstair", "branch staircase up"]);
    assert.deepEqual(DEFSYMS[35], ["\\", "S_throne", "opulent throne"]); // desc, not tilenm
    assert.deepEqual(DEFSYMS[S_fountain], ["{", "S_fountain", "fountain"]);
    // Nothing before S_upstair may start with "stair" (flip point).
    for (let i = 0; i < S_upstair; i++) {
      assert.notEqual(DEFSYMS[i][2].slice(0, 5), "stair", `index ${i}`);
    }
  });
});
