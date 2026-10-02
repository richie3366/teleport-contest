import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { initRng, enableRngLog, getRngLog } from "../js/rng.js";
import { rnd_extcmd_idx } from "../js/cmd.js";
import { EXTCMDLIST } from "../js/generated/extcmdlist_data.js";

// C ref: cmd.c rnd_extcmd_idx `:3601–3604` — `rn2(extcmdlist_length + 1) - 1`.
// Dead in C (no callers) but extern, so a live export. EXTCMDLIST.length ≡
// extcmdlist_length (generated table omits the C null terminator).
describe("rnd_extcmd_idx formula (cmd.c:3601-3604)", () => {
  it("draws exactly one rn2(length+1) and returns draw-1", () => {
    initRng(77031);
    enableRngLog();
    const n = EXTCMDLIST.length + 1;
    const idx = rnd_extcmd_idx();
    const log = getRngLog();
    assert.equal(log.length, 1);
    assert.match(log[0], new RegExp(`^rn2\\(${n}\\)=\\d+$`));
    const drawn = Number(log[0].slice(`rn2(${n})=`.length));
    assert.equal(idx, drawn - 1);
    assert.ok(Number.isInteger(idx));
    assert.ok(idx >= -1 && idx < EXTCMDLIST.length);
  });

  it("is deterministic under a fixed seed (single-draw purity)", () => {
    initRng(1234);
    enableRngLog();
    const a = rnd_extcmd_idx();
    initRng(1234);
    enableRngLog();
    const b = rnd_extcmd_idx();
    assert.equal(a, b);
  });
});
